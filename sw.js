
const staticCacheName = 'site-static';
const assets = [
    './index.html',
    './src/main.js',
    './src/main.css',

    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
    'https://cdn.plot.ly/plotly-2.4.2.min.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', e => {

});

self.addEventListener('fetch', e => {
    console.log('fetch event', e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    )
});