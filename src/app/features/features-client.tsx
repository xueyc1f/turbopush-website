'use client';

import * as React from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeatureNavigation } from '@/components/sections/feature-navigation';
import dynamic from 'next/dynamic';

// Loading component for dynamic imports
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

// Dynamic imports for demo components
const DynamicContentCreationDemo = dynamic(
  () => import('@/components/sections/content-creation-demo').then(mod => ({ default: mod.ContentCreationDemo })),
  { loading: LoadingSpinner }
);

const DynamicMultiPlatformDemo = dynamic(
  () => import('@/components/sections/multi-platform-demo').then(mod => ({ default: mod.MultiPlatformDemo })),
  { loading: LoadingSpinner }
);

const DynamicScheduledPublishing = dynamic(
  () => import('@/components/sections/scheduled-publishing-demo').then(mod => ({ default: mod.ScheduledPublishingDemo })),
  { loading: LoadingSpinner }
);

const DynamicAnalyticsDashboard = dynamic(
  () => import('@/components/sections/analytics-dashboard-demo').then(mod => ({ default: mod.AnalyticsDashboardDemo })),
  { loading: LoadingSpinner }
);
import { 
  Edit3, 
  Share2, 
  Calendar, 
  BarChart3, 
  Users, 
  Zap,
  ChevronRight,
  Clock,
  Target,
  Sparkles,
  ArrowUp,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Feature categories for filtering
const categories = [
  { id: 'all', label: '全部功能', count: 12 },
  { id: 'content', label: '内容创作', count: 4 },
  { id: 'publish', label: '发布管理', count: 3 },
  { id: 'analytics', label: '数据分析', count: 2 },
  { id: 'collaboration', label: '团队协作', count: 2 },
  { id: 'automation', label: '自动化', count: 1 },
];

// Detailed feature data
interface DetailedFeature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: string;
  highlight?: boolean;
  badge?: string;
  benefits: string[];
  useCases: string[];
}

const detailedFeatures: DetailedFeature[] = [
  {
    id: 'content-editor',
    icon: Edit3,
    title: '智能内容创作',
    description: '强大的富文本编辑器，支持图片、视频、链接等多媒体内容，AI 辅助优化内容质量，让创作更轻松。',
    category: 'content',
    highlight: true,
    badge: '核心功能',
    benefits: [
      '支持富文本编辑和多媒体内容',
      'AI 智能内容优化建议',
      '实时预览不同平台效果',
      '内容模板和快速插入'
    ],
    useCases: [
      '社交媒体内容创作',
      '营销文案编写',
      '产品介绍制作',
      '活动宣传内容'
    ]
  },
  {
    id: 'multi-platform',
    icon: Share2,
    title: '多平台一键发布',
    description: '同时发布到微博、微信、抖音、小红书等多个社交媒体平台，节省时间，扩大影响力。',
    category: 'publish',
    highlight: true,
    badge: '热门',
    benefits: [
      '支持 10+ 主流社交平台',
      '一键同步发布到多个平台',
      '平台特定格式自动适配',
      '发布状态实时监控'
    ],
    useCases: [
      '品牌营销推广',
      '产品发布宣传',
      '内容分发扩散',
      '社交媒体矩阵管理'
    ]
  },
  {
    id: 'scheduled-publishing',
    icon: Calendar,
    title: '智能定时发布',
    description: '基于数据分析的最佳发布时间推荐，支持批量定时发布，让您的内容在最佳时机触达用户。',
    category: 'publish',
    benefits: [
      '智能推荐最佳发布时间',
      '支持批量定时发布',
      '可视化发布日历管理',
      '时区自动转换'
    ],
    useCases: [
      '跨时区内容发布',
      '营销活动定时推送',
      '内容发布计划管理',
      '节假日营销安排'
    ]
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: '数据分析洞察',
    description: '详细的内容表现分析，包括阅读量、互动率、用户画像等，帮助您优化内容策略。',
    category: 'analytics',
    benefits: [
      '多维度数据分析报告',
      '用户行为和画像分析',
      '内容表现趋势追踪',
      '竞品分析和对比'
    ],
    useCases: [
      '内容策略优化',
      '用户增长分析',
      '营销效果评估',
      '竞品监控分析'
    ]
  },
  {
    id: 'team-collaboration',
    icon: Users,
    title: '团队协作管理',
    description: '支持多人协作，权限管理，内容审核流程，让团队内容创作更高效有序。',
    category: 'collaboration',
    benefits: [
      '多角色权限管理',
      '内容审核工作流',
      '团队协作编辑',
      '任务分配和跟踪'
    ],
    useCases: [
      '企业内容团队管理',
      '代理公司客户管理',
      '内容审核流程',
      '团队绩效管理'
    ]
  },
  {
    id: 'automation',
    icon: Zap,
    title: '自动化工作流',
    description: '智能标签分类，自动回复，内容模板，让重复性工作自动化，专注创意本身。',
    category: 'automation',
    benefits: [
      '智能内容标签分类',
      '自动回复和互动',
      '内容模板库管理',
      '工作流程自动化'
    ],
    useCases: [
      '客服自动回复',
      '内容自动分类',
      '模板化内容生产',
      '重复任务自动化'
    ]
  }
];

