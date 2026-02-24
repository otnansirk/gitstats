import { Copy, Check, Terminal, Code2 } from 'lucide-react';
import type { CopiedStates } from './types';

interface EmbedSnippetsProps {
  embedUrl: string;
  markdownEmbed: string;
  htmlEmbed: string;
  copiedStates: CopiedStates;
  copyToClipboard: (text: string, type: keyof CopiedStates) => Promise<void>;
}

export function EmbedSnippets({ embedUrl, markdownEmbed, htmlEmbed, copiedStates, copyToClipboard }: EmbedSnippetsProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden relative group">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="border-b border-white/[0.08] px-4 sm:px-8 py-4 sm:py-5 bg-white/[0.01]">
        <h3 className="font-semibold text-base sm:text-lg flex items-center gap-3 sm:gap-4 text-white">
          <div className="p-2 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.15)]">
            <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
          </div>
          Embed in your README
        </h3>
      </div>
      
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs sm:text-sm font-semibold text-slate-300">Markdown</label>
            <button 
              onClick={() => copyToClipboard(markdownEmbed, 'md')}
              className="text-xs flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              {copiedStates.md ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {copiedStates.md ? 'Copied!' : 'Copy code'}
            </button>
          </div>
          <div className="relative group/code">
            <pre className="p-3 sm:p-5 bg-black/40 border border-white/[0.08] rounded-2xl text-xs sm:text-sm font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap break-all shadow-inner group-hover/code:border-white/15 transition-colors">
              {markdownEmbed}
            </pre>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs sm:text-sm font-semibold text-slate-300">HTML</label>
            <button 
              onClick={() => copyToClipboard(htmlEmbed, 'html')}
              className="text-xs flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              {copiedStates.html ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {copiedStates.html ? 'Copied!' : 'Copy code'}
            </button>
          </div>
          <div className="relative group/code">
            <pre className="p-3 sm:p-5 bg-black/40 border border-white/[0.08] rounded-2xl text-xs sm:text-sm font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap break-all shadow-inner group-hover/code:border-white/15 transition-colors">
              {htmlEmbed}
            </pre>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs sm:text-sm font-semibold text-slate-300">Direct URL</label>
            <button 
              onClick={() => copyToClipboard(embedUrl, 'url')}
              className="text-xs flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 transition-all"
            >
              {copiedStates.url ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {copiedStates.url ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
          <div className="relative group/code">
            <div className="p-3 sm:p-4 bg-black/40 border border-white/[0.08] rounded-2xl flex items-center gap-3 sm:gap-4 overflow-hidden shadow-inner group-hover/code:border-white/15 transition-colors">
              <div className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 shadow-sm">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-slate-400 truncate flex-1">
                {embedUrl}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
