import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bioklimatske Pergole s Kliznim Krovom | Statoplast",
  description:
    "Inovativne aluminijske bioklimatske pergole s vlastito dizajniranim kliznim krovom. Integrirana odvodnja vode, LED rasvjeta i pametno upravljanje terasom.",
  alternates: {
    canonical: "/bioklimatske-pergole/",
    languages: alternateLanguages("/bioklimatske-pergole"),
  },
};

export default function BioklimatskePergolePage() {
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
                Ugodan boravak na otvorenom
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Bioklimatske
                <br />
                <span className="font-bold">Pergole.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Naše bioklimatske pergole omogućuju maksimalno iskorištavanje terase ili dvorišta.
                Naš jedinstveni, vlastito dizajnirani sustav osigurava vrhunsku statičku stabilnost i
                dugotrajnost, uz estetski dizajn koji se besprijekorno uklapa u svaki arhitektonski
                stil. Sustav omogućuje laku transformaciju krova, čime se postiže optimalna zaštita
                od vremenskih nepogoda, pružajući savršenu regulaciju svjetlosti, sunca i
                prozračnosti u prostoru.
              </p>

              <ul className="space-y-3 text-sm text-zinc-700 font-medium mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Inovativni sustav kliznih
                  limova za potpunu kontrolu otvorenosti
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Sustav odvodnje vode integriran
                  unutar same konstrukcije
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Mogućnost ugradnje estetske LED
                  rasvjete za večernji ugođaj
                </li>
              </ul>

              <Link
                href="/bioklimatske-pergole/konfigurator"
                className="group inline-flex items-center gap-3 self-start bg-zinc-900 hover:bg-black text-white px-6 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Isprobajte 3D konfigurator
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/bioklimatska_pergola.jpeg"
                alt="Bioklimatska Pergola - Pogled na otvoreni klizni krov"
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
                  alt="Pergola zatvoreni položaj ambijent"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-[450px] bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/bioklimatska_pergola3.jpeg"
                  alt="Bioklimatska pergola - Detalj kliznog mehanizma"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Funkcionalnost i vrhunska izvedba
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Cjelokupna konstrukcija izrađena je od visokokvalitetnih aluminijskih profila
                zaštićenih plastifikacijom. Limovi se glatko sklapaju i klize unazad putem provjenu
                mehanizama i motoriziranih pogona, što omogućuje brzo prilagođavanje trenutnim
                vremenskim uvjetima.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Fleksibilno Upravljanje
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Prilagodite pergolu vašem životnom stilu. Kao opciju nudimo upravljanje putem
                      klasičnog daljinskog upravljača ili potpuno pametno upravljanje aplikacijom
                      preko mobitela.
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Prilagođene dimenzije
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Svaka se pergola detaljno dimenzionira i planira prema specifičnim uvjetima i
                      zahtjevima vaše lokacije i objekta.
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
