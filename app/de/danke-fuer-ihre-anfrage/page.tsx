import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Danke für Ihre Anfrage | Statoplast",
  description: "Ihre Nachricht wurde erfolgreich an Statoplast gesendet.",
  robots: { index: false, follow: true },
};

export default function DankePage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="de" />
      </div>

      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-zinc-100 max-w-md w-full text-center animate-fade-in">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-black mb-3">Vielen Dank für Ihre Anfrage!</h1>
          <p className="text-zinc-500 font-light max-w-sm mx-auto leading-relaxed mb-8">
            Ihre Nachricht wurde erfolgreich gesendet. Unser Team wird Sie so schnell wie möglich
            unter der angegebenen E-Mail-Adresse kontaktieren.
          </p>
          <Link
            href="/de"
            className="inline-block bg-black hover:bg-zinc-800 text-white px-8 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
