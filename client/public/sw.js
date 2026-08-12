/**
 * Service Worker — Offline Navigation Fallback
 *
 * Purpose: Cache a single offline.html page and its assets, serving them
 * when navigation requests fail due to network unavailability.
 *
 * Strategy: Network-first for navigation requests only.
 * Font resources are cached-first to ensure offline rendering matching the app typography.
 * All other requests (API, static assets, JS chunks) pass through untouched.
 *
 * Cache: Versioned. Bump CACHE_VERSION when offline.html changes to ensure
 * users receive the updated page.
 */

const CACHE_VERSION = 4;
const CACHE_NAME = 'portfolio-offline-v' + CACHE_VERSION;
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  OFFLINE_URL,
  '/fonts/new/Instagram Sans.woff2',
  '/fonts/new/Instagram Sans Medium.woff2',
  '/fonts/new/Instagram Sans Bold.woff2'
];

// ---------------------------------------------------------------------------
// Install — cache the offline fallback page and fonts.
// ---------------------------------------------------------------------------
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// ---------------------------------------------------------------------------
// Activate — clean up obsolete cache versions, then claim clients so the
// new SW controls all open tabs immediately.
// ---------------------------------------------------------------------------
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) {
          // Only delete caches that belong to this offline system.
          // Match "portfolio-offline-v<number>" pattern.
          return name.startsWith('portfolio-offline-') && name !== CACHE_NAME;
        }).map(function (name) {
          return caches.delete(name);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// ---------------------------------------------------------------------------
// Fetch — intercept navigation requests and local brand font files.
// ---------------------------------------------------------------------------
self.addEventListener('fetch', function (event) {
  // 1. Intercept navigation requests (network-first, catch-to-cache fallback)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.open(CACHE_NAME).then(function (cache) {
          return cache.match(OFFLINE_URL);
        });
      })
    );
    return;
  }

  // 2. Intercept local brand font files (cache-first to guarantee offline availability)
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/fonts/new/')) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
