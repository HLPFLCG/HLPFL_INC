// HLPFL Service Worker — cache core pages for offline resilience
const CACHE = "hlpfl-v1";
const PRECACHE = [
  "/",
  "/servicios/",
  "/services/",
  "/about/",
  "/contact/",
  "/faq/",
];

self.addEventListener("install", (e) =>
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  )
);

self.addEventListener("fetch", (e) =>
  e.respondWith(
    caches
      .match(e.request)
      .then((cached) => cached || fetch(e.request))
  )
);
