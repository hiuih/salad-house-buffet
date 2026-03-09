const CACHE_NAME = 'salad-house-rewards-v5';
const ASSETS_TO_CACHE = [
  '/rewards/',
  '/rewards/index.html',
  '/rewards/manifest-customer.json',
  '/rewards/pwa-icon-192.png',
  '/rewards/pwa-icon-512.png',
  '/rewards/assets/index-KcPBb5U8.js',
  '/rewards/assets/index-CuLjP7cs.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
