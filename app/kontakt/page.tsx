import type { Metadata } from "next";
import KontaktClient from "./KontaktClient";

export const metadata: Metadata = {
  title: "Statoplast | Kontakt",
  description:
    "Kontaktirajte Statoplast u Štrigovoj. Pošaljite direktan upit za ALU sustave ili usluge metalne industrije i zatražite ponudu našeg tima.",
};

export default function KontaktPage() {
  return <KontaktClient />;
}
