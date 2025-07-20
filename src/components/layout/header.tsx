'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  transparent?: boolean;
  fixed?: boolean;
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { label: '首页', href: '/' },
  { label: '功能', href: '#features' },
  { label: '下载', href: '#download' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
];

function Header({
  transparent = false,
  fixed = false,
  className,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [transparent]);

  const headerClasses = cn(
    'w-full transition-all duration-300 z-50',
    {
      'fixed top-0': fixed,
      'bg-background/80 backdrop-blur-md border-b':
        !transparent || (transparent && isScrolled),
      'bg-transparent': transparent && !isScrolled,
    },
    className
  );

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl">TurboPush</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  'text-muted-foreground hover:text-foreground'
                )}
                {...(item.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="#download">免费下载</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced for touch */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden min-h-[44px] min-w-[44px] active:scale-95 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation - Enhanced for better touch interaction */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm shadow-lg">
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-6 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg mx-2 transition-all duration-200 active:bg-accent active:scale-[0.98] min-h-[48px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                  {...(item.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border/50 mt-4">
                <Button
                  className="w-full py-4 text-base font-medium min-h-[48px]"
                  size="lg"
                  asChild
                >
                  <Link href="#download" onClick={() => setIsMenuOpen(false)}>
                    免费下载
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

export { Header, type HeaderProps, type NavigationItem };
