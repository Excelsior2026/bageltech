import fs from "node:fs";
import path from "node:path";

export type BagelNoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type BagelNote = BagelNoteMeta & {
  content: string;
};

const notesDir = path.join(process.cwd(), "content", "bagel-notes");

function parseFrontmatter(raw: string): { meta: Omit<BagelNoteMeta, "slug">; content: string } {
  const fallback = { title: "Untitled", date: "1970-01-01", summary: "" };

  if (!raw.startsWith("---")) return { meta: fallback, content: raw.trim() };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: fallback, content: raw.trim() };

  const block = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const values = { ...fallback };

  block.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const parsed = rest.join(":").trim().replace(/^"|"$/g, "");
    if (key.trim() === "title") values.title = parsed;
    if (key.trim() === "date") values.date = parsed;
    if (key.trim() === "summary") values.summary = parsed;
  });

  return { meta: values, content };
}

export function getAllBagelNotes(): BagelNoteMeta[] {
  if (!fs.existsSync(notesDir)) return [];

  return fs
    .readdirSync(notesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(notesDir, file), "utf8");
      const parsed = parseFrontmatter(raw);
      return { slug, ...parsed.meta };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBagelNoteBySlug(slug: string): BagelNote | null {
  const filePath = path.join(notesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(raw);
  return { slug, ...parsed.meta, content: parsed.content };
}
