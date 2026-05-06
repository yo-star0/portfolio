import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiGit,
  SiVite,
  SiHtml5,
  SiCss,
  SiJavascript
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <SiReact />, color: "#61DAFB" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
        { name: "CSS3", icon: <SiCss />, color: "#1572B6" },
        { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: <SiGit />, color: "#F05032" },
        { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
        { name: "Vite", icon: <SiVite />, color: "#646CFF" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50 w-full">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Skills & Expertise</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            フロントエンド開発のモダンな技術スタックに加え、AIツールや生成モデルを組み合わせた<br className="hidden md:block" />
            次世代のアプリケーション開発を得意としています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-100 pb-4">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors duration-300 group cursor-default">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary-600">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
