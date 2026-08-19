import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import MarketingLayout from "@/components/MarketingLayout";
import { WRITING } from "@/content/writing";
import styles from "./page.module.css";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function slugToFilename(slug: string): string | null {
  const files = fs.readdirSync(ARTICLES_DIR);
  // Try exact slug match first (e.g. governance-at-execution.md)
  const direct = files.find((f) => f.replace(/\.md$/, "") === slug);
  if (direct) return direct;
  // Try numbered prefix pattern (01_confidence_is_not_governance.md)
  const numbered = files.find((f) => {
    const base = f.replace(/^\d+_/, "").replace(/\.md$/, "").replace(/_/g, "-");
    return base === slug;
  });
  return numbered ?? null;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2].trim() };
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h1-6b]|<blockquote)(.+)$/gm, "$1")
    .replace(/^<\/p><p>$/gm, "")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => (l.startsWith("<h") || l.startsWith("<blockquote") ? l : `<p>${l}</p>`))
    .join("\n")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<h[1-6]>)/g, "$1")
    .replace(/(<\/h[1-6]>)<\/p>/g, "$1");
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export async function generateStaticParams() {
  return WRITING.filter((w) => !w.external).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = WRITING.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | BagelTech`,
    description: item.excerpt ?? item.summary ?? "",
    openGraph: {
      title: item.title,
      description: item.excerpt ?? item.summary ?? "",
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = WRITING.find((w) => w.slug === slug);
  if (!item) notFound();

  const filename = slugToFilename(slug);
  if (!filename) notFound();

  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const html = markdownToHtml(body);
  const mins = readingTime(body);

  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(frontmatter.date ?? item.publishedAt));

  const siblings = WRITING.filter((w) => !w.external && w.slug !== slug);
  const related = siblings.filter((w) => w.category === item.category).slice(0, 2);
  const others = siblings.filter((w) => w.category !== item.category).slice(0, 2 - related.length);
  const suggestions = [...related, ...others].slice(0, 2);

  return (
    <MarketingLayout>
      <main className={styles.page}>
        {/* Hero band */}
        <div className={styles.heroBand}>
          <div className={styles.heroInner}>
            <Link href="/writing" className={styles.backLink}>
              <span aria-hidden="true">←</span> Writing
            </Link>
            <div className={styles.categoryPill}>{item.category}</div>
            <h1 className={styles.title}>{frontmatter.title ?? item.title}</h1>
            <p className={styles.summary}>{frontmatter.summary ?? item.excerpt ?? item.summary}</p>
            <div className={styles.meta}>
              <span>{date}</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{mins} min read</span>
              {item.workstream && (
                <>
                  <span className={styles.metaDot} aria-hidden="true" />
                  <span>{item.workstream}</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.heroAccent} aria-hidden="true" />
        </div>

        {/* Body */}
        <div className={styles.bodyWrap}>
          <article
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.ctaKicker}>Continue the conversation</p>
              <p className={styles.ctaText}>
                This piece is part of BagelTech&apos;s ongoing thinking on consequence-aware governance.
              </p>
            </div>
            <Link href="/contact" className={styles.ctaBtn}>Start a conversation →</Link>
          </div>

          {/* Related */}
          {suggestions.length > 0 && (
            <section className={styles.related}>
              <p className={styles.relatedKicker}>More writing</p>
              <div className={styles.relatedGrid}>
                {suggestions.map((s) => (
                  <Link key={s.slug} href={`/writing/${s.slug}`} className={styles.relatedCard}>
                    <span className={styles.relatedCat}>{s.category}</span>
                    <strong className={styles.relatedTitle}>{s.title}</strong>
                    <span className={styles.relatedExcerpt}>{s.excerpt ?? s.summary}</span>
                    <span className={styles.relatedArrow}>Read →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </MarketingLayout>
  );
}
