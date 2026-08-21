import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | Statoplast",
  description:
    "Nutzungsbedingungen der Website von Statoplast d.o.o. — geistiges Eigentum, Haftungsbeschränkung und anwendbares Recht.",
  alternates: {
    canonical: "/de/nutzungsbedingungen/",
    languages: alternateLanguages("/uvjeti-koristenja"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Nutzungsbedingungen | Statoplast",
    description:
      "Nutzungsbedingungen der Website von Statoplast d.o.o. — geistiges Eigentum, Haftungsbeschränkung und anwendbares Recht.",
    url: "/de/nutzungsbedingungen/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutzungsbedingungen | Statoplast",
    description:
      "Nutzungsbedingungen der Website von Statoplast d.o.o. — geistiges Eigentum, Haftungsbeschränkung und anwendbares Recht.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function NutzungsbedingungenPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Nutzungs<span className="font-bold">bedingungen.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Zuletzt aktualisiert: Juli 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Allgemeine Bestimmungen</h2>
            <p>
              Diese Nutzungsbedingungen werden von der STATOPLAST d.o.o., Sveti Urban 256a, 40312
              Štrigova, Kroatien, Steuernummer (OIB): 24717387663, eingetragen beim Handelsgericht
              Varaždin unter der Registernummer (MBS): 070015730 ("Statoplast", "wir")
              bereitgestellt. Mit der Nutzung dieser Website akzeptieren Sie diese Bedingungen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Zweck der Website</h2>
            <p>
              Diese Website dient Informations- und Werbezwecken und stellt die Produkte und
              Dienstleistungen von Statoplast im Bereich moderne Architektur (Aluminiumtischlerei,
              Pivottüren, bioklimatische Pergolen) sowie Metallindustrie (Pulverbeschichtung,
              CNC-Bearbeitung, Laserschneiden, Serienproduktion, Metall- und Elektroschränke) dar.
              Über die Website können Sie eine Anfrage senden oder ein Angebot anfordern; der
              Inhalt der Website stellt für sich genommen kein bindendes Angebot und keinen Vertrag
              dar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. 3D-Pergola-Konfigurator</h2>
            <p>
              Der 3D-Konfigurator für bioklimatische Pergolen dient ausschließlich als
              orientierendes Werkzeug zur Visualisierung möglicher Abmessungen, Befestigungsarten
              und Muster. Die dargestellten Werte und Ansichten stellen keine endgültige technische
              Dokumentation, statische Berechnung oder ein bindendes Angebot dar. Die endgültigen
              Spezifikationen und der Preis werden erst nach direkter Abstimmung mit unserem
              Engineering-Team festgelegt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Geistiges Eigentum</h2>
            <p>
              Sämtliche Texte, Fotografien, grafischen Elemente, das Logo sowie der
              3D-Konfigurator auf dieser Website sind Eigentum der Statoplast d.o.o. oder werden
              mit entsprechender Genehmigung genutzt und sind urheberrechtlich geschützt. Das
              Kopieren, die Verbreitung oder kommerzielle Nutzung dieser Inhalte ohne unsere
              vorherige schriftliche Zustimmung ist untersagt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              5. Inhalte Dritter und externe Links
            </h2>
            <p>
              Die Seite Projekte zeigt Inhalte von unserem offiziellen Instagram-Profil, und die
              Website enthält zudem Links zu externen Diensten (z. B. Formspree zur Übermittlung
              von Anfragen). Wir übernehmen keine Verantwortung für die Verfügbarkeit oder den
              Inhalt externer Websites und Dienste, auf die wir verlinken.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Haftungsbeschränkung</h2>
            <p>
              Wir bemühen uns, die Informationen auf dieser Website korrekt und aktuell zu halten,
              übernehmen jedoch keine Gewähr für die vollständige Richtigkeit, Vollständigkeit oder
              Aktualität aller veröffentlichten Informationen. Soweit gesetzlich zulässig,
              schließen wir die Haftung für Schäden aus, die aus der Nutzung dieser Website oder
              dem Vertrauen auf die darauf veröffentlichten Informationen entstehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              7. Anwendbares Recht und Gerichtsstand
            </h2>
            <p>
              Diese Nutzungsbedingungen unterliegen dem Recht der Republik Kroatien. Für sämtliche
              Streitigkeiten ist ausschließlich das zuständige Gericht in Varaždin zuständig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Änderungen dieser Bedingungen</h2>
            <p>
              Wir behalten uns vor, diese Nutzungsbedingungen zu ändern. Änderungen treten mit der
              Veröffentlichung auf dieser Seite in Kraft.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Kontakt</h2>
            <p>
              Bei Fragen zu diesen Bedingungen wenden Sie sich bitte an{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/de/datenschutz" className="text-zinc-500 hover:text-black transition-colors">
            Datenschutzerklärung
          </Link>
          <Link href="/de/kontakt" className="text-zinc-500 hover:text-black transition-colors">
            Kontakt
          </Link>
        </div>
      </main>
    </div>
  );
}
