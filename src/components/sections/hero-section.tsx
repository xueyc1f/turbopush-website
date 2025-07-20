import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { ArrowRight, Download } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Background image if provided */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Decorative elements - optimized for all devices */}
      <div className="absolute top-8 sm:top-16 md:top-20 left-4 sm:left-8 md:left-10 w-32 sm:w-48 md:w-64 lg:w-72 h-32 sm:h-48 md:h-64 lg:h-72 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      <div className="absolute bottom-8 sm:bottom-16 md:bottom-20 right-4 sm:right-8 md:right-10 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 bg-accent/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
      
      <Container className="relative z-10 text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main title - enhanced cross-device typography */}
          <Typography
            variant="h1"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight"
          >
            {title}
          </Typography>
          
          {/* Subtitle - enhanced cross-device readability */}
          <Typography
            variant="lead"
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0"
          >
            {subtitle}
          </Typography>
          
          {/* CTA Buttons - enhanced cross-device layout with optimal touch targets */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-4 sm:px-6 md:px-0 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 h-auto min-h-[52px] sm:min-h-[56px] md:min-h-[60px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold touch-manipulation"
              asChild
            >
              <a href={ctaHref}>
                <Download className="mr-2 h-4 sm:h-5 md:h-5 w-4 sm:w-5 md:w-5" />
                {ctaText}
              </a>
            </Button>
            
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 h-auto min-h-[52px] sm:min-h-[56px] md:min-h-[60px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold touch-manipulation"
                asChild
              >
                <a href={secondaryCtaHref}>
                  {secondaryCtaText}
                  <ArrowRight className="ml-2 h-4 sm:h-5 md:h-5 w-4 sm:w-5 md:w-5" />
                </a>
              </Button>
            )}
          </div>
          
          {/* Additional info - enhanced cross-device layout */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base text-muted-foreground px-4 sm:px-6 md:px-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-center font-medium">支持 Windows、macOS、Linux</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-center font-medium">免费下载，立即使用</span>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Scroll indicator - hidden on small screens */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}