import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { CASE_STUDIES } from "@/content/case-studies";
import { EXTERNAL_LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Case Studies | Bagelle Parris Vargas",
  description:
    "Representative engagement patterns for Bagelle Parris Vargas: permitting and licensing, public-safety escalation, and health-professions education.",
};

export default function CaseStudiesPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroBpv}`}>
          <div className={styles.inner}>
            <BrandMark brand="bpv" variant="icon-dark" size="hero" className={styles.heroMark} priority />
            <p className={styles.eyebrow}>Bagelle Parris Vargas — Case studies</p>
            <h1 className={styles.pageTitle}>
              Where governed decision systems <em>matter most.</em>
            </h1>
            <p className={styles.bodyText}>
              These are representative engagement patterns, not confidential client write-ups. They show the operating
              environments where Bagelle Parris Vargas advisory work applies.
            </p>
            <div className={styles.actions}>
              <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.advisory}>
                Start an advisory inquiry
              </SmartLink>
              <SmartLink className={styles.buttonSecondary} href="/bpv/advisory">
                Advisory services
              </SmartLink>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.inner} ${styles.cardGrid}`}>
            {CASE_STUDIES.map((study, index) => (
              <article className={styles.featureCard} key={study.title}>
                <p className={styles.cardLabel}>Use case {String(index + 1).padStart(2, "0")}</p>
                <h2 className={styles.cardTitle}>{study.title}</h2>
                <div>
                  <p className={styles.cardLabel}>Problem</p>
                  <p className={styles.cardText}>{study.challenge}</p>
                </div>
                <div>
                  <p className={styles.cardLabel}>Approach</p>
                  <p className={styles.cardText}>{study.solution}</p>
                </div>
                <ul className={styles.list}>
                  {study.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>Running a program like one of these?</h2>
                <p className={styles.ctaText}>
                  Start with a short note on the decision, the delivery risk, and who has to live with the outcome.
                </p>
              </div>
              <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.advisory}>
                Talk to the firm
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
