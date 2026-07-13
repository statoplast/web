import type { Metadata } from "next";
import ProjektiClient from "@/components/ProjektiClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Unsere Projekte",
  description:
    "Galerie erfolgreich abgeschlossener Statoplast-Projekte: Referenzen in Metallverarbeitung, Gehäusefertigung und Aluminiumsystemen.",
  alternates: {
    canonical: "/de/projekte/",
    languages: alternateLanguages("/projekti"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Statoplast | Unsere Projekte",
    description: "Galerie erfolgreich abgeschlossener Statoplast-Projekte: Referenzen in Metallverarbeitung, Gehäusefertigung und Aluminiumsystemen.",
    url: "/de/projekte/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Unsere Projekte",
    description: "Galerie erfolgreich abgeschlossener Statoplast-Projekte: Referenzen in Metallverarbeitung, Gehäusefertigung und Aluminiumsystemen.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function ProjektePage() {
  return <ProjektiClient locale="de" />;
}
