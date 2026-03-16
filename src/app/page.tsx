"use client";

import { useMemo, useState } from "react";

type Redesign = {
  slug: string;
  label: string;
  audience: string;
  headline: string;
  summary: string;
  sections: { title: string; body: string }[];
  ctas: { label: string; href: string; tone?: "primary" | "ghost" }[];
  trustSignals: string[];
  seo: string[];
};

const redesigns: Redesign[] = [
  {
    slug: "executive",
    label: "Concept 1 · Executive Assurance",
    audience: "Primary audience: CIOs, county executives, procurement leaders, and risk officers.",
    headline: "AI governance consulting for public-sector execution risk.",
    summary:
      "Lead with buyer relevance in the first screen: who this is for, what BagelTech does, and why execution-time governance lowers operational risk.",
    sections: [
      {
        title: "Hero + audience qualifier",
        body: "Keep the line ‘Beautiful systems are responsible systems,’ then immediately add a short qualifier: ‘For public-sector and enterprise teams deploying high-stakes AI workflows.’",
      },
      {
        title: "Proof-first About block",
        body: "Move an About section above the fold with Bill and Dennis bios, 25+ years public-sector modernization experience, PMP/CSM/DASSM credentials, and delivery footprint.",
      },
      {
        title: "Two-path CTA architecture",
        body: "Primary CTA: ‘Book a governance readiness call.’ Secondary CTA: ‘Download ELEANOR white paper’ (Zenodo) for visitors not yet ready to engage.",
      },
    ],
    ctas: [
      { label: "Book a governance readiness call", href: "#contact", tone: "primary" },
      { label: "Download ELEANOR white paper", href: "https://zenodo.org", tone: "ghost" },
      { label: "View ORCID research profile", href: "https://orcid.org", tone: "ghost" },
    ],
    trustSignals: [
      "Clarifies Bett as ‘BagelTech Consulting Practice (Bett)’ to remove brand ambiguity.",
      "Adds short anonymized case snapshots (e.g., county government ERP modernization).",
      "Places credentials and publication links before deep technical sections.",
    ],
    seo: [
      "AI governance consulting",
      "public sector AI implementation",
      "enterprise AI risk controls",
    ],
  },
  {
    slug: "technical",
    label: "Concept 2 · Technical Confidence",
    audience: "Primary audience: architecture leaders, platform teams, and AI safety engineers.",
    headline: "Execution-time controls your engineering team can test, sign, and ship.",
    summary:
      "Keep technical depth, but gate complexity with clear layers so executives are not overwhelmed while technical buyers can drill down.",
    sections: [
      {
        title: "Layered information architecture",
        body: "Top layer: plain-language outcomes and decision model (Execute / Escalate / Defer). Middle layer: controls map. Deep layer: full ELEANOR V8 risk register.",
      },
      {
        title: "Replace ASCII with responsive visuals",
        body: "Convert the flow diagrams to SVG cards with explicit status chips and mobile-safe typography while preserving the same logic.",
      },
      {
        title: "Validation-centered narrative",
        body: "Frame each risk item with a linked validation test script to reinforce implementation credibility over marketing claims.",
      },
    ],
    ctas: [
      { label: "See controls map", href: "#framework", tone: "primary" },
      { label: "Read risk register", href: "#risk-register", tone: "ghost" },
      { label: "View governance checklist", href: "#contact", tone: "ghost" },
    ],
    trustSignals: [
      "Adds ‘How we test this’ callouts under each control family.",
      "Links publications and GitHub artifacts directly from framework modules.",
      "Includes a concise architecture FAQ for procurement and security review.",
    ],
    seo: [
      "constitutional AI governance",
      "AI decision provenance",
      "human-in-the-loop governance",
    ],
  },
  {
    slug: "thought-leadership",
    label: "Concept 3 · Authority Thesis + Product",
    audience: "Primary audience: strategy teams comparing firms for advisory + product execution.",
    headline: "The problem isn’t intelligence. It’s authority.",
    summary:
      "Turn the homepage into a thought-leadership hub that combines consulting trust signals with product momentum and recurring content for SEO.",
    sections: [
      {
        title: "Thesis-led homepage",
        body: "Lead with the authority thesis and immediately route users to one of three journeys: Advisory, Platform Controls, or CogniScribe.",
      },
      {
        title: "Research and publication surface",
        body: "Create a dedicated ‘Publications & methods’ strip linking Zenodo, ORCID, and downloadable governance artifacts.",
      },
      {
        title: "Product depth and cadence",
        body: "Expand CogniScribe with differentiators, monthly release notes, and an educational-use positioning statement that builds transparent momentum.",
      },
    ],
    ctas: [
      { label: "Explore advisory services", href: "#consulting", tone: "primary" },
      { label: "Read latest governance brief", href: "#insights", tone: "ghost" },
      { label: "Follow product development", href: "#products", tone: "ghost" },
    ],
    trustSignals: [
      "Introduces a compact team panel with role, background, and delivery domains.",
      "Reinforces ‘Built for clarity, not hype’ near the hero for earlier brand recall.",
      "Adds newsletter/brief signup for non-sales conversion and repeat visits.",
    ],
    seo: [
      "AI governance framework",
      "public-sector digital modernization consulting",
      "responsible AI implementation partner",
    ],
  },
];

