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
export const DynamicAboutSection = dynamic(
  () =>
    import('@/components/sections/about-section').then((mod) => ({
      default: mod.AboutSection,
    })),
  { loading: LoadingSpinner }
);

export const DynamicContactSection = dynamic(
  () =>
    import('@/components/sections/contact-section').then((mod) => ({
      default: mod.ContactSection,
    })),
  { loading: LoadingSpinner }
);

// Lazy loading utility for non-critical components
export function lazyLoad<T = Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>
) {
  return createDynamicImport(importFn, { ssr: false });
}

// Enhanced preload utility for critical components
export function preloadComponent(
  importFn: () => Promise<unknown>,
  priority: 'high' | 'low' = 'low'
) {
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
    },
  };
}

// Route-based preloading
export function preloadRouteComponents() {
  if (typeof window === 'undefined') return;

  // No additional routes to preload for single-page website
  console.log('Single-page website - no additional routes to preload');
}

// Bundle analyzer helper (development only)
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      'Bundle analysis available at: http://localhost:3000/__nextjs_original-stack-frame'
    );
  }
}
