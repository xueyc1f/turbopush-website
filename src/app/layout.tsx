import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateMetadata, generateStructuredData } from '@/lib/metadata';
import { ServiceWorkerProvider } from '@/components/ui/service-worker-provider';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = generateMetadata({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  canonicalUrl: seoConfig.baseUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = generateStructuredData('WebSite');
  const organizationStructuredData = generateStructuredData('Organization');
  const softwareStructuredData = generateStructuredData('SoftwareApplication');

  return (
    <html lang="zh-CN">
      <head>
        {/* Critical CSS inlined above */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical above-the-fold styles */
            .hero-section { 
              min-height: 100vh; 
              contain: layout style paint;
              content-visibility: auto;
            }
            .loading-spinner { 
              animation: spin 1s linear infinite;
              transform: translateZ(0);
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            /* Prevent layout shift */
            .image-placeholder {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            /* Critical layout containers */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .btn-primary { 
              background: #2563eb; 
              color: white; 
              padding: 0.75rem 1.5rem; 
              border-radius: 0.5rem;
              transition: background-color 0.2s;
            }
            .btn-primary:hover { background: #1d4ed8; }
          `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareStructuredData),
          }}
        />
        <link rel="canonical" href="https://turbopush.com" />
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
        <meta
          name="baidu-site-verification"
          content="your-baidu-verification-code"
        />

        {/* Performance and security meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TurboPush" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
      </body>
    </html>
  );
}
