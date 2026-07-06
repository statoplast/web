import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Statoplast | Industrijske Usluge",
  description:
    "Pouzdana serijska proizvodnja metalnih komponenti. Statoplast je vaš strateški B2B outsourcing partner za cjelovitu izradu i montažu. Pošaljite nacrt!",
};

export default function SerijskaProizvodnjaPage() {
  return (
    <div className="bg-[#1a2a40] text-slate-300 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <SiteHeader variant="industrial" />

      <section className="sticky top-[73px] z-40 bg-slate-900/95 backdrop-blur-md pt-6 pb-0 border-b border-slate-800 shadow-xl">
        <div
          id="secondary-nav"
          className="max-w-6xl mx-auto px-6 overflow-x-auto whitespace-nowrap scrollbar-none"
        >
          <div className="flex space-x-10 md:space-x-12">
            <Link
              href="/plastifikacija-metala"
              className="relative pb-4 text-sm font-medium text-slate-500 hover:text-white tracking-wide transition-all inline-block"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm opacity-0 transition-opacity"></span>
              Plastifikacija Metala
            </Link>
            <Link
              href="/lasersko-rezanje"
              className="relative pb-4 text-sm font-medium text-slate-500 hover:text-white tracking-wide transition-all inline-block"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm opacity-0 transition-opacity"></span>
              Lasersko Rezanje
            </Link>
            <Link
              href="/cnc-obrada"
              className="relative pb-4 text-sm font-medium text-slate-500 hover:text-white tracking-wide transition-all inline-block"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm opacity-0 transition-opacity"></span>
              CNC Obrada
            </Link>
            <Link
              href="/ormari"
              className="relative pb-4 text-sm font-medium text-slate-500 hover:text-white tracking-wide transition-all inline-block"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm opacity-0 transition-opacity"></span>
              Metalni i Elektro Ormari
            </Link>
            <Link
              href="/serijska-proizvodnja"
              className="relative pb-4 text-sm font-bold text-white tracking-wide transition-all inline-block"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-opacity"></span>
              Serijska Proizvodnja
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-slide-in">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-800 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/serijska-glavna.jpg"
                alt="Serijska industrijska proizvodnja"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Vaš Outsourcing Partner
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                Serijska
                <br />
                Proizvodnja.
              </h1>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Statoplast je strateški proizvodni partner brojnim tvrtkama. Preuzimamo cjelokupni
                proces proizvodnje metalnih komponenti kako biste se vi mogli fokusirati na razvoj,
                marketing i prodaju vašeg finalnog proizvoda.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Spajanjem svih naših tehnologija (rezanje, savijanje, zavarivanje, plastifikacija i
                montaža) pod istim krovom, garantiramo strogu kontrolu kvalitete, niže troškove
                logistike i sigurne rokove isporuke.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <ul className="space-y-2 font-medium text-slate-200 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Optimizacija proizvodnih procesa za
                    velike serije
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Kompletno sklapanje poluproizvoda i
                    pakiranje
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Dogovoreni i pouzdani logistički tokovi
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/serijska-kontrola.jpg"
              alt="Kontrola kvalitete i pakiranje"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-800 flex flex-col justify-center">
              <h4 className="text-white font-bold text-xl mb-3">
                Zajedno do finalnog proizvoda
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bez obzira trebate li dijelove za automobilsku industriju, komponente za namještaj
                ili kućišta za strojeve, naš tim spreman je prilagoditi proizvodnju vašim
                normativima.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 p-10 lg:p-16 bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-slate-700 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Trebate pouzdanog proizvodnog partnera?
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Pošaljite nam tehničke nacrte, 3D modele ili specifikacije, a naš inženjerski tim će vam
            se povratno javiti s prijedlogom optimizacije i konkretnom ponudom.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-sm text-sm font-bold tracking-[0.2em] transition-colors relative z-10 shadow-lg shadow-blue-900/50"
          >
            ZATRAŽITE PONUDU
          </Link>
        </div>
      </main>
    </div>
  );
}
