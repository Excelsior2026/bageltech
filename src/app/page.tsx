// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BagelTech — Ethical AI Governance at Execution Time",
  description:
    "Human-centered systems for AI, data, and governance. We route uncertainty, enforce authority boundaries, and embed responsibility at the moment decisions are made.",
  openGraph: {
    title: "BagelTech — Ethical AI Governance at Execution Time",
    description:
      "Governance for autonomous systems at the moment decisions are made — not just when rules are written.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main style={styles.main}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <p style={styles.kicker}>Human-centered systems for AI, data, and governance</p>
          <h1 style={styles.h1}>Ethical AI needs leadership, not just alignment.</h1>
          <p style={styles.lede}>
            Governance for autonomous systems at the moment decisions are made — not just when rules are written.
            We build environments that know when to act, when to escalate, and when to say: <strong>“I’m not sure.”</strong>
          </p>

          <div style={styles.ctaRow}>
            <a href="#framework" style={{ ...styles.button, ...styles.buttonPrimary }}>
              Explore the framework
            </a>
            <a href="#contact" style={{ ...styles.button, ...styles.buttonGhost }}>
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>The problem isn’t intelligence. It’s authority.</h2>
          <p style={styles.p}>
            Most governance efforts focus on either model training (alignment) or static guardrails (rules).
            Both matter. Neither is sufficient when systems operate in messy, high-stakes reality.
          </p>
          <p style={styles.p}>
            The failure mode isn’t “AI is evil.” It’s “AI is confidently wrong” — and still allowed to execute.
            When uncertainty has nowhere safe to go, systems guess. And guessing is how quiet failures become systemic ones.
          </p>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section id="framework" style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Governance at execution time</h2>
          <p style={styles.p}>
            Instead of asking whether a model is aligned, we ask: <strong>who may act, on what, under which conditions — and who is accountable</strong>.
            That’s the difference between principles on paper and responsibility in production.
          </p>

          <div style={styles.diagramCard}>
            <h3 style={styles.h3}>Ethical Governance at the Moment of Execution</h3>
            <pre style={styles.pre}>
{`Request / Input
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
 └──────────────┴──────────────────┴──────────────────┘`}
            </pre>
            <p style={styles.caption}>
              Decisions are governed <strong>before</strong> execution — not explained after harm.
            </p>
          </div>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Context interpretation</h3>
              <p style={styles.cardText}>
                Decisions aren’t judged in isolation. We evaluate situational risk, affected parties, downstream consequences,
                and what the system is actually about to do.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Uncertainty routing</h3>
              <p style={styles.cardText}>
                Uncertainty is treated as a signal, not a defect. When confidence drops, the system pauses, escalates, or defers —
                so “I don’t know” becomes safe and enforceable.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Authority enforcement</h3>
              <p style={styles.cardText}>
                Capability is not permission. Execution is gated by role, scope, and responsibility — so systems can’t quietly act beyond
                what’s allowed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES (YOUR EXISTING SECTIONS, REPHRASED) */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>What we build</h2>
          <p style={styles.p}>
            Practical systems that hold up in the real world — where edge cases are normal, accountability matters, and trust is earned.
          </p>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>AI governance & oversight</h3>
              <p style={styles.cardText}>
                Execution-time controls that route uncertainty, enforce authority boundaries, and require escalation when risk is high.
                Designed for human review workflows, auditability, and policy enforcement.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Applied AI systems</h3>
              <p style={styles.cardText}>
                Product-grade AI features that prioritize reliability over theatrics: transcription, summarization, decision support,
                and human-in-the-loop interfaces that behave responsibly under pressure.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Data & decision infrastructure</h3>
              <p style={styles.cardText}>
                Clean pipelines, traceable logic, and decision provenance — so teams can answer “why did this happen?” without guessing.
                Governance is a lot easier when the data isn’t a haunted house.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Advisory & prototyping</h3>
              <p style={styles.cardText}>
                Fast, pragmatic design-to-proof builds: scoping, architecture, prototypes, and governance patterns that can be implemented
                without waiting for the perfect committee to form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Products</h2>

          <div style={styles.productCard}>
            <div>
              <h3 style={styles.h3}>CogniScribe</h3>
              <p style={styles.p}>
                A lecture transcription and study companion designed for health professions education — built for clarity,
                traceability, and respectful handling of uncertainty.
              </p>
              <ul style={styles.ul}>
                <li style={styles.li}>High-quality transcription + structured notes</li>
                <li style={styles.li}>Study questions generated from the lecture content</li>
                <li style={styles.li}>Confidence-aware outputs (knows when it’s not sure)</li>
              </ul>
            </div>
            <div style={styles.productMeta}>
              <p style={styles.small}><strong>Status:</strong> Active development</p>
              <p style={styles.small}><strong>Focus:</strong> Education-first (not clinical deployment)</p>
            </div>
          </div>

          <p style={{ ...styles.p, marginTop: 18 }}>
            Additional governance tooling is in development — focused on execution-time responsibility, auditability, and safe escalation patterns.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Contact</h2>
          <p style={styles.p}>
            If you’re working in a high-stakes environment and want systems that can slow down safely, escalate responsibly,
            and enforce authority boundaries — let’s talk.
          </p>

          <div style={styles.ctaRow}>
            <a href="mailto:info@bageltech.net" style={{ ...styles.button, ...styles.buttonPrimary }}>
              Email
            </a>
            <a href="https://github.com/" style={{ ...styles.button, ...styles.buttonGhost }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/" style={{ ...styles.button, ...styles.buttonGhost }}>
              LinkedIn
            </a>
          </div>

          <p style={styles.footerNote}>© {new Date().getFullYear()} BagelTech. Built for clarity, not hype.</p>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", lineHeight: 1.45 },
  container: { maxWidth: 980, margin: "0 auto", padding: "0 22px" },

  hero: { padding: "72px 0 44px", borderBottom: "1px solid rgba(0,0,0,0.08)" },
  kicker: { letterSpacing: 0.3, opacity: 0.8, margin: "0 0 10px" },
  h1: { fontSize: 44, lineHeight: 1.08, margin: "0 0 14px" },
  lede: { fontSize: 18, opacity: 0.9, margin: "0 0 22px", maxWidth: 820 },

  section: { padding: "56px 0" },
  sectionAlt: { padding: "56px 0", background: "rgba(0,0,0,0.03)" },

  h2: { fontSize: 28, margin: "0 0 12px" },
  h3: { fontSize: 20, margin: "0 0 10px" },
  p: { fontSize: 16, margin: "0 0 12px", maxWidth: 900 },

  ctaRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 },
  button: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.2)",
    fontSize: 14,
  },
  buttonPrimary: { background: "black", color: "white", borderColor: "black" },
  buttonGhost: { background: "transparent", color: "black" },

  diagramCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 16,
    background: "white",
    border: "1px solid rgba(0,0,0,0.12)",
  },
  pre: {
    margin: "12px 0 8px",
    padding: 14,
    borderRadius: 12,
    background: "rgba(0,0,0,0.04)",
    overflowX: "auto",
    fontSize: 13,
    lineHeight: 1.35,
  },
  caption: { margin: 0, fontSize: 13, opacity: 0.8 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
    marginTop: 18,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    background: "white",
    border: "1px solid rgba(0,0,0,0.12)",
  },
  cardTitle: { margin: "0 0 8px", fontSize: 16 },
  cardText: { margin: 0, fontSize: 14, opacity: 0.9 },

  productCard: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 16,
    padding: 18,
    borderRadius: 16,
    background: "white",
    border: "1px solid rgba(0,0,0,0.12)",
  },
  productMeta: {
    padding: 14,
    borderRadius: 14,
    background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  ul: { margin: "10px 0 0", paddingLeft: 18 },
  li: { margin: "6px 0" },
  small: { margin: "0 0 8px", fontSize: 13, opacity: 0.85 },

  footerNote: { marginTop: 20, fontSize: 12, opacity: 0.7 },
};
