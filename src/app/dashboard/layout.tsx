import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TruePresence Admin",
  description: "TruePresence administration dashboard",
  robots: { index: false, follow: false, noarchive: true },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
