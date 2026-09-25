import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import RepositoryBrowser from "@/components/repository/RepositoryBrowser";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { CURATED_REPOSITORY_DOCUMENTS } from "@/content/document-repository";

export const metadata: Metadata = {
  title: "Document Repository | BDB Labs",
  description:
    "A searchable repository for BDB Labs and BagelTech research papers, specifications, reports, and source documents.",
};

export default function RepositoryPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroLabs}`}>
          <div className={styles.inner}>
            <BrandMark brand="bdb-labs" variant="icon-dark" size="hero" className={styles.heroMark} priority />
            <p className={styles.eyebrow}>BDB Labs — Document repository</p>
            <h1 className={styles.pageTitle}>Papers, specifications, and working source material.</h1>
            <p className={styles.bodyText}>
              A searchable library for the durable documents behind BDB Labs research, BagelTech products, and
              Bagelle Parris Vargas advisory methods.
            </p>
            <div className={styles.actions}>
              <SmartLink className={styles.buttonPrimary} href="/bdb-labs/research">
                Research &amp; publications
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Library</p>
                <h2 className={styles.sectionTitle}>Find a document by type, topic, or workstream.</h2>
              </div>
              <p className={styles.sectionLead}>
                The repository starts with the current publication inventory and can include browser-local uploads from
                the dashboard.
              </p>
            </div>

            <RepositoryBrowser curatedDocuments={CURATED_REPOSITORY_DOCUMENTS} />
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
