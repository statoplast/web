"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SecondaryNavVariant = "light" | "industrial";

const LIGHT_LINKS = [
  { href: "/pivot-vrata", label: "Pivot Vrata" },
  { href: "/bioklimatske-pergole", label: "Bioklimatske pergole" },
  { href: "/alu-stolarija", label: "Alu Stolarija" },
  { href: "/moderne-ograde", label: "Moderne Ograde" },
  { href: "/zatvaranje-nadstresnica", label: "Zatvaranje Nadstrešnica" },
];

const INDUSTRIAL_LINKS = [
  { href: "/plastifikacija-metala", label: "Plastifikacija Metala" },
  { href: "/lasersko-rezanje", label: "Lasersko Rezanje" },
  { href: "/cnc-obrada", label: "CNC Obrada" },
  { href: "/ormari", label: "Metalni i Elektro Ormari" },
  { href: "/serijska-proizvodnja", label: "Serijska Proizvodnja" },
];

export default function SecondaryNav({ variant }: { variant: SecondaryNavVariant }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `${href}/`;

  if (variant === "light") {
    return (
      <section className="w-full bg-zinc-50/95 backdrop-blur-md border-b border-zinc-200 shadow-sm relative z-30">
        <div
          id="secondary-nav"
          className="max-w-6xl mx-auto px-6 overflow-x-auto whitespace-nowrap scrollbar-none py-4"
        >
          <div className="flex space-x-8 text-sm font-semibold tracking-wide justify-start md:justify-center">
            {LIGHT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 pb-1 transition-all duration-300 inline-block ${
                  isActive(link.href)
                    ? "text-black border-black"
                    : "text-zinc-400 border-transparent hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-40 bg-slate-900/95 backdrop-blur-md pt-6 pb-0 border-b border-slate-800 shadow-xl">
      <div
        id="secondary-nav"
        className="max-w-6xl mx-auto px-6 overflow-x-auto whitespace-nowrap scrollbar-none"
      >
        <div className="flex space-x-10 md:space-x-12">
          {INDUSTRIAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-4 text-sm tracking-wide transition-all inline-block ${
                isActive(link.href)
                  ? "font-bold text-white"
                  : "font-medium text-slate-500 hover:text-white"
              }`}
            >
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-sm transition-opacity ${
                  isActive(link.href)
                    ? "opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    : "opacity-0"
                }`}
              ></span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
