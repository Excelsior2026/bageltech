import type { BrandKey } from "./brand-tokens";

export interface Workstream {
  title: string;
  slug: string;
  brand: BrandKey;
  href: string;
  role: string;
  summary: string;
  description: string;
  audience: string;
  bullets: string[];
  cta: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ProductItem {
  title: string;
  slug: string;
  status: string;
  category: string;
  summary: string;
  audience: string;
  problem: string;
  approach: string;
  href: string;
}

export interface AdvisoryOffer {
  title: string;
  slug: string;
  summary: string;
  audience: string;
  outcomes: string[];
  href: string;
}

export const EXTERNAL_LINKS = {
  email: "mailto:bill@bageltech.net",
  scoping: "mailto:bill@bageltech.net?subject=BagelTech scoping conversation",
  product: "mailto:bill@bageltech.net?subject=Product or platform inquiry",
  research: "mailto:bill@bageltech.net?subject=Research collaboration inquiry",
  advisory: "mailto:bill@bageltech.net?subject=Advisory or speaking inquiry",
  linkedin: "https://linkedin.com/in/billparris92120",
  github: "https://github.com/Excelsior2026",
  orcid: "https://orcid.org/0009-0001-6994-6828",
};

export const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
  alt: "A quiet modern workspace with tables, glass, and natural light.",
};

export const WORKSTREAMS: Workstream[] = [
  {
    title: "BagelTech",
    slug: "bageltech",
    brand: "bageltech",
    href: "/bageltech",
    role: "Products and platforms",
    summary: "Governable AI systems, decision workflows, and institution-facing commercial offerings.",
    description:
      "BagelTech is the commercial front door for products, pilots, and platform work that need control, evidence, and auditability.",
    audience: "For institutions, operators, and product partners building systems with real consequences.",
    bullets: ["Flagship products", "Commercial pilots", "Governance implementation"],
    cta: "Explore BagelTech",
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: "A worktable with documents, charts, and a laptop used for planning.",
    },
  },
  {
    title: "BDB Labs",
    slug: "bdb-labs",
    brand: "bdb-labs",
    href: "/bdb-labs",
    role: "Research and incubation",
    summary: "Research, publications, frameworks, prototypes, and emerging methods.",
    description:
      "BDB Labs develops and tests the concepts behind BagelTech: governance methods, ensemble reasoning, prototypes, and publishable frameworks.",
    audience: "For collaborators, researchers, technical readers, and institutions exploring what should exist next.",
    bullets: ["Research themes", "Frameworks and prototypes", "Publications"],
    cta: "Visit BDB Labs",
    image: {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      alt: "A small team working around laptops in a research and product workspace.",
    },
  },
  {
    title: "Bagelle Parris Vargas",
    slug: "bagelle-parris-vargas",
    brand: "bpv",
    href: "/bagelle-parris-vargas",
    role: "Executive advisory",
    summary: "Executive advisory, modernization, transformation, ERP/PMO oversight, and speaking.",
    description:
      "Bagelle Parris Vargas is the advisory lane for leadership teams navigating modernization, AI governance, ERP oversight, and delivery risk.",
    audience: "For executives, public-sector leaders, and delivery sponsors who need experienced transformation counsel.",
    bullets: ["Modernization advisory", "ERP and PMO oversight", "Speaking and workshops"],
    cta: "Explore Advisory",
    image: {
      src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
      alt: "Executives in a focused meeting around a conference table.",
    },
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    title: "ELEANOR",
    slug: "eleanor",
    status: "Core framework",
    category: "Governance engine",
    summary:
      "A runtime governance engine for consequential AI systems built around rights-based reasoning, escalation, and controlled execution.",
    audience: "Regulated teams and institution-facing AI systems.",
    problem: "Model output often reaches users before authority, evidence, and escalation paths are clear.",
    approach: "Separate execution from oversight and route uncertainty through explicit controls.",
    href: "https://doi.org/10.5281/zenodo.17605176",
  },
  {
    title: "CogniScribe",
    slug: "cogniscribe",
    status: "Active development",
    category: "Applied product",
    summary:
      "A lecture transcription and study companion for health-professions education, designed to preserve context and signal uncertainty.",
    audience: "Health-professions education programs and students.",
    problem: "Educational AI can flatten nuance and overstate confidence when instructors need fidelity.",
    approach: "Evidence-graded notes, instructor-aware summaries, and clear distinctions between notes and inference.",
    href: "mailto:bill@bageltech.net?subject=CogniScribe early access",
  },
  {
    title: "Contract Management Intelligence",
    slug: "contract-management-intelligence",
    status: "Pilot",
    category: "Domain intelligence",
    summary:
      "A contractor-side intelligence workflow for agreement review, obligation tracking, and compliance analysis.",
    audience: "Organizations managing bids, agreements, compliance, and contract lifecycle risk.",
    problem: "Contract obligations and exceptions are often scattered across documents, reviews, and decisions.",
    approach: "Structure review around risk, obligations, insurance, funding checks, and lifecycle monitoring.",
    href: "mailto:bill@bageltech.net?subject=Contract intelligence pilot",
  },
];

