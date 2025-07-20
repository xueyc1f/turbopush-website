import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
      12: 'gap-12',
    },
    responsive: {
      true: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      false: '',
    },
    // Enhanced responsive patterns for better cross-device support
    adaptiveLayout: {
      'cards': 'grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      'features': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      'platforms': 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8',
      'stats': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      'testimonials': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'gallery': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      'none': '',
    },
    // Tablet-specific optimizations
    tabletCols: {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      auto: '', // Let adaptive layout handle it
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
    responsive: false,
    adaptiveLayout: 'none',
    tabletCols: 'auto',
  },
});

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
  // Cross-device optimization props
  mobileGap?: number;
  tabletGap?: number;
  desktopGap?: number;
}

function Grid({
  className,
  cols,
  gap,
  responsive,
  adaptiveLayout,
  tabletCols,
  mobileGap,
  tabletGap,
  desktopGap,
  as: Comp = 'div',
  ...props
}: GridProps) {
  // Generate responsive gap classes if specific gaps are provided
  const responsiveGapClasses = [
    mobileGap && `gap-${mobileGap}`,
    tabletGap && `md:gap-${tabletGap}`,
    desktopGap && `lg:gap-${desktopGap}`,
  ].filter(Boolean).join(' ');

  return (
    <Comp
      className={cn(
        gridVariants({ cols, gap, responsive, adaptiveLayout, tabletCols }),
        responsiveGapClasses,
        className
      )}
      {...props}
    />
  );
}

// Grid Item component for more control
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  as?: React.ElementType;
}

const gridItemVariants = cva('', {
  variants: {
    colSpan: {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      12: 'col-span-12',
    },
    colStart: {
      1: 'col-start-1',
      2: 'col-start-2',
      3: 'col-start-3',
      4: 'col-start-4',
      5: 'col-start-5',
      6: 'col-start-6',
      7: 'col-start-7',
      8: 'col-start-8',
      9: 'col-start-9',
      10: 'col-start-10',
      11: 'col-start-11',
      12: 'col-start-12',
    },
    colEnd: {
      1: 'col-end-1',
      2: 'col-end-2',
      3: 'col-end-3',
      4: 'col-end-4',
      5: 'col-end-5',
      6: 'col-end-6',
      7: 'col-end-7',
      8: 'col-end-8',
      9: 'col-end-9',
      10: 'col-end-10',
      11: 'col-end-11',
      12: 'col-end-12',
      13: 'col-end-13',
    },
  },
});

function GridItem({
  className,
  colSpan,
  colStart,
  colEnd,
  as: Comp = 'div',
  ...props
}: GridItemProps) {
  return (
    <Comp
      className={cn(
        gridItemVariants({
          colSpan,
          colStart,
          colEnd,
        }),
        className
      )}
      {...props}
    />
  );
}

export { Grid, GridItem, gridVariants };