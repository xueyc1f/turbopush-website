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
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <Typography variant="small" className="font-medium">
                TurboPush
              </Typography>
            </div>
            <div className="text-center sm:text-right">
              <Typography variant="muted">
                © {currentYear} TurboPush. 保留所有权利。
              </Typography>
              <Typography variant="muted" className="text-xs mt-1">
                <Link
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  京ICP备XXXXXXXX号
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

            {/* Copyright */}
            <div className="pt-6 border-t border-border/50 w-full">
              <Typography variant="muted" className="text-sm">
                © {currentYear} TurboPush. 保留所有权利。
              </Typography>
              <Typography variant="muted" className="text-xs mt-2">
                ICP备案号：
                <Link
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  蜀ICP备2025159691号
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer, type FooterProps };
