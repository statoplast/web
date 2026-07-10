import type { Metadata } from "next";
import ProjektiClient from "@/components/ProjektiClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Naši Projekti",
  description:
    "Pregledajte galeriju uspješno završenih projekata tvrtke Statoplast. Pogledajte naše reference u obradi metala, izradi kućišta i ALU sustava.",
  alternates: {
    canonical: "/projekti/",
    languages: alternateLanguages("/projekti"),
  },
};

export default function ProjektiPage() {
  return <ProjektiClient locale="hr" />;
}
