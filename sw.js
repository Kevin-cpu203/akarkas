const cacheName = 'akarkas-pro-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './assets/tailwindcss.js',
  './assets/jspdf.min.js',
  './assets/jspdf.plugin.autotable.min.js',
  './assets/icon_perusahaan.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('AkarKas: Menabung aset ke memori HP...');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
