const CACHE_NAME = 'tawtaw-cache-v2'; // Bump version to force update
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Note: We don't explicitly cache JS/CSS bundles here
  // because their names are hashed. They will be cached on first visit.
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install: Open cache and add app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: Network first, falling back to cache
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // If we get a valid response, clone it, cache it, and return it
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return networkResponse;
      })
      .catch(() => {
        // If the network request fails, try to find it in the cache
        console.log('Network request failed. Trying to serve from cache for:', event.request.url);
        return caches.match(event.request);
      })
  );
});