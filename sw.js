const staticCacheName = 'site-static';
const timeStamp = Date.now();
const assets = [
    '/',
    '/index.html',
    `/assets/css/main.css?timestamp=${timeStamp}`,
    `/assets/css/bootstrap.min.css?timestamp=${timeStamp}`

]
// install event
self.addEventListener('install', event => {
    
    console.log('service worker installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache =>{
           
            cache.addAll(assets)
        })
    )
   
    
});
  
// activate event
self.addEventListener('activate', evt => {
    console.log('service worker activated');
});
  
  // fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
});