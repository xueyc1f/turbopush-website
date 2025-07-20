import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://turbopush.com';
  
  const robots = `User-agent: *
Allow: /

# 主要页面
Allow: /features
Allow: /download
Allow: /tech
Allow: /about
Allow: /contact

# 静态资源
Allow: /screenshots/
Allow: /images/
Allow: /_next/static/

# 禁止访问的路径
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

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
Crawl-delay: 2`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}