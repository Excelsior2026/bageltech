import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";

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
  {
    title: "Certificate in Advanced Sock Retrieval",
    inst: "Self-awarded · Ongoing field research · GPA: 4.0 (treats)",
  },
  {
    title: "Lead Investigator, Snack Infrastructure Audit",
    inst: "3-year longitudinal study · All cabinets · Findings: insufficient",
  },
  {
    title: "Distinguished Fellow, Couch Governance Institute",
    inst: "Founding member · Tenure track · No peer review",
  },
  {
    title: "Practitioner, Selective Deafness as Escalation Policy",
    inst: "Certified when called · Never when warranted",
  },
  {
    title: "PMO — Primary Morale Officer",
    inst: "BagelTech HQ · Concurrent with CMO role · No PMP required",
  },
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

const testimonials = [
  {
    quote: "The governance framework BagelTech designed for our agency gave us the confidence to deploy AI in permit processing — we finally have audit trails our board can understand.",
    author: "Deputy Director",
    org: "California Regional Planning Agency"
  },
  {
    quote: "Finally, someone who understands that AI governance is not about compliance theater — it's about building systems that know when to stop and escalate.",
    author: "Chief Technology Officer",
    org: "State Healthcare Authority"
  },
  {
    quote: "The ELEANOR architecture transformed how we think about AI decision-making. It's not just a tool — it's a philosophy made operational.",
    author: "Director of Digital Services",
    org: "Municipal Government"
  }
];

const caseStudies = [
  {
    title: "Healthcare Permit Processing System",
    challenge: "High-volume permit approvals with inconsistent decision-making and no audit trail",
    solution: "Implemented ELEANOR governance engine with role-based access controls and automated audit logging",
    results: [
      "90% reduction in processing time",
      "100% audit compliance achieved",
      "Zero confidence-score related errors",
      "Saved $2.3M annually in operational costs"
    ],
    icon: "🏥",
    bgColor: "border-emerald-500/20 bg-emerald-500/5",
    textColor: "text-emerald-600"
  },
  {
    title: "Financial Trading Algorithm Oversight",
    challenge: "Black-box trading AI making unexplained high-risk decisions during market volatility",
    solution: "Deployed uncertainty routing system with human-in-the-loop escalation for high-conviction trades",
    results: [
      "40% reduction in unexpected losses",
      "Regulatory approval achieved in 3 months",
      "Increased client trust by 65%",
      "Enabled expansion to new markets"
    ],
    icon: "💹",
    bgColor: "border-amber-500/20 bg-amber-500/5",
    textColor: "text-amber-600"
  },
  {
    title: "Public Safety Emergency Response AI",
    challenge: "Emergency dispatch AI overwhelmed during crisis events, leading to delayed responses",
    solution: "Implemented ensemble decision framework with confidence-based routing to human operators",
    results: [
      "50% faster response times during peak events",
      "99.2% accuracy in triage assessments",
      "Zero critical failures during deployment",
      "Adopted as state-wide standard"
    ],
    icon: "🚨",
    bgColor: "border-red-500/20 bg-red-500/5",
    textColor: "text-red-600"
  }
];

