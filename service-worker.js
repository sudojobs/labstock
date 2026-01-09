const CACHE_NAME = "labstock-v1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/login.html",
  "/css/theme.css",
  "/css/layout.css",
  "/css/components.css",
  "/js/app.js",
  "/js/router.js",
  "/js/ui.js",
  "/assets/empty.svg"
];

// Install: cache only static UI files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // 🔴 NEVER cache Firebase or Google APIs
  if (
    url.includes("firebase") ||
    url.includes("googleapis") ||
    url.includes("gstatic")
  ) {
    return;
  }

  // Static UI → cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});
