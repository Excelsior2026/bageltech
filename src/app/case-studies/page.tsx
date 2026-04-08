"use client";

import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";
import styles from "./page.module.css";

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Representative use cases</p>
        <h1>Where governed decision systems matter most.</h1>
        <p className={styles.lead}>
          These are representative engagement patterns, not confidential client writeups. They show the kinds of
          operational environments BagelTech is built to support.
        </p>
        <Link className={styles.backLink} href="/">
          Return to BagelTech
        </Link>
      </section>

      <section className={styles.grid}>
        {CASE_STUDIES.map((item) => (
          <article className={styles.card} key={item.title}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{item.icon}</span>
              <div>
                <p className={styles.cardLabel}>Use case</p>
                <h2>{item.title}</h2>
              </div>
            </div>
            <p>
              <strong>Problem</strong>
              {item.challenge}
            </p>
            <p>
              <strong>Approach</strong>
              {item.solution}
            </p>
            <ul className={styles.resultsList}>
              {item.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
