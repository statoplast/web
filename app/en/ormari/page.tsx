import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Custom Metal & Electrical Cabinets | Statoplast",
  description:
    "Manufacturing of electrical cabinets, IT rack systems and custom metal enclosures. Statoplast offers complete production with high IP protection and powder coating. Learn more!",
  alternates: {
    canonical: "/en/ormari/",
    languages: alternateLanguages("/ormari"),
  },
};

export default function CabinetsPage() {
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
                src="/slike/ormari-glavna.jpg"
                alt="Industrial metal and electrical cabinets"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Enclosure development and manufacturing
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                Metal & Electrical
                <br />
                Cabinets.
              </h1>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                We manufacture a wide range of metal hardware and specialised enclosures. From
                classic electrical distribution cabinets, through IT rack systems, all the way to
                sturdy locker cabinets for industry and schools.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                We offer complete production: from laser cutting and bending, through welding and
                fitting polyurethane seals to achieve high IP protection, all the way to final
                powder coating and installation of locks and hinges.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <ul className="space-y-2 font-medium text-slate-200 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Freestanding and flush-mounted
                    electrical distribution cabinets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Locker and archive metal cabinets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Custom dimensions and cutouts to the
                    client's specification
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/ormari-it.jpg"
              alt="Server and IT cabinets"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/ormari-detalj.jpg"
              alt="Assembled electrical cabinet detail"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
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
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-10 py-4 rounded-sm text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap transition-colors relative z-10 shadow-lg shadow-blue-900/50"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </main>
    </div>
  );
}
