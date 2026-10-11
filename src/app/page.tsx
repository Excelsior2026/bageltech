import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import SmartLink from "@/components/SmartLink";
import BrandMark from "@/components/BrandMark";
import {
  FEATURED_PRODUCTS,
  PRODUCTS,
  PROOF_POINTS,
  WORKSTREAMS,
} from "@/content/site";
import { WRITING } from "@/content/writing";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "BagelTech | Technology & Intelligence",
  description:
    "BagelTech develops intelligent systems, explores what comes next, and helps organizations put technology to work in the real world.",
  openGraph: {
    title: "BagelTech | Technology & Intelligence",
    description:
      "Technology built to make complex things more understandable, governable, and useful.",
    type: "website",
    url: "https://www.bageltech.net",
  },
};

const featured = FEATURED_PRODUCTS.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
  (p): p is (typeof PRODUCTS)[number] => Boolean(p),
);

const latestWriting = [...WRITING]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomePage() {
  return (
    <MarketingLayout>
      <main className={styles.home}>
        {/* ── HERO ───────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Independent research, systems, and advisory practice</p>
            <h1 className={styles.heroTitle}>
              Technology built to make complex things more understandable,
              governable, and <em>useful.</em>
            </h1>
            <p className={styles.lede}>
              BagelTech develops intelligent systems, explores what comes next, and helps
              organizations put technology to work in the real world.
            </p>

            <div className={styles.heroActions}>
              <SmartLink href="/products" className={styles.btnPrimary}>
                Explore our work
              </SmartLink>
              <SmartLink href="/contact" className={styles.btnGhost}>
                Start a conversation
              </SmartLink>
            </div>

            <dl className={styles.proofRow}>
              {PROOF_POINTS.map((point) => (
                <div key={point.label} className={styles.proofItem}>
                  <dt className={styles.proofValue}>{point.value}</dt>
                  <dd className={styles.proofLabel}>{point.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── DIVISIONS ───────────────────────────────────── */}
        <section className={styles.divisionsSection}>
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>One group. Three ways to create momentum.</h2>
              <p className={styles.sectionLead}>
                Each division has its own remit, its own audience, and its own standard of proof.
              </p>
            </header>

            <div className={styles.divisions}>
              {WORKSTREAMS.map((stream) => (
                <SmartLink key={stream.slug} href={stream.href} className={styles.division}>
                  <BrandMark brand={stream.brand} variant="icon" size="compact" />
                  <p className={styles.divisionRole}>{stream.role}</p>
                  <h3 className={styles.divisionName}>{stream.title}</h3>
                  <p className={styles.divisionSummary}>{stream.summary}</p>
                  <span className={styles.divisionCta}>
                    {stream.cta} <span aria-hidden="true">→</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ────────────────────────────────────── */}
        <section className={styles.productsSection}>
          <div className={styles.wrap}>
            <header className={styles.sectionHeadSplit}>
              <div>
                <p className={styles.eyebrow}>Products</p>
                <h2 className={styles.sectionTitle}>
                  Systems that help teams work better every day.
                </h2>
              </div>
              <SmartLink href="/products" className={styles.inlineLink}>
                View all products <span aria-hidden="true">→</span>
              </SmartLink>
            </header>

            <div className={styles.productGrid}>
              {featured.map((product) => (
                <SmartLink key={product.slug} href={product.href} className={styles.productCard}>
                  <div className={styles.productCardTop}>
                    <h3 className={styles.productName}>{product.title}</h3>
                    <span className={styles.productStatus}>{product.status}</span>
                  </div>
                  <p className={styles.productCategory}>{product.category}</p>
                  <p className={styles.productSummary}>{product.summary}</p>
                  <span className={styles.productCta}>
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        {/* ── WRITING ─────────────────────────────────────── */}
        <section className={styles.writingSection}>
          <div className={styles.wrap}>
            <header className={styles.sectionHeadSplit}>
              <div>
                <p className={styles.eyebrow}>Ideas &amp; insights</p>
                <h2 className={styles.sectionTitle}>
                  Thoughts on technology, society, and intelligence.
                </h2>
              </div>
              <SmartLink href="/insights" className={styles.inlineLink}>
                Read the latest <span aria-hidden="true">→</span>
              </SmartLink>
            </header>

            <div className={styles.writingGrid}>
              {latestWriting.map((item) => (
                <SmartLink key={item.slug} href={item.sourceUrl} className={styles.writingCard}>
                  <p className={styles.writingMeta}>
                    <span className={styles.writingCategory}>{item.category}</span>
                    <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                  </p>
                  <h3 className={styles.writingTitle}>{item.title}</h3>
                  {item.excerpt ? <p className={styles.writingExcerpt}>{item.excerpt}</p> : null}
                </SmartLink>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.wrap}>
            <div className={styles.ctaBand}>
              <div>
                <h2 className={styles.ctaTitle}>
                  Consequential systems deserve accountable operators.
                </h2>
                <p className={styles.ctaLead}>
                  If you are evaluating governance, modernization, or a platform decision,
                  the fastest way forward is a short conversation.
                </p>
              </div>
              <SmartLink href="/contact" className={styles.btnLight}>
                Talk to us
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
