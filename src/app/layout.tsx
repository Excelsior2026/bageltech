import type { Metadata } from "next";
import { IBM_Plex_Mono, Public_Sans, Spectral } from "next/font/google";
import "./globals.css";

const sans = Public_Sans({
  variable: "--font-ui-sans",
  subsets: ["latin"],
});

const serif = Spectral({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-code-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BagelTech",
  description: "Governance systems, ensemble decision frameworks, and domain-specific AI products.",
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
