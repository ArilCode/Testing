// Service Worker - v5.0.8 - OFFLINE FIRST INSTALL
const CACHE = "blockyBlast-v5.0.8";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./main.js",
  "./site.webmanifest",
  "./image/favicon-96x96.png",
  "./image/favicon.svg",
  "./image/favicon.ico",
  "./image/web-app-manifest-192x192.png",
  "./image/web-app-manifest-512x512.png",
  "./image/apple-touch-icon.png",
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap"
];

self.addEventListener("install", e => {
  console.log("[SW] Install - download cache langsung");
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k =>
      Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200) return res;
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, resClone));
        return res;
      }).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match("./index.html");
        }
      });
    })
  );
});