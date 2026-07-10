import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Über uns",
  description:
    "Erfahren Sie mehr über Statoplast. Mit über 30 Jahren Erfahrung in der Metallverarbeitung verbinden wir Familientradition mit modernster CNC-Technologie.",
  alternates: {
    canonical: "/de/o-nama/",
    languages: alternateLanguages("/o-nama"),
  },
};

export default function UeberUnsPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex-grow animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
              Tradition und Qualität
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
              Engineering, das <br />
              <span className="font-bold">Grenzen verschiebt.</span>
            </h1>
            <p className="text-lg text-zinc-500 mb-6 leading-relaxed font-light">
              Das Unternehmen STATOPLAST d.o.o. hat seine Wurzeln in langjähriger
              Familienerfahrung und der Hingabe an die Metallverarbeitung. Was als Vision begann,
              ist heute eine moderne, mit neuester Technologie ausgestattete Fabrik.
            </p>
            <p className="text-base text-zinc-500 mb-8 leading-relaxed font-light">
              Wir verbinden Fachwissen, innovative Ansätze und strenge Qualitätskontrollen, um den
              anspruchsvollsten Herausforderungen moderner Architektur und der B2B-Metallindustrie
              gerecht zu werden. Unser Fokus liegt auf Langlebigkeit, Präzision und der
              Zufriedenheit unserer Partner.
            </p>
          </div>
          <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/o-nama.jpg"
              alt="Statoplast Werksgelände"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">30+</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Jahre Erfahrung
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">Präzision</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              In jedem Detail
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Kundenorientierung
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
              Eine Kombination aus Tradition, Innovation und modernster Technologie in
              Metallverarbeitung und Engineering.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2 font-light text-zinc-400">
              <li>Adresse: Sveti Urban 256a, Štrigova 40312, Kroatien</li>
              <li>
                E-Mail:{" "}
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
              Navigation
            </h3>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/de" className="hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <a href="#" className="text-white font-medium">
                  Über uns
                </a>
              </li>
              <li>
                <Link href="/de/projekti" className="hover:text-white transition-colors">
                  Projekte
                </Link>
              </li>
              <li>
                <Link href="/de/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 py-6 text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 Statoplast d.o.o. Alle Rechte vorbehalten.</div>
            <div>
              Design & Entwicklung:{" "}
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
