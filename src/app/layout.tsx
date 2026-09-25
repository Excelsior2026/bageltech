import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Spectral } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-ui-sans",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-code-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Kept for the contractor platform and BMO surfaces, which set type in Spectral.
const serif = Spectral({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "BagelTech | Bagelle Parris Vargas & BDB Labs",
    template: "%s | BagelTech",
  },
  description:
    "BagelTech is the home of Bagelle Parris Vargas, an executive advisory firm for modernization and delivery risk, and BDB Labs, a research lab for governable AI and decision systems.",
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
      <body className={`${sans.variable} ${display.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
