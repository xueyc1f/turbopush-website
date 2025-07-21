import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export async function GET() {
  const baseUrl = 'https://turbopush.dpdns.org';
  const currentDate = new Date().toISOString();
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- 首页 - 单页面网站主页 -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 功能页面锚点 -->
  <url>
    <loc>${baseUrl}#features</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 平台支持页面锚点 -->
  <url>
    <loc>${baseUrl}#platforms</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 下载页面锚点 -->
  <url>
    <loc>${baseUrl}#download</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 系统要求页面锚点 -->
  <url>
    <loc>${baseUrl}#system-requirements</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 安装指南页面锚点 -->
  <url>
    <loc>${baseUrl}#installation</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 关于我们页面锚点 -->
  <url>
    <loc>${baseUrl}#about</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- 联系我们页面锚点 -->
  <url>
    <loc>${baseUrl}#contact</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 静态资源 -->
  <url>
    <loc>${baseUrl}/manifest.json</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
