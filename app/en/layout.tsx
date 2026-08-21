import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL, alternateLanguages } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Statoplast | Modern Architecture & Industrial Metalworking",
  description:
    "Statoplast — your partner for modern architecture and the metal industry. Explore premium aluminium joinery and pivot doors, or industrial CNC machining and powder coating services.",
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Modern Architecture & Industrial Metalworking",
    description:
      "Your partner for modern architecture and the metal industry — premium aluminium joinery, pivot doors, CNC machining and powder coating.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd("en")) }}
        />
        {children}
      </body>
    </html>
  );
}
