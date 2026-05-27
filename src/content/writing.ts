export type WritingCategory = "Research" | "Framework" | "Specification" | "Essay" | "Report" | "AI Governance" | "Leadership" | "Delivery" | "Modernization" | "Systems";

export interface WritingItem {
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  category: WritingCategory;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  featured?: boolean;
  external?: boolean;
  workstream: "BDB Labs" | "BagelTech" | "Bagelle Parris Vargas";
  tags?: string[];
  type: "publication" | "insight" | "case-study";
  challenge?: string;
  solution?: string;
  results?: string[];
  icon?: string;
}

export const WRITING: WritingItem[] = [
  // Publications (merged from publications.ts)
  {
    title: "The Doctrine of Intelligence Pluralism",
    slug: "doctrine-of-intelligence-pluralism",
    summary: "A framework for reliability through structured, role-separated intelligence rather than one synthetic authority.",
    category: "Research",
    publishedAt: "2026-01-15",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.18613183",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["AI governance", "ensemble reasoning", "research"],
    type: "publication"
  },
  {
    title: "The Paradox of Automated Trust",
    slug: "paradox-of-automated-trust",
    summary: "Why automation requires more governance, not less, as stakes increase.",
    category: "Essay",
    publishedAt: "2026-02-01",
    source: "BagelTech",
    sourceUrl: "/paradox-of-automated-trust",
    featured: true,
    external: false,
    workstream: "BagelTech",
    tags: ["trust", "automation", "governance"],
    type: "publication"
  },
  {
    title: "Governance Framework for AI-Powered Decision Systems",
    slug: "governance-framework-ai-decision-systems",
    summary: "Comprehensive approach to designing auditable, accountable AI systems in operational contexts.",
    category: "Framework",
    publishedAt: "2026-01-20",
    source: "BagelTech",
    sourceUrl: "/governance-framework",
    featured: true,
    external: false,
    workstream: "BagelTech",
    tags: ["governance", "framework", "decision systems"],
    type: "publication"
  },
  {
    title: "Operationalizing AI Governance: A Practical Guide",
    slug: "operationalizing-ai-governance",
    summary: "Field-tested methods for implementing governance in production AI systems.",
    category: "Report",
    publishedAt: "2025-12-10",
    source: "BagelTech",
    sourceUrl: "/operationalizing-ai-governance",
    external: false,
    workstream: "BagelTech",
    tags: ["implementation", "operations", "governance"],
    type: "publication"
  },
  {
    title: "Specification: Decision Authority Protocol",
    slug: "decision-authority-protocol",
    summary: "Technical specification for defining and managing decision boundaries in AI systems.",
    category: "Specification",
    publishedAt: "2025-11-15",
    source: "BagelTech",
    sourceUrl: "/decision-authority-protocol",
    external: false,
    workstream: "BagelTech",
    tags: ["specification", "protocol", "authority"],
    type: "publication"
  },
  
  {
    title: "The ELEANOR Governance Specification - Runtime Architecture v2.1",
    slug: "eleanor-governance-specification",
    summary: "A technical specification for execution, escalation, evidence capture, and governable model behavior.",
    category: "Specification",
    publishedAt: "2025-12-10",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17605176",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["runtime governance", "auditability", "specification"],
    type: "publication"
  },
  {
    title: "Jurisprudential Governance for AI (ELEANOR)",
    slug: "jurisprudential-governance-for-ai",
    summary: "A rights-based governance framing for controlled AI execution under uncertainty and institutional authority.",
    category: "Framework",
    publishedAt: "2025-11-20",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17498043",
    external: true,
    workstream: "BDB Labs",
    tags: ["ELEANOR", "rights", "oversight"],
    type: "publication"
  },
  {
    title: "Routing Uncertainty in AI Systems",
    slug: "routing-uncertainty-in-ai-systems",
    summary: "An argument that uncertainty should trigger routing, escalation, abstention, retrieval, or human review.",
    category: "Report",
    publishedAt: "2025-10-05",
    source: "ORCID",
    sourceUrl: "https://orcid.org/0009-0001-6994-6828",
    external: true,
    workstream: "BDB Labs",
    tags: ["uncertainty", "human review", "operations"],
    type: "publication"
  },
  {
    title: "Ensemble Software Engineering",
    slug: "ensemble-software-engineering",
    summary: "A practical method for using specialist roles, repeatable packs, and comparative review in AI-assisted engineering.",
    category: "Framework",
    publishedAt: "2025-09-18",
    source: "GitHub",
    sourceUrl: "https://github.com/Excelsior2026",
    external: true,
    workstream: "BDB Labs",
    tags: ["engineering", "roles", "review"],
    type: "publication"
  },
  {
    title: "Governance Systems for Consequential Decisions",
    slug: "governance-systems-for-consequential-decisions",
    summary: "A concise operating thesis for designing decision systems around authority, evidence, escalation, and review.",
    category: "Essay",
    publishedAt: "2025-08-21",
    source: "BagelTech",
    sourceUrl: "/writing",
    external: false,
    workstream: "BagelTech",
    tags: ["governance", "product strategy", "institutions"],
    type: "publication"
  },

  // Insights (merged from insights.ts)
  {
    title: "Confidence is not governance",
    slug: "confidence-is-not-governance",
    excerpt: "High-confidence output still needs authority boundaries, evidence, escalation logic, and a person who can review the decision.",
    category: "AI Governance",
    publishedAt: "2026-02-03",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: true,
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "The fallacy of 'set it and forget it' AI",
    slug: "fallacy-of-set-it-and-forget-it-ai",
    excerpt: "AI systems that operate without ongoing governance become liabilities as contexts evolve.",
    category: "AI Governance",
    publishedAt: "2026-01-28",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: true,
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "Modernization without governance is just speed",
    slug: "modernization-without-governance",
    excerpt: "Fast delivery of poorly governed systems creates more risk than it solves.",
    category: "Modernization",
    publishedAt: "2026-01-25",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "Why AI teams need 'red team' thinking",
    slug: "ai-teams-need-red-team-thinking",
    excerpt: "Building safe AI requires assuming things will go wrong, not that they'll work perfectly.",
    category: "AI Governance",
    publishedAt: "2026-01-22",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "The quiet importance of operational boundaries",
    slug: "operational-boundaries-importance",
    excerpt: "Clear boundaries between automated assistance and human authority aren't restrictive—they're enabling.",
    category: "Systems",
    publishedAt: "2026-01-18",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "The PMO is where strategy becomes evidence",
    slug: "pmo-strategy-becomes-evidence",
    excerpt: "Modernization programs fail when decision rights, assumptions, risks, and tradeoffs do not survive contact with delivery.",
    category: "Delivery",
    publishedAt: "2026-01-24",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: true,
    external: true,
    workstream: "Bagelle Parris Vargas",
    type: "insight"
  },
  {
    title: "Research only matters if it changes the operating model",
    slug: "research-changes-operating-model",
    excerpt: "A useful framework should clarify what gets built, what gets deferred, and what evidence a real institution needs.",
    category: "Systems",
    publishedAt: "2025-12-19",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "BDB Labs",
    type: "insight"
  },
  {
    title: "ERP oversight is not ceremony",
    slug: "erp-oversight-is-not-ceremony",
    excerpt: "Large modernization efforts need visible ownership, disciplined escalation, and program controls that decision-makers actually use.",
    category: "Modernization",
    publishedAt: "2025-11-08",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "Bagelle Parris Vargas",
    type: "insight"
  },
  {
    title: "Build the path for uncertainty before launch",
    slug: "build-the-path-for-uncertainty",
    excerpt: "If a system does not know how to pause, escalate, ask for evidence, or hand off authority, the demo is not the design.",
    category: "AI Governance",
    publishedAt: "2025-10-16",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "BagelTech",
    type: "insight"
  },
  {
    title: "Leadership is a decision design problem",
    slug: "leadership-is-decision-design",
    excerpt: "The strongest leaders do not absorb every decision. They define where decisions belong and what evidence must travel with them.",
    category: "Leadership",
    publishedAt: "2025-09-30",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    external: true,
    workstream: "Bagelle Parris Vargas",
    type: "insight"
  },

  // Case Studies (merged from case-studies.ts)
  {
    title: "Permitting and licensing workflows",
    slug: "permitting-licensing-workflows",
    challenge: "Operational teams need consistent decision rights, escalation logic, and auditability before automation goes live.",
    solution: "Map the governance path: who can decide, what evidence is required, and when a case must move to human review.",
    results: [
      "Decision thresholds defined up front",
      "Escalation and exception paths made explicit",
      "Review artifacts structured for later audit",
    ],
    icon: "🏛️",
    category: "Delivery",
    publishedAt: "2026-01-10",
    source: "BagelTech",
    sourceUrl: "/case-studies/permitting-licensing",
    external: false,
    workstream: "BagelTech",
    type: "case-study"
  },
  {
    title: "Public-safety and consequential escalation",
    slug: "public-safety-consequential-escalation",
    challenge: "High-stakes workflows cannot rely on one opaque output when urgency, consequence, and ambiguity collide.",
    solution: "Separate machine assistance from operational authority and define when uncertainty must trigger human intervention.",
    results: [
      "Authority boundaries clarified",
      "Human review checkpoints embedded in the flow",
      "Fallback behavior defined for uncertain conditions",
    ],
    icon: "🚨",
    category: "AI Governance",
    publishedAt: "2026-01-05",
    source: "BagelTech",
    sourceUrl: "/case-studies/public-safety",
    external: false,
    workstream: "BagelTech",
    type: "case-study"
  },
  {
    title: "Regulatory compliance in automated decision systems",
    slug: "regulatory-compliance-automated-decisions",
    challenge: "Organizations need to demonstrate compliance with evolving AI regulations while maintaining operational efficiency.",
    solution: "Build governance-first systems that create compliance artifacts as a natural byproduct of operation.",
    results: [
      "Audit trails automatically generated",
      "Regulatory requirements mapped to system controls",
      "Compliance reporting streamlined",
    ],
    icon: "📋",
    category: "AI Governance",
    publishedAt: "2025-12-20",
    source: "BagelTech",
    sourceUrl: "/case-studies/regulatory-compliance",
    external: false,
    workstream: "BagelTech",
    type: "case-study"
  }
];