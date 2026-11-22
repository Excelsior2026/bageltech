import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/articles";
import { getAllBagelNotes } from "@/lib/bagelNotes";

const SITE_URL = "https://www.bageltech.net";

type StaticPage = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/** Indexable public routes only. Legal placeholders, onboarding and dashboard
 * surfaces are deliberately absent; their metadata is `noindex`. */
const STATIC_PAGES: StaticPage[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bdb-labs/research", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bdb-labs/publications", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bpv/advisory", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contractors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bagels-corner", changeFrequency: "monthly", priority: 0.3 },
  { path: "/bmo", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...getAllArticles().map((article) => ({
      url: `${SITE_URL}/insights/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllBagelNotes().map((note) => ({
      url: `${SITE_URL}/bagels-corner/notes/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
