import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bageltech.net";

/**
 * Application internals and unlinked draft/onboarding surfaces are disallowed.
 * Footer-linked legal placeholders stay crawlable so crawlers can read their
 * per-route `noindex` metadata; they are deliberately absent from the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/get-started",
        "/contractors/privacy",
        "/contractors/terms",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
