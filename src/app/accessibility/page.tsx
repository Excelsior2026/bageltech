import type { Metadata } from "next";
import LegalPlaceholder from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Structural placeholder for an accessibility statement; substantive language pending human review.",
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return (
    <LegalPlaceholder
      title="Accessibility"
      summary="A future accessibility statement will document the standard the site targets, known limitations, and how to request an accessible alternative. No conformance claim is made here."
      sections={[
        { title: "Target standard", note: "Draft — target and scope pending human review." },
        { title: "Known limitations", note: "Draft — verified limitations pending test evidence." },
        { title: "Feedback and alternatives", note: "Draft — feedback route pending human approval." },
      ]}
    />
  );
}
