"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SiteHeaderVariant = "transparent" | "light" | "industrial";

const NAV_LINKS = [
  { href: "/o-nama", label: "O NAMA" },
  { href: "/projekti", label: "PROJEKTI" },
  { href: "/kontakt", label: "KONTAKT" },
];

const VARIANT_STYLES: Record<
  SiteHeaderVariant,
  {
    header: string;
    logo: string;
    nav: string;
    navLink: string;
    navLinkActive: string;
    navLinkInactive: string;
    langWrap: string;
    langActive: string;
    langInactive: string;
    langDivider: string;
    hamburgerWrap: string;
    hamburgerLine: string;
    mobileMenu: string;
    mobileLink: string;
    mobileDivider: string;
  }
> = {
  transparent: {
    header:
      "fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-3 md:py-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none",
    logo: "h-8 md:h-10 w-auto object-contain brightness-0 invert",
    nav: "hidden md:flex items-center space-x-2 text-xs font-bold tracking-[0.2em] pointer-events-auto absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300 py-3 px-4 inline-block",
    navLinkActive: "text-white",
    navLinkInactive: "text-zinc-300 hover:text-white",
    langWrap:
      "hidden md:flex items-center text-xs font-bold tracking-[0.2em] pointer-events-auto z-10",
    langActive: "text-white py-3 px-3 block",
    langInactive: "text-zinc-500 hover:text-zinc-300 transition-colors py-3 px-3 block",
    langDivider: "h-4 w-[1px] bg-white/30 mx-1",
    hamburgerWrap:
      "md:hidden pointer-events-auto text-white z-50 focus:outline-none w-10 h-10 relative flex items-center justify-center",
    hamburgerLine: "bg-white",
    mobileMenu: "bg-black/95",
    mobileLink: "text-zinc-400 hover:text-white",
    mobileDivider: "bg-white/10",
  },
  light: {
    header:
      "w-full px-6 py-3 md:py-4 flex justify-between items-center bg-white/90 backdrop-blur-md text-zinc-900 border-b border-zinc-200 relative z-50",
    logo: "h-6 md:h-8 w-auto object-contain brightness-0",
    nav: "hidden md:flex items-center space-x-2 text-xs font-bold tracking-[0.2em] absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300 py-3 px-3 inline-block",
    navLinkActive: "text-black",
    navLinkInactive: "text-zinc-500 hover:text-black",
    langWrap: "hidden md:flex items-center text-xs font-bold tracking-[0.2em] z-10",
    langActive: "text-black py-3 px-3 block",
    langInactive: "text-zinc-400 hover:text-black transition-colors py-3 px-3 block",
    langDivider: "h-4 w-[1px] bg-zinc-300 mx-1",
    hamburgerWrap:
      "md:hidden pointer-events-auto focus:outline-none w-10 h-10 relative flex items-center justify-center",
    hamburgerLine: "bg-zinc-900",
    mobileMenu: "bg-white/98",
    mobileLink: "text-zinc-500 hover:text-black",
    mobileDivider: "bg-zinc-200",
  },
  industrial: {
    header:
      "w-full p-6 flex justify-between items-center bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800",
    logo: "h-6 md:h-8 w-auto object-contain brightness-0 invert",
    nav: "hidden md:flex items-center space-x-8 text-xs font-bold tracking-[0.2em] absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300",
    navLinkActive: "text-white",
    navLinkInactive: "text-slate-300 hover:text-white",
    langWrap: "hidden md:flex items-center space-x-3 text-xs font-bold tracking-[0.2em] z-10",
    langActive: "text-white",
    langInactive: "text-slate-500 hover:text-slate-300 transition-colors",
    langDivider: "h-4 w-[1px] bg-slate-600",
    hamburgerWrap:
      "md:hidden pointer-events-auto focus:outline-none w-10 h-10 relative flex items-center justify-center z-50",
    hamburgerLine: "bg-slate-300",
    mobileMenu: "bg-slate-900/98",
    mobileLink: "text-slate-400 hover:text-white",
    mobileDivider: "bg-slate-700",
  },
};

export default function SiteHeader({ variant }: { variant: SiteHeaderVariant }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const styles = VARIANT_STYLES[variant];

  const isActive = (href: string) => pathname === href || pathname === `${href}/`;

  return (
    <>
      <header className={styles.header}>
        <Link
          href="/"
          className="pointer-events-auto cursor-pointer z-50 flex items-center gap-4 py-3 pr-4"
        >
          <Image
            src="/logo.png"
            alt="Statoplast Logo"
            width={286}
            height={67}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.navLinkActive : styles.navLinkInactive
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.langWrap}>
          <a href="#" className={styles.langActive}>
            HR
          </a>
          <div className={styles.langDivider}></div>
          <a href="#" className={styles.langInactive}>
            EN
          </a>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className={styles.hamburgerWrap}
          aria-label={isOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`absolute w-6 h-[1.5px] transition-all duration-300 transform ${
              styles.hamburgerLine
            } ${isOpen ? "rotate-45" : "-translate-y-1"}`}
          ></span>
          <span
            className={`absolute h-[1.5px] transition-all duration-300 transform ${
              styles.hamburgerLine
            } ${isOpen ? "w-6 -rotate-45 left-2" : "w-4 translate-y-1 right-2"}`}
          ></span>
        </button>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={`fixed inset-0 backdrop-blur-xl z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-500 ${
          styles.mobileMenu
        } ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav className="flex flex-col items-center space-y-6 text-sm font-bold tracking-[0.2em]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${styles.mobileLink} text-xl py-2 block transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={`w-12 h-[1px] my-4 ${styles.mobileDivider}`}></div>
        <div className="flex items-center space-x-3 text-xs font-bold tracking-[0.2em]">
          <a href="#" className={`${styles.langActive} px-3`}>
            HR
          </a>
          <div className={`h-4 w-[1px] ${styles.langDivider}`}></div>
          <a href="#" className={`${styles.langInactive} px-3`}>
            EN
          </a>
        </div>
      </div>
    </>
  );
}
