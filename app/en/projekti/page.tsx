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
};

export default function ProjectsPage() {
  return <ProjektiClient locale="en" />;
}
