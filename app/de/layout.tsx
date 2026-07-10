import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Moderne Architektur & Industrielle Metallverarbeitung",
  description:
    "Statoplast — Ihr Partner für moderne Architektur und die Metallindustrie. Entdecken Sie hochwertige Alu-Schreinerei und Pivottüren oder industrielle CNC-Bearbeitung und Pulverbeschichtung.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "/de/",
    languages: alternateLanguages("/"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["hr_HR", "en_US"],
    siteName: "Statoplast",
    title: "Statoplast | Moderne Architektur & Industrielle Metallverarbeitung",
    description:
      "Ihr Partner für moderne Architektur und die Metallindustrie — hochwertige Alu-Schreinerei, Pivottüren, CNC-Bearbeitung und Pulverbeschichtung.",
    url: "/de/",
  },
};

export default function DeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
