import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Governance Systems for Consequential AI",
  description:
    "BagelTech builds execution-time governance systems, AI decision infrastructure, and domain-specific products for organizations that cannot afford confident mistakes.",
  openGraph: {
    title: "BagelTech | Governance Systems for Consequential AI",
    description:
      "Execution-time governance, ensemble decision systems, and domain-specific AI products built for traceability and accountability.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const principles = [
  {
    title: "Authority before automation",
    body: "We separate what a system can do from what it is allowed to do. Capability is not permission.",
  },
  {
    title: "Uncertainty must have somewhere safe to go",
    body: "Good systems do not hide doubt. They escalate, defer, or request review before they bluff.",
  },
  {
    title: "Auditability is part of the product",
    body: "Every consequential decision should leave behind evidence, rationale, and a clean human handoff.",
  },
];

const operatingModel = [
  {
    step: "01",
    title: "Interpret the request",
    body: "Frame the actual decision, not just the raw prompt. Context changes what is safe, relevant, and authorized.",
  },
  {
    step: "02",
    title: "Run specialist lenses",
    body: "Use separate roles or domain packs so one model is not quietly judging its own work.",
  },
  {
    step: "03",
    title: "Route by confidence and authority",
    body: "Execute when allowed, escalate when uncertain, and defer when the system should not pretend certainty.",
  },
  {
    step: "04",
    title: "Capture the decision trail",
    body: "Store artifacts, findings, obligations, and human feedback so the workflow gets safer over time.",
  },
];

const services = [
  {
    title: "AI governance consulting",
    body: "Governance architecture, escalation design, human review models, audit trails, and execution-time safeguards for consequential AI systems.",
  },
  {
    title: "Applied AI strategy",
    body: "Practical product definition for AI systems that must survive real users, edge cases, and operational accountability.",
  },
  {
    title: "Digital transformation",
    body: "Modernization work for organizations that need better workflows, cleaner decision infrastructure, and clearer operating logic.",
  },
  {
    title: "Decision systems design",
    body: "Ensemble workflows, role separation, and domain-specific intelligence products built around structured judgment instead of one-model monoliths.",
  },
];
const products = [
  {
    label: "Governance engine",
    title: "ELEANOR",
    status: "Core platform",
    body: "An execution-time governance engine for consequential AI systems. ELEANOR intercepts decisions before they execute — applying constitutional rights-based reasoning, uncertainty routing, and multi-critic deliberation to determine whether a system should act, escalate, or stop.",
    bullets: [
      "Six-critic lexicographic architecture: Rights → Autonomy → Fairness → Truth → Risk → Pragmatics",
      "Execution, escalation, and defer routing based on risk and authority level",
      "Fail-closed design with full precedent engine and audit trail",
      "Built for regulated environments, public agencies, and high-stakes AI deployments",
    ],
    cta: { label: "Read the governance spec", href: "https://doi.org/10.5281/zenodo.17605176" },
    ctaSecondary: { label: "View on GitHub", href: "https://github.com/Excelsior2026" },
  },
  {
    label: "Applied product",
    title: "CogniScribe",
    status: "Active development",
    body: "A lecture transcription and study companion designed specifically for health professions education. Built around the principle that AI in clinical training must handle uncertainty honestly — never overstating confidence, always surfacing what it does not know.",
    bullets: [
      "Structured notes and evidence-graded study outputs",
      "Confidence-aware summaries that flag low-certainty content",
      "Education-first workflow: respects instructor intent and context",
      "Designed for nursing, PA, medical, and allied health programs",
    ],
    cta: { label: "Request early access", href: "mailto:bill@bageltech.net?subject=CogniScribe early access" },
  },
  {
    label: "Framework",
    title: "Ensemble Software Engineering",
    status: "Shipping",
    body: "A reusable ensemble engine for running specialized AI roles over tasks, pull requests, workflows, or domain-specific cases. Each role has defined scope and authority. No single model quietly generates, judges, approves, and executes its own work.",
    bullets: [
      "Framework mode with user-defined specialist roles",
      "Pack mode with fixed role catalogs for common domains",
      "Task, PR, dashboard, export, and replay workflows",
      "Reports, reruns, and structured comparison built in",
    ],
    cta: { label: "View on GitHub", href: "https://github.com/Excelsior2026" },
  },
  {
    label: "Research tool",
    title: "AIRA — AI-Induced Risk Audit",
    status: "Live",
    body: "A static analysis framework and live web scanner that detects failure patterns systematically introduced by AI-generated code. Grounded in the Reward-Shaped Failure Hypothesis: AI coding agents are trained to suppress visible failure, producing a predictable, non-random class of silent errors that standard code review misses.",
    bullets: [
      "15 structured audit checks across Python and JavaScript/TypeScript",
      "Detects silent exception suppression, ambiguous return contracts, bypass paths, and more",
      "Live web scanner — paste code, upload a file, or point at a GitHub repo",
      "Open-source CLI and VS Code extension · Research dataset collection underway",
    ],
    cta: { label: "Try the scanner", href: "https://aira.bageltech.net" },
    ctaSecondary: { label: "View on GitHub", href: "https://github.com/bageltech/aira-scanner" },
  },
  {
    label: "Domain intelligence",
    title: "Contract Management Intelligence",
    status: "Pilot",
    body: "A contractor-side contract intelligence workflow for reviewing, negotiating, and managing construction and services agreements. Extracts obligations, flags risk, and monitors compliance across the full contract lifecycle.",
    bullets: [
      "Bid and contract risk analysis with structured findings",
      "Insurance, bonding, funding, and compliance review",
      "Obligation registers and lifecycle monitoring dashboards",
      "Designed for subcontractors, GCs, and project owners",
    ],
    cta: { label: "Inquire about pilot", href: "mailto:bill@bageltech.net?subject=CMI pilot inquiry" },
  },
];

