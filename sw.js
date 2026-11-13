const CACHE_NAME = "my-music-library-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./music/song1.mp3",
  "./music/song2.mp3",
  "./music/song3.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await cache.addAll(["./", "./index.html"]);
      // Cache sample music files only when they have been added.
      for (const file of FILES_TO_CACHE.slice(2)) {
        try { await cache.add(file); } catch (error) {
          // Missing placeholder tracks are skipped until you add your MP3s.
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
