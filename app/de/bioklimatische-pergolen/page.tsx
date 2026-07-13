import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bioklimatische Pergolen mit Schiebedach | Statoplast",
  description:
    "Innovative Aluminium-Pergolen mit einem selbst entwickelten Schiebedach. Integrierte Wasserableitung, LED-Beleuchtung und smarte Terrassensteuerung.",
  alternates: {
    canonical: "/de/bioklimatische-pergolen/",
    languages: alternateLanguages("/bioklimatske-pergole"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Bioklimatische Pergolen mit Schiebedach | Statoplast",
    description: "Innovative Aluminium-Pergolen mit einem selbst entwickelten Schiebedach. Integrierte Wasserableitung, LED-Beleuchtung und smarte Terrassensteuerung.",
    url: "/de/bioklimatische-pergolen/",
    images: [{ url: "/slike/bioklimatska_pergola.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bioklimatische Pergolen mit Schiebedach | Statoplast",
    description: "Innovative Aluminium-Pergolen mit einem selbst entwickelten Schiebedach. Integrierte Wasserableitung, LED-Beleuchtung und smarte Terrassensteuerung.",
    images: ["/slike/bioklimatska_pergola.jpeg"],
  },
};

export default function BioklimatischePergolenPage() {
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
                Angenehmer Aufenthalt im Freien
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Bioklimatische
                <br />
                <span className="font-bold">Pergolen.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Unsere bioklimatischen Pergolen ermöglichen die optimale Nutzung Ihrer Terrasse
                oder Ihres Gartens. Unser einzigartiges, selbst entwickeltes System bietet
                erstklassige statische Stabilität und Langlebigkeit, mit einem ästhetischen Design,
                das sich nahtlos in jeden Architekturstil einfügt. Das System ermöglicht eine
                leichte Umwandlung des Daches, wodurch optimaler Schutz vor Witterungseinflüssen
                erreicht wird und gleichzeitig eine perfekte Regulierung von Licht, Sonne und
                Belüftung im Raum ermöglicht wird.
              </p>

              <ul className="space-y-3 text-sm text-zinc-700 font-medium mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Innovatives Schiebeblech-System
                  für vollständige Kontrolle über die Öffnung
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> In die Konstruktion
                  integriertes Wasserableitungssystem
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Möglichkeit zum Einbau
                  ästhetischer LED-Beleuchtung für Abendstimmung
                </li>
              </ul>

              <Link
                href="/de/bioklimatische-pergolen/konfigurator"
                className="group inline-flex items-center gap-3 self-start bg-zinc-900 hover:bg-black text-white px-6 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
              >
                 3D-Konfigurator testen
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/bioklimatska_pergola.jpeg"
                alt="Bioklimatische Pergola - Blick auf das geöffnete Schiebedach"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-[450px] bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/bioklimatska_pergola2.jpeg"
                  alt="Pergola in geschlossener Position, Ambientenansicht"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-[450px] bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/bioklimatska_pergola3.jpeg"
                  alt="Bioklimatische Pergola - Detail des Schiebemechanismus"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Funktionalität und erstklassige Ausführung
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Die gesamte Konstruktion besteht aus hochwertigen, pulverbeschichteten
                Aluminiumprofilen. Die Bleche klappen sich sanft zusammen und gleiten mittels
                bewährter Mechanismen und motorisierter Antriebe zurück, was eine schnelle
                Anpassung an die aktuellen Wetterbedingungen ermöglicht.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Flexible Steuerung
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Passen Sie die Pergola an Ihren Lebensstil an. Optional bieten wir die
                      Steuerung über eine klassische Fernbedienung oder vollständig smarte
                      Steuerung per Mobil-App.
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Individuelle Abmessungen
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Jede Pergola wird detailliert dimensioniert und entsprechend den spezifischen
                      Gegebenheiten und Anforderungen Ihres Standorts und Objekts geplant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
