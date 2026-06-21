/**
 * publications.ts
 * ───────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for everything under "Research" and in the
 * "Selected work" strip on the homepage. If a paper isn't in this list it
 * doesn't appear on the site; if it's here, it does.
 *
 * TO ADD A PAPER:
 *   1. Copy one { ... } block and paste it into the array below.
 *   2. Fill in the fields (reference is under the interface).
 *   3. Make sure `sourceUrl` is a real, permanent link that OPENS — a DOI
 *      (https://doi.org/10.5281/zenodo.XXXXXXXX) or an arXiv abstract
 *      (https://arxiv.org/abs/XXXX.XXXXX). NEVER an internal path like
 *      "/my-paper" — internal paths are exactly what produced the old
 *      broken links.
 *   4. Save, commit, push. Vercel redeploys automatically (~1 minute).
 *
 * TO REMOVE A PAPER:  delete its block.
 * TO FEATURE ONE on the homepage strip:  set `featured: true`.
 *
 * Every sourceUrl below was checked and resolves (HTTP 200) as of June 2026.
 * This file replaces the publication entries that used to live in
 * writing.ts and research.ts.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type PublicationType =
  | "Research"
  | "Framework"
  | "Specification"
  | "Essay"
  | "Report";

export interface PublicationItem {
  title: string;
  slug: string;            // unique id (also used if detail pages are added later)
  summary: string;         // one or two plain-language sentences
  category: PublicationType;
  publishedAt: string;     // "YYYY-MM-DD" — controls sort order (newest first)
  source: string;          // where it lives, e.g. "arXiv" or "Zenodo"
  sourceUrl: string;       // permanent, working link (DOI / arXiv abstract)
  featured: boolean;       // true => shown in the homepage "Selected work" strip
  external: boolean;       // true => link opens sourceUrl on its host site
  workstream: "BDB Labs" | "BagelTech" | "Bagelle Parris Vargas";
  tags: string[];
  theme?: string;          // optional grouping label used on the Research page
}

export const PUBLICATIONS: PublicationItem[] = [
  // ── Public-sector modernization & institutional governance ────────────────
  {
    title: "Legacy Systems as Institutional Memory Infrastructure",
    slug: "legacy-systems-institutional-memory",
    summary:
      "A continuity-centered framework for public-sector modernization that treats legacy systems as carriers of institutional memory, not just technical debt.",
    category: "Research",
    publishedAt: "2026-03-01",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.20249104",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["public sector", "modernization", "institutional memory"],
    theme: "Public-sector modernization & institutional governance",
  },
  {
    title: "Dynamics of Precedent-Driven Decision Latency",
    slug: "precedent-driven-decision-latency",
    summary:
      "How precedent shapes the speed of decisions in both deliberative governance and rule-based AI systems — and what that implies for accountable automation.",
    category: "Report",
    publishedAt: "2025-11-05",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17766885",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["governance", "decision latency", "public sector"],
    theme: "Public-sector modernization & institutional governance",
  },

  // ── Constitutional governance for AI (the ELEANOR program) ────────────────
  {
    title: "The ELEANOR Governance Specification — Runtime Architecture v2.1",
    slug: "eleanor-governance-specification",
    summary:
      "The technical specification for ELEANOR: how a governable system executes, escalates, captures evidence, and stays within rights-based constraints at runtime.",
    category: "Specification",
    publishedAt: "2025-12-10",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17605176",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["ELEANOR", "runtime governance", "specification"],
    theme: "Constitutional governance for AI",
  },
  {
    title: "Jurisprudential Governance for AI (ELEANOR)",
    slug: "jurisprudential-governance-for-ai",
    summary:
      "A rights-based, jurisprudential framing for AI governance — an ethical leadership engine that navigates rights-based reasoning under uncertainty and institutional authority.",
    category: "Framework",
    publishedAt: "2025-11-20",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17498043",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["ELEANOR", "rights-based", "oversight"],
    theme: "Constitutional governance for AI",
  },

  // ── How AI systems fail — and how to catch it ─────────────────────────────
  {
    title: "AIRA: AI-Induced Risk Audit",
    slug: "aira-ai-induced-risk-audit",
    summary:
      "A structured inspection framework for AI-generated code, documenting a roughly 44:1 gap between what deterministic analysis finds and what models report about their own output, across ~1,000 repositories.",
    category: "Research",
    publishedAt: "2026-04-20",
    source: "arXiv",
    sourceUrl: "https://arxiv.org/abs/2604.17587",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["code inspection", "AI risk", "empirical"],
    theme: "How AI systems fail — and how to catch it",
  },
  {
    title: "Semantic Reward Collapse",
    slug: "semantic-reward-collapse",
    summary:
      "A theoretical account of how reward shaping can quietly erode a model's truthfulness — and what it takes to preserve epistemic integrity in adaptive AI systems.",
    category: "Research",
    publishedAt: "2026-05-12",
    source: "arXiv",
    sourceUrl: "https://arxiv.org/abs/2605.12406",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["reward shaping", "epistemic integrity", "alignment"],
    theme: "How AI systems fail — and how to catch it",
  },
  {
    title: "Routing Uncertainty in AI Systems",
    slug: "routing-uncertainty-in-ai-systems",
    summary:
      "From failure mode to governance signal: a model that routes uncertain cases to escalation, abstention, retrieval, or human review instead of guessing.",
    category: "Report",
    publishedAt: "2025-10-05",
    source: "Zenodo",
    // Re-linked to the real Zenodo deposit. The old file pointed this at the
    // ORCID profile page, which is why it never landed on the actual paper.
    sourceUrl: "https://doi.org/10.5281/zenodo.18100465",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["uncertainty", "escalation", "human review"],
    theme: "How AI systems fail — and how to catch it",
  },

  // ── Doctrine & foundations ────────────────────────────────────────────────
  {
    title: "The Doctrine of Intelligence Pluralism",
    slug: "doctrine-of-intelligence-pluralism",
    summary:
      "The keystone argument: reliability through structured, role-separated intelligence rather than one synthetic authority, framed by four laws of mutual intelligence.",
    category: "Framework",
    publishedAt: "2026-01-15",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.18613183",
    featured: true,
    external: true,
    workstream: "BDB Labs",
    tags: ["AI governance", "intelligence pluralism", "doctrine"],
    theme: "Doctrine & foundations",
  },
  {
    title: "From Asimov to Alignment — and Beyond",
    slug: "from-asimov-to-alignment",
    summary:
      "An essay tracing the moral evolution of machine ethics, from Asimov's laws through modern alignment to constitutional governance.",
    category: "Essay",
    publishedAt: "2025-10-20",
    source: "Zenodo",
    sourceUrl: "https://doi.org/10.5281/zenodo.17613021",
    featured: false,
    external: true,
    workstream: "BDB Labs",
    tags: ["machine ethics", "alignment", "history"],
    theme: "Doctrine & foundations",
  },
];