export default function HomePage() {
  const [activeSlug, setActiveSlug] = useState(redesigns[0].slug);

  const activeRedesign = useMemo(
    () => redesigns.find((option) => option.slug === activeSlug) ?? redesigns[0],
    [activeSlug],
  );

  return (
    <main className="proposalPage">
      <section className="section hero">
        <div className="container proposalIntro">
          <p className="kicker">BagelTech redesign proposals</p>
          <h1>Three homepage redesign directions, tailored to your evaluation.</h1>
          <p className="lede">
            Each concept incorporates your top priorities: clearer audience targeting, stronger trust
            signals, better CTA pathways, publication visibility, SEO-friendly framing, and Bett naming
            clarity.
          </p>
          <p className="footerNote">Built for clarity, not hype.</p>
        </div>
      </section>

      <section className="section sectionAlt" aria-labelledby="concepts-heading">
        <div className="container">
          <h2 id="concepts-heading">Choose a redesign concept</h2>
          <div className="conceptTabs" role="tablist" aria-label="Redesign concepts">
            {redesigns.map((option) => {
              const isActive = option.slug === activeRedesign.slug;
              return (
                <button
                  type="button"
                  key={option.slug}
                  role="tab"
                  aria-selected={isActive}
                  className={`conceptTab ${isActive ? "conceptTabActive" : ""}`}
                  onClick={() => setActiveSlug(option.slug)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <article className="conceptPanel" role="tabpanel" aria-live="polite">
            <p className="kicker">{activeRedesign.audience}</p>
            <h3>{activeRedesign.headline}</h3>
            <p>{activeRedesign.summary}</p>

            <div className="cardGrid">
              {activeRedesign.sections.map((section) => (
                <article className="card" key={section.title}>
                  <h4>{section.title}</h4>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>

            <div className="ctaRow">
              {activeRedesign.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={`btn ${cta.tone === "ghost" ? "btnGhost" : "btnPrimary"}`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="framework">
        <div className="container">
          <h2>How all three concepts address your feedback</h2>
          <div className="twoCol">
            <article className="diagramCard">
              <h3>Priority fixes embedded in every option</h3>
              <ul>
                <li>Adds an About/Team section with credentials and public-sector experience.</li>
                <li>Surfaces ELEANOR publications (Zenodo) and ORCID as trust anchors.</li>
                <li>Resolves Bett naming confusion with explicit BagelTech practice language.</li>
                <li>Introduces secondary conversion paths (white paper, brief, newsletter).</li>
              </ul>
            </article>

            <article className="diagramCard" id="risk-register">
              <h3>SEO and discoverability upgrades</h3>
              <ul>
                {activeRedesign.seo.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
              <p className="caption">
                Recommended metadata pattern: “AI Governance Consulting for Public Sector & Enterprise | BagelTech”
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section sectionAlt" id="consulting">
        <div className="container">
          <h2>Trust-signal content to add next</h2>
          <div className="cardGrid">
            {activeRedesign.trustSignals.map((signal) => (
              <article className="card" key={signal}>
                <p>{signal}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <h2>Recommended rollout</h2>
          <ol className="rolloutList">
            <li>Pick one concept as the core homepage direction.</li>
            <li>Prototype mobile-first wireframes and replace ASCII flows with responsive SVG diagrams.</li>
            <li>Publish About, publications, and one anonymized case snapshot before launch.</li>
            <li>Add an insights cadence (monthly brief) to improve SEO and repeat traffic.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
