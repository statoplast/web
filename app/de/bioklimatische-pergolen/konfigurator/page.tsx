import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import PergolaConfigurator from "@/components/PergolaConfigurator";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "3D-Konfigurator Bioklimatische Pergola | Statoplast",
  description:
    "Testen Sie unseren 3D-Konfigurator und passen Sie die Abmessungen Ihrer bioklimatischen Pergola - Breite, Tiefe, Höhe und Anzahl der Stützen - in Echtzeit an.",
  alternates: {
    canonical: "/de/bioklimatische-pergolen/konfigurator/",
    languages: alternateLanguages("/bioklimatske-pergole/konfigurator"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "3D-Konfigurator Bioklimatische Pergola | Statoplast",
    description: "Testen Sie unseren 3D-Konfigurator und passen Sie die Abmessungen Ihrer bioklimatischen Pergola - Breite, Tiefe, Höhe und Anzahl der Stützen - in Echtzeit an.",
    url: "/de/bioklimatische-pergolen/konfigurator/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D-Konfigurator Bioklimatische Pergola | Statoplast",
    description: "Testen Sie unseren 3D-Konfigurator und passen Sie die Abmessungen Ihrer bioklimatischen Pergola - Breite, Tiefe, Höhe und Anzahl der Stützen - in Echtzeit an.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function PergolaKonfiguratorPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />
        <SecondaryNav variant="light" locale="de" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-10">
        <div>
          <Link
            href="/de/bioklimatische-pergolen"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors inline-flex items-center gap-2 mb-6"
          >
            ← Zurück zu bioklimatischen Pergolen
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            3D-Konfigurator <span className="font-bold">Pergola.</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Stellen Sie Breite, Tiefe, Höhe und Anzahl der Stützen ein und sehen Sie in Echtzeit
            eine Vorschau Ihrer bioklimatischen Pergola. Sie können das Modell frei drehen und
            zoomen.
          </p>
        </div>

        <div className="max-w-2xl bg-white border border-zinc-200 rounded-2xl p-5">
          <p className="text-sm text-zinc-600 leading-relaxed">
            <span className="font-bold text-zinc-900">Dies ist nur ein Rahmen der Möglichkeiten.</span>{" "}
            Der Konfigurator zeigt gängige Abmessungen und die häufigsten Befestigungsarten, doch
            darauf sind wir nicht beschränkt — wenn Sie ein spezifisches Projekt, ein untypisches
            Maß oder eine besondere Anforderung haben, melden Sie sich bei uns. Wir passen die
            Lösung Ihrem Raum an, nicht umgekehrt.
          </p>
        </div>

        <PergolaConfigurator locale="de" />
      </main>
    </div>
  );
}
