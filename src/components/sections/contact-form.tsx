'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '请输入主题';
    }

    if (!formData.message.trim()) {
      newErrors.message = '请输入留言内容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '留言内容至少需要10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，这里会发送到后端API
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">消息发送成功！</h3>
          <p className="text-muted-foreground mb-6">
            感谢您的留言，我们会在24小时内回复您。
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            发送新消息
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
      {/* 联系表单 - Enhanced mobile layout */}
      <Card className="order-2 lg:order-1">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">发送消息</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            有任何问题或建议？请填写下面的表单，我们会尽快回复您。
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                姓名 *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="请输入您的姓名"
                className={`h-11 sm:h-12 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                邮箱 *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="请输入您的邮箱地址"
                className={`h-11 sm:h-12 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                主题 *
              </label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="请输入消息主题"
                className={`h-11 sm:h-12 ${errors.subject ? 'border-red-500' : ''}`}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                留言内容 *
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="请详细描述您的问题或建议..."
                rows={5}
                className={`min-h-[120px] sm:min-h-[140px] resize-none ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 sm:h-12 text-base font-medium" 
              disabled={isSubmitting}
            >
              {isSubmitting ? '发送中...' : '发送消息'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 联系方式 - Enhanced mobile layout */}
      <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">联系方式</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              您也可以通过以下方式联系我们
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base">邮箱</p>
                <p className="text-muted-foreground text-sm sm:text-base break-all">support@turbopush.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base">客服热线</p>
                <p className="text-muted-foreground text-sm sm:text-base">400-123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base">办公地址</p>
                <p className="text-muted-foreground text-sm sm:text-base">北京市朝阳区科技园区</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">工作时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base">周一至周五</span>
                <span className="text-muted-foreground text-sm sm:text-base">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base">周六</span>
                <span className="text-muted-foreground text-sm sm:text-base">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base">周日</span>
                <span className="text-muted-foreground text-sm sm:text-base">休息</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}