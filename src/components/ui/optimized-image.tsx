'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-muted"
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          fill ? 'object-cover' : ''
        )}
      />
    </div>
  );
}

// Utility function to generate blur data URL
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
}

// Hook for intersection observer based lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

// Enhanced lazy loading component with better performance and cross-device optimization
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const imgRef = useRef<HTMLDivElement>(null);

  // Detect device pixel ratio for high-DPI displays
  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio || 1);
    
    const handlePixelRatioChange = () => {
      setDevicePixelRatio(window.devicePixelRatio || 1);
    };

    // Listen for pixel ratio changes (e.g., when moving between displays)
    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    mediaQuery.addEventListener('change', handlePixelRatioChange);

    return () => mediaQuery.removeEventListener('change', handlePixelRatioChange);
  }, []);

  // Use intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Load images 100px before they come into view
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Note: generateSrcSet functionality is handled by Next.js Image component automatically

  // Generate sizes attribute for responsive images with better tablet support
  const generateSizes = () => {
    return [
      '(max-width: 480px) 100vw',      // Small mobile
      '(max-width: 640px) 100vw',      // Mobile
      '(max-width: 768px) 80vw',       // Large mobile/small tablet
      '(max-width: 1024px) 60vw',      // Tablet
      '(max-width: 1280px) 50vw',      // Small desktop
      '(max-width: 1536px) 40vw',      // Desktop
      '33vw'                           // Large desktop
    ].join(', ');
  };

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted"
          style={{ width, height }}
        />
      )}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          sizes={generateSizes()}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            // Optimize for different pixel densities
            devicePixelRatio > 1 ? 'image-rendering: -webkit-optimize-contrast' : ''
          )}
          {...props}
        />
      )}
    </div>
  );
}

// Cross-device responsive image component with automatic optimization
interface ResponsiveImageProps extends OptimizedImageProps {
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  breakpoints = { mobile: 640, tablet: 1024, desktop: 1280 },
  ...props
}: ResponsiveImageProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < breakpoints.mobile!) {
        setCurrentBreakpoint('mobile');
      } else if (width < breakpoints.tablet!) {
        setCurrentBreakpoint('tablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [breakpoints]);

  // Adjust quality based on device type and connection
  const getOptimalQuality = () => {
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    const effectiveType = connection?.effectiveType;
    
    // Lower quality for slow connections
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 60;
    } else if (effectiveType === '3g') {
      return 75;
    }
    
    // Adjust quality based on device type
    switch (currentBreakpoint) {
      case 'mobile':
        return 80;
      case 'tablet':
        return 85;
      case 'desktop':
        return 90;
      default:
        return 85;
    }
  };

  return (
    <LazyImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      quality={getOptimalQuality()}
      {...props}
    />
  );
}