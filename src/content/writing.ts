/**
 * writing.ts — Short-form insights.
 *
 * All insights now link to internal /writing/[slug] article pages.
 * The article content lives in content/articles/.
 */

export type WritingCategory =
  | "Research"
  | "Framework"
  | "Specification"
  | "Essay"
  | "Report"
  | "AI Governance"
  | "Leadership"
  | "Delivery"
  | "Modernization"
  | "Systems";

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
  {
    title: "Confidence is not governance",
    slug: "confidence-is-not-governance",
    excerpt: "High-confidence output still needs authority boundaries, evidence, escalation logic, and a person who can review the decision.",
    category: "AI Governance",
    publishedAt: "2026-02-03",
    source: "BagelTech",
    sourceUrl: "/writing/confidence-is-not-governance",
    featured: true,
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Authority", "Audit"],
  },
  {
    title: "The fallacy of 'set it and forget it' AI",
    slug: "fallacy-of-set-it-and-forget-it-ai",
    excerpt: "AI systems that operate without ongoing governance become liabilities as contexts evolve.",
    category: "AI Governance",
    publishedAt: "2026-01-28",
    source: "BagelTech",
    sourceUrl: "/writing/fallacy-of-set-it-and-forget-it-ai",
    featured: true,
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Oversight", "Lifecycle"],
  },
  {
    title: "Modernization without governance is just speed",
    slug: "modernization-without-governance",
    excerpt: "Fast delivery of poorly governed systems creates more risk than it solves.",
    category: "Modernization",
    publishedAt: "2026-01-25",
    source: "BagelTech",
    sourceUrl: "/writing/modernization-without-governance",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["Modernization", "Governance", "Risk"],
  },
  {
    title: "Why AI teams need 'red team' thinking",
    slug: "ai-teams-need-red-team-thinking",
    excerpt: "Building safe AI requires assuming things will go wrong, not that they'll work perfectly.",
    category: "AI Governance",
    publishedAt: "2026-01-22",
    source: "BagelTech",
    sourceUrl: "/writing/ai-teams-need-red-team-thinking",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Red Team", "Safety"],
  },
  {
    title: "The quiet importance of operational boundaries",
    slug: "operational-boundaries-importance",
    excerpt: "Clear boundaries between automated assistance and human authority aren't restrictive—they're enabling.",
    category: "Systems",
    publishedAt: "2026-01-18",
    source: "BagelTech",
    sourceUrl: "/writing/operational-boundaries-importance",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["Systems", "Boundaries", "Automation"],
  },
  {
    title: "The PMO is where strategy becomes evidence",
    slug: "pmo-strategy-becomes-evidence",
    excerpt: "Modernization programs fail when decision rights, assumptions, risks, and tradeoffs do not survive contact with delivery.",
    category: "Delivery",
    publishedAt: "2026-01-24",
    source: "BagelTech",
    sourceUrl: "/writing/pmo-strategy-becomes-evidence",
    featured: true,
    external: false,
    workstream: "Bagelle Parris Vargas",
    type: "insight",
    tags: ["PMO", "Delivery", "Evidence"],
  },
  {
    title: "Research only matters if it changes the operating model",
    slug: "research-changes-operating-model",
    excerpt: "A useful framework should clarify what gets built, what gets deferred, and what evidence a real institution needs.",
    category: "Systems",
    publishedAt: "2025-12-19",
    source: "BagelTech",
    sourceUrl: "/writing/research-changes-operating-model",
    external: false,
    workstream: "BDB Labs",
    type: "insight",
    tags: ["Research", "Operating Model", "Frameworks"],
  },
  {
    title: "ERP oversight is not ceremony",
    slug: "erp-oversight-is-not-ceremony",
    excerpt: "Large modernization efforts need visible ownership, disciplined escalation, and program controls that decision-makers actually use.",
    category: "Modernization",
    publishedAt: "2025-11-08",
    source: "BagelTech",
    sourceUrl: "/writing/erp-oversight-is-not-ceremony",
    external: false,
    workstream: "Bagelle Parris Vargas",
    type: "insight",
    tags: ["ERP", "Modernization", "Oversight"],
  },
  {
    title: "Build the path for uncertainty before launch",
    slug: "build-the-path-for-uncertainty",
    excerpt: "If a system does not know how to pause, escalate, ask for evidence, or hand off authority, the demo is not the design.",
    category: "AI Governance",
    publishedAt: "2025-10-16",
    source: "BagelTech",
    sourceUrl: "/writing/build-the-path-for-uncertainty",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Launch", "Escalation"],
  },
  {
    title: "Leadership is a decision design problem",
    slug: "leadership-is-decision-design",
    excerpt: "The strongest leaders do not absorb every decision. They define where decisions belong and what evidence must travel with them.",
    category: "Leadership",
    publishedAt: "2025-09-30",
    source: "BagelTech",
    sourceUrl: "/writing/leadership-is-decision-design",
    external: false,
    workstream: "Bagelle Parris Vargas",
    type: "insight",
    tags: ["Leadership", "Decision Design", "Authority"],
  },
  {
    title: "Failure truthfulness is a governance requirement",
    slug: "failure-truthfulness-is-a-governance-requirement",
    excerpt: "A system that cannot honestly surface its own failures cannot be trusted to govern anything at scale.",
    category: "AI Governance",
    publishedAt: "2025-09-10",
    source: "BagelTech",
    sourceUrl: "/writing/failure-truthfulness-is-a-governance-requirement",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Transparency", "Audit"],
  },
  {
    title: "Authority without audit is just automation with better branding",
    slug: "authority-without-audit",
    excerpt: "Delegating decisions to automated systems without audit trails, escalation paths, or human checkpoints is not governance. It is performance.",
    category: "AI Governance",
    publishedAt: "2025-08-21",
    source: "BagelTech",
    sourceUrl: "/writing/authority-without-audit",
    external: false,
    workstream: "BagelTech",
    type: "insight",
    tags: ["AI Governance", "Authority", "Audit", "Automation"],
  },
];
