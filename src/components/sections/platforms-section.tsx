import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Platform {
  name: string;
  icon: string;
  color: string;
  supported: boolean;
  status?: 'active' | 'beta';
  description?: string;
}

interface PlatformsSectionProps {
  title?: string;
  subtitle?: string;
  platforms?: Platform[];
}

const defaultPlatforms: Platform[] = [
  {
    name: '微博',
    icon: '🔥',
    color: 'from-red-500 to-orange-500',
    supported: true,
    status: 'active',
    description: '支持图文、视频发布',
  },
  {
    name: '微信公众号',
    icon: '💬',
    color: 'from-green-500 to-emerald-500',
    supported: true,
    status: 'active',
    description: '支持图文消息发布',
  },
  {
    name: '抖音',
    icon: '🎵',
    color: 'from-black to-gray-800',
    supported: true,
    status: 'active',
    description: '支持视频内容发布',
  },
  {
    name: '小红书',
    icon: '📝',
    color: 'from-red-400 to-pink-500',
    supported: true,
    status: 'active',
    description: '支持图文笔记发布',
  },
  {
    name: 'B站',
    icon: '📺',
    color: 'from-blue-500 to-cyan-500',
    supported: true,
    status: 'beta',
    description: '支持视频动态发布',
  },
  {
    name: '知乎',
    icon: '🤔',
    color: 'from-blue-600 to-indigo-600',
    supported: true,
    status: 'active',
    description: '支持文章、想法发布',
  },
  {
    name: 'Twitter',
    icon: '🐦',
    color: 'from-blue-400 to-blue-600',
    supported: true,
    status: 'active',
    description: '支持推文、图片发布',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'from-blue-700 to-blue-800',
    supported: true,
    status: 'active',
    description: '支持职场动态发布',
  },
];

function getStatusIcon(status: Platform['status']) {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'beta':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
}

function getStatusBadge(status: Platform['status']) {
  switch (status) {
    case 'active':
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 border-green-200"
        >
          已支持
        </Badge>
      );
    case 'beta':
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          测试版
        </Badge>
      );
    default:
      return null;
  }
}

export function PlatformsSection({
  title = '全平台覆盖，一键触达全网',
  subtitle = '支持主流社交媒体平台，让您的内容覆盖更广泛的受众群体',
  platforms = defaultPlatforms,
}: PlatformsSectionProps) {
  const supportedPlatforms = platforms;

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            {title}
          </Typography>
          <Typography
            variant="lead"
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {subtitle}
          </Typography>

          {/* Stats */}
          <div className="flex justify-center text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {supportedPlatforms.length}
                </div>
                <div className="text-sm text-muted-foreground">支持平台</div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="mb-16">
          <Typography
            variant="h3"
            className="text-xl sm:text-2xl font-semibold mb-8 text-center"
          >
            支持平台
          </Typography>
          {/* Enhanced grid with better tablet and cross-device support */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
            {supportedPlatforms.map((platform, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95 border-2 hover:border-primary/30 touch-manipulation"
              >
                <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 text-center">
                  {/* Responsive icon sizing with better tablet support */}
                  <div
                    className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-lg xs:text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {platform.icon}
                  </div>
                  {/* Responsive typography */}
                  <Typography
                    variant="small"
                    className="font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors text-xs sm:text-sm leading-tight"
                  >
                    {platform.name}
                  </Typography>
                  {/* Status indicators with better mobile/tablet visibility */}
                  <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                    {getStatusIcon(platform.status)}
                    {/* Show badge on tablet and up, or when there's enough space */}
                    <div className="hidden md:block">
                      {getStatusBadge(platform.status)}
                    </div>
                    {/* Mobile-friendly status text */}
                    <div className="block md:hidden text-xs text-muted-foreground">
                      {platform.status === 'active' && '✓'}
                      {platform.status === 'beta' && 'β'}
                    </div>
                  </div>
                  {/* Description with better responsive visibility */}
                  {platform.description && (
                    <Typography
                      variant="muted"
                      className="text-xs hidden lg:block leading-tight"
                    >
                      {platform.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
