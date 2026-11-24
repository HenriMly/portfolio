import React, { useCallback, useEffect, useRef, useState } from "react";
import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import Section from "./Section";
import { WIDTH, HEIGHT, POINTS, SPRITES, createGame, update, draw } from "../game/engine";
import { fetchLeaderboard, startGame, submitScore } from "../game/api";

const KEYS = {
  ArrowLeft: "left",
  q: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
  " ": "fire",
  ArrowUp: "fire",
};

const buttonClass =
  "border-2 border-white px-4 py-2 text-sm uppercase transition-colors hover:bg-white hover:text-black disabled:opacity-50";
const primaryButtonClass =
  "border-2 border-red-600 bg-red-600 px-6 py-2 text-base uppercase text-white transition-colors hover:bg-black hover:text-red-500 disabled:opacity-50";
const touchButtonClass =
  "flex h-14 touch-none select-none items-center justify-center border-2 border-white text-base uppercase active:bg-white active:text-black";
// font-pixel : Tailwind donne une police mono par défaut aux <kbd>
const keyClass = "inline-flex h-6 min-w-6 items-center justify-center border border-white/40 px-1.5 font-pixel text-white";

// Texte affiché à la place du classement tant qu'il est vide
const BOARD_EMPTY = {
  loading: "Chargement...",
  waking: "Le serveur se réveille, ça peut prendre une minute. Tu peux déjà jouer.",
  online: "Aucun score pour l'instant. À toi de jouer !",
};

const ALIEN_LABELS = { squid: "Alien du haut", crab: "Alien du milieu", octopus: "Alien du bas" };
const CAPSULE = [".######.", "########", "########", "########", "########", "########", "########", ".######."];
const ARROW_LEFT = ["..#", ".##", "###", ".##", "..#"];
const ARROW_RIGHT = ARROW_LEFT.map((line) => [...line].reverse().join(""));

const formatScore = (score) => String(score).padStart(5, "0");
const rankLabel = (rank) => (rank === 1 ? "1er" : `${rank}e`);

