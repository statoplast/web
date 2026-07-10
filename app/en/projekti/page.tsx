import type { Metadata } from "next";
import ProjektiClient from "@/components/ProjektiClient";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Statoplast | Our Projects",
  description:
    "Browse the gallery of Statoplast's successfully completed projects. See our references in metalworking, enclosure manufacturing and aluminium systems.",
  alternates: {
    canonical: "/en/projekti/",
    languages: alternateLanguages("/projekti"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Statoplast",
    title: "Statoplast | Our Projects",
    description: "Browse the gallery of Statoplast's successfully completed projects. See our references in metalworking, enclosure manufacturing and aluminium systems.",
    url: "/en/projekti/",
    images: [{ url: "/slike/moderna_arhitektura_kuca.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statoplast | Our Projects",
    description: "Browse the gallery of Statoplast's successfully completed projects. See our references in metalworking, enclosure manufacturing and aluminium systems.",
    images: ["/slike/moderna_arhitektura_kuca.jpeg"],
  },
};

export default function ProjectsPage() {
  return <ProjektiClient locale="en" />;
}
