const CACHE_NAME = 'zdos-banking-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Aggiungi altre risorse statiche qui
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - ritorna la risposta
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Gestione notifiche push per transazioni
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Nuova transazione ZDOS Banking',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', 
        title: 'Visualizza',
        icon: 'icon-192.png'
      },
      {
        action: 'close', 
        title: 'Chiudi',
        icon: 'icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ZDOS Banking', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
