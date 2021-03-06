// メインはこっちを変える
// サービスに直接的に関わる変更など
var CACHE_STATIC_VERSION = 'static-v1.2'

// こっちはassets系統のアプデ時のみ使用
// フォント変更やmaterialize,jQueryなどの外部ライブラリ更新時のみ変更
var CACHE_DYNAMIC_VERSION = 'dynamic-v1.1'

importScripts("https://unpkg.com/service-worker-updatefound-refresh-dialog@1.1.0/dist/service-worker-updatefound-refresh-dialog.umd.js");

// 以下メイン処理
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker...')
  event.waitUntil(
    caches.open(CACHE_STATIC_VERSION)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App...')
        cache.addAll([
          '/comiket/',
          '/comiket/manifest.json',
          '/comiket/src/style.css',
          '/comiket/src/scheck.js',
          '/comiket/src/map.css',
          '/comiket/src/reg_sw.js'
        ])
      }).then(function() {
        skipWaiting()
      }))
  
})

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...')
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_VERSION)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
            })
            .catch(function() {
            })
        }
      })
  )
})

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...')
    event.waitUntil(
      caches.keys()
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION) {
              console.log('[Service Worker] Removing old cache...')
              return caches.delete(key)
            }
          }))
        })
    )
    return self.clients.claim()
  })
