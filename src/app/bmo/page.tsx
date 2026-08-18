import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BMO — Beagle Mischief Office | BagelTech",
  description:
    "A deliberate BagelTech easter egg honoring Bagel, the Beagle Mischief Office, and the operational value of strategic chaos.",
};

const metrics = [
  {
    value: "Material",
    label: "Loyalty audit status",
    note: "All findings should be read with snack proximity in mind.",
  },
  {
    value: "Elevated",
    label: "USB cable threat level",
    note: "Loose cables remain chew-adjacent until proven otherwise.",
  },
  {
    value: "72%",
    label: "Fabric theft index",
    note: "Blankets, hoodies, and socks are soft infrastructure.",
  },
  {
    value: "Strong",
    label: "Ice consumption analytics",
    note: "Frozen water classified as a snack under BMO precedent.",
  },
];

const incidents = [
  { time: "07:58", body: "Human stood up. Escort formation activated before step two." },
  { time: "09:12", body: "Unauthorized chin insertion under nearest human jaw." },
  { time: "12:03", body: "Cheese detected before packaging entered kitchen airspace." },
  { time: "16:09", body: "Car keys jingled. Door readiness achieved ahead of human comprehension." },
];

const offenses = [
  "Balcony operations unit placed on high alert after suspicious bird movement.",
  "Fabric custody dispute opened regarding one hoodie and three blankets.",
  "USB cable inspected with excessive dental enthusiasm.",
  "Ice cube procurement attempted without completing required sit protocol.",
];

const operatingRules = [
  "No household transit shall proceed without BMO awareness.",
  "All snacks require review by the Office of Bagel Affairs.",
  "Balcony patrol reports may include squirrels, birds, wind, or vibes.",
  "Any laptop opening triggers proximity support and morale supervision.",
];

