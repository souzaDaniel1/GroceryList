const cacheName = 'app-grocery-list';
const assetsToCache = [
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs',
  'https://code.getmdl.io/1.3.0/material.amber-orange.min.css',
  './assets/js/material.min.js',
  './assets/css/style.css',
  './assets/js/GroceryListService.js',
  './assets/js/HtmlService.js',
  './assets/icons/icon-48x48.png',
  './assets/icons/icon-144x144.png',
  './assets/images/check-item.png',
  './assets/images/clean-list.png',
  './assets/images/form.png',
  './assets/images/remove-item.png',
  './assets/js/app.js',
  './manifest.json',
  './about.html',
  './index.html',
  './'
];

function removeOldCache(key) {
  if (key !== cacheName) {
    console.log(`[Service Worker] Removing old cache: ${key}`);
    return caches.delete(key);
  }
}

async function cacheCleanup() {
  const keyList = await caches.keys();
  return Promise.all(keyList.map(removeOldCache));
}

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...', event);
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...', event);
  event.waitUntil(cacheCleanup());
  return self.clients.claim();
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(cacheName);
    return cache.match(request);
  }
}

async function cacheFirst(request) {
  try {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    return response || fetch(request);
  } catch (error) {
    console.log(error);
  }
}

self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});
