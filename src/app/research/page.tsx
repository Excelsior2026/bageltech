"use client";
import { RESEARCH } from "@/content/research";
import styles from "./page.module.css";

export const metadata = {
  title: "BagelTech Research",
  description: "Research and publications in AI governance, jurisprudence, and related topics.",
};

export default function ResearchPage() {
  return (
    <main className={styles.page}>
      <section className={styles.sectionIntro}>
        <p className={styles.sectionTag}>Research</p>
        <h2 className={styles.sectionTitle}>Ideas with an actual paper trail</h2>
        <p className={styles.sectionDesc}>Selected writings and publishes with full references.</p>
      </section>
      <section className={styles.grid}>
        {RESEARCH.map((r) => (
          <article key={r.title} className={styles.card}>
            <header className={styles.cardHeader}>
              <span className={styles.cardType}>{r.type}</span>
              <span className={styles.cardYear}>{r.year}</span>
            </header>
            <h3 className={styles.cardTitle}>{r.title}</h3>
            <p className={styles.cardBody}>{r.body}</p>
            {r.href && (
              <a href={r.href} className={styles.cardLink} target="_blank" rel="noreferrer">
                {r.linkLabel}
              </a>
            )}
          </article>
        ))}
      </section>
      <p className={styles.backLinkWrap}><a href="/">Back to home</a></p>
    </main>
  );
}
