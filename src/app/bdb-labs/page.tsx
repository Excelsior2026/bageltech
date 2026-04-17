import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import MarketingImage from "@/components/MarketingImage";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { EXTERNAL_LINKS, PRODUCTS, WORKSTREAMS } from "@/content/site";
import { PUBLICATIONS } from "@/content/publications";

const labs = WORKSTREAMS.find((stream) => stream.slug === "bdb-labs") ?? WORKSTREAMS[1];

export const metadata: Metadata = {
  title: "BDB Labs | Research and Incubation",
  description:
    "BDB Labs explores AI governance, ensemble reasoning, prototypes, frameworks, and publications before they mature into products or services.",
};

const themes = [
  "Runtime AI governance and escalation",
  "Intelligence pluralism and specialist reasoning",
  "Evidence trails for auditable decisions",
  "Prototype-to-product incubation discipline",
];

const incubationStates = [
  {
    title: "In research",
    body: "Concepts being framed, tested, written, and debated before they become product or advisory commitments.",
  },
  {
    title: "In incubation",
    body: "Working prototypes and frameworks with enough structure to test against real institutional needs.",
  },
  {
    title: "Ready to ship",
    body: "Ideas that have crossed into BagelTech products or Bagelle Parris Vargas advisory methods.",
  },
];

export default function BdbLabsPage() {
  const featuredPublications = PUBLICATIONS.slice(0, 4);

  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={`${styles.inner} ${styles.pageHeroGrid}`}>
            <ScrollReveal>
              <p className={styles.eyebrow}>{labs.role}</p>
              <h1 className={styles.pageTitle}>BDB Labs develops the ideas before they become offers.</h1>
              <p className={styles.bodyText}>
                {labs.description} It is intentionally distinct from the commercial product lane: research can be
                rigorous and useful without pretending to be ready for deployment.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href="/publications">
                  Read publications
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href={EXTERNAL_LINKS.research}>
                  Discuss collaboration
                </SmartLink>
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.imagePanel} delay={120}>
              <MarketingImage src={labs.image.src} alt={labs.image.alt} priority />
              <p className={styles.imageCaption}>
                Labs work is exploratory but disciplined: frameworks, prototypes, papers, and methods.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Research themes</p>
                <h2 className={styles.sectionTitle}>The research agenda is practical, not decorative.</h2>
              </div>
              <p className={styles.sectionLead}>
                BDB Labs asks what institutions need from governance systems before those systems are packaged,
                piloted, or advised into operating models.
              </p>
            </ScrollReveal>

            <div className={styles.cardGrid}>
              {themes.map((theme) => (
                <article className={styles.card} key={theme}>
                  <p className={styles.cardLabel}>Theme</p>
                  <h3 className={styles.cardTitle}>{theme}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Frameworks and prototypes</p>
                <h2 className={styles.sectionTitle}>Not everything in Labs is a product. That distinction is the point.</h2>
              </div>
              <p className={styles.sectionLead}>
                ELEANOR, Ensemble Software Engineering, and related methods can exist as specifications, prototypes,
                or product inputs depending on maturity and use.
              </p>
            </ScrollReveal>

            <div className={styles.threeGrid}>
              {incubationStates.map((state) => (
                <article className={styles.featureCard} key={state.title}>
                  <p className={styles.cardLabel}>State</p>
                  <h3 className={styles.cardTitle}>{state.title}</h3>
                  <p className={styles.cardText}>{state.body}</p>
                </article>
              ))}
            </div>

            <div className={styles.actions}>
              {PRODUCTS.slice(0, 2).map((product) => (
                <SmartLink className={styles.buttonSecondary} href={product.href} key={product.slug}>
                  {product.title}
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Publications</p>
                <h2 className={styles.sectionTitle}>Durable work with source links.</h2>
              </div>
              <p className={styles.sectionLead}>
                Publications belong here and in the publication archive, where formal work can be scanned without
                overpowering the product or advisory pages.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {featuredPublications.map((item) => (
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
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
