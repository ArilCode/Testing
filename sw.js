const CACHE_NAME = 'ular-tangga-v2.3.5';
const FILES_TO_CACHE = [
  './','./index.html','./site.webmanifest','./apple-touch-icon.png',
  './favicon-96x96.png','./favicon.ico','./favicon.svg',
  './web-app-manifest-192x192.png','./web-app-manifest-512x512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone())); return r;}).catch(()=>caches.match('./index.html')));
  } else {
    e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{caches.open(CACHE_NAME).then(ca=>ca.put(e.request,r.clone())); return r;})));
  }
});