import fs from "node:fs";
import path from "node:path";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
};

export type Article = ArticleMeta & {
  content: string;
};

/** Frontmatter fields, plus the optional `slug` that overrides the filename. */
type Frontmatter = Omit<ArticleMeta, "slug"> & { slug?: string };

const articlesDir = path.join(process.cwd(), "content", "articles");

function parseFrontmatter(raw: string): { meta: Frontmatter; content: string } {
  const fallback: Frontmatter = {
    title: "Untitled",
    date: "1970-01-01",
    summary: "",
    author: "BagelTech",
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
    if (key.trim() === "title") values.title = parsed;
    if (key.trim() === "date") values.date = parsed;
    if (key.trim() === "summary") values.summary = parsed;
    if (key.trim() === "author") values.author = parsed;
    if (key.trim() === "slug" && parsed) values.slug = parsed;
  });

  return { meta: values, content };
}

/**
 * Public slugs.
 *
 * An article's canonical slug is declared in its own frontmatter
 * (`slug: "confidence-is-not-governance"`) so the published URL is owned by
 * the article rather than by its filename. Two derived slugs stay resolvable
 * as aliases for older links:
 *
 *   filename slug      01_confidence_is_not_governance
 *   derived slug       confidence-is-not-governance
 *   declared slug      (from frontmatter, authoritative)
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

/** Frontmatter without the optional `slug`, which the resolver owns. */
function withoutDeclaredSlug(meta: Frontmatter): Omit<ArticleMeta, "slug"> {
  return {
    title: meta.title,
    date: meta.date,
    summary: meta.summary,
    author: meta.author,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return readArticles().map(({ file, meta }) => ({
    slug: canonicalSlug(file, meta),
    ...withoutDeclaredSlug(meta),
  }));
}

export function getArticleBySlug(slug: string): Article | null {
  const source = resolveSource(readArticles(), slug);
  if (!source) return null;

  const parsed = parseFrontmatter(fs.readFileSync(path.join(articlesDir, source.file), "utf8"));

  return {
    slug,
    ...withoutDeclaredSlug(parsed.meta),
    content: parsed.content,
  };
}

/** Every slug that should resolve for an article, canonical first. */
export function getArticleAliases(slug: string): string[] {
  const source = resolveSource(readArticles(), slug);
  if (!source) return [];

  return [
    ...new Set([
      canonicalSlug(source.file, source.meta),
      derivedSlug(source.file),
      legacySlug(source.file),
    ]),
  ];
}
