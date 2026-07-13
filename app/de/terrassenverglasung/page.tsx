import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SecondaryNav from "@/components/SecondaryNav";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Terrassenverglasung & Vordachverschluss | Statoplast",
  description:
    "Verwandeln Sie ein offenes Vordach oder eine Terrasse in einen ganzjährig nutzbaren Raum. Hochwertige Glasschiebewände und eine stabile Aluminiumkonstruktion.",
  alternates: {
    canonical: "/de/terrassenverglasung/",
    languages: alternateLanguages("/zatvaranje-nadstresnica"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Terrassenverglasung & Vordachverschluss | Statoplast",
    description: "Verwandeln Sie ein offenes Vordach oder eine Terrasse in einen ganzjährig nutzbaren Raum. Hochwertige Glasschiebewände und eine stabile Aluminiumkonstruktion.",
    url: "/de/terrassenverglasung/",
    images: [{ url: "/slike/zatvaranje_nadstresnica.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terrassenverglasung & Vordachverschluss | Statoplast",
    description: "Verwandeln Sie ein offenes Vordach oder eine Terrasse in einen ganzjährig nutzbaren Raum. Hochwertige Glasschiebewände und eine stabile Aluminiumkonstruktion.",
    images: ["/slike/zatvaranje_nadstresnica.jpeg"],
  },
};

export default function TerrassenverglasungPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />

        <SecondaryNav variant="light" locale="de" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 space-y-24">
        <div className="animate-fade-up space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                Nutzen Sie den Raum zu jeder Jahreszeit
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
                Terrassen-
                <br />
                <span className="font-bold">verglasung.</span>
              </h1>
              <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
                Verwandeln Sie Ihr offenes Vordach, Ihre Terrasse oder Ihren Gastronomiebereich in
                eine funktionale, geschlossene Zone. Durch den Einsatz hochwertiger
                Glasschiebewände und fester Aluminiumelemente sorgen wir für Schutz vor Wind und
                Feuchtigkeit, während Transparenz und der Blick auf die Umgebung erhalten bleiben.
              </p>
            </div>
            <div className="lg:col-span-7 w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica.jpeg"
                alt="Terrassenverglasung - Verglaster Raum"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-zinc-200">
            <div className="lg:col-span-7 order-2 lg:order-1 h-[450px] rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slike/zatvaranje_nadstresnica2.jpeg"
                alt="Terrassenverglasung mit Glasschiebewänden"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">
                Zuverlässige und reibungslose Schiebesysteme
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Die Verglasung führen wir mittels stabiler Schiebewände auf mehrspurigen
                Führungsschienen aus, die eine einfache und leichte Bewegung der Glaspaneele
                ermöglichen. Das System bietet hohe Praktikabilität: An wärmeren Tagen können Sie
                die Paneele einfach zur Seite schieben und den Raum öffnen, während es im Winter
                eine sichere Barriere gegen widrige Witterung bietet.
              </p>

              <div className="border-l-2 border-black pl-4 my-6">
                <p className="text-sm italic text-zinc-700">
                  Eine ideale Möglichkeit, die Nutzfläche eines Hauses oder Gewerbeobjekts mit
                  langlebigen, alterungsbeständigen Materialien zu erweitern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
