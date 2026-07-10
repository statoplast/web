import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aluminijska Pivot Vrata | Statoplast Moderna Arhitektura",
  description:
    "Statoplast aluminijska pivot vrata predstavljaju vrh moderne estetike i inženjeringa. Izrada po mjeri, visoka nosivost i vrhunska toplinska izolacija.",
  alternates: {
    canonical: "/pivot-vrata/",
    languages: alternateLanguages("/pivot-vrata"),
  },
};

export default function PivotVrataPage() {
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
                Vrhunska estetika i stabilnost
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Aluminijska
                <br />
                <span className="font-bold">Pivot Vrata.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Statoplast pivot vrata predstavljaju sam vrh moderne estetike i inženjeringa ulaznih
                sustava. Karakterizira ih rotacija oko vertikalne osi pomoću robusnih podnih i
                stropnih mehanizama koji omogućuju lagano i besprijekorno rukovanje masivnim krilima.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Konstrukcija visoke nosivosti
                    </h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      Inovativni sustav oslanjanja omogućuje nošenje masivnih i teških krila bez
                      preopterećenja bočnog okvira, osiguravajući iznimno lagano otvaranje.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Suvremena kontrola pristupa
                    </h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      Mogućnost integracije elektro-brava s čitačima otiska prsta ili pametnim
                      sustavima ulaza.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-[80%] mx-auto h-auto rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/pivot_vrata.jpg"
                alt="Pivot Vrata - Glavni motiv"
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
                  alt="Pivot vrata - Individualni model 1"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata3.jpg"
                  alt="Pivot vrata - Individualni model 2"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata4.jpg"
                  alt="Pivot vrata - Individualni model 3"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900">
                Individualan pristup i materijali
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Svaka pozicija se u potpunosti prilagođava dizajnu i arhitekturi vašeg objekta. Za
                vanjske i unutarnje obloge koristimo vrhunske materijale i aluminijske profile visoke
                čvrstoće koji osiguravaju besprijekornu geometriju krila i dugotrajan rad kroz godine
                eksploatacije.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  Zaokretna os stvara monumentalan dojam pri svakom otvaranju, pretvarajući ulaz u
                  središnji estetski element fasade.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-3xl p-8 md:p-12">
            <h4 className="text-2xl font-bold mb-6">Tehničke Specifikacije Pivot Sustava</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <th className="pb-4 pr-6">Karakteristika</th>
                    <th className="pb-4">Opis i prednosti</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Brtvljenje</td>
                    <td className="py-4 align-top">
                      3-razinsko brtvljenje s posebno dizajniranim EPDM gumama i neprekinutom
                      središnjom brtvom nudi visoku razinu nepropusnosti zraka, vode i izolacije.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Toplinska izolacija</td>
                    <td className="py-4 align-top">
                      Posebni poliamidi protiv izobličenja u kombinaciji s poliuretanskom jezgrom
                      postižu optimalnu izolaciju i minimiziraju deformacije krila zbog temperaturnih
                      razlika.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Sigurnost i kontrola</td>
                    <td className="py-4 align-top">
                      Standardno automatsko zaključavanje u 5 točaka uz opciju elektromagnetske
                      brave. Upravljanje po želji putem skenera otiska prsta ili digitalne
                      tipkovnice.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Pristup</td>
                    <td className="py-4 align-top">
                      Niski prag koji omogućuje lak i nesmetan pristup iz unutrašnjosti, posebno
                      pogodan za osobe s invaliditetom.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Mehanizam panta</td>
                    <td className="py-4 align-top">Vrhunski robusni pivot sustavi sa stabilnom osi.</td>
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