export function FeaturesPageClient() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Filter features based on category and search
  const filteredFeatures = React.useMemo(() => {
    let filtered = detailedFeatures;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(feature => feature.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(feature => 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  // Handle scroll for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageLayout headerProps={{ fixed: true }}>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <Typography
                variant="h1"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              >
                强大功能，助力内容创作
              </Typography>
              <Typography
                variant="lead"
                className="text-xl text-muted-foreground mb-8"
              >
                从内容创作到数据分析，TurboPush 为您提供完整的内容营销解决方案
              </Typography>
              
              {/* Quick Navigation - Enhanced mobile layout */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4 sm:px-0">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('content-creation')}
                  className="flex items-center gap-2 min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
                >
                  <Edit3 className="h-4 w-4" />
                  内容创作
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('publishing')}
                  className="flex items-center gap-2 min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
                >
                  <Share2 className="h-4 w-4" />
                  发布管理
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('analytics')}
                  className="flex items-center gap-2 min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
                >
                  <BarChart3 className="h-4 w-4" />
                  数据分析
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('collaboration')}
                  className="flex items-center gap-2 min-h-[44px] px-4 sm:px-6 text-sm sm:text-base"
                >
                  <Users className="h-4 w-4" />
                  团队协作
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Filter and Search Section */}
        <section className="py-8 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <Container>
            <FeatureNavigation
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </Container>
        </section>

        {/* Interactive Demos Section */}
        <section id="demos" className="py-16 bg-gradient-to-b from-muted/10 to-background">
          <Container>
            <div className="text-center mb-12">
              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                功能演示
              </Typography>
              <Typography
                variant="lead"
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                通过交互式演示，深入了解 TurboPush 的核心功能如何帮助您提升内容创作效率
              </Typography>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Content Creation Demo */}
              <div id="content-creation">
                <React.Suspense fallback={<LoadingSpinner />}>
                  <DynamicContentCreationDemo />
                </React.Suspense>
              </div>

              {/* Multi-Platform Publishing Demo */}
              <div id="publishing">
                <React.Suspense fallback={<LoadingSpinner />}>
                  <DynamicMultiPlatformDemo />
                </React.Suspense>
              </div>

              {/* Scheduled Publishing Demo */}
              <div>
                <React.Suspense fallback={<LoadingSpinner />}>
                  <DynamicScheduledPublishing />
                </React.Suspense>
              </div>

              {/* Analytics Dashboard Demo */}
              <div id="analytics">
                <React.Suspense fallback={<LoadingSpinner />}>
                  <DynamicAnalyticsDashboard />
                </React.Suspense>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                功能详情
              </Typography>
              <Typography
                variant="lead"
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                了解每个功能的详细信息、核心优势和应用场景
              </Typography>
            </div>

            {filteredFeatures.length === 0 ? (
              <div className="text-center py-16">
                <Typography variant="h3" className="text-2xl font-semibold mb-4">
                  未找到相关功能
                </Typography>
                <Typography variant="muted" className="text-muted-foreground">
                  请尝试其他搜索关键词或选择不同的分类
                </Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-0">
                {filteredFeatures.map((feature) => (
                  <Card
                    key={feature.id}
                    id={feature.id}
                    className={cn(
                      'group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 touch-manipulation',
                      feature.highlight 
                        ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-background' 
                        : 'hover:border-primary/30'
                    )}
                  >
                    <CardHeader className="pb-4 px-4 sm:px-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                          'p-3 rounded-lg transition-colors duration-300',
                          feature.highlight 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                        )}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        {feature.badge && (
                          <Badge variant={feature.highlight ? 'default' : 'secondary'} className="text-xs px-2 py-1">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors duration-300 mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <Star className="h-4 w-4 text-primary" />
                          核心优势
                        </h4>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                              <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <Target className="h-4 w-4 text-primary" />
                          应用场景
                        </h4>
                        <ul className="space-y-2">
                          {feature.useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                              <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>立即体验这些强大功能</span>
              </div>
              <Typography
                variant="h2"
                className="text-3xl font-bold mb-6"
              >
                开始您的内容创作之旅
              </Typography>
              <Typography
                variant="lead"
                className="text-lg text-muted-foreground mb-8"
              >
                免费下载 TurboPush，体验完整的内容营销解决方案
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
                <Button size="lg" className="min-h-[48px] py-4 px-8" asChild>
                  <a href="/download" className="flex items-center gap-2">
                    立即下载
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="min-h-[48px] py-4 px-8" asChild>
                  <a href="/contact" className="flex items-center gap-2">
                    联系我们
                    <Clock className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <Button
            size="icon"
            className="fixed bottom-8 right-8 z-50 shadow-lg"
            onClick={scrollToTop}
            aria-label="回到顶部"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </PageLayout>
  );
}