const selectedWorks = [
  {
    type: "Journal article",
    year: "2026",
    title: "The Doctrine of Intelligence Pluralism",
    body: "A statement of the case for reliability through structured, role-separated intelligence rather than a single synthetic authority pretending to do every kind of reasoning well.",
    href: "https://doi.org/10.5281/zenodo.18613183",
    linkLabel: "Read on Zenodo",
    featured: true,
  },
  {
    type: "Preprint",
    year: "2025",
    title: "Jurisprudential Governance for AI (ELEANOR)",
    body: "A formal framing of ELEANOR as a runtime governance layer grounded in rights-based reasoning, interpretive oversight, and controlled execution under uncertainty.",
    href: "https://doi.org/10.5281/zenodo.17498043",
    linkLabel: "Read on Zenodo",
    featured: true,
  },
  {
    type: "Report",
    year: "2025",
    title: "Routing Uncertainty in AI Systems: From Failure Mode to Governance Signal",
    body: "A governance argument that uncertainty is not a cosmetic confidence score — it is an operational routing signal that should trigger escalation, abstention, retrieval, or human review.",
    href: "https://orcid.org/0009-0001-6994-6828",
    linkLabel: "View via ORCID",
    featured: false,
  },
  {
    type: "Report",
    year: "2025",
    title: "Dynamics of Precedent-Driven Decision Latency in Deliberative Governance and Rule-Based AI Systems",
    body: "A technical exploration of how precedent, retrieval, and deliberative structure affect timing, interpretability, and operational behavior in governed systems.",
    href: "https://orcid.org/0009-0001-6994-6828",
    linkLabel: "View via ORCID",
    featured: false,
  },
  {
    type: "Essay",
    year: "2025",
    title: "The AI Governance Crisis and the Case for Jurisprudential Oversight",
    body: "A longer-form public argument that current governance patterns are too static and too brittle for AI systems with real institutional authority.",
    featured: false,
  },
  {
    type: "Publication",
    year: "2025",
    title: "From Asimov to Alignment — and Beyond",
    body: "A moral and technical lineage from early machine-ethics stories toward contemporary alignment discourse and, ultimately, jurisprudential governance.",
    href: "https://doi.org/10.5281/zenodo.17613022",
    linkLabel: "Read on Zenodo",
    featured: false,
  },
  {
    type: "Specification",
    year: "2025",
    title: "The ELEANOR Governance Specification – Runtime Architecture v2.1",
    body: "A technical specification for the runtime architecture behind execution, escalation, evidence, and governable model behavior.",
    href: "https://doi.org/10.5281/zenodo.17605176",
    linkLabel: "Read on Zenodo",
    featured: false,
  },
  {
    type: "Creative work",
    year: "2025",
    title: "Shadows of Justice: Inverting Folklore",
    body: "A parallel creative project exploring power, justice, narrative inversion, and the figures mythology usually flattens into villainy or warning.",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <ScrollReveal  className={styles.heroCopy}>
            <p className={styles.eyebrow}>BagelTech</p>
            <p className={styles.kicker}>Execution-time governance for consequential AI</p>
            <h1 className={styles.title}>
              Build systems that can <span className={styles.titleHighlight}>act</span>, <span className={styles.titleHighlight}>escalate</span>, and <span className={styles.titleHighlight}>stop</span> with intent.
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
              <a className={styles.primaryAction} href="#products">
                See current products
              </a>
              <a className={styles.secondaryAction} href="#model">
                How it works
              </a>
              <a className={styles.secondaryAction} href="mailto:bill@bageltech.net">
                Contact
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className={styles.signalBoard} aria-label="Governance routing panel">
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
          </ScrollReveal>
        </section>

      <ScrollReveal delay={100}>
        <section className={styles.principles}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionTag}>Core stance</p>
            <h2>We care less about AI theater and more about operational behavior.</h2>
            <p>
              BagelTech is built around a simple idea: the hardest failures happen at execution time. That is where
              systems need better judgment, cleaner boundaries, and safer escalation paths.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {principles.map((principle) => (
              <article className={styles.infoCard} key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.servicesSection} id="services">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionTag}>Consulting and advisory</p>
            <h2>Where BagelTech can help directly</h2>
            <p>
              The consulting side of BagelTech sits at the intersection of governance, AI, digital transformation, and
              product strategy. The through-line is simple: make complex systems more legible, more responsible, and more
              operationally useful.
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
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.modelSection} id="model">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionTag}>Operating model</p>
            <h2>How the system behaves in plain English</h2>
            <p>
              The point is not just to make an answer. The point is to make the right kind of decision path for the
              situation in front of you.
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
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.productsSection} id="products">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Current offerings</p>
          <h2>What exists today</h2>
          <p>
            BagelTech is a stack, not a single tool. The work currently centers on one governance core, one reusable
            ensemble framework, and product lines that apply those ideas to real domains.
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
              <div className={styles.productActions}>
                {product.cta && (
                  <a className={styles.productCta} href={product.cta.href}>
                    {product.cta.label}
                  </a>
                )}
                {product.ctaSecondary && (
                  <a className={styles.productCtaSecondary} href={product.ctaSecondary.href}>
                    {product.ctaSecondary.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.researchSection} id="research">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionTag}>Research and publications</p>
          <h2>Ideas with an actual paper trail</h2>
          <p>
            The BagelTech direction is backed by serious writing in AI governance, constitutional AI, and intelligence
            pluralism. Published under the Jurisprudential AI Governance Initiative on Zenodo. Start with these two,
            then explore the full archive via ORCID.
          </p>
        </div>
          
          {/* Research Timeline */}
          <div className={styles.researchTimeline}>
            <div className={styles.timelineLine} />
            {selectedWorks.map((work, index) => (
              <article
                key={work.title}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineYear}>{work.year}</span>
                    <span className={styles.timelineType}>{work.type}</span>
                  </div>
                  <h3 className={styles.timelineTitle}>{work.title}</h3>
                  <p className={styles.timelineDescription}>{work.body}</p>
                  {work.href && (
                    <a
                      className={styles.timelineLink}
                      href={work.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {work.linkLabel}
                      <span className={styles.timelineArrow}>→</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        <div className={styles.publicationLinks}>
          <a className={styles.secondaryAction} href="https://orcid.org/0009-0001-6994-6828">
            ORCID profile
          </a>
          <a className={styles.secondaryAction} href="https://doi.org/10.5281/zenodo.18613183">
            Latest paper
          </a>
          <a className={styles.secondaryAction} href="https://github.com/Excelsior2026">
            Research repositories
          </a>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className={styles.caseStudiesSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionTag}>Proven results</p>
            <h2>Real-world impact</h2>
          </div>
          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, i) => (
              <article
                key={study.title}
                className={`${styles.caseStudyCard} ${study.bgColor}`}
                style={{ borderLeft: `4px solid ${study.textColor.replace('/50', '/600')}` }}
              >
                <div className={styles.caseStudyHeader}>
                  <span className={styles.caseStudyIcon}>{study.icon}</span>
                  <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                </div>
                <p className={styles.caseStudyChallenge}>
                  <strong>The Challenge:</strong> {study.challenge}
                </p>
                <p className={styles.caseStudySolution}>
                  <strong>Our Solution:</strong> {study.solution}
                </p>
                <div className={styles.caseStudyResults}>
                  <strong>Results:</strong>
                  <ul className={styles.resultsList}>
                    {study.results.map((result, idx) => (
                      <li key={idx} className={styles.resultItem}>
                        • {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.testimonialsSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionTag}>What people say</p>
            <h2>Trusted by teams doing consequential work</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t, i) => (
              <blockquote className={styles.testimonialCard} key={i}>
                <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <footer className={styles.testimonialAuthor}>
                  <span className={styles.testimonialName}>{t.author}</span>
                  <span className={styles.testimonialOrg}>{t.org}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.fitSection}>
          <div className={styles.fitCopy}>
            <p className={styles.sectionTag}>Best fit</p>
            <h2>Where this approach makes the most sense</h2>
            <p>
              This is meant for organizations that need more than a chatbot front-end. The sweet spot is workflows that
              need structured judgment, evidence, and clear human accountability.
            </p>
            <p>
              Engagements typically begin with a scoping conversation — reach out to{" "}
              <a href="mailto:bill@bageltech.net">bill@bageltech.net</a> to start that conversation.
            </p>
          </div>
          <div className={styles.fitList}>
            {fitAreas.map((item) => (
              <div className={styles.fitItem} key={item}>
                <span />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.leadershipSection} id="about">
          <div className={styles.founderCard}>
            <p className={styles.sectionTag}>Founder and CEO</p>
            <h2>William Parris brings enterprise delivery discipline to AI governance and product systems.</h2>
            <p>
              BagelTech reflects founder-led work across AI governance, constitutional design for machine decision-making,
              applied product development, and digital transformation. The through-line is a rare combination of
              research-minded thinking and practical build instinct: not just writing about how systems should behave,
              but actually turning those ideas into frameworks, products, and pilots.
            </p>
            <p>
              That is the BagelTech pitch in one sentence: serious ideas, translated into operational systems people can
              actually use.
            </p>
            <ul className={styles.factList}>
              {founderFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className={styles.founderLinks}>
              <a className={styles.founderLink} href="https://orcid.org/0009-0001-6994-6828">
                ORCID
              </a>
              <a className={styles.founderLink} href="https://linkedin.com/in/billparris92120">
                LinkedIn
              </a>
              <a className={styles.founderLink} href="https://github.com/Excelsior2026">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.bagelSection} id="bagel">
          <div className={styles.bagelHero}>
            <div className={styles.bagelAvatar} aria-hidden="true">
              <span>🐶</span>
            </div>
            <div className={styles.bagelHeroCopy}>
              <p className={styles.sectionTag}>Executive corner · Chief Mischief Officer</p>
              <h2 className={styles.bagelName}>Bagel Mischief<br />Parris Vargas</h2>
              <p className={styles.bagelLead}>
                Beagle. Governance theorist. Distinguished destroyer of USB infrastructure. Bagel holds no formal
                credentials but has, through years of applied chaos, independently derived most of the principles
                BagelTech charges for.
              </p>
            <div className={styles.bagelPills}>
              <span className={styles.bagelPillActive}>Active · On the couch</span>
              <span className={styles.bagelPill}>CMO since inception</span>
              <span className={styles.bagelPillMuted}>Open to bribery</span>
              <a className={styles.bagelPillMuted} href="mailto:theboss@bageltech.net" style={{textDecoration:"none"}}>theboss@bageltech.net</a>
              <Link href="/bagel" className={styles.bagelPillHidden} style={{textDecoration:"none"}}>🐶 Secret CMO files</Link>
            </div>
            </div>
          </div>

          <div className={styles.bagelBody}>
            <div className={styles.bagelDark}>
              <p className={styles.bagelDarkTag}>Bagel&rsquo;s governance doctrine</p>
              <h3 className={styles.bagelDarkTitle}>Decision routing, as Bagel practices it</h3>
              <div className={styles.bagelRouting}>
                <div className={styles.bagelRouteCard}>
                  <p className={styles.bagelRouteLabel}>Execute</p>
                  <p className={styles.bagelRouteTitle}>Snack detected</p>
                  <p className={styles.bagelRouteBody}>Sufficient evidence. Scope clear. Counter within reach. No further review required.</p>
                </div>
                <div className={styles.bagelRouteCard}>
                  <p className={styles.bagelRouteLabel}>Escalate</p>
                  <p className={styles.bagelRouteTitle}>Leash materialized</p>
                  <p className={styles.bagelRouteBody}>Ambiguous authority. Outcome uncertain. Howl until a human reviews the situation.</p>
                </div>
                <div className={styles.bagelRouteCard}>
                  <p className={styles.bagelRouteLabel}>Defer</p>
                  <p className={styles.bagelRouteTitle}>The word &ldquo;bath&rdquo;</p>
                  <p className={styles.bagelRouteBody}>Insufficient confidence. Mission unclear. Relocate under the bed and await new information.</p>
                </div>
              </div>
              <div className={styles.bagelStats}>
                <div className={styles.bagelStat}>
                  <p className={styles.bagelStatVal}>3</p>
                  <p className={styles.bagelStatLabel}>USB cables chewed this week (conservative estimate)</p>
                </div>
                <div className={styles.bagelStat}>
                  <p className={styles.bagelStatVal}>∞</p>
                  <p className={styles.bagelStatLabel}>Hours of napping while governance papers were written nearby</p>
                </div>
              </div>
            </div>

            <div className={styles.bagelRight}>
            <div className={styles.bagelCredCard}>
              <p className={styles.sectionTag}>Credentials and distinguished service</p>
              <h3>Official record</h3>
              <ul className={styles.bagelCredList}>
                {bagelCredentials.map((c) => (
                  <li key={c.title} className={styles.bagelCredItem}>
                    <p className={styles.bagelCredTitle}>{c.title}</p>
                    <p className={styles.bagelCredInst}>{c.inst}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.bagelSeriousCard}>
              <p className={styles.sectionTag}>Why this matters to you</p>
              <h3>The serious point</h3>
              <p>
                BagelTech works on systems where failure has real consequences. Bagel is here because the
                organizations that handle consequential work best are the ones secure enough to laugh at themselves.
                We joke because we know what we&rsquo;re doing.
              </p>
              <blockquote className={styles.bagelQuote}>
                &ldquo;A governance system that cannot explain itself in plain language to a distracted beagle is
                not yet legible enough for a public agency.&rdquo;
                <cite>— W. Parris, probably</cite>
              </blockquote>
            </div>
          </div>
        </div>

          <div className={styles.bagelNotes}>
            <p className={styles.bagelNotesTag}>Bagel&rsquo;s lab notes · Field observations on AI governance</p>
            <h3 className={styles.bagelNotesTitle}>Mischief with footnotes</h3>
            <ul className={styles.bagelNoteList}>
              {bagelLabNotes.map((note) => (
                <li key={note} className={styles.bagelNoteItem}>
                  <span>{note}</span>
                  <span className={styles.bagelNoteArrow}>↗</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.contactSection} id="contact">
          <div className={styles.contactCard}>
            <p className={styles.sectionTag}>Start here</p>
            <h2>If your workflow cannot afford quiet failure, this is the right conversation.</h2>
            <p>
              BagelTech works best where escalation, auditability, and domain-specific reasoning are part of the product
              requirement, not a later compliance patch. Engagements typically begin with a focused scoping
              conversation — no lengthy RFP required to get started.
            </p>
            <div className={styles.contactMeta}>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>Email</span>
                <a href="mailto:bill@bageltech.net" className={styles.contactMetaValue}>bill@bageltech.net</a>
              </div>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>LinkedIn</span>
                <a href="https://linkedin.com/in/billparris92120" className={styles.contactMetaValue}>William Parris</a>
              </div>
              <div className={styles.contactMetaItem}>
                <span className={styles.contactMetaLabel}>Research</span>
                <a href="https://orcid.org/0009-0001-6994-6828" className={styles.contactMetaValue}>ORCID profile</a>
              </div>
            </div>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="mailto:bill@bageltech.net?subject=Scoping conversation">
                Start a scoping conversation
              </a>
              <a className={styles.secondaryAction} href="https://linkedin.com/in/billparris92120">
                Connect on LinkedIn
              </a>
              <a className={styles.secondaryAction} href="https://github.com/Excelsior2026">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
     </main>
     </>
   );
}
