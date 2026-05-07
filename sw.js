const cacheName = 'akarkas-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon%20perusahaan.png', // <--- Tambahkan ini agar logo tersimpan di memori HP
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'
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
