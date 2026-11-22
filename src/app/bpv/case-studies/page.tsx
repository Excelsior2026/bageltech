import { permanentRedirect } from "next/navigation";

/**
 * Legacy bookmarks for the retired case-studies path. Until evidence-backed
 * case studies are published, the advisory page is the closest truthful
 * destination; this does not claim that case studies exist there.
 */
export default function CaseStudiesPage() {
  permanentRedirect("/bpv/advisory");
}
