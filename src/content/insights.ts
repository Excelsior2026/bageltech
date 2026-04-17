export type InsightCategory = "AI Governance" | "Leadership" | "Delivery" | "Modernization" | "Systems";

export interface InsightItem {
  title: string;
  slug: string;
  excerpt: string;
  category: InsightCategory;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  featured: boolean;
  external: boolean;
  workstream: "BagelTech" | "BDB Labs" | "Bagelle Parris Vargas";
}

export const INSIGHTS: InsightItem[] = [
  {
    title: "Confidence is not governance",
    slug: "confidence-is-not-governance",
    excerpt:
      "High-confidence output still needs authority boundaries, evidence, escalation logic, and a person who can review the decision.",
    category: "AI Governance",
    publishedAt: "2026-02-03",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: true,
    external: true,
    workstream: "BagelTech",
  },
  {
    title: "The PMO is where strategy becomes evidence",
    slug: "pmo-strategy-becomes-evidence",
    excerpt:
      "Modernization programs fail when decision rights, assumptions, risks, and tradeoffs do not survive contact with delivery.",
    category: "Delivery",
    publishedAt: "2026-01-24",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: true,
    external: true,
    workstream: "Bagelle Parris Vargas",
  },
  {
    title: "Research only matters if it changes the operating model",
    slug: "research-changes-operating-model",
    excerpt:
      "A useful framework should clarify what gets built, what gets deferred, and what evidence a real institution needs.",
    category: "Systems",
    publishedAt: "2025-12-19",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: false,
    external: true,
    workstream: "BDB Labs",
  },
  {
    title: "ERP oversight is not ceremony",
    slug: "erp-oversight-is-not-ceremony",
    excerpt:
      "Large modernization efforts need visible ownership, disciplined escalation, and program controls that decision-makers actually use.",
    category: "Modernization",
    publishedAt: "2025-11-08",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: false,
    external: true,
    workstream: "Bagelle Parris Vargas",
  },
  {
    title: "Build the path for uncertainty before launch",
    slug: "build-the-path-for-uncertainty",
    excerpt:
      "If a system does not know how to pause, escalate, ask for evidence, or hand off authority, the demo is not the design.",
    category: "AI Governance",
    publishedAt: "2025-10-16",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: false,
    external: true,
    workstream: "BagelTech",
  },
  {
    title: "Leadership is a routing problem",
    slug: "leadership-is-a-routing-problem",
    excerpt:
      "The strongest leaders do not absorb every decision. They define where decisions belong and what evidence must travel with them.",
    category: "Leadership",
    publishedAt: "2025-09-30",
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com/in/billparris92120",
    featured: false,
    external: true,
    workstream: "Bagelle Parris Vargas",
  },
];
