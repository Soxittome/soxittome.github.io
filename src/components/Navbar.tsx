import React, { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { ExternalLink, Menu, X, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  onNavigateLab?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateLab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Principles', href: '#principles' },
    { name: 'Focus', href: '#focus' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-obsidian-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Monogram & Title */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="DAX Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-obsidian-850 text-cyan-400 font-mono font-bold text-sm transition-all group-hover:border-cyan-400 group-hover:shadow-md group-hover:shadow-cyan-950/40">
            DAX
          </div>
          <div>
            <div className="font-semibold text-slate-100 text-sm tracking-wide group-hover:text-cyan-300 transition-colors">
              {PROFILE.brand}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {PROFILE.title}
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300" aria-label="Main Navigation">
          {/* Direct DAX Agent Link */}
          <button
            onClick={() => onNavigateLab ? onNavigateLab() : (window.location.href = '/lab')}
            className="flex items-center gap-1.5 text-cyan-400 font-bold hover:text-cyan-300 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            <Zap className="h-3.5 w-3.5 fill-cyan-400" />
            <span>DAX Agent</span>
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-obsidian-850 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600/40 bg-blue-950/30 px-3 py-1.5 text-xs font-medium text-blue-300 hover:border-blue-400 hover:bg-blue-900/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-slate-800 bg-obsidian-850 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-obsidian-900 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateLab) onNavigateLab();
              else window.location.href = '/lab';
            }}
            className="w-full text-left py-2 px-3 rounded-md text-sm font-mono text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            <span>DAX Agent (Dedicated Experience)</span>
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md text-sm font-mono text-slate-200 hover:bg-obsidian-800 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
