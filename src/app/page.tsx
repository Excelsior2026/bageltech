import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import MarketingImage from "@/components/MarketingImage";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { HERO_IMAGE, METHOD_TILES, PROOF_POINTS, WORKSTREAMS } from "@/content/site";

export const metadata: Metadata = {
  title: "BagelTech | Governance and Consequence-Aware Systems",
  description:
    "BagelTech delivers institution-ready products, BDB Labs research, and executive advisory grounded in evidence, auditability, and operational credibility.",
  openGraph: {
    title: "BagelTech | Governance Systems",
    description:
      "A unified platform for products, research, and advisory work built around evidence, escalation, auditability, and operational credibility.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <ScrollReveal className={styles.heroCopy}>
              <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>BagelTech</p>
              <h1 className={styles.heroTitle}>Design systems that surface consequence and gain trust.</h1>
              <p className={styles.heroLead}>
                We provide the architecture for consequential systems, ensuring decisions are grounded in evidence,
                authority is visible, and uncertainty triggers explicit, auditable escalation.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href="/contact">
                  Start a scoping conversation
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href="#workstreams">
                  Explore the lanes
                </SmartLink>
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.imagePanel} delay={120}>
              <MarketingImage src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} priority />
              <p className={styles.imageCaption}>
                The operating thesis: Consequence demands clear authority, reviewable evidence, and structured escalation.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section} id="workstreams">
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Choose the right lane</p>
                <h2 className={styles.sectionTitle}>Three distinct workstreams keep the focus clear.</h2>
              </div>
              <p className={styles.sectionLead}>
                Products live in BagelTech. Research and frameworks are incubated in BDB Labs. Executive experience is
                delivered via Bagelle Parris Vargas.
              </p>
            </ScrollReveal>

            <div className={styles.threeGrid}>
              {WORKSTREAMS.map((stream, index) => {
                let href = stream.href;
                if (stream.slug === "bageltech") href = "/products";
                if (stream.slug === "bdb-labs") href = "/research";
                if (stream.slug === "bagelle-parris-vargas") href = "/advisory";

                return (
                  <ScrollReveal className={styles.routeCard} delay={index * 90} key={stream.slug}>
                    <BrandMark brand={stream.brand} variant="icon" size="compact" className={styles.routeMark} />
                    <p className={styles.cardLabel}>{stream.role}</p>
                    <h3 className={styles.cardTitle}>{stream.title}</h3>
                    <p className={styles.cardText}>{stream.summary}</p>
                    <ul className={styles.list}>
                      {stream.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className={styles.cardFooter}>
                      <SmartLink className={styles.cardLink} href={href}>
                        {stream.cta}
                      </SmartLink>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Durable insight</p>
                <h2 className={styles.sectionTitle}>All papers, notes, and case materials in one library.</h2>
              </div>
              <p className={styles.sectionLead}>
                See the research, frameworks, and operational experience that inform the products and advisory offers.
              </p>
            </ScrollReveal>

            <div className={styles.actions}>
              <SmartLink className={styles.buttonPrimary} href="/writing">
                Explore the full Writing Library
              </SmartLink>
              <SmartLink className={styles.buttonSecondary} href="/contact">
                Discuss a use case
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.inner}>
            <div className={styles.methodGrid}>
              <ScrollReveal>
                <p className={styles.kicker}>Method and credibility</p>
                <h2 className={styles.sectionTitle}>Evidence first. Uncertainty surfaced. Authority made visible.</h2>
                <p className={styles.sectionLead}>
                  The same operating doctrine supports the product, research, and advisory lanes: define the decision,
                  make the evidence reviewable, and match the work to the right consequence and authority.
                </p>
              </ScrollReveal>

              <ScrollReveal className={styles.proofPanel} delay={120}>
                <div className={styles.methodList}>
                  {METHOD_TILES.map((tile) => (
                    <article className={styles.methodItem} key={tile.title}>
                      <h3>{tile.title}</h3>
                      <p>{tile.body}</p>
                    </article>
                  ))}
                </div>

                <div className={styles.metricGrid}>
                  {PROOF_POINTS.map((point) => (
                    <article className={styles.metricTile} key={point.label}>
                      <p className={styles.metricValue}>{point.value}</p>
                      <p className={styles.metricLabel}>{point.label}</p>
                    </article>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Start with the lane that matches the work.</h2>
                <p className={styles.ctaText}>
                  Product, research, and advisory conversations begin differently. The contact page frames the inquiry
                  so the first conversation starts in the right context.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/contact">
                Start an inquiry
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
