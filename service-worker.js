const CACHE='vizitka-responsive-v4';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './apple-share-icon.svg',
  './vizitka-logo-ice.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vizitka-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
