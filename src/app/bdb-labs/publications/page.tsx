import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { PUBLICATIONS } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications | BDB Labs",
  description:
    "Peer-visible research, specifications, and frameworks from BagelTech — papers with permanent DOIs and arXiv records.",
};

const sorted = [...PUBLICATIONS].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export default function PublicationsPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroLabs}`}>
          <div className={styles.inner}>
            <ScrollReveal>
              <BrandMark brand="bdb-labs" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>BDB Labs — Publications</p>
              <h1 className={styles.pageTitle}>Every claim we publish has somewhere permanent to point.</h1>
              <p className={styles.bodyText}>
                Research, specifications, and frameworks from across BagelTech. Each entry resolves to a
                citable DOI or an arXiv record rather than an internal page, so the work can be checked,
                cited, and contradicted.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <p className={styles.kicker}>{sorted.length} publications</p>

            <div className={styles.archiveList}>
              {sorted.map((item) => (
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
                  Collaborations, review, and replication are all welcome.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/contact">
                Get in touch
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
