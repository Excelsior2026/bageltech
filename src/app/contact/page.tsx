import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import type { BrandKey } from "@/content/brand-tokens";
import { CONTACT_OPTIONS, EXTERNAL_LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact | BagelTech",
  description:
    "Route a product, research, advisory, speaking, or general inquiry to the right BagelTech workstream.",
};

const contactBrands: Record<string, BrandKey | undefined> = {
  "Product or platform": "bageltech",
  "Research or collaboration": "bdb-labs",
  "Advisory or speaking": "bpv",
};

const brandedContactOptions = CONTACT_OPTIONS.map((option) => ({
  ...option,
  brand: contactBrands[option.title],
}));

export default function ContactPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={styles.pageHero}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.eyebrow}>Contact</p>
              <h1 className={styles.pageTitle}>Start with the conversation type.</h1>
              <p className={styles.bodyText}>
                The fastest path is to route the inquiry by lane: product or platform, research collaboration, advisory
                or speaking, or a general note.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Inquiry selector</p>
                <h2 className={styles.sectionTitle}>Pick the door closest to the work.</h2>
              </div>
              <p className={styles.sectionLead}>
                Each option opens an email with the right subject line. A fuller form can come later if volume requires
                it.
              </p>
            </ScrollReveal>

            <div className={styles.contactGrid}>
              {brandedContactOptions.map((option) => (
                <SmartLink className={styles.contactCard} href={option.href} key={option.title}>
                  {option.brand ? (
                    <BrandMark brand={option.brand} variant="icon" size="compact" className={styles.contactCardMark} />
                  ) : null}
                  <p className={styles.cardLabel}>Inquiry</p>
                  <h2>{option.title}</h2>
                  <p>{option.summary}</p>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.splitGrid}>
              <ScrollReveal className={styles.card}>
                <p className={styles.cardLabel}>Direct email</p>
                <h2 className={styles.cardTitle}>bill@bageltech.net</h2>
                <p className={styles.cardText}>
                  Include the workstream, the decision or program context, and what would make the first conversation
                  useful.
                </p>
                <SmartLink className={styles.cardLink} href={EXTERNAL_LINKS.email}>
                  Send email
                </SmartLink>
              </ScrollReveal>

              <ScrollReveal className={styles.card} delay={100}>
                <p className={styles.cardLabel}>Elsewhere</p>
                <h2 className={styles.cardTitle}>Public profiles and research trail.</h2>
                <div className={styles.actions}>
                  <SmartLink className={styles.buttonSecondary} href={EXTERNAL_LINKS.linkedin}>
                    LinkedIn
                  </SmartLink>
                  <SmartLink className={styles.buttonSecondary} href={EXTERNAL_LINKS.orcid}>
                    ORCID
                  </SmartLink>
                  <SmartLink className={styles.buttonSecondary} href={EXTERNAL_LINKS.github}>
                    GitHub
                  </SmartLink>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
