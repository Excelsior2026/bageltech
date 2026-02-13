import Link from "next/link";

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

function ExecutionDiagram() {
  return (
    <svg viewBox="0 0 760 310" role="img" aria-label="Execution-time governance flow diagram" className="flowGraphic">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      <g className="flowNode">
        <rect x="260" y="16" width="240" height="44" rx="12" />
        <text x="380" y="43" textAnchor="middle">Request / Input</text>
      </g>

      <g className="flowNode">
        <rect x="260" y="82" width="240" height="44" rx="12" />
        <text x="380" y="109" textAnchor="middle">Context Interpretation</text>
      </g>

      <g className="flowNode">
        <rect x="260" y="148" width="240" height="44" rx="12" />
        <text x="380" y="175" textAnchor="middle">Uncertainty Evaluation</text>
      </g>

      <g className="flowNode">
        <rect x="260" y="214" width="240" height="44" rx="12" />
        <text x="380" y="241" textAnchor="middle">Authority &amp; Scope Check</text>
      </g>

      <g className="flowOutcome outcomeExecute">
        <rect x="32" y="266" width="220" height="36" rx="10" />
        <text x="142" y="289" textAnchor="middle">Execute</text>
      </g>
      <g className="flowOutcome outcomeEscalate">
        <rect x="270" y="266" width="220" height="36" rx="10" />
        <text x="380" y="289" textAnchor="middle">Escalate</text>
      </g>
      <g className="flowOutcome outcomeDefer">
        <rect x="508" y="266" width="220" height="36" rx="10" />
        <text x="618" y="289" textAnchor="middle">Defer</text>
      </g>

      <g className="flowArrow">
        <line x1="380" y1="60" x2="380" y2="82" markerEnd="url(#arrow)" />
        <line x1="380" y1="126" x2="380" y2="148" markerEnd="url(#arrow)" />
        <line x1="380" y1="192" x2="380" y2="214" markerEnd="url(#arrow)" />
        <line x1="380" y1="258" x2="142" y2="266" markerEnd="url(#arrow)" />
        <line x1="380" y1="258" x2="380" y2="266" markerEnd="url(#arrow)" />
        <line x1="380" y1="258" x2="618" y2="266" markerEnd="url(#arrow)" />
      </g>
    </svg>
  );
}

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
            <a href="#build">What we build</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
            <Link href="/insights">Insights</Link>
            <Link href="/bagels-corner">Bagel&apos;s Corner</Link>
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
            <Link href="/insights" className="btn btnGhost">
              Read insights
            </Link>
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
              <ExecutionDiagram />
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
          </div>
        </section>

        <section id="build" className="section">
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
