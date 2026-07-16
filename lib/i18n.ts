export const LOCALES = ["hr", "en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "hr";

export const SITE_URL = "https://statoplast.hr";

// Canonical (hr) URL segment -> translated segment per locale. Canonical
// keys are exactly the folder names under app/(hr)/. This is what lets
// /en/ and /de/ pages live at real, translated URLs (e.g. /en/about-us/,
// /de/schraenke/) instead of carrying the Croatian slug around untranslated.
// Where a page has a real equivalent on the current live statoplast.hr
// (WordPress) site, these match that site's actual indexed slug exactly -
// even where it's a stylistic choice we wouldn't have made ourselves (e.g.
// "uber-uns" without the umlaut) - so the URL is genuinely the same one,
// not just similar. Pages with no live equivalent (either because they're
// new, like the configurator, or because the live site bundles several of
// our pages into one broader page, like "metal-accessories") keep their
// own independently-chosen slug.
const SLUG_MAP: Record<string, Record<Locale, string>> = {
  "o-nama": { hr: "o-nama", en: "about-us", de: "uber-uns" },
  projekti: { hr: "projekti", en: "projects", de: "projekte" },
  kontakt: { hr: "kontakt", en: "contact", de: "kontakt" },
  "pivot-vrata": { hr: "pivot-vrata", en: "pivot-doors", de: "pivot-turen" },
  "bioklimatske-pergole": {
    hr: "bioklimatske-pergole",
    en: "bioclimatic-pergolas",
    de: "bioklimatische-pergolen",
  },
  konfigurator: { hr: "konfigurator", en: "configurator", de: "konfigurator" },
  "aluminijska-stolarija": {
    hr: "aluminijska-stolarija",
    en: "aluminium-joinery",
    de: "aluminium-tischlerei",
  },
  "moderne-ograde": { hr: "moderne-ograde", en: "fence-systems", de: "zaunsysteme" },
  "zatvaranje-nadstresnica": {
    hr: "zatvaranje-nadstresnica",
    en: "canopy-enclosures",
    de: "terrassenverglasung",
  },
  "plastifikacija-metala": {
    hr: "plastifikacija-metala",
    en: "powder-coating",
    de: "plastifizierung",
  },
  "lasersko-rezanje": { hr: "lasersko-rezanje", en: "laser-cutting", de: "laserschneiden" },
  "cnc-obrada": { hr: "cnc-obrada", en: "cnc-machining", de: "cnc-bearbeitung" },
  ormari: { hr: "ormari", en: "cabinets", de: "elektroschraenke" },
  "serijska-proizvodnja": {
    hr: "serijska-proizvodnja",
    en: "series-production",
    de: "serienproduktion",
  },
  "politika-privatnosti": {
    hr: "politika-privatnosti",
    en: "privacy-policy",
    de: "datenschutz",
  },
  "uvjeti-koristenja": {
    hr: "uvjeti-koristenja",
    en: "terms-of-service",
    de: "nutzungsbedingungen",
  },
};

function translateSlug(slug: string, locale: Locale): string {
  return SLUG_MAP[slug]?.[locale] ?? slug;
}

function untranslateSlug(slug: string, locale: Locale): string {
  for (const canonical in SLUG_MAP) {
    if (SLUG_MAP[canonical][locale] === slug) return canonical;
  }
  return slug;
}

// hr is the default locale and lives at the site root (no prefix) so the
// existing, already-indexed Croatian URLs never change. en/de live under
// their own prefix, with every segment translated to a real word in that
// language.
export function localePrefix(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

// `path` is always given in CANONICAL (hr) form, e.g. "/bioklimatske-pergole/konfigurator".
export function localizedPath(path: string, locale: Locale) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (!clean) return localePrefix(locale) || "/";
  const segments = clean
    .split("/")
    .filter(Boolean)
    .map((s) => translateSlug(s, locale));
  return `${localePrefix(locale)}/${segments.join("/")}`;
}

// `pathname` is the CURRENT, already-translated URL pathname. Returns the
// locale-independent CANONICAL (hr) path - e.g. "/en/about-us/" -> "/o-nama".
// Used by the language switcher to jump to the equivalent page in another
// locale, so it has to reverse today's locale's translation first.
export function stripLocalePrefix(pathname: string) {
  const match = pathname.match(/^\/(en|de)(\/.*)?$/);
  const locale: Locale = match ? (match[1] as Locale) : "hr";
  const rest = match ? (match[2] ?? "") : pathname;
  const clean = rest.replace(/\/$/, "");
  if (!clean) return "/";
  const segments = clean
    .split("/")
    .filter(Boolean)
    .map((s) => untranslateSlug(s, locale));
  return `/${segments.join("/")}`;
}

export function alternateLanguages(path: string) {
  const urlFor = (locale: Locale) => {
    const p = localizedPath(path, locale);
    return `${SITE_URL}${p === "/" ? "/" : `${p}/`}`;
  };
  return {
    hr: urlFor("hr"),
    en: urlFor("en"),
    de: urlFor("de"),
    "x-default": urlFor("hr"),
  };
}
