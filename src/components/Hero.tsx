import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { ArrowDown, ShieldCheck, Cpu, Wrench, Zap } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeroProps {
  onOpenLab?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLab }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 border-b border-slate-800/60 bg-tech-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Avatar & Status Pill */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative mb-4">
            <img 
              src="/dax-avatar.png" 
              alt="DAX Avatar" 
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/40 object-cover"
            />
            <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-obsidian-900"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-obsidian-850 px-3 py-1 text-[11px] sm:text-xs font-mono text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{PROFILE.status}</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">Open Source</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2">
          {PROFILE.brand}
        </h1>
        <p className="text-base sm:text-xl font-mono text-cyan-400 mb-4 font-semibold tracking-wide">
          {PROFILE.title}
        </p>

        {/* Core Value Statement */}
        <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 mb-3 leading-relaxed">
          {PROFILE.tagline}
        </p>
        
        <p className="mx-auto max-w-xl text-xs sm:text-sm font-mono text-slate-400 italic mb-8 px-2">
          {PROFILE.vision}
        </p>

        {/* 3 Prominent Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 sm:mb-12">
          {/* CTA 1: Open DAX Agent */}
          <button
            onClick={() => onOpenLab ? onOpenLab() : (window.location.href = '/lab')}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-obsidian-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Zap className="h-4 w-4 fill-obsidian-950" />
            <span>Open DAX Agent</span>
          </button>

          {/* CTA 2: View GitHub */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-obsidian-850 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <GithubIcon className="h-4 w-4" />
            <span>View GitHub</span>
          </a>

          {/* CTA 3: Explore Projects */}
          <a
            href="#projects"
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-obsidian-900/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>Explore Projects</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        {/* The 3 Pillars Badge Row */}
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-800/90 bg-obsidian-850/80 p-4 sm:p-5 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
            
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-obsidian-900/60 border border-slate-800/60">
              <div className="p-1.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mt-0.5 shrink-0">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-xs text-cyan-300 font-mono">INTELLIGENCE</div>
                <div className="text-[11px] text-slate-400 leading-snug">Local multi-backend routing & task planning.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-obsidian-900/60 border border-slate-800/60">
              <div className="p-1.5 rounded-md bg-blue-950/60 border border-blue-500/30 text-blue-400 mt-0.5 shrink-0">
                <Wrench className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-xs text-blue-300 font-mono">TOOLS</div>
                <div className="text-[11px] text-slate-400 leading-snug">Sandboxed filesystem & OS input containment.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-obsidian-900/60 border border-slate-800/60">
              <div className="p-1.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 mt-0.5 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-xs text-emerald-300 font-mono">VERIFICATION</div>
                <div className="text-[11px] text-slate-400 leading-snug">AST parsing, dry-run diffs & SHA-256 logs.</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
