import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Governance, AI, and Decision Systems",
  description:
    "BagelTech builds AI governance systems, ensemble decision frameworks, and domain-specific products for high-stakes environments.",
  openGraph: {
    title: "BagelTech | Governance, AI, and Decision Systems",
    description:
      "Execution-time governance, digital transformation, and product systems designed for traceability, authority, and human accountability.",
    type: "website",
  },
};

const services = [
  {
    title: "AI governance consulting",
    body: "Design execution-time controls, escalation paths, human review models, and accountability structures for consequential AI systems.",
  },
  {
    title: "Digital transformation",
    body: "Modernize workflows, operating models, and decision infrastructure so technology programs actually survive contact with real institutions.",
  },
  {
    title: "ERP and implementation governance",
    body: "Executive oversight for complex enterprise implementations, especially public-sector finance, HR, payroll, procurement, and change management programs.",
  },
  {
    title: "Product and systems strategy",
    body: "Shape new products, pilots, and domain intelligence systems with a focus on operational clarity, traceability, and real-world fit.",
  },
];

const operatingModel = [
  {
    step: "01",
    title: "Interpret the real decision",
    body: "Separate the actual consequential choice from the raw prompt or ticket. Context decides what is safe, relevant, and authorized.",
  },
  {
    step: "02",
    title: "Use structured specialist roles",
    body: "Split reasoning across defined responsibilities so one system is not quietly generating, judging, approving, and executing its own work.",
  },
  {
    step: "03",
    title: "Route by uncertainty and authority",
    body: "Execute when allowed, escalate when risk is material, and defer when the system should not pretend certainty.",
  },
  {
    step: "04",
    title: "Leave an audit trail",
    body: "Capture findings, artifacts, obligations, and rationale so people can later answer what happened and why.",
  },
];

const products = [
  {
    label: "Governance engine",
    title: "ELEANOR",
    status: "Flagship framework",
    body: "A jurisprudential AI runtime governance framework for execution-time oversight, constitutional reasoning, escalation, and auditable decision control.",
    bullets: [
      "Execution, escalate, or defer routing",
      "Multi-critic governance rather than one-model authority",
      "Built for regulated and high-stakes environments",
    ],
  },
  {
    label: "Applied product",
    title: "CogniScribe",
    status: "Active development",
    body: "A lecture transcription and study system designed for clarity, traceability, and respectful handling of uncertainty in health professions education.",
    bullets: [
      "Structured notes and study outputs",
      "Confidence-aware summaries",
      "Education-first workflow design",
    ],
  },
  {
    label: "Framework",
    title: "Ensemble Software Engineering",
    status: "Shipping",
    body: "A reusable ensemble engine that runs specialized AI roles over tasks, pull requests, workflows, and domain-specific cases with reports, reruns, and dashboards.",
    bullets: [
      "Framework mode with user-defined roles",
      "Pack mode with fixed role catalogs",
      "Task, PR, export, dashboard, and replay workflows",
    ],
  },
  {
    label: "Domain intelligence",
    title: "Contract Management Intelligence",
    status: "Pilot",
    body: "A contractor-side intelligence workflow for bid review, agreement risk analysis, insurance and compliance review, and obligation tracking.",
    bullets: [
      "Bid and contract risk analysis",
      "Insurance, funding, and compliance review",
      "Obligation registers and lifecycle monitoring",
    ],
  },
];

const research = [
  {
    title: "The Doctrine of Intelligence Pluralism",
    body: "A research direction on reliability through functional separation and structured coordination rather than monolithic intelligence.",
  },
  {
    title: "Constitutional governance for AI",
    body: "Research and publication work on principled machine governance, moral-risk gradients, and oversight for systems that affect public welfare.",
  },
  {
    title: "ELEANOR whitepapers and narratives",
    body: "Technical and strategic writing that positions runtime governance as a deployable operating layer rather than a compliance afterthought.",
  },
];

