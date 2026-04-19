// ================= FILE: service-worker.js (optional PWA) =================
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('fetch', event => {
  // simple passthrough for offline capability
});
