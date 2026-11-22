import fs from "node:fs";
import path from "node:path";

export type ArticleWorkstream = "BDB Labs" | "BagelTech" | "Bagelle Parris Vargas";

export type ArticleMeta = {
  /** Canonical public slug, declared in frontmatter. */
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
  category: string;
  workstream: ArticleWorkstream;
  /** Short index copy. Falls back to `summary` when not declared. */
  excerpt: string;
  tags: string[];
  status: "published" | "draft";
};

export type Article = ArticleMeta & {
  content: string;
};

/** Frontmatter fields, plus the optional `slug` that overrides the filename. */
type Frontmatter = Omit<ArticleMeta, "slug" | "status"> & {
  slug?: string;
  status?: ArticleMeta["status"];
};

const articlesDir = path.join(process.cwd(), "content", "articles");

const WORKSTREAMS: ArticleWorkstream[] = ["BDB Labs", "BagelTech", "Bagelle Parris Vargas"];

function parseFrontmatter(raw: string): { meta: Frontmatter; content: string } {
  const fallback: Frontmatter = {
    title: "Untitled",
    date: "1970-01-01",
    summary: "",
    author: "BagelTech",
    category: "Essay",
    workstream: "BagelTech",
    excerpt: "",
    tags: [],
  };

  if (!raw.startsWith("---")) {
    return { meta: fallback, content: raw.trim() };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: fallback, content: raw.trim() };
  }

  const block = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const values: Frontmatter = { ...fallback };

  block.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const parsed = rest.join(":").trim().replace(/^"|"$/g, "");
    switch (key.trim()) {
      case "title":
        values.title = parsed;
        break;
      case "date":
        values.date = parsed;
        break;
      case "summary":
        values.summary = parsed;
        break;
      case "author":
        values.author = parsed;
        break;
      case "slug":
        if (parsed) values.slug = parsed;
        break;
      case "category":
        if (parsed) values.category = parsed;
        break;
      case "workstream":
        if (WORKSTREAMS.includes(parsed as ArticleWorkstream)) {
          values.workstream = parsed as ArticleWorkstream;
        }
        break;
      case "excerpt":
        if (parsed) values.excerpt = parsed;
        break;
      case "tags":
        values.tags = parsed.split(",").map((tag) => tag.trim()).filter(Boolean);
        break;
      case "status":
        if (parsed === "draft") values.status = "draft";
        break;
    }
  });

  if (!values.excerpt) values.excerpt = values.summary;

  return { meta: values, content };
}

/**
 * An article's canonical slug is declared in its own frontmatter, so the
 * published URL is owned by the article rather than by its filename. Derived
 * and legacy filename slugs stay resolvable as aliases and redirect to the
 * canonical URL in the article route.
 */
export function canonicalSlug(file: string, meta: Frontmatter): string {
  return meta.slug ?? derivedSlug(file);
}

/** Slug derived from the filename: strips the numeric prefix, snake -> kebab. */
export function derivedSlug(file: string): string {
  return file
    .replace(/\.md$/, "")
    .replace(/^\d+[_-]/, "")
    .replace(/_/g, "-")
    .toLowerCase();
}

/** The pre-revamp slug, which was just the filename with the extension removed. */
export function legacySlug(file: string): string {
  return file.replace(/\.md$/, "");
}

type ArticleSource = {
  file: string;
  meta: Frontmatter;
};

function readArticles(): ArticleSource[] {
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      meta: parseFrontmatter(fs.readFileSync(path.join(articlesDir, file), "utf8")).meta,
    }))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

function resolveSource(sources: ArticleSource[], slug: string): ArticleSource | undefined {
  return (
    sources.find((source) => canonicalSlug(source.file, source.meta) === slug) ??
    sources.find((source) => derivedSlug(source.file) === slug) ??
    sources.find((source) => legacySlug(source.file) === slug)
  );
}

function toArticleMeta(file: string, meta: Frontmatter): ArticleMeta {
  return {
    slug: canonicalSlug(file, meta),
    title: meta.title,
    date: meta.date,
    summary: meta.summary,
    author: meta.author,
    category: meta.category,
    workstream: meta.workstream,
    excerpt: meta.excerpt,
    tags: meta.tags,
    status: meta.status ?? "published",
  };
}

/** Published article metadata, newest first. Drafts are never public. */
export function getAllArticles(): ArticleMeta[] {
  return readArticles()
    .map(({ file, meta }) => toArticleMeta(file, meta))
    .filter((article) => article.status === "published");
}

/**
 * Resolve a requested slug (including aliases) to its canonical slug.
 * Returns `null` when no article matches.
 */
export function getCanonicalSlug(slug: string): string | null {
  const source = resolveSource(readArticles(), slug);
  if (!source) return null;
  const canonical = canonicalSlug(source.file, source.meta);
  return (source.meta.status ?? "published") === "published" ? canonical : null;
}

export function getArticleBySlug(slug: string): Article | null {
  const sources = readArticles();
  const source = resolveSource(sources, slug);
  if (!source || (source.meta.status ?? "published") !== "published") return null;

  const parsed = parseFrontmatter(fs.readFileSync(path.join(articlesDir, source.file), "utf8"));

  return {
    ...toArticleMeta(source.file, parsed.meta),
    content: parsed.content,
  };
}
