import * as React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

const footerSections: FooterSection[] = [
  {
    title: '产品',
    links: [
      { label: '功能介绍', href: '/features' },
      { label: '下载', href: '/download' },
      { label: '系统要求', href: '/download#requirements' },
      { label: '更新日志', href: '/changelog' },
    ],
  },
  {
    title: '支持',
    links: [
      { label: '帮助中心', href: '/help' },
      { label: '联系我们', href: '/contact' },
      { label: '用户反馈', href: '/feedback' },
      { label: '常见问题', href: '/faq' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '关于我们', href: '/about' },
      { label: '隐私政策', href: '/privacy' },
      { label: '服务条款', href: '/terms' },
      { label: '商务合作', href: '/partnership' },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/turbopush', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/turbopush', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@turbopush.com', label: 'Email' },
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
            <Typography variant="muted" className="text-center sm:text-right">
              © {currentYear} TurboPush. 保留所有权利。
            </Typography>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t bg-background', className)}>
      <Container>
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Brand Section - Enhanced mobile layout */}
            <div className="lg:col-span-2 text-center sm:text-left">
              <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-bold text-xl">TurboPush</span>
              </Link>
              <Typography variant="muted" className="mb-6 max-w-sm mx-auto sm:mx-0 text-sm sm:text-base">
                强大的多平台内容发布和管理工具，让您的内容创作更高效。
              </Typography>
              <div className="flex justify-center sm:justify-start space-x-4">
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
            </div>

            {/* Footer Links - Enhanced mobile layout */}
            {footerSections.map((section) => (
              <div key={section.title} className="text-center sm:text-left">
                <Typography variant="small" className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  {section.title}
                </Typography>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
                        {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section - Enhanced mobile layout */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <Typography variant="muted" className="text-sm">
              © {currentYear} TurboPush. 保留所有权利。
            </Typography>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer, type FooterProps };