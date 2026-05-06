import { Calendar, User, ArrowRight, Tag, BookOpen, Search } from 'lucide-react';

function App() {
  const posts = [
    {
      id: 1,
      title: 'React 19 Server Componentsの実践的活用法',
      excerpt: 'サーバーコンポーネントを導入する際のベストプラクティスと、パフォーマンス向上の具体的な事例について解説します。',
      category: 'React',
      date: '2026.05.01',
      author: 'yo-star0',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Tailwind CSS v4の新機能と移行ガイド',
      excerpt: '次世代のTailwind CSSで導入されたViteプラグインや、よりシンプルになった設定ファイルの記述方法を学びましょう。',
      category: 'CSS',
      date: '2026.04.18',
      author: 'yo-star0',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'フロントエンド開発における生成AIの組み込み',
      excerpt: 'ChatGPTやClaudeのAPIを利用し、ユーザーの入力を賢く補完するインテリジェントなUIの作り方を紹介します。',
      category: 'AI / Tech',
      date: '2026.04.05',
      author: 'yo-star0',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Framer Motionで実現するマイクロインタラクション',
      excerpt: '心地よいアニメーションを追加することで、Webアプリケーションのユーザー体験を格段に向上させるテクニック集。',
      category: 'Design',
      date: '2026.03.22',
      author: 'yo-star0',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-200 selection:text-primary-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              DevLog
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-primary-600">Home</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Articles</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Snippets</a>
            <a href="#" className="hover:text-primary-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-primary-600 transition-colors"><Search size={20} /></button>
            <a href="https://github.com/yo-star0" className="text-sm font-medium hover:text-slate-900 transition-colors">GitHub</a>
            <a href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">Twitter</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">Discoveries</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            フロントエンドの最新技術、AIの活用事例、そして日々の開発で得た知見を記録する技術ブログ。
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-colors shadow-lg shadow-slate-200">
              最新の記事を読む
            </button>
            <button className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-full font-medium transition-colors">
              ニュースレター登録
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Latest Posts</h2>
          <div className="flex gap-2">
            {['All', 'React', 'CSS', 'AI / Tech'].map(cat => (
              <button key={cat} className="px-4 py-1.5 text-sm font-medium rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary-700 text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                    <Tag size={12} />
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <a href="#" className="inline-flex items-center text-sm font-bold text-primary-600 hover:text-primary-700">
                  Read Article
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:text-primary-600 transition-all shadow-sm">
            Load More Posts
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0 text-slate-900">
            <BookOpen size={20} className="text-primary-500" />
            <span className="font-bold">DevLog</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} yo-star0. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
