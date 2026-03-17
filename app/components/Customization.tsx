import { Settings2, Palette } from 'lucide-react';
import type { ConfigState, ColorSettingKey } from './types';

interface CustomizationProps {
  config: ConfigState;
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
  handleColorChange: (key: keyof ConfigState, value: string) => void;
}

export function Customization({ config, setConfig, handleColorChange }: CustomizationProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-2.5 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
          <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
        </div>
        <h3 className="font-semibold text-base sm:text-lg text-white">Customization</h3>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
          <label className="text-xs sm:text-sm font-medium text-slate-300 cursor-pointer pl-1">Show Icons</label>
          <button 
            onClick={() => setConfig(prev => ({ ...prev, showIcons: !prev.showIcons }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#040814] ${config.showIcons ? 'bg-teal-500' : 'bg-white/10'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showIcons ? 'translate-x-6 shadow-md' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
          <label className="text-xs sm:text-sm font-medium text-slate-300 cursor-pointer pl-1">Hide Border</label>
          <button 
            onClick={() => setConfig(prev => ({ ...prev, hideBorder: !prev.hideBorder }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#040814] ${config.hideBorder ? 'bg-teal-500' : 'bg-white/10'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.hideBorder ? 'translate-x-6 shadow-md' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="px-3 pt-2">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <label className="text-xs sm:text-sm font-medium text-slate-300">Border Radius</label>
            <span className="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">{config.borderRadius}px</span>
          </div>
          <input 
            type="range" 
            min="0" max="30" 
            value={config.borderRadius}
            onChange={(e) => setConfig(prev => ({ ...prev, borderRadius: parseInt(e.target.value) }))}
            className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-teal-400 border border-white/5 shadow-inner"
          />
        </div>

        <div className="pt-6 border-t border-white/[0.06] space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 px-1">
            <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
              <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Colors</span>
          </div>
          
          {[
            { label: 'Background', key: 'bgColor' as ColorSettingKey },
            { label: 'Title', key: 'titleColor' as ColorSettingKey },
            { label: 'Text', key: 'textColor' as ColorSettingKey },
            { label: 'Icons', key: 'iconColor' as ColorSettingKey },
          ].map((colorSetting) => (
            <div key={colorSetting.key} className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
              <label className="text-xs sm:text-sm text-slate-300">{colorSetting.label}</label>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-slate-400 font-mono uppercase bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">{config[colorSetting.key]}</span>
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <input 
                    type="color" 
                    value={config[colorSetting.key]}
                    onChange={(e) => handleColorChange(colorSetting.key, e.target.value)}
                    className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
