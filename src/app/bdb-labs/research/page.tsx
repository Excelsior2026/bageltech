import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { PUBLICATIONS } from "@/content/publications";

export const metadata: Metadata = {
  title: "Research | BDB Labs",
  description:
    "Research, publications, frameworks, and prototypes from BDB Labs — the research and incubation arm of BagelTech.",
};

const bdbPublications = PUBLICATIONS.filter((p) => p.workstream === "BDB Labs");

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export default function ResearchPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroLabs}`}>
          <div className={styles.inner}>
            <ScrollReveal>
              <BrandMark brand="bdb-labs" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>BDB Labs — Research</p>
              <h1 className={styles.pageTitle}>Research, frameworks, and prototypes for governable systems.</h1>
              <p className={styles.bodyText}>
                BDB Labs develops and tests the concepts behind BagelTech: governance methods, ensemble reasoning,
                decision infrastructure, and publishable frameworks.
              </p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Research</span>
                <span className={styles.tag}>Framework</span>
                <span className={styles.tag}>Specification</span>
                <span className={styles.tag}>Report</span>
                <span className={styles.tag}>Essay</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Research index</p>
                <h2 className={styles.sectionTitle}>Published research, frameworks, and working papers.</h2>
              </div>
              <p className={styles.sectionLead}>
                Durable publications spanning AI governance, ensemble reasoning, decision infrastructure, and
                institutional systems.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {bdbPublications.map((item) => (
                <article className={styles.archiveItem} key={item.slug}>
                  <div>
                    <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
                    <p className={styles.cardLabel}>{item.category}</p>
                  </div>
                  <div className={styles.archiveBody}>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div className={styles.tagRow}>
                        {item.tags.map((tag) => (
                          <span className={styles.tag} key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    {item.external ? `Open on ${item.source}` : "Read"}
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Research that changes how systems are designed.</h2>
                <p className={styles.ctaText}>
                  BDB Labs research feeds directly into BagelTech products and BPV advisory methods.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/writing">
                Explore the writing hub
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}