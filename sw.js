const dynamicCacheName = 'site-dynamic-v1.3.4';
const assets = [
	'/',
	'/index.html',
	'/assets/',
	'/assets/splashscreens',
	'/script.js',
	'https://fonts.googleapis.com/css2?family=Rubik&display=swap',
];

// install event
self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(dynamicCacheName).then((cache) => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	);
});

// activate event
self.addEventListener('activate', (evt) => {
	evt.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== dynamicCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// fetch event
self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(evt.request).then((fetchRes) => {
					return caches.open(dynamicCacheName).then((cache) => {
						cache.put(evt.request.url, fetchRes.clone());
						return fetchRes;
					});
				})
			);
		})
	);
});
