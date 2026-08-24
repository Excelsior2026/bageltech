import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import { WRITING } from "@/content/writing";
import styles from "@/components/Marketing.module.css";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import BrandMark from "@/components/BrandMark";

export const metadata = {
  title: "Writing | BagelTech",
  description: "Curated thinking on governance, consequence, and delivery.",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

function WritingCard({ item }: { item: typeof WRITING[0] }) {
  const label = item.type === "case-study" ? "View case study" :
    item.type === "insight" ? "Read insight" : "Read publication";

  return (
    <article className={styles.archiveItem} id={item.slug}>
      <div className={styles.meta}>
        <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
        <div className={styles.tagRow}>
          <span className={styles.tag}>{item.category}</span>
          {item.workstream && (
            <span className={styles.tag} style={{ opacity: 0.7 }}>{item.workstream}</span>
          )}
        </div>
      </div>
      <div className={styles.archiveBody}>
        <h2 className={styles.articleTitle}>{item.title}</h2>
        <p>{item.excerpt || item.summary}</p>
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tagRow}>
            {item.tags.map((tag) => (
              <span className={styles.tag} key={tag} style={{ fontSize: "0.875rem" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <SmartLink className={styles.cardLink} href={item.sourceUrl}>
        {item.external ? `Open on ${item.source}` : label}
      </SmartLink>
    </article>
  );
}

export default function InsightsPage() {
  const allItems = [...WRITING].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const categories = Array.from(new Set(WRITING.map((item) => item.category)));

  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroBpv}`}>
          <div className={styles.inner}>
            <ScrollReveal>
              <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>BagelTech — Writing</p>
              <h1 className={styles.pageTitle}>Thinking on governance, consequence, and delivery.</h1>
              <p className={styles.bodyText}>
                Insights, case studies, and essays exploring how to design systems that surface consequence
                and gain trust through thoughtful governance.
              </p>
              <div className={styles.tagRow} aria-label="Writing categories">
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
                <p className={styles.kicker}>The Archive</p>
                <h2 className={styles.sectionTitle}>Full index of published ideas.</h2>
              </div>
            </ScrollReveal>
            <div className={styles.archiveList}>
              {allItems.map((item) => (
                <WritingCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Operational consequence is the through-line.</h2>
                <p className={styles.ctaText}>
                  BDB Labs drives the research. BagelTech builds the products. BPV delivers the advisory.
                  Writing is where the thinking behind all three becomes public.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/bdb-labs/research">
                Explore BDB Labs research
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
