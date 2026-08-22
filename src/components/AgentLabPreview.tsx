import React from 'react';
import { LAB_SCENARIOS } from '../data/labData';
import { Zap, ArrowRight, Terminal, Cpu, FileCode2, Layers, ShieldCheck } from 'lucide-react';

interface AgentLabPreviewProps {
  onOpenFullLab: (scenarioId?: string) => void;
}

export const AgentLabPreview: React.FC<AgentLabPreviewProps> = ({ onOpenFullLab }) => {
  const getScenarioIcon = (icon: string) => {
    switch (icon) {
      case 'FileCode2': return <FileCode2 className="h-4 w-4" />;
      case 'Layers': return <Layers className="h-4 w-4" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <section id="agent-lab" className="relative py-16 sm:py-20 border-b border-slate-800/60 bg-obsidian-950 scroll-mt-16">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE AGENT EXPERIENCE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            DAX Agent
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 mb-5">
            A local-first AI agent experience for planning, tools, execution, and verification.
          </p>

          {/* Action Button */}
          <button
            onClick={() => onOpenFullLab()}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-3 text-sm font-bold text-obsidian-950 transition-all shadow-xl shadow-cyan-950/50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Zap className="h-4 w-4 fill-obsidian-950" />
            <span>Open DAX Agent</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 6 Quick Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {LAB_SCENARIOS.slice(0, 6).map(sc => (
            <button
              key={sc.id}
              onClick={() => onOpenFullLab(sc.id)}
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-800 bg-obsidian-900/80 hover:border-cyan-500/50 hover:bg-obsidian-850 transition-all text-left group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                    {getScenarioIcon(sc.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {sc.category}
                  </span>
                </div>
                <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors mb-1">
                  {sc.title}
                </div>
                <div className="text-xs text-slate-400 leading-snug line-clamp-2">
                  {sc.shortDesc}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-850 mt-3 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Run Agent Simulation</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Mini Preview Box */}
        <div className="rounded-xl border border-slate-800 bg-obsidian-900 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800 text-cyan-400 shrink-0">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>Autonomous Agent Pipeline</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Goal ──► Plan ──► Memory ──► Tools ──► Execute ──► Verify ──► Result
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenFullLab()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-mono font-semibold px-4 py-2 rounded-lg border border-slate-700 bg-obsidian-850 text-slate-200 hover:border-cyan-500 hover:text-cyan-300 transition-all shrink-0"
          >
            <span>Open DAX Agent</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
