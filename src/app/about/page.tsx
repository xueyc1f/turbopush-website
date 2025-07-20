import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Mail, 
  Download,
  Globe,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'TurboPush 关于我们 - 团队介绍与公司愿景',
  description: '了解 TurboPush 团队的使命愿景，我们致力于为内容创作者提供最高效的多平台发布解决方案。探索商务合作机会。',
  keywords: ['TurboPush团队', '关于我们', '公司介绍', '团队愿景', '商务合作', '企业文化'],
  canonicalUrl: 'https://turbopush.com/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">关于 TurboPush</h1>
            <p className="text-xl text-muted-foreground mb-8">
              我们致力于为内容创作者和企业提供最高效、最智能的多平台内容发布解决方案，
              让每一个创意都能触达更广阔的受众。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                全球服务
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                高效发布
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                安全可靠
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Vision & Mission */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>我们的使命</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  简化内容创作者的工作流程，通过智能化的多平台发布工具，
                  让优质内容能够高效地触达目标受众，释放创作者的更多时间专注于内容本身。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>我们的愿景</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  成为全球领先的内容分发平台，构建一个连接创作者与受众的智能生态系统，
                  推动数字内容产业的创新发展。
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">核心价值观</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              这些价值观指导着我们的每一个决策，塑造着我们的产品和文化
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">用户至上</h3>
                <p className="text-sm text-muted-foreground">
                  始终以用户需求为中心，持续优化产品体验
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">持续创新</h3>
                <p className="text-sm text-muted-foreground">
                  拥抱新技术，不断探索更好的解决方案
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">追求卓越</h3>
                <p className="text-sm text-muted-foreground">
                  对产品质量和服务标准的不懈追求
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">我们的团队</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              由经验丰富的技术专家和产品设计师组成的团队，致力于打造最优秀的产品
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">张</span>
                </div>
                <h3 className="font-semibold mb-1">张明</h3>
                <p className="text-sm text-muted-foreground mb-3">创始人 & CEO</p>
                <p className="text-sm text-muted-foreground">
                  10年互联网产品经验，曾任职于知名科技公司，专注于用户体验和产品创新
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">李</span>
                </div>
                <h3 className="font-semibold mb-1">李华</h3>
                <p className="text-sm text-muted-foreground mb-3">技术总监</p>
                <p className="text-sm text-muted-foreground">
                  资深全栈工程师，在分布式系统和API集成方面有丰富经验
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">王</span>
                </div>
                <h3 className="font-semibold mb-1">王丽</h3>
                <p className="text-sm text-muted-foreground mb-3">产品设计总监</p>
                <p className="text-sm text-muted-foreground">
                  专业的UI/UX设计师，致力于创造直观易用的产品界面
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Business Cooperation */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">商务合作</h2>
              <p className="text-muted-foreground">
                我们欢迎各种形式的合作，共同推动内容创作生态的发展
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>合作机会</CardTitle>
                  <CardDescription>
                    我们正在寻找以下合作伙伴
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>社交媒体平台API集成</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>内容创作工具和服务提供商</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>企业级客户和渠道合作伙伴</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>技术解决方案集成商</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>媒体资源</CardTitle>
                  <CardDescription>
                    为媒体和合作伙伴提供的品牌资料
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      品牌Logo资源包
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      产品截图素材
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      公司介绍资料
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      技术白皮书
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">联系我们的商务团队</h3>
                <p className="text-muted-foreground mb-6">
                  如果您有合作意向或需要更多信息，请联系我们的商务团队
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    business@turbopush.com
                  </Button>
                  <Button variant="outline">
                    商务合作咨询
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
