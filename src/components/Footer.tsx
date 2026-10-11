import Link from "next/link";
import BrandMark from "./BrandMark";
import { EXTERNAL_LINKS } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link href="/" aria-label="BagelTech home">
            <BrandMark brand="bageltech" variant="light" size="footer" />
          </Link>
          <p>Technology and intelligence<br />for a changing world.</p>
        </div>

        <nav className={styles.col} aria-label="Company">
          <p className={styles.kicker}>Company</p>
          <Link href="/about">About BagelTech</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <nav className={styles.col} aria-label="Divisions">
          <p className={styles.kicker}>Divisions</p>
          <Link href="/bdb-labs/research">BDB Labs</Link>
          <Link href="/bpv/advisory">Advisory</Link>
          <Link href="/bdb-labs/repository">Repository</Link>
        </nav>

        <nav className={styles.col} aria-label="Resources">
          <p className={styles.kicker}>Resources</p>
          <Link href="/insights">Writing</Link>
          <Link href="/bdb-labs/publications">Publications</Link>
          <Link href="/contractors">Contractor Platform</Link>
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <p className={styles.kicker}>Legal</p>
          <Link href="/contractors/privacy">Privacy Policy</Link>
          <Link href="/contractors/terms">Terms of Service</Link>
        </nav>

        <div className={styles.legalRight}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} BagelTech, Inc.<br />
            All rights reserved.
          </span>
          <div className={styles.social} aria-label="Elsewhere">
            <a href={EXTERNAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.48-2.23-1.67-2.23-0.91 0-1.45 0.61-1.69 1.2-0.09 0.21-0.11 0.5-0.11 0.8v5.8H9.88s0.05-9.42 0-10.4h3.55v1.47c0.47-0.72 1.31-1.76 3.2-1.76 2.33 0 4.08 1.52 4.08 4.79v5.9zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V10.05h3.56v10.4z" /></svg>
            </a>
            <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68 0.5 0.09 0.68-0.22 0.68-0.48v-1.7c-2.78 0.62-3.37-1.36-3.37-1.36-0.45-1.18-1.11-1.5-1.11-1.5-0.91-0.64 0.07-0.62 0.07-0.62 1 0.07 1.53 1.06 1.53 1.06 0.89 1.56 2.34 1.11 2.91 0.85 0.09-0.66 0.35-1.11 0.63-1.37-2.22-0.26-4.56-1.14-4.56-5.06 0-1.12 0.39-2.03 1.03-2.75-0.1-0.26-0.45-1.3 0.1-2.7 0 0 0.84-0.27 2.75 1.05 0.8-0.23 1.66-0.34 2.51-0.34 0.85 0.01 1.71 0.12 2.51 0.34 1.91-1.32 2.75-1.05 2.75-1.05 0.55 1.4 0.2 2.44 0.1 2.7 0.64 0.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06 0.36 0.32 0.68 0.94 0.68 1.9v2.82c0 0.27 0.18 0.58 0.69 0.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" /></svg>
            </a>
            <a href={EXTERNAL_LINKS.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 20.9H4.7V3.1h2.67v17.8zm5.95 0H9.35V3.1h4.03c3.71 0 6.09 2.65 6.09 5.9 0 3.31-2.44 5.9-6.15 5.9h-2.96V3.1h-.04zm0-2.41h2.04c2.4 0 3.92-1.71 3.92-3.5 0-1.79-1.47-3.44-3.92-3.44h-2.04v6.94zM8.1 7.84a1.62 1.62 0 1 1 0-3.23 1.62 1.62 0 0 1 0 3.23z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* A quiet door for anyone who reads this far. */}
      <div className={styles.pawRow}>
        <Link href="/bmo" className={styles.pawLink}>
          <span aria-hidden="true">🐾</span>
          <span className={styles.pawText}>
            Bagel, Chief Mischief Officer, has a small office on this site.
          </span>
        </Link>
      </div>
    </footer>
  );
}
