self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open("labstock").then(cache =>
      cache.match(e.request).then(r => r || fetch(e.request))
    )
  );
});
