import type { Metadata } from "next";
import ProjektiClient from "./ProjektiClient";

export const metadata: Metadata = {
  title: "Statoplast | Naši Projekti",
  description:
    "Pregledajte galeriju uspješno završenih projekata tvrtke Statoplast. Pogledajte naše reference u obradi metala, izradi kućišta i ALU sustava.",
};

export default function ProjektiPage() {
  return <ProjektiClient />;
}
