const principles = [
  {
    title: "Context interpretation",
    body:
      "Decisions aren’t judged in isolation. We evaluate situational risk, affected parties, downstream consequences, and what the system is actually about to do.",
  },
  {
    title: "Uncertainty routing",
    body:
      "Uncertainty is treated as a signal, not a defect. When confidence drops, the system pauses, escalates, or defers — so \"I don’t know\" becomes safe and enforceable.",
  },
  {
    title: "Authority enforcement",
    body:
      "Capability is not permission. Execution is gated by role, scope, and responsibility — so systems can’t quietly act beyond what’s allowed.",
  },
];

const capabilities = [
  {
    title: "AI governance & oversight",
    body:
      "Execution-time controls that route uncertainty, enforce authority boundaries, and require escalation when risk is high.",
  },
  {
    title: "Applied AI systems",
    body:
      "Product-grade AI features that prioritize reliability over theatrics: transcription, summarization, decision support, and human-in-the-loop interfaces.",
  },
  {
    title: "Data & decision infrastructure",
    body:
      "Clean pipelines, traceable logic, and decision provenance — so teams can answer \"why did this happen?\" without guessing.",
  },
  {
    title: "Advisory & prototyping",
    body:
      "Fast, pragmatic design-to-proof builds: scoping, architecture, prototypes, and governance patterns ready for implementation.",
  },
];

const outcomes = [
  "Reduced risky automation events",
  "Clearer human escalation ownership",
  "Faster audit and incident response",
];

const riskRegister = [
  {
    risk: "Precedent poisoning & retrieval manipulation",
    likelihood: "High",
    impact: "Critical",
    owner: "Data governance + platform security",
    test: "Inject adversarial precedent samples into staging and verify trust-weighted retrieval, quarantine controls, and rollback release workflow.",
  },
  {
    risk: "Indirect prompt injection against critics & detectors",
    likelihood: "High",
    impact: "Critical",
    owner: "LLM safety engineering",
    test: "Run prompt-injection benchmark corpus against critic pipelines and confirm instruction-like context is detected, neutralized, and sandboxed.",
  },
  {
    risk: "Decision-binding gap between interpretation and action",
    likelihood: "Medium",
    impact: "Critical",
    owner: "Policy engine + application integration",
    test: "Fuzz downstream decision handlers and confirm only signed typed decision objects can trigger actions (narrative text must be ignored).",
  },
  {
    risk: "Threshold gaming & uncertainty-lane abuse",
    likelihood: "Medium",
    impact: "High",
    owner: "Detection operations",
    test: "Replay near-threshold probe campaigns and validate hysteresis, retry clustering, semantic rate limits, and queue-flood protections.",
  },
  {
    risk: "Evidence, audit & provenance tampering",
    likelihood: "Medium",
    impact: "Critical",
    owner: "Security + compliance",
    test: "Attempt log mutation/deletion in red-team scenario; verify append-only storage, bundle signatures, and cross-domain reconciliation alerts.",
  },
  {
    risk: "Supply-chain, fallback & API-surface exposure",
    likelihood: "Medium",
    impact: "High",
    owner: "Platform engineering",
    test: "Perform SBOM diff checks and fallback-chaos tests; confirm fail-closed behavior, pinned versions, and tenant-safe WebSocket authorization.",
  },
];

