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
  title: {
    default: "BagelTech | Governance for Consequential Systems",
    template: "%s | BagelTech",
  },
  description:
    "BagelTech is an independent research, systems, and advisory practice for consequential systems. Founded and led by Bill Parris.",
  authors: [{ name: "William Parris" }],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "BagelTech",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
