import React, { useState } from 'react';
import { Target, ListOrdered, Route, Wrench, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  description: string;
  guarantee: string;
}

export const ArchitectureFlow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: Stage[] = [
    {
      id: "goal",
      name: "USER GOAL",
      subtitle: "Objective Ingestion",
      icon: Target,
      color: "text-slate-200 border-slate-700 bg-slate-900/60",
      description: "Receives natural language objective and initializes bounded workspace context.",
      guarantee: "Zero telemetry or prompt leakage to external cloud APIs."
    },
    {
      id: "plan",
      name: "PLANNER",
      subtitle: "Task Decomposition",
      icon: ListOrdered,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30",
      description: "Decomposes the objective into ordered, trackable milestones (inspect -> execute -> verify).",
      guarantee: "Structured milestone state progression (Pending -> In Progress -> Completed)."
    },
    {
      id: "route",
      name: "MODEL ROUTER",
      subtitle: "Local Inference",
      icon: Route,
      color: "text-blue-400 border-blue-500/40 bg-blue-950/30",
      description: "Routes prompts dynamically to Ollama, vLLM / LM Studio endpoints, or offline mock engines.",
      guarantee: "Native hardware acceleration with automatic offline failover support."
    },
    {
      id: "tool",
      name: "SANDBOX TOOLS",
      subtitle: "Protected Execution",
      icon: Wrench,
      color: "text-amber-400 border-amber-500/40 bg-amber-950/30",
      description: "Executes file modifications, AST parsing, and OS automation within locked confines.",
      guarantee: "Strict path boundary containment and process allowlists."
    },
    {
      id: "verify",
      name: "VERIFICATION",
      subtitle: "Deterministic Proof",
      icon: ShieldCheck,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30",
      description: "Validates execution states using AST syntax integrity, test passes, and SHA-256 signatures.",
      guarantee: "Empirical proof of correctness required before declaring task success."
    }
  ];

  return (
    <section id="architecture" className="py-16 md:py-20 border-b border-slate-800/60 bg-obsidian-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block rounded-md border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How DAX Agents Transform Goals into Verified Action
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Moving beyond stochastic text generation to deterministic, safety-first agent execution.
          </p>
        </div>

        {/* The 5-Stage Interactive Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-cyan-500/70 bg-obsidian-800 shadow-lg shadow-cyan-950/40 scale-[1.02]' 
                      : 'border-slate-800/80 bg-obsidian-900/60 hover:border-slate-700 hover:bg-obsidian-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500">STAGE 0{idx + 1}</span>
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-200">{stage.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{stage.subtitle}</div>
                </button>

                {idx < stages.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="rounded-xl border border-slate-800 bg-obsidian-850 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Active Architecture Node // Stage 0{activeStage + 1}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {stages[activeStage].name} — {stages[activeStage].subtitle}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verified Guarantee</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">EXECUTION RESPONSIBILITY</div>
              <p className="text-slate-300 leading-relaxed">
                {stages[activeStage].description}
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">SAFETY & ARCHITECTURAL GUARANTEE</div>
              <p className="text-emerald-300/90 leading-relaxed font-mono text-xs bg-obsidian-900/60 p-3 rounded-lg border border-slate-800">
                {stages[activeStage].guarantee}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
