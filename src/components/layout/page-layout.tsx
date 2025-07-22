import * as React from 'react';
import { Metadata } from 'next';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  headerProps?: {
    transparent?: boolean;
    fixed?: boolean;
  };
  footerProps?: {
    variant?: 'default' | 'minimal';
  };
  className?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

function PageLayout({
  children,
  headerProps = { fixed: true, transparent: true },
  footerProps,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      <Header {...headerProps} />
      <main className="flex-1">{children}</main>
      <Footer {...footerProps} />
    </div>
  );
}

// SEO metadata generation helper
function generateMetadata({
  title,
  description = 'TurboPush - 强大的多平台内容发布和管理工具，让您的内容创作更高效。支持多个社交媒体平台，提供定时发布、内容管理、数据分析等功能。',
  keywords = [
    'TurboPush',
    '多平台发布',
    '内容管理',
    '社交媒体',
    '定时发布',
    '内容创作',
  ],
  ogImage = '/og-image.jpg',
  canonicalUrl,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const siteTitle = 'TurboPush';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return {
    metadataBase: new URL('https://www.turbopush.top'),
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'TurboPush Team' }],
    creator: 'TurboPush',
    publisher: 'TurboPush',
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@turbopush',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// JSON-LD structured data helper
function generateStructuredData(
  type: 'WebSite' | 'SoftwareApplication' | 'Organization' = 'WebSite'
) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseData,
        name: 'TurboPush',
        url: 'https://www.turbopush.top',
        description: 'TurboPush - 强大的多平台内容发布和管理工具',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.turbopush.top/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };

    case 'SoftwareApplication':
      return {
        ...baseData,
        name: 'TurboPush',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows, macOS, Linux',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl: 'https://www.turbopush.top/#download',
        description: '多平台内容发布和管理工具',
        featureList: ['多平台发布', '定时发布', '内容管理', '数据分析'],
      };

    case 'Organization':
      return {
        ...baseData,
        name: 'TurboPush',
        url: 'https://www.turbopush.top',
        logo: 'https://www.turbopush.top/og-image.jpg',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-xxx-xxx-xxxx',
          contactType: 'customer service',
          email: 'contact@turbopush.com',
        },
        sameAs: ['https://github.com/xueyc1f'],
      };

    default:
      return baseData;
  }
}

export {
  PageLayout,
  generateMetadata,
  generateStructuredData,
  type PageLayoutProps,
  type SEOProps,
};
