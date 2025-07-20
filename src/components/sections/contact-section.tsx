import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  MessageCircle,
  Users,
  HelpCircle,
  Briefcase,
} from 'lucide-react';

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
            我们很乐意听到您的声音。无论是产品咨询、技术支持还是商务合作，都欢迎与我们联系。
          </Typography>
        </div>

        {/* Contact Options */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Technical Support */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-3">
                技术支持
              </Typography>
              <Typography
                variant="muted"
                className="mb-6 text-sm leading-relaxed"
              >
                遇到使用问题？我们的技术团队随时为您提供专业支持
              </Typography>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:support@turbopush.com">
                  <Mail className="w-4 h-4 mr-2" />
                  support@turbopush.com
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Business Cooperation */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-3">
                商务合作
              </Typography>
              <Typography
                variant="muted"
                className="mb-6 text-sm leading-relaxed"
              >
                寻求合作机会？让我们一起探讨如何共同发展
              </Typography>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:business@turbopush.com">
                  <Users className="w-4 h-4 mr-2" />
                  business@turbopush.com
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* General Inquiry */}
          <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <Typography variant="h3" className="text-lg font-semibold mb-3">
                一般咨询
              </Typography>
              <Typography
                variant="muted"
                className="mb-6 text-sm leading-relaxed"
              >
                有任何问题或建议？我们期待与您交流
              </Typography>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:hello@turbopush.com">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@turbopush.com
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 sm:mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <Typography variant="h3" className="text-lg font-semibold mb-3">
                响应时间
              </Typography>
              <Typography variant="muted" className="text-sm leading-relaxed">
                我们承诺在 24
                小时内回复您的邮件。对于紧急技术问题，我们会优先处理并尽快为您解决。
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
