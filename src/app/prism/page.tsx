import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import PrismClient from "./PrismClient";

export const metadata: Metadata = {
  title: { absolute: "PRISM-12 | Social Meaning and Intent | BagelTech" },
  description: "An experimental twelve-scenario pilot exploring sarcasm, indirect meaning, sincerity, and contextual interpretation. Not a clinical or deception test.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "PRISM-12 | Social Meaning and Intent | BagelTech",
  },
};

export default function PrismPage() {
  return (
    <MarketingLayout>
      <PrismClient />
    </MarketingLayout>
  );
}
