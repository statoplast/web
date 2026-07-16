import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Statoplast",
  description:
    "Datenschutzerklärung von Statoplast d.o.o. — welche Daten wir über das Kontaktformular erheben, wie sie verarbeitet werden und Ihre Rechte nach der DSGVO.",
  alternates: {
    canonical: "/de/datenschutz/",
    languages: alternateLanguages("/politika-privatnosti"),
  },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Datenschutz<span className="font-bold">erklärung.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Zuletzt aktualisiert: Juli 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher für die über diese Website erhobenen personenbezogenen Daten ist:
            </p>
            <p className="mt-3 bg-white border border-zinc-200 rounded-xl p-5 text-sm">
              STATOPLAST d.o.o.
              <br />
              Sveti Urban 256a, 40312 Štrigova, Kroatien
              <br />
              Steuernummer (OIB): 24717387663
              <br />
              E-Mail: info@statoplast.hr
              <br />
              Tel: +385 (0)40 584 230
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Welche Daten wir erheben</h2>
            <p>
              Diese Website erhebt beim Besuch keine personenbezogenen Daten automatisch. Wir
              erheben ausschließlich Daten, die Sie uns selbst über das Kontaktformular auf der
              Kontaktseite mitteilen: Name bzw. Firmenname, E-Mail-Adresse, Betreff Ihrer Anfrage
              sowie den Inhalt Ihrer Nachricht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              3. Zweck und Rechtsgrundlage der Verarbeitung
            </h2>
            <p>
              Über das Kontaktformular übermittelte Daten verarbeiten wir ausschließlich zur
              Beantwortung Ihrer Anfrage, zur Erstellung eines Angebots oder zur Vereinbarung einer
              Zusammenarbeit. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf
              Ihre Anfrage hin (Art. 6 Abs. 1 lit. b DSGVO) bzw. unser berechtigtes Interesse an der
              Beantwortung von an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Empfänger der Daten</h2>
            <p>
              Zur technischen Verarbeitung und Zustellung der über das Kontaktformular gesendeten
              Nachrichten nutzen wir den Dienst eines Drittanbieters, Formspree (Formspree, Inc.).
              Formspree fungiert dabei als unser Auftragsverarbeiter und leitet die eingegebenen
              Formulardaten an unser E-Mail-Postfach weiter. Ihre Daten werden nicht verkauft oder
              zu Marketingzwecken an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Speicherdauer</h2>
            <p>
              Über das Kontaktformular übermittelte Daten werden so lange gespeichert, wie es zur
              Bearbeitung Ihrer Anfrage und einer etwaigen Geschäftsbeziehung erforderlich ist,
              längstens jedoch bis zum Ablauf der gesetzlichen Aufbewahrungsfristen; danach werden
              sie gelöscht oder anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Cookies</h2>
            <p>
              Diese Website verwendet keine Cookies zu Analyse-, Werbe- oder
              Tracking-Zwecken. Wir nutzen weder Google Analytics noch vergleichbare Tools. Sollte
              sich dies künftig ändern, wird diese Datenschutzerklärung entsprechend aktualisiert
              und, soweit erforderlich, Ihre Einwilligung eingeholt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Ihre Rechte</h2>
            <p>Nach der DSGVO haben Sie hinsichtlich Ihrer personenbezogenen Daten das Recht auf:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Auskunft über die von uns verarbeiteten Daten,</li>
              <li>Berichtigung unrichtiger oder unvollständiger Daten,</li>
              <li>Löschung Ihrer Daten ("Recht auf Vergessenwerden"),</li>
              <li>Einschränkung der Verarbeitung,</li>
              <li>Widerspruch gegen die Verarbeitung,</li>
              <li>Datenübertragbarkeit.</li>
            </ul>
            <p className="mt-3">
              Einen Antrag zur Ausübung dieser Rechte können Sie an info@statoplast.hr richten.
              Sollten Sie der Ansicht sein, dass die Verarbeitung Ihrer Daten gegen geltendes Recht
              verstößt, haben Sie das Recht, sich bei der kroatischen Datenschutzbehörde (Agencija
              za zaštitu osobnih podataka, AZOP) zu beschweren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Datensicherheit</h2>
            <p>
              Wir treffen angemessene technische und organisatorische Maßnahmen, um die von Ihnen
              bereitgestellten Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              9. Änderungen dieser Datenschutzerklärung
            </h2>
            <p>
              Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Die jeweils
              aktuelle Fassung ist stets auf dieser Seite abrufbar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">10. Kontakt</h2>
            <p>
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte an{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/de/nutzungsbedingungen" className="text-zinc-500 hover:text-black transition-colors">
            Nutzungsbedingungen
          </Link>
          <Link href="/de/kontakt" className="text-zinc-500 hover:text-black transition-colors">
            Kontakt
          </Link>
        </div>
      </main>
    </div>
  );
}
