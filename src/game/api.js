// Appels au serveur de scores (dossier server/ à la racine du projet).
// En production, mettre l'adresse du serveur dans la variable REACT_APP_API_URL.
const API_URL =
  process.env.REACT_APP_API_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

async function request(path, options = {}) {
  if (!API_URL) throw new Error("Serveur de scores non configuré.");

  // Abandon au bout de 8 s pour ne pas laisser l'interface en attente
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(API_URL + path, { ...options, signal: controller.signal });
  } catch {
    throw new Error("Serveur de scores injoignable.");
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Erreur ${response.status}`);
  return data;
}

// Top 10 : [{ name, score, date }]
export const fetchLeaderboard = () => request("/api/scores").then((data) => data.leaderboard);

// Début de partie : renvoie l'identifiant à joindre au score
export const startGame = () => request("/api/games", { method: "POST" }).then((data) => data.gameId);

// Fin de partie : renvoie { leaderboard, rank } (rank vaut null hors du top 10)
export const submitScore = (gameId, name, score) =>
  request("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, name, score }),
  });