export default function BmoPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>

        {/* ── HERO ─────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.badge}>
                  <span className={styles.badgeDot} />
                  Internal loyalty protocol · eyes only
                </div>

                <h1 className={styles.heroTitle}>
                  Beagle<br />
                  <em>Mischief</em><br />
                  Office
                </h1>

                <p className={styles.heroSub}>
                  A quiet BagelTech culture file for Bagel — Chief Mischief Officer,
                  balcony analyst, fabric custody claimant, ice auditor, and primary
                  stakeholder in all household snack governance decisions.
                </p>

                <div className={styles.actions}>
                  <SmartLink className={styles.primary} href="/">
                    Return to BagelTech
                  </SmartLink>
                  <SmartLink className={styles.secondary} href="/contact">
                    Report a snack irregularity
                  </SmartLink>
                </div>
              </div>

              {/* Profile card */}
              <aside className={styles.bagelCard} aria-label="Bagel official profile card">
                <div className={styles.bagelCardTop}>
                  <div className={styles.avatar} aria-hidden="true">🐾</div>
                  <p className={styles.bagelCardName}>Bagel Mischief Parris Vargas</p>
                  <p className={styles.bagelCardTitle}>Chief Mischief Officer, BMO</p>
                </div>
                <div className={styles.bagelCardStats}>
                  <div className={styles.bagelStat}>
                    <div className={styles.bagelStatVal}>100%</div>
                    <div className={styles.bagelStatLabel}>Loyalty</div>
                  </div>
                  <div className={styles.bagelStat}>
                    <div className={styles.bagelStatVal}>∞</div>
                    <div className={styles.bagelStatLabel}>Enthusiasm</div>
                  </div>
                  <div className={styles.bagelStat}>
                    <div className={styles.bagelStatVal}>0</div>
                    <div className={styles.bagelStatLabel}>Regrets</div>
                  </div>
                  <div className={styles.bagelStat}>
                    <div className={styles.bagelStatVal}>🛁</div>
                    <div className={styles.bagelStatLabel}>Bath rating</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── MISCHIEF METRICS ─────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Mischief dashboard</p>
            <h2 className={styles.sectionTitle}>Operational status, Q3</h2>
            <p className={styles.sectionLead}>
              Live readings from the Office of Bagel Affairs. Findings are nonbinding
              unless cheese is present.
            </p>

            <div className={styles.metricsStrip}>
              {metrics.map((m) => (
                <article className={styles.metricCard} key={m.label}>
                  <p className={styles.metricLabel}>{m.label}</p>
                  <p className={styles.metricValue}>{m.value}</p>
                  <p className={styles.metricNote}>{m.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── INCIDENT LOG & OFFENSES ───────────────────── */}
        <section className={styles.sectionAlt}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Official record</p>
            <h2 className={styles.sectionTitle}>Known offenses and procedural anomalies</h2>
            <p className={styles.sectionLead}>
              Pending review by the Office of Bagel Affairs. All timestamps are
              approximations. Bagel disputes none of them.
            </p>

            <div className={styles.twoCol}>
              <div className={styles.logPanel}>
                <div className={styles.logPanelHeader}>
                  <div className={styles.logPanelHeaderDot} />
                  <p className={styles.logPanelTitle}>Today&apos;s incident log</p>
                </div>
                <ul className={styles.logPanelBody}>
                  {incidents.map((item) => (
                    <li className={styles.logItem} key={item.time}>
                      <strong>{item.time}</strong> — {item.body}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.logPanel}>
                <div className={styles.logPanelHeader}>
                  <div className={styles.logPanelHeaderDot} style={{ background: "var(--color-bagel-teal)" }} />
                  <p className={styles.logPanelTitle}>Open offense tickets</p>
                </div>
                <ul className={styles.logPanelBody}>
                  {offenses.map((offense) => (
                    <li className={styles.logItem} key={offense}>{offense}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SANDWICH EASTER EGG ───────────────────────── */}
        <section className={styles.sandwichSection}>
          <div className={styles.sandwichWrap}>
            <svg
              className={styles.sandwichSvg}
              viewBox="0 0 280 160"
              width="280"
              height="160"
              aria-label="A sandwich illustration — the true heart of BagelTech"
              role="img"
            >
              {/* Top bun */}
              <ellipse cx="140" cy="44" rx="108" ry="30" fill="#D4A94D" />
              <ellipse cx="140" cy="36" rx="96" ry="22" fill="#E8C06A" />
              <ellipse cx="140" cy="30" rx="80" ry="16" fill="#F5D48A" />
              {/* Sesame seeds */}
              <ellipse cx="110" cy="26" rx="5" ry="3" fill="#C49030" transform="rotate(-15 110 26)" />
              <ellipse cx="140" cy="22" rx="5" ry="3" fill="#C49030" transform="rotate(5 140 22)" />
              <ellipse cx="168" cy="27" rx="5" ry="3" fill="#C49030" transform="rotate(20 168 27)" />
              <ellipse cx="125" cy="30" rx="4" ry="2.5" fill="#C49030" transform="rotate(-8 125 30)" />
              <ellipse cx="155" cy="31" rx="4" ry="2.5" fill="#C49030" transform="rotate(12 155 31)" />
              {/* Lettuce */}
              <ellipse cx="140" cy="56" rx="112" ry="12" fill="#5AA65A" />
              <ellipse cx="100" cy="54" rx="20" ry="8" fill="#72B872" />
              <ellipse cx="140" cy="52" rx="24" ry="9" fill="#72B872" />
              <ellipse cx="178" cy="54" rx="20" ry="8" fill="#72B872" />
              {/* Tomato */}
              <ellipse cx="140" cy="70" rx="106" ry="10" fill="#C0392B" opacity="0.9" />
              {/* Cheese */}
              <ellipse cx="140" cy="82" rx="110" ry="10" fill="#F5C842" />
              {/* Patty */}
              <ellipse cx="140" cy="96" rx="105" ry="12" fill="#8B4513" />
              <ellipse cx="140" cy="93" rx="100" ry="10" fill="#A0522D" />
              {/* Bottom bun */}
              <ellipse cx="140" cy="114" rx="110" ry="14" fill="#D4A94D" />
              <ellipse cx="140" cy="120" rx="112" ry="12" fill="#C49030" />
              <ellipse cx="140" cy="126" rx="108" ry="9" fill="#B8860B" />
              {/* Shine */}
              <ellipse cx="118" cy="26" rx="18" ry="6" fill="white" opacity="0.2" />
            </svg>

            <h3 className={styles.sandwichTitle}>
              The sandwich is not a metaphor.
            </h3>
            <p className={styles.sandwichNote}>
              Every great governance system needs a Chief Mischief Officer. Bagel
              holds this role without apology. This page exists because not everything
              consequential needs to look serious. Some of it should just be fun.
            </p>
          </div>
        </section>

        {/* ── OPS BAND ─────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.opsBand}>
              <div>
                <p className={styles.opsBandKicker}>Balcony operations unit</p>
                <h2 className={styles.opsBandTitle}>
                  Perimeter awareness, snack justice, and household continuity.
                </h2>
                <p className={styles.opsBandLead}>
                  BMO maintains readiness across household transit, fabric custody,
                  ice cube analytics, and balcony surveillance. Findings are
                  nonbinding unless cheese is present.
                </p>
              </div>
              <ul className={styles.rulesList} aria-label="BMO operating rules">
                {operatingRules.map((rule) => (
                  <li className={styles.rulesItem} key={rule}>
                    <span className={styles.rulesItemDot} aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>
    </MarketingLayout>
  );
}
