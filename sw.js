const dynamicCacheName = 'site-dynamic-v1.1.0';
const assets = [
	'/',
	'/index.html',
	'/script.js',
	'/app.js',
	'/style.css',
	'/favicon.ico',
	'/assets/splashscreens/ipad_splash.png',
	'/assets/splashscreens/ipadpro1_splash.png',
	'/assets/splashscreens/ipadpro2_splash.png',
	'/assets/splashscreens/ipadpro3_splash.png',
	'/assets/splashscreens/iphone5_splash.png',
	'/assets/splashscreens/iphone6_splash.png',
	'/assets/splashscreens/iphoneplus_splash.png',
	'/assets/splashscreens/iphonex_splash.png',
	'/assets/splashscreens/iphonexr_splash.png',
	'/assets/splashscreens/iphonexsmax_splash.png',
	'/assets/android-icon-36x36.png',
	'/assets/android-icon-48x48.png',
	'/assets/android-icon-72x72.png',
	'/assets/android-icon-96x96.png',
	'/assets/android-icon-144x144.png',
	'/assets/android-icon-192x192.png',
	'/assets/android-icon-512x512.png',
	'/assets/apple-icon-57x57.png',
	'/assets/apple-icon-60x60.png',
	'/assets/apple-icon-72x72.png',
	'/assets/apple-icon-76x76.png',
	'/assets/apple-icon-120x120.png',
	'/assets/apple-icon-144x144.png',
	'/assets/apple-icon-152x152.png',
	'/assets/apple-icon-180x180.png',
	'/assets/apple-icon-512x512.png',
	'/assets/apple-icon-precomposed.png',
	'/assets/apple-icon.png',
	'/assets/browserconfig.xml',
	'/assets/favicon-16x16.png',
	'/assets/favicon-32x32.png',
	'/assets/favicon-96x96.png',
	'/assets/favicon.ico',
	'/assets/ms-icon-70x70.png',
	'/assets/ms-icon-144x144.png',
	'/assets/ms-icon-150x150.png',
	'/assets/ms-icon-310x310.png',
	'/assets/splashscreens',
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
