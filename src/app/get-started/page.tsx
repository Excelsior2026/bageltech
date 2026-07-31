import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import styles from "@/components/onboarding/Onboarding.module.css";

export const metadata: Metadata = {
  title: "Contractor Setup Request | BagelTech",
  description:
    "Create a reviewable setup brief for a managed BagelTech electrical-contractor platform.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const query = await searchParams;
  const template = Array.isArray(query.template) ? query.template[0] : query.template;

  return (
    <MarketingLayout>
      <main className={styles.wizardPage}>
        <OnboardingWizard initialTemplate={template ?? "heritage-craft"} />
      </main>
    </MarketingLayout>
  );
}
