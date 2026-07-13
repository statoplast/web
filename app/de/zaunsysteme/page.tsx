import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Moderne Zäune | Aluminium- und Glassysteme | Statoplast",
  description:
    "Elegante Aluminium- und Glaszäune nach Maß. Minimalistisches Design mit klaren Linien für Balkone, Terrassen und Gärten, wartungsfrei.",
  alternates: {
    canonical: "/de/zaunsysteme/",
    languages: alternateLanguages("/moderne-ograde"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Moderne Zäune | Aluminium- und Glassysteme | Statoplast",
    description: "Elegante Aluminium- und Glaszäune nach Maß. Minimalistisches Design mit klaren Linien für Balkone, Terrassen und Gärten, wartungsfrei.",
    url: "/de/zaunsysteme/",
    images: [{ url: "/slike/moderne_ograde.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderne Zäune | Aluminium- und Glassysteme | Statoplast",
    description: "Elegante Aluminium- und Glaszäune nach Maß. Minimalistisches Design mit klaren Linien für Balkone, Terrassen und Gärten, wartungsfrei.",
    images: ["/slike/moderne_ograde.jpeg"],
  },
};

export default function ModerneZaeunePage() {
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
                Sicherheit und klare Linien
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Moderne
                <br />
                <span className="font-bold">Zäune.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Die Aluminium- und Glaszäune aus unserem Angebot sind mit Schwerpunkt auf
                Langlebigkeit und einfache Linien konzipiert, die dem zeitgenössischen Baustil
                folgen. Ob für Gärten, Balkone oder Terrassen — sie bieten stabilen Schutz, ohne
                das Erscheinungsbild des Gebäudes zu beeinträchtigen.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde.jpeg"
                alt="Moderne Zäune - Aluminiumsystem"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden h-[450px] bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde2.jpg"
                alt="Moderne Zäune - Ausführungsdetail am Balkon"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Erstklassiges Design und makellose Ästhetik
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Der Hauptvorteil unserer Zaunsysteme ist das attraktive, moderne Erscheinungsbild,
                das die gesamte Optik Ihres Gebäudes dramatisch aufwertet. Minimalistisches
                Design, klare Linien und sorgfältig ausgeführte Details machen sie zum perfekten
                architektonischen Akzent. Neben der erstklassigen Ästhetik garantiert die
                Aluminiumkonstruktion natürlich außergewöhnliche Festigkeit und vollständige
                Witterungsbeständigkeit, ohne zusätzliche Wartung oder Lackierung.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Sicherheitsglas</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Erstklassiges Einscheiben-Sicherheitsglas und mehrschichtig laminiertes Glas
                    für maximale Festigkeit und Sicherheit, mit optionaler mattierter
                    Oberflächenveredelung für vollständige visuelle Privatsphäre.
                  </p>
                </div>
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Aluminiumlamellen</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Anpassbarer Lamellenabstand für das gewünschte Maß an Privatsphäre in Ihrem
                    Garten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
