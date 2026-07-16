import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | About Us",
  description:
    "Learn more about Statoplast. With over 30 years of experience in metalworking, we combine family tradition with state-of-the-art CNC technology.",
  alternates: {
    canonical: "/en/about-us/",
    languages: alternateLanguages("/o-nama"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Statoplast | About Us",
    description: "Learn more about Statoplast. With over 30 years of experience in metalworking, we combine family tradition with state-of-the-art CNC technology.",
    url: "/en/about-us/",
    images: [{ url: "/slike/o-nama.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | About Us",
    description: "Learn more about Statoplast. With over 30 years of experience in metalworking, we combine family tradition with state-of-the-art CNC technology.",
    images: ["/slike/o-nama.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="en" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex-grow animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
              Tradition and Quality
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
              Engineering that <br />
              <span className="font-bold">pushes boundaries.</span>
            </h1>
            <p className="text-lg text-zinc-500 mb-6 leading-relaxed font-light">
              STATOPLAST d.o.o. traces its roots back to years of family experience and a
              dedication to metalworking. What began as a vision is today a modern factory
              equipped with the latest technology.
            </p>
            <p className="text-base text-zinc-500 mb-8 leading-relaxed font-light">
              We combine expert knowledge, innovative approaches and strict quality control to meet
              the most demanding challenges of modern architecture and the B2B metal industry. Our
              focus is on durability, precision and the satisfaction of our partners.
            </p>
          </div>
          <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/o-nama.jpg"
              alt="Statoplast Facility"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">30+</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Years of Experience
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">Precision</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              In every detail
            </div>
          </div>
          <div className="p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Client focus
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-zinc-900 text-zinc-400 text-sm mt-auto border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Statoplast d.o.o.
            </h3>
            <p className="font-light leading-relaxed text-zinc-400">
              A combination of tradition, innovation and top-tier technology in metalworking and
              engineering.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2 font-light text-zinc-400">
              <li>Address: Sveti Urban 256a, Štrigova 40312, Croatia</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:info@statoplast.hr"
                  className="hover:text-white transition-colors"
                >
                  info@statoplast.hr
                </a>
              </li>
              <li>Tel: +385 (0)40 584 230</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/en" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-white font-medium">
                  About us
                </a>
              </li>
              <li>
                <Link href="/en/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/en/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 py-6 text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 Statoplast d.o.o. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/en/privacy-policy" className="hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/en/terms-of-service" className="hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
              <span>
                Design & development:{" "}
                <a href="#" className="hover:text-zinc-400 transition-colors">
                  STATOPLAST D.O.O.
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
