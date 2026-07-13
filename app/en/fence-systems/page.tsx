import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Modern Fencing | Aluminium & Glass Systems | Statoplast",
  description:
    "Elegant, custom-made aluminium and glass fencing. Minimalist design with clean lines for balconies, terraces and gardens with zero maintenance.",
  alternates: {
    canonical: "/en/fence-systems/",
    languages: alternateLanguages("/moderne-ograde"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Modern Fencing | Aluminium & Glass Systems | Statoplast",
    description: "Elegant, custom-made aluminium and glass fencing. Minimalist design with clean lines for balconies, terraces and gardens with zero maintenance.",
    url: "/en/fence-systems/",
    images: [{ url: "/slike/moderne_ograde.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Fencing | Aluminium & Glass Systems | Statoplast",
    description: "Elegant, custom-made aluminium and glass fencing. Minimalist design with clean lines for balconies, terraces and gardens with zero maintenance.",
    images: ["/slike/moderne_ograde.jpeg"],
  },
};

export default function ModernFencingPage() {
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
                Safety and clean lines
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Modern
                <br />
                <span className="font-bold">Fencing.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                The aluminium and glass fencing in our range is engineered with an emphasis on
                longevity and simple lines that follow contemporary building style. Whether for
                gardens, balconies or terraces, they provide stable protection without disrupting
                the look of your building.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde.jpeg"
                alt="Modern Fencing - Aluminium system"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden h-[450px] bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/moderne_ograde2.jpg"
                alt="Modern fencing - balcony installation detail"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Top-tier design and flawless aesthetics
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                The main advantage of our fencing systems is their attractive, modern look that
                dramatically elevates the overall appearance of your building. Minimalist design,
                clean lines and carefully executed details make them the perfect architectural
                accent. Of course, alongside outstanding aesthetics, the aluminium construction
                guarantees exceptional strength and full resistance to the elements with no need
                for additional maintenance or painting.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Safety glass</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Premium tempered and multi-layer laminated glass that ensures maximum strength
                    and safety, with an option for a frosted finish for full visual privacy.
                  </p>
                </div>
                <div className="p-4 bg-zinc-100 rounded-xl">
                  <h5 className="font-bold text-sm">Aluminium louvres</h5>
                  <p className="text-xs text-zinc-500 mt-1">
                    Adjustable louvre spacing for your desired level of privacy in your garden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
