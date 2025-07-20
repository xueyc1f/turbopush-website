import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  Heart,
  Share,
  Play,
  Pause,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
}

interface PlatformData {
  platform: string;
  engagement: number;
  reach: number;
  color: string;
}

interface AnalyticsDashboardDemoProps {
  className?: string;
}

export function AnalyticsDashboardDemo({ className }: AnalyticsDashboardDemoProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentPeriod, setCurrentPeriod] = React.useState(0);

  const periods = ['本周', '本月', '本季度'];
  
  const analyticsData: AnalyticsData[] = [
    {
      metric: '总浏览量',
      value: '125.6K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      metric: '互动率',
      value: '8.3%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart
    },
    {
      metric: '新增粉丝',
      value: '2.4K',
      change: '+18.7%',
      trend: 'up',
      icon: Users
    },
    {
      metric: '分享次数',
      value: '892',
      change: '-3.2%',
      trend: 'down',
      icon: Share
    }
  ];

  const platformData: PlatformData[] = [
    { platform: '微博', engagement: 85, reach: 92, color: 'bg-red-500' },
    { platform: '微信', engagement: 78, reach: 88, color: 'bg-green-500' },
    { platform: '小红书', engagement: 92, reach: 76, color: 'bg-red-400' },
    { platform: '抖音', engagement: 88, reach: 94, color: 'bg-black' },
    { platform: '知乎', engagement: 72, reach: 68, color: 'bg-blue-600' }
  ];

  const contentPerformance = [
    { title: '产品发布公告', views: '12.5K', engagement: '9.2%', platform: '微博' },
    { title: '用户案例分享', views: '8.9K', engagement: '12.1%', platform: '小红书' },
    { title: '技术教程视频', views: '15.2K', engagement: '7.8%', platform: '抖音' },
    { title: '行业趋势分析', views: '6.7K', engagement: '15.3%', platform: '知乎' }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPeriod((prev) => (prev + 1) % periods.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, periods.length]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            数据分析仪表板演示
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? '暂停' : '播放'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Time Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {periods.map((period, index) => (
              <Button
                key={period}
                variant={index === currentPeriod ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPeriod(index)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {analyticsData.map((data, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <data.icon className="h-4 w-4 text-muted-foreground" />
                {getTrendIcon(data.trend)}
              </div>
              <div>
                <p className="text-2xl font-bold">{data.value}</p>
                <p className="text-xs text-muted-foreground">{data.metric}</p>
              </div>
              <div className={cn('text-xs font-medium', getTrendColor(data.trend))}>
                {data.change} vs 上期
              </div>
            </div>
          ))}
        </div>

        {/* Platform Performance */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">平台表现对比</h4>
          <div className="space-y-3">
            {platformData.map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', platform.color)} />
                    <span className="text-sm font-medium">{platform.platform}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    互动 {platform.engagement}% · 触达 {platform.reach}%
                  </div>
                </div>
                
                <div className="space-y-1">
                  {/* Engagement Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-8">互动</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={cn('h-2 rounded-full transition-all duration-1000', platform.color)}
                        style={{ width: `${platform.engagement}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Reach Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-8">触达</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={cn('h-2 rounded-full transition-all duration-1000 opacity-70', platform.color)}
                        style={{ width: `${platform.reach}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Content Performance */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">热门内容表现</h4>
          <div className="space-y-2">
            {contentPerformance.map((content, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{content.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{content.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{content.engagement}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {content.platform}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">#{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-primary/5 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">智能洞察</span>
          </div>
          <p className="text-sm text-muted-foreground">
            本周小红书平台互动率提升显著，建议增加该平台的内容投入。
            视频内容在抖音平台表现优异，可考虑制作更多视频内容。
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">20+</div>
            <div className="text-xs text-muted-foreground">分析维度</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">实时</div>
            <div className="text-xs text-muted-foreground">数据更新</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">AI</div>
            <div className="text-xs text-muted-foreground">智能建议</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}