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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7BQH6P');`,
          }}
        />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7BQH6P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd("de")) }}
        />
        {children}
      </body>
    </html>
  );
}
