const Version = '0.0.2';
const staticCacheName = `site-static-${Version}`;
const dynamicCacheName = 'dynamic-chache';
const timeStamp = Date.now();
const assets = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/css/bootstrap.min.css',
    '/assets/js/app.js',
    '/pages/fallback.html'
]
// install event
self.addEventListener('install', event => {
    // console.log('service worker installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets)  //assets with chace
        })
    )
});

// activate event
self.addEventListener('activate', event => {
    console.log('service worker activated');
    //delete All old caches
    event.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys); //
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', event => {
    console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            })
        }).catch(() => caches.match('/pages/fallback.html'))
    )
});
