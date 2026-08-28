import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Politika Privatnosti | Statoplast",
  description:
    "Politika privatnosti Statoplast d.o.o. — koji se podaci prikupljaju putem kontakt obrasca, kako se obrađuju te koja su vaša prava prema GDPR-u.",
  alternates: {
    canonical: "/politika-privatnosti/",
    languages: alternateLanguages("/politika-privatnosti"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Statoplast",
    title: "Politika Privatnosti | Statoplast",
    description:
      "Politika privatnosti Statoplast d.o.o. — koji se podaci prikupljaju putem kontakt obrasca, kako se obrađuju te koja su vaša prava prema GDPR-u.",
    url: "/politika-privatnosti/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politika Privatnosti | Statoplast",
    description:
      "Politika privatnosti Statoplast d.o.o. — koji se podaci prikupljaju putem kontakt obrasca, kako se obrađuju te koja su vaša prava prema GDPR-u.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function PolitikaPrivatnostiPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="hr" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Politika <span className="font-bold">privatnosti.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Zadnje ažurirano: kolovoz 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Voditelj obrade podataka</h2>
            <p>
              Voditelj obrade osobnih podataka prikupljenih putem ove internetske stranice je:
            </p>
            <p className="mt-3 bg-white border border-zinc-200 rounded-xl p-5 text-sm">
              STATOPLAST d.o.o.
              <br />
              Sveti Urban 256a, 40312 Štrigova, Hrvatska
              <br />
              OIB: 24717387663
              <br />
              E-mail: info@statoplast.hr
              <br />
              Tel: +385 (0)40 584 230
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Koje podatke prikupljamo</h2>
            <p>
              Prikupljamo dvije vrste podataka: (a) podatke koje nam sami dostavite putem kontakt
              obrasca na stranici Kontakt — ime i prezime ili naziv tvrtke, adresu e-pošte, predmet
              upita i sadržaj poruke; i (b) podatke koji se prikupljaju automatski prilikom
              pregledavanja stranice putem alata za analitiku i oglašavanje opisanih u odjeljku 6.,
              poput IP adrese.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              3. Svrha i pravna osnova obrade
            </h2>
            <p>
              Podatke iz kontakt obrasca obrađujemo isključivo u svrhu odgovaranja na vaš upit,
              pripreme ponude ili dogovaranja suradnje. Pravna osnova obrade je poduzimanje radnji
              na vaš zahtjev prije eventualnog sklapanja ugovora (čl. 6. st. 1. t. b) Opće uredbe o
              zaštiti podataka - GDPR), odnosno naš legitimni interes za odgovaranje na upite koji
              nam se upute (čl. 6. st. 1. t. f) GDPR-a).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Primatelji podataka</h2>
            <p>
              Za slanje poruka poslanih putem kontakt obrasca na naš e-mail koristimo uslugu
              trećeg pružatelja, Resend (Resend, Inc.), koji djeluje kao naš izvršitelj obrade. Za
              zaštitu obrasca od automatiziranih (bot) upita koristimo Cloudflare Turnstile, koji u
              tu svrhu obrađuje tehničke podatke poput IP adrese i signala preglednika. Podatke
              prikupljene putem alata za analitiku i oglašavanje opisanih u odjeljku 6. obrađuje
              Google (vidi taj odjeljak). Vaše podatke ne prodajemo niti ustupamo drugim trećim
              stranama u marketinške svrhe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Razdoblje čuvanja podataka</h2>
            <p>
              Podatke dostavljene putem kontakt obrasca čuvamo onoliko dugo koliko je potrebno za
              obradu vašeg upita i eventualnu poslovnu suradnju, a najdulje do isteka zakonskih
              rokova čuvanja poslovne dokumentacije, nakon čega ih brišemo ili anonimiziramo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Kolačići (cookies)</h2>
            <p>
              Ova stranica koristi Google Tag Manager za postavljanje alata Google Analytics 4
              (statistika posjećenosti) te Google oglašivačkih kolačića za remarketing, uključujući
              Google Signals (prikaz naših oglasa korisnicima koji su ranije posjetili stranicu, na
              drugim Google stranicama i partnerskim mrežama). Ovi alati prikupljaju podatke poput
              IP adrese, podataka o uređaju i pregledniku, stranicama koje posjetite te približne
              lokacije, a obrađuje ih Google u skladu sa svojom vlastitom politikom privatnosti.
            </p>
            <p className="mt-3">
              Trenutno na stranici nije aktivan alat za upravljanje privolom za kolačiće (CMP), na
              čemu radimo. Do njegove implementacije, ove kolačiće možete onemogućiti putem
              postavki svog preglednika, putem{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google postavki oglasa
              </a>{" "}
              ili instalacijom{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Analytics dodatka za isključivanje
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Vaša prava</h2>
            <p>Sukladno GDPR-u, u odnosu na svoje osobne podatke imate pravo na:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>pristup podacima koje o vama obrađujemo,</li>
              <li>ispravak netočnih ili nepotpunih podataka,</li>
              <li>brisanje podataka ("pravo na zaborav"),</li>
              <li>ograničenje obrade,</li>
              <li>prigovor na obradu,</li>
              <li>prenosivost podataka.</li>
            </ul>
            <p className="mt-3">
              Zahtjev za ostvarivanje ovih prava možete poslati na info@statoplast.hr. Ukoliko
              smatrate da je obrada vaših podataka u suprotnosti s propisima, imate pravo podnijeti
              pritužbu Agenciji za zaštitu osobnih podataka (AZOP).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Sigurnost podataka</h2>
            <p>
              Poduzimamo razumne tehničke i organizacijske mjere kako bismo zaštitili podatke koje
              nam dostavite od neovlaštenog pristupa, gubitka ili zlouporabe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Izmjene politike privatnosti</h2>
            <p>
              Ovu politiku privatnosti možemo povremeno ažurirati. Aktualna verzija uvijek je
              dostupna na ovoj stranici.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">10. Kontakt</h2>
            <p>
              Za sva pitanja vezana uz obradu osobnih podataka, obratite nam se na{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/uvjeti-koristenja" className="text-zinc-500 hover:text-black transition-colors">
            Uvjeti korištenja
          </Link>
          <Link href="/kontakt" className="text-zinc-500 hover:text-black transition-colors">
            Kontakt
          </Link>
        </div>
      </main>
    </div>
  );
}
