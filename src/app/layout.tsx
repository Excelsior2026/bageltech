import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-ui-sans",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-code-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BagelTech | Governance, AI, and Decision Systems",
  description:
    "BagelTech builds governance systems, ensemble AI frameworks, and decision infrastructure for high-stakes environments.",
  openGraph: {
    title: "BagelTech | Governance, AI, and Decision Systems",
    description:
      "Execution-time governance, digital transformation, and product systems designed for traceability, authority, and human accountability.",
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
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
