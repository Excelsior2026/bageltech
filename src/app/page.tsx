import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "BagelTech | Governance Systems for Consequential AI",
  description:
    "BagelTech designs AI governance systems, decision infrastructure, and institutional operating models for environments where confident mistakes are expensive.",
  openGraph: {
    title: "BagelTech | Governance Systems for Consequential AI",
    description:
      "Execution-time governance, ensemble decision systems, and institutional operating models built for traceability and accountability.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const proofPoints = [
  {
    value: "25+ years",
    label: "public-sector technology leadership",
  },
  {
    value: "$15M+",
    label: "ERP implementation programs directed",
  },
  {
    value: "Zenodo + ORCID",
    label: "published work on AI governance and intelligence pluralism",
  },
  {
    value: "Runtime first",
    label: "systems designed around escalation, evidence, and human authority",
  },
];

const serviceTracks = [
  {
    title: "Execution-time AI governance",
    body: "Design the controls that matter after the model responds: authority boundaries, escalation logic, audit trails, and human review checkpoints.",
  },
  {
    title: "Institutional operating design",
    body: "Translate policy, compliance, and operational reality into workflows that teams can actually run under pressure.",
  },
  {
    title: "ERP and transformation oversight",
    body: "Bring program discipline to large operational change efforts where procurement, implementation, and adoption failure carry real cost.",
  },
  {
    title: "Product and decision-system strategy",
    body: "Shape domain-specific tools that need judgment, traceability, and a credible path from prototype to institutional use.",
  },
];

const principles = [
  {
    title: "Authority before capability",
    body: "A system should not act just because it can. Permission, accountability, and institutional role all matter.",
  },
  {
    title: "Uncertainty must route somewhere safe",
    body: "Useful systems escalate, defer, or request review instead of covering ambiguity with confidence theater.",
  },
  {
    title: "Auditability is part of the product",
    body: "If a consequential system cannot explain what happened, why it happened, and who approved it, the design is incomplete.",
  },
];

const operatingModel = [
  {
    step: "01",
    title: "Frame the real decision",
    body: "Separate the operational decision from the raw prompt, request, or ticket.",
  },
  {
    step: "02",
    title: "Run specialist lenses",
    body: "Use role-separated review rather than one model quietly generating, judging, and approving its own output.",
  },
  {
    step: "03",
    title: "Route by authority and risk",
    body: "Execute when scope is clear, escalate when consequence rises, and defer when evidence is missing.",
  },
  {
    step: "04",
    title: "Leave a decision trail",
    body: "Capture rationale, artifacts, and follow-up obligations so people can inspect the process later.",
  },
];

const products = [
  {
    label: "Governance engine",
    title: "ELEANOR",
    stage: "Core framework",
    body: "A runtime governance engine for consequential AI systems built around rights-based reasoning, escalation, and controlled execution under uncertainty.",
    bullets: [
      "Execution, escalation, and defer routing",
      "Role-separated criticism instead of one-model authority",
      "Built for regulated, auditable environments",
    ],
    primaryLabel: "Read the governance specification",
    primaryHref: "https://doi.org/10.5281/zenodo.17605176",
  },
  {
    label: "Applied product",
    title: "CogniScribe",
    stage: "Active development",
    body: "A lecture transcription and study companion for health-professions education, built to handle uncertainty honestly rather than smoothing it away.",
    bullets: [
      "Evidence-graded notes and summaries",
      "Confidence-aware educational outputs",
      "Respect for instructor intent and domain context",
    ],
    primaryLabel: "Request early access",
    primaryHref: "mailto:bill@bageltech.net?subject=CogniScribe early access",
  },
  {
    label: "Framework",
    title: "Ensemble Software Engineering",
    stage: "Shipping",
    body: "A reusable ensemble engine for running specialist AI roles across tasks, pull requests, workflows, and domain-specific operating packs.",
    bullets: [
      "User-defined specialist roles",
      "Pack-based workflows for repeatable review",
      "Reports, reruns, and comparative outputs",
    ],
    primaryLabel: "View the GitHub profile",
    primaryHref: "https://github.com/Excelsior2026",
  },
  {
    label: "Domain intelligence",
    title: "Contract Management Intelligence",
    stage: "Pilot",
    body: "A contractor-side intelligence workflow for agreement review, obligation tracking, and compliance analysis across the contract lifecycle.",
    bullets: [
      "Structured risk review for bids and agreements",
      "Compliance, insurance, and funding checks",
      "Lifecycle monitoring and obligation capture",
    ],
    primaryLabel: "Discuss a pilot",
    primaryHref: "mailto:bill@bageltech.net?subject=Contract intelligence pilot",
  },
];

