import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Statoplast | O nama",
  description:
    "Saznajte više o tvrtki Statoplast. S preko 30 godina iskustva u obradi metala, spajamo obiteljsku tradiciju i najmoderniju CNC tehnologiju.",
};

export default function ONamaPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex-grow animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
              Tradicija i Kvaliteta
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
              Inženjering koji <br />
              <span className="font-bold">pomjera granice.</span>
            </h1>
            <p className="text-lg text-zinc-500 mb-6 leading-relaxed font-light">
              Tvrtka STATOPLAST d.o.o. vuče svoje korijene iz dugogodišnjeg obiteljskog iskustva i
              posvećenosti obradi metala. Ono što je započelo kao vizija, danas je moderna tvornica
              opremljena najnovijom tehnologijom.
            </p>
            <p className="text-base text-zinc-500 mb-8 leading-relaxed font-light">
              Kombiniramo stručno znanje, inovativne pristupe i stroge kontrole kvalitete kako bismo
              odgovorili na najzahtjevnije izazove moderne arhitekture i B2B metalne industrije. Naš
              fokus je na dugotrajnosti, preciznosti i zadovoljstvu naših partnera.
            </p>
          </div>
          <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/o-nama.jpg"
              alt="Statoplast Pogon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">30+</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Godina Iskustva
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">Preciznost</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              U svakom detalju
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Fokus na klijenta
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-zinc-900 text-zinc-400 text-sm mt-auto border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Statoplast d.o.o.
            </h3>
            <p className="font-light leading-relaxed text-zinc-400">
              Kombinacija tradicije, inovacije i vrhunske tehnologije u obradi metala i inženjeringu.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">Kontakt</h3>
            <ul className="space-y-2 font-light text-zinc-400">
              <li>Adresa: Sveti Urban 256a, Štrigova 40312</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:info@statoplast.hr"
                  className="hover:text-white transition-colors"
                >
                  info@statoplast.hr
                </a>
              </li>
              <li>Tel: +385 (0)40 584 230</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Navigacija
            </h3>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Početna
                </Link>
              </li>
              <li>
                <a href="#" className="text-white font-medium">
                  O nama
                </a>
              </li>
              <li>
                <Link href="/projekti" className="hover:text-white transition-colors">
                  Projekti
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 py-6 text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 Statoplast d.o.o. Sva prava pridržana.</div>
            <div>
              Dizajn i razvoj:{" "}
              <a href="#" className="hover:text-zinc-400 transition-colors">
                STATOPLAST D.O.O.
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
