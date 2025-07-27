import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* QR Code 1 */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src="/qrcode.jpg"
                  alt="联系二维码"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-2">
                公众号
              </Typography>
              <Typography
                variant="muted"
                className="text-sm leading-relaxed"
              >
                扫码关注公众号
              </Typography>
            </CardContent>
          </Card>

          {/* QQ Group */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src="/tpqq.jpg"
                  alt="QQ交流群"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-2">
                QQ交流群
              </Typography>
              <Typography
                variant="muted"
                className="text-sm leading-relaxed"
              >
                扫码加入QQ交流群
              </Typography>
            </CardContent>
          </Card>

          {/* WeChat 1 */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src="/tpwx.jpg"
                  alt="WX交流群"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-2">
                WX交流群
              </Typography>
              <Typography
                variant="muted"
                className="text-sm leading-relaxed"
              >
                扫码加入WX交流群
              </Typography>
            </CardContent>
          </Card>

          {/* WeChat 2 */}
          {/* <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src="/tpwx.jpg"
                  alt="微信二维码2"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-2">
                微信服务
              </Typography>
              <Typography
                variant="muted"
                className="text-sm leading-relaxed"
              >
                扫码获取技术支持
              </Typography>
            </CardContent>
          </Card> */}
        </div>
      </Container>
    </section>
  );
}
