// ================= FILE: src/api.js =================
const API_BASE = "https://anime-api-27gm.onrender.com";
const API_KEY = "RIFATExE_ANIME143";

export async function searchAnime(q) {
  const res = await fetch(`${API_BASE}/api/search?keyword=${encodeURIComponent(q)}`, {
    headers: { "X-API-Key": API_KEY }
  });
  return res.json();
}

export async function getAnime(slug) {
  const res = await fetch(`${API_BASE}/api/anime/${slug}`, {
    headers: { "X-API-Key": API_KEY }
  });
  return res.json();
}

export async function getEpisodes(id) {
  const res = await fetch(`${API_BASE}/api/episodes/${id}`, {
    headers: { "X-API-Key": API_KEY }
  });
  return res.json();
}

export async function getServers(token) {
  const res = await fetch(`${API_BASE}/api/servers/${token}`, {
    headers: { "X-API-Key": API_KEY }
  });
  return res.json();
}

export async function getSource(id) {
  const res = await fetch(`${API_BASE}/api/source/${id}`, {
    headers: { "X-API-Key": API_KEY }
  });
  return res.json();
}
