import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link href="/" aria-label="BagelTech home">
            <img src="/brand/bageltech/lockup-light.svg" alt="BagelTech" className={styles.brandLogo} width={180} height={36} />
          </Link>
          <p>Technology and intelligence<br/>for a changing world.</p>
        </div>

        <nav className={styles.col} aria-label="Company">
          <p className={styles.kicker}>Company</p>
          <Link href="/about">About BagelTech</Link>
          <Link href="/about">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <nav className={styles.col} aria-label="Resources">
          <p className={styles.kicker}>Resources</p>
          <Link href="/insights">Writing</Link>
          <Link href="/bdb-labs/research">Research</Link>
          <Link href="/insights">Press</Link>
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <p className={styles.kicker}>Legal</p>
          <Link href="/contractors/privacy">Privacy Policy</Link>
          <Link href="/contractors/terms">Terms of Service</Link>
          <Link href="/contact">Security</Link>
        </nav>

        <div className={styles.legalRight}>
          <span className={styles.copy}>© 2025 BagelTech, Inc.<br/>All rights reserved.</span>
          <div className={styles.social} aria-label="Social links">
            <a href="https://linkedin.com/in/billparris92120" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.48-2.23-1.67-2.23-0.91 0-1.45 0.61-1.69 1.2-0.09 0.21-0.11 0.5-0.11 0.8v5.8H9.88s0.05-9.42 0-10.4h3.55v1.47c0.47-0.72 1.31-1.76 3.2-1.76 2.33 0 4.08 1.52 4.08 4.79v5.9zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V10.05h3.56v10.4z"/></svg>
            </a>
            <a href="https://github.com/Excelsior2026" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68 0.5 0.09 0.68-0.22 0.68-0.48v-1.7c-2.78 0.62-3.37-1.36-3.37-1.36-0.45-1.18-1.11-1.5-1.11-1.5-0.91-0.64 0.07-0.62 0.07-0.62 1 0.07 1.53 1.06 1.53 1.06 0.89 1.56 2.34 1.11 2.91 0.85 0.09-0.66 0.35-1.11 0.63-1.37-2.22-0.26-4.56-1.14-4.56-5.06 0-1.12 0.39-2.03 1.03-2.75-0.1-0.26-0.45-1.3 0.1-2.7 0 0 0.84-0.27 2.75 1.05 0.8-0.23 1.66-0.34 2.51-0.34 0.85 0.01 1.71 0.12 2.51 0.34 1.91-1.32 2.75-1.05 2.75-1.05 0.55 1.4 0.2 2.44 0.1 2.7 0.64 0.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06 0.36 0.32 0.68 0.94 0.68 1.9v2.82c0 0.27 0.18 0.58 0.69 0.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.9 7.9L23.3 22h-6.2l-4.9-6.4L6.6 22H3.5l7.4-8.5L3 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L6.1 3.9H4.2L17.8 20z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
