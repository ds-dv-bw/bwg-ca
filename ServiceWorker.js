const cacheName = "DefaultCompany-Cyto Attack-1.0";
const contentToCache = [
    "Build/CytoAttackBuild001.loader.js",
    "Build/6f6dcb30ff5363eb5b137b95700ada9f.js.br",
    "Build/bebd9b1a7a004d8b61cda1cc51074b70.data.br",
    "Build/8aad99ae255edc07ed6e72a454ae7dc0.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
