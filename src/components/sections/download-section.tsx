'use client';

import { useState, useEffect } from 'react';
import { Download, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DownloadButton } from '@/components/ui/download-button';

interface DownloadSectionProps {
  showStats?: boolean;
  compact?: boolean;
}

export function DownloadSection({ showStats = true, compact = false }: DownloadSectionProps) {
  const [downloadCount, setDownloadCount] = useState(12847);
  const [activeUsers, setActiveUsers] = useState(3421);

  // Simulate real-time stats updates
  useEffect(() => {
    if (!showStats) return;

    const interval = setInterval(() => {
      // Randomly increment download count
      if (Math.random() > 0.7) {
        setDownloadCount(prev => prev + 1);
      }
      
      // Randomly update active users
      if (Math.random() > 0.8) {
        setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [showStats]);

  const handleDownload = (platform: string) => {
    console.log(`Download initiated for ${platform}`);
    // Here you would typically track the download with analytics
  };

  if (compact) {
    return (
      <section className="py-8 sm:py-12 bg-blue-50">
        <Container>
          <div className="text-center px-4 sm:px-0">
            <Typography variant="h3" className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl">
              立即开始使用 TurboPush
            </Typography>
            <Typography variant="large" className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              免费下载，无需注册，立即体验多平台内容发布的便捷
            </Typography>
            <DownloadButton
              variant="default"
              size="lg"
              autoDetect={true}
              showDropdown={true}
              onDownload={handleDownload}
            />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container>
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <Typography variant="h2" className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl">
            立即下载 TurboPush
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg">
            智能检测您的操作系统，为您推荐最适合的版本。完全免费，无需注册，立即开始您的多平台内容发布之旅。
          </Typography>
          
          <div className="flex justify-center mb-8 sm:mb-12">
            <DownloadButton
              variant="default"
              size="lg"
              autoDetect={true}
              showDropdown={true}
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* Download Stats - Enhanced mobile layout */}
        {showStats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
            <Card className="p-3 sm:p-4 md:p-6 text-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Download className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
              </div>
              <Typography variant="h3" className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-1">
                {downloadCount.toLocaleString()}
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs sm:text-sm leading-tight">
                总下载次数
              </Typography>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Users className="h-6 sm:h-8 w-6 sm:w-8 text-green-600" />
              </div>
              <Typography variant="h3" className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                {activeUsers.toLocaleString()}
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs sm:text-sm">
                活跃用户
              </Typography>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-purple-600" />
              </div>
              <Typography variant="h3" className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                98.5%
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs sm:text-sm">
                用户满意度
              </Typography>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Zap className="h-6 sm:h-8 w-6 sm:w-8 text-orange-600" />
              </div>
              <Typography variant="h3" className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                5.2M
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs sm:text-sm">
                内容发布次数
              </Typography>
            </Card>
          </div>
        )}

        {/* Features Grid - Enhanced mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              安全可靠
            </Typography>
            <Typography variant="muted" className="text-gray-600 text-sm sm:text-base">
              数据本地存储，隐私保护，通过多项安全认证
            </Typography>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              快速高效
            </Typography>
            <Typography variant="muted" className="text-gray-600 text-sm sm:text-base">
              一键发布到多个平台，节省90%的内容发布时间
            </Typography>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              用户友好
            </Typography>
            <Typography variant="muted" className="text-gray-600 text-sm sm:text-base">
              直观的界面设计，零学习成本，新手也能快速上手
            </Typography>
          </div>
        </div>

        {/* System Requirements - Enhanced mobile layout */}
        <Card className="p-6 sm:p-8 bg-gray-50">
          <div className="text-center mb-4 sm:mb-6">
            <Typography variant="h3" className="mb-2 text-xl sm:text-2xl">
              系统要求
            </Typography>
            <Typography variant="muted" className="text-gray-600 text-sm sm:text-base">
              确保您的设备满足以下最低要求
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-3 text-xs sm:text-sm">
                Windows
              </Badge>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>Windows 10 或更高版本</li>
                <li>4GB RAM (推荐 8GB)</li>
                <li>500MB 可用磁盘空间</li>
                <li>网络连接</li>
              </ul>
            </div>

            <div className="text-center">
              <Badge variant="outline" className="mb-3 text-xs sm:text-sm">
                macOS
              </Badge>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>macOS 10.15 或更高版本</li>
                <li>4GB RAM (推荐 8GB)</li>
                <li>500MB 可用磁盘空间</li>
                <li>网络连接</li>
              </ul>
            </div>

            <div className="text-center">
              <Badge variant="outline" className="mb-3 text-xs sm:text-sm">
                Linux
              </Badge>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>Ubuntu 18.04+ 或同等版本</li>
                <li>4GB RAM (推荐 8GB)</li>
                <li>500MB 可用磁盘空间</li>
                <li>网络连接</li>
              </ul>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}