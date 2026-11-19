import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bageltech.net";

/**
 * Only public, approved destinations are crawlable. Draft/onboarding surfaces,
 * site-wide policy placeholders and application internals are excluded here
 * and via per-route `robots` metadata.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/get-started",
        "/contractors/privacy",
        "/contractors/terms",
        "/privacy",
        "/terms",
        "/security",
        "/accessibility",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
