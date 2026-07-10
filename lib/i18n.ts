export const LOCALES = ["hr", "en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "hr";

export const SITE_URL = "https://statoplast.hr";

// hr is the default locale and lives at the site root (no prefix) so the
// existing, already-indexed Croatian URLs never change. en/de live under
// their own prefix.
export function localePrefix(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function localizedPath(path: string, locale: Locale) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${localePrefix(locale)}${clean}` || "/";
}

// Strips a leading /en or /de prefix off a pathname, returning the
// locale-independent path (e.g. "/en/o-nama/" -> "/o-nama"). Used by the
// language switcher to jump to the equivalent page in another locale.
export function stripLocalePrefix(pathname: string) {
  const match = pathname.match(/^\/(en|de)(\/.*)?$/);
  if (!match) return pathname.replace(/\/$/, "") || "/";
  const rest = match[2] ?? "";
  return rest.replace(/\/$/, "") || "/";
}

export function alternateLanguages(path: string) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return {
    hr: `${SITE_URL}${clean}/`,
    en: `${SITE_URL}/en${clean}/`,
    de: `${SITE_URL}/de${clean}/`,
    "x-default": `${SITE_URL}${clean}/`,
  };
}
