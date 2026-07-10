import type { Metadata } from "next";
import KontaktClient from "@/components/KontaktClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Contact",
  description:
    "Contact Statoplast in Štrigova, Croatia. Send a direct inquiry for aluminium systems or metal industry services and request a quote from our team.",
  alternates: {
    canonical: "/en/kontakt/",
    languages: alternateLanguages("/kontakt"),
  },
};

export default function ContactPage() {
  return <KontaktClient locale="en" />;
}
