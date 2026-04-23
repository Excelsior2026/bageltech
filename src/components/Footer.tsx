import SmartLink from "./SmartLink";
import BrandMark from "./BrandMark";
import styles from "./Footer.module.css";
import { EXTERNAL_LINKS, WORKSTREAMS } from "@/content/site";

const footerLinks = [
  { href: "/publications", label: "Publications" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: EXTERNAL_LINKS.orcid, label: "ORCID" },
  { href: EXTERNAL_LINKS.github, label: "GitHub" },
  { href: EXTERNAL_LINKS.linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <BrandMark brand="bageltech" variant="dark" size="footer" />
          <p>
            Products, research, and advisory work for institutions building consequence-aware systems.
          </p>
        </div>

        <div className={styles.workstreams} aria-label="Workstreams">
          {WORKSTREAMS.map((stream) => (
            <SmartLink key={stream.href} href={stream.href} className={styles.workstreamLink}>
              <BrandMark brand={stream.brand} variant="dark" size="footer" />
              <small>{stream.role}</small>
            </SmartLink>
          ))}
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <SmartLink key={link.href} href={link.href}>
              {link.label}
            </SmartLink>
          ))}
          <SmartLink href="/bmo" className={styles.bmoLink}>
            BMO
          </SmartLink>
        </nav>
      </div>
    </footer>
  );
}
