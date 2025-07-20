'use client';

import { useState, useEffect } from 'react';
import { Download, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DownloadOption {
  platform: string;
  version: string;
  size: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  recommended?: boolean;
}

interface DownloadButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  autoDetect?: boolean;
  showDropdown?: boolean;
  onDownload?: (platform: string) => void;
}

const downloadOptions: DownloadOption[] = [
  {
    platform: 'Windows',
    version: 'v1.2.0',
    size: '45.2 MB',
    url: '/downloads/turbopush-windows-x64.exe',
    icon: Monitor,
    recommended: true,
  },
  {
    platform: 'macOS',
    version: 'v1.2.0',
    size: '38.7 MB',
    url: '/downloads/turbopush-macos-universal.dmg',
    icon: Monitor,
  },
  {
    platform: 'Linux',
    version: 'v1.2.0',
    size: '42.1 MB',
    url: '/downloads/turbopush-linux-x64.AppImage',
    icon: Monitor,
  },
];

function detectOperatingSystem(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  
  if (userAgent.includes('Win') || platform.includes('Win')) {
    return 'Windows';
  } else if (userAgent.includes('Mac') || platform.includes('Mac')) {
    return 'macOS';
  } else if (userAgent.includes('Linux') || platform.includes('Linux')) {
    return 'Linux';
  } else if (userAgent.includes('Android')) {
    return 'Android';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    return 'iOS';
  }
  
  return 'Unknown';
}

export function DownloadButton({
  variant = 'default',
  size = 'default',
  autoDetect = true,
  showDropdown = true,
  onDownload,
}: DownloadButtonProps) {
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');
  const [, setDownloadStats] = useState<Record<string, number>>({});

  useEffect(() => {
    if (autoDetect) {
      setDetectedOS(detectOperatingSystem());
    }
  }, [autoDetect]);

  const getRecommendedDownload = (): DownloadOption | null => {
    if (!autoDetect) return downloadOptions[0];
    
    const recommended = downloadOptions.find(
      option => option.platform === detectedOS
    );
    
    return recommended || downloadOptions[0];
  };

  const handleDownload = async (option: DownloadOption) => {
    // Track download statistics
    setDownloadStats(prev => ({
      ...prev,
      [option.platform]: (prev[option.platform] || 0) + 1
    }));

    // Call onDownload callback if provided
    if (onDownload) {
      onDownload(option.platform);
    }

    // In a real implementation, this would trigger the actual download
    // For now, we'll just log the download attempt
    console.log(`Downloading ${option.platform} version:`, option.url);
    
    // Simulate download tracking
    try {
      // This would be replaced with actual analytics tracking
      const windowWithGtag = window as typeof window & {
        gtag?: (command: string, action: string, parameters: Record<string, unknown>) => void;
      };
      
      if (typeof window !== 'undefined' && windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'download', {
          event_category: 'engagement',
          event_label: option.platform,
          value: 1,
        });
      }
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }

    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = option.url;
    link.download = option.url.split('/').pop() || 'turbopush';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const recommendedDownload = getRecommendedDownload();

  if (!showDropdown && recommendedDownload) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => handleDownload(recommendedDownload)}
        className="relative"
      >
        <Download className="mr-2 h-4 w-4" />
        下载 TurboPush
        {autoDetect && detectedOS !== 'Unknown' && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {detectedOS}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
      {/* Primary Download Button - Enhanced mobile layout */}
      {recommendedDownload && (
        <Button
          variant={variant}
          size={size}
          onClick={() => handleDownload(recommendedDownload)}
          className="relative w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-medium px-6 sm:px-4 active:scale-95 transition-transform"
        >
          <Download className="mr-2 h-4 w-4 sm:h-4 sm:w-4" />
          下载 TurboPush
          {autoDetect && detectedOS !== 'Unknown' && (
            <Badge variant="secondary" className="ml-2 text-xs hidden sm:inline-flex">
              {recommendedDownload.platform}
            </Badge>
          )}
        </Button>
      )}

      {/* Dropdown for Other Options - Enhanced mobile layout */}
      {showDropdown && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size={size}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] text-base sm:text-sm font-medium px-6 sm:px-4 active:scale-95 transition-transform"
            >
              其他平台
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-64">
            <div className="px-3 py-2 text-sm font-medium text-gray-700">
              选择您的平台
            </div>
            <DropdownMenuSeparator />
            {downloadOptions.map((option) => {
              const Icon = option.icon;
              const isRecommended = autoDetect && option.platform === detectedOS;
              
              return (
                <DropdownMenuItem
                  key={option.platform}
                  onClick={() => handleDownload(option)}
                  className="flex items-center justify-between p-4 sm:p-3 cursor-pointer min-h-[56px] sm:min-h-[48px] active:bg-accent/80"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 sm:h-4 sm:w-4 text-gray-500" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-base sm:text-sm">{option.platform}</span>
                        {isRecommended && (
                          <Badge variant="default" className="text-xs">
                            推荐
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm sm:text-xs text-gray-500">
                        {option.version} • {option.size}
                      </div>
                    </div>
                  </div>
                  <Download className="h-5 w-5 sm:h-4 sm:w-4 text-gray-400" />
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <div className="px-3 py-2 text-sm sm:text-xs text-gray-500">
              系统要求：Windows 10+, macOS 10.15+, Ubuntu 18.04+
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

// Hook for download statistics
export function useDownloadStats() {
  const [stats, setStats] = useState<Record<string, number>>({});

  const trackDownload = (platform: string) => {
    setStats(prev => ({
      ...prev,
      [platform]: (prev[platform] || 0) + 1
    }));
  };

  return { stats, trackDownload };
}