import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BagelTech | Ethical AI Governance",
  description:
    "BagelTech builds execution-time governance systems for AI, data, and human accountability.",
  openGraph: {
    title: "BagelTech | Ethical AI Governance",
    description:
      "Execution-time governance for AI systems: context interpretation, uncertainty routing, and authority enforcement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
