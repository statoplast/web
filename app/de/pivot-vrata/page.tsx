import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aluminium-Pivottüren | Statoplast Moderne Architektur",
  description:
    "Statoplast Aluminium-Pivottüren stehen für den Höhepunkt moderner Ästhetik und Ingenieurskunst. Maßanfertigung, hohe Tragfähigkeit und erstklassige Wärmedämmung.",
  alternates: {
    canonical: "/de/pivot-vrata/",
    languages: alternateLanguages("/pivot-vrata"),
  },
};

export default function PivottuerenPage() {
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
                Erstklassige Ästhetik und Stabilität
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Aluminium-
                <br />
                <span className="font-bold">Pivottüren.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Statoplast Pivottüren stehen für den absoluten Höhepunkt moderner Ästhetik und
                Eingangssystem-Ingenieurskunst. Sie rotieren um eine vertikale Achse mittels
                robuster Boden- und Deckenmechanismen, die eine leichte und reibungslose Bedienung
                massiver Türflügel ermöglichen.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Konstruktion mit hoher Tragfähigkeit
                    </h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      Ein innovatives Auflagersystem trägt massive, schwere Flügel, ohne den
                      Seitenrahmen zu überlasten, und sorgt so für ein außergewöhnlich leichtes
                      Öffnen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">Moderne Zutrittskontrolle</h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      Möglichkeit zur Integration von Elektroschlössern mit Fingerabdruckleser oder
                      smarten Zutrittssystemen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-[80%] mx-auto h-auto rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/pivot_vrata.jpg"
                alt="Pivottüren - Hauptmotiv"
                className="w-full h-auto transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 order-2 lg:order-1">
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata2.jpg"
                  alt="Pivottüren - Individuelles Modell 1"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata3.jpeg"
                  alt="Pivottüren - Individuelles Modell 2"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata4.jpeg"
                  alt="Pivottüren - Individuelles Modell 3"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900">
                Individueller Ansatz und Materialien
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Jede Position wird vollständig an das Design und die Architektur Ihres Objekts
                angepasst. Für Außen- und Innenverkleidungen verwenden wir hochwertige Materialien
                und hochfeste Aluminiumprofile, die eine makellose Flügelgeometrie und
                Langlebigkeit über Jahre der Nutzung gewährleisten.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  Die Drehachse erzeugt bei jedem Öffnen einen monumentalen Eindruck und macht den
                  Eingang zum zentralen ästhetischen Element der Fassade.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-3xl p-8 md:p-12">
            <h4 className="text-2xl font-bold mb-6">Technische Spezifikationen des Pivotsystems</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <th className="pb-4 pr-6">Merkmal</th>
                    <th className="pb-4">Beschreibung und Vorteile</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Abdichtung</td>
                    <td className="py-4 align-top">
                      3-stufige Abdichtung mit speziell entwickelten EPDM-Dichtungen und einer
                      durchgehenden Mitteldichtung sorgt für ein hohes Maß an Luft- und
                      Wasserdichtigkeit sowie Isolierung.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Wärmedämmung</td>
                    <td className="py-4 align-top">
                      Spezielle verzugshemmende Polyamide in Kombination mit einem
                      Polyurethankern erzielen eine optimale Dämmung und minimieren
                      Flügelverformungen durch Temperaturunterschiede.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Sicherheit & Steuerung</td>
                    <td className="py-4 align-top">
                      Standardmäßige automatische 5-Punkt-Verriegelung mit optionalem
                      Elektromagnetschloss. Bedienung nach Wunsch per Fingerabdruckscanner oder
                      digitalem Tastenfeld.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Zugang</td>
                    <td className="py-4 align-top">
                      Eine niedrige Schwelle ermöglicht einen einfachen, ungehinderten Zugang von
                      innen, besonders geeignet für Menschen mit Behinderung.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Scharniermechanismus</td>
                    <td className="py-4 align-top">Erstklassige, robuste Pivotsysteme mit stabiler Achse.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
