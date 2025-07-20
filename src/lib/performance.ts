'use client';

import React from 'react';

// Performance optimization utilities

// Intersection Observer for lazy loading
export class LazyLoader {
  private observer: IntersectionObserver | null = null;
  private elements: Set<Element> = new Set();

  constructor(options: IntersectionObserverInit = {}) {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: '50px',
          threshold: 0.1,
          ...options,
        }
      );
    }
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Handle image lazy loading
        if (element.tagName === 'IMG') {
          const img = element as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
        }

        // Handle background image lazy loading
        const bgSrc = element.getAttribute('data-bg-src');
        if (bgSrc) {
          (element as HTMLElement).style.backgroundImage = `url(${bgSrc})`;
          element.removeAttribute('data-bg-src');
        }

        // Handle iframe lazy loading
        if (element.tagName === 'IFRAME') {
          const iframe = element as HTMLIFrameElement;
          const src = iframe.dataset.src;
          if (src) {
            iframe.src = src;
            iframe.removeAttribute('data-src');
          }
        }

        // Trigger custom load event
        element.dispatchEvent(new CustomEvent('lazyload'));

        this.unobserve(element);
      }
    });
  }

  observe(element: Element) {
    if (this.observer) {
      this.observer.observe(element);
      this.elements.add(element);
    }
  }

  unobserve(element: Element) {
    if (this.observer) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

// Global lazy loader instance
let globalLazyLoader: LazyLoader | null = null;

export function getLazyLoader(): LazyLoader {
  if (!globalLazyLoader) {
    globalLazyLoader = new LazyLoader();
  }
  return globalLazyLoader;
}

// Resource preloading utilities
export class ResourcePreloader {
  private preloadedResources: Set<string> = new Set();

  preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;

      // Set priority hint if supported
      if ('fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          priority;
      }

      img.src = src;
    });
  }

  preloadCSS(href: string): void {
    if (this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      this.preloadedResources.add(href);
    };

    document.head.appendChild(link);
  }

  preloadScript(src: string): void {
    if (this.preloadedResources.has(src)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    link.onload = () => {
      this.preloadedResources.add(src);
    };

    document.head.appendChild(link);
  }

  prefetchResource(href: string): void {
    if (this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.onload = () => {
      this.preloadedResources.add(href);
    };

    document.head.appendChild(link);
  }
}

// Global resource preloader instance
let globalPreloader: ResourcePreloader | null = null;

export function getResourcePreloader(): ResourcePreloader {
  if (!globalPreloader) {
    globalPreloader = new ResourcePreloader();
  }
  return globalPreloader;
}

// Performance monitoring utilities
export class PerformanceTracker {
  private metrics: Map<string, number> = new Map();

  startTiming(name: string): void {
    this.metrics.set(`${name}_start`, performance.now());
  }

  endTiming(name: string): number {
    const startTime = this.metrics.get(`${name}_start`);
    if (startTime === undefined) {
      console.warn(`No start time found for ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.set(name, duration);
    return duration;
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    this.metrics.forEach((value, key) => {
      if (!key.endsWith('_start')) {
        result[key] = value;
      }
    });
    return result;
  }

  measureCLS(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    let clsValue = 0;
    const clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!layoutShiftEntry.hadRecentInput) {
          clsEntries.push(entry);
          clsValue += layoutShiftEntry.value || 0;
        }
      }

      this.metrics.set('cls', clsValue);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  }

  measureLCP(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('lcp', lastEntry.startTime);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  measureFID(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEntry & {
          processingStart?: number;
        };
        this.metrics.set(
          'fid',
          (fidEntry.processingStart || 0) - entry.startTime
        );
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
  }

  measureAllCoreWebVitals(): void {
    this.measureCLS();
    this.measureLCP();
    this.measureFID();
  }
}

// Global performance tracker
let globalTracker: PerformanceTracker | null = null;

export function getPerformanceTracker(): PerformanceTracker {
  if (!globalTracker) {
    globalTracker = new PerformanceTracker();
  }
  return globalTracker;
}

// Bundle size optimization utilities
export function loadComponentWhenVisible<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>
) {
  return React.lazy(() => {
    return new Promise<{ default: React.ComponentType<T> }>((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              importFn().then(resolve);
            }
          });
        },
        { rootMargin: '100px' }
      );

      // Create a placeholder element to observe
      const placeholder = document.createElement('div');
      placeholder.style.height = '1px';
      document.body.appendChild(placeholder);
      observer.observe(placeholder);

      // Cleanup after 10 seconds
      setTimeout(() => {
        observer.disconnect();
        document.body.removeChild(placeholder);
        importFn().then(resolve);
      }, 10000);
    });
  });
}

// Critical resource hints
export function addCriticalResourceHints(): void {
  if (typeof document === 'undefined') return;

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ];

  hints.forEach(({ rel, href, crossOrigin }) => {
    const existing = document.querySelector(
      `link[rel="${rel}"][href="${href}"]`
    );
    if (!existing) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      document.head.appendChild(link);
    }
  });
}

// Image optimization utilities
export function generateSrcSet(
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return sizes
    .map((size) => {
      const url = new URL(baseSrc);
      url.searchParams.set('w', size.toString());
      url.searchParams.set('q', '85');
      return `${url.toString()} ${size}w`;
    })
    .join(', ');
}

export function generateSizes(
  breakpoints: Record<string, string> = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw',
  }
): string {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries
    .slice(0, -1)
    .map(([query, size]) => `${query} ${size}`);
  const defaultSize = breakpoints.default || '100vw';

  return [...mediaQueries, defaultSize].join(', ');
}

// Initialize performance optimizations
export function initializePerformanceOptimizations(): void {
  if (typeof window === 'undefined') return;

  // Add critical resource hints
  addCriticalResourceHints();

  // Start performance tracking
  const tracker = getPerformanceTracker();
  tracker.measureAllCoreWebVitals();

  // Initialize lazy loading
  const lazyLoader = getLazyLoader();

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    lazyLoader.observe(img);
  });

  // Observe all elements with data-bg-src attribute
  document.querySelectorAll('[data-bg-src]').forEach((element) => {
    lazyLoader.observe(element);
  });

  // Initialize content visibility optimization
  initializeContentVisibility();

  // Preload critical resources
  const preloader = getResourcePreloader();

  // Preload critical images that actually exist
  const criticalImages = ['/og-image.jpg'];

  criticalImages.forEach((src) => {
    preloader.preloadImage(src, 'high');
  });

  // Initialize performance monitoring
  initializePerformanceMonitoring();

  // Optimize scroll performance
  optimizeScrollPerformance();

  console.log('Performance optimizations initialized');
}

// Content visibility optimization for better rendering performance
function initializeContentVisibility(): void {
  if (!('content-visibility' in document.documentElement.style)) {
    return; // Browser doesn't support content-visibility
  }

  // Add content-visibility to off-screen sections
  const sections = document.querySelectorAll('section:not(.hero-section)');
  sections.forEach((section) => {
    (section as HTMLElement).style.contentVisibility = 'auto';
    (section as HTMLElement).style.containIntrinsicSize = '0 500px';
  });
}

// Enhanced performance monitoring
function initializePerformanceMonitoring(): void {
  // Monitor Long Tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn(`Long task detected: ${entry.duration}ms`);
        // Send to analytics if needed
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch {
      // longtask not supported
    }

    // Monitor memory usage
    if ('memory' in performance) {
      const memoryInfo = (
        performance as Performance & {
          memory?: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }
      ).memory;
      if (memoryInfo) {
        console.log('Memory usage:', {
          used: Math.round(memoryInfo.usedJSHeapSize / 1048576) + 'MB',
          total: Math.round(memoryInfo.totalJSHeapSize / 1048576) + 'MB',
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) + 'MB',
        });
      }
    }
  }
}

// Optimize scroll performance
function optimizeScrollPerformance(): void {
  let ticking = false;

  function updateScrollElements() {
    // Update scroll-dependent elements here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  }

  // Throttled scroll handler
  window.addEventListener('scroll', requestTick, { passive: true });

  // Optimize scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

// Resource loading optimization
export class ResourceOptimizer {
  private static instance: ResourceOptimizer;
  private loadedResources = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  static getInstance(): ResourceOptimizer {
    if (!ResourceOptimizer.instance) {
      ResourceOptimizer.instance = new ResourceOptimizer();
    }
    return ResourceOptimizer.instance;
  }

  async loadImageOptimized(
    src: string,
    priority: 'high' | 'low' = 'low'
  ): Promise<HTMLImageElement> {
    if (this.loadedResources.has(src)) {
      const img = new Image();
      img.src = src;
      return img;
    }

    if (this.loadingPromises.has(src)) {
      await this.loadingPromises.get(src);
      const img = new Image();
      img.src = src;
      return img;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.loadedResources.add(src);
        this.loadingPromises.delete(src);
        resolve();
      };

      img.onerror = () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Set loading priority if supported
      if ('loading' in img) {
        img.loading = priority === 'high' ? 'eager' : 'lazy';
      }

      // Set fetch priority if supported
      if ('fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          priority;
      }

      img.src = src;
    });

    this.loadingPromises.set(src, loadPromise);
    await loadPromise;

    const img = new Image();
    img.src = src;
    return img;
  }

  preloadCriticalResources(): void {
    // Only preload resources that actually exist
    const criticalResources = [
      { type: 'image', src: '/og-image.jpg', priority: 'high' },
    ];

    criticalResources.forEach(({ type, src, priority }) => {
      if (type === 'image') {
        this.loadImageOptimized(src, priority as 'high' | 'low');
      } else {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = type === 'script' ? 'script' : 'style';
        link.href = src;
        if ('fetchPriority' in link) {
          (
            link as HTMLLinkElement & {
              fetchPriority?: 'high' | 'low' | 'auto';
            }
          ).fetchPriority = priority as 'high' | 'low';
        }
        document.head.appendChild(link);
      }
    });
  }
}

// Web Vitals optimization utilities
export class WebVitalsOptimizer {
  static optimizeLCP(): void {
    // Preload LCP image
    const heroImage = document.querySelector(
      '.hero-section img'
    ) as HTMLImageElement;
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      if ('fetchPriority' in link) {
        (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority =
          'high';
      }
      document.head.appendChild(link);
    }
  }

  static optimizeFID(): void {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll(
      'script[src]:not([async]):not([defer])'
    );
    scripts.forEach((script) => {
      const scriptElement = script as HTMLScriptElement;
      if (!scriptElement.src.includes('critical')) {
        scriptElement.setAttribute('defer', '');
      }
    });
  }

  static optimizeCLS(): void {
    // Add size attributes to images without them
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
        htmlImg.width = htmlImg.naturalWidth;
        htmlImg.height = htmlImg.naturalHeight;
      }
    });

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll(
      '[data-dynamic-content]'
    );
    dynamicContainers.forEach((container) => {
      const htmlContainer = container as HTMLElement;
      if (!htmlContainer.style.minHeight) {
        htmlContainer.style.minHeight = '200px';
      }
    });
  }

  static initializeOptimizations(): void {
    if (typeof window === 'undefined') return;

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.optimizeLCP();
        this.optimizeFID();
        this.optimizeCLS();
      });
    } else {
      this.optimizeLCP();
      this.optimizeFID();
      this.optimizeCLS();
    }
  }
}
