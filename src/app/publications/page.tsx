import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { EXTERNAL_LINKS } from "@/content/site";
import { PUBLICATIONS } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications | BagelTech",
  description:
    "Formal papers, essays, reports, specifications, and research notes from BagelTech and BDB Labs.",
};

const categories = Array.from(new Set(PUBLICATIONS.map((item) => item.category)));

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export default function PublicationsPage() {
  const sorted = [...PUBLICATIONS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.eyebrow}>Publications</p>
              <h1 className={styles.pageTitle}>Formal writing, research notes, frameworks, and specifications.</h1>
              <p className={styles.bodyText}>
                Publications are durable pieces: papers, essays, white papers, reports, and formal framework work.
                Short-form public thinking lives separately in Insights.
              </p>
              <div className={styles.tagRow} aria-label="Publication filters">
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
            <div className={styles.archiveList}>
              {sorted.map((item) => (
                <article className={styles.archiveItem} id={item.slug} key={item.slug}>
                  <div>
                    <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
                    <p className={styles.cardLabel}>{item.category}</p>
                  </div>
                  <div className={styles.archiveBody}>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <div className={styles.tagRow}>
                      {item.tags.map((tag) => (
                        <span className={styles.tag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    {item.external ? `Open on ${item.source}` : "Read internally"}
                  </SmartLink>
                </article>
              ))}
            </div>

            <div className={styles.actions}>
              <SmartLink className={styles.buttonSecondary} href={EXTERNAL_LINKS.orcid}>
                ORCID profile
              </SmartLink>
              <SmartLink className={styles.buttonSecondary} href="/bdb-labs">
                Explore BDB Labs
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
