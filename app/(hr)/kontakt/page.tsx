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
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Statoplast",
    title: "Statoplast | Kontakt",
    description: "Kontaktirajte Statoplast u Štrigovoj. Pošaljite direktan upit za ALU sustave ili usluge metalne industrije i zatražite ponudu našeg tima.",
    url: "/kontakt/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Kontakt",
    description: "Kontaktirajte Statoplast u Štrigovoj. Pošaljite direktan upit za ALU sustave ili usluge metalne industrije i zatražite ponudu našeg tima.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function KontaktPage() {
  return <KontaktClient locale="hr" />;
}
