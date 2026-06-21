/**
 * writing.ts — Short-form insights.
 *
 * Publications now live in publications.ts (the single source of truth).
 * The earlier broken-link placeholders have been removed from this file:
 *   • phantom "publications" that pointed at internal pages (/paradox-of-
 *     automated-trust, /governance-framework, /operationalizing-ai-governance,
 *     /decision-authority-protocol, /writing) — none of those pages existed.
 *   • the three case-study placeholders that pointed at /case-studies/* — those
 *     pages didn't exist either.
 *
 * The insights below all link to a live LinkedIn profile and are kept as-is.
 * To add a real case study later, use type: "case-study" — but only with a
 * working sourceUrl.
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
  // Insights (LinkedIn) — all links verified to a live profile.
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
  }
];
