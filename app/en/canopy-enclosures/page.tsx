import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Canopy & Terrace Enclosures | Statoplast",
  description:
    "Turn an open canopy or terrace into a usable space all year round. Quality sliding glass walls and a stable aluminium structure.",
  alternates: {
    canonical: "/en/canopy-enclosures/",
    languages: alternateLanguages("/zatvaranje-nadstresnica"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Canopy & Terrace Enclosures | Statoplast",
    description: "Turn an open canopy or terrace into a usable space all year round. Quality sliding glass walls and a stable aluminium structure.",
    url: "/en/canopy-enclosures/",
    images: [{ url: "/slike/zatvaranje_nadstresnica.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canopy & Terrace Enclosures | Statoplast",
    description: "Turn an open canopy or terrace into a usable space all year round. Quality sliding glass walls and a stable aluminium structure.",
    images: ["/slike/zatvaranje_nadstresnica.jpeg"],
  },
};

export default function CanopyEnclosuresPage() {
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
                Make use of the space in every season
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Canopy
                <br />
                <span className="font-bold">Enclosures.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Turn your open canopy, terrace or hospitality space into a functional enclosed
                zone. By using quality sliding glass walls and fixed aluminium elements, we
                provide protection from wind and moisture while preserving transparency and the
                view of your surroundings.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica.jpeg"
                alt="Canopy Enclosure - Glazed space"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 order-2 lg:order-1 h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica2.jpeg"
                alt="Canopy enclosure with sliding glass walls"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Reliable, smooth sliding systems
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                We carry out the enclosure using stable sliding walls on multi-channel tracks that
                allow for easy, effortless movement of the glass panels. The system offers high
                practicality, letting you simply slide the panels open on warmer days, while in
                winter it provides a secure barrier against harsh weather.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  An ideal way to expand the usable area of a home or business premises, using
                  durable materials resistant to ageing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
