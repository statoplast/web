import type { Metadata } from "next";
import KontaktClient from "@/components/KontaktClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Kontakt",
  description:
    "Kontaktieren Sie Statoplast in Štrigova, Kroatien. Senden Sie eine direkte Anfrage für Aluminiumsysteme oder Leistungen der Metallindustrie und fordern Sie ein Angebot an.",
  alternates: {
    canonical: "/de/kontakt/",
    languages: alternateLanguages("/kontakt"),
  },
};

export default function KontaktPage() {
  return <KontaktClient locale="de" />;
}
