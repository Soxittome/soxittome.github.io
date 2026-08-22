import React from 'react';
import { PROFILE } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-slate-800/60 bg-obsidian-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-center mb-10">
          <div className="inline-block rounded-md border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            ABOUT & MOTIVATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why I Build Local-First Agent Systems
          </h2>
        </div>

        {/* Narrative Box */}
        <div className="rounded-2xl border border-slate-800 bg-obsidian-850 p-6 sm:p-10 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            Generative AI has evolved past casual chatbots. When building software agents that interact with files, terminals, and operating systems, <strong>unconstrained text generation is not enough</strong>.
          </p>

          <p>
            I build <strong>DAX Agent Systems</strong> with a focus on local-first architectures. Running models locally (via Ollama, vLLM, or LM Studio) ensures that private code and proprietary workflows never leave the host machine, while avoiding recurring API rate limits and unexpected vendor changes.
          </p>

          <p>
            Equally important is <strong>deterministic verification</strong>. Instead of blindly trusting model outputs, our tooling validates every code change with Abstract Syntax Tree (AST) parsing, simulates dry-run diffs, isolates workspace directories, and logs OS interactions to cryptographic SHA-256 audit trails.
          </p>

          {/* Call to Connect */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/dax-avatar.png" 
                alt="DAX" 
                className="h-11 w-11 rounded-full border border-cyan-500/40"
              />
              <div>
                <div className="font-bold text-sm text-white">{PROFILE.brand}</div>
                <div className="text-xs font-mono text-cyan-400">{PROFILE.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-obsidian-900 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-all"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600/50 bg-blue-950/30 px-4 py-2 text-xs font-medium text-blue-300 hover:border-blue-400 hover:bg-blue-900/40 transition-all"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
