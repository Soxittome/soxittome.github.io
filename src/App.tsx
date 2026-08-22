import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentLabPreview } from './components/AgentLabPreview';
import { AgentLabStandalone } from './components/AgentLabStandalone';
import { Projects } from './components/Projects';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { Principles } from './components/Principles';
import { TechnicalFocus } from './components/TechnicalFocus';
import { About } from './components/About';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentScenarioParam, setCurrentScenarioParam] = useState<string>('analyze-code');

  const syncRouteFromLocation = () => {
    const pathname = window.location.pathname.replace(/\/+$/, ''); // Strip trailing slash
    const searchParams = new URLSearchParams(window.location.search);
    const scenario = searchParams.get('scenario') || 'analyze-code';
    setCurrentScenarioParam(scenario);

    if (pathname === '/lab' || pathname.endsWith('/lab') || window.location.hash.startsWith('#/lab')) {
      setCurrentRoute('lab');
      document.title = 'DAX Agent Lab — AI & Agent Engineer';
    } else {
      setCurrentRoute('home');
      document.title = 'DAX — AI & Agent Engineer';
    }
  };

  useEffect(() => {
    syncRouteFromLocation();
    const handlePopState = () => syncRouteFromLocation();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, scenarioId?: string) => {
    let url = path;
    if (scenarioId) {
      url += `?scenario=${scenarioId}`;
    }
    window.history.pushState(null, '', url);
    syncRouteFromLocation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'lab') {
    return (
      <AgentLabStandalone
        onNavigateHome={() => navigateTo('/')}
        initialScenarioId={currentScenarioParam}
      />
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar onNavigateLab={() => navigateTo('/lab')} />
      <main className="flex-1">
        <Hero onOpenLab={() => navigateTo('/lab')} />
        <AgentLabPreview onOpenFullLab={(scId) => navigateTo('/lab', scId)} />
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
