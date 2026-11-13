const APP_CACHE='my-music-app-v2';
const APP_FILES=['./','./index.html','./songs.json','./manifest.webmanifest'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(APP_CACHE).then(cache=>cache.addAll(APP_FILES)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==APP_CACHE&&k!=='my-music-audio-v1').map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('.mp3')){
  event.respondWith((async()=>{
   const cache=await caches.open('my-music-audio-v1');
   const saved=await cache.match(event.request);
   if(saved)return saved;
   return fetch(event.request);
  })());
  return;
 }
 event.respondWith((async()=>{
  const cache=await caches.open(APP_CACHE);
  const saved=await cache.match(event.request);
  if(saved)return saved;
  try{
   const response=await fetch(event.request);
   if(response.ok)cache.put(event.request,response.clone());
   return response;
  }catch(e){
   return cache.match('./');
  }
 })());
});
