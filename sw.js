const CACHE_NAME = 'ular-tangga-v2';

// list semua file penting aja, folder ikut ke-cache otomatis pas di-fetch
const FILES_TO_CACHE = [
  './',
  './index.html',
  './site.webmanifest',
  './apple-touch-icon.png',
  './favicon-96x96.png',
  './favicon.ico',
  './favicon.svg',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png'
  // kalau ada banyak file di folder, cukup tulis folder nya gak perlu semua file
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching core files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // cache-first strategy: kalau ada di cache pakai cache, kalau ga ada fetch + simpan ke cache
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      
      return fetch(e.request).then(response => {
        // jangan cache request yang bukan GET atau dari chrome-extension
        if (!response || response.status !== 200 || e.request.method !== 'GET') {
          return response;
        }
        // clone karena response cuma bisa dipakai sekali
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          // simpan semua file dari folder css, js, img, sounds otomatis
          cache.put(e.request, clone);
        });
        return response;
      }).catch(() => {
        // kalau offline dan file ga ada di cache, balik ke index.html
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});