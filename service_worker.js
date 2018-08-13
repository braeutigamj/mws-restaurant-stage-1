var registration;
/**
 * Pending Requests
 */
self.addEventListener('message', event => {
  if (event.data === 'fullFillPendingRequests') {
    self.registration.sync.register('fullFill');
  }
});

/**
 * sync
 */
self.addEventListener('sync', event => {
  if (event.tag === 'fullFill') {
    event.waitUntil(new Promise(resolve => {
      var dbOpen = indexedDB.open('restaurantApp', 3);
      dbOpen.onsuccess = (evt) => {
        var db = dbOpen.result;
        var pendingRequests = db
          .transaction('pendingReviewRequests')
          .objectStore('pendingReviewRequests').getAll();
        pendingRequests.onsuccess = (pendingRequests) => {
          pendingRequests.target.result.forEach(request => {
            if (request.request === 'review') {
              var url = 'https://pure-dusk-67754.herokuapp.com/reviews/';
              var options = {
                method: 'POST',
                body: JSON.stringify(request.review)
              };
            }
            else {
              var url = 'https://pure-dusk-67754.herokuapp.com/restaurants/' +
                  request.favourite.favourite;
              var options = {
                method: 'POST',
              };
            }
            fetch(url, options).then((r) => {
              db.transaction('pendingReviewRequests')
                .objectStore('pendingReviewRequests')
                .delete(request.pid);
            });
          });
        };
      };
    }));
  }
});

/**
 * Register a Service Worker
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service_worker.js')
      .then(reg => navigator.serviceWorker.ready)
      .then(reg => {
        registration = reg;
      });
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
    caches.match(event.request, { ignoreSearch: true }).then(response => {
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

