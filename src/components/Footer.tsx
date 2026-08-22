import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-obsidian-950 py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Brand Col */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-obsidian-850 text-cyan-400 font-mono font-bold text-xs">
              DAX
            </div>
            <div>
              <div className="font-bold text-white text-sm">{PROFILE.brand}</div>
              <div className="text-xs font-mono text-cyan-400">{PROFILE.title}</div>
            </div>
          </div>

          {/* Core Links */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#principles" className="hover:text-cyan-400 transition-colors">Principles</a>
            <a href="#focus" className="hover:text-cyan-400 transition-colors">Focus</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 bg-obsidian-850 text-slate-300 hover:border-slate-600 hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-blue-600/30 bg-blue-950/20 text-blue-400 hover:border-blue-400 hover:text-blue-300 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} {PROFILE.brand} • {PROFILE.series}. Open Source under MIT License.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Local-First & Safety Grounded</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
