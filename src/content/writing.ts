/**
 * Derived view of the published article registry.
 *
 * The authoritative metadata lives in the frontmatter of `content/articles/*.md`
 * and is read by `src/lib/articles.ts`. This module only adapts it to the shape
 * used by the writing index and homepage; it deliberately stores no titles,
 * dates, summaries or categories of its own.
 */
import { getAllArticles, type ArticleWorkstream } from "@/lib/articles";

export type WritingCategory = string;

export interface WritingItem {
  title: string;
  slug: string;
  excerpt: string;
  summary: string;
  category: WritingCategory;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  external: boolean;
  workstream: ArticleWorkstream;
  tags: string[];
  /** Derived articles are always insights; the wider union preserves the
   * existing archive card's support for other historical item types. */
  type: "insight" | "case-study" | "publication";
}

export const WRITING: WritingItem[] = getAllArticles().map((article) => ({
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt,
  summary: article.summary,
  category: article.category,
  publishedAt: article.date,
  source: article.author,
  sourceUrl: `/insights/${article.slug}`,
  external: false,
  workstream: article.workstream,
  tags: article.tags,
  type: "insight",
}));
