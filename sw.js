const cacheName = 'akarkas-pro-v2'; // Naikkan versinya jadi v2
const assets = [
  './',
  './index.html',
  './manifest.json',
  './assets/tailwindcss.js',
  './assets/jspdf.min.js',
  './assets/jspdf.plugin.autotable.min.js',
  './assets/icon_perusahaan.png'
];

// 1. Install: Menabung aset
self.addEventListener('install', e => {
  self.skipWaiting(); // Paksa SW baru langsung aktif
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Activate: Hapus sampah cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim(); // Langsung ambil kendali halaman
});

// 3. Fetch: Ambil dari tabungan (Offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
