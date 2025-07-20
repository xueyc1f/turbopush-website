#!/usr/bin/env node

/**
 * TurboPush 网站 SEO 健康检查脚本
 * 用于自动检查网站的 SEO 配置和性能
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://turbopush.com';
const TIMEOUT = 10000;

class SEOChecker {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
    };
  }

  log(type, message, details = '') {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type,
      message,
      details,
    };

    this.results.details.push(logEntry);

    const colors = {
      PASS: '\x1b[32m✓\x1b[0m',
      FAIL: '\x1b[31m✗\x1b[0m',
      WARN: '\x1b[33m⚠\x1b[0m',
      INFO: '\x1b[36mℹ\x1b[0m',
    };

    console.log(`${colors[type] || colors.INFO} ${message}`);
    if (details) {
      console.log(`  ${details}`);
    }

    if (type === 'PASS') this.results.passed++;
    if (type === 'FAIL') this.results.failed++;
    if (type === 'WARN') this.results.warnings++;
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, { timeout: TIMEOUT }, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve({
            statusCode: response.statusCode,
            headers: response.headers,
            body: data,
          });
        });
      });

      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });

      request.on('error', (error) => {
        reject(error);
      });
    });
  }

  checkMetaTags(html) {
    this.log('INFO', '检查 Meta 标签...');

    // 检查标题
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      const title = titleMatch[1];
      if (title.length >= 30 && title.length <= 60) {
        this.log('PASS', '页面标题长度合适', `长度: ${title.length} 字符`);
      } else {
        this.log(
          'WARN',
          '页面标题长度不理想',
          `长度: ${title.length} 字符 (建议 30-60)`
        );
      }

      if (title.includes('TurboPush') && title.includes('多平台')) {
        this.log('PASS', '页面标题包含关键词');
      } else {
        this.log('FAIL', '页面标题缺少关键词');
      }
    } else {
      this.log('FAIL', '未找到页面标题');
    }

    // 检查描述
    const descMatch = html.match(
      /<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i
    );
    if (descMatch) {
      const description = descMatch[1];
      if (description.length >= 120 && description.length <= 160) {
        this.log(
          'PASS',
          'Meta 描述长度合适',
          `长度: ${description.length} 字符`
        );
      } else {
        this.log(
          'WARN',
          'Meta 描述长度不理想',
          `长度: ${description.length} 字符 (建议 120-160)`
        );
      }
    } else {
      this.log('FAIL', '未找到 Meta 描述');
    }

    // 检查关键词
    const keywordsMatch = html.match(
      /<meta[^>]*name=["\']keywords["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i
    );
    if (keywordsMatch) {
      this.log('PASS', '找到 Meta 关键词');
    } else {
      this.log('WARN', '未找到 Meta 关键词');
    }

    // 检查语言标签
    if (html.includes('lang="zh-CN"')) {
      this.log('PASS', '语言标签设置正确');
    } else {
      this.log('FAIL', '语言标签缺失或不正确');
    }
  }

  checkOpenGraph(html) {
    this.log('INFO', '检查 Open Graph 标签...');

    const ogTags = [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'og:site_name',
    ];

    ogTags.forEach((tag) => {
      const regex = new RegExp(
        `<meta[^>]*property=["\']${tag}["\'][^>]*>`,
        'i'
      );
      if (html.match(regex)) {
        this.log('PASS', `找到 ${tag} 标签`);
      } else {
        this.log('FAIL', `缺少 ${tag} 标签`);
      }
    });
  }

  checkTwitterCard(html) {
    this.log('INFO', '检查 Twitter Card 标签...');

    const twitterTags = [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
    ];

    twitterTags.forEach((tag) => {
      const regex = new RegExp(`<meta[^>]*name=["\']${tag}["\'][^>]*>`, 'i');
      if (html.match(regex)) {
        this.log('PASS', `找到 ${tag} 标签`);
      } else {
        this.log('FAIL', `缺少 ${tag} 标签`);
      }
    });
  }

  checkStructuredData(html) {
    this.log('INFO', '检查结构化数据...');

    const jsonLdMatches = html.match(
      /<script[^>]*type=["\']application\/ld\+json["\'][^>]*>([^<]+)<\/script>/gi
    );

    if (jsonLdMatches && jsonLdMatches.length > 0) {
      this.log('PASS', `找到 ${jsonLdMatches.length} 个结构化数据块`);

      jsonLdMatches.forEach((match, index) => {
        try {
          const jsonContent = match
            .replace(/<script[^>]*>/, '')
            .replace(/<\/script>/, '');
          const data = JSON.parse(jsonContent);
          this.log(
            'PASS',
            `结构化数据 ${index + 1} 格式正确`,
            `类型: ${data['@type']}`
          );
        } catch (error) {
          this.log('FAIL', `结构化数据 ${index + 1} 格式错误`, error.message);
        }
      });
    } else {
      this.log('FAIL', '未找到结构化数据');
    }
  }

  checkHeadingStructure(html) {
    this.log('INFO', '检查标题结构...');

    const h1Matches = html.match(/<h1[^>]*>/gi);
    if (h1Matches) {
      if (h1Matches.length === 1) {
        this.log('PASS', '页面有且仅有一个 H1 标签');
      } else {
        this.log(
          'WARN',
          `页面有 ${h1Matches.length} 个 H1 标签`,
          '建议只使用一个 H1'
        );
      }
    } else {
      this.log('FAIL', '页面缺少 H1 标签');
    }

    // 检查标题层次
    const headings = html.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    if (headings && headings.length > 0) {
      this.log('PASS', `找到 ${headings.length} 个标题标签`);
    } else {
      this.log('WARN', '页面标题标签较少');
    }
  }

  checkImages(html) {
    this.log('INFO', '检查图片优化...');

    const imgMatches = html.match(/<img[^>]*>/gi);
    if (imgMatches) {
      let imagesWithAlt = 0;
      let imagesWithoutAlt = 0;

      imgMatches.forEach((img) => {
        if (img.includes('alt=')) {
          imagesWithAlt++;
        } else {
          imagesWithoutAlt++;
        }
      });

      this.log('PASS', `${imagesWithAlt} 个图片有 alt 属性`);
      if (imagesWithoutAlt > 0) {
        this.log('FAIL', `${imagesWithoutAlt} 个图片缺少 alt 属性`);
      }
    }
  }

  async checkRobots() {
    this.log('INFO', '检查 robots.txt...');

    try {
      const response = await this.fetchPage(`${BASE_URL}/robots.txt`);
      if (response.statusCode === 200) {
        this.log('PASS', 'robots.txt 可访问');

        if (response.body.includes('Sitemap:')) {
          this.log('PASS', 'robots.txt 包含 sitemap 引用');
        } else {
          this.log('WARN', 'robots.txt 缺少 sitemap 引用');
        }
      } else {
        this.log(
          'FAIL',
          'robots.txt 不可访问',
          `状态码: ${response.statusCode}`
        );
      }
    } catch (error) {
      this.log('FAIL', 'robots.txt 检查失败', error.message);
    }
  }

  async checkSitemap() {
    this.log('INFO', '检查 sitemap.xml...');

    try {
      const response = await this.fetchPage(`${BASE_URL}/sitemap.xml`);
      if (response.statusCode === 200) {
        this.log('PASS', 'sitemap.xml 可访问');

        if (response.body.includes('<urlset')) {
          this.log('PASS', 'sitemap.xml 格式正确');
        } else {
          this.log('FAIL', 'sitemap.xml 格式错误');
        }

        const urlMatches = response.body.match(/<url>/g);
        if (urlMatches) {
          this.log('PASS', `sitemap.xml 包含 ${urlMatches.length} 个 URL`);
        }
      } else {
        this.log(
          'FAIL',
          'sitemap.xml 不可访问',
          `状态码: ${response.statusCode}`
        );
      }
    } catch (error) {
      this.log('FAIL', 'sitemap.xml 检查失败', error.message);
    }
  }

  checkPerformance(headers) {
    this.log('INFO', '检查性能相关头部...');

    if (headers['cache-control']) {
      this.log('PASS', '设置了缓存控制头');
    } else {
      this.log('WARN', '未设置缓存控制头');
    }

    if (
      headers['content-encoding'] &&
      headers['content-encoding'].includes('gzip')
    ) {
      this.log('PASS', '启用了 Gzip 压缩');
    } else {
      this.log('WARN', '未启用 Gzip 压缩');
    }

    if (headers['x-content-type-options']) {
      this.log('PASS', '设置了内容类型选项头');
    } else {
      this.log('WARN', '未设置内容类型选项头');
    }
  }

  async run() {
    console.log('🔍 开始 TurboPush 网站 SEO 检查...\n');

    try {
      // 获取主页
      const response = await this.fetchPage(BASE_URL);

      if (response.statusCode !== 200) {
        this.log('FAIL', '网站不可访问', `状态码: ${response.statusCode}`);
        return;
      }

      this.log('PASS', '网站可正常访问');

      // 执行各项检查
      this.checkMetaTags(response.body);
      this.checkOpenGraph(response.body);
      this.checkTwitterCard(response.body);
      this.checkStructuredData(response.body);
      this.checkHeadingStructure(response.body);
      this.checkImages(response.body);
      this.checkPerformance(response.headers);

      await this.checkRobots();
      await this.checkSitemap();
    } catch (error) {
      this.log('FAIL', '检查过程中出现错误', error.message);
    }

    // 输出总结
    console.log('\n📊 检查结果总结:');
    console.log(`✅ 通过: ${this.results.passed}`);
    console.log(`❌ 失败: ${this.results.failed}`);
    console.log(`⚠️  警告: ${this.results.warnings}`);

    const score = Math.round(
      (this.results.passed /
        (this.results.passed + this.results.failed + this.results.warnings)) *
        100
    );
    console.log(`📈 SEO 得分: ${score}%`);

    if (score >= 90) {
      console.log('🎉 SEO 状态优秀！');
    } else if (score >= 70) {
      console.log('👍 SEO 状态良好，还有改进空间');
    } else {
      console.log('⚠️  SEO 需要改进');
    }

    // 保存详细报告
    const reportPath = path.join(__dirname, '..', 'seo-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 详细报告已保存到: ${reportPath}`);
  }
}

// 运行检查
const checker = new SEOChecker();
checker.run().catch(console.error);

export default SEOChecker;
