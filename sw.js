// Service Worker - Ular MABAR Hotspot v1.0.0 - Full Offline PWA
const CACHE = "ular-mabar-v1.0.0";
const ASSETS = [
  "./",
  "./index.html",
  "./site.webmanifest",
  "./web-app-manifest-192x192.png",
  "./web-app-manifest-512x512.png",
  "./apple-touch-icon.png",
  "./favicon-96x96.png",
  "./favicon.ico",
  "./favicon.svg",
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap",
  "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k =>
      Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = e.request.url;
  
  // PeerJS & Google Fonts - Cache First
  if (url.includes("fonts.googleapis") || url.includes("fonts.gstatic") || url.includes("peerjs") || url.includes("unpkg.com")) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const hit = await cache.match(e.request);
        if (hit) return hit;
        try {
          const res = await fetch(e.request);
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        } catch { return hit; }
      })
    );
    return;
  }
  
  // Default: Cache First, fallback to network, then to mabar.html
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).then(res => {
        // Cache new assets on the fly
        if (res.ok && e.request.method === 'GET' && url.startsWith(self.location.origin)) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => caches.match("./mabar.html"))
    )
  );
});