const publications = [
  {
    type: "Journal article",
    year: "2026",
    title: "The Doctrine of Intelligence Pluralism",
    body: "A case for reliability through structured, role-separated intelligence rather than a single synthetic authority pretending to do every kind of reasoning well.",
    href: "https://doi.org/10.5281/zenodo.18613183",
    linkLabel: "Read on Zenodo",
  },
  {
    type: "Preprint",
    year: "2025",
    title: "Jurisprudential Governance for AI (ELEANOR)",
    body: "A formal framing of runtime governance grounded in rights-based reasoning, interpretive oversight, and controlled execution.",
    href: "https://doi.org/10.5281/zenodo.17498043",
    linkLabel: "Read on Zenodo",
  },
  {
    type: "Report",
    year: "2025",
    title: "Routing Uncertainty in AI Systems",
    body: "An argument that uncertainty is an operational routing signal, not a cosmetic confidence score.",
    href: "https://orcid.org/0009-0001-6994-6828",
    linkLabel: "View via ORCID",
  },
  {
    type: "Specification",
    year: "2025",
    title: "The ELEANOR Governance Specification – Runtime Architecture v2.1",
    body: "A technical specification for the architecture behind execution, escalation, evidence capture, and governable model behavior.",
    href: "https://doi.org/10.5281/zenodo.17605176",
    linkLabel: "Read on Zenodo",
  },
];

const founderHighlights = [
  "25+ years leading public-sector technology and operational change",
  "$15M+ enterprise ERP programs led in California regional government",
  "PMP, CSM, DASSM, and Lean Six Sigma Yellow Belt",
  "Builder of governance frameworks, PMOs, and institutional delivery models",
  "Published research across AI governance, constitutional AI, and intelligence pluralism",
];

const fitAreas = [
  "Public agencies and regulated operators",
  "ERP and enterprise modernization programs",
  "Decision workflows that require human review",
  "AI products that need auditability and authority boundaries",
];

