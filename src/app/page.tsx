export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">TurboPush</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            多平台内容发布和管理工具，让您的内容创作更高效
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/download"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              立即下载
            </a>
            <a
              href="/features"
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              了解功能
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
