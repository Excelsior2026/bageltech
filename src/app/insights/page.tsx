import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { INSIGHTS } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights | BagelTech",
  description:
    "Selected LinkedIn-style posts, field notes, and shorter thought pieces on AI governance, delivery, modernization, and leadership.",
};

const categories = Array.from(new Set(INSIGHTS.map((item) => item.category)));

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export default function InsightsPage() {
  const featured = INSIGHTS.filter((item) => item.featured);
  const archive = INSIGHTS.filter((item) => !item.featured);

  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.eyebrow}>Insights</p>
              <h1 className={styles.pageTitle}>Selected public thinking, field notes, and short-form signals.</h1>
              <p className={styles.bodyText}>
                Insights are curated, not ingested wholesale. They capture public signals on AI governance, delivery,
                modernization, leadership, and systems thinking without turning the site into a social feed.
              </p>
              <div className={styles.tagRow} aria-label="Insight categories">
                {categories.map((category) => (
                  <span className={styles.tag} key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Featured</p>
                <h2 className={styles.sectionTitle}>Short pieces with a durable role.</h2>
              </div>
              <p className={styles.sectionLead}>
                These items support the workstreams without competing with the product, research, or advisory pages.
              </p>
            </ScrollReveal>

            <div className={styles.writingGrid}>
              {featured.map((item) => (
                <article className={styles.featureCard} key={item.slug}>
                  <div className={styles.meta}>
                    <span>{item.category}</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.excerpt}</p>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    Open on {item.source}
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Archive</p>
                <h2 className={styles.sectionTitle}>Curated notes by topic.</h2>
              </div>
              <p className={styles.sectionLead}>
                The first release uses manual content files. Specific LinkedIn post URLs can be swapped in as William
                finalizes the selected inventory.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {archive.map((item) => (
                <article className={styles.archiveItem} key={item.slug}>
                  <div>
                    <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
                    <p className={styles.cardLabel}>{item.category}</p>
                  </div>
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
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Need the more formal trail?</h2>
                <p className={styles.ctaText}>
                  Publications carry the papers, reports, frameworks, and specifications behind the public signals.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/publications">
                View publications
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
