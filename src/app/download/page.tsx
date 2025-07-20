import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { DownloadSection } from '@/components/sections/download-section';
import { SystemRequirements } from '@/components/sections/system-requirements';
import { InstallationGuide } from '@/components/sections/installation-guide';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, MessageCircle, FileText, Video, Users } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'TurboPush 下载 - 免费多平台内容发布工具',
  description: '免费下载 TurboPush 多平台内容发布管理工具。支持 Windows、macOS、Linux 系统，提供完整的安装指南和快速入门教程。',
  keywords: ['TurboPush下载', '免费下载', '多平台发布工具', '内容管理软件', 'Windows', 'macOS', 'Linux'],
  canonicalUrl: 'https://turbopush.com/download',
});

const quickStartResources = [
  {
    title: '快速入门指南',
    description: '5分钟了解 TurboPush 的基本功能和使用方法',
    icon: BookOpen,
    href: '/docs/quick-start',
    type: '文档'
  },
  {
    title: '视频教程',
    description: '观看详细的视频教程，学习如何使用各项功能',
    icon: Video,
    href: '/tutorials/videos',
    type: '视频'
  },
  {
    title: '功能演示',
    description: '交互式演示，体验 TurboPush 的核心功能',
    icon: Play,
    href: '/demo',
    type: '演示'
  },
  {
    title: '用户手册',
    description: '完整的用户手册，涵盖所有功能的详细说明',
    icon: FileText,
    href: '/docs/manual',
    type: '文档'
  },
  {
    title: '社区论坛',
    description: '加入用户社区，获取帮助和分享使用经验',
    icon: Users,
    href: '/community',
    type: '社区'
  },
  {
    title: '在线支持',
    description: '遇到问题？联系我们的技术支持团队',
    icon: MessageCircle,
    href: '/support',
    type: '支持'
  }
];

function QuickStartSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            快速入门资源
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            安装完成后，这些资源将帮助您快速掌握 TurboPush 的使用方法
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {quickStartResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer group touch-manipulation active:scale-95">
                <div className="flex flex-col sm:flex-row sm:items-start mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:bg-blue-200 transition-colors self-start">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="h4" className="text-base sm:text-lg">
                        {resource.title}
                      </Typography>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <Typography variant="muted" className="text-gray-600 mb-4 text-sm sm:text-base">
                      {resource.description}
                    </Typography>
                    <Button variant="outline" size="sm" className="w-full min-h-[40px]">
                      立即查看
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Tutorial */}
        <Card className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white mx-4 sm:mx-0">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Play className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
              </div>
            </div>
            <Typography variant="h3" className="mb-4 text-white text-lg sm:text-2xl">
              推荐：新手入门视频教程
            </Typography>
            <Typography variant="large" className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              观看我们的15分钟入门教程，从安装到发布第一条内容，全程指导
            </Typography>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <Button variant="secondary" size="lg" className="min-h-[48px] py-4 px-6">
                <Play className="h-5 w-5 mr-2" />
                观看教程
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 min-h-[48px] py-4 px-6">
                下载PDF指南
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen">
      <DownloadSection showStats={true} compact={false} />
      <SystemRequirements />
      <InstallationGuide />
      <QuickStartSection />
    </div>
  );
}
