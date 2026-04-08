"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#model", label: "Method" },
  { href: "#products", label: "Products" },
  { href: "#research", label: "Publications" },
  { href: "#about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerInner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>BT</span>
          <span className={styles.logoText}>BagelTech</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.ctaButton}>
          Get in touch
        </a>

        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={styles.mobileCta}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
