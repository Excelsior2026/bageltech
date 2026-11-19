import type { Metadata } from "next";
import LegalPlaceholder from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Security",
  description: "Structural placeholder for a site security disclosure; substantive language pending human review.",
  alternates: { canonical: "/security" },
  robots: { index: false, follow: true },
};

export default function SecurityPage() {
  return (
    <LegalPlaceholder
      title="Security"
      summary="A future security disclosure will describe how to report a concern. This placeholder makes no claim about controls, certifications, compliance posture or response times."
      sections={[
        { title: "Reporting a concern", note: "Draft — reporting route pending human approval." },
        { title: "Scope of disclosure", note: "Draft — systems in scope pending human approval." },
        { title: "Handling of reports", note: "Draft — handling process pending human approval." },
      ]}
    />
  );
}
