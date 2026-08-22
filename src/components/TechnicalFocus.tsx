import React from 'react';
import { TECHNICAL_DOMAINS } from '../data/portfolioData';
import { Terminal, Database, Code, Shield, CheckCircle } from 'lucide-react';

const categoryIcons = [Terminal, Database, Code, Shield, CheckCircle];

export const TechnicalFocus: React.FC = () => {
  return (
    <section id="focus" className="py-16 md:py-20 border-b border-slate-800/60 bg-tech-grid">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block rounded-md border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            TECHNICAL FOCUS & CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Core Technical Areas & Engineering Stacks
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Grounded entirely in technologies implemented and tested across the repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TECHNICAL_DOMAINS.map((domain, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];

            return (
              <div
                key={domain.category}
                className="rounded-xl border border-slate-800/80 bg-obsidian-850 p-5"
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wide">
                    {domain.category}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {domain.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
