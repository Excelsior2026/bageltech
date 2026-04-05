"use client";
import Link from 'next/link';
import styles from './page.module.css';

type CaseItem = {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  icon?: string;
};

const items: CaseItem[] = [
  {
    title: 'Permit Processing Efficiency',
    challenge: 'High-volume permits with inconsistent decisions and missing audit trails',
    solution: 'Applied ELEANOR governance to route decisions with audit trails',
    results: ['90% faster processing', 'Audit-ready decisions', 'Reduced retries by 40%'],
    icon: '🏛️',
  },
  {
    title: 'Public Safety AI Deployment',
    challenge: 'Uncertain routing during crises',
    solution: 'Ensembled decision framework with escalation to human operator',
    results: ['50% faster response', '97% accuracy in triage'],
    icon: '🚨',
  },
  {
    title: 'Healthcare Education Transcript',
    challenge: 'Uncertain outputs and inconsistent note-taking',
    solution: 'CogniScribe with uncertainty flags',
    results: ['Improved study notes', 'Higher student satisfaction'],
    icon: '🏥',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.sectionIntro}>
        <p className={styles.sectionTag}>Case Studies</p>
        <h2>Real deployments and outcomes</h2>
        <p>Concise summaries of engagements with measurable impact.</p>
      </section>
      <section className={styles.grid}>
        {items.map((it) => (
          <article key={it.title} className={styles.card}>
            <header className={styles.cardHeader}>
              <span className={styles.icon}>{it.icon}</span>
              <h3 className={styles.cardTitle}>{it.title}</h3>
            </header>
            <p className={styles.cardBody}><strong>Challenge:</strong> {it.challenge}</p>
            <p className={styles.cardBody}><strong>Solution:</strong> {it.solution}</p>
            <div className={styles.cardFooter}>
              <strong>Results:</strong>
              <ul>
                {it.results.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <p className={styles.backLinkWrap}><Link href="/">Back to home</Link></p>
    </main>
  );
}
