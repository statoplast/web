import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Quality Aluminium Joinery & Windows | Statoplast",
  description:
    "Premium aluminium windows, doors and sliding walls with a thermal break. Maximum insulation, stability and longevity for every type of building.",
  alternates: {
    canonical: "/en/alu-stolarija/",
    languages: alternateLanguages("/alu-stolarija"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Quality Aluminium Joinery & Windows | Statoplast",
    description: "Premium aluminium windows, doors and sliding walls with a thermal break. Maximum insulation, stability and longevity for every type of building.",
    url: "/en/alu-stolarija/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Aluminium Joinery & Windows | Statoplast",
    description: "Premium aluminium windows, doors and sliding walls with a thermal break. Maximum insulation, stability and longevity for every type of building.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function AluminiumJoineryPage() {
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
                Proven, high-stability systems
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Quality Aluminium
                <br />
                <span className="font-bold">Joinery.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                We offer top-tier solutions in manufacturing standard, classic aluminium windows,
                doors and sliding walls of the highest class. Our systems deliver flawless
                mechanical strength, exceptional longevity and outstanding insulation protection
                for every building.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Longevity</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Aluminium doesn't lose its properties and requires minimal maintenance over the
                    years.
                  </p>
                </div>
                <div className="p-5 bg-zinc-100 rounded-2xl">
                  <h5 className="text-xl font-bold text-black mb-1">Stability</h5>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-2">
                    Robust profiles ideal for larger glass walls and standard positions.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderna_arhitektura_kuca.jpeg"
                alt="Aluminium Joinery - Finished building view"
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
                  alt="Aluminium profiles and window systems"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/alu_stolarija3.jpeg"
                  alt="Aluminium sliding wall detail"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Reliable profiles for every type of building
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                By focusing on proven, technically superior standard profiles, we ensure maximum
                stability and perfect sealing. The systems are fitted with quality hardware and
                multi-layer glass packages that successfully reduce outside noise and heat loss.
              </p>
              <div className="space-y-2 text-sm text-zinc-600">
                <p>• High-quality aluminium profiles with a thermal break</p>
                <p>• A wide selection of RAL colours in matte and structured finishes</p>
                <p>• Reliable hardware for smooth, secure everyday opening</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
