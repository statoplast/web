import type { Metadata } from "next";
import KontaktClient from "@/components/KontaktClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Kontakt",
  description:
    "Kontaktieren Sie Statoplast in Štrigova, Kroatien. Anfrage für Aluminiumsysteme oder Metallindustrie-Leistungen — fordern Sie ein Angebot an.",
  alternates: {
    canonical: "/de/kontakt/",
    languages: alternateLanguages("/kontakt"),
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Statoplast",
    title: "Statoplast | Kontakt",
    description: "Kontaktieren Sie Statoplast in Štrigova, Kroatien. Anfrage für Aluminiumsysteme oder Metallindustrie-Leistungen — fordern Sie ein Angebot an.",
    url: "/de/kontakt/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Kontakt",
    description: "Kontaktieren Sie Statoplast in Štrigova, Kroatien. Anfrage für Aluminiumsysteme oder Metallindustrie-Leistungen — fordern Sie ein Angebot an.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function KontaktPage() {
  return <KontaktClient locale="de" />;
}
