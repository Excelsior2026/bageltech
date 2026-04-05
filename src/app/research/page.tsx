"use client";
import React from 'react';
import { RESEARCH } from '@/content/research';
import styles from './page.module.css';

export default function ResearchPage() {
  return (
    <main className={styles.page}>
      <section className={styles.sectionIntro}>
        <p className={styles.sectionTag}>Research</p>
        <h2 className={styles.sectionTitle}>Ideas with a paper trail</h2>
        <p className={styles.sectionDesc}>Selected writings and publications across governance, AI, and policy.</p>
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
              <a href={r.href} className={styles.cardLink} target="_blank" rel="noreferrer">{r.linkLabel}</a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
