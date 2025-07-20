'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Hook for detecting device type and screen size
export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [screenSize, setScreenSize] = React.useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('landscape');

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setOrientation(width > height ? 'landscape' : 'portrait');
      
      // Enhanced device detection with tablet-specific breakpoints
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        // Consider both width and touch capability for tablet detection
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setDeviceType(isTouchDevice ? 'tablet' : 'desktop');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return { deviceType, screenSize, orientation };
}

// Responsive container with device-specific optimizations
interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'responsive';
  centerContent?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'xl',
  padding = 'responsive',
  centerContent = false,
  ...props
}: ResponsiveContainerProps) {
  // Note: deviceType could be used for future device-specific optimizations

  const containerClasses = cn(
    'w-full mx-auto',
    // Max width variants
    {
      'max-w-screen-sm': maxWidth === 'sm',
      'max-w-screen-md': maxWidth === 'md',
      'max-w-screen-lg': maxWidth === 'lg',
      'max-w-screen-xl': maxWidth === 'xl',
      'max-w-screen-2xl': maxWidth === '2xl',
      'max-w-full': maxWidth === 'full',
    },
    // Padding variants with device-specific optimizations
    {
      'px-0': padding === 'none',
      'px-2 sm:px-4': padding === 'sm',
      'px-4 sm:px-6 lg:px-8': padding === 'md',
      'px-6 sm:px-8 lg:px-12': padding === 'lg',
      // Responsive padding with tablet optimization
      'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16': padding === 'responsive',
    },
    // Center content if requested
    {
      'flex flex-col items-center': centerContent,
    },
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
}

// Adaptive grid component with intelligent layout switching
interface AdaptiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  minItemWidth?: number;
  maxColumns?: number;
  gap?: 'sm' | 'md' | 'lg';
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function AdaptiveGrid({
  items,
  minItemWidth = 280,
  maxColumns = 6,
  gap = 'md',
  aspectRatio = 'auto',
  className,
  ...props
}: AdaptiveGridProps) {
  const { screenSize } = useDeviceType();
  const [columns, setColumns] = React.useState(1);

  React.useEffect(() => {
    if (screenSize.width === 0) return;

    // Calculate optimal number of columns based on screen width and min item width
    const padding = screenSize.width < 640 ? 32 : 64; // Account for padding
    const availableWidth = screenSize.width - padding;
    const possibleColumns = Math.floor(availableWidth / minItemWidth);
    const optimalColumns = Math.min(possibleColumns, maxColumns, items.length);
    
    setColumns(Math.max(1, optimalColumns));
  }, [screenSize.width, minItemWidth, maxColumns, items.length]);

  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div
      className={cn(
        'grid w-full',
        gapClasses[gap],
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'w-full',
            aspectRatioClasses[aspectRatio]
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// Responsive text component with device-optimized sizing
interface ResponsiveTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  responsive?: boolean;
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  responsive = true,
  className,
  ...props
}: ResponsiveTextProps) {
  const { deviceType } = useDeviceType();

  // Base size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  // Responsive size adjustments
  const responsiveSizeClasses = responsive ? {
    xs: 'text-xs',
    sm: 'text-xs sm:text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
    '2xl': 'text-xl sm:text-2xl',
    '3xl': 'text-2xl sm:text-3xl md:text-3xl',
    '4xl': 'text-3xl sm:text-4xl md:text-4xl',
    '5xl': 'text-4xl sm:text-5xl md:text-5xl',
  } : sizeClasses;

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const textClasses = cn(
    responsiveSizeClasses[size],
    weightClasses[weight],
    // Device-specific optimizations
    {
      'leading-tight': deviceType === 'mobile' && ['3xl', '4xl', '5xl'].includes(size),
      'leading-relaxed': deviceType === 'mobile' && ['xs', 'sm', 'base'].includes(size),
    },
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
}

// Cross-device spacing utility
interface ResponsiveSpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'vertical' | 'horizontal' | 'both';
}

export function ResponsiveSpacing({
  size = 'md',
  direction = 'vertical',
  className,
  ...props
}: ResponsiveSpacingProps) {
  const spacingClasses = {
    xs: {
      vertical: 'py-2 sm:py-3',
      horizontal: 'px-2 sm:px-3',
      both: 'p-2 sm:p-3',
    },
    sm: {
      vertical: 'py-3 sm:py-4 md:py-6',
      horizontal: 'px-3 sm:px-4 md:px-6',
      both: 'p-3 sm:p-4 md:p-6',
    },
    md: {
      vertical: 'py-4 sm:py-6 md:py-8 lg:py-12',
      horizontal: 'px-4 sm:px-6 md:px-8 lg:px-12',
      both: 'p-4 sm:p-6 md:p-8 lg:p-12',
    },
    lg: {
      vertical: 'py-6 sm:py-8 md:py-12 lg:py-16',
      horizontal: 'px-6 sm:px-8 md:px-12 lg:px-16',
      both: 'p-6 sm:p-8 md:p-12 lg:p-16',
    },
    xl: {
      vertical: 'py-8 sm:py-12 md:py-16 lg:py-20',
      horizontal: 'px-8 sm:px-12 md:px-16 lg:px-20',
      both: 'p-8 sm:p-12 md:p-16 lg:p-20',
    },
    '2xl': {
      vertical: 'py-12 sm:py-16 md:py-20 lg:py-24',
      horizontal: 'px-12 sm:px-16 md:px-20 lg:px-24',
      both: 'p-12 sm:p-16 md:p-20 lg:p-24',
    },
  };

  return (
    <div
      className={cn(spacingClasses[size][direction], className)}
      {...props}
    />
  );
}

// Device-specific component renderer
interface DeviceSpecificProps {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DeviceSpecific({
  mobile,
  tablet,
  desktop,
  fallback,
}: DeviceSpecificProps) {
  const { deviceType } = useDeviceType();

  switch (deviceType) {
    case 'mobile':
      return mobile || fallback || null;
    case 'tablet':
      return tablet || fallback || null;
    case 'desktop':
      return desktop || fallback || null;
    default:
      return fallback || null;
  }
}