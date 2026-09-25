import Link from "next/link";
import BrandMark from "./BrandMark";
import SmartLink from "./SmartLink";
import { EXTERNAL_LINKS } from "@/content/site";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Bagelle Parris Vargas",
    role: "Executive advisory",
    links: [
      { href: "/bpv/advisory", label: "Advisory services" },
      { href: "/bpv/case-studies", label: "Case studies" },
      { href: EXTERNAL_LINKS.advisory, label: "Advisory inquiry" },
    ],
  },
  {
    title: "BDB Labs",
    role: "Research and incubation",
    links: [
      { href: "/bdb-labs/research", label: "Research & publications" },
      { href: "/bdb-labs/repository", label: "Document repository" },
      { href: EXTERNAL_LINKS.research, label: "Research collaboration" },
    ],
  },
  {
    title: "BagelTech",
    role: "Products and company",
    links: [
      { href: "/products", label: "Products" },
      { href: "/insights", label: "Writing" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Link href="/" aria-label="BagelTech home">
              <BrandMark brand="bageltech" variant="dark" size="footer" />
            </Link>
            <p>
              The parent company of Bagelle Parris Vargas and BDB Labs — advisory and research for systems with
              real consequences.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} className={styles.col} aria-label={column.title}>
              <p className={styles.colTitle}>{column.title}</p>
              <p className={styles.colRole}>{column.role}</p>
              {column.links.map((link) => (
                <SmartLink key={link.label} href={link.href}>
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} BagelTech. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <Link href="/contractors/privacy">Privacy</Link>
            <Link href="/contractors/terms">Terms</Link>
            <a href={EXTERNAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={EXTERNAL_LINKS.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
