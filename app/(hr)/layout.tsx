import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Moderna Arhitektura i Industrijska obrada metala",
  description:
    "Statoplast — Vaš partner za modernu arhitekturu i metalnu industriju. Istražite premium ALU stolariju i pivot vrata ili industrijske usluge CNC obrade i plastifikacije.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "/",
    languages: alternateLanguages("/"),
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    alternateLocale: ["en_US", "de_DE"],
    siteName: "Statoplast",
    title: "Statoplast | Moderna Arhitektura i Industrijska obrada metala",
    description:
      "Vaš partner za modernu arhitekturu i metalnu industriju — premium ALU stolarija, pivot vrata, CNC obrada i plastifikacija.",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
