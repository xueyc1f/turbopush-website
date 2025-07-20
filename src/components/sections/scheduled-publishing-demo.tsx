import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Zap,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduledPost {
  id: string;
  title: string;
  time: string;
  platforms: string[];
  status: 'scheduled' | 'published' | 'optimal';
}

interface ScheduledPublishingDemoProps {
  className?: string;
}

export function ScheduledPublishingDemo({ className }: ScheduledPublishingDemoProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(15);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const scheduledPosts: ScheduledPost[] = [
    {
      id: '1',
      title: '产品更新公告',
      time: '09:00',
      platforms: ['微博', '微信'],
      status: 'optimal'
    },
    {
      id: '2',
      title: '用户案例分享',
      time: '14:30',
      platforms: ['小红书', '知乎'],
      status: 'scheduled'
    },
    {
      id: '3',
      title: '技术博客发布',
      time: '20:00',
      platforms: ['B站', '抖音'],
      status: 'published'
    }
  ];

  const optimalTimes = [
    { time: '09:00', engagement: '高', reason: '上班通勤时间' },
    { time: '12:30', engagement: '中', reason: '午休时间' },
    { time: '18:00', engagement: '高', reason: '下班时间' },
    { time: '21:00', engagement: '最高', reason: '晚间娱乐时间' }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedDate((prev) => (prev % 30) + 1);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getPostsForDate = (date: number) => {
    if (date === selectedDate) {
      return scheduledPosts;
    }
    return [];
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case '最高':
        return 'text-green-600 bg-green-100';
      case '高':
        return 'text-blue-600 bg-blue-100';
      case '中':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            智能定时发布演示
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
        {/* Calendar Interface */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">2024年1月</h3>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              AI 推荐
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {monthDays.slice(0, 21).map((day) => {
                const posts = getPostsForDate(day);
                const isSelected = day === selectedDate;
                const hasOptimalTime = day === selectedDate && posts.some(p => p.status === 'optimal');
                
                return (
                  <div
                    key={day}
                    className={cn(
                      'relative p-2 text-center text-sm rounded cursor-pointer transition-all',
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted',
                      hasOptimalTime && 'ring-2 ring-green-400'
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    {day}
                    {posts.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        {getPostsForDate(selectedDate).length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">1月{selectedDate}日 计划内容</h4>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getPostsForDate(selectedDate).length} 条内容
              </Badge>
            </div>

            <div className="space-y-3">
              {getPostsForDate(selectedDate).map((post) => (
                <div
                  key={post.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border',
                    post.status === 'optimal' ? 'bg-green-50 border-green-200' :
                    post.status === 'published' ? 'bg-blue-50 border-blue-200' :
                    'bg-background'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{post.time}</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-sm">{post.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {post.status === 'optimal' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">最佳时间</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimal Times Suggestion */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            今日最佳发布时间
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            {optimalTimes.map((time, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-background rounded border"
              >
                <div>
                  <span className="font-mono text-sm">{time.time}</span>
                  <p className="text-xs text-muted-foreground">{time.reason}</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={cn('text-xs', getEngagementColor(time.engagement))}
                >
                  {time.engagement}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">AI</div>
            <div className="text-xs text-muted-foreground">智能推荐</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">+35%</div>
            <div className="text-xs text-muted-foreground">互动提升</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">自动发布</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}