export const ADVISORY_OFFERS: AdvisoryOffer[] = [
  {
    title: "Modernization and transformation oversight",
    slug: "modernization-transformation-oversight",
    summary:
      "Executive support for programs where technology, procurement, process change, and adoption risk need one accountable operating model.",
    audience: "Public agencies, regulated operators, and executive sponsors.",
    outcomes: ["Decision cadence", "Risk escalation path", "Delivery governance", "Sponsor-ready evidence"],
    href: EXTERNAL_LINKS.advisory,
  },
  {
    title: "ERP / PMO governance review",
    slug: "erp-pmo-governance-review",
    summary:
      "A focused review of enterprise delivery controls, ownership, reporting, and implementation readiness.",
    audience: "Leadership teams preparing for or recovering large platform implementations.",
    outcomes: ["Delivery controls", "Role clarity", "Program health signals", "Remediation priorities"],
    href: EXTERNAL_LINKS.advisory,
  },
  {
    title: "AI governance workshops",
    slug: "ai-governance-workshops",
    summary:
      "Facilitated sessions that translate governance principles into usable decision rights, escalation rules, and review artifacts.",
    audience: "Teams moving from AI policy into operational design.",
    outcomes: ["Authority map", "Use-case boundaries", "Review checkpoints", "Implementation next steps"],
    href: EXTERNAL_LINKS.advisory,
  },
];

export const METHOD_TILES = [
  {
    title: "Evidence",
    body: "Decisions should carry enough source material, rationale, and context to be reviewed later.",
  },
  {
    title: "Consequence-aware systems",
    body: "The design changes when an error harms people, budgets, compliance, or public trust.",
  },
  {
    title: "Auditability",
    body: "Important actions need a trail: what happened, why it happened, and who had authority.",
  },
  {
    title: "Leadership credibility",
    body: "Transformation work only survives when governance fits the institution that must run it.",
  },
];

export const PROOF_POINTS = [
  { value: "25+ years", label: "public-sector technology and operational leadership" },
  { value: "$15M+", label: "enterprise ERP implementation programs directed" },
  { value: "PMP / CSM / DASSM", label: "delivery and agile leadership credentials" },
  { value: "ORCID + Zenodo", label: "public research trail in AI governance and decision systems" },
];

export const CONTACT_OPTIONS = [
  {
    title: "Product or platform",
    summary: "Discuss pilots, implementation, early access, or a product partnership.",
    href: EXTERNAL_LINKS.product,
  },
  {
    title: "Research or collaboration",
    summary: "Talk about papers, frameworks, prototypes, or BDB Labs collaboration.",
    href: EXTERNAL_LINKS.research,
  },
  {
    title: "Advisory or speaking",
    summary: "Request executive advisory, modernization support, workshops, or speaking.",
    href: EXTERNAL_LINKS.advisory,
  },
  {
    title: "General inquiry",
    summary: "Start with a short note and route the conversation from there.",
    href: EXTERNAL_LINKS.email,
  },
];
