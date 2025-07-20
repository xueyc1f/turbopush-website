import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { seoConfig } from '@/lib/seo-config';
import { PageLayout } from '@/components/layout/page-layout';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PlatformsSection } from '@/components/sections/platforms-section';
import { DownloadSection } from '@/components/sections/download-section';
import { InstallationGuide } from '@/components/sections/installation-guide';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import {
  StructuredData,
  FAQStructuredData,
  SoftwareReviewStructuredData,
  HowToStructuredData,
} from '@/components/seo/structured-data';

export const metadata: Metadata = generateMetadata({
  title: seoConfig.pages.home.title,
  description: seoConfig.pages.home.description,
  keywords: seoConfig.pages.home.keywords,
  canonicalUrl: seoConfig.baseUrl,
  ogImage: seoConfig.ogImage,
  ogType: 'website',
});

export default function Home() {
  return (
    <>
      {/* SEO 结构化数据 */}
      <StructuredData type="website" />
      <StructuredData type="organization" />
      <StructuredData type="software" />
      <StructuredData type="product" />
      <StructuredData type="breadcrumb" />
      <FAQStructuredData />
      <SoftwareReviewStructuredData />
      <HowToStructuredData />

      <PageLayout>
        <HeroSection
          title="TurboPush"
          subtitle="多平台内容发布和管理工具，让您的内容创作更高效。一键发布到多个社交媒体平台，定时发布，数据分析，让您的内容营销事半功倍。"
          ctaText="立即下载"
          ctaHref="#download"
          secondaryCtaText="查看功能"
          secondaryCtaHref="#features"
        />
        <FeaturesSection />
        <PlatformsSection />
        <DownloadSection compact={false} />
        <InstallationGuide />
        <AboutSection />
        <ContactSection />
      </PageLayout>
    </>
  );
}
