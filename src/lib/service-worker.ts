'use client';

// Service Worker registration and management utilities

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

// Register service worker
export async function registerServiceWorker(config: ServiceWorkerConfig = {}) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New content available
            console.log('New content available, please refresh');
            config.onUpdate?.(registration);
          } else {
            // Content cached for offline use
            console.log('Content cached for offline use');
            config.onSuccess?.(registration);
          }
        }
      });
    });

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    config.onError?.(error as Error);
  }
}

// Unregister service worker
export async function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('Service Worker unregistered');
    }
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
  }
}

// Update service worker
export async function updateServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Service Worker update triggered');
    }
  } catch (error) {
    console.error('Service Worker update failed:', error);
  }
}

// Skip waiting and activate new service worker
export function skipWaiting() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
}

// Get service worker version
export async function getServiceWorkerVersion(): Promise<string | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      resolve(event.data.version || null);
    };

    navigator.serviceWorker.controller?.postMessage({ type: 'GET_VERSION' }, [
      messageChannel.port2,
    ]);

    // Timeout after 5 seconds
    setTimeout(() => resolve(null), 5000);
  });
}

// Check if app is running in standalone mode (PWA)
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

// Check if device is online
export function isOnline(): boolean {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
}

// Listen for online/offline events
export function addNetworkListeners(
  onOnline?: () => void,
  onOffline?: () => void
) {
  if (typeof window === 'undefined') return;

  const handleOnline = () => {
    console.log('App is online');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('App is offline');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // For single-page application, only preload actual resources
  const criticalResources = ['/manifest.json', '/og-image.jpg'];

  criticalResources.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Cache management utilities
export class CacheManager {
  static async clearCache(cacheName?: string) {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return;
    }

    try {
      if (cacheName) {
        await caches.delete(cacheName);
        console.log(`Cache ${cacheName} cleared`);
      } else {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
        console.log('All caches cleared');
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  static async getCacheSize(): Promise<number> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return 0;
    }

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();

        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    } catch (error) {
      console.error('Failed to calculate cache size:', error);
      return 0;
    }
  }

  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;

        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          request: perfData.responseStart - perfData.requestStart,
          response: perfData.responseEnd - perfData.responseStart,
          dom:
            perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart,
          load: perfData.loadEventEnd - perfData.loadEventStart,
          total: perfData.loadEventEnd - perfData.fetchStart,
        };

        console.log('Performance metrics:', metrics);

        // Send to analytics if needed
        // analytics.track('page_performance', metrics);
      }, 0);
    });
  }

  static measureResourceTiming() {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          console.log(
            `Resource: ${resource.name}, Duration: ${resource.duration}ms`
          );
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
}
