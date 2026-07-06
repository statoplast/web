import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Moderne Ograde | Aluminijski i Stakleni Sustavi | Statoplast",
  description:
    "Elegantne aluminijske i staklene ograde po mjeri. Minimalistički dizajn s čistim linijama za balkone, terase i dvorišta uz nula održavanja.",
};

export default function ModerneOgradePage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" />

        <section className="w-full bg-zinc-50/95 backdrop-blur-md border-b border-zinc-200 shadow-sm">
          <div
            id="secondary-nav"
            className="max-w-6xl mx-auto px-6 overflow-x-auto whitespace-nowrap scrollbar-none py-4"
          >
            <div className="flex space-x-8 text-sm font-semibold tracking-wide justify-start md:justify-center">
              <Link
                href="/pivot-vrata"
                className="text-zinc-400 border-b-2 border-transparent hover:text-black transition-all duration-300 pb-1 inline-block"
              >
                Pivot Vrata
              </Link>
              <Link
                href="/bioklimatske-pergole"
                className="text-zinc-400 border-b-2 border-transparent hover:text-black transition-all duration-300 pb-1 inline-block"
              >
                Bioklimatske pergole
              </Link>
              <Link
                href="/alu-stolarija"
                className="text-zinc-400 border-b-2 border-transparent hover:text-black transition-all duration-300 pb-1 inline-block"
              >
                Alu Stolarija
              </Link>
              <Link
                href="/moderne-ograde"
                className="text-black border-b-2 border-black pb-1 transition-all duration-300 inline-block"
              >
                Moderne Ograde
              </Link>
              <Link
                href="/zatvaranje-nadstresnica"
                className="text-zinc-400 border-b-2 border-transparent hover:text-black transition-all duration-300 pb-1 inline-block"
              >
                Zatvaranje Nadstrešnica
              </Link>
            </div>
          </div>
        </section>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                Sigurnost i čiste linije
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Moderne
                <br />
                <span className="font-bold">Ograde.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Aluminijske i staklene ograde iz naše ponude projektirane su s naglaskom na
                dugotrajnost i jednostavne linije koje prate suvremeni stil gradnje. Bilo da se radi
                o dvorištima, balkonima ili terasama, osiguravaju stabilnu zaštitu bez narušavanja
                izgleda objekta.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde.jpeg"
                alt="Moderne Ograde - Aluminijski sustav"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden h-[450px] bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde2.jpg"
                alt="Moderne ograde - Detalj izvedbe na balkonu"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Vrhunski dizajn i besprijekorna estetika
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Glavna prednost naših ogradnih sustava je atraktivan, moderan izgled koji dramatično
                podiže cjelokupnu vizuru vašeg objekta. Minimalistički dizajn, čiste linije i
                pažljivo izvedeni detalji čine ih savršenim arhitektonskim naglaskom. Naravno, uz
                vrhunsku estetiku, aluminijska konstrukcija jamči iznimnu čvrstoću i potpunu
                otpornost na vanjske atmosferilije bez potrebe za dodatnim održavanjem ili bojanjem.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Sigurnosna stakla</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Vrhunska kaljena i višeslojno laminirana stakla koja osiguravaju maksimalnu
                    čvrstoću i sigurnost, uz opciju matirane završne obrade za postizanje potpune
                    vizualne privatnosti.
                  </p>
                </div>
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Aluminijske lamele</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Prilagodljiv razmak lamela za željenu razinu privatnosti u vašem dvorištu.
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
