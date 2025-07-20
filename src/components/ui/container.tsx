import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
      // Enhanced sizes for better cross-device support
      'content': 'max-w-4xl',
      'reading': 'max-w-3xl',
      'narrow': 'max-w-2xl',
    },
    padding: {
      none: '',
      xs: 'px-2 sm:px-4',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 md:px-8 lg:px-12',
      lg: 'px-6 sm:px-8 md:px-12 lg:px-16',
      xl: 'px-8 sm:px-12 md:px-16 lg:px-20',
      // Responsive padding that adapts to device type
      responsive: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
    },
    // Cross-device specific variants
    deviceOptimized: {
      true: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'md',
    deviceOptimized: false,
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  // Cross-device optimization props
  centerContent?: boolean;
  fullHeightOnMobile?: boolean;
}

function Container({
  className,
  size,
  padding,
  deviceOptimized,
  centerContent = false,
  fullHeightOnMobile = false,
  as: Comp = 'div',
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        containerVariants({ size, padding, deviceOptimized }),
        {
          'flex flex-col items-center': centerContent,
          'min-h-screen sm:min-h-0': fullHeightOnMobile,
        },
        className
      )}
      {...props}
    />
  );
}

export { Container, containerVariants };