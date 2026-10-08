// command to reflush: 
// python3 Scripts/optimizeImages.py
//node Scripts/generateImageManifest.js
const CACHE_NAME = 'ash33-static-v2';
const PRECACHE = [
  './',
  './index.html',
  './style.css',
  './homepage.css',
  './archive.css',
  './font/Elm-Mono.ttf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const destination = request.destination;
  const cacheable = destination === 'image' || destination === 'font';
  if (!cacheable) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  })());
});
