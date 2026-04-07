export interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  icon?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Permit Processing Efficiency",
    challenge: "High-volume permits with inconsistent decisions and missing audit trails",
    solution: "Applied ELEANOR governance to route decisions with audit trails",
    results: ["90% faster processing", "Audit-ready decisions", "Reduced retries by 40%"],
    icon: "🏛️",
  },
  {
    title: "Public Safety AI Deployment",
    challenge: "Uncertain routing during crises",
    solution: "Ensembled decision framework with escalation to human operator",
    results: ["50% faster response", "97% accuracy in triage"],
    icon: "🚨",
  },
  {
    title: "Healthcare Education Transcript",
    challenge: "Uncertain outputs and inconsistent note-taking",
    solution: "CogniScribe with uncertainty flags",
    results: ["Improved study notes", "Higher student satisfaction"],
    icon: "🏥",
  },
];
