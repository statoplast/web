import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Series Production of Metal Components | Statoplast",
  description:
    "Reliable series production of metal components. Statoplast is your strategic B2B outsourcing partner for complete manufacturing and assembly. Send us a drawing!",
  alternates: {
    canonical: "/en/serijska-proizvodnja/",
    languages: alternateLanguages("/serijska-proizvodnja"),
  },
};

export default function SeriesProductionPage() {
  return (
    <div className="bg-[#1a2a40] text-slate-300 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="industrial" locale="en" />

        <SecondaryNav variant="industrial" locale="en" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-slide-in">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-800 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/serijska-glavna.jpg"
                alt="Series industrial production"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Your outsourcing partner
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                Series
                <br />
                Production.
              </h1>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Statoplast is a strategic manufacturing partner to numerous companies. We take on
                the entire production process for metal components so you can focus on developing,
                marketing and selling your final product.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                By bringing together all our technologies (cutting, bending, welding, powder
                coating and assembly) under one roof, we guarantee strict quality control, lower
                logistics costs and reliable delivery deadlines.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <ul className="space-y-2 font-medium text-slate-200 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Optimisation of production processes
                    for large batches
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Complete sub-assembly and packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Agreed, reliable logistics flows
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/serijska-kontrola.jpg"
              alt="Quality control and packaging"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <div className="bg-slate-800/30 p-8 rounded-xl border border-slate-800 flex flex-col justify-center">
              <h4 className="text-white font-bold text-xl mb-3">
                Together toward the final product
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you need parts for the automotive industry, furniture components or
                machine enclosures, our team is ready to adapt production to your specifications.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 p-10 lg:p-16 bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-slate-700 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Need a reliable manufacturing partner?
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Send us your technical drawings, 3D models or specifications, and our engineering team
            will get back to you with an optimisation proposal and a concrete quote.
          </p>
          <Link
            href="/en/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-sm text-sm font-bold tracking-[0.2em] transition-colors relative z-10 shadow-lg shadow-blue-900/50"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </main>
    </div>
  );
}
