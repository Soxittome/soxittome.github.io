export interface LabStage {
  id: 'goal' | 'planner' | 'router' | 'execution' | 'verification' | 'result';
  name: string;
  badge: string;
  summary: string;
  detail: string;
  codeSnippet?: string;
  verificationStatus: 'idle' | 'processing' | 'verified' | 'passed';
}

export interface LabScenario {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  category: string;
  associatedProject: {
    name: string;
    repoUrl: string;
    role: string;
  };
  stages: LabStage[];
}

export const LAB_SCENARIOS: LabScenario[] = [
  {
    id: 'analyze-code',
    title: 'Analyze Code',
    shortDesc: 'Parse Python AST and identify potential syntax regressions.',
    icon: 'FileCode2',
    category: 'Code Intelligence',
    associatedProject: {
      name: 'Micro Coding Agent',
      repoUrl: 'https://github.com/dax0056/micro-coding-agent',
      role: 'AST Validation Engine'
    },
    stages: [
      {
        id: 'goal',
        name: 'USER GOAL',
        badge: 'Input Ingestion',
        summary: 'Goal: Inspect a Python function and verify syntax validity prior to disk write.',
        detail: 'User requests automated analysis of target module `core/calculator.py` with zero remote leakage.',
        codeSnippet: 'def calculate_metrics(values: list[float]) -> dict:\n    total = sum(values)\n    avg = total / len(values) if values else 0.0\n    return {"total": total, "average": avg}',
        verificationStatus: 'verified'
      },
      {
        id: 'planner',
        name: 'PLANNER',
        badge: 'Task Decomposition',
        summary: 'Decomposing task into safe read and AST parsing milestones.',
        detail: 'Milestone 1: Read source buffer -> Milestone 2: Generate Abstract Syntax Tree -> Milestone 3: Run AST node visitor.',
        codeSnippet: '[PLANNER STATE MACHINE]\nMilestone 1: WORKSPACE_READ ("core/calculator.py")\nMilestone 2: AST_PARSE_IN_MEMORY (mode="exec")\nMilestone 3: LINT_AND_SYNTAX_ASSERTION (strict=True)',
        verificationStatus: 'verified'
      },
      {
        id: 'router',
        name: 'TOOL ROUTER',
        badge: 'Schema Resolution',
        summary: 'Routing subtask to local AST Verifier without cloud inference.',
        detail: 'Selected tool: `MicroCodingAgent.CodeVerifier` utilizing Python standard library `ast.parse`.',
        codeSnippet: '{\n  "selected_tool": "CodeVerifier.verify_syntax",\n  "target_backend": "local_python_ast",\n  "parameters": { "source_mode": "in_memory_buffer" },\n  "cloud_fallback": false\n}',
        verificationStatus: 'verified'
      },
      {
        id: 'execution',
        name: 'EXECUTION',
        badge: 'Sandboxed Run',
        summary: 'Parsing module tree into Python AST in memory.',
        detail: 'AST Tree generated: 1 FunctionDef node, 3 Assign nodes, 1 Return node. Zero disk mutations made.',
        codeSnippet: 'Module(\n  body=[\n    FunctionDef(name="calculate_metrics", args=arguments(...),\n    body=[Assign(...), Assign(...), Return(value=Dict(...))])\n  ]\n)',
        verificationStatus: 'verified'
      },
      {
        id: 'verification',
        name: 'VERIFICATION',
        badge: 'AST Assertion',
        summary: 'Validating Abstract Syntax Tree structure and type syntax.',
        detail: 'Running syntax checker: 0 syntax errors, 0 indentation errors, valid Python 3.10+ syntax confirmed.',
        codeSnippet: '[VERIFIER CHECKLIST]\n[✓] ast.parse() -> SUCCESS (0.0012s)\n[✓] Indentation check -> VALID\n[✓] Return value consistency -> DICT GUARANTEED\n[✓] Test assertion -> PASS',
        verificationStatus: 'passed'
      },
      {
        id: 'result',
        name: 'RESULT',
        badge: 'Evidence Output',
        summary: 'Code verified successfully with 0 syntax errors.',
        detail: 'Deterministic verification complete. Code is safe for integration into codebase.',
        codeSnippet: '{\n  "status": "SUCCESS",\n  "syntax_valid": true,\n  "errors_found": 0,\n  "verification_proof": "AST_PARSER_VALIDATED",\n  "execution_time_ms": 1.4\n}',
        verificationStatus: 'passed'
      }
    ]
  },
  {
    id: 'plan-task',
    title: 'Plan a Task',
    shortDesc: 'Decompose high-level goal into multi-step DAG milestones with local model routing.',
    icon: 'GitPullRequest',
    category: 'Agent Orchestration',
    associatedProject: {
      name: 'Nexus Agent',
      repoUrl: 'https://github.com/dax0056/nexus-agent',
      role: 'Intelligence Core & Router'
    },
    stages: [
      {
        id: 'goal',
        name: 'USER GOAL',
        badge: 'Goal Ingestion',
        summary: 'Goal: Ingest structured repository data and generate a multi-model verification report.',
        detail: 'User goal requires coordinated file reading, model selection, and memory buffer logging.',
        codeSnippet: 'USER PROMPT: "Inspect project directory structure, query local Ollama model for architecture summary, and save verified report."',
        verificationStatus: 'verified'
      },
      {
        id: 'planner',
        name: 'PLANNER',
        badge: 'DAG Planner',
        summary: 'Building sequential milestone plan with fallback safety.',
        detail: 'Planner resolves dependencies: M1 (List files) -> M2 (Model routing) -> M3 (Report generation).',
        codeSnippet: 'DAG PLAN:\n[M1: List Files] ──► [M2: Route to Local Ollama] ──► [M3: Write Sandbox Report]\nGuards: Enforce workspace boundary containment (Path.is_relative_to)',
        verificationStatus: 'verified'
      },
      {
        id: 'router',
        name: 'TOOL ROUTER',
        badge: 'Model Dispatch',
        summary: 'Routing prompts to local Ollama (Llama 3) with offline Mock fallback.',
        detail: 'Checking local backend availability on localhost:11434. Routing confirmed to local runner.',
        codeSnippet: '{\n  "backend": "ollama",\n  "endpoint": "http://127.0.0.1:11434/api/generate",\n  "model": "qwen2.5-coder:7b",\n  "privacy_mode": "STRICT_LOCAL"\n}',
        verificationStatus: 'verified'
      },
      {
        id: 'execution',
        name: 'EXECUTION',
        badge: 'Coordinated Run',
        summary: 'Executing milestone steps in isolated local workspace.',
        detail: 'Files listed: 14 items found. Summary generated by local model. Context appended to episodic memory buffer.',
        codeSnippet: '[LOG] Workspace containment check: OK\n[LOG] Local inference response received (420 tokens, 18.2 tok/s)\n[LOG] Episodic memory buffer updated (2 tier sliding context)',
        verificationStatus: 'verified'
      },
      {
        id: 'verification',
        name: 'VERIFICATION',
        badge: 'Policy Check',
        summary: 'Asserting workspace containment policy and zero network leaks.',
        detail: 'Policy check confirms no files accessed outside workspace root. 100% offline verified.',
        codeSnippet: '[SAFETY AUDIT]\n[✓] Zero remote network egress detected\n[✓] Path traversal check: No ".." escapes\n[✓] Memory buffer bounded within max token limits',
        verificationStatus: 'passed'
      },
      {
        id: 'result',
        name: 'RESULT',
        badge: 'Plan Completed',
        summary: 'Task executed to completion with full deterministic log.',
        detail: 'All 3 milestones reached. Report generated and saved inside sandboxed workspace.',
        codeSnippet: '{\n  "milestones_completed": "3/3",\n  "backend_used": "local_ollama",\n  "security_violations": 0,\n  "status": "COMPLETED"\n}',
        verificationStatus: 'passed'
      }
    ]
  },
  {
    id: 'modify-code',
    title: 'Modify Code',
    shortDesc: 'Apply unified diff patch with pre-flight dry-run and human approval gating.',
    icon: 'Layers',
    category: 'Code Modification',
    associatedProject: {
      name: 'Micro Coding Agent',
      repoUrl: 'https://github.com/dax0056/micro-coding-agent',
      role: 'Patch Engine & Approval Gate'
    },
    stages: [
      {
        id: 'goal',
        name: 'USER GOAL',
        badge: 'Patch Request',
        summary: 'Goal: Refactor database retry mechanism to use exponential backoff.',
        detail: 'Apply safe 4-line patch to `db/connector.py` without introducing syntax errors or crashing live queries.',
        codeSnippet: 'REQUEST: Replace static sleep(1) with exponential backoff (2 ** attempt) in connector retry loop.',
        verificationStatus: 'verified'
      },
      {
        id: 'planner',
        name: 'PLANNER',
        badge: 'Patch Strategy',
        summary: 'Generating unified diff candidate in memory without touching disk.',
        detail: 'Planner formats exact hunk: matching context lines, deletion of legacy retry, insertion of backoff logic.',
        codeSnippet: 'PLANNER: Generate in-memory Unified Diff -> Run Approval Gate -> Apply Atomic Patch -> AST Verify',
        verificationStatus: 'verified'
      },
      {
        id: 'router',
        name: 'TOOL ROUTER',
        badge: 'Tool Selection',
        summary: 'Invoking PatchEngine with strict approval gate hook.',
        detail: 'Selected tool: `PatchEngine.apply_diff_with_approval()` with human reviewer callback.',
        codeSnippet: '{\n  "tool": "PatchEngine.dry_run",\n  "target": "db/connector.py",\n  "hunk_match_mode": "exact_context",\n  "require_approval": true\n}',
        verificationStatus: 'verified'
      },
      {
        id: 'execution',
        name: 'EXECUTION',
        badge: 'Diff Generation',
        summary: 'Generating pre-flight unified diff preview.',
        detail: 'In-memory diff ready for human review. 1 line removed (-), 3 lines added (+).',
        codeSnippet: '--- a/db/connector.py\n+++ b/db/connector.py\n@@ -24,3 +24,5 @@\n-    time.sleep(1)\n+    delay = min(30.0, (2.0 ** attempt) + random.uniform(0, 0.5))\n+    logger.info(f"Retrying connection in {delay:.2f}s...")\n+    time.sleep(delay)',
        verificationStatus: 'verified'
      },
      {
        id: 'verification',
        name: 'VERIFICATION',
        badge: 'Approval & AST',
        summary: 'Human approval granted. AST verification passed with 0 errors.',
        detail: 'Approval callback returned True. CodeVerifier confirmed patched code compiles cleanly.',
        codeSnippet: '[VERIFICATION AUDIT]\n[✓] Approval Gate: APPROVED by developer\n[✓] AST Syntax Validation: PASS (0 errors)\n[✓] Target file hash before/after tracked for rollback',
        verificationStatus: 'passed'
      },
      {
        id: 'result',
        name: 'RESULT',
        badge: 'Patch Applied',
        summary: 'Atomic patch committed to target file with rollback capability.',
        detail: 'Database retry mechanism refactored cleanly. 12/12 unit tests passing.',
        codeSnippet: '{\n  "file": "db/connector.py",\n  "status": "PATCH_APPLIED_ATOMICALLY",\n  "approval": "CONFIRMED",\n  "syntax_valid": true\n}',
        verificationStatus: 'passed'
      }
    ]
  },
  {
    id: 'verify-result',
    title: 'Verify Result',
    shortDesc: 'Enforce process allowlists, sandbox barriers, and SHA-256 cryptographic audit trails.',
    icon: 'ShieldCheck',
    category: 'Sandboxed Automation',
    associatedProject: {
      name: 'Desktop Action Agent',
      repoUrl: 'https://github.com/dax0056/desktop-action-agent',
      role: 'Safety & Audit Engine'
    },
    stages: [
      {
        id: 'goal',
        name: 'USER GOAL',
        badge: 'Automation Task',
        summary: 'Goal: Query system metrics and log state safely without mutating host OS.',
        detail: 'User requests automated system inspection with strict destructive command prevention.',
        codeSnippet: 'TASK: Launch approved inspection utility, capture diagnostic window state, and generate proof of action.',
        verificationStatus: 'verified'
      },
      {
        id: 'planner',
        name: 'PLANNER',
        badge: 'Policy Lookup',
        summary: 'Checking action against application allowlist and sandbox rules.',
        detail: 'Allowed apps: ["notepad.exe", "calc.exe", "cmd.exe /c echo"]. Blocked commands: destructive shell deletes.',
        codeSnippet: 'POLICY ENGINE:\n[ALLOW] Read-only window discovery\n[BLOCK] Unauthorized binaries\n[BLOCK] Destructive commands ("rm -rf", "del /f /s /q")',
        verificationStatus: 'verified'
      },
      {
        id: 'router',
        name: 'TOOL ROUTER',
        badge: 'Tool Calling',
        summary: 'Routing action to ActionExecutor within bounded screen coordinates.',
        detail: 'Selected tool: `DesktopActionAgent.ActionExecutor` with bounded input and audit logger.',
        codeSnippet: '{\n  "tool": "ActionExecutor.query_window",\n  "allowlist_check": "PASSED",\n  "audit_mode": "SHA256_STRICT"\n}',
        verificationStatus: 'verified'
      },
      {
        id: 'execution',
        name: 'EXECUTION',
        badge: 'Controlled Run',
        summary: 'Executing non-destructive action in controlled environment.',
        detail: 'Action executed: Window list retrieved (3 matching titles). Audit payload created.',
        codeSnippet: '[ACTION EXECUTION]\n- Action: query_active_windows()\n- Bounded screen check: PASSED (1920x1080 bounds)\n- Host OS state: UNMODIFIED (Read-only containment)',
        verificationStatus: 'verified'
      },
      {
        id: 'verification',
        name: 'VERIFICATION',
        badge: 'Crypto Signature',
        summary: 'Computing cryptographic SHA-256 tamper-evident execution signature.',
        detail: 'Audit record signed: Timestamp, action type, payload hash, and outcome recorded.',
        codeSnippet: '[CRYPTOGRAPHIC PROOF]\nSignature: 9e8a4b2c1f0d3e5a7b9c8d1e2f3a4b5c6d7e8f903a2b1c4d5e6f7a8b9c0d1e2f\nIntegrity: IMMUTABLE_LOG_RECORD_CREATED\nStatus: 10/10 TESTS PASSED',
        verificationStatus: 'passed'
      },
      {
        id: 'result',
        name: 'RESULT',
        badge: 'Verified Proof',
        summary: 'Action verified and cryptographically logged.',
        detail: 'Automation complete with 100% auditability. Safe execution verified.',
        codeSnippet: '{\n  "action_executed": true,\n  "unauthorized_blocks": 0,\n  "sha256_audit_hash": "9e8a4b2c...0d1e2f",\n  "audit_verified": true\n}',
        verificationStatus: 'passed'
      }
    ]
  }
];
