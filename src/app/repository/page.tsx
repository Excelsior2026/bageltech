import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import RepositoryBrowser from "@/components/repository/RepositoryBrowser";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { CURATED_REPOSITORY_DOCUMENTS } from "@/content/document-repository";

export const metadata: Metadata = {
  title: "Document Repository | BagelTech",
  description:
    "A searchable repository for BagelTech and BDB Labs articles, research papers, specifications, reports, and source documents.",
};

export default function RepositoryPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroLabs}`}>
          <div className={styles.inner}>
            <ScrollReveal>
              <BrandMark brand="bdb-labs" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>Document Repository</p>
              <h1 className={styles.pageTitle}>Papers, articles, specifications, and working source material.</h1>
              <p className={styles.bodyText}>
                A searchable library for the durable documents behind BagelTech products, BDB Labs research, and
                advisory methods.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href="/dashboard/repository">
                  Upload documents
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href="/publications">
                  Formal publications
                </SmartLink>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Library</p>
                <h2 className={styles.sectionTitle}>Find the document by type, topic, or workstream.</h2>
              </div>
              <p className={styles.sectionLead}>
                The repository starts with the current publication inventory and can include browser-local uploads from
                the dashboard.
              </p>
            </ScrollReveal>

            <RepositoryBrowser curatedDocuments={CURATED_REPOSITORY_DOCUMENTS} />
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