export default function HomePage() {
  const featuredPublication = publications[0];
  const otherPublications = publications.slice(1);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <ScrollReveal className={styles.heroCopy}>
              <p className={styles.eyebrow}>BagelTech</p>
              <h1 className={styles.heroTitle}>Governance systems for decisions that cannot fail quietly.</h1>
              <p className={styles.heroLead}>
                BagelTech helps institutions design AI and operational systems that know when to act, when to
                escalate, and when to stop. The work spans governance architecture, transformation oversight, and
                products built for environments where confident mistakes are expensive.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#contact">
                  Start a scoping conversation
                </a>
                <a className={styles.secondaryAction} href="#products">
                  View current work
                </a>
              </div>
              <ul className={styles.audienceList} aria-label="Best fit">
                {fitAreas.map((item) => (
                  <li className={styles.audienceItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal className={styles.heroAside} delay={140}>
              <div className={styles.signalPanel}>
                <p className={styles.panelTag}>Operating doctrine</p>
                <ol className={styles.signalList}>
                  {operatingModel.map((item) => (
                    <li className={styles.signalItem} key={item.step}>
                      <span className={styles.signalStep}>{item.step}</span>
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={styles.statGrid}>
                {proofPoints.map((point) => (
                  <article className={styles.statCard} key={point.label}>
                    <p className={styles.statValue}>{point.value}</p>
                    <p className={styles.statLabel}>{point.label}</p>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section} id="services">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionTag}>Services</p>
                <h2 className={styles.sectionTitle}>Institution-ready work, not AI theater.</h2>
              </div>
              <p className={styles.sectionLead}>
                BagelTech is strongest where governance, operations, and product design intersect. The work is less
                about glossy demos and more about building systems that remain legible when the stakes rise.
              </p>
            </ScrollReveal>

            <div className={styles.serviceGrid}>
              {serviceTracks.map((service) => (
                <article className={styles.serviceItem} key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} id="model">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={`${styles.sectionTag} ${styles.sectionTagDark}`}>Method</p>
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
                  The model is simple: separate judgment, route uncertainty, leave evidence behind.
                </h2>
              </div>
              <p className={`${styles.sectionLead} ${styles.sectionLeadDark}`}>
                BagelTech approaches consequential systems as operating models, not just interfaces. That means clear
                authority, deliberate escalation, and human accountability built into the path of execution.
              </p>
            </ScrollReveal>

            <div className={styles.modelGrid}>
              <div className={styles.principleList}>
                {principles.map((principle, index) => (
                  <article className={styles.principleItem} key={principle.title}>
                    <p className={styles.principleIndex}>0{index + 1}</p>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </article>
                ))}
              </div>

              <div className={styles.workflowList}>
                {operatingModel.map((item) => (
                  <article className={styles.workflowItem} key={item.step}>
                    <p className={styles.workflowStep}>{item.step}</p>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="products">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionTag}>Current work</p>
                <h2 className={styles.sectionTitle}>A governance core, reusable frameworks, and applied domain tools.</h2>
              </div>
              <p className={styles.sectionLead}>
                BagelTech is not one product pretending to solve everything. It is a set of related programs built
                around governable decision-making, institutional traceability, and operational realism.
              </p>
            </ScrollReveal>

            <div className={styles.productList}>
              {products.map((product) => (
                <article className={styles.productRow} key={product.title}>
                  <div className={styles.productMeta}>
                    <p className={styles.productLabel}>{product.label}</p>
                    <p className={styles.productStage}>{product.stage}</p>
                  </div>
                  <div className={styles.productBody}>
                    <h3>{product.title}</h3>
                    <p>{product.body}</p>
                    <ul className={styles.productBullets}>
                      {product.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.productActionWrap}>
                    <a className={styles.textAction} href={product.primaryHref}>
                      {product.primaryLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="research">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionTag}>Publications</p>
                <h2 className={styles.sectionTitle}>Research with a paper trail, not just a slogan.</h2>
              </div>
              <p className={styles.sectionLead}>
                The governance direction behind BagelTech is grounded in published work on runtime oversight,
                intelligence pluralism, constitutional governance, and uncertainty routing.
              </p>
            </ScrollReveal>

            <ScrollReveal className={styles.featuredPublication} delay={100}>
              <div className={styles.featuredMeta}>
                <p className={styles.featuredType}>{featuredPublication.type}</p>
                <p className={styles.featuredYear}>{featuredPublication.year}</p>
              </div>
              <div className={styles.featuredBody}>
                <h3>{featuredPublication.title}</h3>
                <p>{featuredPublication.body}</p>
              </div>
              <a className={styles.textAction} href={featuredPublication.href}>
                {featuredPublication.linkLabel}
              </a>
            </ScrollReveal>

            <div className={styles.publicationList}>
              {otherPublications.map((publication) => (
                <article className={styles.publicationRow} key={publication.title}>
                  <div className={styles.publicationMeta}>
                    <p>{publication.year}</p>
                    <p>{publication.type}</p>
                  </div>
                  <div className={styles.publicationBody}>
                    <h3>{publication.title}</h3>
                    <p>{publication.body}</p>
                  </div>
                  <a className={styles.textAction} href={publication.href}>
                    {publication.linkLabel}
                  </a>
                </article>
              ))}
            </div>

            <div className={styles.researchFooter}>
              <a className={styles.secondaryAction} href="https://orcid.org/0009-0001-6994-6828">
                ORCID profile
              </a>
              <a className={styles.secondaryAction} href="https://github.com/Excelsior2026">
                GitHub profile
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section} id="about">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.aboutGrid}>
              <div className={styles.aboutPrimary}>
                <p className={styles.sectionTag}>About</p>
                <h2 className={styles.sectionTitle}>
                  William Parris brings enterprise delivery discipline to AI governance and decision systems.
                </h2>
                <p className={styles.sectionLead}>
                  BagelTech sits at the intersection of governance research, product design, and operational delivery.
                  The through-line is practical: translate serious ideas into systems that institutions can actually
                  adopt, inspect, and trust.
                </p>
                <ul className={styles.profileList}>
                  {founderHighlights.map((item) => (
                    <li className={styles.profileItem} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.aboutAside}>
                <div className={styles.notePanel}>
                  <p className={styles.noteTag}>Good fit</p>
                  <ul className={styles.noteList}>
                    {fitAreas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.notePanel}>
                  <p className={styles.noteTag}>Elsewhere</p>
                  <div className={styles.linkStack}>
                    <a href="https://orcid.org/0009-0001-6994-6828">ORCID</a>
                    <a href="https://linkedin.com/in/billparris92120">LinkedIn</a>
                    <a href="https://github.com/Excelsior2026">GitHub</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section} id="contact">
          <div className={styles.sectionInner}>
            <ScrollReveal className={styles.contactPanel}>
              <div className={styles.contactCopy}>
                <p className={styles.contactTag}>Start here</p>
                <h2>Need a governance model that can survive contact with a real institution?</h2>
                <p>
                  Engagements usually begin with a focused scoping conversation: what decisions matter, what authority
                  exists today, where uncertainty goes, and what must be reviewable later.
                </p>
              </div>

              <div className={styles.contactActions}>
                <a className={styles.primaryAction} href="mailto:bill@bageltech.net?subject=Scoping conversation">
                  Email Bill
                </a>
                <a className={styles.secondaryAction} href="https://linkedin.com/in/billparris92120">
                  Connect on LinkedIn
                </a>
                <div className={styles.contactList}>
                  <p>
                    <span>Email</span>
                    <a href="mailto:bill@bageltech.net">bill@bageltech.net</a>
                  </p>
                  <p>
                    <span>Research</span>
                    <a href="https://orcid.org/0009-0001-6994-6828">ORCID archive</a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className={styles.footerNote}>
              <p>BagelTech research is published publicly through ORCID and Zenodo.</p>
              <p>
                Quiet easter egg: <Link href="/bagel">Bagel&apos;s office</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
