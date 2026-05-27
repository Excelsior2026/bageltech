import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { WRITING } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing | BagelTech",
  description:
    "Publications, insights, and case studies on AI governance, decision systems, and consequence-aware design.",
};

const categories = Array.from(new Set(WRITING.map((item) => item.category)));

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
      <div>
        <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
        <div className={styles.tagRow}>
          <span className={styles.tag}>{item.category}</span>
          <span className={styles.tag} style={{ opacity: 0.7 }}>{item.workstream}</span>
        </div>
      </div>
      <div className={styles.archiveBody}>
        <h2>{item.title}</h2>
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

function FeatureCard({ item }: { item: typeof WRITING[0] }) {
  const label = item.type === "case-study" ? "View case study" :
    item.type === "insight" ? "Read insight" : "Read publication";

  return (
    <article className={styles.featureCard} key={item.slug}>
      <div className={styles.meta}>
        <span>{item.category}</span>
        <span>{formatDate(item.publishedAt)}</span>
      </div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardText}>{item.excerpt || item.summary}</p>
      {item.tags && item.tags.length > 0 && (
        <div className={styles.tagRow}>
          {item.tags.map((tag) => (
            <span className={styles.tag} key={tag} style={{ fontSize: "0.75rem" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <SmartLink className={styles.cardLink} href={item.sourceUrl}>
        {item.external ? `Open on ${item.source}` : label}
      </SmartLink>
    </article>
  );
}

export default function WritingPage() {
  const publications = WRITING.filter(item => item.type === "publication");
  const insights = WRITING.filter(item => item.type === "insight");
  const caseStudies = WRITING.filter(item => item.type === "case-study");
  const featured = WRITING.filter(item => item.featured);
  const archive = WRITING.filter(item => !item.featured);

  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.eyebrow}>Writing Hub</p>
              <h1 className={styles.pageTitle}>Curated thinking on AI governance and consequence-aware systems.</h1>
              <p className={styles.bodyText}>
                A unified collection of publications, insights, and case studies exploring how to design systems
                that surface consequence and gain trust through thoughtful governance.
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

        {featured.length > 0 && (
          <section className={styles.section}>
            <div className={styles.inner}>
              <ScrollReveal className={styles.sectionHeader}>
                <div>
                  <p className={styles.kicker}>Featured</p>
                  <h2 className={styles.sectionTitle}>Selected pieces with special relevance.</h2>
                </div>
                <p className={styles.sectionLead}>
                  These items represent the core thinking behind BagelTech's approach to governance.
                </p>
              </ScrollReveal>

              <div className={styles.writingGrid}>
                {featured.map((item) => (
                  <FeatureCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="publications" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Publications</p>
                <h2 className={styles.sectionTitle}>Formal papers, frameworks, and specifications.</h2>
              </div>
              <p className={styles.sectionLead}>
                Durable pieces that form the research and technical foundation of our work.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {publications.map((item) => (
                <WritingCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="insights" className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Insights</p>
                <h2 className={styles.sectionTitle}>Curated public thinking and field notes.</h2>
              </div>
              <p className={styles.sectionLead}>
                Short-form observations on AI governance, delivery, and systems thinking.
              </p>
            </ScrollReveal>

            <div className={styles.writingGrid}>
              {insights.map((item) => (
                <FeatureCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Case Studies</p>
                <h2 className={styles.sectionTitle}>Representative use cases and patterns.</h2>
              </div>
              <p className={styles.sectionLead}>
                Where governed decision systems matter most in practice.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {caseStudies.map((item) => (
                <WritingCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>The unifying through-line is operational consequence.</h2>
                <p className={styles.ctaText}>
                  Publications, insights, and case studies all explore how to design systems that surface consequence
                  and gain trust through thoughtful governance.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href="/about">
                Learn about BagelTech
              </SmartLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}