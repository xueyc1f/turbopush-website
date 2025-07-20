import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Image, 
  Link, 
  Type, 
  Palette,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCreationDemoProps {
  className?: string;
}

export function ContentCreationDemo({ className }: ContentCreationDemoProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const demoSteps = [
    {
      title: '创建新内容',
      description: '选择内容类型，开始创作',
      highlight: 'text-editor'
    },
    {
      title: '添加多媒体',
      description: '插入图片、视频和链接',
      highlight: 'media-tools'
    },
    {
      title: 'AI 优化建议',
      description: '智能分析并提供优化建议',
      highlight: 'ai-suggestions'
    },
    {
      title: '预览效果',
      description: '查看在不同平台的显示效果',
      highlight: 'preview'
    }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            智能内容创作演示
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
        {/* Demo Interface Mockup */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-2 bg-background rounded border">
            <Button 
              variant={currentStep === 0 ? 'default' : 'ghost'} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Type className="h-3 w-3" />
              文本
            </Button>
            <Button 
              variant={currentStep === 1 ? 'default' : 'ghost'} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Image className="h-3 w-3" />
              图片
            </Button>
            <Button 
              variant={currentStep === 1 ? 'default' : 'ghost'} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Link className="h-3 w-3" />
              链接
            </Button>
            <Button 
              variant={currentStep === 2 ? 'default' : 'ghost'} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              AI 优化
            </Button>
            <Button 
              variant={currentStep === 3 ? 'default' : 'ghost'} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Palette className="h-3 w-3" />
              预览
            </Button>
          </div>

          {/* Content Area */}
          <div className="bg-background rounded border p-4 min-h-[200px]">
            <div className="space-y-3">
              <div className={cn(
                'p-3 rounded border-2 border-dashed transition-colors',
                currentStep === 0 ? 'border-primary bg-primary/5' : 'border-muted'
              )}>
                <p className="text-sm font-medium">📱 新产品发布！</p>
                <p className="text-sm text-muted-foreground mt-1">
                  我们很兴奋地宣布 TurboPush 2.0 正式发布...
                </p>
              </div>

              {currentStep >= 1 && (
                <div className={cn(
                  'p-3 rounded border-2 border-dashed transition-all duration-500',
                  currentStep === 1 ? 'border-primary bg-primary/5' : 'border-muted'
                )}>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                      <Image className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">产品截图.png</p>
                      <p className="text-xs text-muted-foreground">1.2MB</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep >= 2 && (
                <div className={cn(
                  'p-3 rounded border-2 border-dashed transition-all duration-500',
                  currentStep === 2 ? 'border-primary bg-primary/5' : 'border-muted'
                )}>
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-primary">AI 建议</p>
                      <p className="text-xs text-muted-foreground">
                        建议添加更多表情符号和话题标签以提高互动率
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platform Preview */}
          {currentStep >= 3 && (
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-background rounded border p-2">
                <Badge variant="secondary" className="text-xs mb-2">微博</Badge>
                <div className="text-xs text-muted-foreground">140字预览</div>
              </div>
              <div className="bg-background rounded border p-2">
                <Badge variant="secondary" className="text-xs mb-2">微信</Badge>
                <div className="text-xs text-muted-foreground">图文预览</div>
              </div>
              <div className="bg-background rounded border p-2">
                <Badge variant="secondary" className="text-xs mb-2">小红书</Badge>
                <div className="text-xs text-muted-foreground">笔记预览</div>
              </div>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2 flex-1 rounded-full transition-colors',
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
          <div className="text-center">
            <p className="font-medium">{demoSteps[currentStep].title}</p>
            <p className="text-sm text-muted-foreground">
              {demoSteps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">10+</div>
            <div className="text-xs text-muted-foreground">内容格式</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">AI</div>
            <div className="text-xs text-muted-foreground">智能优化</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}