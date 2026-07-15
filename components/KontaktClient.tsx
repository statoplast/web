"use client";

import { useEffect, useState, FormEvent } from "react";
import SiteHeader from "@/components/SiteHeader";
import { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

const T: Record<
  Locale,
  {
    heading1: string;
    heading2: string;
    intro: string;
    location: string;
    address: string;
    contactInfo: string;
    hours: string;
    hoursText: string[];
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    subjectAlu: string;
    subjectB2b: string;
    subjectGeneral: string;
    messageLabel: string;
    sending: string;
    submit: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    retry: string;
  }
> = {
  hr: {
    heading1: "Tu smo za",
    heading2: "vaše projekte.",
    intro: "Zatražite ponudu, tehničku dokumentaciju ili dogovorite sastanak s našim inženjerskim timom.",
    location: "Lokacija",
    address: "Sveti Urban 256a,\n40312 Štrigova, Hrvatska",
    contactInfo: "Kontakt podaci",
    hours: "Radno Vrijeme",
    hoursText: ["Pon - Pet: 06:00 - 14:00", "Subota, Nedjelja: Zatvoreno"],
    nameLabel: "Ime i Prezime / Tvrtka",
    emailLabel: "Email Adresa",
    subjectLabel: "Predmet upita",
    subjectAlu: "Moderna Arhitektura (Vrata, Pergole, Stolarija...)",
    subjectB2b: "Metalna industrija (Plastifikacija, CNC, Proizvodnja...)",
    subjectGeneral: "Opći upit",
    messageLabel: "Vaša poruka",
    sending: "SLANJE U TIJEKU...",
    submit: "POŠALJITE UPIT",
    successTitle: "Hvala vam na upitu!",
    successText:
      "Vaša poruka je uspješno poslana. Naš tim će vas kontaktirati u najkraćem mogućem roku na navedenu email adresu.",
    errorTitle: "Uuups! Došlo je do greške.",
    errorText: "Molimo pokušajte ponovno ili nam pošaljite direktan e-mail na info@statoplast.hr",
    retry: "Pokušaj ponovno",
  },
  en: {
    heading1: "We're here for",
    heading2: "your projects.",
    intro: "Request a quote, technical documentation, or arrange a meeting with our engineering team.",
    location: "Location",
    address: "Sveti Urban 256a,\n40312 Štrigova, Croatia",
    contactInfo: "Contact details",
    hours: "Working Hours",
    hoursText: ["Mon - Fri: 06:00 - 14:00", "Saturday, Sunday: Closed"],
    nameLabel: "Full Name / Company",
    emailLabel: "Email Address",
    subjectLabel: "Subject",
    subjectAlu: "Modern Architecture (Doors, Pergolas, Joinery...)",
    subjectB2b: "Metal industry (Powder coating, CNC, Production...)",
    subjectGeneral: "General inquiry",
    messageLabel: "Your message",
    sending: "SENDING...",
    submit: "SEND INQUIRY",
    successTitle: "Thank you for your inquiry!",
    successText:
      "Your message has been sent successfully. Our team will contact you as soon as possible at the email address provided.",
    errorTitle: "Oops! Something went wrong.",
    errorText: "Please try again or send us a direct email at info@statoplast.hr",
    retry: "Try again",
  },
  de: {
    heading1: "Wir sind da für",
    heading2: "Ihre Projekte.",
    intro: "Fordern Sie ein Angebot, technische Unterlagen an oder vereinbaren Sie einen Termin mit unserem Engineering-Team.",
    location: "Standort",
    address: "Sveti Urban 256a,\n40312 Štrigova, Kroatien",
    contactInfo: "Kontaktdaten",
    hours: "Öffnungszeiten",
    hoursText: ["Mo - Fr: 06:00 - 14:00", "Samstag, Sonntag: Geschlossen"],
    nameLabel: "Name / Firma",
    emailLabel: "E-Mail-Adresse",
    subjectLabel: "Betreff",
    subjectAlu: "Moderne Architektur (Türen, Pergolen, Schreinerei...)",
    subjectB2b: "Metallindustrie (Beschichtung, CNC, Produktion...)",
    subjectGeneral: "Allgemeine Anfrage",
    messageLabel: "Ihre Nachricht",
    sending: "WIRD GESENDET...",
    submit: "ANFRAGE SENDEN",
    successTitle: "Vielen Dank für Ihre Anfrage!",
    successText:
      "Ihre Nachricht wurde erfolgreich gesendet. Unser Team wird Sie so schnell wie möglich unter der angegebenen E-Mail-Adresse kontaktieren.",
    errorTitle: "Hoppla! Es ist ein Fehler aufgetreten.",
    errorText: "Bitte versuchen Sie es erneut oder senden Sie uns eine direkte E-Mail an info@statoplast.hr",
    retry: "Erneut versuchen",
  },
};

export default function KontaktClient({ locale = "hr" }: { locale?: Locale }) {
  const t = T[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [prefilledMessage, setPrefilledMessage] = useState("");

  useEffect(() => {
    const poruka = new URLSearchParams(window.location.search).get("poruka");
    if (poruka) setPrefilledMessage(poruka.slice(0, 2000));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale={locale} />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              {t.heading1}
              <br />
              <span className="font-bold">{t.heading2}</span>
            </h1>
            <p className="text-lg text-zinc-500 mb-12 font-light">{t.intro}</p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-2">
                  {t.location}
                </h4>
                <p className="text-xl font-medium text-black whitespace-pre-line">{t.address}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-2">
                  {t.contactInfo}
                </h4>
                <a
                  href="mailto:info@statoplast.hr"
                  className="text-xl font-medium text-black hover:text-blue-600 block transition-colors"
                >
                  info@statoplast.hr
                </a>
                <a
                  href="tel:+38540584230"
                  className="text-xl font-medium text-black hover:text-blue-600 block transition-colors"
                >
                  +385 (0)40 584 230
                </a>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-2">
                  {t.hours}
                </h4>
                <p className="text-base text-zinc-600">
                  {t.hoursText[0]}
                  <br />
                  {t.hoursText[1]}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-zinc-100 flex flex-col justify-center min-h-[500px]">
            {status !== "success" && status !== "error" && (
              <form
                action="https://formspree.io/f/xqeraako"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="Ime/Tvrtka"
                      required
                      maxLength={150}
                      className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="_replyto"
                      required
                      maxLength={254}
                      className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col pt-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {t.subjectLabel}
                  </label>
                  <select
                    name="Predmet"
                    className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-zinc-700"
                  >
                    <option value="ALU Sustavi">{t.subjectAlu}</option>
                    <option value="B2B Industrija">{t.subjectB2b}</option>
                    <option value="Opci upit">{t.subjectGeneral}</option>
                  </select>
                </div>

                <div className="flex flex-col pt-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    key={prefilledMessage}
                    name="Poruka"
                    rows={4}
                    required
                    maxLength={5000}
                    defaultValue={prefilledMessage}
                    className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                  ></textarea>
                </div>

                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-black hover:bg-zinc-800 text-white py-4 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{status === "sending" ? t.sending : t.submit}</span>
                  </button>
                </div>
              </form>
            )}

            {status === "success" && (
              <div className="text-center animate-fade-in p-6">
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
                <h3 className="text-2xl font-bold text-black mb-3">{t.successTitle}</h3>
                <p className="text-zinc-500 font-light max-w-sm mx-auto leading-relaxed">
                  {t.successText}
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="text-center animate-fade-in p-6">
                <h3 className="text-xl font-bold text-red-600 mb-2">{t.errorTitle}</h3>
                <p className="text-zinc-500 text-sm mb-4">{t.errorText}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-bold tracking-wider uppercase text-black underline"
                >
                  {t.retry}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
