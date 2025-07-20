import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { FeaturesPageClient } from './features-client';

export const metadata: Metadata = generateMetadata({
  title: 'TurboPush 功能介绍 - 多平台内容发布管理工具',
  description: '了解 TurboPush 的强大功能：智能内容创作、多平台一键发布、定时发布、数据分析、团队协作等。提升您的内容营销效率。',
  keywords: ['TurboPush功能', '内容创作', '多平台发布', '定时发布', '数据分析', '团队协作', '社交媒体管理'],
  canonicalUrl: 'https://turbopush.com/features',
  ogType: 'article',
});

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
