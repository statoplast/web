"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlagDE, FlagEN, FlagHR } from "./Flags";
import { Locale, localizedPath, stripLocalePrefix } from "@/lib/i18n";

export type SiteHeaderVariant = "transparent" | "light" | "industrial";

const NAV_LINKS: Record<Locale, { href: string; label: string }[]> = {
  hr: [
    { href: "/o-nama", label: "O NAMA" },
    { href: "/projekti", label: "PROJEKTI" },
    { href: "/kontakt", label: "KONTAKT" },
  ],
  en: [
    { href: "/o-nama", label: "ABOUT US" },
    { href: "/projekti", label: "PROJECTS" },
    { href: "/kontakt", label: "CONTACT" },
  ],
  de: [
    { href: "/o-nama", label: "ÜBER UNS" },
    { href: "/projekti", label: "PROJEKTE" },
    { href: "/kontakt", label: "KONTAKT" },
  ],
};

const HOME_LABEL: Record<Locale, string> = {
  hr: "Početna",
  en: "Home",
  de: "Startseite",
};

const MENU_LABEL: Record<Locale, { open: string; close: string }> = {
  hr: { open: "Otvori izbornik", close: "Zatvori izbornik" },
  en: { open: "Open menu", close: "Close menu" },
  de: { open: "Menü öffnen", close: "Menü schließen" },
};

const LANGUAGES: { code: Locale; label: string; Flag: typeof FlagHR }[] = [
  { code: "hr", label: "Hrvatski", Flag: FlagHR },
  { code: "en", label: "English", Flag: FlagEN },
  { code: "de", label: "Deutsch", Flag: FlagDE },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

const VARIANT_STYLES: Record<
  SiteHeaderVariant,
  {
    header: string;
    logo: string;
    homeIcon: string;
    nav: string;
    navLink: string;
    navLinkActive: string;
    navLinkInactive: string;
    langWrap: string;
    flagActiveRing: string;
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
    homeIcon: "text-zinc-300 hover:text-white",
    nav: "hidden md:flex items-center space-x-2 text-xs font-bold tracking-[0.2em] pointer-events-auto absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300 py-3 px-4 inline-block",
    navLinkActive: "text-white",
    navLinkInactive: "text-zinc-300 hover:text-white",
    langWrap: "hidden md:flex items-center gap-2 pointer-events-auto z-10",
    flagActiveRing: "ring-2 ring-white",
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
    homeIcon: "text-zinc-500 hover:text-black",
    nav: "hidden md:flex items-center space-x-2 text-xs font-bold tracking-[0.2em] absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300 py-3 px-3 inline-block",
    navLinkActive: "text-black",
    navLinkInactive: "text-zinc-500 hover:text-black",
    langWrap: "hidden md:flex items-center gap-2 z-10",
    flagActiveRing: "ring-2 ring-zinc-900",
    hamburgerWrap:
      "md:hidden pointer-events-auto focus:outline-none w-10 h-10 relative flex items-center justify-center",
    hamburgerLine: "bg-zinc-900",
    mobileMenu: "bg-white/98",
    mobileLink: "text-zinc-500 hover:text-black",
    mobileDivider: "bg-zinc-200",
  },
  industrial: {
    header:
      "w-full px-6 py-3 md:py-4 flex justify-between items-center bg-slate-900/80 backdrop-blur-md relative z-50 border-b border-slate-800",
    logo: "h-6 md:h-8 w-auto object-contain brightness-0 invert",
    homeIcon: "text-slate-400 hover:text-white",
    nav: "hidden md:flex items-center space-x-2 text-xs font-bold tracking-[0.2em] absolute left-1/2 -translate-x-1/2",
    navLink: "transition-colors duration-300 py-3 px-3 inline-block",
    navLinkActive: "text-white",
    navLinkInactive: "text-slate-300 hover:text-white",
    langWrap: "hidden md:flex items-center gap-2 z-10",
    flagActiveRing: "ring-2 ring-white",
    hamburgerWrap:
      "md:hidden pointer-events-auto focus:outline-none w-10 h-10 relative flex items-center justify-center z-50",
    hamburgerLine: "bg-slate-300",
    mobileMenu: "bg-slate-900/98",
    mobileLink: "text-slate-400 hover:text-white",
    mobileDivider: "bg-slate-700",
  },
};

export default function SiteHeader({
  variant,
  locale = "hr",
}: {
  variant: SiteHeaderVariant;
  locale?: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const styles = VARIANT_STYLES[variant];
  const navLinks = NAV_LINKS[locale];
  const basePath = stripLocalePrefix(pathname);
  const homeHref = localizedPath("/", locale);

  const isActive = (href: string) => {
    const target = localizedPath(href, locale);
    return pathname === target || pathname === `${target}/`;
  };

  return (
    <>
      <header className={styles.header}>
        <Link
          href={homeHref}
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
          <Link
            href={homeHref}
            aria-label={HOME_LABEL[locale]}
            className={`p-2 -m-2 mr-1 transition-colors duration-300 ${styles.homeIcon}`}
          >
            <HomeIcon className="w-4 h-4" />
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(link.href, locale)}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.navLinkActive : styles.navLinkInactive
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.langWrap}>
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={localizedPath(basePath, lang.code)}
              aria-label={lang.label}
              className="block p-2 -m-2"
            >
              <span
                className={`block w-6 h-4 md:w-7 md:h-5 rounded-[2px] overflow-hidden transition-all duration-300 ${
                  lang.code === locale
                    ? `opacity-100 ${styles.flagActiveRing}`
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <lang.Flag className="w-full h-full object-cover" />
              </span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className={styles.hamburgerWrap}
          aria-label={isOpen ? MENU_LABEL[locale].close : MENU_LABEL[locale].open}
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
          <Link
            href={homeHref}
            onClick={() => setIsOpen(false)}
            aria-label={HOME_LABEL[locale]}
            className={`${styles.mobileLink} py-2 transition-colors`}
          >
            <HomeIcon className="w-6 h-6" />
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(link.href, locale)}
              onClick={() => setIsOpen(false)}
              className={`${styles.mobileLink} text-xl py-2 block transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={`w-12 h-[1px] my-4 ${styles.mobileDivider}`}></div>
        <div className="flex items-center gap-3">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={localizedPath(basePath, lang.code)}
              onClick={() => setIsOpen(false)}
              aria-label={lang.label}
              className="block p-2.5 -m-2.5"
            >
              <span
                className={`block w-8 h-6 rounded-[2px] overflow-hidden transition-all duration-300 ${
                  lang.code === locale
                    ? `opacity-100 ${styles.flagActiveRing}`
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <lang.Flag className="w-full h-full object-cover" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
