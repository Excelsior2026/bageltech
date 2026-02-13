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
