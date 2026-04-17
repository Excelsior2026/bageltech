export type PublicationType = "Research" | "Framework" | "Specification" | "Essay" | "Report";

export interface PublicationItem {
  title: string;
  slug: string;
  summary: string;
  category: PublicationType;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  featured: boolean;
  external: boolean;
  workstream: "BDB Labs" | "BagelTech" | "Bagelle Parris Vargas";
  tags: string[];
}

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: "The Doctrine of Intelligence Pluralism",
    slug: "doctrine-of-intelligence-pluralism",
    summary:
      "A framework for reliability through structured, role-separated intelligence rather than one synthetic authority.",
    category: "Research",
    publishedAt: "2026-01-15",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.18613183",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["AI governance", "ensemble reasoning", "research"],
  },
  {
    title: "The ELEANOR Governance Specification - Runtime Architecture v2.1",
    slug: "eleanor-governance-specification",
    summary:
      "A technical specification for execution, escalation, evidence capture, and governable model behavior.",
    category: "Specification",
    publishedAt: "2025-12-10",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17605176",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["runtime governance", "auditability", "specification"],
  },
  {
    title: "Jurisprudential Governance for AI (ELEANOR)",
    slug: "jurisprudential-governance-for-ai",
    summary:
      "A rights-based governance framing for controlled AI execution under uncertainty and institutional authority.",
    category: "Framework",
    publishedAt: "2025-11-20",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17498043",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["ELEANOR", "rights", "oversight"],
  },
  {
    title: "Routing Uncertainty in AI Systems",
    slug: "routing-uncertainty-in-ai-systems",
    summary:
      "An argument that uncertainty should trigger routing, escalation, abstention, retrieval, or human review.",
    category: "Report",
    publishedAt: "2025-10-05",
    source: "ORCID",
    sourceUrl: "https://orcid.org/0009-0001-6994-6828",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["uncertainty", "human review", "operations"],
  },
  {
    title: "Ensemble Software Engineering",
    slug: "ensemble-software-engineering",
    summary:
      "A practical method for using specialist roles, repeatable packs, and comparative review in AI-assisted engineering.",
    category: "Framework",
    publishedAt: "2025-09-18",
    source: "GitHub",
    sourceUrl: "https://github.com/Excelsior2026",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["engineering", "roles", "review"],
  },
  {
    title: "Governance Systems for Consequential Decisions",
    slug: "governance-systems-for-consequential-decisions",
    summary:
      "A concise operating thesis for designing decision systems around authority, evidence, escalation, and review.",
    category: "Essay",
    publishedAt: "2025-08-21",
    source: "BagelTech",
    sourceUrl: "/publications",
    featured: false,
    external: false,
    workstream: "BagelTech",
    tags: ["governance", "product strategy", "institutions"],
  },
];
