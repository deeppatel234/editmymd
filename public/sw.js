const CACHE_NAME = 'editmymd-catch-vPACKAGE_VERSION';
const catchFileType = ['manifest', 'font', 'image', 'script', 'style'];
const apiToCatch = ['api/user', 'api/repo'];

self.addEventListener('fetch', function(event) {
  const { url, referrer, destination } = event.request;

  if (catchFileType.includes(destination)) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function(response) {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      }),
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const apiURL = url.replace(referrer, '');
          if (
            (url.includes('/api') && !apiToCatch.includes(apiURL)) ||
            url.includes('oauth')
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        }),
    );
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
