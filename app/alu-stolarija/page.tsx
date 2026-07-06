import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";

export const metadata: Metadata = {
  title: "Kvalitetna ALU Stolarija i Prozori | Statoplast",
  description:
    "Vrhunski aluminijski prozori, vrata i klizne stijene s prekinutim toplinskim mostom. Maksimalna izolacija, stabilnost i dugovječnost za sve tipove objekata.",
};

export default function AluStolarijaPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" />

        <SecondaryNav variant="light" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                Provjereni sustavi visoke stabilnosti
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Kvalitetna ALU
                <br />
                <span className="font-bold">Stolarija.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Nudimo vrhunska rješenja u proizvodnji standardnih, klasičnih aluminijskih prozora,
                vrata i kliznih stijena najviše klase. Naši sustavi pružaju besprijekornu mehaničku
                čvrstoću, iznimnu dugotrajnost i vrhunsku izolacijsku zaštitu svakog objekta.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Dugovječnost</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Aluminij ne gubi svoja svojstva i zahtijeva minimalno održavanje kroz godine.
                  </p>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Stabilnost</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Robusni profili idealni za veće staklene stijene i standardne pozicije.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/alu_stolarija.jpg"
                alt="Alu Stolarija - Pogled na gotov objekt"
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
                  alt="Alu profili i prozorski sustavi"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/alu_stolarija3.jpg"
                  alt="Aluminijska klizna stijena detalj"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Pouzdani profili za svaku vrstu objekta
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Fokusiranjem na provjerene i tehnički superiorne standardne profile, osiguravamo
                maksimalnu stabilnost i savršeno brtvljenje. Sustavi su opremljeni kvalitetnim
                okovima i višeslojnim staklenim paketima koji uspješno reduciraju vanjsku buku i
                toplinske gubitke.
              </p>
              <div className="space-y-2 text-sm text-zinc-600">
                <p>• Visokokvalitetni aluminijski profili s prekinutim toplinskim mostom</p>
                <p>• Veliki izbor RAL boja u mat i strukturnim izvedbama</p>
                <p>• Pouzdani okovi za glatko i sigurno svakodnevno otvaranje</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
