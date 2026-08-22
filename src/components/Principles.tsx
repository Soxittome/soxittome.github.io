import React from 'react';
import { PRINCIPLES } from '../data/portfolioData';
import { Cpu, CheckCircle2, ShieldCheck, Layers, Code2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Code2
};

export const Principles: React.FC = () => {
  return (
    <section id="principles" className="py-16 md:py-20 border-b border-slate-800/60 bg-obsidian-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block rounded-md border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            ENGINEERING PHILOSOPHY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Five Core Principles Guiding Our Agent Systems
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Deterministic software patterns designed to make autonomous AI systems predictable and reliable.
          </p>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRINCIPLES.map((p, idx) => {
            const Icon = iconMap[p.iconName] || Cpu;

            return (
              <div
                key={p.title}
                className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-obsidian-850 p-5 hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">0{idx + 1}</span>
                    <div className="p-1.5 rounded-lg bg-obsidian-900 border border-slate-800 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 font-mono">
                    {p.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mb-3">
                    {p.tagline}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
