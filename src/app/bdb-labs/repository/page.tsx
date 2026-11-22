import { permanentRedirect } from "next/navigation";

/**
 * Legacy bookmarks land here. There is no public document repository surface
 * yet, so send them to the writing index directly rather than through the
 * retired `/writing` proxy path.
 */
export default function RepositoryPage() {
  permanentRedirect("/insights");
}
