import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Database, 
  Lock, 
  Monitor, 
  Globe,
  Code,
  Server,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'TurboPush 技术架构 - 高性能多平台发布工具技术详解',
  description: '深入了解 TurboPush 的技术架构：Tauri + Rust 后端、React 前端、安全保障、性能优势和系统兼容性。专业技术支持服务。',
  keywords: ['TurboPush技术', '技术架构', 'Tauri', 'Rust', 'React', '性能优化', '安全保障', '系统兼容性'],
  canonicalUrl: 'https://turbopush.com/tech',
});

const architectureFeatures = [
  {
    title: 'Tauri + Rust 后端',
    description: '基于 Rust 构建的高性能后端，提供原生级别的性能和内存安全',
    icon: Cpu,
    benefits: [
      '零成本抽象，极致性能',
      '内存安全，无数据竞争',
      '跨平台原生编译',
      '最小化资源占用'
    ]
  },
  {
    title: 'React + TypeScript 前端',
    description: '现代化的前端技术栈，提供流畅的用户体验和类型安全',
    icon: Code,
    benefits: [
      '组件化架构，易于维护',
      'TypeScript 类型安全',
      '响应式设计',
      '热重载开发体验'
    ]
  },
  {
    title: '本地数据存储',
    description: '数据完全存储在本地，保护用户隐私和数据安全',
    icon: Database,
    benefits: [
      'SQLite 轻量级数据库',
      '加密存储敏感信息',
      '离线工作能力',
      '快速数据访问'
    ]
  },
  {
    title: '多线程架构',
    description: '充分利用多核处理器，实现并发处理和响应式用户界面',
    icon: Server,
    benefits: [
      '异步任务处理',
      'UI 线程不阻塞',
      '并发网络请求',
      '后台任务调度'
    ]
  }
];

const performanceMetrics = [
  {
    metric: '启动时间',
    value: '< 2秒',
    description: '冷启动到可用状态',
    icon: Clock
  },
  {
    metric: '内存占用',
    value: '< 100MB',
    description: '运行时平均内存使用',
    icon: Cpu
  },
  {
    metric: '发布速度',
    value: '< 5秒',
    description: '单平台内容发布时间',
    icon: Zap
  },
  {
    metric: '并发处理',
    value: '10+ 平台',
    description: '同时处理的平台数量',
    icon: Globe
  }
];

const securityFeatures = [
  {
    title: '端到端加密',
    description: '所有敏感数据采用 AES-256 加密存储',
    icon: Lock
  },
  {
    title: 'OAuth 2.0 认证',
    description: '使用行业标准的 OAuth 2.0 进行平台授权',
    icon: Shield
  },
  {
    title: '本地数据处理',
    description: '所有数据处理在本地完成，不上传到第三方服务器',
    icon: Database
  },
  {
    title: '安全更新机制',
    description: '自动检测和安装安全更新，保持最新安全状态',
    icon: TrendingUp
  }
];

const compatibilityMatrix = [
  {
    platform: 'Windows',
    versions: ['Windows 10', 'Windows 11'],
    architectures: ['x64', 'ARM64'],
    status: 'full',
    notes: '完全支持所有功能'
  },
  {
    platform: 'macOS',
    versions: ['10.15+', '11.0+', '12.0+'],
    architectures: ['Intel', 'Apple Silicon'],
    status: 'full',
    notes: '原生支持 M1/M2 芯片'
  },
  {
    platform: 'Linux',
    versions: ['Ubuntu 18.04+', 'Debian 10+', 'Fedora 32+'],
    architectures: ['x64', 'ARM64'],
    status: 'full',
    notes: '支持主流发行版'
  }
];

const supportChannels = [
  {
    title: '技术文档',
    description: '详细的 API 文档和技术规范',
    icon: FileText,
    contact: 'docs.turbopush.com',
    availability: '24/7 在线'
  },
  {
    title: '邮件支持',
    description: '技术问题和 Bug 报告',
    icon: Mail,
    contact: 'tech-support@turbopush.com',
    availability: '工作日 24 小时内回复'
  },
  {
    title: '在线客服',
    description: '实时技术咨询和问题解答',
    icon: MessageCircle,
    contact: '在线聊天窗口',
    availability: '工作日 9:00-18:00'
  },
  {
    title: '电话支持',
    description: '紧急技术问题热线',
    icon: Phone,
    contact: '+86 400-123-4567',
    availability: '工作日 9:00-18:00'
  }
];

