"use client";
import Link from "next/link";
import styles from "./OverviewTiles.module.css";

const tiles = [
  { href: "/case-studies", title: "Case Studies", subtitle: "Real deployments and outcomes", CTA: "View all" },
  { href: "/research", title: "Research", subtitle: "Publications and thought leadership", CTA: "View all" },
  { href: "/bagel", title: "Bagel Easter Egg", subtitle: "A playful interactive experience", CTA: "Enter" },
];

export default function OverviewTiles() {
  return (
    <section aria-label="Overview" className={styles.wrapper}>
      <div className={styles.grid}>
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className={styles.tile}>
            <div className={styles.tileTitle}>{t.title}</div>
            <div className={styles.tileSubtitle}>{t.subtitle}</div>
            <div className={styles.tileCTA}>{t.CTA}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
