// Service Worker for TurboPush Website
// Version 2.0.0 - Enhanced Performance

const CACHE_VERSION = '2.0.0';
const CACHE_NAME = `turbopush-v${CACHE_VERSION}`;
const STATIC_CACHE_NAME = `turbopush-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `turbopush-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `turbopush-images-v${CACHE_VERSION}`;
const FONT_CACHE_NAME = `turbopush-fonts-v${CACHE_VERSION}`;
const API_CACHE_NAME = `turbopush-api-v${CACHE_VERSION}`;

// Cache size limits
const CACHE_LIMITS = {
  [STATIC_CACHE_NAME]: 50,
  [DYNAMIC_CACHE_NAME]: 30,
  [IMAGE_CACHE_NAME]: 100,
  [FONT_CACHE_NAME]: 20,
  [API_CACHE_NAME]: 50
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/features',
  '/download',
  '/about',
  '/contact',
  '/tech',
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/favicon.ico',
  '/manifest.json'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for images
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  // Network only for API calls
  NETWORK_ONLY: 'network-only'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS.filter(url => !url.includes('_next')));
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME &&
                cacheName !== FONT_CACHE_NAME &&
                cacheName !== API_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Cleanup cache sizes
      ...Object.entries(CACHE_LIMITS).map(([cacheName, limit]) => 
        cleanupCache(cacheName, limit)
      ),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequestEnhanced(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets - Cache First
    if (isStaticAsset(url)) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // Images - Stale While Revalidate
    if (isImage(url)) {
      return await staleWhileRevalidate(request, IMAGE_CACHE_NAME);
    }
    
    // API calls - Network Only
    if (isApiCall(url)) {
      return await networkOnly(request);
    }
    
    // Pages - Network First with fallback
    if (isPageRequest(url)) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Default - Network First
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('Service Worker fetch error:', error);
    return await handleOffline(request);
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch fresh version in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Ignore network errors for background updates
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If no cache, wait for network
  return await fetchPromise;
}

// Network Only Strategy
async function networkOnly(request) {
  return await fetch(request);
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // Return cached page if available
  if (isPageRequest(url)) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    const offlineResponse = await cache.match('/');
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // Return offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: '您当前处于离线状态，请检查网络连接'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Enhanced helper functions with font detection
function isStaticAsset(url) {
  return url.pathname.includes('/_next/static/') ||
         url.pathname.includes('/static/') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.ico') ||
         url.pathname.endsWith('.json');
}

function isFont(url) {
  return url.pathname.endsWith('.woff') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.ttf') ||
         url.pathname.endsWith('.otf') ||
         url.hostname === 'fonts.googleapis.com' ||
         url.hostname === 'fonts.gstatic.com';
}

function isImage(url) {
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i) ||
         url.hostname === 'images.unsplash.com';
}

function isApiCall(url) {
  return url.pathname.startsWith('/api/') ||
         url.pathname.includes('/api/');
}

function isPageRequest(url) {
  return url.pathname === '/' ||
         url.pathname.startsWith('/features') ||
         url.pathname.startsWith('/download') ||
         url.pathname.startsWith('/about') ||
         url.pathname.startsWith('/contact') ||
         url.pathname.startsWith('/tech');
}

// Cache management utilities
async function cleanupCache(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > limit) {
    const keysToDelete = keys.slice(0, keys.length - limit);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
    console.log(`Cleaned up ${keysToDelete.length} items from ${cacheName}`);
  }
}

// Enhanced request handling with font caching
async function handleRequestEnhanced(request) {
  const url = new URL(request.url);
  
  try {
    // Fonts - Cache First with long TTL
    if (isFont(url)) {
      return await cacheFirst(request, FONT_CACHE_NAME);
    }
    
    // Static assets - Cache First
    if (isStaticAsset(url)) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // Images - Stale While Revalidate
    if (isImage(url)) {
      return await staleWhileRevalidate(request, IMAGE_CACHE_NAME);
    }
    
    // API calls - Network First with short cache
    if (isApiCall(url)) {
      return await networkFirst(request, API_CACHE_NAME);
    }
    
    // Pages - Network First with fallback
    if (isPageRequest(url)) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Default - Network First
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('Service Worker fetch error:', error);
    return await handleOffline(request);
  }
}

// Performance monitoring
function measureCachePerformance(cacheName, startTime) {
  const duration = performance.now() - startTime;
  console.log(`Cache ${cacheName} operation took ${duration.toFixed(2)}ms`);
  
  // Send performance data to analytics if needed
  if (duration > 100) {
    console.warn(`Slow cache operation detected: ${cacheName} - ${duration.toFixed(2)}ms`);
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Handle background sync for contact form submissions
  console.log('Background sync: contact form');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'turbopush-notification',
      requireInteraction: true
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Periodic background sync (for future use)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  console.log('Periodic sync: content update');
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker loaded successfully');