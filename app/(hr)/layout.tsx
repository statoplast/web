import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Moderna Arhitektura i Industrijska obrada metala",
  description:
    "Statoplast — Vaš partner za modernu arhitekturu i metalnu industriju. Istražite premium ALU stolariju i pivot vrata ili industrijske usluge CNC obrade i plastifikacije.",
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Moderna Arhitektura i Industrijska obrada metala",
    description:
      "Vaš partner za modernu arhitekturu i metalnu industriju — premium ALU stolarija, pivot vrata, CNC obrada i plastifikacija.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd("hr")) }}
        />
        {children}
      </body>
    </html>
  );
}
