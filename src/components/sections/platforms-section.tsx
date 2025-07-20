import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Platform {
  name: string;
  icon: string;
  color: string;
  supported: boolean;
  status?: 'active' | 'coming-soon' | 'beta';
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
    description: '支持图文、视频发布'
  },
  {
    name: '微信公众号',
    icon: '💬',
    color: 'from-green-500 to-emerald-500',
    supported: true,
    status: 'active',
    description: '支持图文消息发布'
  },
  {
    name: '抖音',
    icon: '🎵',
    color: 'from-black to-gray-800',
    supported: true,
    status: 'active',
    description: '支持视频内容发布'
  },
  {
    name: '小红书',
    icon: '📝',
    color: 'from-red-400 to-pink-500',
    supported: true,
    status: 'active',
    description: '支持图文笔记发布'
  },
  {
    name: 'B站',
    icon: '📺',
    color: 'from-blue-500 to-cyan-500',
    supported: true,
    status: 'beta',
    description: '支持视频动态发布'
  },
  {
    name: '知乎',
    icon: '🤔',
    color: 'from-blue-600 to-indigo-600',
    supported: true,
    status: 'active',
    description: '支持文章、想法发布'
  },
  {
    name: 'Twitter',
    icon: '🐦',
    color: 'from-blue-400 to-blue-600',
    supported: true,
    status: 'active',
    description: '支持推文、图片发布'
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'from-blue-700 to-blue-800',
    supported: true,
    status: 'active',
    description: '支持职场动态发布'
  },
  {
    name: 'Instagram',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    supported: false,
    status: 'coming-soon',
    description: '即将支持'
  },
  {
    name: 'Facebook',
    icon: '👥',
    color: 'from-blue-600 to-blue-700',
    supported: false,
    status: 'coming-soon',
    description: '即将支持'
  },
  {
    name: 'YouTube',
    icon: '🎬',
    color: 'from-red-600 to-red-700',
    supported: false,
    status: 'coming-soon',
    description: '即将支持'
  },
  {
    name: 'TikTok',
    icon: '🎭',
    color: 'from-black to-red-500',
    supported: false,
    status: 'coming-soon',
    description: '即将支持'
  }
];

function getStatusIcon(status: Platform['status']) {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'beta':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'coming-soon':
      return <Clock className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
}

function getStatusBadge(status: Platform['status']) {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">已支持</Badge>;
    case 'beta':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">测试版</Badge>;
    case 'coming-soon':
      return <Badge variant="outline" className="text-muted-foreground">即将支持</Badge>;
    default:
      return null;
  }
}

export function PlatformsSection({
  title = '全平台覆盖，一键触达全网',
  subtitle = '支持主流社交媒体平台，让您的内容覆盖更广泛的受众群体',
  platforms = defaultPlatforms
}: PlatformsSectionProps) {
  const supportedPlatforms = platforms.filter(p => p.supported);
  const comingSoonPlatforms = platforms.filter(p => !p.supported);

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{supportedPlatforms.length}+</div>
                <div className="text-sm text-muted-foreground">已支持平台</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{comingSoonPlatforms.length}+</div>
                <div className="text-sm text-muted-foreground">即将支持</div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="mb-16">
          <Typography variant="h3" className="text-xl sm:text-2xl font-semibold mb-8 text-center">
            已支持平台
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
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-lg xs:text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {platform.icon}
                  </div>
                  {/* Responsive typography */}
                  <Typography variant="small" className="font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors text-xs sm:text-sm leading-tight">
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
                      {platform.status === 'coming-soon' && '⏳'}
                    </div>
                  </div>
                  {/* Description with better responsive visibility */}
                  {platform.description && (
                    <Typography variant="muted" className="text-xs hidden lg:block leading-tight">
                      {platform.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Platforms */}
        {comingSoonPlatforms.length > 0 && (
          <div>
            <Typography variant="h3" className="text-xl sm:text-2xl font-semibold mb-8 text-center">
              即将支持
            </Typography>
            {/* Enhanced grid with better tablet and cross-device support */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
              {comingSoonPlatforms.map((platform, index) => (
                <Card
                  key={index}
                  className="group transition-all duration-300 hover:shadow-md opacity-60 hover:opacity-80 active:scale-95 touch-manipulation"
                >
                  <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 text-center">
                    {/* Responsive icon sizing with better tablet support */}
                    <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-lg xs:text-xl sm:text-2xl shadow-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300`}>
                      {platform.icon}
                    </div>
                    {/* Responsive typography */}
                    <Typography variant="small" className="font-semibold mb-1 sm:mb-2 text-muted-foreground text-xs sm:text-sm leading-tight">
                      {platform.name}
                    </Typography>
                    {/* Status indicators with better mobile/tablet visibility */}
                    <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                      {getStatusIcon(platform.status)}
                      {/* Show badge on tablet and up */}
                      <div className="hidden md:block">
                        {getStatusBadge(platform.status)}
                      </div>
                      {/* Mobile-friendly status text */}
                      <div className="block md:hidden text-xs text-muted-foreground">
                        ⏳
                      </div>
                    </div>
                    {/* Description with better responsive visibility */}
                    {platform.description && (
                      <Typography variant="muted" className="text-xs hidden lg:block leading-tight">
                        {platform.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border">
          <Typography variant="h4" className="text-xl font-semibold mb-4">
            更多平台持续接入中
          </Typography>
          <Typography variant="muted" className="mb-6 max-w-2xl mx-auto">
            我们正在不断扩展支持的平台，如果您有特定平台需求，欢迎联系我们
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              申请平台支持
            </a>
            <a
              href="/download"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-colors duration-300"
            >
              立即体验
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}