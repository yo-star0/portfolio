import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineChevronDown } from 'react-icons/hi';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden w-full">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:2s]"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:4s]"></div>

      <div className="container mx-auto px-6 z-10 text-center">
        <h2 className="text-primary-400 font-semibold tracking-wider uppercase mb-4 text-sm md:text-base">
          こんにちは、私のポートフォリオへようこそ
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-500">
            My Portfolio
          </span>
          <span className="block text-3xl md:text-5xl mt-2 text-slate-300">
            Frontend Engineer
          </span>
        </h1>
        <p className="mt-6 mb-10 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ユーザー体験を重視したモダンで美しいWebアプリケーションの開発を目指しています。<br className="hidden md:block" />
          React / TypeScript を中心に、常に新しい技術をキャッチアップしています。
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 hover:bg-primary-500/20 text-slate-300 hover:text-primary-400 rounded-full backdrop-blur-sm transition-all duration-300 border border-slate-700 hover:border-primary-500/50 shadow-lg">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 hover:bg-primary-500/20 text-slate-300 hover:text-primary-400 rounded-full backdrop-blur-sm transition-all duration-300 border border-slate-700 hover:border-primary-500/50 shadow-lg">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:contact@example.com" className="p-3 bg-slate-800/50 hover:bg-primary-500/20 text-slate-300 hover:text-primary-400 rounded-full backdrop-blur-sm transition-all duration-300 border border-slate-700 hover:border-primary-500/50 shadow-lg">
            <HiOutlineMail size={24} />
          </a>
        </div>

        <a href="#skills" className="inline-flex flex-col items-center text-slate-400 hover:text-primary-400 transition-colors duration-300 animate-bounce">
          <span className="text-sm uppercase tracking-widest mb-2 font-medium">Scroll Down</span>
          <HiOutlineChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
