import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Hvala na poslanoj poruci | Statoplast",
  description: "Vaša poruka je uspješno poslana Statoplastu.",
  robots: { index: false, follow: true },
};

export default function HvalaPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="hr" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto animate-fade-in">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Hvala Vam
            <br />
            <span className="font-bold">na poslanoj poruci.</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-12 font-light leading-relaxed">
            Vaša poruka je uspješno poslana. Naš tim će vas kontaktirati u najkraćem mogućem roku
            na navedenu email adresu.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-black hover:bg-zinc-800 text-white px-8 py-4 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
            >
              Natrag na početnu
            </Link>
            <Link
              href="/projekti"
              className="border border-zinc-300 hover:border-black text-zinc-700 hover:text-black px-8 py-4 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
            >
              Pogledajte naše projekte
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
