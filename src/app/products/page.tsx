import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import MarketingLayout from "@/components/MarketingLayout";
import MarketingImage from "@/components/MarketingImage";
import ScrollReveal from "@/components/ScrollReveal";
import SmartLink from "@/components/SmartLink";
import styles from "@/components/Marketing.module.css";
import { EXTERNAL_LINKS, PRODUCTS, WORKSTREAMS } from "@/content/site";

const productsStream = WORKSTREAMS.find((stream) => stream.slug === "bageltech") ?? WORKSTREAMS[0];

export const metadata: Metadata = {
  title: "Products | BagelTech",
  description:
    "Governable AI systems, decision workflows, and institution-facing commercial offerings from BagelTech.",
};

const serve = [
  "Public agencies and regulated operators",
  "Education, health, and contract-heavy environments",
  "Product teams turning governance requirements into usable workflows",
  "Leaders who need traceability before automation scales",
];

const engagementTypes = [
  {
    title: "Pilot",
    body: "A focused implementation path for one product, one decision workflow, or one high-value operational use case.",
  },
  {
    title: "Product partnership",
    body: "Joint shaping for organizations that need domain-specific governance, review, and evidence capture.",
  },
  {
    title: "Governance implementation",
    body: "Translate policy into authority boundaries, escalation logic, and auditable execution patterns.",
  },
];

export default function ProductsPage() {
  return (
    <MarketingLayout>
      <main className={styles.page}>
        <section className={`${styles.pageHero} ${styles.pageHeroBageltech}`}>
          <div className={`${styles.inner} ${styles.pageHeroGrid}`}>
            <ScrollReveal>
              <BrandMark brand="bageltech" variant="light" size="hero" className={styles.heroMark} priority />
              <p className={styles.eyebrow}>{productsStream.role}</p>
              <h1 className={styles.pageTitle}>BagelTech builds systems institutions can actually govern.</h1>
              <p className={styles.bodyText}>
                {productsStream.description} The work is commercial and implementation-oriented: products, pilots, and
                platform patterns for environments where decisions need authority, evidence, and review.
              </p>
              <div className={styles.actions}>
                <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.product}>
                  Discuss a product conversation
                </SmartLink>
                <SmartLink className={styles.buttonSecondary} href="#products">
                  View flagship products
                </SmartLink>
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.imagePanel} delay={120}>
              <MarketingImage src={productsStream.image.src} alt={productsStream.image.alt} priority />
              <p className={styles.imageCaption}>
                Product work belongs here: pilots, platforms, implementation paths, and institution-ready systems.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>What it builds</p>
                <h2 className={styles.sectionTitle}>Governance is treated as product behavior, not after-the-fact policy.</h2>
              </div>
              <p className={styles.sectionLead}>
                Products focus on decision workflows that need scope control, uncertainty handling, evidence capture, and
                accountable human authority.
              </p>
            </ScrollReveal>

            <div className={styles.threeGrid}>
              {engagementTypes.map((item) => (
                <article className={styles.card} key={item.title}>
                  <p className={styles.cardLabel}>Engagement</p>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="products">
          <div className={styles.inner}>
            <ScrollReveal className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Flagship products</p>
                <h2 className={styles.sectionTitle}>Applied systems with a clear path to use.</h2>
              </div>
              <p className={styles.sectionLead}>
                Research may inform these tools, but this lane is about productized work: what it is, who it serves,
                and how it can be piloted.
              </p>
            </ScrollReveal>

            <div className={styles.cardGrid}>
              {PRODUCTS.map((product) => (
                <article className={styles.featureCard} key={product.slug}>
                  <div className={styles.meta}>
                    <span>{product.category}</span>
                    <span>{product.status}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <p className={styles.cardText}>{product.summary}</p>
                  <ul className={styles.list}>
                    <li>{product.audience}</li>
                    <li>{product.approach}</li>
                  </ul>
                  <SmartLink className={styles.cardLink} href={product.href}>
                    Engage on {product.title}
                  </SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.splitGrid}>
              <ScrollReveal className={styles.card}>
                <p className={styles.cardLabel}>Who it serves</p>
                <h2 className={styles.cardTitle}>Organizations where a bad workflow becomes a real-world problem.</h2>
                <ul className={styles.list}>
                  {serve.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal className={styles.card} delay={100}>
                <p className={styles.cardLabel}>How to engage</p>
                <h2 className={styles.cardTitle}>Start with one decision path.</h2>
                <p className={styles.cardText}>
                  A strong first conversation identifies the decision, the authority boundary, the evidence required,
                  and the consequence of a mistake.
                </p>
                <div className={styles.actions}>
                  <SmartLink className={styles.buttonPrimary} href={EXTERNAL_LINKS.product}>
                    Start product scoping
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