// Dessine un sprite du jeu en SVG : un carré par « # », dans la couleur du texte
const PixelSprite = ({ rows, size = 2, label }) => {
  const path = rows
    .flatMap((line, y) => [...line].map((cell, x) => (cell === "#" ? `M${x} ${y}h1v1h-1z` : "")))
    .join("");
  return (
    <svg
      width={rows[0].length * size}
      height={rows.length * size}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
};

// Le serveur garde une partie ouverte pendant une heure
const TICKET_MAX_AGE = 50 * 60 * 1000;

const SpaceInvaders = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const inputRef = useRef({ left: false, right: false, fire: false });
  const ticketRef = useRef({ id: null, promise: Promise.resolve(null), issuedAt: 0, failed: true });

  const [phase, setPhase] = useState("idle"); // idle | playing | paused | over
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({ status: "loading", entries: [] });
  const [submit, setSubmit] = useState({ status: "idle", message: "", rank: null });
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem("invaders-name") || "";
    } catch {
      return "";
    }
  });

  if (!gameRef.current) gameRef.current = createGame();

  // Appel serveur : récupère le classement
  const loadBoard = useCallback(() => {
    setBoard((current) => ({ ...current, status: "loading" }));
    // Hébergé gratuitement, le serveur se met en veille : sa première réponse peut prendre une minute
    const timer = setTimeout(
      () => setBoard((current) => (current.status === "loading" ? { ...current, status: "waking" } : current)),
      4000
    );
    fetchLeaderboard()
      .then((entries) => setBoard({ status: "online", entries }))
      .catch(() => setBoard({ status: "offline", entries: [] }))
      .finally(() => clearTimeout(timer));
  }, []);

  // Appel serveur : ouvre une partie, dont l'identifiant servira à valider le score.
  // Fait dès l'arrivée sur la page : la partie est prête au clic sur Jouer,
  // et cet appel réveille le serveur s'il était en veille.
  const requestTicket = useCallback(() => {
    const ticket = { id: null, promise: null, issuedAt: Date.now(), failed: false };
    ticket.promise = startGame()
      .then((gameId) => {
        ticket.id = gameId;
        return gameId;
      })
      .catch(() => {
        ticket.failed = true;
        return null;
      });
    ticketRef.current = ticket;
  }, []);

  useEffect(() => {
    loadBoard();
    requestTicket();
  }, [loadBoard, requestTicket]);

  // Le canvas garde une taille logique de 400x480 quelle que soit sa taille à l'écran
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      const scale = (canvas.clientWidth / WIDTH) * Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(WIDTH * scale);
      canvas.height = Math.round(HEIGHT * scale);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      draw(ctx, gameRef.current);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Boucle de jeu
  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = canvasRef.current.getContext("2d");
    let last = performance.now();
    let frameId;
    const frame = (now) => {
      const game = gameRef.current;
      // Petits pas de 1/120 s : les collisions restent fiables même si l'affichage ralentit
      let remaining = Math.min((now - last) / 1000, 0.05);
      last = now;
      while (remaining > 0) {
        const step = Math.min(remaining, 1 / 120);
        update(game, step, inputRef.current);
        remaining -= step;
      }
      draw(ctx, game);
      if (game.over) {
        setScore(game.score);
        setPhase("over");
        return;
      }
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  // Clavier et pause automatique, seulement pendant la partie
  useEffect(() => {
    if (phase !== "playing") return;
    const input = inputRef.current;
    const pause = () => setPhase("paused");

    const onKey = (event) => {
      if (event.key === "p" || event.key === "P" || event.key === "Escape") {
        if (event.type === "keydown") pause();
        return;
      }
      const action = KEYS[event.key.length === 1 ? event.key.toLowerCase() : event.key];
      if (!action) return;
      event.preventDefault(); // Espace et les flèches ne font plus défiler la page
      input[action] = event.type === "keydown";
    };
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    // Pause quand le jeu sort de l'écran
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.25) pause();
      },
      { threshold: 0.25 }
    );

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(canvasRef.current);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      input.left = input.right = input.fire = false;
    };
  }, [phase]);

  const start = () => {
    gameRef.current = createGame();
    setSubmit({ status: "idle", message: "", rank: null });
    setPhase("playing");

    // La partie ouverte à l'avance est réutilisée, sauf si elle a échoué ou approche de son expiration
    const ticket = ticketRef.current;
    if (ticket.failed || Date.now() - ticket.issuedAt > TICKET_MAX_AGE) requestTicket();
  };

  // Appel serveur : envoie le score
  const send = async (event) => {
    event.preventDefault();
    setSubmit({ status: "sending", message: "", rank: null });
    try {
      // Si le serveur se réveillait encore, on attend que la partie soit ouverte
      const ticket = ticketRef.current;
      const gameId = ticket.id || (await ticket.promise);
      if (!gameId) throw new Error("Serveur de scores injoignable.");
      const result = await submitScore(gameId, name, score);
      requestTicket(); // une partie ne sert qu'une fois : on prépare la suivante
      try {
        localStorage.setItem("invaders-name", name);
      } catch {
        // stockage local indisponible : sans importance
      }
      setBoard({ status: "online", entries: result.leaderboard });
      setSubmit({
        status: "sent",
        message: result.rank ? `Tu es n°${result.rank} du classement !` : "Pas assez pour entrer dans le top 10.",
        rank: result.rank,
      });
    } catch (error) {
      setSubmit({ status: "error", message: error.message, rank: null });
      // Partie refusée par le serveur (expirée ou déjà utilisée) : on en ouvre une autre
      if (error.status === 409) requestTicket();
    }
  };

  // Boutons tactiles : l'action dure tant que le doigt reste appuyé
  const hold = (action) => ({
    onPointerDown: (event) => {
      inputRef.current[action] = true;
      // Le bouton reçoit le relâchement même si le doigt ou la souris a glissé en dehors
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // pointeur déjà relâché : rien à capturer
      }
    },
    onPointerUp: () => {
      inputRef.current[action] = false;
    },
    onPointerCancel: () => {
      inputRef.current[action] = false;
    },
    onContextMenu: (event) => event.preventDefault(),
  });

  return (
    <Section id="jeu" title="Mini-jeu">
      <div className="grid gap-6 font-pixel md:grid-cols-[minmax(0,1fr)_14rem]">
        <div>
          <div className="relative mx-auto w-full max-w-md">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Space Invaders"
              className="block aspect-[5/6] w-full border-2 border-white/20"
            />

            {phase !== "playing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/85 p-4 text-center">
                {phase === "idle" && (
                  <>
                    <p className="text-[32px] font-bold leading-tight">
                      SPACE
                      <span className="block text-red-600">INVADERS</span>
                    </p>

                    <dl className="grid grid-cols-[2rem_auto] items-center gap-x-3 gap-y-2 text-left text-sm">
                      {Object.entries(POINTS).map(([type, points]) => (
                        <React.Fragment key={type}>
                          <dt className="flex justify-center">
                            <PixelSprite rows={SPRITES[type][0]} label={ALIEN_LABELS[type]} />
                          </dt>
                          <dd>= {points} pts</dd>
                        </React.Fragment>
                      ))}
                      <dt className="flex justify-center text-yellow-400">
                        <PixelSprite rows={CAPSULE} label="Capsule jaune" />
                      </dt>
                      <dd className="text-yellow-400">= bonus à attraper</dd>
                    </dl>

                    <button type="button" onClick={start} className={primaryButtonClass}>
                      Jouer
                    </button>
                  </>
                )}

                {phase === "paused" && (
                  <>
                    <p className="text-[32px] font-bold">PAUSE</p>
                    <button type="button" onClick={() => setPhase("playing")} className={primaryButtonClass}>
                      Reprendre
                    </button>
                  </>
                )}

                {phase === "over" && (
                  <>
                    <p className="text-[32px] font-bold leading-tight text-red-600">GAME OVER</p>
                    <p className="text-base">
                      <span className="text-white/50">Score </span>
                      {formatScore(score)}
                    </p>

                    {score > 0 && submit.status !== "sent" && (
                      <form onSubmit={send} className="flex w-full max-w-[15rem] flex-col gap-3">
                        <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          maxLength={12}
                          placeholder="Ton pseudo"
                          aria-label="Ton pseudo"
                          className="border-b-2 border-white bg-transparent px-1 py-1 text-center text-base uppercase text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                        />
                        <button type="submit" disabled={submit.status === "sending"} className={buttonClass}>
                          {submit.status === "sending" ? "Envoi..." : "Envoyer mon score"}
                        </button>
                      </form>
                    )}

                    {submit.message && (
                      <p className={`max-w-xs text-sm ${submit.status === "error" ? "text-red-500" : "text-white"}`}>
                        {submit.message}
                      </p>
                    )}

                    <button type="button" onClick={start} className={primaryButtonClass}>
                      Rejouer
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Commandes tactiles (mobile et tablette) */}
          <div className="mx-auto mt-3 grid max-w-md grid-cols-3 gap-3 lg:hidden">
            <button type="button" aria-label="Aller à gauche" className={touchButtonClass} {...hold("left")}>
              <PixelSprite rows={ARROW_LEFT} size={4} />
            </button>
            <button type="button" aria-label="Aller à droite" className={touchButtonClass} {...hold("right")}>
              <PixelSprite rows={ARROW_RIGHT} size={4} />
            </button>
            <button type="button" aria-label="Tirer" className={touchButtonClass} {...hold("fire")}>
              Tir
            </button>
          </div>
          <p className="mt-4 hidden items-center justify-center gap-6 text-xs text-white/60 lg:flex">
            <span className="flex items-center gap-1.5">
              <kbd className={keyClass}>
                <PixelSprite rows={ARROW_LEFT} label="Flèche gauche" />
              </kbd>
              <kbd className={keyClass}>
                <PixelSprite rows={ARROW_RIGHT} label="Flèche droite" />
              </kbd>
              bouger
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className={keyClass}>Espace</kbd>
              tirer
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className={keyClass}>P</kbd>
              pause
            </span>
          </p>
        </div>

        <aside>
          <h3 className="mb-4 text-base font-bold uppercase text-red-500">Meilleurs scores</h3>

          {board.status === "offline" ? (
            <div className="space-y-3 text-sm text-white/60">
              <p>Serveur de scores injoignable. Tu peux quand même jouer.</p>
              <button type="button" onClick={loadBoard} className={buttonClass}>
                Réessayer
              </button>
            </div>
          ) : board.entries.length === 0 ? (
            <p className="text-sm text-white/60">{BOARD_EMPTY[board.status]}</p>
          ) : (
            <ol className="space-y-2 text-sm">
              {board.entries.map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className={`flex items-end gap-2 ${submit.rank === index + 1 ? "text-red-500" : ""}`}
                >
                  <span className="w-8 shrink-0 opacity-50">{rankLabel(index + 1)}</span>
                  <span className="min-w-0 truncate uppercase">{entry.name}</span>
                  <span
                    aria-hidden="true"
                    className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-current opacity-25"
                  />
                  <span>{formatScore(entry.score)}</span>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </Section>
  );
};

export default SpaceInvaders;
