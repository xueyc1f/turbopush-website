import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Share2, 
  Calendar, 
  BarChart3, 
  Users, 
  Zap,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: Edit3,
    title: '智能内容创作',
    description: '强大的富文本编辑器，支持图片、视频、链接等多媒体内容，AI 辅助优化内容质量，让创作更轻松。',
    highlight: true,
    badge: '核心功能'
  },
  {
    icon: Share2,
    title: '多平台一键发布',
    description: '同时发布到微博、微信、抖音、小红书等多个社交媒体平台，节省时间，扩大影响力。',
    highlight: true,
    badge: '热门'
  },
  {
    icon: Calendar,
    title: '智能定时发布',
    description: '基于数据分析的最佳发布时间推荐，支持批量定时发布，让您的内容在最佳时机触达用户。',
    highlight: false
  },
  {
    icon: BarChart3,
    title: '数据分析洞察',
    description: '详细的内容表现分析，包括阅读量、互动率、用户画像等，帮助您优化内容策略。',
    highlight: false
  },
  {
    icon: Users,
    title: '团队协作管理',
    description: '支持多人协作，权限管理，内容审核流程，让团队内容创作更高效有序。',
    highlight: false
  },
  {
    icon: Zap,
    title: '自动化工作流',
    description: '智能标签分类，自动回复，内容模板，让重复性工作自动化，专注创意本身。',
    highlight: false
  }
];

export function FeaturesSection({
  title = '强大功能，助力内容创作',
  subtitle = '从内容创作到数据分析，TurboPush 为您提供完整的内容营销解决方案',
  features = defaultFeatures
}: FeaturesSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
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
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {subtitle}
          </Typography>
        </div>

        {/* Features Grid - Enhanced cross-device layout with better tablet support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 px-2 sm:px-0">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95 touch-manipulation ${
                feature.highlight 
                  ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-background' 
                  : 'hover:border-primary/30'
              }`}
            >
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-5 md:px-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  {/* Responsive icon sizing */}
                  <div className={`p-2.5 sm:p-3 rounded-lg ${
                    feature.highlight 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  } transition-colors duration-300`}>
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  {feature.badge && (
                    <Badge 
                      variant={feature.highlight ? 'default' : 'secondary'} 
                      className="text-xs px-2 py-1 shrink-0"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                {/* Responsive title sizing */}
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-300 leading-tight mb-2">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 md:px-6">
                {/* Responsive description with better line height for different devices */}
                <CardDescription className="text-sm sm:text-base leading-relaxed sm:leading-relaxed md:leading-loose text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA - Enhanced cross-device layout */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>还有更多功能等您探索</span>
          </div>
          {/* Responsive button layout with better tablet support */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-md md:max-w-none mx-auto px-4 sm:px-0">
            <a
              href="/features"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 min-h-[48px] sm:min-h-[52px] active:scale-95 transform touch-manipulation"
            >
              查看所有功能
              <Target className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/download"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all duration-300 min-h-[48px] sm:min-h-[52px] active:scale-95 transform touch-manipulation"
            >
              立即体验
              <Clock className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}