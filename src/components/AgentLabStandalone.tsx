import React, { useState, useEffect } from 'react';
import { LAB_SCENARIOS } from '../data/labData';
import type { LabScenario, LabStage } from '../data/labData';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  FileCode2, 
  Layers, 
  GitPullRequest, 
  Terminal, 
  ExternalLink,
  Copy,
  Check,
  Zap,
  Lock,
  Share2,
  ArrowLeft,
  Activity
} from 'lucide-react';

interface AgentLabStandaloneProps {
  onNavigateHome: () => void;
  initialScenarioId?: string;
}

export const AgentLabStandalone: React.FC<AgentLabStandaloneProps> = ({ onNavigateHome, initialScenarioId }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenarioId || 'analyze-code');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  // Sync with initial scenario or URL
  useEffect(() => {
    if (initialScenarioId && LAB_SCENARIOS.some(s => s.id === initialScenarioId)) {
      setSelectedScenarioId(initialScenarioId);
      setCurrentStageIndex(0);
    }
  }, [initialScenarioId]);

  const currentScenario: LabScenario = LAB_SCENARIOS.find(s => s.id === selectedScenarioId) || LAB_SCENARIOS[0];
  const currentStage: LabStage = currentScenario.stages[currentStageIndex];

  // Auto-play effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStageIndex(prev => {
          if (prev < currentScenario.stages.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1600);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentScenario]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStageIndex(0);
    setIsPlaying(false);
    // Update URL query parameter without full page reload
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', `/lab?scenario=${id}`);
    }
  };

  const handleNext = () => {
    if (currentStageIndex < currentScenario.stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (currentStageIndex === currentScenario.stages.length - 1) {
      setCurrentStageIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/lab?scenario=${selectedScenarioId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCode = () => {
    if (currentStage.codeSnippet) {
      navigator.clipboard.writeText(currentStage.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const getScenarioIcon = (icon: string) => {
    switch (icon) {
      case 'FileCode2': return <FileCode2 className="h-4 w-4" />;
      case 'GitPullRequest': return <GitPullRequest className="h-4 w-4" />;
      case 'Layers': return <Layers className="h-4 w-4" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  // Cumulative console logs up to current stage
  const cumulativeLogs = currentScenario.stages
    .slice(0, currentStageIndex + 1)
    .flatMap(st => st.consoleLogs);

  const progressPercent = ((currentStageIndex + 1) / currentScenario.stages.length) * 100;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Top Standalone Header Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-obsidian-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-obsidian-850 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-slate-700 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Portfolio Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-700">/</span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">DAX Agent Lab v2</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-3 py-1.5 text-xs font-mono font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Scenario'}</span>
            </button>

            <a
              href="https://github.com/dax0056"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-obsidian-850 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-all"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>

        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Title Section */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>CLIENT-SIDE SIMULATION · SAFE DEMO</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              DAX Agent Lab
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 mb-3">
              See how an AI agent plans, acts, and verifies.
            </p>
            
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-slate-400 bg-obsidian-900 border border-slate-800 rounded-lg px-3 py-1">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>Direct Link Active: <code className="text-cyan-400 font-bold">/lab?scenario={selectedScenarioId}</code></span>
            </div>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {LAB_SCENARIOS.map(sc => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`flex flex-col items-start p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected 
                      ? 'bg-obsidian-850 border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/40' 
                      : 'bg-obsidian-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-obsidian-850/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 w-full">
                    <div className={`p-1.5 rounded-md ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      {getScenarioIcon(sc.icon)}
                    </div>
                    <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {sc.category}
                    </span>
                  </div>
                  <div className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {sc.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {sc.shortDesc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Lab Canvas */}
          <div className="rounded-2xl border border-slate-800 bg-obsidian-900/90 shadow-2xl overflow-hidden backdrop-blur-sm mb-12">
            
            {/* Top Control Bar & Scenario Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-obsidian-850">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                  Active Simulation: <span className="text-cyan-400">{currentScenario.title}</span>
                </span>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStageIndex === 0}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700 bg-obsidian-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono flex items-center gap-1"
                  title="Previous Stage"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  onClick={handlePlayToggle}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                    isPlaying 
                      ? 'bg-amber-500 text-obsidian-950 hover:bg-amber-400' 
                      : 'bg-cyan-500 text-obsidian-950 hover:bg-cyan-400'
                  }`}
                >
                  <Play className={`h-3.5 w-3.5 ${isPlaying ? 'fill-obsidian-950' : ''}`} />
                  <span>{isPlaying ? 'Pause' : (currentStageIndex === currentScenario.stages.length - 1 ? 'Replay' : 'Run Simulation')}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStageIndex === currentScenario.stages.length - 1}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700 bg-obsidian-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono flex items-center gap-1"
                  title="Next Stage"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 sm:p-1.5 rounded-lg border border-slate-800 bg-obsidian-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs"
                  title="Reset Simulation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar Indicator */}
            <div className="w-full bg-slate-900 h-1 relative">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Interactive Pipeline Step Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-obsidian-950/60 overflow-x-auto scrollbar-none">
              <div className="flex items-center justify-between min-w-[660px] gap-2">
                {currentScenario.stages.map((stage, idx) => {
                  const isCurrent = idx === currentStageIndex;
                  const isPassed = idx < currentStageIndex;
                  return (
                    <React.Fragment key={stage.id}>
                      <button
                        onClick={() => { setCurrentStageIndex(idx); setIsPlaying(false); }}
                        className={`flex flex-col items-center group focus-visible:outline-none ${
                          isCurrent 
                            ? 'scale-105 transition-transform' 
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-full border text-xs font-mono font-bold transition-all shadow-md ${
                          isCurrent 
                            ? 'border-cyan-400 bg-cyan-950 text-cyan-300 ring-4 ring-cyan-500/20' 
                            : isPassed 
                              ? 'border-emerald-500 bg-emerald-950/60 text-emerald-400' 
                              : 'border-slate-800 bg-obsidian-850 text-slate-500'
                        }`}>
                          {isPassed ? <Check className="h-4 w-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-mono mt-1.5 tracking-tight font-semibold text-center ${
                          isCurrent ? 'text-cyan-300 font-bold' : isPassed ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          {stage.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {stage.duration}
                        </span>
                      </button>

                      {/* Connecting line */}
                      {idx < currentScenario.stages.length - 1 && (
                        <div className="flex-1 h-0.5 relative mx-1">
                          <div className="h-full bg-slate-800 w-full rounded-full" />
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 absolute top-0 left-0 transition-all duration-300 rounded-full"
                            style={{ width: isPassed ? '100%' : isCurrent ? '50%' : '0%' }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Split Content: Stage Info + Live Agent Console & Payloads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Stage Explanation & Result Summary */}
              <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
                <div>
                  
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      Stage {currentStageIndex + 1} of 6: {currentStage.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      STATUS: {currentStage.status}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {currentStage.name}
                  </h2>

                  <p className="text-sm sm:text-base font-semibold text-cyan-300/90 mb-3">
                    {currentStage.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {currentStage.detail}
                  </p>

                  {/* Flow Path Blueprint */}
                  <div className="p-3 rounded-lg bg-obsidian-950 border border-slate-800 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 mb-1 font-semibold flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-cyan-400" />
                      <span>SCENARIO FLOW BLUEPRINT</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300 leading-snug">
                      {currentScenario.flowDescription}
                    </div>
                  </div>

                </div>

                {/* Bottom Result Card & Open Source Link */}
                <div className="pt-4 border-t border-slate-800/60 mt-4">
                  {currentStageIndex === currentScenario.stages.length - 1 ? (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 mb-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>RESULT: VERIFIED</span>
                      </div>
                      <div className="text-xs text-slate-200 font-mono">
                        {currentScenario.finalResultSummary}
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{currentStage.verificationStatus.toUpperCase()}</span>
                    </div>

                    <a
                      href={currentScenario.associatedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      <span>{currentScenario.associatedProject.name} ({currentScenario.associatedProject.testCount})</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Agent Console & Payloads */}
              <div className="lg:col-span-7 bg-obsidian-950 p-4 sm:p-5 flex flex-col space-y-4">
                
                {/* Console Section Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 ml-2 font-semibold">
                        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                        <span>LIVE AGENT CONSOLE</span>
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      SIMULATION
                    </span>
                  </div>

                  {/* Real-time Event Console Output */}
                  <div className="h-36 overflow-y-auto rounded-lg bg-obsidian-900 border border-slate-850 p-2.5 font-mono text-xs space-y-1 scrollbar-thin">
                    {cumulativeLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2 leading-tight">
                        <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                        <span className={`px-1 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                          log.level === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          log.level === 'SECURITY' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                          log.level === 'TRACE' ? 'bg-slate-800 text-slate-400' :
                          'bg-cyan-950 text-cyan-400'
                        }`}>
                          {log.event}
                        </span>
                        <span className="text-slate-300 break-all">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payload / Code Inspector */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                    <span className="text-xs font-mono text-slate-400">
                      stage_payload // {currentStage.id}.py
                    </span>

                    <button
                      onClick={copyCode}
                      className="p-1 rounded text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 hover:bg-slate-800 transition-colors"
                      title="Copy snippet"
                    >
                      {copiedSnippet ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="flex-1 rounded-xl bg-obsidian-900/90 border border-slate-800 p-3.5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 max-h-56 overflow-y-auto">
                    <pre className="whitespace-pre-wrap word-break">
                      {currentStage.codeSnippet}
                    </pre>
                  </div>
                </div>

                {/* Terminal Footer Info */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                  <span>Deterministic Execution Core</span>
                  <span className="text-emerald-500/90 font-semibold">● SHA-256 Verified</span>
                </div>

              </div>

            </div>

          </div>

          {/* Case Studies / Engineering Pillars */}
          <div className="mt-14 sm:mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                DAX Engineering Pillars
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                Open-source reference implementations backing the lab.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Pillar 1: Intelligence */}
              <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">1. Intelligence</div>
                      <div className="text-xs font-mono text-cyan-400">Nexus Agent (7/7 Tests)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Task planning, episodic memory buffers, and multi-backend routing across Ollama, vLLM, and offline mock engines.
                  </p>
                </div>
                <a
                  href="https://github.com/dax0056/nexus-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>View Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Pillar 2: Tools */}
              <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-blue-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">2. Tools</div>
                      <div className="text-xs font-mono text-blue-400">Micro Coding Agent (12/12 Tests)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Controlled in-memory unified diffs, approval gate hooks, and AST syntax validation to prevent code regressions.
                  </p>
                </div>
                <a
                  href="https://github.com/dax0056/micro-coding-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <span>View Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Pillar 3: Verification */}
              <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">3. Verification</div>
                      <div className="text-xs font-mono text-emerald-400">Desktop Action Agent (10/10 Tests)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Strict workspace containment, process allowlists, dangerous pattern filters, and cryptographic SHA-256 audit logs.
                  </p>
                </div>
                <a
                  href="https://github.com/dax0056/desktop-action-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>View Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-obsidian-900 py-6 text-center text-xs text-slate-500 font-mono">
        <div>DAX Agent Lab v2 • 100% Client-Side Deterministic Simulation • All rights reserved 2026</div>
      </footer>

    </div>
  );
};