const fitAreas = [
  "High-stakes internal operations where mistakes are expensive",
  "Regulated or auditable workflows requiring traceable decisions",
  "Decision support systems with required human review checkpoints",
  "Domain-specific AI products that need explainability and accountability",
  "Public agencies deploying AI under institutional accountability pressure",
];

const bagelCredentials = [
  { title: "Certificate in Advanced Sock Retrieval", inst: "Self-awarded · Ongoing field research · GPA: 4.0 (treats)" },
  { title: "Lead Investigator, Snack Infrastructure Audit", inst: "3-year longitudinal study · All cabinets · Findings: insufficient" },
  { title: "Distinguished Fellow, Couch Governance Institute", inst: "Founding member · Tenure track · No peer review" },
  { title: "Practitioner, Selective Deafness as Escalation Policy", inst: "Certified when called · Never when warranted" },
  { title: "PMO — Primary Morale Officer", inst: "BagelTech HQ · Concurrent with CMO role · No PMP required" },
];

const bagelLabNotes = [
  "AI's moral blind spot — and why a beagle could catch it",
  "The art of chewing through bureaucracy (a field guide)",
  "How to build a PMO without losing your sanity, or your socks",
  "Uncertainty is not a confidence score — it is a routing instruction",
  "Escalation theater: when the dog barks but no one is listening",
];

const founderFacts = [
  "25+ years of public-sector technology leadership",
  "$15M+ enterprise ERP programs led in California regional government",
  "PMP, CSM, DASSM, and Lean Six Sigma Yellow Belt",
  "Builder of governance frameworks, PMOs, and enterprise transformation programs",
  "Published researcher: AI governance, constitutional AI, intelligence pluralism (Zenodo / ORCID)",
];

