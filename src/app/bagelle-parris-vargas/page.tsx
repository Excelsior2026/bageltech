import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import MarketingImage from "@/components/MarketingImage";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { ADVISORY_OFFERS, EXTERNAL_LINKS, PROOF_POINTS, WORKSTREAMS } from "@/content/site";

const advisory = WORKSTREAMS.find((stream) => stream.slug === "bagelle-parris-vargas") ?? WORKSTREAMS[2];

export const metadata: Metadata = {
  title: "Bagelle Parris Vargas | Executive Advisory",
  description:
    "Executive advisory for enterprise modernization, ERP and PMO oversight, delivery leadership, AI governance, speaking, and workshops.",
};

const leadershipContext = [
  "25+ years leading public-sector technology and operational change",
  "$15M+ enterprise ERP programs directed in California regional government",
  "PMP, CSM, DASSM, and Lean Six Sigma Yellow Belt",
  "Published research across AI governance, institutional systems, and decision design",
];

export default function BagelleParrisVargasPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroBpv}`}>
          <div className={`${styles.inner} ${styles.pageHeroGrid}`}>
            <ScrollReveal>
              <BrandMark brand="bpv" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>{advisory.role}</p>
              <h1 className={styles.pageTitle}>Executive advisory for modernization that has to land.</h1>
              <p className={styles.bodyText}>
                {advisory.description} This lane centers William Parris as an advisor, operator, speaker, and delivery
                leader for consequential institutional change.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.advisory}>
                  Start an advisory inquiry
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href="#offers">
                  View advisory offers
                </SmartLink>
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.imagePanel} delay={120}>
              <MarketingImage src={advisory.image.src} alt={advisory.image.alt} priority />
              <p className={styles.imageCaption}>
                Advisory work belongs here: enterprise modernization, ERP oversight, PMO design, speaking, and workshops.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>William Parris</p>
                <h2 className={styles.sectionTitle}>A delivery leader for programs where ambiguity is expensive.</h2>
              </div>
              <p className={styles.sectionLead}>
                The advisory lane is intentionally not a subparagraph of About. It is where direct executive support,
                leadership experience, and transformation judgment are presented as a clear offer.
              </p>
            </ScrollReveal>

            <div className={styles.splitGrid}>
              <article className={styles.card}>
                <p className={styles.cardLabel}>Leadership background</p>
                <ul className={styles.list}>
                  {leadershipContext.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.card}>
                <p className={styles.cardLabel}>Advisory positioning</p>
                <h3 className={styles.cardTitle}>Modernization needs governance, not just momentum.</h3>
                <p className={styles.cardText}>
                  The work helps sponsors clarify decision rights, surface risks early, structure delivery evidence,
                  and align technology change with the institution that must operate it.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="offers">
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Advisory offers</p>
                <h2 className={styles.sectionTitle}>Executive support with defined outcomes.</h2>
              </div>
              <p className={styles.sectionLead}>
                Offers are scoped around the leadership problem: modernization oversight, ERP/PMO review, AI governance
                workshops, or speaking engagements.
              </p>
            </ScrollReveal>

            <div className={styles.offerGrid}>
              {ADVISORY_OFFERS.map((offer) => (
                <article className={styles.featureCard} key={offer.slug}>
                  <p className={styles.cardLabel}>Offer</p>
                  <h3 className={styles.cardTitle}>{offer.title}</h3>
                  <p className={styles.cardText}>{offer.summary}</p>
                  <ul className={styles.list}>
                    {offer.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <SmartLink className={styles.cardLink} href={offer.href}>
                    Ask about this offer
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
                <p className={styles.kicker}>Speaking and workshops</p>
                <h2 className={styles.ctaTitle}>Bring governance down to operating decisions.</h2>
                <p className={styles.ctaText}>
                  Workshops can focus on AI governance, modernization delivery, PMO design, ERP oversight, or the
                  leadership mechanics of consequence-aware systems.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.advisory}>
                Request a session
              </SmartLink>
            </ScrollReveal>

            <div className={styles.metricGrid}>
              {PROOF_POINTS.map((point) => (
                <article className={styles.metricTile} key={point.label}>
                  <p className={styles.metricValue}>{point.value}</p>
                  <p className={styles.metricLabel}>{point.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
