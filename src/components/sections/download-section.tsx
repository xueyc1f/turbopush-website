'use client';
import { Shield, Zap, Users } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { DownloadButton } from '@/components/ui/download-button';

interface DownloadSectionProps {
  compact?: boolean;
}

export function DownloadSection({ compact = false }: DownloadSectionProps) {
  const handleDownload = (platform: string) => {
    console.log(`Download initiated for ${platform}`);
    // Here you would typically track the download with analytics
  };

  if (compact) {
    return (
      <section className="py-8 sm:py-12 bg-blue-50">
        <Container>
          <div className="text-center px-4 sm:px-0">
            <Typography
              variant="h3"
              className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl"
            >
              立即开始使用 TurboPush
            </Typography>
            <Typography
              variant="large"
              className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg"
            >
              免费下载，立即体验多平台内容发布的便捷
            </Typography>
            <DownloadButton
              variant="default"
              size="lg"
              autoDetect={true}
              showDropdown={true}
              onDownload={handleDownload}
            />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="download"
      className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <Container>
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <Typography
            variant="h2"
            className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl"
          >
            立即下载 TurboPush
          </Typography>
          <Typography
            variant="large"
            className="text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg"
          >
            智能检测您的操作系统，为您推荐最适合的版本。立即开始您的多平台内容发布之旅。
          </Typography>

          <div className="flex justify-center mb-6 sm:mb-8">
            <DownloadButton
              variant="default"
              size="lg"
              autoDetect={true}
              showDropdown={true}
              onDownload={handleDownload}
            />
          </div>

          {/* Browser Requirement Notice */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <svg
                    className="h-5 w-5 text-amber-600 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <Typography
                    variant="small"
                    className="text-amber-800 font-medium"
                  >
                    需要 Chrome 或 Edge 浏览器：
                  </Typography>
                  <Typography variant="small" className="text-amber-700 mt-1">
                    内容发布功能需要 Chrome 或 Edge 浏览器支持，请确保已安装
                    Chrome/Edge 90+ 版本
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - Enhanced mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              安全可靠
            </Typography>
            <Typography
              variant="muted"
              className="text-gray-600 text-sm sm:text-base"
            >
              数据本地加密存储，隐私保护，通过多项安全认证
            </Typography>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              快速高效
            </Typography>
            <Typography
              variant="muted"
              className="text-gray-600 text-sm sm:text-base"
            >
              一键发布到多个平台，节省90%的内容发布时间
            </Typography>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
              </div>
            </div>
            <Typography variant="h4" className="mb-2 text-lg sm:text-xl">
              用户友好
            </Typography>
            <Typography
              variant="muted"
              className="text-gray-600 text-sm sm:text-base"
            >
              直观的界面设计，零学习成本，新手也能快速上手
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  );
}
