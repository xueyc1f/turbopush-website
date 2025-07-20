import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Edit3,
  Share2,
  Calendar,
  BarChart3,
  NotepadText,
  Bell,
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
    description:
      '内置WeChat Markdown Editor编辑器，支持本地图库，无需配置图床，让创作更轻松。',
    highlight: true,
    badge: '开源集成',
  },
  {
    icon: Share2,
    title: '多平台一键发布',
    description:
      '同时发布到微博、微信、抖音、小红书等多个社交媒体平台，节省时间，扩大影响力。',
    highlight: true,
    badge: '核心功能',
  },
  {
    icon: Calendar,
    title: '平台设置模板',
    description:
      '支持将常用平台设置保存为模板，发布时基于模板快速完成平台配置，真正做到一键发布。',
    highlight: true,
    badge: '效率神器',
  },
  {
    icon: BarChart3,
    title: '数据分析洞察',
    description:
      '详细的内容表现分析，包括阅读/播放量、评论/收藏/分享等，帮助您优化内容策略。',
    highlight: false,
  },
  {
    icon: NotepadText,
    title: '发文样式优化',
    description:
      '文章针对各平台深度优化，Mermaid 流程图，LaTeX 公式，完美支持所有平台。',
    highlight: false,
  },
  {
    icon: Bell,
    title: '最近动态提醒',
    description:
      '账号登录失效，任务执行情况，数据统计结果，自动提醒，您只需专注创意本身。',
    highlight: false,
  },
];

export function FeaturesSection({
  title = '强大功能，助力内容创作',
  subtitle = '从内容创作到数据分析，TurboPush 为您提供完整的内容营销解决方案',
  features = defaultFeatures,
}: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
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
                  <div
                    className={`p-2.5 sm:p-3 rounded-lg ${
                      feature.highlight
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    } transition-colors duration-300`}
                  >
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
      </Container>
    </section>
  );
}
