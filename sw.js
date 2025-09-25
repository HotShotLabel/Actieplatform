const CACHE_NAME = 'actieplatform-cache-v1';
const OFFLINE_URLS = [
  './',
  'assets/style.css',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  e.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(network => {
        const copy = network.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return network;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
