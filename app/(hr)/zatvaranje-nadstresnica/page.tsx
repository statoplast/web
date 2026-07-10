import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Zatvaranje Nadstrešnica i Terasa | Statoplast",
  description:
    "Pretvorite otvorenu nadstrešnicu ili terasu u koristan prostor tijekom cijele godine. Kvalitetne klizne staklene stijene i stabilna aluminijska konstrukcija.",
  alternates: {
    canonical: "/zatvaranje-nadstresnica/",
    languages: alternateLanguages("/zatvaranje-nadstresnica"),
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Statoplast",
    title: "Zatvaranje Nadstrešnica i Terasa | Statoplast",
    description: "Pretvorite otvorenu nadstrešnicu ili terasu u koristan prostor tijekom cijele godine. Kvalitetne klizne staklene stijene i stabilna aluminijska konstrukcija.",
    url: "/zatvaranje-nadstresnica/",
    images: [{ url: "/slike/zatvaranje_nadstresnica.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zatvaranje Nadstrešnica i Terasa | Statoplast",
    description: "Pretvorite otvorenu nadstrešnicu ili terasu u koristan prostor tijekom cijele godine. Kvalitetne klizne staklene stijene i stabilna aluminijska konstrukcija.",
    images: ["/slike/zatvaranje_nadstresnica.jpeg"],
  },
};

export default function ZatvaranjeNadstresnicaPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="hr" />

        <SecondaryNav variant="light" locale="hr" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                Iskoristite prostor u svim godišnjim dobima
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Zatvaranje
                <br />
                <span className="font-bold">Nadstrešnica.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Pretvorite vašu otvorenu nadstrešnicu, terasu ili ugostiteljski prostor u
                funkcionalnu zatvorenu zonu. Primjenom kvalitetnih kliznih staklenih stijena i
                fiksnih aluminijskih elemenata osiguravamo zaštitu od vjetra i vlage, zadržavajući
                pritom prozirnost i pogled prema okolini.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica.jpeg"
                alt="Zatvaranje Nadstrešnica - Ostakljeni prostor"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 order-2 lg:order-1 h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica2.jpeg"
                alt="Zatvaranje nadstrešnica kliznim staklenim stijenama"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Pouzdani i glatki klizni sustavi
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Zatvaranje izvodimo pomoću stabilnih kliznih stijena na višekanalnim vodilicama koje
                omogućuju jednostavno i lagano pomicanje staklenih panela. Sustav pruža visoku
                praktičnost osiguravajući da u toplijim danima panele možete jednostavno odsklizati i
                otvoriti prostor, dok zimi pruža sigurnu barijeru od nepovoljnog vremena.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  Idealan način za proširenje korisne površine kuće ili poslovnog objekta uz
                  dugotrajne materijale otporne na starenje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
