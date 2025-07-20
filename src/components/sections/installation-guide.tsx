'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  FolderOpen,
  Play,
  CheckCircle,
  AlertCircle,
  Monitor,
  Settings,
  Shield,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InstallationStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ComponentType<{ className?: string }>;
  warning?: string;
}

const windowsSteps: InstallationStep[] = [
  {
    step: 1,
    title: '下载安装程序',
    description: '从官网下载 TurboPush Windows 安装程序',
    details: [
      '点击上方的"下载 TurboPush"按钮',
      '选择 Windows 版本（.exe 文件）',
      '等待下载完成（约 45MB）',
      '确认文件完整性',
    ],
    icon: Download,
  },
  {
    step: 2,
    title: '运行安装程序',
    description: '以管理员身份运行下载的安装文件',
    details: [
      '右键点击下载的 .exe 文件',
      '选择"以管理员身份运行"',
      '在 UAC 提示中点击"是"',
      '等待安装程序启动',
    ],
    icon: Shield,
    warning: '需要管理员权限来安装系统级组件',
  },
  {
    step: 3,
    title: '完成安装',
    description: '按照安装向导完成 TurboPush 的安装',
    details: [
      '阅读并接受许可协议',
      '选择安装位置（推荐默认）',
      '选择要创建的快捷方式',
      '点击"安装"开始安装过程',
    ],
    icon: Settings,
  },
  {
    step: 4,
    title: '启动应用',
    description: '安装完成后启动 TurboPush',
    details: [
      '点击"完成"按钮',
      '从桌面快捷方式启动应用',
      '或从开始菜单找到 TurboPush',
      '首次启动会进行初始化设置',
    ],
    icon: Play,
  },
];

const macosSteps: InstallationStep[] = [
  {
    step: 1,
    title: '下载 DMG 文件',
    description: '下载 TurboPush macOS 安装包',
    details: [
      '点击上方的"下载 TurboPush"按钮',
      '选择 macOS 版本（.dmg 文件）',
      '等待下载完成（约 39MB）',
      '在下载文件夹中找到 DMG 文件',
    ],
    icon: Download,
  },
  {
    step: 2,
    title: '挂载磁盘映像',
    description: '双击 DMG 文件挂载安装盘',
    details: [
      '双击下载的 .dmg 文件',
      '等待磁盘映像挂载',
      '在 Finder 中打开挂载的磁盘',
      '查看安装说明（如果有）',
    ],
    icon: FolderOpen,
  },
  {
    step: 3,
    title: '安装应用程序',
    description: '将 TurboPush 拖拽到应用程序文件夹',
    details: [
      '将 TurboPush.app 拖拽到 Applications 文件夹',
      '等待复制过程完成',
      '弹出磁盘映像',
      '删除下载的 DMG 文件（可选）',
    ],
    icon: Settings,
  },
  {
    step: 4,
    title: '首次启动',
    description: '从应用程序文件夹启动 TurboPush',
    details: [
      '在 Applications 文件夹中找到 TurboPush',
      '双击启动应用程序',
      '在安全提示中点击"打开"',
      '完成首次设置向导',
    ],
    icon: Play,
    warning: 'macOS 可能会显示安全警告，请在系统偏好设置中允许运行',
  },
];

const linuxSteps: InstallationStep[] = [
  {
    step: 1,
    title: '下载 AppImage',
    description: '下载 TurboPush Linux 可执行文件',
    details: [
      '点击上方的"下载 TurboPush"按钮',
      '选择 Linux 版本（.AppImage 文件）',
      '等待下载完成（约 42MB）',
      '保存到合适的位置',
    ],
    icon: Download,
  },
  {
    step: 2,
    title: '设置执行权限',
    description: '为 AppImage 文件添加执行权限',
    details: [
      '打开终端',
      '导航到下载文件的目录',
      '运行: chmod +x TurboPush-*.AppImage',
      '确认权限设置成功',
    ],
    icon: Shield,
  },
  {
    step: 3,
    title: '运行应用程序',
    description: '直接运行 AppImage 文件',
    details: [
      '双击 AppImage 文件运行',
      '或在终端中执行: ./TurboPush-*.AppImage',
      '首次运行会提取必要文件',
      '等待应用程序启动',
    ],
    icon: Play,
  },
  {
    step: 4,
    title: '创建桌面快捷方式',
    description: '可选：创建桌面快捷方式',
    details: [
      '右键点击桌面',
      '创建新的启动器/快捷方式',
      '设置命令为 AppImage 文件路径',
      '添加图标和名称',
    ],
    icon: Settings,
  },
];

