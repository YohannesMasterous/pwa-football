importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

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
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });
  
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