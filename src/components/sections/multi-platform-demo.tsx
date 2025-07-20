import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Check, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Platform {
  id: string;
  name: string;
  color: string;
  status: 'pending' | 'publishing' | 'success' | 'error';
  icon: string;
}

interface MultiPlatformDemoProps {
  className?: string;
}

export function MultiPlatformDemo({ className }: MultiPlatformDemoProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const platforms: Platform[] = React.useMemo(() => [
    { id: 'weibo', name: '微博', color: 'bg-red-500', status: 'pending', icon: '🐦' },
    { id: 'wechat', name: '微信', color: 'bg-green-500', status: 'pending', icon: '💬' },
    { id: 'douyin', name: '抖音', color: 'bg-black', status: 'pending', icon: '🎵' },
    { id: 'xiaohongshu', name: '小红书', color: 'bg-red-400', status: 'pending', icon: '📖' },
    { id: 'zhihu', name: '知乎', color: 'bg-blue-600', status: 'pending', icon: '🤔' },
    { id: 'bilibili', name: 'B站', color: 'bg-pink-500', status: 'pending', icon: '📺' }
  ], []);

  const [platformStates, setPlatformStates] = React.useState(platforms);

  const demoSteps = [
    'selecting-platforms',
    'publishing',
    'completed'
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % demoSteps.length;
          
          // Update platform states based on step
          if (nextStep === 1) { // Publishing
            setPlatformStates(platforms.map((p, index) => ({
              ...p,
              status: index < 2 ? 'publishing' : 'pending'
            })));
          } else if (nextStep === 2) { // Completed
            setPlatformStates(platforms.map((p, index) => ({
              ...p,
              status: index < 5 ? 'success' : index === 5 ? 'error' : 'pending'
            })));
          } else { // Reset
            setPlatformStates(platforms.map(p => ({ ...p, status: 'pending' })));
          }
          
          return nextStep;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length, platforms]);

  const getStatusIcon = (status: Platform['status']) => {
    switch (status) {
      case 'publishing':
        return <Clock className="h-3 w-3 text-yellow-500 animate-spin" />;
      case 'success':
        return <Check className="h-3 w-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Platform['status']) => {
    switch (status) {
      case 'publishing':
        return '发布中...';
      case 'success':
        return '发布成功';
      case 'error':
        return '发布失败';
      default:
        return '待发布';
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            多平台发布演示
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
        {/* Publishing Interface */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          {/* Content Preview */}
          <div className="bg-background rounded border p-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm">📱</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">TurboPush 2.0 正式发布！</p>
                <p className="text-xs text-muted-foreground mt-1">
                  全新的多平台内容发布体验，让您的创作更高效...
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">#产品发布</Badge>
                  <Badge variant="secondary" className="text-xs">#内容创作</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">选择发布平台</h4>
              {currentStep >= 1 && (
                <Button size="sm" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  一键发布
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {platformStates.map((platform) => (
                <div
                  key={platform.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border transition-all',
                    platform.status === 'success' ? 'bg-green-50 border-green-200' :
                    platform.status === 'error' ? 'bg-red-50 border-red-200' :
                    platform.status === 'publishing' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-background hover:bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg">{platform.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getStatusText(platform.status)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(platform.status)}
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      platform.status === 'success' ? 'bg-green-500' :
                      platform.status === 'error' ? 'bg-red-500' :
                      platform.status === 'publishing' ? 'bg-yellow-500' :
                      'bg-muted'
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Progress */}
          {currentStep >= 1 && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">发布进度</span>
                <span className="text-sm text-muted-foreground">
                  {platformStates.filter(p => p.status === 'success').length} / {platformStates.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${(platformStates.filter(p => p.status === 'success').length / platformStates.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">6+</div>
            <div className="text-xs text-muted-foreground">支持平台</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">1-Click</div>
            <div className="text-xs text-muted-foreground">一键发布</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">95%</div>
            <div className="text-xs text-muted-foreground">成功率</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}