// Service Worker for Homepage PWA
const CACHE_NAME = 'homepage-pwa-v2';
const RUNTIME_CACHE = 'runtime-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// External resources to cache (fonts, etc)
const externalResources = [
  'https://cdn.search.brave.com/serp/v3/_app/immutable/assets/inter-latin-wght-normal.Dx4kXJAl.woff2',
  'https://brave.com/static-assets/images/brave-logo.svg',
  'https://cdn.search.brave.com/serp/v3/_app/immutable/assets/brave-search-icon.CsIFM2aN.svg'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      }),
      caches.open(RUNTIME_CACHE).then((cache) => {
        console.log('[Service Worker] Caching external resources');
        return cache.addAll(externalResources).catch((error) => {
          console.warn('[Service Worker] Some external resources failed to cache:', error);
        });
      })
    ]).catch((error) => {
      console.error('[Service Worker] Cache failed:', error);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache with network fallback and runtime caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests except for fonts and images
  if (url.origin !== self.location.origin) {
    // Cache fonts and images from CDN
    if (request.destination === 'font' || request.destination === 'image') {
      event.respondWith(
        caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          });
        })
      );
    }
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Cache hit - return response
      if (response) {
        console.log('[Service Worker] Serving from cache:', request.url);
        return response;
      }

      // Clone the request
      const fetchRequest = request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch((error) => {
        console.error('[Service Worker] Fetch failed:', error);
        // Return a custom offline page
        return new Response('Offline - Please check your internet connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
