import { Github } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="border-b border-white/[0.08] bg-[#040814]/40 backdrop-blur-2xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-2xl tracking-tight text-white">GitStats<span className="text-teal-400">Embed</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 sm:px-5 py-2 rounded-xl transition-all backdrop-blur-md shadow-lg shadow-black/20">
              Star on GitHub
            </a>
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-2 rounded-xl transition-all backdrop-blur-md shadow-lg shadow-black/20">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
