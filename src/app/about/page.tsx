import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { EXTERNAL_LINKS, WORKSTREAMS } from "@/content/site";

export const metadata: Metadata = {
  title: "About | BagelTech",
  description:
    "How BagelTech, BDB Labs, and Bagelle Parris Vargas connect through governance, research, operations, and institutional delivery.",
};

const throughLine = [
  "Governance matters when decisions carry consequence.",
  "Research matters when it changes how systems are designed.",
  "Advisory matters when leaders must turn strategy into operating reality.",
];

export default function AboutPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.eyebrow}>About</p>
              <h1 className={styles.pageTitle}>One thesis, three workstreams, clearer boundaries.</h1>
              <p className={styles.bodyText}>
                William Parris brings public-sector technology leadership, enterprise modernization experience, and AI
                governance research into a structure that is easier for visitors to navigate. BagelTech is the front
                door. BDB Labs is the research and incubation lane. Bagelle Parris Vargas is the executive advisory lane.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.splitGrid}>
              <ScrollReveal className={styles.card}>
                <p className={styles.cardLabel}>Who William is</p>
                <h2 className={styles.cardTitle}>A technology and delivery leader focused on governable systems.</h2>
                <p className={styles.cardText}>
                  The work joins practical implementation experience with published thinking on AI governance,
                  uncertainty handling, institutional authority, and decision infrastructure.
                </p>
              </ScrollReveal>

              <ScrollReveal className={styles.card} delay={100}>
                <p className={styles.cardLabel}>Why the structure exists</p>
                <h2 className={styles.cardTitle}>Different conversations need different doors.</h2>
                <p className={styles.cardText}>
                  Product buyers, research collaborators, and executive sponsors do not need the same first page. The
                  redesign lets each visitor self-sort without losing the common operating thesis.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>How the lanes connect</p>
                <h2 className={styles.sectionTitle}>Shared principles, separate jobs.</h2>
              </div>
              <p className={styles.sectionLead}>
                The workstreams inform each other, but they should not be flattened into one long biography or manifesto.
              </p>
            </ScrollReveal>

            <div className={styles.threeGrid}>
              {WORKSTREAMS.map((stream) => (
                <article className={styles.routeCard} key={stream.slug}>
                  <BrandMark brand={stream.brand} variant="icon" size="compact" className={styles.routeMark} />
                  <p className={styles.cardLabel}>{stream.role}</p>
                  <h3 className={styles.cardTitle}>{stream.title}</h3>
                  <p className={styles.cardText}>{stream.description}</p>
                  <SmartLink className={styles.cardLink} href={stream.href}>
                    Go to {stream.title}
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>The unifying through-line is operational consequence.</h2>
                <ul className={styles.list}>
                  {throughLine.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.scoping}>
                Start a conversation
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
