import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import PergolaConfigurator from "@/components/PergolaConfigurator";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "3D Bioclimatic Pergola Configurator | Statoplast",
  description:
    "Try our 3D configurator and customise your bioclimatic pergola's dimensions - width, depth, height and number of pillars - in real time.",
  alternates: {
    canonical: "/en/bioclimatic-pergolas/configurator/",
    languages: alternateLanguages("/bioklimatske-pergole/konfigurator"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "3D Bioclimatic Pergola Configurator | Statoplast",
    description: "Try our 3D configurator and customise your bioclimatic pergola's dimensions - width, depth, height and number of pillars - in real time.",
    url: "/en/bioclimatic-pergolas/configurator/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Bioclimatic Pergola Configurator | Statoplast",
    description: "Try our 3D configurator and customise your bioclimatic pergola's dimensions - width, depth, height and number of pillars - in real time.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function PergolaConfiguratorPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="en" />
        <SecondaryNav variant="light" locale="en" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-10">
        <div>
          <Link
            href="/en/bioclimatic-pergolas"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors inline-flex items-center gap-2 mb-6"
          >
            ← Back to bioclimatic pergolas
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            3D Pergola <span className="font-bold">Configurator.</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Set the width, depth, height and number of pillars and see a real-time preview of your
            bioclimatic pergola. You can freely rotate and zoom the model.
          </p>
        </div>

        <div className="max-w-2xl bg-white border border-zinc-200 rounded-2xl p-5">
          <p className="text-sm text-zinc-600 leading-relaxed">
            <span className="font-bold text-zinc-900">This is just a framework of possibilities.</span>{" "}
            The configurator shows common dimensions and the most frequent mounting types, but
            we're not limited to these — if you have a specific project, an atypical measurement
            or a special requirement, get in touch. We adapt the solution to your space, not the
            other way around.
          </p>
          <Link
            href="/en/projects"
            className="group inline-flex items-center gap-2 mt-4 text-sm font-bold text-zinc-900 hover:text-blue-600 transition-colors"
          >
            See the pergolas we've already built
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <PergolaConfigurator locale="en" />
      </main>
    </div>
  );
}
