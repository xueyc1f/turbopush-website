import * as React from 'react';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';

// 简化后不再需要复杂的接口定义

interface FooterProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

// 删除了复杂的 footerSections，简化为左侧布局

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/xueyc1f/turbopush-website',
    label: 'GitHub',
  },
  // { icon: X, href: 'https://twitter.com/turbopush', label: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:kube.call@gmail.com', label: 'Email' },
];

function Footer({ variant = 'default', className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className={cn('border-t bg-background', className)}>
        <Container>
          <div className="py-6 flex flex-col gap-4">
            {/* 品牌和版权信息 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TP</span>
                </div>
                <Typography variant="small" className="font-medium">
                  TurboPush{' '}
                  <span className="text-muted-foreground font-normal">
                    强大的多平台内容发布和管理工具，让您的内容创作更高效。
                  </span>
                </Typography>
              </div>
              <div className="text-center sm:text-right">
                <Typography variant="muted">
                  © {currentYear} TurboPush. 保留所有权利。
                </Typography>
              </div>
            </div>

            {/* 备案信息和法律链接 */}
            <div className="flex flex-col items-center gap-3 pt-2 border-t border-border/30">
              {/* 备案信息行 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* ICP备案 */}
                <Typography
                  variant="muted"
                  className="text-xs flex items-center gap-1"
                >
                  ICP备案号：
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    蜀ICP备2025159691号
                  </a>
                </Typography>

                {/* 公安备案 */}
                <Typography
                  variant="muted"
                  className="text-xs flex items-center gap-1"
                >
                  <img src="/police.png" alt="公安备案" className="w-4 h-4" />
                  <a
                    href="https://beian.mps.gov.cn/#/query/webSearch?code=51010702043662"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    川公网安备51010702043662号
                  </a>
                </Typography>
              </div>

              {/* 法律政策链接 */}
              <Typography
                variant="muted"
                className="text-xs flex items-center gap-3"
              >
                <Link
                  className="hover:text-foreground transition-colors"
                  href="/privacy.html"
                >
                  隐私政策
                </Link>
                <span className="text-muted-foreground/50">|</span>
                <Link
                  className="hover:text-foreground transition-colors"
                  href="/terms.html"
                >
                  服务条款
                </Link>
              </Typography>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t bg-background', className)}>
      <Container>
        <div className="py-8 sm:py-12">
          {/* 简化的左侧布局 */}
          <div className="flex flex-col items-start space-y-6">
            {/* Brand Section */}
            <div className="text-left">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mb-4 mr-2"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TP</span>
                </div>
                <span className="font-bold text-xl">TurboPush</span>
              </Link>
              <Typography
                variant="muted"
                className="mb-6 max-w-md text-sm sm:text-base"
              >
                强大的多平台内容发布和管理工具，让您的内容创作更高效。
              </Typography>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Copyright and Legal Info */}
            <div className="pt-6 border-t border-border/50 w-full flex flex-col items-start gap-4">
              {/* 版权信息 */}
              <Typography variant="muted" className="text-sm">
                © {currentYear} TurboPush. 保留所有权利。
              </Typography>

              {/* 备案信息和法律链接 */}
              <div className="flex flex-col items-start gap-3">
                {/* 备案信息行 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* ICP备案 */}
                  <Typography
                    variant="muted"
                    className="text-xs flex items-center gap-1"
                  >
                    ICP备案号：
                    <a
                      href="https://beian.miit.gov.cn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      蜀ICP备2025159691号
                    </a>
                  </Typography>

                  {/* 公安备案 */}
                  <Typography
                    variant="muted"
                    className="text-xs flex items-center gap-1"
                  >
                    <img src="/police.png" alt="公安备案" className="w-4 h-4" />
                    <a
                      href="https://beian.mps.gov.cn/#/query/webSearch?code=51010702043662"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      川公网安备51010702043662号
                    </a>
                  </Typography>
                </div>

                {/* 法律政策链接 */}
                <Typography
                  variant="muted"
                  className="text-xs flex items-center gap-3"
                >
                  <Link
                    className="hover:text-foreground transition-colors"
                    href="/privacy.html"
                  >
                    隐私政策
                  </Link>
                  <span className="text-muted-foreground/50">|</span>
                  <Link
                    className="hover:text-foreground transition-colors"
                    href="/terms.html"
                  >
                    服务条款
                  </Link>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer, type FooterProps };
