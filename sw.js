/* sw.js — oncoffeelog.com 최소 서비스 워커
 * 홈 화면 추가(설치) 조건을 채우고, 오프라인에서도 마지막으로 본 화면을 열 수 있게 합니다.
 * 네트워크를 먼저 보고, 실패할 때만 캐시를 씁니다. (beans.json은 항상 최신을 우선)
 */
const CACHE = "oncoffeelog-v102";
const SHELL = ["/", "/index.html", "/farms.html", "/competitions.html", "/process-data.js?v=20261202a", "/site.css?v=20261204a", "/site-tools.css?v=20261127a", "/site-tools.js?v=20261127a", "/site-notice.js?v=20261130a", "/site-config.json", "/i18n-data.js?v=20261128a", "/i18n-pages.js?v=20261204b", "/i18n-places.js?v=20261201a", "/i18n-research-nav.js?v=20261127r", "/i18n-competitions.js?v=20261128a", "/i18n.js?v=20261127a", "/photos.js?v=20261127a", "/qrcode.min.js?v=20261122e", "/qr-tools.js?v=20261127a", "/story-map-land.js?v=20261126a", "/story-card.js?v=20261127a", "/research.html", "/research.js?v=20261127r", "/i18n-research.js?v=20261127r", "/llms.txt", "/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.all(SHELL.map((url) => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const fresh = await fetch(req, { credentials: "same-origin" });
      if (fresh && fresh.ok && fresh.type === "basic") {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(() => {});
      }
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === "navigate") {
        const shell = await caches.match("/index.html");
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
