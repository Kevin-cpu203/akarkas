const cacheName = 'akarkas-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './assets/tailwindcss.js',
  './assets/jspdf.min.js',
  './assets/jspdf.plugin.autotable.min.js',
  './assets/icon_perusahaan.png' // <--- Pastikan alamatnya benar (pakai assets/)
];

// Tahap Install: Menyimpan file ke memori HP
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Mengambil file dari memori jika offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
