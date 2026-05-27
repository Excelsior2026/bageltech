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