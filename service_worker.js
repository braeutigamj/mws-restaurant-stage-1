/**
 * Register a Service Worker
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service_worker.js');
  });
}

/**
 * Install Service Worker for caching.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('restaurant_offline').then(cache => {
      return cache.addAll([
        '/'
      ]);
    })
  );
});

/**
 * Cache Request and response cached requests
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }
        let responseToCache = response.clone();
        caches.open('restaurant_offline').then(cache => {
          cache.put(event.request, responseToCache);
        })
        .catch(e => {
          console.error(e);
        });
        return response;
      })
      .catch(e => {
        console.error(e);
      });
    })
  );
});
