import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Metalni i Elektro Ormari po Mjeri | Statoplast",
  description:
    "Proizvodnja elektro ormara, IT rack sustava i metalnih kućišta po mjeri. Statoplast nudi kompletnu izradu uz visoku IP zaštitu i plastifikaciju. Saznajte više!",
  alternates: {
    canonical: "/ormari/",
    languages: alternateLanguages("/ormari"),
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Statoplast",
    title: "Metalni i Elektro Ormari po Mjeri | Statoplast",
    description: "Proizvodnja elektro ormara, IT rack sustava i metalnih kućišta po mjeri. Statoplast nudi kompletnu izradu uz visoku IP zaštitu i plastifikaciju. Saznajte više!",
    url: "/ormari/",
    images: [{ url: "/slike/ormari-glavna.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metalni i Elektro Ormari po Mjeri | Statoplast",
    description: "Proizvodnja elektro ormara, IT rack sustava i metalnih kućišta po mjeri. Statoplast nudi kompletnu izradu uz visoku IP zaštitu i plastifikaciju. Saznajte više!",
    images: ["/slike/ormari-glavna.jpg"],
  },
};

export default function OrmariPage() {
  return (
    <div className="bg-[#1a2a40] text-slate-300 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="industrial" locale="hr" />

        <SecondaryNav variant="industrial" locale="hr" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-slide-in">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-800 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/ormari-glavna.jpg"
                alt="Industrijski metalni i elektro ormari"
                className="w-full h-[400px] lg:h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Razvoj i proizvodnja kućišta
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                Metalni i Elektro
                <br />
                Ormari.
              </h1>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Proizvodimo širok spektar metalne galanterije i specijaliziranih kućišta. Od
                klasičnih razvodnih elektro ormara, preko IT rack sistema, pa sve do čvrstih
                garderobnih ormarića za industriju i škole.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Nudimo kompletnu izradu: od laserskog izrezivanja i savijanja, preko varenja i
                ugradnje poliuretanskih brtvi za postizanje visoke IP zaštite, sve do finalne
                plastifikacije i montaže bravica i šarki.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                <ul className="space-y-2 font-medium text-slate-200 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Samostojeći i nadžbukni razvodni
                    elektro ormari
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Garderobni i arhivski metalni ormari
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> Prilagodba dimenzija i izreza prema
                    specifikaciji kupca
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/ormari-it.jpg"
              alt="Server i IT ormari"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slike/ormari-detalj.jpg"
              alt="Sklopljeni elektro ormar detalj"
              className="w-full h-64 object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>

          <div className="mt-16">
            <h4 className="text-xl font-bold text-white mb-2">Isti ormar, dvije lokacije</h4>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              Naše metalno kućište otporno je na sve vremenske uvjete — od terase uz more do
              vrha planine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/aparat1.jpeg"
                alt="Metalno kućište fotokiosk uređaja na terasi"
                className="w-full h-[420px] object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/aparat2.jpeg"
                alt="Metalno kućište fotokiosk uređaja na vidikovcu"
                className="w-full h-[420px] object-cover rounded-xl border border-slate-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 p-10 lg:p-16 bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-slate-700 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Trebate pouzdanog proizvodnog partnera?
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Pošaljite nam tehničke nacrte, 3D modele ili specifikacije, a naš inženjerski tim će vam
            se povratno javiti s prijedlogom optimizacije i konkretnom ponudom.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-10 py-4 rounded-sm text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap transition-colors relative z-10 shadow-lg shadow-blue-900/50"
          >
            ZATRAŽITE PONUDU
          </Link>
        </div>
      </main>
    </div>
  );
}
