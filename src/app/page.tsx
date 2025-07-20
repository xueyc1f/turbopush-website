import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PlatformsSection } from '@/components/sections/platforms-section';
import { DownloadSection } from '@/components/sections/download-section';
import { DynamicProductDemo, LoadingSpinner } from '@/lib/dynamic-imports';

export default function Home() {
  return (
    <div>
      <HeroSection
        title="TurboPush"
        subtitle="多平台内容发布和管理工具，让您的内容创作更高效。一键发布到多个社交媒体平台，定时发布，数据分析，让您的内容营销事半功倍。"
        ctaText="立即下载"
        ctaHref="/download"
        secondaryCtaText="了解功能"
        secondaryCtaHref="/features"
      />
      <FeaturesSection />
      <PlatformsSection />
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicProductDemo />
      </Suspense>
      <DownloadSection compact={true} />
    </div>
  );
}
