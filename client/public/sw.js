/**
 * Service Worker — Offline Navigation Fallback
 *
 * Purpose: Cache a single offline.html page and serve it when navigation
 * requests fail due to network unavailability.
 *
 * Strategy: Network-first for navigation requests only.
 * All other requests (API, static assets, JS chunks) pass through untouched.
 *
 * Cache: Versioned. Bump CACHE_VERSION when offline.html changes to ensure
 * users receive the updated page.
 */

const CACHE_VERSION = 2;
const CACHE_NAME = 'portfolio-offline-v' + CACHE_VERSION;
const OFFLINE_URL = '/offline.html';

// ---------------------------------------------------------------------------
// Install — cache the offline fallback page.
// ---------------------------------------------------------------------------
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
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
// Fetch — intercept ONLY navigation requests. Try network first; on failure
// return the cached offline page.
// ---------------------------------------------------------------------------
self.addEventListener('fetch', function (event) {
  // Only handle top-level navigation (HTML page loads / reloads).
  if (event.request.mode !== 'navigate') {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(OFFLINE_URL);
      });
    })
  );
});
