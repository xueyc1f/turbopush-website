import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://turbopush.com';

  const robots = `User-agent: *
Allow: /

# 单页面网站 - 主页包含所有内容
Allow: /

# 静态资源
Allow: /screenshots/
Allow: /images/
Allow: /icons/
Allow: /_next/static/
Allow: /manifest.json
Allow: /favicon.ico

# 禁止访问的路径
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /.well-known/
Disallow: /404
Disallow: /500

# 网站地图
Sitemap: ${baseUrl}/sitemap.xml

# 爬取延迟（毫秒）
Crawl-delay: 1

# 特定搜索引擎规则
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: 360Spider
Allow: /
Crawl-delay: 2

User-agent: Sogou web spider
Allow: /
Crawl-delay: 2

# 社交媒体爬虫
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# 禁止恶意爬虫
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
