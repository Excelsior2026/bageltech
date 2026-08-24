"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/bdb-labs/research", label: "BDB Labs" },
  { href: "/bpv/advisory", label: "Services" },
  { href: "/insights", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const mobileMenuClasses = [styles.mobileMenu, isMobileMenuOpen ? styles.mobileMenuOpen : ""].filter(Boolean).join(" ");
  const menuBtnClasses = [styles.mobileMenuButton, isMobileMenuOpen ? styles.open : ""].filter(Boolean).join(" ");

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="BagelTech home">
          <img src="/brand/bageltech/lockup-light.svg" alt="BagelTech" className={styles.logoImg} width={260} height={52} />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button className={styles.hamburger} aria-label="Open menu" onClick={() => setIsMobileMenuOpen((v)=>!v)}>
          <span /><span /><span />
        </button>

        <button
          className={menuBtnClasses}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
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
            <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
