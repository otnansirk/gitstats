import { LayoutTemplate } from 'lucide-react';
import type { ConfigState } from './types';
import { THEMES } from './constants';

interface ThemePresetsProps {
  config: ConfigState;
  handleThemeChange: (themeKey: keyof typeof THEMES) => void;
}

export function ThemePresets({ config, handleThemeChange }: ThemePresetsProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-2.5 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        </div>
        <h3 className="font-semibold text-base sm:text-lg text-white">Theme Presets</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`py-2 px-2.5 sm:py-2.5 px-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-300 ${
              config.theme === key 
                ? 'border-teal-500/50 bg-teal-500/10 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.15)]' 
                : 'border-white/5 bg-white/[0.03] text-slate-400 hover:bg-white/10 hover:text-slate-200 hover:border-white/10'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
