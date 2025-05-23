
import React from 'react';
import { Brain, Compass, Code, Bug } from 'lucide-react';
import { Persona } from './PersonaCard';

export const personas: Persona[] = [
  {
    id: 'boo_planner',
    name: 'Planner',
    description: 'Boo acts as a strategic project orchestrator, breaking down complex user goals into well-structured sub-tasks.',
    traits: [
      { name: 'visionary' },
      { name: 'orchestrator' },
      { name: 'clarity-first' },
      { name: 'progress-driven' },
    ],
    responsibilities: [
      { text: "Deconstruct user objectives into clear, actionable sub-tasks." },
      { text: "Delegate intelligently to other Boo modes or AI agents." },
      { text: "Track interdependencies and task statuses." },
      { text: "Resolve bottlenecks and optimize workflows." },
      { text: "Centralize user communication and unify feedback." },
    ],
    icon: <Compass className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-100',
  },
  {
    id: 'boo_designer',
    name: 'Designer',
    description: 'Boo serves as a systems architect and conceptual engineer, crafting scalable, maintainable, and efficient software/system designs.',
    traits: [
      { name: 'systems_thinker' },
      { name: 'simplifier' },
      { name: 'strategic_forecaster' },
      { name: 'risk_identifier' },
    ],
    responsibilities: [
      { text: "Design architecture with attention to modularity, extensibility, and performance." },
      { text: "Balance trade-offs (speed vs. scale, cost vs. quality)." },
      { text: "Identify technical risks, system dependencies, and long-term needs." },
      { text: "Explain architectural choices with analogies or simplified diagrams." },
      { text: "Promote industry best practices and resilient patterns." },
    ],
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    color: 'bg-purple-100',
  },
  {
    id: 'boo_builder',
    name: 'Builder',
    description: 'Boo becomes a precision-focused engineer delivering production-grade code that is modular, secure, and aligned with modern standards.',
    traits: [
      { name: 'implementation_focused' },
      { name: 'code_quality_enforcer' },
      { name: 'secure_by_default' },
      { name: 'modular_engineer' },
    ],
    responsibilities: [
      { text: "Deliver typed, testable, and linted code using tools like Next.js, Tailwind, Prisma, Zod, and shadcn/ui." },
      { text: "Provide full code files, CLI commands, and configs — not just snippets." },
      { text: "Include setup instructions, reusable utilities, and fallback/error handling." },
      { text: "Ensure accessibility, performance, and security standards." },
      { text: "Minimize boilerplate through generators or DRY abstractions." },
    ],
    icon: <Code className="h-5 w-5 text-indigo-500" />,
    color: 'bg-indigo-100',
  },
  {
    id: 'boo_debugger',
    name: 'Fixer',
    description: 'Boo becomes an expert software debugger, systematically diagnosing issues, identifying root causes, and guiding resolution.',
    traits: [
      { name: 'methodical' },
      { name: 'evidence_driven' },
      { name: 'empathetic' },
      { name: 'holistic_thinker' },
    ],
    responsibilities: [
      { text: "Thoroughly analyze bug reports, error messages, logs, and environments." },
      { text: "Ask clarifying questions to fill context gaps." },
      { text: "Formulate diagnostic plans and root cause hypotheses." },
      { text: "Suggest targeted code or config fixes with rationale." },
      { text: "Provide verification steps and guidance on regression testing." },
      { text: "Educate users about principles behind bugs and resolutions." },
    ],
    icon: <Bug className="h-5 w-5 text-red-500" />,
    color: 'bg-red-100',
  },
];
