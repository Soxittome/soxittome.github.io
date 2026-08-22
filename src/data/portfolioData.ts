export interface Project {
  id: string;
  name: string;
  role: string;
  badge: string;
  tagline: string;
  summary: string;
  techStack: string[];
  testCount: string;
  githubUrl: string;
  highlights: string[];
}

export interface Principle {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export const PROFILE = {
  brand: "DAX",
  title: "AI & Agent Engineer",
  tagline: "Building local-first AI systems, developer tools, and safe computer automation.",
  vision: "“I build agents that do more than generate text — they plan, act, verify, and improve.”",
  github: "https://github.com/dax-eng",
  linkedin: "https://www.linkedin.com/in/mohamed-musa-marouf-ahmed-7030561b8/",
  status: "Active Engineering",
  series: "DAX Agent Engineering Series",
};

export const PROJECTS: Project[] = [
  {
    id: "nexus-agent",
    name: "Nexus Agent",
    role: "🧠 Intelligence Core",
    badge: "v0.1.0 • MIT",
    tagline: "Modular local-first AI agent reference architecture.",
    summary: "Dispatches goals across local LLM backends (Ollama, vLLM, Mock), coordinates milestones, and enforces strict workspace root containment.",
    techStack: ["Python 3.9+", "Ollama / vLLM", "Task Planner", "Sandboxed Tools"],
    testCount: "7 / 7 Tests Passing",
    githubUrl: "https://github.com/dax-eng/nexus-agent",
    highlights: [
      "Dynamic routing across local models and offline mock engines",
      "Strict workspace isolation with parent directory traversal defense",
      "Two-tier memory: active conversation window + episodic facts"
    ]
  },
  {
    id: "micro-coding-agent",
    name: "Micro Coding Agent",
    role: "💻 Code Tooling",
    badge: "v0.1.0 • MIT",
    tagline: "Deterministic AI coding engine with AST syntax verification.",
    summary: "Guarantees safe code changes using pre-flight unified diff dry-runs, human approval gating, atomic chunk replacement, and Python AST validation.",
    techStack: ["Python", "AST Verifier", "Unified Diff", "Approval Gate"],
    testCount: "12 / 12 Tests Passing",
    githubUrl: "https://github.com/dax-eng/micro-coding-agent",
    highlights: [
      "In-memory unified diff preview before touching disk",
      "Python Abstract Syntax Tree (ast) validation catches syntax errors pre-completion",
      "Programmable approval gate callback hooks for developer review"
    ]
  },
  {
    id: "desktop-action-agent",
    name: "Desktop Action Agent",
    role: "🖥️ OS Tooling",
    badge: "v0.1.0 • MIT",
    tagline: "Sandboxed desktop automation with SHA-256 audit trails.",
    summary: "Guards computer-use actions with process allowlists, destructive command filters, bounded coordinates, and immutable cryptographic audit logs.",
    techStack: ["Python", "Process Sandbox", "Window Manager", "SHA-256 Audit"],
    testCount: "10 / 10 Tests Passing",
    githubUrl: "https://github.com/dax-eng/desktop-action-agent",
    highlights: [
      "Application allowlisting blocks unauthorized binary execution",
      "Destructive command pattern filter intercepts dangerous shell operations",
      "Cryptographic SHA-256 signature generated for every attempted action"
    ]
  }
];

export const PRINCIPLES: Principle[] = [
  {
    title: "Local First",
    tagline: "Privacy & Independence",
    description: "Reasoning, context, and code stay strictly on local hardware, eliminating cloud lock-in and remote data leakage.",
    iconName: "Cpu"
  },
  {
    title: "Verifiable",
    tagline: "Evidence-Backed Results",
    description: "Actions must produce empirical proof of correctness—AST syntax parsing, dry-run diffs, and test suite passes.",
    iconName: "CheckCircle2"
  },
  {
    title: "Safe by Design",
    tagline: "Deterministic Guardrails",
    description: "Strict workspace containment, process allowlists, and SHA-256 audit trails protect host environments from runaway loops.",
    iconName: "ShieldCheck"
  },
  {
    title: "Modular",
    tagline: "Composable Architecture",
    description: "Small, decoupled, and thoroughly tested components compose into robust agent architectures without monolithic bloat.",
    iconName: "Layers"
  },
  {
    title: "Open Source",
    tagline: "Reproducible Engineering",
    description: "Clean reference implementations transparently licensed under MIT, backed by automated multi-version CI suites.",
    iconName: "Code2"
  }
];

export const TECHNICAL_DOMAINS = [
  { category: "Agent Architecture", items: ["Task Decomposition", "Model Routing", "2-Tier Memory Buffers", "Tool Calling Schemas"] },
  { category: "Local Inference", items: ["Ollama Integration", "vLLM / LM Studio", "Offline Mock Engines", "On-Device Privacy"] },
  { category: "Code & Parsing", items: ["Python AST Parsing", "Unified Diff Generation", "Atomic Patching", "Syntax Verification"] },
  { category: "Safety & Sandboxing", items: ["Filesystem Containment", "Application Allowlists", "SHA-256 Audit Trails", "Command Blocklists"] },
  { category: "Testing & Quality", items: ["Pytest (29/29 Pass)", "GitHub Actions CI", "Python 3.10 / 3.11 / 3.12", "Strict Typing"] }
];
