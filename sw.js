const CACHE_NAME = 'akarkas-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.png'
];

// Menyimpan file ke cache saat aplikasi pertama kali diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Mengambil file dari cache jika tidak ada internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
