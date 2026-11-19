import type { Metadata } from "next";
import LegalPlaceholder from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Structural placeholder for site-wide terms of use; substantive language pending human legal review.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms of Use"
      summary="The site-wide terms will govern use of this public website. They are distinct from the contractor setup request terms, which apply only to that workflow."
      sections={[
        { title: "Scope", note: "Draft — scope of site terms pending human review." },
        { title: "Use of content", note: "Draft — content rights and limits pending human review." },
        { title: "Third-party links", note: "Draft — treatment of external links pending human review." },
        { title: "Changes and contact", note: "Draft — change process and contact route pending human review." },
      ]}
    />
  );
}
