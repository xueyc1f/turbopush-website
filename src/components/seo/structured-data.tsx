'use client';

import { generateStructuredData } from '@/lib/metadata';
import { seoConfig } from '@/lib/seo-config';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'software' | 'product' | 'breadcrumb';
  customData?: Record<string, unknown>;
}

export function StructuredData({
  type = 'website',
  customData,
}: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return generateStructuredData('WebSite', {
          name: seoConfig.siteName,
          description: seoConfig.defaultDescription,
          url: seoConfig.baseUrl,
          ...customData,
        });

      case 'organization':
        return generateStructuredData('Organization', {
          name: seoConfig.organization.name,
          description: seoConfig.organization.description,
          url: seoConfig.organization.url,
          logo: seoConfig.organization.logo,
          sameAs: seoConfig.organization.sameAs,
          ...customData,
        });

      case 'software':
        return generateStructuredData('SoftwareApplication', {
          name: seoConfig.application.name,
          description: seoConfig.defaultDescription,
          url: seoConfig.baseUrl,
          applicationCategory: seoConfig.application.category,
          operatingSystem: seoConfig.application.operatingSystem,
          offers: {
            price: seoConfig.application.price,
            priceCurrency: seoConfig.application.priceCurrency,
            availability: 'https://schema.org/InStock',
          },
          ...customData,
        });

      case 'product':
        return generateStructuredData('Product', {
          name: seoConfig.application.name,
          description: seoConfig.defaultDescription,
          offers: {
            price: seoConfig.application.price,
            priceCurrency: seoConfig.application.priceCurrency,
            availability: 'https://schema.org/InStock',
          },
          ...customData,
        });

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '首页',
              item: seoConfig.baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '功能',
              item: `${seoConfig.baseUrl}#features`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: '下载',
              item: `${seoConfig.baseUrl}#download`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: '关于',
              item: `${seoConfig.baseUrl}#about`,
            },
            {
              '@type': 'ListItem',
              position: 5,
              name: '联系',
              item: `${seoConfig.baseUrl}#contact`,
            },
          ],
          ...customData,
        };

      default:
        return generateStructuredData('WebSite');
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// FAQ structured data for common questions
export function FAQStructuredData() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'TurboPush 支持哪些平台？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TurboPush 支持8个主流平台：微博、微信公众号、抖音、小红书、B站、知乎、Twitter、LinkedIn。我们持续增加更多平台支持。',
        },
      },
      {
        '@type': 'Question',
        name: 'TurboPush 需要什么系统要求？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TurboPush 支持 Windows、macOS 和 Linux 系统。内容发布功能需要 Chrome 浏览器（版本 90 或更高）支持。',
        },
      },
      {
        '@type': 'Question',
        name: 'TurboPush 是免费的吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TurboPush 完全免费下载和使用，无需注册，没有隐藏费用。我们致力于为内容创作者提供免费的多平台发布工具。',
        },
      },
      {
        '@type': 'Question',
        name: '如何安装 TurboPush？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '下载对应系统的安装包后，按照安装指南进行安装。Windows 需要管理员权限，macOS 需要在安全设置中允许运行，Linux 使用 AppImage 格式直接运行。',
        },
      },
      {
        '@type': 'Question',
        name: 'TurboPush 如何保护用户隐私？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TurboPush 采用本地数据存储，用户数据不会上传到我们的服务器。所有账户信息和内容都保存在用户本地设备上，确保隐私安全。',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}

// Software review structured data
export function SoftwareReviewStructuredData() {
  const reviewData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TurboPush',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '内容创作者',
        },
        datePublished: '2024-01-15',
        reviewBody: '非常好用的多平台发布工具，节省了大量时间，界面简洁易用。',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: '自媒体运营',
        },
        datePublished: '2024-02-20',
        reviewBody:
          '支持的平台很全面，定时发布功能特别实用，推荐给所有内容创作者。',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewData),
      }}
    />
  );
}

// How-to structured data for installation guide
export function HowToStructuredData() {
  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '如何安装和使用 TurboPush',
    description: '详细的 TurboPush 安装和使用指南，包含系统要求和步骤说明',
    image: 'https://turbopush.com/screenshots/installation-guide.jpg',
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Chrome 浏览器',
        requiredQuantity: '1',
      },
      {
        '@type': 'HowToSupply',
        name: '支持的操作系统',
        requiredQuantity: '1',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'TurboPush 安装包',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: '下载安装包',
        text: '从官网下载适合您操作系统的 TurboPush 安装包',
        image: 'https://turbopush.com/screenshots/download-step.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: '安装应用程序',
        text: '运行安装包并按照提示完成安装过程',
        image: 'https://turbopush.com/screenshots/install-step.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: '启动应用',
        text: '双击桌面图标或从开始菜单启动 TurboPush',
        image: 'https://turbopush.com/screenshots/launch-step.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: '连接社交媒体账户',
        text: '在设置中添加您要发布内容的社交媒体平台账户',
        image: 'https://turbopush.com/screenshots/connect-step.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: '开始发布内容',
        text: '创建内容，选择平台，点击发布或设置定时发布',
        image: 'https://turbopush.com/screenshots/publish-step.jpg',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToData),
      }}
    />
  );
}

// Video structured data for product demo
export function VideoStructuredData() {
  const videoData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'TurboPush 产品演示视频',
    description: 'TurboPush 多平台内容发布工具的完整功能演示',
    thumbnailUrl: 'https://turbopush.com/screenshots/video-thumbnail.jpg',
    uploadDate: '2024-01-01T00:00:00Z',
    duration: 'PT5M30S',
    contentUrl: 'https://turbopush.com/videos/product-demo.mp4',
    embedUrl: 'https://turbopush.com/embed/product-demo',
    publisher: {
      '@type': 'Organization',
      name: 'TurboPush',
      logo: {
        '@type': 'ImageObject',
        url: 'https://turbopush.com/og-image.jpg',
      },
    },
    author: {
      '@type': 'Organization',
      name: 'TurboPush Team',
    },
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: 15000,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(videoData),
      }}
    />
  );
}

// Local business structured data (if applicable)
export function LocalBusinessStructuredData() {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareCompany',
    name: 'TurboPush',
    description: '专业的多平台内容发布和管理工具开发商',
    url: 'https://turbopush.com',
    logo: 'https://turbopush.com/og-image.jpg',
    foundingDate: '2024',
    founder: {
      '@type': 'Organization',
      name: 'TurboPush Team',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+86-400-123-4567',
      email: 'support@turbopush.com',
      availableLanguage: ['Chinese', 'English'],
      areaServed: 'CN',
    },
    sameAs: [
      'https://twitter.com/turbopush',
      'https://github.com/turbopush',
      'https://weibo.com/turbopush',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'TurboPush',
        applicationCategory: 'BusinessApplication',
      },
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData),
      }}
    />
  );
}
