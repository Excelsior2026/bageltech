export const CONTRACTOR_TEMPLATE_CATALOG_VERSION = 1 as const;

export const CONTRACTOR_TEMPLATE_IDS = [
  "heritage-craft",
  "modern-grid",
  "neighborly-warm",
  "industrial-pro",
  "premium-home",
  "direct-response",
] as const;

export type ContractorTemplateId = (typeof CONTRACTOR_TEMPLATE_IDS)[number];

export type ContractorTemplate = {
  id: ContractorTemplateId;
  name: string;
  description: string;
  character: string;
  idealFor: string;
  accent: string;
  ink: string;
  paper: string;
};

export const CONTRACTOR_TEMPLATES: readonly ContractorTemplate[] = [
  {
    id: "heritage-craft",
    name: "Heritage Craft",
    description:
      "Editorial type, warm copper details, and an established local-service presence.",
    character: "Established · Detailed · Local",
    idealFor: "Long-standing residential and mixed-service contractors",
    accent: "#b86f3d",
    ink: "#102639",
    paper: "#f5efe5",
  },
  {
    id: "modern-grid",
    name: "Modern Grid",
    description:
      "Crisp structure, technical typography, and a bright service-first presentation.",
    character: "Modern · Precise · Clear",
    idealFor: "Growth-minded teams, EV work, and new construction",
    accent: "#2764ff",
    ink: "#111927",
    paper: "#f7f9fc",
  },
  {
    id: "neighborly-warm",
    name: "Neighborly",
    description:
      "Approachable spacing, warm surfaces, and an easy residential-service rhythm.",
    character: "Warm · Familiar · Helpful",
    idealFor: "Home-service teams built around local relationships",
    accent: "#d36f42",
    ink: "#26352e",
    paper: "#fff8ec",
  },
  {
    id: "industrial-pro",
    name: "Industrial Pro",
    description:
      "A high-contrast utility system for commercial, facility, and technical work.",
    character: "Direct · Technical · Capable",
    idealFor: "Commercial service, facilities, and industrial contractors",
    accent: "#f2b632",
    ink: "#11171d",
    paper: "#e8edf1",
  },
  {
    id: "premium-home",
    name: "Premium Home",
    description:
      "Quiet luxury, generous space, and refined presentation for design-led projects.",
    character: "Refined · Calm · Residential",
    idealFor: "Custom homes, lighting design, and premium renovations",
    accent: "#8f6f51",
    ink: "#26231f",
    paper: "#f4f1eb",
  },
  {
    id: "direct-response",
    name: "Direct Response",
    description:
      "A bold call-and-request layout that keeps the customer’s next action visible.",
    character: "Visible · Fast · Action-led",
    idealFor: "Service contractors prioritizing calls and qualified requests",
    accent: "#ffcf33",
    ink: "#10223d",
    paper: "#f7fbff",
  },
] as const;

export function isContractorTemplateId(
  value: unknown,
): value is ContractorTemplateId {
  return (
    typeof value === "string" &&
    CONTRACTOR_TEMPLATE_IDS.includes(value as ContractorTemplateId)
  );
}

export function contractorTemplate(value: unknown) {
  return (
    CONTRACTOR_TEMPLATES.find((template) => template.id === value) ??
    CONTRACTOR_TEMPLATES[0]
  );
}
