
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 w-full">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-xs mt-2 text-slate-500">
          Built with React, Vite & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
