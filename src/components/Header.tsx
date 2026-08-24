"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/bdb-labs", label: "Research" },
  { href: "/products", label: "Systems" },
  { href: "/bpv", label: "Services" },
  { href: "/insights", label: "Writing" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const headerClasses = [styles.header, isScrolled ? styles.scrolled : ""].filter(Boolean).join(" ");
  const menuButtonClasses = [styles.mobileMenuButton, isMobileMenuOpen ? styles.open : ""]
    .filter(Boolean)
    .join(" ");
  const mobileMenuClasses = [styles.mobileMenu, isMobileMenuOpen ? styles.mobileMenuOpen : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="BagelTech home">
          <BrandMark brand="bageltech" variant="light" size="header" priority />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.ctaButton}>
          Start a conversation
        </Link>

        <button
          className={menuButtonClasses}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      <div className={mobileMenuClasses}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.mobileCta} onClick={() => setIsMobileMenuOpen(false)}>
            Start a conversation
          </Link>
        </nav>
      </div>
    </header>
  );
}
