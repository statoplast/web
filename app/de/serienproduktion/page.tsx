import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Serienproduktion von Metallkomponenten | Statoplast",
  description:
    "Zuverlässige Serienproduktion von Metallkomponenten — Ihr strategischer B2B-Outsourcing-Partner für komplette Fertigung und Montage.",
  alternates: {
    canonical: "/de/serienproduktion/",
    languages: alternateLanguages("/serijska-proizvodnja"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Serienproduktion von Metallkomponenten | Statoplast",
    description: "Zuverlässige Serienproduktion von Metallkomponenten — Ihr strategischer B2B-Outsourcing-Partner für komplette Fertigung und Montage.",
    url: "/de/serienproduktion/",
    images: [{ url: "/slike/serijska-proizvodnja.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serienproduktion von Metallkomponenten | Statoplast",
    description: "Zuverlässige Serienproduktion von Metallkomponenten — Ihr strategischer B2B-Outsourcing-Partner für komplette Fertigung und Montage.",
    images: ["/slike/serijska-proizvodnja.jpeg"],
  },
};

export default function SerienproduktionPage() {
  return (
    <div className="bg-[#1a2a40] text-slate-300 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="industrial" locale="de" />

        <SecondaryNav variant="industrial" locale="de" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-slide-in">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-800 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/serijska-proizvodnja.jpeg"
                alt="Industrielle Serienproduktion"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Ihr Outsourcing-Partner
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                Serien-
                <br />
                produktion.
              </h1>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Statoplast ist ein strategischer Fertigungspartner für zahlreiche Unternehmen. Wir
                übernehmen den gesamten Produktionsprozess für Metallkomponenten, damit Sie sich
                auf die Entwicklung, das Marketing und den Verkauf Ihres Endprodukts konzentrieren
                können.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Durch die Vereinigung all unserer Technologien (Schneiden, Biegen, Schweißen,
                Pulverbeschichtung und Montage) unter einem Dach garantieren wir strenge
                Qualitätskontrolle, niedrigere Logistikkosten und zuverlässige Liefertermine.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <ul className="space-y-2 font-medium text-slate-200 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Optimierung der Produktionsprozesse
                    für große Serien
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Komplette Montage von Halbfabrikaten
                    und Verpackung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Abgestimmte, zuverlässige
                    Logistikabläufe
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/serijska-kontrola.jpg"
              alt="Qualitätskontrolle und Verpackung"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-800 flex flex-col justify-center">
              <h4 className="text-white font-bold text-xl mb-3">
                Gemeinsam zum Endprodukt
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ob Sie Teile für die Automobilindustrie, Möbelkomponenten oder
                Maschinengehäuse benötigen — unser Team ist bereit, die Produktion an Ihre
                Vorgaben anzupassen.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 p-10 lg:p-16 bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-slate-700 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Benötigen Sie einen zuverlässigen Fertigungspartner?
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Senden Sie uns Ihre technischen Zeichnungen, 3D-Modelle oder Spezifikationen, und
            unser Engineering-Team meldet sich mit einem Optimierungsvorschlag und einem
            konkreten Angebot bei Ihnen.
          </p>
          <Link
            href="/de/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-10 py-4 rounded-sm text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap transition-colors relative z-10 shadow-lg shadow-blue-900/50"
          >
            ANGEBOT ANFORDERN
          </Link>
        </div>
      </main>
    </div>
  );
}
