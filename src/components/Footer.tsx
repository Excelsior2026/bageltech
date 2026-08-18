import SmartLink from "./SmartLink";
import BrandMark from "./BrandMark";
import styles from "./Footer.module.css";
import { EXTERNAL_LINKS, WORKSTREAMS } from "@/content/site";

const footerLinks = [
  { href: "/research", label: "Research" },
  { href: "/products", label: "Systems" },
  { href: "/contractors", label: "Contractor platform" },
  { href: "/advisory", label: "Advisory" },
  { href: "/writing", label: "Writing" },
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
          <p>Research, systems, and advisory for institutions working through consequential change.</p>
        </div>

        <div className={styles.workstreams} aria-label="Areas of work">
          <p className={styles.kicker}>Areas of work</p>
          {WORKSTREAMS.map((stream) => (
            <SmartLink key={stream.slug} href={stream.href} className={styles.workstreamLink}>
              <span className={styles.workstreamName}>{stream.title}</span>
              <small>{stream.role}</small>
            </SmartLink>
          ))}
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <p className={styles.kicker}>Explore</p>
          {footerLinks.map((link) => (
            <SmartLink key={link.href} href={link.href}>
              {link.label}
            </SmartLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
