import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import CustomSiteWizard from "@/components/onboarding/CustomSiteWizard";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import styles from "@/components/onboarding/Onboarding.module.css";

export const metadata: Metadata = {
  title: "Contractor Website and Setup Studio | BagelTech",
  description:
    "Choose a proven template or create a structured custom-site blueprint for a managed BagelTech electrical-contractor platform.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{
    path?: string | string[];
    template?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const path = Array.isArray(query.path) ? query.path[0] : query.path;
  const template = Array.isArray(query.template) ? query.template[0] : query.template;
  const customPath = path === "custom";

  return (
    <MarketingLayout>
      <main className={customPath ? undefined : styles.wizardPage}>
        {customPath ? (
          <CustomSiteWizard />
        ) : (
          <OnboardingWizard initialTemplate={template ?? "heritage-craft"} />
        )}
      </main>
    </MarketingLayout>
  );
}
