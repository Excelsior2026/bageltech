"use client";
import React from 'react';
import { CASE_STUDIES } from '@/content/case-studies';
import styles from './page.module.css';

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1>Case Studies</h1>
      </section>
      <section className={styles.grid}>
        {CASE_STUDIES.map((cs) => (
          <article key={cs.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{cs.icon}</span>
              <h3 className={styles.cardTitle}>{cs.title}</h3>
            </div>
            <p className={styles.cardBody}><strong>Challenge:</strong> {cs.challenge}</p>
            <p className={styles.cardBody}><strong>Solution:</strong> {cs.solution}</p>
            <div className={styles.cardFooter}>
              <strong>Results:</strong>
              <ul className={styles.resultsList}>{cs.results.map((r,i)=> (<li key={i}>{r}</li>))}</ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
