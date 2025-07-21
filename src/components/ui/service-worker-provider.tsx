'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  registerServiceWorker,
  skipWaiting,
  preloadCriticalResources,
  PerformanceMonitor,
} from '@/lib/service-worker';
import {
  initializePerformanceOptimizations,
  WebVitalsOptimizer,
  ResourceOptimizer,
} from '@/lib/performance';
import { RefreshCw } from 'lucide-react';

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

export function ServiceWorkerProvider({
  children,
}: ServiceWorkerProviderProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
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
      },
    });

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
    </>
  );
}

// Hook for using service worker status
export function useServiceWorker() {
  const [isOnline] = useState(true);
  const [updateAvailable] = useState(false);

  return {
    isOnline,
    updateAvailable,
    update: () => {
      skipWaiting();
      setTimeout(() => window.location.reload(), 1000);
    },
  };
}
