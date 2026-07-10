import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bioclimatic Pergolas with Sliding Roof | Statoplast",
  description:
    "Innovative aluminium bioclimatic pergolas with an in-house designed sliding roof. Integrated water drainage, LED lighting and smart terrace control.",
  alternates: {
    canonical: "/en/bioklimatske-pergole/",
    languages: alternateLanguages("/bioklimatske-pergole"),
  },
};

export default function BioclimaticPergolasPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="en" />

        <SecondaryNav variant="light" locale="en" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                A pleasant outdoor stay
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Bioclimatic
                <br />
                <span className="font-bold">Pergolas.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Our bioclimatic pergolas let you make the most of your terrace or garden. Our
                unique, in-house designed system delivers outstanding structural stability and
                longevity, with an aesthetic design that fits seamlessly into any architectural
                style. The system allows the roof to transform easily, achieving optimal
                protection from the weather while giving you perfect control over light, sun and
                airflow in the space.
              </p>

              <ul className="space-y-3 text-sm text-zinc-700 font-medium mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Innovative sliding-sheet
                  system for full control over openness
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Water drainage system
                  integrated into the structure itself
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-zinc-900 font-bold">✓</span> Option to fit aesthetic LED
                  lighting for evening ambiance
                </li>
              </ul>

              <Link
                href="/en/bioklimatske-pergole/konfigurator"
                className="group inline-flex items-center gap-3 self-start bg-zinc-900 hover:bg-black text-white px-6 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Try the 3D configurator
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/bioklimatska_pergola.jpeg"
                alt="Bioclimatic Pergola - view of the open sliding roof"
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
                  alt="Pergola in the closed position, ambient view"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-[450px] bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/bioklimatska_pergola3.jpeg"
                  alt="Bioclimatic pergola - sliding mechanism detail"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Functionality and top-tier performance
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                The entire structure is built from high-quality aluminium profiles protected by
                powder coating. The sheets fold and slide back smoothly via proven mechanisms and
                motorised drives, allowing quick adaptation to current weather conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Flexible control
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Adapt the pergola to your lifestyle. As an option we offer control via a
                      classic remote control or fully smart control through a mobile app.
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 uppercase tracking-wider">
                      Custom dimensions
                    </h5>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Every pergola is dimensioned and planned in detail according to the specific
                      conditions and requirements of your location and building.
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
