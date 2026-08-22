import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-14 sm:py-20 md:py-24 border-b border-slate-800/60 bg-tech-grid">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-block rounded-md border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-mono text-cyan-400 mb-2.5">
              REPOSITORIES & ARCHITECTURES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Selected Agent Engineering Projects
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl">
              Independent open-source reference implementations exploring deterministic local AI, code verification, and sandboxing.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>29 / 29 Unit Tests Passing</span>
            </span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const isFlagship = project.id === 'nexus-agent';

            return (
              <div
                key={project.id}
                className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-300 p-5 sm:p-6 ${
                  isFlagship
                    ? 'border-cyan-500/50 bg-obsidian-850 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/20'
                    : 'border-slate-800/90 bg-obsidian-850/90 hover:border-slate-700 hover:bg-obsidian-800'
                }`}
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                      {project.role}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-obsidian-900 border border-slate-700/80 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                      {project.badge}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed font-mono">
                    {project.tagline}
                  </p>

                  {/* Concise Summary Block */}
                  <div className="p-3 rounded-lg bg-obsidian-900/80 border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed">
                    {project.summary}
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-5">
                    <div className="text-[10px] font-mono uppercase text-slate-500 mb-2">Key Highlights</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Tech & Action */}
                <div className="pt-4 border-t border-slate-800/80">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-obsidian-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{project.testCount}</span>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-obsidian-900 px-3 py-1.5 text-xs font-semibold text-white hover:border-cyan-500/60 hover:text-cyan-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>View Code</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
