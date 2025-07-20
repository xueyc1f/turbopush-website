/**
 * Cross-device utilities for optimal user experience
 */

// Device detection utilities
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  screenSize: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  pixelRatio: number;
  touchCapable: boolean;
  connectionType?: string;
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      type: 'desktop',
      screenSize: { width: 1920, height: 1080 },
      orientation: 'landscape',
      pixelRatio: 1,
      touchCapable: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;
  const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Enhanced device type detection
  let type: 'mobile' | 'tablet' | 'desktop';
  if (width < 640) {
    type = 'mobile';
  } else if (width < 1024) {
    // Consider touch capability for tablet detection
    type = touchCapable ? 'tablet' : 'desktop';
  } else {
    type = 'desktop';
  }

  // Get connection information if available
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  const connectionType = connection?.effectiveType;

  return {
    type,
    screenSize: { width, height },
    orientation: width > height ? 'landscape' : 'portrait',
    pixelRatio,
    touchCapable,
    connectionType,
  };
}

// Responsive breakpoint utilities
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export function getCurrentBreakpoint(): keyof typeof breakpoints | 'base' {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'base';
}

// Image optimization utilities
export function getOptimalImageSize(
  originalWidth: number,
  originalHeight: number,
  deviceInfo: DeviceInfo
): { width: number; height: number; quality: number } {
  const { type, screenSize, pixelRatio, connectionType } = deviceInfo;
  
  // Base quality adjustments based on connection
  let quality = 85;
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    quality = 60;
  } else if (connectionType === '3g') {
    quality = 75;
  }

  // Device-specific quality adjustments
  switch (type) {
    case 'mobile':
      quality = Math.min(quality, 80);
      break;
    case 'tablet':
      quality = Math.min(quality, 85);
      break;
    case 'desktop':
      quality = Math.min(quality, 90);
      break;
  }

  // Calculate optimal dimensions
  const maxWidth = Math.min(screenSize.width * pixelRatio, originalWidth);
  const maxHeight = Math.min(screenSize.height * pixelRatio, originalHeight);
  
  const aspectRatio = originalWidth / originalHeight;
  let width = maxWidth;
  let height = width / aspectRatio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
    quality,
  };
}

// Layout optimization utilities
export function getOptimalGridColumns(
  itemCount: number,
  minItemWidth: number,
  deviceInfo: DeviceInfo
): number {
  const { screenSize, type } = deviceInfo;
  
  // Account for padding based on device type
  const padding = type === 'mobile' ? 32 : type === 'tablet' ? 48 : 64;
  const availableWidth = screenSize.width - padding;
  
  // Calculate possible columns
  const possibleColumns = Math.floor(availableWidth / minItemWidth);
  
  // Device-specific max columns
  const maxColumns = {
    mobile: 2,
    tablet: 4,
    desktop: 6,
  };
  
  return Math.min(possibleColumns, maxColumns[type], itemCount);
}

// Touch optimization utilities
export function getTouchTargetSize(deviceInfo: DeviceInfo): number {
  const { type, touchCapable } = deviceInfo;
  
  if (!touchCapable) return 32; // Standard desktop size
  
  switch (type) {
    case 'mobile':
      return 48; // iOS/Android recommendation
    case 'tablet':
      return 44; // Slightly smaller for tablets
    case 'desktop':
      return 40; // Touch-enabled desktop
    default:
      return 44;
  }
}

// Performance optimization utilities
export function shouldUseReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function shouldPreloadImages(deviceInfo: DeviceInfo): boolean {
  const { connectionType } = deviceInfo;
  
  // Don't preload on slow connections
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    return false;
  }
  
  return true;
}

// Typography optimization utilities
export function getOptimalFontSize(
  baseFontSize: number,
  deviceInfo: DeviceInfo
): number {
  const { type, screenSize } = deviceInfo;
  
  // Scale factor based on device type and screen size
  let scaleFactor = 1;
  
  switch (type) {
    case 'mobile':
      // Slightly larger text on small screens for readability
      scaleFactor = screenSize.width < 375 ? 1.1 : 1;
      break;
    case 'tablet':
      // Standard scaling for tablets
      scaleFactor = 1;
      break;
    case 'desktop':
      // Slightly smaller text on large screens
      scaleFactor = screenSize.width > 1920 ? 0.95 : 1;
      break;
  }
  
  return Math.round(baseFontSize * scaleFactor);
}

// Spacing optimization utilities
export function getOptimalSpacing(
  baseSpacing: number,
  deviceInfo: DeviceInfo
): number {
  const { type, screenSize } = deviceInfo;
  
  let multiplier = 1;
  
  switch (type) {
    case 'mobile':
      // Tighter spacing on mobile
      multiplier = screenSize.width < 375 ? 0.8 : 0.9;
      break;
    case 'tablet':
      // Standard spacing for tablets
      multiplier = 1;
      break;
    case 'desktop':
      // More generous spacing on desktop
      multiplier = 1.1;
      break;
  }
  
  return Math.round(baseSpacing * multiplier);
}

// Utility to generate responsive CSS classes
export function generateResponsiveClasses(
  mobileClass: string,
  tabletClass: string,
  desktopClass: string
): string {
  return `${mobileClass} md:${tabletClass} lg:${desktopClass}`;
}

// Hook for device-aware component rendering
export function useDeviceAwareRendering() {
  const deviceInfo = getDeviceInfo();
  
  return {
    deviceInfo,
    isMobile: deviceInfo.type === 'mobile',
    isTablet: deviceInfo.type === 'tablet',
    isDesktop: deviceInfo.type === 'desktop',
    isTouchDevice: deviceInfo.touchCapable,
    isHighDPI: deviceInfo.pixelRatio > 1,
    shouldReduceMotion: shouldUseReducedMotion(),
    shouldPreloadImages: shouldPreloadImages(deviceInfo),
    optimalTouchTargetSize: getTouchTargetSize(deviceInfo),
  };
}

// Viewport utilities
export function getViewportInfo() {
  if (typeof window === 'undefined') {
    return {
      width: 1920,
      height: 1080,
      aspectRatio: 16/9,
      isLandscape: true,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return {
    width,
    height,
    aspectRatio: width / height,
    isLandscape: width > height,
  };
}

// Content optimization utilities
export function getOptimalContentWidth(deviceInfo: DeviceInfo): number {
  const { type, screenSize } = deviceInfo;
  
  switch (type) {
    case 'mobile':
      return Math.min(screenSize.width - 32, 600); // 16px padding on each side
    case 'tablet':
      return Math.min(screenSize.width * 0.9, 800);
    case 'desktop':
      return Math.min(screenSize.width * 0.8, 1200);
    default:
      return 800;
  }
}