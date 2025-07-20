import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://turbopush.com';
  const currentDate = new Date().toISOString();
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  
  <!-- 首页 - 单页面网站主页 -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>TurboPush - 多平台内容发布管理工具</image:title>
      <image:caption>TurboPush 是一个强大的多平台内容发布和管理工具，支持微博、微信、抖音、小红书等8个主流平台</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/screenshots/main-interface.jpg</image:loc>
      <image:title>TurboPush 主界面截图</image:title>
      <image:caption>TurboPush 应用程序主界面展示，包含内容创作、平台选择和发布管理功能</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/screenshots/content-editor.jpg</image:loc>
      <image:title>TurboPush 内容编辑器</image:title>
      <image:caption>TurboPush 富文本编辑器，支持图片、链接和格式化文本</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/screenshots/platform-selection.jpg</image:loc>
      <image:title>TurboPush 平台选择界面</image:title>
      <image:caption>TurboPush 支持的8个主流社交媒体平台选择界面</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/screenshots/schedule-calendar.jpg</image:loc>
      <image:title>TurboPush 定时发布日历</image:title>
      <image:caption>TurboPush 定时发布功能，支持日历视图管理发布计划</image:caption>
    </image:image>
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
