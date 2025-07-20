'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';

interface ProductDemoProps {
  screenshots?: string[];
  autoPlay?: boolean;
  controls?: boolean;
  interval?: number;
}

interface Screenshot {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const defaultScreenshots: Screenshot[] = [
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
    alt: 'TurboPush 主仪表板',
    title: '统一仪表板',
    description: '在一个界面中管理所有社交媒体平台的内容发布'
  },
  {
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&crop=center',
    alt: 'TurboPush 内容编辑器',
    title: '富文本编辑器',
    description: '强大的内容创作工具，支持图片、链接和格式化文本'
  },
  {
    src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    alt: 'TurboPush 定时发布',
    title: '智能调度',
    description: '基于日历的内容调度系统，优化发布时间'
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
    alt: 'TurboPush 数据分析',
    title: '数据洞察',
    description: '详细的分析报告，了解内容表现和受众互动'
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    alt: 'TurboPush 平台管理',
    title: '多平台管理',
    description: '轻松连接和管理多个社交媒体账户'
  }
];

export function ProductDemoSection({
  screenshots = [],
  autoPlay = true,
  controls = true,
  interval = 5000
}: ProductDemoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const demoScreenshots = screenshots.length > 0 ? 
    screenshots.map((src, index) => ({
      src,
      alt: `产品截图 ${index + 1}`,
      title: `功能 ${index + 1}`,
      description: '产品功能演示'
    })) : 
    defaultScreenshots;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isFullscreen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % demoScreenshots.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, isFullscreen, demoScreenshots.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? demoScreenshots.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % demoScreenshots.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsPlaying(false);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const currentScreenshot = demoScreenshots[currentIndex];

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              产品演示
            </Typography>
            <Typography variant="large" className="text-gray-600 max-w-2xl mx-auto">
              通过实际界面截图了解 TurboPush 的强大功能，体验直观的用户界面和完整的工作流程
            </Typography>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gray-100">
                {/* Main Screenshot Display */}
                <div className="relative w-full h-full">
                  <Image
                    src={currentScreenshot.src}
                    alt={currentScreenshot.alt}
                    fill
                    className="object-cover transition-opacity duration-500"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                    priority={currentIndex === 0}
                  />
                  
                  {/* Loading Placeholder */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400">加载中...</div>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrevious}
                      className="bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNext}
                      className="bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Fullscreen Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={openFullscreen}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Screenshot Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {currentScreenshot.title}
                  </h3>
                  <p className="text-gray-200">
                    {currentScreenshot.description}
                  </p>
                </div>
              </div>

              {/* Controls Bar */}
              {controls && (
                <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 mr-2" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {isPlaying ? '暂停' : '播放'}
                    </Button>
                    <span className="text-sm text-gray-600">
                      {currentIndex + 1} / {demoScreenshots.length}
                    </span>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex space-x-2">
                    {demoScreenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-12 h-8 rounded border-2 overflow-hidden transition-all duration-200 ${
                          index === currentIndex
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          width={48}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </Container>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
            <Image
              src={currentScreenshot.src}
              alt={currentScreenshot.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation in Fullscreen */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white">
              <h3 className="text-2xl font-semibold mb-2">
                {currentScreenshot.title}
              </h3>
              <p className="text-gray-300">
                {currentScreenshot.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}