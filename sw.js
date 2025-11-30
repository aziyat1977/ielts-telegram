// IELTS Academy Service Worker
// Provides offline functionality and caching

const CACHE_NAME = 'ielts-academy-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/data.js',
    '/telegram-auth.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch - Cache First for static, Network First for API
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // API requests: Network First with Cache Fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Clone and cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Static assets: Cache First with Network Fallback
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('[SW] Serving from cache:', event.request.url);
                    return response;
                }

                console.log('[SW] Fetching from network:', event.request.url);
                return fetch(event.request).then(response => {
                    // Cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
    );
});

// Background Sync - for offline API requests
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);

    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    console.log('[SW] Syncing progress...');
    try {
        const cache = await caches.open('api-queue');
        const requests = await cache.keys();

        for (const request of requests) {
            try {
                await fetch(request);
                await cache.delete(request);
                console.log('[SW] Synced:', request.url);
            } catch (error) {
                console.log('[SW] Sync failed, will retry later:', error);
            }
        }
    } catch (error) {
        console.error('[SW] Sync error:', error);
    }
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};

    event.waitUntil(
        self.registration.showNotification(data.title || 'IELTS Academy', {
            body: data.body || 'New notification',
            icon: '/icon-192.png',
            badge: '/icon-192.png'
        })
    );
});
