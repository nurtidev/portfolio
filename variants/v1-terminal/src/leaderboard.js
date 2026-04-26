// Leaderboard — local (localStorage top-10) with hook for global Firebase backend.
//
// To enable global leaderboard later:
//   1. Create Firebase project, enable Firestore (in test mode initially)
//   2. Replace LEADERBOARD_BACKEND with "firebase" and fill FIREBASE_CONFIG
//   3. Add Firebase SDK script tag in Portfolio.html (compat build)
//   4. Set Firestore rules to: allow read; allow create: if request.resource.data.score < 1000000;
//
// For now: local-only. All API calls are async and resolve from localStorage.

const LEADERBOARD_KEY = "gopher_leaderboard_v1";
const LEADERBOARD_MAX = 10;
const LEADERBOARD_BACKEND = "local"; // "local" | "firebase"

// Firebase placeholder (not used until backend = "firebase")
const FIREBASE_CONFIG = {
  // apiKey: "...",
  // authDomain: "...",
  // projectId: "...",
};

function loadLocal() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveLocal(entries) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {}
}

async function getTop() {
  if (LEADERBOARD_BACKEND === "firebase") {
    // TODO: query Firestore "scores" collection orderBy("score", "desc") limit(10)
    return loadLocal();
  }
  return loadLocal();
}

async function submitScore({ name, score, level }) {
  const entry = {
    name: (name || "anon").slice(0, 12),
    score: Math.floor(score),
    level: level || 1,
    ts: Date.now(),
  };
  if (LEADERBOARD_BACKEND === "firebase") {
    // TODO: addDoc(collection(db, "scores"), entry)
    // For now, also persist locally as fallback.
  }
  const all = loadLocal();
  all.push(entry);
  all.sort((a, b) => b.score - a.score);
  const top = all.slice(0, LEADERBOARD_MAX);
  saveLocal(top);
  return top;
}

function makesTopN(score, n = LEADERBOARD_MAX) {
  const all = loadLocal();
  if (all.length < n) return true;
  return score > all[all.length - 1].score;
}

window.GopherLeaderboard = {
  getTop,
  submitScore,
  makesTopN,
  backend: LEADERBOARD_BACKEND,
};
