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
  Lock
} from 'lucide-react';

export const AgentLab: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('analyze-code');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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

  const copyCode = () => {
    if (currentStage.codeSnippet) {
      navigator.clipboard.writeText(currentStage.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  return (
    <section id="agent-lab" className="relative py-16 sm:py-24 border-b border-slate-800/60 bg-obsidian-950 scroll-mt-16">
      {/* Background Subtle Tech Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-cyan-500/5 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE AGENT LAB // CLIENT-SIDE SIMULATION</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            DAX Agent Lab
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 mb-2">
            See how an AI agent thinks, acts, and verifies in real time.
          </p>
          
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-slate-400 bg-obsidian-900 border border-slate-800 rounded-lg px-3 py-1 mt-1">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span>100% Client-Side Simulation • 0 Remote API Calls • Sandboxed</span>
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
                className={`flex flex-col items-start p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
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

        {/* Main Interactive Sandbox Canvas */}
        <div className="rounded-2xl border border-slate-800 bg-obsidian-900/90 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-obsidian-850">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                Scenario: <span className="text-cyan-400">{currentScenario.title}</span>
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

          {/* Interactive Pipeline Step Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-obsidian-950/60 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between min-w-[620px] gap-2">
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
                      <div className={`flex items-center justify-center h-9 w-9 rounded-full border text-xs font-mono font-bold transition-all shadow-md ${
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

          {/* Active Stage Details & Live Terminal Window */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Stage Explanation */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    Stage {currentStageIndex + 1} of 6: {currentStage.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {currentStage.name}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-cyan-300/90 mb-3">
                  {currentStage.summary}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {currentStage.detail}
                </p>
              </div>

              {/* Verified Badge & Associated Open Source Project Link */}
              <div className="pt-4 border-t border-slate-800/60 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>State: {currentStage.verificationStatus.toUpperCase()}</span>
                  </div>

                  <a
                    href={currentScenario.associatedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>{currentScenario.associatedProject.name}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Simulated Terminal & Payloads */}
            <div className="lg:col-span-7 bg-obsidian-950 p-4 sm:p-5 flex flex-col">
              
              {/* Terminal Tab Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 ml-2">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>dax-agent-sandbox // {currentStage.id}.log</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="p-1 rounded text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 hover:bg-slate-800 transition-colors"
                    title="Copy snippet"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Code / Payload Display */}
              <div className="relative flex-1 rounded-xl bg-obsidian-900/90 border border-slate-800 p-3 sm:p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
                <pre className="whitespace-pre-wrap word-break">
                  {currentStage.codeSnippet || '// No payload available for this stage'}
                </pre>
              </div>

              {/* Terminal Footer Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2.5 pt-2 border-t border-slate-900">
                <span>Deterministic Execution Core</span>
                <span className="text-emerald-500/90 font-semibold">● SHA-256 Verified</span>
              </div>

            </div>

          </div>

        </div>

        {/* Architecture Mapping (How DAX Agents Work) */}
        <div className="mt-14 sm:mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              How DAX Agents Work
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              Three pillars composed into empirical agent architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Pillar 1: Intelligence */}
            <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">1. Intelligence</div>
                  <div className="text-xs font-mono text-cyan-400">Nexus Agent (7/7 Tests)</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Task planning, episodic memory buffers, and multi-backend routing across Ollama, vLLM, and offline mock engines.
              </p>
            </div>

            {/* Pillar 2: Tools */}
            <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">2. Tools</div>
                  <div className="text-xs font-mono text-blue-400">Micro Coding Agent (12/12 Tests)</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Controlled in-memory unified diffs, approval gate hooks, and AST syntax validation to prevent regressions.
              </p>
            </div>

            {/* Pillar 3: Verification */}
            <div className="rounded-xl border border-slate-800 bg-obsidian-900/70 p-5 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">3. Verification</div>
                  <div className="text-xs font-mono text-emerald-400">Desktop Action Agent (10/10 Tests)</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict workspace containment, process allowlists, dangerous pattern filters, and cryptographic SHA-256 audit logs.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
