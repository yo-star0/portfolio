import { FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa';

const Blog = () => {
  const posts = [
    {
      title: "Reactと生成AIを組み合わせた次世代タスク管理アプリの開発",
      date: "2026.05.01",
      category: "AI & Tech",
      excerpt: "最近注目されている大規模言語モデル(LLM)をReactアプリケーションに統合し、ユーザーのタスクを自動で整理・提案するAIアシスタント機能の実装方法について解説します。",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Next.js App Routerでのパフォーマンス最適化",
      date: "2026.04.15",
      category: "Frontend",
      excerpt: "Next.jsのApp Router環境において、Server ComponentsとClient Componentsを適切に使い分け、Core Web Vitalsを劇的に改善するための実践的なテクニックを紹介します。",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Framer Motionで作る心地よいUIインタラクション",
      date: "2026.03.28",
      category: "Design",
      excerpt: "React向けの強力なアニメーションライブラリであるFramer Motionを使用して、ユーザーの操作に対する直感的で美しいフィードバックを実装する手法について考察します。",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-slate-50 w-full border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Blog / Articles</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            技術的な知見や日々の開発の学び、AIを活用した新しいアプローチについて<br className="hidden md:block" />
            定期的にブログ記事として発信しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-bold rounded-full shadow-sm flex items-center">
                    <FaTag className="mr-1.5" size={10} />
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-500 mb-3">
                  <FaCalendarAlt className="mr-1.5" />
                  <time>{post.date}</time>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <a
                  href={post.link}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mt-auto"
                >
                  Read More
                  <FaArrowRight size={12} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#blog" className="inline-flex items-center justify-center px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:text-primary-600 hover:border-slate-300 transition-all duration-300 shadow-sm group">
            記事一覧を見る
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
