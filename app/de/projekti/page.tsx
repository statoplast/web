import type { Metadata } from "next";
import ProjektiClient from "@/components/ProjektiClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Unsere Projekte",
  description:
    "Durchstöbern Sie die Galerie erfolgreich abgeschlossener Projekte von Statoplast. Sehen Sie unsere Referenzen in der Metallverarbeitung, Gehäusefertigung und bei Aluminiumsystemen.",
  alternates: {
    canonical: "/de/projekti/",
    languages: alternateLanguages("/projekti"),
  },
};

export default function ProjektePage() {
  return <ProjektiClient locale="de" />;
}
