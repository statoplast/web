"use client";

import { useEffect, useState, FormEvent } from "react";
import SiteHeader from "@/components/SiteHeader";

type Status = "idle" | "sending" | "success" | "error";

export default function KontaktClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [prefilledMessage, setPrefilledMessage] = useState("");

  useEffect(() => {
    const poruka = new URLSearchParams(window.location.search).get("poruka");
    if (poruka) setPrefilledMessage(poruka);
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
        <SiteHeader variant="light" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              Tu smo za
              <br />
              <span className="font-bold">vaše projekte.</span>
            </h1>
            <p className="text-lg text-zinc-500 mb-12 font-light">
              Zatražite ponudu, tehničku dokumentaciju ili dogovorite sastanak s našim inženjerskim
              timom.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-2">
                  Lokacija
                </h4>
                <p className="text-xl font-medium text-black">
                  Sveti Urban 256a,
                  <br />
                  40312 Štrigova, Hrvatska
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-2">
                  Kontakt podaci
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
                  Radno Vrijeme
                </h4>
                <p className="text-base text-zinc-600">
                  Pon - Pet: 06:00 - 14:00
                  <br />
                  Subota, Nedjelja: Zatvoreno
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-zinc-100 flex flex-col justify-center min-h-[500px]">
            {status !== "success" && status !== "error" && (
              <form
                action="https://formspree.io/f/mkoabvbp"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Ime i Prezime / Tvrtka
                    </label>
                    <input
                      type="text"
                      name="Ime/Tvrtka"
                      required
                      className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      Email Adresa
                    </label>
                    <input
                      type="email"
                      name="_replyto"
                      required
                      className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col pt-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Predmet upita
                  </label>
                  <select
                    name="Predmet"
                    className="border-b-2 border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-zinc-700"
                  >
                    <option value="ALU Sustavi">
                      Moderna Arhitektura (Vrata, Pergole, Stolarija...)
                    </option>
                    <option value="B2B Industrija">
                      Metalna industrija (Plastifikacija, CNC, Proizvodnja...)
                    </option>
                    <option value="Opci upit">Opći upit</option>
                  </select>
                </div>

                <div className="flex flex-col pt-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Vaša poruka
                  </label>
                  <textarea
                    key={prefilledMessage}
                    name="Poruka"
                    rows={4}
                    required
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
                    <span>{status === "sending" ? "SLANJE U TIJEKU..." : "POŠALJITE UPIT"}</span>
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
                <h3 className="text-2xl font-bold text-black mb-3">Hvala vam na upitu!</h3>
                <p className="text-zinc-500 font-light max-w-sm mx-auto leading-relaxed">
                  Vaša poruka je uspješno poslana. Naš tim će vas kontaktirati u najkraćem mogućem
                  roku na navedenu email adresu.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="text-center animate-fade-in p-6">
                <h3 className="text-xl font-bold text-red-600 mb-2">Uuups! Došlo je do greške.</h3>
                <p className="text-zinc-500 text-sm mb-4">
                  Molimo pokušajte ponovno ili nam pošaljite direktan e-mail na info@statoplast.hr
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-bold tracking-wider uppercase text-black underline"
                >
                  Pokušaj ponovno
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
