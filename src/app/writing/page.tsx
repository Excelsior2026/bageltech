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
  const isPublication = item.type === "publication";
  const isInsight = item.type === "insight";
  const isCaseStudy = item.type === "case-study";

  return (
    <article className={`${styles.archiveItem} ${item.type}`} id={item.slug}>
      <div>
        <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
        <div className={styles.tagRow}>
          <span className={styles.tag}>{item.category}</span>
          {item.workstream && (
            <span className={styles.tag} style={{ opacity: 0.7 }}>{item.workstream}</span>
          )}
        </div>
      </div>
      <div className={styles.archiveBody}>
        <h2>{item.title}</h2>
        <p>{item.excerpt || item.summary}</p>
        {isCaseStudy && item.icon && (
          <div className={styles.caseStudyIcon}>{item.icon}</div>
        )}
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
      <SmartLink 
        className={styles.cardLink} 
        href={item.sourceUrl}
      >
        {item.external ? `Open on ${item.source}` : 
         isCaseStudy ? "View case study" :
         isInsight ? "Read insight" : "Read publication"}
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

        {/* Featured Writing */}
        {featured.length > 0 && (
          <section className={styles.section}>
            <div className={styles.inner}>
              <ScrollReveal className={styles.sectionHeader}>
                <div>
                  <p className={styles.kicker}>Featured</p>
                  <h2 className={styles.sectionTitle}>Selected pieces with special relevance.</h2>
                </div>
                <p className={styles.sectionLead}>
                  These items represent the core thinking behind BagelTech's approach to governance and consequence awareness.
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
                    <p className={styles.cardText}>{item.excerpt || item.summary}</p>
                    <div className={styles.tagRow}>
                      {item.tags?.map((tag) => (
                        <span className={styles.tag} key={tag} style={{ fontSize: "0.75rem" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                      {item.external ? `Open on ${item.source}` : "Read more"}
                    </SmartLink>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Writing Sections */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>By Type</p>
                <h2 className={styles.sectionTitle}>Explore writing by format and purpose.</h2>
              </div>
              <p className={styles.sectionLead}>
                Different formats serve different purposes in the governance ecosystem.
              </p>
            </ScrollReveal>

            <div className={styles.writingTypes}>
              {/* Publications */}
              <div className={styles.writingTypeSection}>
                <h3 className={styles.writingTypeTitle}>📚 Publications</h3>
                <p className={styles.writingTypeDescription}>
                  Formal papers, frameworks, specifications, and research notes that form the durable foundation of our work.
                </p>
                <div className={styles.subItemGrid}>
                  {publications.slice(0, 3).map((item) => (
                    <div key={item.slug} className={styles.subItem}>
                      <h4>{item.title}</h4>
                      <p className={styles.subItemMeta}>{item.category} • {formatDate(item.publishedAt)}</p>
                    </div>
                  ))}
                </div>
                <SmartLink className={styles.buttonSecondary} href="/writing#publications">
                  View all publications
                </SmartLink>
              </div>

              {/* Insights */}
              <div className={styles.writingTypeSection}>
                <h3 className={styles.writingTypeTitle}>💡 Insights</h3>
                <p className={styles.writingTypeDescription}>
                  Curated public thinking, field notes, and short-form observations on AI governance and delivery.
                </p>
                <div className={styles.subItemGrid}>
                  {insights.slice(0, 3).map((item) => (
                    <div key={item.slug} className={styles.subItem}>
                      <h4>{item.title}</h4>
                      <p className={styles.subItemMeta}>{item.category} • {formatDate(item.publishedAt)}</p>
                    </div>
                  ))}
                </div>
                <SmartLink className={styles.buttonSecondary} href="/writing#insights">
                  View all insights
                </SmartLink>
              </div>

              {/* Case Studies */}
              <div className={styles.writingTypeSection}>
                <h3 className={styles.writingTypeTitle}>🎯 Case Studies</h3>
                <p className={styles.writingTypeDescription}>
                  Representative use cases showing where governed decision systems matter most in practice.
                </p>
                <div className={styles.subItemGrid}>
                  {caseStudies.slice(0, 3).map((item) => (
                    <div key={item.slug} className={styles.subItem}>
                      <h4>{item.title}</h4>
                      <p className={styles.subItemMeta}>{item.category} • {formatDate(item.publishedAt)}</p>
                    </div>
                  ))}
                </div>
                <SmartLink className={styles.buttonSecondary} href="/writing#case-studies">
                  View all case studies
                </SmartLink>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
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

        {/* Insights Section */}
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
                <article className={styles.featureCard} key={item.slug}>
                  <div className={styles.meta}>
                    <span>{item.category}</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.excerpt}</p>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    {item.external ? `Open on ${item.source}` : "Read insight"}
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
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

            <div className={styles.writingGrid}>
              {caseStudies.map((item) => (
                <article className={styles.featureCard} key={item.slug}>
                  <div className={styles.meta}>
                    <span>{item.category}</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <div className={styles.cardHeader}>
                    {item.icon && <span className={styles.caseStudyIcon}>{item.icon}</span>}
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <p><strong>Problem:</strong> {item.challenge}</p>
                    <p><strong>Approach:</strong> {item.solution}</p>
                    <div className={styles.resultsContainer}>
                      <strong>Results:</strong>
                      <ul className={styles.resultsList}>
                        {item.results?.map((result, index) => (
                          <li key={index}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <SmartLink className={styles.cardLink} href={item.sourceUrl}>
                    View case study
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Full Archive */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Complete Archive</p>
                <h2 className={styles.sectionTitle}>All writing in one place.</h2>
              </div>
              <p className={styles.sectionLead}>
                Publications, insights, and case studies organized by category and date.
              </p>
            </ScrollReveal>

            <div className={styles.archiveList}>
              {archive.map((item) => (
                <WritingCard key={item.slug} item={item} />
              ))}
            </div>

            <div className={styles.actions}>
              <SmartLink className={styles.buttonSecondary} href="/about">
                Learn about BagelTech
              </SmartLink>
              <SmartLink className={styles.buttonSecondary} href="/contact">
                Get in touch
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}