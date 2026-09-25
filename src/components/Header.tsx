"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/bpv/advisory", label: "BPV Advisory", detail: "Bagelle Parris Vargas — executive advisory", match: ["/bpv"] },
  { href: "/bdb-labs/research", label: "BDB Labs", detail: "Research, frameworks, and publications", match: ["/bdb-labs"] },
  { href: "/products", label: "Products", detail: "BagelTech platforms and pilots", match: ["/products", "/contractors"] },
  { href: "/insights", label: "Writing", detail: "Essays on governance and delivery", match: ["/insights"] },
  { href: "/about", label: "About", detail: "The company and its founder", match: ["/about"] },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const isActive = (match: string[]) => match.some((prefix) => pathname.startsWith(prefix));
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="BagelTech home" onClick={closeMenu}>
          <BrandMark brand="bageltech" variant="dark" size="header" priority />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              aria-current={isActive(link.match) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.ctaButton}>
          Start a conversation
        </Link>

        <button
          type="button"
          className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuButtonOpen : ""}`}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
              <span className={styles.mobileNavLabel}>{link.label}</span>
              <span className={styles.mobileNavDetail}>{link.detail}</span>
            </Link>
          ))}
          <Link href="/contact" className={styles.mobileCta} onClick={closeMenu}>
            Start a conversation →
          </Link>
        </nav>
      </div>
    </header>
  );
}