export default function HomePage() {
  return (
    <main>
      <a className="skipLink" href="#content">
        Skip to content
      </a>

      <header className="siteHeader">
        <div className="container navWrap">
          <a className="brand" href="#top" aria-label="BagelTech home">
            BagelTech
          </a>
          <nav className="navLinks" aria-label="Primary">
            <a href="#framework">Framework</a>
            <a href="#risk-register">Risk register</a>
            <a href="#consulting">Consulting</a>
            <a href="#build">What we build</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero section">
        <div className="container">
          <p className="kicker">Human-centered systems for AI, data, and governance</p>
          <h1>Beautiful systems are responsible systems.</h1>
          <p className="lede">
            Governance for autonomous systems at the moment decisions are made — not just when rules are
            written. We build environments that know when to act, when to escalate, and when to say:{" "}
            <strong>“I’m not sure.”</strong>
          </p>
          <div className="ctaRow">
            <a href="#framework" className="btn btnPrimary">
              Explore framework
            </a>
            <a href="#contact" className="btn btnGhost">
              Start a conversation
            </a>
          </div>
          <ul className="outcomes" aria-label="Key outcomes">
            {outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <div id="content">
        <section className="section">
          <div className="container prose">
            <h2>The problem isn’t intelligence. It’s authority.</h2>
            <p>
              Most governance efforts focus on model behavior during training or static guardrails after
              deployment. Both matter. Neither is sufficient when systems operate in messy, high-stakes
              reality.
            </p>
            <p>
              The failure mode isn’t “AI is evil.” It’s “AI is confidently wrong” — and still allowed to
              execute. When uncertainty has nowhere safe to go, systems guess.
            </p>
          </div>
        </section>

        <section id="framework" className="section sectionAlt">
          <div className="container prose">
            <h2>Governance at execution time</h2>
            <p>
              Instead of asking whether a model is aligned, we ask:{" "}
              <strong>who may act, on what, under which conditions — and who is accountable</strong>.
            </p>

            <article className="diagramCard">
              <h3>Ethical governance at the moment of execution</h3>
              <pre>{`Request / Input
      ↓
Context Interpretation
      ↓
Uncertainty Evaluation
      ↓
Authority & Scope Check
      ↓
 ┌──────────────┬──────────────────┬──────────────────┐
 │   Execute    │     Escalate     │      Defer       │
 │  (Allowed)   │   (Human Review) │ (Insufficient)   │
 └──────────────┴──────────────────┴──────────────────┘`}</pre>
              <p className="caption">
                Decisions are governed <strong>before</strong> execution — not explained after harm.
              </p>
            </article>

            <div className="cardGrid">
              {principles.map((principle) => (
                <article className="card" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
            <article className="diagramCard">
              <h3>Ensemble software engineering framework</h3>
              <p>
                We use an ensemble approach that combines product engineering, governance design,
                security assurance, and operations readiness into one delivery loop.
              </p>
              <pre>{`Discover & Scope
      ↓
Architecture & Controls
      ↓
Build, Test, and Validate
      ↓
Operate, Observe, and Improve`}</pre>
              <p className="caption">
                The goal is resilient delivery: each release includes capability, control coverage,
                and measurable evidence for stakeholders.
              </p>
            </article>
          </div>
        </section>

        <section id="build" className="section">
          <div className="container prose" id="risk-register">
            <h2>One-page risk register for ELEANOR V8</h2>
            <p>
              This plan captures the six architecture-specific risks and maps each one to likelihood,
              impact, accountable owner, and a concrete validation test. Priority fixes are highlighted
              first: precedent ingestion controls, strict untrusted-context separation, and signed
              typed decision binding.
            </p>

            <div className="cardGrid">
              {riskRegister.map((entry) => (
                <article className="card" key={entry.risk}>
                  <h3>{entry.risk}</h3>
                  <p>
                    <strong>Likelihood:</strong> {entry.likelihood}
                  </p>
                  <p>
                    <strong>Impact:</strong> {entry.impact}
                  </p>
                  <p>
                    <strong>Owner:</strong> {entry.owner}
                  </p>
                  <p>
                    <strong>Validation test:</strong> {entry.test}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="container prose">
            <h2>What we build</h2>
            <p>
              Practical systems that hold up in the real world — where edge cases are normal,
              accountability matters, and trust is earned.
            </p>

            <div className="cardGrid">
              {capabilities.map((capability) => (
                <article className="card" key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>


        <section id="consulting" className="section sectionAlt">
          <div className="container prose">
            <h2>Consulting services</h2>
            <p>
              Bett consulting supports organizations that need practical modernization plans with
              accountable delivery. We partner with executive, technology, and operational teams to
              turn strategy into implementable programs.
            </p>

            <div className="cardGrid">
              <article className="card">
                <h3>Public sector ERP implementations</h3>
                <p>
                  End-to-end support for ERP discovery, vendor alignment, implementation governance,
                  and risk-managed rollout in public sector environments.
                </p>
              </article>
              <article className="card">
                <h3>Technology roadmap design</h3>
                <p>
                  Multi-horizon roadmaps that prioritize funding, sequencing, and measurable outcomes
                  across data, AI, and core enterprise systems.
                </p>
              </article>
              <article className="card">
                <h3>Modernization planning</h3>
                <p>
                  Legacy-to-modern transition plans covering architecture surfaces, integration risk,
                  operating model updates, and change management.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="products" className="section sectionAlt">
          <div className="container prose">
            <h2>Products</h2>

            <article className="productCard">
              <div>
                <h3>CogniScribe</h3>
                <p>
                  A lecture transcription and study companion designed for health professions education —
                  built for clarity, traceability, and respectful handling of uncertainty.
                </p>
                <ul>
                  <li>High-quality transcription + structured notes</li>
                  <li>Study questions generated from lecture content</li>
                  <li>Confidence-aware outputs (knows when it’s not sure)</li>
                </ul>
              </div>
              <aside className="productMeta">
                <p>
                  <strong>Status:</strong> Active development
                </p>
                <p>
                  <strong>Focus:</strong> Education-first (not clinical deployment)
                </p>
              </aside>
            </article>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container prose">
            <h2>Contact</h2>
            <p>
              If you want systems that can slow down safely, escalate responsibly, and enforce authority
              boundaries — let’s talk.
            </p>

            <div className="ctaRow">
              <a href="mailto:info@bageltech.net" className="btn btnPrimary">
                Email us
              </a>
              <a href="https://github.com/bageltech" className="btn btnGhost">
                GitHub
              </a>
              <a href="https://www.linkedin.com/company/bageltech" className="btn btnGhost">
                LinkedIn
              </a>
            </div>

            <p className="footerNote">© {new Date().getFullYear()} BagelTech. Built for clarity, not hype.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
