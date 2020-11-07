importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// const CACHE_NAME = "football-pwa-mst";

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/favicon.ico', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/images/icon-512.png', revision: '1' },
    { url: '/images/icon-384.png', revision: '1' },
    { url: '/images/icon-192.png', revision: '1' },
    { url: '/images/icon-152.png', revision: '1' },
    { url: '/images/icon-144.png', revision: '1' },
    { url: '/images/icon-128.png', revision: '1' },
    { url: '/images/icon-96.png', revision: '1' },
    { url: '/images/icon-72.png', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/loadresultjson.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/js/sw-detail.js', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/contact.html', revision: '1' },
    { url: '/pages/favteam.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/match.html', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' }
  ]);
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ]
    })
  );

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}

// let urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/detail.html",
//   "/favicon.ico",
//   "/manifest.json",
//   "/images/icon-512.png",
//   "/images/icon-384.png",
//   "/images/icon-192.png",
//   "/images/icon-152.png",
//   "/images/icon-144.png",
//   "/images/icon-128.png",
//   "/images/icon-96.png",
//   "/images/icon-72.png",
//   "/css/materialize.min.css",
//   "/push.js",
//   "/js/materialize.min.js",
//   "/js/api.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/js/loadresultjson.js",
//   "/js/nav.js",
//   "/js/sw-register.js",
//   "/js/sw-detail.js",
//   "/pages/about.html",
//   "/pages/contact.html",
//   "/pages/favteam.html",
//   "/pages/home.html",
//   "/pages/match.html",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ];

// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//         return response || fetch (event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'images/icon-512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});