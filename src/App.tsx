import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Blog />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
