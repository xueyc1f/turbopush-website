'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  registerServiceWorker, 
  skipWaiting, 
  addNetworkListeners,
  preloadCriticalResources,
  PerformanceMonitor
} from '@/lib/service-worker';
import { 
  initializePerformanceOptimizations, 
  WebVitalsOptimizer,
  ResourceOptimizer 
} from '@/lib/performance';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Register service worker
    registerServiceWorker({
      onUpdate: () => {
        setUpdateAvailable(true);
      },
      onSuccess: () => {
        console.log('Service Worker registered successfully');
      },
      onError: (error) => {
        console.error('Service Worker registration failed:', error);
      }
    });

    // Add network listeners
    const cleanup = addNetworkListeners(
      () => setIsOnline(true),
      () => setIsOnline(false)
    );

    // Preload critical resources
    preloadCriticalResources();

    // Start performance monitoring
    PerformanceMonitor.measurePageLoad();
    PerformanceMonitor.measureResourceTiming();

    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Initialize Web Vitals optimizations
    WebVitalsOptimizer.initializeOptimizations();

    // Initialize resource optimizer
    const resourceOptimizer = ResourceOptimizer.getInstance();
    resourceOptimizer.preloadCriticalResources();

    // Set initial online status
    setIsOnline(navigator.onLine);

    return cleanup;
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    skipWaiting();
    
    // Wait a bit for the service worker to update
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {children}
      
      {/* Update notification */}
      {updateAvailable && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">新版本可用</p>
                <p className="text-xs opacity-90">点击更新以获取最新功能</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-shrink-0"
              >
                {isUpdating ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  '更新'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Offline notification */}
      {!isOnline && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">您当前处于离线状态</span>
          </div>
        </div>
      )}

      {/* Online notification (brief) */}
      {isOnline && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 opacity-0 animate-pulse">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">已恢复网络连接</span>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for using service worker status
export function useServiceWorker() {
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable] = useState(false);

  useEffect(() => {
    const cleanup = addNetworkListeners(
      () => setIsOnline(true),
      () => setIsOnline(false)
    );

    setIsOnline(navigator.onLine);

    return cleanup;
  }, []);

  return {
    isOnline,
    updateAvailable,
    update: () => {
      skipWaiting();
      setTimeout(() => window.location.reload(), 1000);
    }
  };
}