import { StatsCard } from './StatsCard';
import type { UserStats, ConfigState } from './types';

interface HeroProps {
  username: string;
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  config: ConfigState;
}

export function Hero({ username, searchInput, setSearchInput, handleSearch, stats, loading, error, config }: HeroProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] sm:h-[300px] bg-teal-500/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"></div>
      
      <h1 className="relative text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white">
        Dynamic GitHub Stats for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-400 to-orange-400">README</span>
      </h1>
      <p className="relative text-base sm:text-lg text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
        Generate highly customizable, instantly updating GitHub statistics cards. Easy to embed, fast to load, and beautiful by default.
      </p>
      
      <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full">
        <div className="relative flex-1 group">
          <span className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 sm:pl-4 pointer-events-none text-slate-500 font-mono text-xs sm:text-sm group-focus-within:text-teal-400 transition-colors z-10 pt-1"
               style={{ fontSize: '0.875rem' }}>
            github.com/
          </span>
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="username"
            className="w-full pl-[105px] sm:pl-[110px] pr-3 sm:pr-4 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-inner focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-600 font-medium text-sm"
          />
        </div>
        <button type="submit" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 border border-teal-400/30 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all flex items-center gap-2 text-sm sm:text-base">
          Generate
        </button>
      </form>

      <div className="lg:hidden mt-6">
        <div className="bg-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="w-full max-w-[400px] relative z-10 transition-transform hover:scale-[1.02] duration-500">
            <StatsCard stats={stats} loading={loading} error={error} config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
