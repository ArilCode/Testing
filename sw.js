// Service Worker - v5.0.3 - OFFLINE FIRST INSTALL
const CACHE = "blockyBlast-v5.0.3";
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
  // TAMBAHKAN LANGSUNG URL FONT KAMU BIAR KE-DOWNLOAD PAS INSTALL
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap"
];

self.addEventListener("install", e => {
  console.log("[SW] Install - download cache langsung");
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
    .then(() => self.skipWaiting()) // langsung aktif, gak nunggu tab ditutup
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k =>
      Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))
    ).then(() => self.clients.claim()) // langsung ambil alih semua tab
  );
});

self.addEventListener("fetch", e => {
  // Abaikan request non-GET
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached; // kalau ada di cache, langsung kasih
      
      // kalau gak ada, fetch + simpan
      return fetch(e.request).then(res => {
        // hanya cache yang ok
        if (!res || res.status !== 200) return res;
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, resClone));
        return res;
      }).catch(() => {
        // kalau offline dan gak ada di cache, balikin index.html (untuk navigasi)
        if (e.request.mode === 'navigate') {
          return caches.match("./index.html");
        }
      });
    })
  );
});