const troubleshootingTips = [
  {
    issue: 'Windows Defender 阻止安装',
    solution: '在 Windows Defender 中添加例外，或临时禁用实时保护',
  },
  {
    issue: 'macOS 显示"无法验证开发者"',
    solution: '在系统偏好设置 > 安全性与隐私中点击"仍要打开"',
  },
  {
    issue: 'Linux 下无法执行 AppImage',
    solution: '确保已安装 FUSE 库：sudo apt install fuse',
  },
  {
    issue: '应用程序启动缓慢',
    solution: '首次启动需要初始化，后续启动会更快',
  },
  {
    issue: '网络连接问题',
    solution: '检查防火墙设置，确保允许 TurboPush 访问网络',
  },
];

export function InstallationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<
    'windows' | 'macos' | 'linux'
  >('windows');

  const getStepsForPlatform = () => {
    switch (selectedPlatform) {
      case 'windows':
        return windowsSteps;
      case 'macos':
        return macosSteps;
      case 'linux':
        return linuxSteps;
      default:
        return windowsSteps;
    }
  };

  const platformNames = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            安装指南
          </Typography>
          <Typography
            variant="large"
            className="text-gray-600 max-w-3xl mx-auto mb-6"
          >
            按照以下步骤在您的设备上安装 TurboPush，整个过程只需几分钟
          </Typography>

          {/* Chrome Browser Requirement */}
          <Card className="max-w-2xl mx-auto p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <Typography
                  variant="h4"
                  className="text-blue-900 font-semibold mb-2"
                >
                  重要提示：Chrome 浏览器依赖
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-800 leading-relaxed"
                >
                  TurboPush 的内容发布功能依赖 Chrome
                  浏览器内核。请确保您的系统已安装
                  <strong className="font-medium"> Google Chrome 浏览器</strong>
                  （版本 90 或更高）。 如果未安装，请先从{' '}
                  <a
                    href="https://www.google.com/chrome/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-900"
                  >
                    chrome.google.com
                  </a>{' '}
                  下载安装。
                </Typography>
              </div>
            </div>
          </Card>
        </div>

        {/* Platform Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(
              Object.keys(platformNames) as Array<keyof typeof platformNames>
            ).map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPlatform(platform)}
                className="mx-1"
              >
                <Monitor className="h-4 w-4 mr-2" />
                {platformNames[platform]}
              </Button>
            ))}
          </div>
        </div>

        {/* Installation Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getStepsForPlatform().map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step} className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-4 flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Icon className="h-5 w-5 text-gray-600 mr-2" />
                        <Typography variant="h4" className="text-lg">
                          {step.title}
                        </Typography>
                      </div>
                      <Typography
                        variant="muted"
                        className="text-gray-600 mb-3"
                      >
                        {step.description}
                      </Typography>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {step.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {step.warning && (
                    <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <Typography variant="small" className="text-yellow-800">
                        {step.warning}
                      </Typography>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Troubleshooting */}
        <Card className="p-8 bg-gray-50">
          <div className="text-center mb-6">
            <Typography variant="h3" className="mb-2">
              常见问题解决
            </Typography>
            <Typography variant="muted" className="text-gray-600">
              遇到安装问题？这里有一些常见解决方案
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {troubleshootingTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-white rounded-lg border"
              >
                <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <Typography
                    variant="small"
                    className="font-medium text-gray-900 mb-1"
                  >
                    {tip.issue}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {tip.solution}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Typography variant="small" className="text-gray-600 mb-3">
              仍然遇到问题？我们随时为您提供帮助
            </Typography>
            <div className="flex justify-center space-x-4">
              {/* <Button variant="outline" size="sm">
                查看帮助文档
              </Button> */}
              <Button variant="outline" size="sm">
                <Link href="#contact">联系技术支持</Link>
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
