const CACHE='vizitka-i18n-fixed-v2';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './apple-share-icon.svg',
  './vizitka-logo-ice.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
