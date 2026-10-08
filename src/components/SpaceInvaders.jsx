import React, { useCallback, useEffect, useRef, useState } from "react";
import Section from "./Section";
import { WIDTH, HEIGHT, createGame, update, draw } from "../game/engine";
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
  "rounded-md border-2 border-white px-4 py-2 text-sm font-bold uppercase tracking-wide transition duration-300 hover:bg-white hover:text-black disabled:opacity-50";
const primaryButtonClass =
  "rounded-md border-2 border-red-600 bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide transition duration-300 hover:border-red-500 hover:bg-red-500 disabled:opacity-50";
const touchButtonClass =
  "flex h-14 touch-none select-none items-center justify-center rounded-md border-2 border-white text-xl font-bold active:bg-white active:text-black";

const STATUS = {
  loading: { label: "connexion…", dot: "bg-white/40" },
  online: { label: "en ligne", dot: "bg-green-500" },
  offline: { label: "hors ligne", dot: "bg-red-500" },
};

const SpaceInvaders = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const inputRef = useRef({ left: false, right: false, fire: false });
  const gameIdRef = useRef(null);
  const runRef = useRef(0);

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
    fetchLeaderboard()
      .then((entries) => setBoard({ status: "online", entries }))
      .catch(() => setBoard({ status: "offline", entries: [] }));
  }, []);

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

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

    // Appel serveur : ouvre une partie, l'identifiant servira à valider le score
    const run = ++runRef.current;
    gameIdRef.current = null;
    startGame()
      .then((gameId) => {
        if (runRef.current === run) gameIdRef.current = gameId;
      })
      .catch(() => setBoard((current) => ({ ...current, status: "offline" })));
  };

  // Appel serveur : envoie le score
  const send = async (event) => {
    event.preventDefault();
    if (!gameIdRef.current) {
      setSubmit({ status: "error", message: "Le serveur de scores était injoignable pendant cette partie.", rank: null });
      return;
    }
    setSubmit({ status: "sending", message: "", rank: null });
    try {
      const result = await submitScore(gameIdRef.current, name, score);
      gameIdRef.current = null;
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
      <div className="grid gap-6 font-mono md:grid-cols-[minmax(0,1fr)_13rem]">
        <div>
          <div className="relative mx-auto w-full max-w-md">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Space Invaders"
              className="block aspect-[5/6] w-full rounded-md border-2 border-white/20"
            />

            {phase !== "playing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-md bg-black/80 p-4 text-center">
                {phase === "idle" && (
                  <>
                    <p className="text-2xl font-bold tracking-widest sm:text-3xl">SPACE INVADERS</p>
                    <p className="max-w-xs text-sm text-white/70">
                      Repousse les vagues d'aliens et inscris ton score au classement.
                    </p>
                    <button type="button" onClick={start} className={primaryButtonClass}>
                      Jouer
                    </button>
                  </>
                )}

                {phase === "paused" && (
                  <>
                    <p className="text-2xl font-bold tracking-widest">PAUSE</p>
                    <button type="button" onClick={() => setPhase("playing")} className={primaryButtonClass}>
                      Reprendre
                    </button>
                  </>
                )}

                {phase === "over" && (
                  <>
                    <p className="text-2xl font-bold tracking-widest text-red-500 sm:text-3xl">GAME OVER</p>
                    <p className="text-lg">
                      Score : <span className="font-bold">{score}</span>
                    </p>

                    {score > 0 && submit.status !== "sent" && (
                      <form onSubmit={send} className="flex w-full max-w-[15rem] flex-col gap-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          maxLength={12}
                          placeholder="Ton pseudo"
                          aria-label="Ton pseudo"
                          className="rounded-md border-2 border-white bg-black px-3 py-2 text-center text-base text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none"
                        />
                        <button type="submit" disabled={submit.status === "sending"} className={buttonClass}>
                          {submit.status === "sending" ? "Envoi…" : "Envoyer mon score"}
                        </button>
                      </form>
                    )}

                    {submit.message && (
                      <p className={`text-sm ${submit.status === "error" ? "text-red-500" : "text-white"}`}>
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
              ◀
            </button>
            <button type="button" aria-label="Aller à droite" className={touchButtonClass} {...hold("right")}>
              ▶
            </button>
            <button type="button" aria-label="Tirer" className={touchButtonClass} {...hold("fire")}>
              TIR
            </button>
          </div>
          <p className="mt-3 hidden text-center text-sm text-white/70 lg:block">
            ← → pour bouger · Espace pour tirer · P pour la pause
          </p>
        </div>

        <aside>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="font-sans text-lg font-bold">Classement</h3>
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <span className={`h-2 w-2 rounded-full ${STATUS[board.status].dot}`} />
              {STATUS[board.status].label}
            </span>
          </div>

          {board.status === "offline" ? (
            <div className="space-y-3 text-sm text-white/70">
              <p>Serveur de scores injoignable. Tu peux quand même jouer.</p>
              <button type="button" onClick={loadBoard} className={buttonClass}>
                Réessayer
              </button>
            </div>
          ) : board.entries.length === 0 ? (
            <p className="text-sm text-white/70">
              {board.status === "loading" ? "Chargement…" : "Aucun score pour l'instant. À toi de jouer !"}
            </p>
          ) : (
            <ol className="space-y-1.5">
              {board.entries.map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className={`flex items-baseline gap-2 ${submit.rank === index + 1 ? "font-bold text-red-500" : ""}`}
                >
                  <span className="w-6 shrink-0 text-right opacity-60">{index + 1}.</span>
                  <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                  <span className="tabular-nums">{entry.score}</span>
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
