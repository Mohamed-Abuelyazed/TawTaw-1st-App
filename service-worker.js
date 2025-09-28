const CACHE_NAME = 'tawtaw-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'
];

// 1. Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Intercept network requests and serve from network first, falling back to cache.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // If the network request fails, try to serve from the cache.
      return caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        // If not in cache either, it's a genuine error (e.g., offline and page not cached).
      });
    })
  );
});


// 3. Clean up old caches when a new service worker is activated
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});