const founderFacts = [
  "25+ years of public-sector technology leadership",
  "$15M+ enterprise ERP programs led in California regional government",
  "PMP, CSM, DASSM, and Lean Six Sigma Yellow Belt",
  "Builder of governance frameworks, PMOs, and enterprise transformation programs",
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>BagelTech</p>
          <p className={styles.kicker}>Governance, AI, and decision systems for environments where mistakes matter</p>
          <h1 className={styles.title}>
            Technology with <span>judgment</span>, <span>authority</span>, and <span>traceability</span>.
          </h1>
          <p className={styles.lead}>
            BagelTech builds systems for organizations that cannot afford confident failure. The work spans AI
            governance, digital transformation, enterprise implementation governance, and domain-specific products that
            need to know when to act, when to escalate, and when to stop.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#products">
              Explore products
            </a>
            <a className={styles.secondaryAction} href="#services">
              Consulting services
            </a>
            <a className={styles.secondaryAction} href="mailto:billparris@gmail.com">
              Contact
            </a>
          </div>
        </div>

        <aside className={styles.signalBoard} aria-label="Operating posture">
          <div className={styles.signalHeader}>
            <span>Operating posture</span>
            <span>BagelTech model</span>
          </div>
          <div className={styles.signalGrid}>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Govern</p>
              <h2>Execution-time oversight</h2>
              <p>Move beyond static policy documents into systems that actually control how decisions are routed.</p>
            </article>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Build</p>
              <h2>Deployable products</h2>
              <p>Translate frameworks, papers, and prototypes into usable software rather than leaving them as theory.</p>
            </article>
            <article className={styles.signalCard}>
              <p className={styles.signalLabel}>Transform</p>
              <h2>Institution-ready systems</h2>
              <p>Design for public agencies, regulated domains, and organizations with real accountability pressure.</p>
            </article>
          </div>
          <div className={styles.metricRow}>
            <div>
              <p className={styles.metricValue}>25+ years</p>
              <p className={styles.metricLabel}>Technology leadership and delivery</p>
            </div>
            <div>
              <p className={styles.metricValue}>$15M+</p>
              <p className={styles.metricLabel}>Enterprise implementation oversight</p>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Consulting and advisory</p>
          <h2>High-level strategy with operator-grade realism</h2>
          <p>
            BagelTech is well suited to work that crosses governance, enterprise systems, AI adoption, and digital
            transformation. The emphasis is not hype. It is operating design, responsible execution, and systems that
            make sense under pressure.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {services.map((service) => (
            <article className={styles.infoCard} key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.modelSection} id="model">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Operating model</p>
          <h2>The BagelTech point of view in plain English</h2>
          <p>
            Most AI and transformation failures happen because responsibility is vague, escalation is weak, and no one
            can explain why a decision happened. BagelTech systems are designed to fix that.
          </p>
        </div>
        <div className={styles.timeline}>
          {operatingModel.map((item) => (
            <article className={styles.timelineItem} key={item.step}>
              <p className={styles.timelineStep}>{item.step}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.productsSection} id="products">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Products and frameworks</p>
          <h2>What BagelTech is building</h2>
          <p>
            The company is not built around one isolated app. It is a stack: governance frameworks, reusable ensemble
            infrastructure, and domain products that sit on top of the same core ideas.
          </p>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <article className={styles.productCard} key={product.title}>
              <div className={styles.productHeader}>
                <p className={styles.productLabel}>{product.label}</p>
                <span className={styles.statusPill}>{product.status}</span>
              </div>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <ul>
                {product.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.researchSection} id="research">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Research and publication</p>
          <h2>Serious ideas with a visible paper trail</h2>
          <p>
            The work behind BagelTech includes ongoing writing and research in AI governance, constitutional machine
            oversight, and intelligence pluralism. That research matters because it directly informs the product and
            consulting work.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {research.map((item) => (
            <article className={styles.infoCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.publicationLinks}>
          <a className={styles.secondaryAction} href="https://orcid.org/0009-0001-6994-6828">
            ORCID
          </a>
          <a className={styles.secondaryAction} href="https://github.com/Excelsior2026">
            Research repositories
          </a>
        </div>
      </section>

      <section className={styles.leadershipSection} id="about">
        <div className={styles.founderCard}>
          <p className={styles.sectionTag}>Founder and CEO</p>
          <h2>William Parris brings enterprise delivery discipline to AI governance and product systems.</h2>
          <p>
            William Parris has more than two decades of public-sector technology leadership, including enterprise ERP
            implementation governance, PMO design, executive steering models, and large-scale transformation programs.
            That background gives BagelTech something many AI companies do not have: someone who understands both
            advanced technical ideas and the institutional realities of actually deploying systems in the world.
          </p>
          <p>
            His work spans enterprise implementation oversight, AI readiness and governance frameworks, responsible
            deployment strategy, procurement language, and product design for systems that must remain legible and
            accountable.
          </p>
          <ul className={styles.factList}>
            {founderFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <aside className={styles.mischiefCard}>
          <p className={styles.sectionTag}>Executive corner</p>
          <h3>Bagel Mischief</h3>
          <p>Resident morale officer, cultural influence, and unofficial Chief Mischief Officer of BagelTech.</p>
        </aside>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactCard}>
          <p className={styles.sectionTag}>Contact</p>
          <h2>If the work is consequential, the system should be too.</h2>
          <p>
            BagelTech is a strong fit for organizations working on AI governance, digital transformation, enterprise
            implementation oversight, and high-stakes decision systems.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="mailto:billparris@gmail.com">
              billparris@gmail.com
            </a>
            <a className={styles.secondaryAction} href="https://linkedin.com/in/billparris92120">
              LinkedIn
            </a>
            <a className={styles.secondaryAction} href="https://github.com/Excelsior2026">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