function TechnicalArchitecture() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            技术架构
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            TurboPush 采用现代化的技术栈，确保高性能、安全性和可扩展性
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {architectureFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <Typography variant="h3" className="text-xl mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="muted" className="text-gray-600 mb-4">
                      {feature.description}
                    </Typography>
                  </div>
                </div>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function PerformanceMetrics() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            性能优势
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            经过优化的架构设计，提供卓越的性能表现
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <Typography variant="h3" className="text-2xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </Typography>
                <Typography variant="h4" className="text-lg mb-2">
                  {metric.metric}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {metric.description}
                </Typography>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="text-center">
            <Typography variant="h3" className="mb-4 text-white">
              性能基准测试
            </Typography>
            <Typography variant="large" className="text-green-100 mb-6 max-w-2xl mx-auto">
              与同类产品相比，TurboPush 在启动速度、内存使用和发布效率方面均有显著优势
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Typography variant="h3" className="text-3xl font-bold text-white mb-2">
                  3x
                </Typography>
                <Typography variant="muted" className="text-green-100">
                  启动速度提升
                </Typography>
              </div>
              <div>
                <Typography variant="h3" className="text-3xl font-bold text-white mb-2">
                  50%
                </Typography>
                <Typography variant="muted" className="text-green-100">
                  内存占用减少
                </Typography>
              </div>
              <div>
                <Typography variant="h3" className="text-3xl font-bold text-white mb-2">
                  90%
                </Typography>
                <Typography variant="muted" className="text-green-100">
                  发布时间节省
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

function SecurityGuarantees() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            安全保障
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            多层安全防护，确保您的数据和隐私安全
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start">
                  <div className="p-3 bg-red-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <Typography variant="h3" className="text-xl mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="muted" className="text-gray-600">
                      {feature.description}
                    </Typography>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 p-8 bg-red-50 border-red-200">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <Typography variant="h3" className="mb-4">
              安全认证与合规
            </Typography>
            <Typography variant="large" className="text-gray-700 mb-6 max-w-2xl mx-auto">
              TurboPush 遵循国际安全标准，通过多项安全认证
            </Typography>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  ISO 27001
                </Badge>
                <Typography variant="small" className="text-gray-600">
                  信息安全管理
                </Typography>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  SOC 2 Type II
                </Badge>
                <Typography variant="small" className="text-gray-600">
                  安全控制审计
                </Typography>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  GDPR
                </Badge>
                <Typography variant="small" className="text-gray-600">
                  数据保护合规
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

function SystemCompatibility() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            系统兼容性
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            广泛的平台支持，确保在各种环境下稳定运行
          </Typography>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  操作系统
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  支持版本
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  架构
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  备注
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {compatibilityMatrix.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Monitor className="h-5 w-5 text-gray-400 mr-3" />
                      <Typography variant="small" className="font-medium text-gray-900">
                        {item.platform}
                      </Typography>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {item.versions.map((version, vIndex) => (
                        <Badge key={vIndex} variant="outline" className="mr-1 text-xs">
                          {version}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {item.architectures.map((arch, aIndex) => (
                        <Badge key={aIndex} variant="secondary" className="mr-1 text-xs">
                          {arch}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="default" className="text-xs">
                      完全支持
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small" className="text-gray-600">
                      {item.notes}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function TechnicalSupport() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            技术支持
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            专业的技术支持团队，为您提供全方位的技术服务
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="h3" className="text-xl mb-2">
                      {channel.title}
                    </Typography>
                    <Typography variant="muted" className="text-gray-600 mb-3">
                      {channel.description}
                    </Typography>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 mr-2">联系方式:</span>
                        <span className="text-blue-600">{channel.contact}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 mr-2">服务时间:</span>
                        <span className="text-gray-600">{channel.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  立即联系
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h3" className="mb-4 text-white">
              企业级技术支持
            </Typography>
            <Typography variant="large" className="text-purple-100 mb-6 max-w-2xl mx-auto">
              为企业用户提供专属的技术支持服务，包括定制开发、系统集成和专业培训
            </Typography>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                了解企业服务
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                预约技术咨询
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export default function TechPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <Container>
          <div className="text-center">
            <Typography variant="h1" className="mb-4 text-white">
              技术架构与优势
            </Typography>
            <Typography variant="large" className="text-blue-100 max-w-3xl mx-auto">
              深入了解 TurboPush 的技术实现、性能优势和安全保障
            </Typography>
          </div>
        </Container>
      </div>
      
      <TechnicalArchitecture />
      <PerformanceMetrics />
      <SecurityGuarantees />
      <SystemCompatibility />
      <TechnicalSupport />
    </div>
  );
}