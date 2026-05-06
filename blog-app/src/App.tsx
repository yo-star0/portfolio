import { useState, useMemo } from 'react';
import { Calendar, ArrowRight, Tag, BookOpen, Search, ChevronLeft, Layout, Cpu, Palette } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  readTime: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    title: 'React 19 Server Componentsの実践的活用法',
    excerpt: 'サーバーコンポーネントを導入する際のベストプラクティスと、パフォーマンス向上の具体的な事例について解説します。',
    content: `
      React 19で導入されたServer Componentsは、フロントエンド開発のパラダイムを大きく変える可能性を秘めています。
      
      ## Server Componentsのメリット
      1. **バンドルサイズの削減**: クライアントに送信されるJavaScriptの量が劇的に減少します。
      2. **データ取得の最適化**: サーバー側でデータをフェッチするため、クライアントとサーバー間の往復回数を減らせます。
      3. **セキュリティの向上**: 秘密鍵やデータベースクエリを安全にサーバー側で保持できます。
      
      ## 実践的な活用事例
      大規模なECサイトにおいて、商品詳細ページをServer Components化することで、初期表示速度（LCP）を40%改善した事例があります。
      重要なのは、インタラクティブな要素（ボタンや入力フォーム）のみをClient Componentsに切り分け、大部分の静的コンテンツをサーバー側で処理することです。
    `,
    category: 'React',
    date: '2026.05.01',
    author: 'yo-star0',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Tailwind CSS v4の新機能と移行ガイド',
    excerpt: '次世代のTailwind CSSで導入されたViteプラグインや、よりシンプルになった設定ファイルの記述方法を学びましょう。',
    content: `
      Tailwind CSS v4は、これまでで最も大胆なアップデートの一つです。
      
      ## 主な変更点
      - **Zero-runtime CSS engine**: Rustで書かれた新しいエンジンにより、ビルド速度が最大10倍向上。
      - **CSS-first configuration**: tailwind.config.jsが不要になり、CSS内で直接設定が可能に。
      - **Native container queries**: コンテナクエリを標準サポート。
      
      ## 移行のステップ
      既存のプロジェクトからv4へ移行する際は、まず公式のアップグレードツールを使用することをお勧めします。
      設定ファイルの大部分が自動的にCSSの@themeブロックへと変換されます。
    `,
    category: 'CSS',
    date: '2026.04.18',
    author: 'yo-star0',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'フロントエンド開発における生成AIの組み込み',
    excerpt: 'ChatGPTやClaudeのAPIを利用し、ユーザーの入力を賢く補完するインテリジェントなUIの作り方を紹介します。',
    content: `
      AIは単なるチャットボットを超え、UIの一部として自然に溶け込む時代になっています。
      
      ## AI駆動型UI（Generative UI）
      ユーザーの意図を汲み取り、その場で最適なコンポーネントを生成・表示する手法です。
      例えば、タスク管理アプリで「今週の予定を要約して」と入力すると、AIが単なるテキストではなく、インタラクティブなカレンダー表示を返すような体験です。
      
      ## 実装のポイント
      Vercel AI SDKなどのツールを活用することで、ストリーミングレスポンスを簡単にReactのステートとして扱えるようになります。
    `,
    category: 'AI / Tech',
    date: '2026.04.05',
    author: 'yo-star0',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '7 min read'
  },
  {
    id: 4,
    title: 'Framer Motionで実現するマイクロインタラクション',
    excerpt: '心地よいアニメーションを追加することで、Webアプリケーションのユーザー体験を格段に向上させるテクニック集。',
    content: `
      アニメーションは単なる「飾り」ではありません。ユーザーに現在の状態を伝え、直感的な操作を促すための重要なフィードバックです。
      
      ## 効果的なインタラクション
      - **ホバー・タップの反応**: ボタンが少し沈む、色が微妙に変化する。
      - **ページ遷移の連続性**: 要素が自然に移動する（Shared Layout Animations）。
      - **スケルトン・ローディング**: データの読み込み中も「進捗」を感じさせる。
      
      Framer Motionを使えば、複雑なアニメーションも宣言的に記述できます。
    `,
    category: 'Design',
    date: '2026.03.22',
    author: 'yo-star0',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read'
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const categories = ['All', ...new Set(POSTS.map(p => p.category))];

  const filteredPosts = useMemo(() => {
    return POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-200 selection:text-primary-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedPost(null); setSelectedCategory('All'); setSearchQuery('');}}>
            <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-xl shadow-sm">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              DevLog
            </span>
          </div>
          <div className="hidden md:flex flex-grow max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="記事を検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
            />
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-600">
            <button onClick={() => setSelectedPost(null)} className={!selectedPost ? "text-primary-600" : "hover:text-primary-600"}>Home</button>
            <a href="#" className="hover:text-primary-600 transition-colors">Snippets</a>
            <a href="#" className="hover:text-primary-600 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {selectedPost ? (
        /* Post Detail View */
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="h-[400px] w-full relative">
            <img src={selectedPost.imageUrl} className="w-full h-full object-cover" alt={selectedPost.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  <ChevronLeft size={20} />
                  記事一覧に戻る
                </button>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">{selectedPost.category}</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full">{selectedPost.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{selectedPost.title}</h1>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-8 mb-8">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                YS
              </div>
              <div>
                <p className="font-bold text-slate-900">{selectedPost.author}</p>
                <p className="text-sm text-slate-500">{selectedPost.date} ・ AI & Frontend Engineer</p>
              </div>
            </div>
            <div className="prose prose-slate lg:prose-lg max-w-none">
              {selectedPost.content.split('\n').map((line, i) => {
                if (line.trim().startsWith('##')) {
                  return <h2 key={i} className="text-2xl font-bold text-slate-800 mt-8 mb-4">{line.replace('##', '').trim()}</h2>;
                }
                if (line.trim().startsWith('-')) {
                  return <li key={i} className="text-slate-600 ml-4 mb-2">{line.replace('-', '').trim()}</li>;
                }
                if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.')) {
                   return <div key={i} className="text-slate-600 mb-2 pl-4"><span className="font-bold mr-2">{line.split('.')[0]}.</span>{line.split('.').slice(1).join('.').trim()}</div>;
                }
                return line.trim() ? <p key={i} className="text-slate-600 leading-relaxed mb-6">{line.trim()}</p> : null;
              })}
            </div>
          </div>
        </article>
      ) : (
        /* Blog List View */
        <>
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-sm font-bold rounded-full mb-6">Latest Articles</span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                    Explore the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">Future of Web</span>
                  </h1>
                  <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                    Reactの最新動向からAI開発のベストプラクティスまで、次世代のフロントエンドエンジニアに必要な技術情報を発信。
                  </p>
                </div>
                <div className="flex-1 hidden md:grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
                    <Cpu className="text-blue-500 mb-4" size={32} />
                    <h3 className="font-bold text-slate-800">AI Logic</h3>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-3xl mt-8 flex flex-col items-center justify-center text-center">
                    <Layout className="text-purple-500 mb-4" size={32} />
                    <h3 className="font-bold text-slate-800">React 19</h3>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
                    <Palette className="text-pink-500 mb-4" size={32} />
                    <h3 className="font-bold text-slate-800">UI Design</h3>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-3xl mt-8 flex flex-col items-center justify-center text-center">
                    <BookOpen className="text-orange-500 mb-4" size={32} />
                    <h3 className="font-bold text-slate-800">Tutorials</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold text-slate-900">Articles</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 text-sm font-bold rounded-full transition-all duration-300 border ${
                      selectedCategory === cat 
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-primary-400 hover:text-primary-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2"
                  >
                    <div className="relative h-72 overflow-hidden bg-slate-100">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-primary-700 text-xs font-bold rounded-full shadow-md flex items-center gap-1.5">
                          <Tag size={14} />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary-400" />
                          <time>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-primary-400" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                            YS
                          </div>
                          <span className="text-sm font-bold text-slate-700">{post.author}</span>
                        </div>
                        <span className="p-3 bg-slate-50 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                          <ArrowRight size={20} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold">検索条件に一致する記事が見つかりませんでした。</p>
              </div>
            )}
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-16 mt-12 text-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <BookOpen size={24} className="text-primary-400" />
              <span className="text-2xl font-black">DevLog</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
              フロントエンド技術の限界に挑戦し、知見を共有する技術プラットフォーム。
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-sm mb-2">
              &copy; {new Date().getFullYear()} yo-star0. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end gap-6 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
