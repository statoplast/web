import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Uvjeti Korištenja | Statoplast",
  description:
    "Uvjeti korištenja internetske stranice Statoplast d.o.o. — intelektualno vlasništvo, ograničenje odgovornosti i mjerodavno pravo.",
  alternates: {
    canonical: "/uvjeti-koristenja/",
    languages: alternateLanguages("/uvjeti-koristenja"),
  },
  robots: { index: true, follow: true },
};

export default function UvjetiKoristenjaPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="hr" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Uvjeti <span className="font-bold">korištenja.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Zadnje ažurirano: srpanj 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Opće odredbe</h2>
            <p>
              Ove Uvjete korištenja postavlja i njima upravlja STATOPLAST d.o.o., Sveti Urban 256a,
              40312 Štrigova, OIB: 24717387663, upisan u sudski registar Trgovačkog suda u
              Varaždinu pod MBS: 070015730 ("Statoplast", "mi"). Korištenjem ove internetske
              stranice prihvaćate ove uvjete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Namjena stranice</h2>
            <p>
              Stranica služi u informativne i promotivne svrhe te prikazuje proizvode i usluge
              Statoplasta iz područja moderne arhitekture (ALU stolarija, pivot vrata,
              bioklimatske pergole) i metalne industrije (plastifikacija, CNC obrada, lasersko
              rezanje, serijska proizvodnja, metalni i elektro ormari). Putem stranice možete
              poslati upit ili zatražiti ponudu; sadržaj stranice sam po sebi ne predstavlja
              obvezujuću ponudu niti ugovor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              3. 3D konfigurator pergola
            </h2>
            <p>
              3D konfigurator bioklimatskih pergola služi isključivo kao orijentacijski alat za
              vizualizaciju mogućih dimenzija, načina montaže i uzoraka. Prikazane vrijednosti i
              izgled ne predstavljaju konačnu tehničku dokumentaciju, statički proračun ni
              obvezujuću ponudu. Konačne specifikacije i cijena utvrđuju se isključivo nakon
              izravnog dogovora s našim inženjerskim timom.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Intelektualno vlasništvo</h2>
            <p>
              Svi tekstovi, fotografije, grafički elementi, logotip i 3D konfigurator na ovoj
              stranici vlasništvo su Statoplast d.o.o. ili se koriste uz odgovarajuće dopuštenje, i
              zaštićeni su propisima o autorskom pravu. Zabranjeno je kopiranje, distribucija ili
              komercijalno korištenje sadržaja bez našeg prethodnog pisanog odobrenja.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              5. Sadržaji trećih strana i vanjske poveznice
            </h2>
            <p>
              Stranica Projekti prikazuje sadržaj s našeg službenog Instagram profila, a stranica
              sadrži i poveznice prema vanjskim uslugama (npr. Formspree za slanje upita). Ne
              odgovaramo za dostupnost ili sadržaj vanjskih stranica i usluga na koje upućujemo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Ograničenje odgovornosti</h2>
            <p>
              Nastojimo da su informacije na stranici točne i ažurne, no ne jamčimo potpunu
              točnost, potpunost ili ažurnost svih objavljenih podataka. U mjeri dopuštenoj
              zakonom, isključujemo odgovornost za eventualnu štetu nastalu korištenjem ove
              stranice ili oslanjanjem na informacije objavljene na njoj.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              7. Mjerodavno pravo i nadležnost
            </h2>
            <p>
              Na ove Uvjete korištenja primjenjuje se pravo Republike Hrvatske. Za sve eventualne
              sporove nadležan je stvarno nadležni sud u Varaždinu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Izmjene uvjeta</h2>
            <p>
              Zadržavamo pravo izmjene ovih Uvjeta korištenja. Izmjene stupaju na snagu objavom na
              ovoj stranici.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Kontakt</h2>
            <p>
              Za sva pitanja vezana uz ove uvjete, obratite nam se na{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/politika-privatnosti" className="text-zinc-500 hover:text-black transition-colors">
            Politika privatnosti
          </Link>
          <Link href="/kontakt" className="text-zinc-500 hover:text-black transition-colors">
            Kontakt
          </Link>
        </div>
      </main>
    </div>
  );
}
