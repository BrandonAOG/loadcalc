// ╔══════════════════════════════════════════════════════════════╗
// ║         Always On Generators · Universal Sub-App SW         ║
// ║                       v1.2                                  ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  DROP THIS FILE INTO THE ROOT OF EACH SUB-APP REPO.        ║
// ║  Change CACHE_NAME below for each site (keeps caches       ║
// ║  separate and makes updates clean).                         ║
// ║                                                             ║
// ║  Repo → CACHE_NAME suggestion:                             ║
// ║    Installforms            → aog-install-v1.2              ║
// ║    gas-install             → aog-gas-v1.2                  ║
// ║    Generator-estimate-form → aog-estimate-v1.2             ║
// ║    Maintenance             → aog-maintenance-v1.2          ║
// ║    Site-visit              → aog-sitevisit-v1.2            ║
// ║    Sketchpad               → aog-sketchpad-v1.2            ║
// ║    conduitfill             → aog-conduit-v1.2              ║
// ║    loadcalc                → aog-loadcalc-v1.2             ║
// ║    breaker-cond            → aog-breaker-v1.2              ║
// ╚══════════════════════════════════════════════════════════════╝

// ── ① CHANGE THIS FOR EACH REPO ───────────────────────────────
const CACHE_NAME    = 'aog-install-v1.2';   // <-- update per site
const RUNTIME_CACHE = CACHE_NAME + '-runtime';

// ── ② Shell assets to pre-cache on install ────────────────────
const PRECACHE_URLS = [
  './',
  './index.html',
  // Add any local assets per-repo here:
  // './manifest.json',
  // './icons/icon-192.png',
];

// ── ③ Third-party origins to cache at runtime ─────────────────
//    Covers fonts, html2canvas CDN, and logo images.
const CACHE_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com',       // html2canvas
  'https://raw.githubusercontent.com',  // AOG logos
  'https://lh3.googleusercontent.com',  // Google profile images
];

// ── ④ Hub origin ──────────────────────────────────────────────
const HUB_ORIGIN = 'https://brandonaog.github.io';


// ══════════════════════════════════════════════════════════════
// INSTALL — pre-cache app shell
// ══════════════════════════════════════════════════════════════
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE_URLS); })
      .then(function () { return self.skipWaiting(); })
  );
});


// ══════════════════════════════════════════════════════════════
// ACTIVATE — purge stale caches
// ══════════════════════════════════════════════════════════════
self.addEventListener('activate', function (event) {
  var valid = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return !valid.includes(k); })
          .map(function (k)   { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});


// ══════════════════════════════════════════════════════════════
// FETCH — routing
// ══════════════════════════════════════════════════════════════
self.addEventListener('fetch', function (event) {
  var req = event.request;
  var url;

  if (req.method !== 'GET') return;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.protocol === 'chrome-extension:') return;

  // 1. Same-origin & hub → Network-first (always fresh HTML when online)
  if (url.origin === self.location.origin || url.origin === HUB_ORIGIN) {
    event.respondWith(networkFirst(req));
    return;
  }

  // 2. Fonts, CDN scripts, remote images → Cache-first + background refresh
  if (CACHE_ORIGINS.some(function (o) { return url.origin === o; })) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // 3. Everything else → network only
  event.respondWith(
    fetch(req).catch(function () { return offlineFallback(req); })
  );
});


// ══════════════════════════════════════════════════════════════
// STRATEGY: Network-first, fallback to cache
// ══════════════════════════════════════════════════════════════
function networkFirst(req) {
  return fetch(req)
    .then(function (res) {
      if (res && res.status === 200) {
        caches.open(RUNTIME_CACHE).then(function (c) { c.put(req, res.clone()); });
      }
      return res;
    })
    .catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || offlineFallback(req);
      });
    });
}


// ══════════════════════════════════════════════════════════════
// STRATEGY: Cache-first, update in background
// ══════════════════════════════════════════════════════════════
function cacheFirst(req) {
  return caches.open(RUNTIME_CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      var networkFetch = fetch(req)
        .then(function (res) {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        })
        .catch(function () { return cached; });

      return cached || networkFetch;
    });
  });
}


// ══════════════════════════════════════════════════════════════
// OFFLINE FALLBACK
// ══════════════════════════════════════════════════════════════
function offlineFallback(req) {
  if (req.mode === 'navigate') {
    return caches.match('./index.html').then(function (cached) {
      return cached || new Response(offlinePage(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    });
  }

  // Script stub — prevents html2canvas etc. from hard-crashing the page
  if (req.destination === 'script') {
    return new Response('/* offline */', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  // Image placeholder
  if (req.destination === 'image') {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" fill="#1A2847"/>' +
      '<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" ' +
      'fill="#FBBF24" font-size="28">⚡</text></svg>',
      { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }

  return new Response('Offline — resource not cached.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}


// ══════════════════════════════════════════════════════════════
// INLINE OFFLINE PAGE
// ══════════════════════════════════════════════════════════════
function offlinePage() {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>AOG · Offline</title>' +
    '<style>' +
    'body{margin:0;min-height:100vh;display:flex;flex-direction:column;' +
    'align-items:center;justify-content:center;' +
    'background:linear-gradient(135deg,#0A0E27,#0F1535,#1A2847);' +
    'font-family:monospace;color:#94A3B8;text-align:center;padding:24px;}' +
    'h1{font-size:3.5rem;color:#FBBF24;text-shadow:0 0 20px rgba(251,191,36,.5);margin-bottom:6px;}' +
    'p{letter-spacing:3px;text-transform:uppercase;font-size:.8rem;margin:6px 0;}' +
    '.sub{color:#F97316;font-size:.7rem;letter-spacing:4px;margin-top:14px;}' +
    '.note{color:#64748B;font-size:.65rem;margin-top:10px;letter-spacing:1px;' +
    'max-width:280px;line-height:1.6;}' +
    'button{margin-top:28px;padding:12px 28px;' +
    'background:linear-gradient(135deg,#FBBF24,#F97316);' +
    'border:none;border-radius:3px;font-family:monospace;font-size:.75rem;' +
    'letter-spacing:3px;text-transform:uppercase;color:#0A0E27;cursor:pointer;font-weight:700;}' +
    '</style></head><body>' +
    '<h1>⚡</h1>' +
    '<p>Always On Generators</p>' +
    '<p style="color:#F97316">· No Connection ·</p>' +
    '<div class="sub">Form Offline Mode</div>' +
    '<div class="note">Your filled-in data is still here.<br>Reconnect to save or submit.</div>' +
    '<button onclick="window.location.reload()">Retry</button>' +
    '</body></html>';
}


// ══════════════════════════════════════════════════════════════
// MESSAGE HANDLER — triggered by the update-toast reload button
// ══════════════════════════════════════════════════════════════
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
