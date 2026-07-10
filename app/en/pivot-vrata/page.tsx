import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aluminium Pivot Doors | Statoplast Modern Architecture",
  description:
    "Statoplast aluminium pivot doors: the pinnacle of modern aesthetics, custom-made with high load capacity and outstanding thermal insulation.",
  alternates: {
    canonical: "/en/pivot-vrata/",
    languages: alternateLanguages("/pivot-vrata"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Aluminium Pivot Doors | Statoplast Modern Architecture",
    description: "Statoplast aluminium pivot doors: the pinnacle of modern aesthetics, custom-made with high load capacity and outstanding thermal insulation.",
    url: "/en/pivot-vrata/",
    images: [{ url: "/slike/pivot_vrata.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluminium Pivot Doors | Statoplast Modern Architecture",
    description: "Statoplast aluminium pivot doors: the pinnacle of modern aesthetics, custom-made with high load capacity and outstanding thermal insulation.",
    images: ["/slike/pivot_vrata.jpg"],
  },
};

export default function PivotDoorsPage() {
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
                Outstanding aesthetics and stability
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Aluminium
                <br />
                <span className="font-bold">Pivot Doors.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Statoplast pivot doors represent the very peak of modern aesthetics and entrance
                system engineering. They rotate around a vertical axis via robust floor and ceiling
                mechanisms that allow smooth, effortless operation of massive door leaves.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      High load-bearing construction
                    </h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      An innovative support system carries massive, heavy leaves without
                      overloading the side frame, ensuring remarkably smooth opening.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">Modern access control</h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      Option to integrate electric locks with fingerprint readers or smart entry
                      systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 w-[80%] mx-auto h-auto rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/pivot_vrata.jpg"
                alt="Pivot Doors - Main view"
                className="w-full h-auto transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 order-2 lg:order-1">
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata2.jpg"
                  alt="Pivot doors - custom model 1"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata3.jpeg"
                  alt="Pivot doors - custom model 2"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg bg-zinc-200 sm:mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/slike/pivot_vrata4.jpeg"
                  alt="Pivot doors - custom model 3"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900">
                An individual approach and materials
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Every position is fully tailored to your building's design and architecture. For
                exterior and interior cladding we use top-grade materials and high-strength
                aluminium profiles that ensure flawless leaf geometry and long service life over
                years of use.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  The pivoting axis creates a monumental impression with every opening, turning
                  the entrance into the central aesthetic element of the façade.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-3xl p-8 md:p-12">
            <h4 className="text-2xl font-bold mb-6">Pivot System Technical Specifications</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <th className="pb-4 pr-6">Feature</th>
                    <th className="pb-4">Description and benefits</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Sealing</td>
                    <td className="py-4 align-top">
                      3-level sealing with specially designed EPDM gaskets and an uninterrupted
                      central seal delivers a high degree of air- and water-tightness and
                      insulation.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Thermal insulation</td>
                    <td className="py-4 align-top">
                      Special anti-warping polyamides combined with a polyurethane core achieve
                      optimal insulation and minimise leaf deformation caused by temperature
                      differences.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Security & control</td>
                    <td className="py-4 align-top">
                      Standard automatic 5-point locking with an optional electromagnetic lock.
                      Operable via fingerprint scanner or digital keypad on request.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Access</td>
                    <td className="py-4 align-top">
                      A low threshold enables easy, unobstructed access from the interior,
                      particularly suited for people with disabilities.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-zinc-950 align-top">Hinge mechanism</td>
                    <td className="py-4 align-top">Premium, robust pivot systems with a stable axis.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
