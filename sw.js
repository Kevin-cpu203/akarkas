const cacheName = 'akarkas-v4'; // Naik ke v4
const assets = [
  './',
  './index.html',
  './manifest.json',
  './assets/tailwindcss.js',
  './assets/jspdf.min.js',
  './assets/jspdf.plugin.autotable.min.js',
  './assets/icon.png' // <--- Sesuai nama di folder kamu
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return Promise.all(
        assets.map(url => cache.add(url).catch(err => console.warn('Gagal:', url)))
      );
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== cacheName).map(k => caches.delete(k))
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
