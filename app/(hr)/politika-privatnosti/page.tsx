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
        <p className="text-sm text-zinc-500 mb-12">Zadnje ažurirano: srpanj 2026.</p>

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
              Ova stranica ne prikuplja osobne podatke automatski prilikom preglavanja. Podatke o
              vama prikupljamo isključivo kada nam ih sami dostavite putem kontakt obrasca na
              stranici Kontakt, i to: ime i prezime ili naziv tvrtke, adresu e-pošte, predmet
              upita i sadržaj poruke koju nam pošaljete.
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
              Za tehničku obradu i dostavu poruka poslanih putem kontakt obrasca koristimo uslugu
              trećeg pružatelja, Formspree (Formspree, Inc.). Formspree djeluje kao naš izvršitelj
              obrade te podatke unesene u obrazac prosljeđuje na naš e-mail. Vaše podatke ne
              prodajemo niti ustupamo trećim stranama u marketinške svrhe.
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
              Ova stranica ne koristi kolačiće za analitiku, oglašavanje ili praćenje ponašanja
              korisnika. Ne koristimo Google Analytics niti slične alate. Ukoliko se to u
              budućnosti promijeni, ova politika privatnosti bit će ažurirana na odgovarajući
              način, a po potrebi ćete biti zamoljeni za privolu.
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
