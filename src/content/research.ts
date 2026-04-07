export interface ResearchItem {
  type: string;
  year: string;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
  featured?: boolean;
}

export const RESEARCH: ResearchItem[] = [
  {
    type: "Journal Article",
    year: "2026",
    title: "The Doctrine of Intelligence Pluralism",
    body: "A framework for reliability through structured, role-separated intelligence rather than a single authority.",
    href: "https://doi.org/10.5281/zenodo.18613183",
    linkLabel: "Read on Zenodo",
  },
  {
    type: "Preprint",
    year: "2025",
    title: "Jurisprudential Governance for AI (ELEANOR)",
    body: "Runtime governance layer grounded in rights-based reasoning and controlled execution under uncertainty.",
    href: "https://doi.org/10.5281/zenodo.17498043",
    linkLabel: "Read on Zenodo",
  },
  {
    type: "Report",
    year: "2025",
    title: "Routing Uncertainty in AI Systems",
    body: "Uncertainty as a routing signal that triggers escalation, abstention, retrieval, or human review.",
    href: "https://orcid.org/0009-0001-6994-6828",
    linkLabel: "View via ORCID",
  }
];
