import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TruePresence Admin",
  description: "TruePresence administration dashboard",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
