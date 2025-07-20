import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

// Loading component for dynamic imports
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

// Error boundary component for dynamic imports
export const ErrorFallback: ComponentType<{ error: Error }> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-destructive mb-2">组件加载失败</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  );
};

// Utility function to create dynamic imports with consistent loading states
export function createDynamicImport<T = Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFn, {
    loading: LoadingSpinner,
    ssr: options.ssr ?? true,
  });
}

// Pre-configured dynamic imports for common components
export const DynamicContactForm = dynamic(
  () => import('@/components/sections/contact-form').then(mod => ({ default: mod.ContactForm })),
  { loading: LoadingSpinner }
);

export const DynamicProductDemo = dynamic(
  () => import('@/components/sections/product-demo-section').then(mod => ({ default: mod.ProductDemoSection })),
  { loading: LoadingSpinner }
);

export const DynamicAnalyticsDashboard = dynamic(
  () => import('@/components/sections/analytics-dashboard-demo').then(mod => ({ default: mod.AnalyticsDashboardDemo })),
  { loading: LoadingSpinner }
);

export const DynamicScheduledPublishing = dynamic(
  () => import('@/components/sections/scheduled-publishing-demo').then(mod => ({ default: mod.ScheduledPublishingDemo })),
  { loading: LoadingSpinner }
);

export const DynamicMultiPlatformDemo = dynamic(
  () => import('@/components/sections/multi-platform-demo').then(mod => ({ default: mod.MultiPlatformDemo })),
  { loading: LoadingSpinner }
);

export const DynamicContentCreationDemo = dynamic(
  () => import('@/components/sections/content-creation-demo').then(mod => ({ default: mod.ContentCreationDemo })),
  { loading: LoadingSpinner }
);

// Lazy loading utility for non-critical components
export function lazyLoad<T = Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>
) {
  return createDynamicImport(importFn, { ssr: false });
}

// Enhanced preload utility for critical components
export function preloadComponent(importFn: () => Promise<unknown>, priority: 'high' | 'low' = 'low') {
  if (typeof window !== 'undefined') {
    if (priority === 'high') {
      // Preload immediately for high priority components
      importFn();
    } else {
      // Preload on idle or after a delay for low priority
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => importFn(), { timeout: 2000 });
      } else {
        setTimeout(() => importFn(), 100);
      }
    }
  }
}

// Preload components based on user interaction
export function preloadOnHover(importFn: () => Promise<unknown>) {
  let isPreloaded = false;
  
  return {
    onMouseEnter: () => {
      if (!isPreloaded) {
        isPreloaded = true;
        preloadComponent(importFn, 'high');
      }
    },
    onFocus: () => {
      if (!isPreloaded) {
        isPreloaded = true;
        preloadComponent(importFn, 'high');
      }
    }
  };
}

// Route-based preloading
export function preloadRouteComponents() {
  if (typeof window === 'undefined') return;

  // Preload components for likely next routes
  const routePreloads = [
    () => import('@/app/features/page'),
    () => import('@/app/download/page'),
    () => import('@/app/contact/page'),
  ];

  // Preload after initial page load
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      routePreloads.forEach(importFn => importFn());
    }, { timeout: 5000 });
  } else {
    setTimeout(() => {
      routePreloads.forEach(importFn => importFn());
    }, 2000);
  }
}

// Bundle analyzer helper (development only)
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available at: http://localhost:3000/__nextjs_original-stack-frame');
  }
}