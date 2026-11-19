/**
 * @deprecated There is one published-insight registry: `content/articles/*.md`,
 * exposed through `getAllArticles()` in `src/lib/articles.ts` and adapted by
 * `src/content/writing.ts`. This alias exists only so older imports keep
 * resolving; it intentionally carries no independent titles, dates, sources
 * or URLs. Do not add content here.
 */
export { WRITING as INSIGHTS } from "./writing";
export type { WritingItem as InsightItem } from "./writing";