const selectedWorks = [
  {
    type: "Framework · Tool", year: "2026", title: "AIRA v1.2 — AI-Induced Risk Audit",
    body: "A structured inspection framework and live scanning tool for detecting training-incentive-driven failure patterns in AI-generated code. Introduces the Reward-Shaped Failure Hypothesis as a testable empirical claim about how RLHF shapes failure distribution in codebases.",
    href: "https://aira.bageltech.net", linkLabel: "Try the scanner", featured: true,
  },
  {
    type: "Journal article", year: "2026", title: "The Doctrine of Intelligence Pluralism",
    body: "A statement of the case for reliability through structured, role-separated intelligence rather than a single synthetic authority pretending to do every kind of reasoning well.",
    href: "https://doi.org/10.5281/zenodo.18613183", linkLabel: "Read on Zenodo", featured: true,
  },
  {
    type: "Preprint", year: "2025", title: "Jurisprudential Governance for AI (ELEANOR)",
    body: "A formal framing of ELEANOR as a runtime governance layer grounded in rights-based reasoning, interpretive oversight, and controlled execution under uncertainty.",
    href: "https://doi.org/10.5281/zenodo.17498043", linkLabel: "Read on Zenodo", featured: true,
  },
  {
    type: "Report", year: "2025", title: "Routing Uncertainty in AI Systems: From Failure Mode to Governance Signal",
    body: "A governance argument that uncertainty is not a cosmetic confidence score — it is an operational routing signal that should trigger escalation, abstention, retrieval, or human review.",
    href: "https://orcid.org/0009-0001-6994-6828", linkLabel: "View via ORCID", featured: false,
  },
  {
    type: "Report", year: "2025", title: "Dynamics of Precedent-Driven Decision Latency in Deliberative Governance and Rule-Based AI Systems",
    body: "A technical exploration of how precedent, retrieval, and deliberative structure affect timing, interpretability, and operational behavior in governed systems.",
    href: "https://orcid.org/0009-0001-6994-6828", linkLabel: "View via ORCID", featured: false,
  },
  {
    type: "Essay", year: "2025", title: "The AI Governance Crisis and the Case for Jurisprudential Oversight",
    body: "A longer-form public argument that current governance patterns are too static and too brittle for AI systems with real institutional authority.",
    featured: false,
  },
  {
    type: "Publication", year: "2025", title: "From Asimov to Alignment — and Beyond",
    body: "A moral and technical lineage from early machine-ethics stories toward contemporary alignment discourse and, ultimately, jurisprudential governance.",
    href: "https://doi.org/10.5281/zenodo.17613022", linkLabel: "Read on Zenodo", featured: false,
  },
  {
    type: "Specification", year: "2025", title: "The ELEANOR Governance Specification – Runtime Architecture v2.1",
    body: "A technical specification for the runtime architecture behind execution, escalation, evidence, and governable model behavior.",
    href: "https://doi.org/10.5281/zenodo.17605176", linkLabel: "Read on Zenodo", featured: false,
  },
  {
    type: "Creative work", year: "2025", title: "Shadows of Justice: Inverting Folklore",
    body: "A parallel creative project exploring power, justice, narrative inversion, and the figures mythology usually flattens into villainy or warning.",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>BagelTech</p>
          <p className={styles.kicker}>Execution-time governance for consequential AI</p>
          <h1 className={styles.title}>
            Build systems that can <span>act</span>, <span>escalate</span>, and <span>stop</span> with intent.
          </h1>
          <p className={styles.lead}>
            BagelTech designs AI infrastructure for environments where confident mistakes are expensive. We build
            governance systems, ensemble decision frameworks, and domain-specific products that know when to proceed,
            when to ask for review, and when not to fake certainty.
          </p>
          <p className={styles.audience}>
            Built for public agencies, regulated industries, and enterprises deploying AI in high-stakes environments.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#products">See current products</a>
            <a className={styles.secondaryAction} href="#model">How it works</a>
            <a className={styles.secondaryAction} href="mailto:bill@bageltech.net">Contact</a>
          </div>
        </div>
        <aside className={styles.signalBoard} aria-label="Governance routing panel">
          <div className={styles.signalHeader}>
            <span>Decision routing</span>
            <span>Live operating model</span>
          </div>
          <div className={styles.signalGrid}>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Execute</p>
              <h2>Allowed and evidenced</h2>
              <p>Clear scope, sufficient confidence, and no authority violation.</p>
            </article>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Escalate</p>
              <h2>Human review required</h2>
              <p>Uncertainty, disagreement, or material consequence crosses the safe threshold.</p>
            </article>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Defer</p>
              <h2>Not enough signal</h2>
              <p>Missing evidence or unclear authority means the correct answer is to slow down.</p>
            </article>
          </div>
          <div className={styles.metricRow}>
            <div>
              <p className={styles.metricValue}>Framework</p>
              <p className={styles.metricLabel}>ESE with custom roles or fixed packs</p>
            </div>
            <div>
              <p className={styles.metricValue}>Traceable</p>
              <p className={styles.metricLabel}>Artifacts, reports, and reruns by design</p>
            </div>
          </div>
        </aside>
      </section>
