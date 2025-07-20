import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/sections/contact-form';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = generateMetadata({
  title: 'TurboPush 联系我们 - 技术支持与商务合作',
  description: '联系 TurboPush 团队获取技术支持、产品咨询或商务合作。我们提供专业的客户服务，帮助您解决使用中的问题。',
  keywords: ['TurboPush联系', '技术支持', '客户服务', '商务合作', '产品咨询', '用户反馈'],
  canonicalUrl: 'https://turbopush.com/contact',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">联系我们</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            我们很乐意听到您的声音。无论是产品咨询、技术支持还是商务合作，都欢迎与我们联系。
          </p>
        </div>
        
        <ContactForm />
      </Container>
    </div>
  );
}
