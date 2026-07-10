import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Hochwertige Alu-Schreinerei & Fenster | Statoplast",
  description:
    "Erstklassige Aluminiumfenster, -türen und Schiebewände mit thermischer Trennung. Maximale Isolierung, Stabilität und Langlebigkeit für alle Gebäudetypen.",
  alternates: {
    canonical: "/de/alu-stolarija/",
    languages: alternateLanguages("/alu-stolarija"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Hochwertige Alu-Schreinerei & Fenster | Statoplast",
    description: "Erstklassige Aluminiumfenster, -türen und Schiebewände mit thermischer Trennung. Maximale Isolierung, Stabilität und Langlebigkeit für alle Gebäudetypen.",
    url: "/de/alu-stolarija/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hochwertige Alu-Schreinerei & Fenster | Statoplast",
    description: "Erstklassige Aluminiumfenster, -türen und Schiebewände mit thermischer Trennung. Maximale Isolierung, Stabilität und Langlebigkeit für alle Gebäudetypen.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function AluSchreinereiPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />

        <SecondaryNav variant="light" locale="de" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                Bewährte Systeme mit hoher Stabilität
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Hochwertige Alu-
                <br />
                <span className="font-bold">Schreinerei.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Wir bieten erstklassige Lösungen bei der Herstellung von standardisierten,
                klassischen Aluminiumfenstern, -türen und Schiebewänden der höchsten Klasse. Unsere
                Systeme bieten makellose mechanische Festigkeit, außergewöhnliche Langlebigkeit und
                erstklassigen Isolierschutz für jedes Gebäude.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Langlebigkeit</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Aluminium verliert seine Eigenschaften nicht und benötigt über die Jahre nur
                    minimale Wartung.
                  </p>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Stabilität</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Robuste Profile, ideal für größere Glaswände und Standardpositionen.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderna_arhitektura_kuca.jpeg"
                alt="Alu-Schreinerei - Ansicht eines fertigen Objekts"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/alu_stolarija2.jpg"
                  alt="Alu-Profile und Fenstersysteme"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/alu_stolarija3.jpeg"
                  alt="Detail einer Aluminium-Schiebewand"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Zuverlässige Profile für jeden Gebäudetyp
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Durch die Konzentration auf bewährte, technisch überlegene Standardprofile
                gewährleisten wir maximale Stabilität und perfekte Abdichtung. Die Systeme sind mit
                hochwertigen Beschlägen und mehrschichtigen Glaspaketen ausgestattet, die
                Außenlärm und Wärmeverluste erfolgreich reduzieren.
              </p>
              <div className="space-y-2 text-sm text-zinc-600">
                <p>• Hochwertige Aluminiumprofile mit thermischer Trennung</p>
                <p>• Große Auswahl an RAL-Farben in matten und strukturierten Ausführungen</p>
                <p>• Zuverlässige Beschläge für ein reibungsloses, sicheres tägliches Öffnen</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
