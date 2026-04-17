import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import MarketingImage from "@/components/MarketingImage";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { ADVISORY_OFFERS, HERO_IMAGE, METHOD_TILES, PRODUCTS, PROOF_POINTS, WORKSTREAMS } from "@/content/site";
import { INSIGHTS } from "@/content/insights";
import { PUBLICATIONS } from "@/content/publications";

export const metadata: Metadata = {
  title: "BagelTech | Products, Research, and Advisory for Consequence-Aware Systems",
  description:
    "BagelTech brings together governable AI products, BDB Labs research, and Bagelle Parris Vargas executive advisory.",
  openGraph: {
    title: "BagelTech | Products, Research, and Advisory",
    description:
      "A clearer front door for products, research, and advisory work built around evidence, escalation, auditability, and operational credibility.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const featuredProduct = PRODUCTS[0];
const featuredPublication = PUBLICATIONS.find((item) => item.featured) ?? PUBLICATIONS[0];
const featuredAdvisory = ADVISORY_OFFERS[0];
const selectedPublications = PUBLICATIONS.filter((item) => item.featured).slice(0, 2);
const selectedInsights = INSIGHTS.filter((item) => item.featured).slice(0, 2);

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <ScrollReveal className={styles.heroCopy}>
              <p className={styles.eyebrow}>BagelTech</p>
              <h1 className={styles.heroTitle}>Products, research, and advisory for consequential systems.</h1>
              <p className={styles.heroLead}>
                BagelTech brings together institution-ready products, BDB Labs research, and Bagelle Parris Vargas
                advisory work for organizations that need evidence, escalation, auditability, and leadership judgment.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href="/contact">
                  Start a scoping conversation
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href="#workstreams">
                  Explore the work
                </SmartLink>
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.imagePanel} delay={120}>
              <MarketingImage src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} priority />
              <p className={styles.imageCaption}>
                Three lanes, one operating thesis: make consequential systems easier to inspect, govern, and lead.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section} id="workstreams">
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Choose the right lane</p>
                <h2 className={styles.sectionTitle}>The site is a router, not a mixed pile of good ideas.</h2>
              </div>
              <p className={styles.sectionLead}>
                Each workstream has a distinct job. Product conversations belong in BagelTech. Research and prototypes
                belong in BDB Labs. Executive modernization and delivery work belongs in Bagelle Parris Vargas.
              </p>
            </ScrollReveal>

            <div className={styles.threeGrid}>
              {WORKSTREAMS.map((stream, index) => (
                <ScrollReveal className={styles.routeCard} delay={index * 90} key={stream.slug}>
                  <p className={styles.cardLabel}>{stream.role}</p>
                  <h3 className={styles.cardTitle}>{stream.title}</h3>
                  <p className={styles.cardText}>{stream.summary}</p>
                  <ul className={styles.list}>
                    {stream.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className={styles.cardFooter}>
                    <SmartLink className={styles.cardLink} href={stream.href}>
                      {stream.cta}
                    </SmartLink>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Featured work</p>
                <h2 className={styles.sectionTitle}>One current signal from each lane.</h2>
              </div>
              <p className={styles.sectionLead}>
                The architecture keeps products, research, and advisory legible while showing how they inform each
                other.
              </p>
            </ScrollReveal>

            <div className={styles.cardGrid}>
              <article className={styles.featureCard}>
                <p className={styles.cardLabel}>Flagship product</p>
                <h3 className={styles.cardTitle}>{featuredProduct.title}</h3>
                <p className={styles.cardText}>{featuredProduct.summary}</p>
                <SmartLink className={styles.cardLink} href="/bageltech#products">
                  View products
                </SmartLink>
              </article>

              <article className={styles.featureCard}>
                <p className={styles.cardLabel}>Publication / framework</p>
                <h3 className={styles.cardTitle}>{featuredPublication.title}</h3>
                <p className={styles.cardText}>{featuredPublication.summary}</p>
                <SmartLink className={styles.cardLink} href={featuredPublication.sourceUrl}>
                  Read the piece
                </SmartLink>
              </article>

              <article className={styles.featureCard}>
                <p className={styles.cardLabel}>Advisory offer</p>
                <h3 className={styles.cardTitle}>{featuredAdvisory.title}</h3>
                <p className={styles.cardText}>{featuredAdvisory.summary}</p>
                <SmartLink className={styles.cardLink} href="/bagelle-parris-vargas#offers">
                  See advisory options
                </SmartLink>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.inner}>
            <div className={styles.methodGrid}>
              <ScrollReveal>
                <p className={styles.kicker}>Method and credibility</p>
                <h2 className={styles.sectionTitle}>Evidence first. Uncertainty routed. Authority made visible.</h2>
                <p className={styles.sectionLead}>
                  The same operating doctrine supports the product, research, and advisory lanes: define the decision,
                  make the evidence reviewable, and route work by consequence and authority.
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
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Selected writing</p>
                <h2 className={styles.sectionTitle}>Durable papers and shorter public signals, kept in their lanes.</h2>
              </div>
              <p className={styles.sectionLead}>
                Formal publications live in the research archive. Short-form field notes and LinkedIn-style thinking
                live in Insights. The homepage only carries a curated strip.
              </p>
            </ScrollReveal>

            <div className={styles.writingGrid}>
              {selectedPublications.map((item) => (
                <article className={styles.archiveItem} key={item.slug}>
                  <p className={styles.meta}>{item.category}</p>
                  <div className={styles.archiveBody}>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                  </div>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    {item.source}
                  </SmartLink>
                </article>
              ))}

              {selectedInsights.map((item) => (
                <article className={styles.archiveItem} key={item.slug}>
                  <p className={styles.meta}>{item.category}</p>
                  <div className={styles.archiveBody}>
                    <h2>{item.title}</h2>
                    <p>{item.excerpt}</p>
                  </div>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    {item.source}
                  </SmartLink>
                </article>
              ))}
            </div>

            <div className={styles.actions}>
              <SmartLink className={styles.buttonSecondary} href="/publications">
                View publications
              </SmartLink>
              <SmartLink className={styles.buttonSecondary} href="/insights">
                View insights
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Start with the lane that matches the work.</h2>
                <p className={styles.ctaText}>
                  Product, research, and advisory conversations begin differently. The contact page routes the inquiry
                  so the first conversation is useful.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/contact">
                Route an inquiry
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
