"use client";
import styles from "./OverviewTiles.module.css";
import { OVERVIEW_TILES } from "@/content/overview";

export default function OverviewTiles() {
  return (
    <section aria-label="Overview" className={styles.wrapper}>
      <div className={styles.grid}>
        {OVERVIEW_TILES.map((t) => (
          <a key={t.href} href={t.href} className={styles.tile}>
            <div className={styles.tileTitle}>{t.title}</div>
            <div className={styles.tileSubtitle}>{t.subtitle}</div>
            <div className={styles.tileCTA}>{t.CTA ?? 'View'}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
