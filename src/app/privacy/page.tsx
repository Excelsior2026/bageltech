import type { Metadata } from "next";
import LegalPlaceholder from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Structural placeholder for a site-wide privacy policy; substantive language pending human legal review.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      summary="The site-wide privacy notice will describe how information submitted through this website is handled. Its substantive language has not yet been approved."
      sections={[
        { title: "Information collected", note: "Draft — scope and categories pending human review." },
        { title: "Purpose and use", note: "Draft — permitted purposes pending human review." },
        { title: "Retention and access", note: "Draft — retention and access rules pending human review." },
        { title: "Choices and contact", note: "Draft — visitor choices and contact route pending human review." },
      ]}
    />
  );
}
