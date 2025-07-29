import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Lightbulb, Globe, Zap, Shield } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            关于 TurboPush
          </Typography>
          <Typography
            variant="lead"
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            我们致力于为内容创作者和企业提供最高效、最智能的多平台内容发布解决方案，
            让每一个创意都能触达更广阔的受众。
          </Typography>

          {/* Key Features Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Badge variant="secondary" className="px-3 sm:px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              全球服务
            </Badge>
            <Badge variant="secondary" className="px-3 sm:px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              高效发布
            </Badge>
            <Badge variant="secondary" className="px-3 sm:px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              安全可靠
            </Badge>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <Typography variant="h3" className="text-xl font-semibold mb-3">
                我们的使命
              </Typography>
              <Typography variant="muted" className="leading-relaxed">
                简化内容创作者的工作流程，通过智能化的多平台发布工具，
                让优质内容能够高效地触达目标受众，释放创作者的更多时间专注于内容本身。
              </Typography>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <Typography variant="h3" className="text-xl font-semibold mb-3">
                我们的愿景
              </Typography>
              <Typography variant="muted" className="leading-relaxed">
                打造全网最好用的内容发布工具，为创作者提供安全、高效的创作体验，
                无缝连接所有主流平台，实现内容一键同步。
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
