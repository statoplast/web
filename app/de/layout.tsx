import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Moderne Architektur & Industrielle Metallverarbeitung",
  description:
    "Statoplast — Ihr Partner für moderne Architektur und die Metallindustrie. Entdecken Sie hochwertige Alu-Schreinerei und Pivottüren oder industrielle CNC-Bearbeitung und Pulverbeschichtung.",
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Moderne Architektur & Industrielle Metallverarbeitung",
    description:
      "Ihr Partner für moderne Architektur und die Metallindustrie — hochwertige Alu-Schreinerei, Pivottüren, CNC-Bearbeitung und Pulverbeschichtung.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function DeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd("de")) }}
        />
        {children}
      </body>
    </html>
  );
}
