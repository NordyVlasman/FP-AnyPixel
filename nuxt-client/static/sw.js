importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.a6be671115d3d69dde3a.js",
    "revision": "21d2346c0cf9640b23e5ea9242632dc6"
  },
  {
    "url": "/_nuxt/layouts/default.139f147ee8d85e757beb.js",
    "revision": "f9ec6558fdcc64db2edd58a21c899217"
  },
  {
    "url": "/_nuxt/layouts/partials/Navbar.d6bf36d85b4f2dbab7a3.js",
    "revision": "e33c92a609ece35e5a85597e379d398f"
  },
  {
    "url": "/_nuxt/manifest.010826c6a34bfc9fb382.js",
    "revision": "31143ab99680b3dc39c713ab6bcaf3ad"
  },
  {
    "url": "/_nuxt/pages/index.2a6be5440f9997989a87.js",
    "revision": "1a4f9b8f5db36840bc3a4d64c66d010a"
  },
  {
    "url": "/_nuxt/pages/login.b206de7369f0ccd8bc6d.js",
    "revision": "12007ddc4cb4574948f17b7599672a07"
  },
  {
    "url": "/_nuxt/pages/register.eae4316a99a4de463ee4.js",
    "revision": "a00e7d6d2d2ad8858c8da3267abdabd3"
  },
  {
    "url": "/_nuxt/pages/user/edit.c1dbf426d98b7ae7828c.js",
    "revision": "4f459a99179348974c0f1d0993f394df"
  },
  {
    "url": "/_nuxt/vendor.0d6bc0e63089d116db8f.js",
    "revision": "65fa1b135303f725bc023e68fe026708"
  }
], {
  "cacheId": "nuxt-client",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





