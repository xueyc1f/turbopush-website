'use client';

import { Monitor, HardDrive, Wifi, Shield, Zap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SystemRequirement {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  requirements: {
    minimum: string[];
    recommended: string[];
  };
}

const systemRequirements: SystemRequirement[] = [
  {
    category: 'Windows',
    icon: Monitor,
    requirements: {
      minimum: [
        'Windows 10 (64位)',
        '4GB RAM',
        '500MB 可用磁盘空间',
        '网络连接',
        'DirectX 11 兼容显卡'
      ],
      recommended: [
        'Windows 11 (64位)',
        '8GB RAM 或更多',
        '1GB 可用磁盘空间',
        '稳定的宽带连接',
        '独立显卡'
      ]
    }
  },
  {
    category: 'macOS',
    icon: Monitor,
    requirements: {
      minimum: [
        'macOS 10.15 Catalina',
        '4GB RAM',
        '500MB 可用磁盘空间',
        '网络连接',
        'Intel 或 Apple Silicon 处理器'
      ],
      recommended: [
        'macOS 12 Monterey 或更高',
        '8GB RAM 或更多',
        '1GB 可用磁盘空间',
        '稳定的宽带连接',
        'Apple Silicon (M1/M2) 处理器'
      ]
    }
  },
  {
    category: 'Linux',
    icon: Monitor,
    requirements: {
      minimum: [
        'Ubuntu 18.04 LTS 或同等发行版',
        '4GB RAM',
        '500MB 可用磁盘空间',
        '网络连接',
        'X11 或 Wayland 显示服务器'
      ],
      recommended: [
        'Ubuntu 22.04 LTS 或更新版本',
        '8GB RAM 或更多',
        '1GB 可用磁盘空间',
        '稳定的宽带连接',
        'GNOME 或 KDE 桌面环境'
      ]
    }
  }
];

const additionalRequirements = [
  {
    icon: Wifi,
    title: '网络要求',
    description: '稳定的互联网连接用于平台认证和内容发布',
    details: [
      '最低带宽：1 Mbps 上传',
      '推荐带宽：5 Mbps 或更高',
      '支持 HTTPS 连接',
      '防火墙端口：443, 80'
    ]
  },
  {
    icon: Shield,
    title: '安全要求',
    description: '确保系统安全和数据保护',
    details: [
      '启用系统防火墙',
      '最新的安全更新',
      '支持 TLS 1.2 或更高',
      '管理员权限（安装时）'
    ]
  },
  {
    icon: HardDrive,
    title: '存储要求',
    description: '本地数据存储和缓存需求',
    details: [
      '应用程序：~50MB',
      '用户数据：~100MB',
      '媒体缓存：~200MB',
      '日志文件：~50MB'
    ]
  }
];

export function SystemRequirements() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            系统要求
          </Typography>
          <Typography variant="large" className="text-gray-600 max-w-3xl mx-auto">
            确保您的设备满足以下要求，以获得最佳的 TurboPush 使用体验
          </Typography>
        </div>

        {/* Platform Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {systemRequirements.map((platform) => {
            const Icon = platform.icon;
            return (
              <Card key={platform.category} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Typography variant="h3" className="text-xl">
                    {platform.category}
                  </Typography>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="text-xs">
                        最低要求
                      </Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {platform.requirements.minimum.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Badge variant="default" className="text-xs">
                        推荐配置
                      </Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {platform.requirements.recommended.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalRequirements.map((requirement, index) => {
            const Icon = requirement.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Icon className="h-5 w-5 text-green-600" />
                  </div>
                  <Typography variant="h4" className="text-lg">
                    {requirement.title}
                  </Typography>
                </div>
                <Typography variant="muted" className="text-gray-600 mb-3 text-sm">
                  {requirement.description}
                </Typography>
                <ul className="text-sm text-gray-600 space-y-1">
                  {requirement.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Performance Note */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Typography variant="h4" className="text-lg mb-2">
                性能优化建议
              </Typography>
              <Typography variant="muted" className="text-gray-700 mb-3">
                为了获得最佳性能，我们建议：
              </Typography>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  关闭不必要的后台应用程序
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  确保有足够的可用内存
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  使用 SSD 硬盘可提升启动速度
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  保持系统和驱动程序更新
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}