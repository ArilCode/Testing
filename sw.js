const CACHE_NAME = "portal-tugas-v5";
const urlsToCache = [
  "index.html",
  "style.css",
  "main.js",
  "manifest.json"
  // PDF ga usah disebutin di sini kalau pake sistem cache pas klik
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Ini yg penting: Cache otomatis file apa aja yg berhasil di fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        // Cuma cache file yg sukses 200
        if (res.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, res.clone());
          });
        }
        return res;
      }).catch(() => {
        // Kalau offline dan ga ada di cache
        return new Response("Offline");
      });
    })
  );
});