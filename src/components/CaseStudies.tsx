"use client";
import React from "react";
import { CASE_STUDIES } from "@/content/case-studies";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  return (
    <section className={styles.caseStudiesSection} aria-label="Case studies">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionTag}>Case Studies</p>
        <h2 className={styles.sectionTitle}>Proven results</h2>
        <p className={styles.sectionDesc}>Real deployments with measurable impact.</p>
      </div>
      <div className={styles.caseStudiesGrid}>
        {CASE_STUDIES.map((cs) => (
          <article key={cs.title} className={styles.caseStudyCard}>
            <div className={styles.caseStudyHeader}>
              <span className={styles.caseStudyIcon}>{cs.icon}</span>
              <h3 className={styles.caseStudyTitle}>{cs.title}</h3>
            </div>
            <p className={styles.caseStudyChallenge}><strong>The Challenge:</strong> {cs.challenge}</p>
            <p className={styles.caseStudySolution}><strong>Solution:</strong> {cs.solution}</p>
            <div className={styles.caseStudyResults}>
              <strong>Results:</strong>
              <ul className={styles.resultsList}>
                {cs.results.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
