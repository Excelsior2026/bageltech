import MarketingLayout from "./MarketingLayout";
import styles from "@/components/Marketing.module.css";

type LegalSection = {
  title: string;
  note: string;
};

type LegalPlaceholderProps = {
  title: string;
  summary: string;
  sections: LegalSection[];
};

/**
 * Structural shell for a site-wide policy page. It deliberately contains no
 * substantive legal language. Human/legal review and approval are required
 * before any such language is published.
 */
export default function LegalPlaceholder({ title, summary, sections }: LegalPlaceholderProps) {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>Site policy — draft structure</p>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.bodyText}>{summary}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.card} role="note" aria-label="Review status">
              <p className={styles.cardLabel}>Review status</p>
              <h2 className={styles.cardTitle}>Requires human and legal review before publication</h2>
              <p className={styles.cardText}>
                This page establishes structure only. It contains no substantive policy language,
                legal commitment, certification, compliance claim or operational assurance. The
                published text must be written and approved by an accountable human owner before
                this page is indexed or linked as an approved policy.
              </p>
            </div>

            <div className={styles.archiveList}>
              {sections.map((section) => (
                <article className={styles.archiveItem} key={section.title}>
                  <div className={styles.archiveBody}>
                    <h2 className={styles.articleTitle}>{section.title}</h2>
                    <p>{section.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
