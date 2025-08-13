'use client';

import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface QRCodeImageProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

function QRCodeImage({ src, alt, title, description }: QRCodeImageProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
        <CardContent className="p-6 sm:p-8">
          <div
            className="relative w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer group/image"
            onClick={handleClick}
          >
            <Image
              src={src}
              alt={alt}
              width={128}
              height={128}
              className="w-full h-full object-cover transition-all duration-300 group-hover/image:scale-105"
            />

            {/* Hover indicator */}
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <Typography variant="h3" className="text-lg font-semibold mb-2">
            {title}
          </Typography>
          <Typography variant="muted" className="text-sm leading-relaxed">
            {description}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal overlay with enlarged image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 animate-scale-in max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center">
              <Typography
                variant="h3"
                className="text-xl font-bold text-gray-900 mb-6"
              >
                {title}
              </Typography>

              <div className="w-80 h-80 mx-auto mb-6 rounded-xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={src}
                  alt={alt}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              <Typography variant="p" className="text-gray-600 mb-6">
                {description}
              </Typography>

              <Typography variant="small" className="text-sm text-gray-400">
                点击空白处关闭 · 按 ESC 键退出
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-muted/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            联系我们
          </Typography>
          <Typography
            variant="lead"
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            我们很乐意听到您的声音。无论是产品咨询、技术支持还是需求反馈，都欢迎与我们联系。
          </Typography>
        </div>

        {/* QR Code Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <QRCodeImage
            src="/qrcode.jpg"
            alt="联系二维码"
            title="公众号"
            description="扫码关注公众号"
          />

          <QRCodeImage
            src="/tpqq.jpg"
            alt="QQ交流群"
            title="QQ交流群"
            description="扫码加入QQ交流群"
          />

          <QRCodeImage
            src="/tpwx.jpg"
            alt="WX交流群"
            title="WX交流群"
            description="扫码加入WX交流群"
          />
        </div>
      </Container>
    </section>
  );
}
