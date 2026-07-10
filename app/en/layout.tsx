import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Modern Architecture & Industrial Metalworking",
  description:
    "Statoplast — your partner for modern architecture and the metal industry. Explore premium aluminium joinery and pivot doors, or industrial CNC machining and powder coating services.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "/en/",
    languages: alternateLanguages("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hr_HR", "de_DE"],
    siteName: "Statoplast",
    title: "Statoplast | Modern Architecture & Industrial Metalworking",
    description:
      "Your partner for modern architecture and the metal industry — premium aluminium joinery, pivot doors, CNC machining and powder coating.",
    url: "/en/",
  },
};

export default function EnRootLayout({
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
