export interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  icon?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Permitting and licensing workflows",
    challenge: "Operational teams need consistent decision rights, escalation logic, and auditability before automation goes live.",
    solution: "Map the governance path: who can decide, what evidence is required, and when a case must move to human review.",
    results: [
      "Decision thresholds defined up front",
      "Escalation and exception paths made explicit",
      "Review artifacts structured for later audit",
    ],
    icon: "🏛️",
  },
  {
    title: "Public-safety and consequential escalation",
    challenge: "High-stakes workflows cannot rely on one opaque output when urgency, consequence, and ambiguity collide.",
    solution: "Separate machine assistance from operational authority and define when uncertainty must trigger human intervention.",
    results: [
      "Authority boundaries clarified",
      "Human review checkpoints embedded in the flow",
      "Fallback behavior defined for uncertain conditions",
    ],
    icon: "🚨",
  },
  {
    title: "Health-professions education tooling",
    challenge: "Educational AI has to handle ambiguity honestly without flattening nuance or overstating confidence.",
    solution: "Design study and transcription systems that surface uncertainty, preserve context, and keep instructors in control.",
    results: [
      "Confidence-aware output patterns",
      "Instructor intent preserved in workflow design",
      "Clear distinction between notes, inference, and advice",
    ],
    icon: "🏥",
  },
];
