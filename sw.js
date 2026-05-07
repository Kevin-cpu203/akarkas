const cacheName = 'akarkas-v3'; // Naikkan versi ke v3
const assets = [
  './',
  './index.html',
  './manifest.json',
  './assets/tailwindcss.js',
  './assets/jspdf.min.js',
  './assets/jspdf.plugin.autotable.min.js',
  './assets/icon_perusahaan.png'
];

// Tahap Install: Menabung file satu per satu
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Sedang menabung aset...');
      // Menggunakan map agar jika satu file error, yang lain tetap masuk cache
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.warn('Gagal menyimpan file:', url));
        })
      );
    })
  );
});

// Tahap Activate: Membersihkan sampah cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Tahap Fetch: Strategi "Ambil dari tabungan dulu, kalau gak ada baru cari internet"
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(() => {
        // Jika benar-benar tidak ada internet dan tidak ada di cache
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
