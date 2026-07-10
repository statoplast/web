import type { Metadata } from "next";
import KontaktClient from "@/components/KontaktClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Kontakt",
  description:
    "Kontaktirajte Statoplast u Štrigovoj. Pošaljite direktan upit za ALU sustave ili usluge metalne industrije i zatražite ponudu našeg tima.",
  alternates: {
    canonical: "/kontakt/",
    languages: alternateLanguages("/kontakt"),
  },
};

export default function KontaktPage() {
  return <KontaktClient locale="hr" />;
}
