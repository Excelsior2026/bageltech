import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BMO — Beagle Mischief Office | BagelTech",
  description:
    "A deliberate BagelTech easter egg honoring Bagel, the Beagle Mischief Office, and the operational value of strategic chaos.",
};

const profile = [
  ["Name", "Bagel Mischief Parris Vargas"],
  ["Office", "BMO — Beagle Mischief Office"],
  ["Title", "Chief Mischief Officer"],
  ["Primary loyalty", "Dennis"],
  ["Known doctrine", "No room change shall occur without beagle accompaniment."],
];

const metrics = [
  { label: "Dennis favoritism disclosure", value: "Material", note: "All findings should be read with this conflict in mind." },
  { label: "USB cable threat level", value: "Elevated", note: "Loose cables remain chew-adjacent until proven otherwise." },
  { label: "Fabric theft index", value: "72%", note: "Blankets, hoodies, and socks are considered soft infrastructure." },
  { label: "Ice consumption analytics", value: "Strong", note: "Frozen water is classified as a snack under BMO precedent." },
];

const incidents = [
  "07:58 - Dennis stood up. Escort formation activated before step two.",
  "09:12 - Unauthorized chin insertion under nearest human jaw.",
  "12:03 - Cheese detected before packaging entered kitchen airspace.",
  "16:09 - Car keys jingled. Door readiness achieved ahead of human comprehension.",
];

const offenses = [
  "Balcony operations unit placed on high alert after suspicious bird movement.",
  "Fabric custody dispute opened regarding one hoodie and three blankets.",
  "USB cable inspected with excessive dental enthusiasm.",
  "Ice cube procurement attempted without completing required sit protocol.",
];

const operatingRules = [
  "Dennis shall not relocate without BMO awareness.",
  "All snacks require review by the Office of Bagel Affairs.",
  "Balcony patrol reports may include squirrels, birds, wind, or vibes.",
  "Any laptop opening triggers proximity support and morale supervision.",
];

export default function BmoPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Internal loyalty protocol</p>
              <h1>BMO — Beagle Mischief Office</h1>
              <p>
                A quiet BagelTech culture file for Bagel, Chief Mischief Officer, balcony analyst, fabric custody
                claimant, ice auditor, and Dennis-aligned operational stakeholder.
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

            <aside className={styles.profileCard} aria-label="Bagel profile card">
              <p className={styles.kicker}>Bagel profile card</p>
              <div className={styles.avatar} aria-hidden="true">
                BMO
              </div>
              <dl>
                {profile.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Mischief dashboard</p>
                <h2>Playful, polished, and still part of the system.</h2>
              </div>
              <p>
                BMO is a protected side office: warmer than the business pages, but designed with the same restraint and
                clarity.
              </p>
            </div>

            <div className={styles.metricGrid}>
              {metrics.map((metric) => (
                <article className={styles.metricCard} key={metric.label}>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <p>{metric.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.inner}>
            <div className={styles.twoColumn}>
              <article className={styles.panel}>
                <p className={styles.kicker}>Incident log</p>
                <h2>Known offenses and procedural anomalies.</h2>
                <ul>
                  {incidents.map((incident) => (
                    <li key={incident}>{incident}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.panel}>
                <p className={styles.kicker}>Known offenses</p>
                <h2>Pending review by the Office of Bagel Affairs.</h2>
                <ul>
                  {offenses.map((offense) => (
                    <li key={offense}>{offense}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.opsBand}>
              <div>
                <p className={styles.kicker}>Balcony operations unit</p>
                <h2>Perimeter awareness, snack justice, and Dennis continuity.</h2>
                <p>
                  BMO maintains readiness across household transit, fabric custody, ice cube analytics, and balcony
                  surveillance. Findings are nonbinding unless cheese is present.
                </p>
              </div>
              <ul>
                {operatingRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
