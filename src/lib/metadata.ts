import type { Metadata } from 'next';
import { seoConfig } from './seo-config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalUrl,
    ogImage = seoConfig.ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noIndex = false,
  } = config;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.creator,
    publisher: seoConfig.publisher,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
          width: seoConfig.ogImageWidth,
          height: seoConfig.ogImageHeight,
          alt: title,
        },
      ],
      locale: 'zh_CN',
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
      creator: seoConfig.social.twitter,
      site: seoConfig.social.twitter,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'application-name': seoConfig.siteName,
      'apple-mobile-web-app-title': seoConfig.siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#2563eb',
    },
  };

  return metadata;
}

export interface StructuredDataConfig {
  type:
    | 'WebSite'
    | 'Organization'
    | 'SoftwareApplication'
    | 'Product'
    | 'Article';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export function generateStructuredData(
  type: StructuredDataConfig['type'],
  config: Partial<StructuredDataConfig> = {}
) {
  const commonData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'WebSite':
      return {
        ...commonData,
        name: seoConfig.siteName,
        description: seoConfig.organization.description,
        url: seoConfig.baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${seoConfig.baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'Organization':
      return {
        ...commonData,
        name: seoConfig.organization.name,
        description: seoConfig.organization.description,
        url: seoConfig.organization.url,
        logo: seoConfig.organization.logo,
        foundingDate: seoConfig.organization.foundingDate,
        sameAs: config.sameAs || seoConfig.organization.sameAs,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: seoConfig.organization.contactPoint.contactType,
          email: seoConfig.organization.contactPoint.email,
        },
      };

    case 'SoftwareApplication':
      return {
        ...commonData,
        name: config.name || seoConfig.application.name,
        description: config.description || seoConfig.defaultDescription,
        url: config.url || seoConfig.baseUrl,
        applicationCategory:
          config.applicationCategory || seoConfig.application.category,
        operatingSystem:
          config.operatingSystem || seoConfig.application.operatingSystem,
        offers: config.offers || {
          '@type': 'Offer',
          price: seoConfig.application.price,
          priceCurrency: seoConfig.application.priceCurrency,
          availability: 'https://schema.org/InStock',
        },
        author: {
          '@type': 'Organization',
          name: seoConfig.author,
        },
        downloadUrl: seoConfig.application.downloadUrl,
        softwareVersion: seoConfig.application.version,
      };

    case 'Product':
      return {
        ...commonData,
        name: config.name || seoConfig.application.name,
        description: config.description || seoConfig.defaultDescription,
        image: config.logo,
        brand: {
          '@type': 'Brand',
          name: seoConfig.siteName,
        },
        manufacturer: {
          '@type': 'Organization',
          name: seoConfig.author,
        },
        offers: config.offers || {
          '@type': 'Offer',
          price: seoConfig.application.price,
          priceCurrency: seoConfig.application.priceCurrency,
          availability: 'https://schema.org/InStock',
          url: seoConfig.application.downloadUrl,
        },
      };

    case 'Article':
      return {
        ...commonData,
        headline: config.name,
        description: config.description,
        url: config.url,
        author: {
          '@type': 'Organization',
          name: seoConfig.author,
        },
        publisher: {
          '@type': 'Organization',
          name: seoConfig.publisher,
          logo: {
            '@type': 'ImageObject',
            url: seoConfig.organization.logo,
          },
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };

    default:
      return commonData;
  }
}
