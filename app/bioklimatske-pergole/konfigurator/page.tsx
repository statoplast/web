import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import PergolaConfigurator from "@/components/PergolaConfigurator";

export const metadata: Metadata = {
  title: "3D Konfigurator Bioklimatske Pergole | Statoplast",
  description:
    "Isprobajte naš 3D konfigurator i prilagodite dimenzije bioklimatske pergole - širinu, dubinu, visinu i broj stupova - u stvarnom vremenu.",
};

export default function PergolaKonfiguratorPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" />
        <SecondaryNav variant="light" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-10">
        <div>
          <Link
            href="/bioklimatske-pergole"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors inline-flex items-center gap-2 mb-6"
          >
            ← Natrag na bioklimatske pergole
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            3D Konfigurator <span className="font-bold">Pergole.</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Postavite širinu, dubinu, visinu i broj stupova te u stvarnom vremenu pogledajte
            okvirni izgled vaše bioklimatske pergole. Model možete slobodno rotirati i zumirati.
          </p>
        </div>

        <div className="max-w-2xl bg-white border border-zinc-200 rounded-2xl p-5">
          <p className="text-sm text-zinc-600 leading-relaxed">
            <span className="font-bold text-zinc-900">Ovo je tek okvir mogućnosti.</span>{" "}
            Konfigurator prikazuje uobičajene dimenzije i najčešće načine oslanjanja, no time se ne
            ograničavamo — ako imate specifičan projekt, netipičnu mjeru ili poseban zahtjev,
            javite nam se. Prilagođavamo rješenje vašem prostoru, ne obrnuto.
          </p>
        </div>

        <PergolaConfigurator />
      </main>
    </div>
  );
}
