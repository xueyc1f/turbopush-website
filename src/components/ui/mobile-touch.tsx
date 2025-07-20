import * as React from 'react';
import { cn } from '@/lib/utils';

interface TouchableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asChild?: boolean;
  disabled?: boolean;
}

/**
 * TouchableArea component provides enhanced touch interaction for mobile devices
 * Includes proper touch targets, feedback, and accessibility
 */
export function TouchableArea({ 
  children, 
  className, 
  asChild = false, 
  disabled = false,
  ...props 
}: TouchableProps) {
  const Comp = asChild ? React.Fragment : 'div';
  
  const touchableClasses = cn(
    'touch-manipulation',
    'active:scale-[0.98]',
    'transition-transform duration-100',
    'min-h-[44px] min-w-[44px]',
    'flex items-center justify-center',
    {
      'pointer-events-none opacity-50': disabled,
      'cursor-pointer': !disabled,
    },
    className
  );

  if (asChild) {
    return (
      <div className={touchableClasses} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Comp className={touchableClasses} {...props}>
      {children}
    </Comp>
  );
}

interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * MobileButton component optimized for mobile touch interaction
 */
export function MobileButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  ...props
}: MobileButtonProps) {
  const baseClasses = cn(
    'touch-manipulation',
    'active:scale-[0.98]',
    'transition-all duration-150',
    'font-medium rounded-lg',
    'flex items-center justify-center gap-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      // Variants
      'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary': variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary': variant === 'secondary',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary': variant === 'outline',
      'hover:bg-accent hover:text-accent-foreground focus:ring-primary': variant === 'ghost',
      
      // Sizes
      'min-h-[40px] px-4 py-2 text-sm': size === 'sm',
      'min-h-[48px] px-6 py-3 text-base': size === 'md',
      'min-h-[56px] px-8 py-4 text-lg': size === 'lg',
      
      // Full width
      'w-full': fullWidth,
      
      // Disabled state
      'pointer-events-none opacity-50': disabled,
    },
    className
  );

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * MobileCard component with enhanced touch interaction
 */
interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function MobileCard({
  children,
  className,
  interactive = false,
  padding = 'md',
  ...props
}: MobileCardProps) {
  const cardClasses = cn(
    'bg-card text-card-foreground rounded-lg border shadow-sm',
    {
      // Interactive states
      'touch-manipulation cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-200': interactive,
      
      // Padding variants
      'p-3': padding === 'sm',
      'p-4 sm:p-6': padding === 'md',
      'p-6 sm:p-8': padding === 'lg',
    },
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

/**
 * Hook for detecting mobile device
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

/**
 * Hook for enhanced touch handling
 */
export function useTouchHandler() {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleTouchStart = React.useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleTouchEnd = React.useCallback(() => {
    setIsPressed(false);
  }, []);

  const touchProps = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
  };

  return { isPressed, touchProps };
}