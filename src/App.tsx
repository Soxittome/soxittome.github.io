import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentLab } from './components/AgentLab';
import { Projects } from './components/Projects';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { Principles } from './components/Principles';
import { TechnicalFocus } from './components/TechnicalFocus';
import { About } from './components/About';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AgentLab />
        <Projects />
        <ArchitectureFlow />
        <Principles />
        <TechnicalFocus />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default App;
