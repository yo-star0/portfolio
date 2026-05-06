import { Board } from './components/Board';
import { LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-500 text-white rounded-lg">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Task Flow</h1>
        </div>
        <div className="text-sm font-medium text-slate-500">
          React + TypeScript + Tailwind CSS + dnd-kit
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="h-full relative z-10 overflow-y-auto">
          <Board />
        </div>
      </main>
    </div>
  );
}

export default App;
