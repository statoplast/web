import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL, alternateLanguages, localizedPath } from "@/lib/i18n";

export const dynamic = "force-static";

const ROUTES = [
  "/",
  "/o-nama",
  "/projekti",
  "/kontakt",
  "/pivot-vrata",
  "/bioklimatske-pergole",
  "/bioklimatske-pergole/konfigurator",
  "/alu-stolarija",
  "/moderne-ograde",
  "/zatvaranje-nadstresnica",
  "/plastifikacija-metala",
  "/lasersko-rezanje",
  "/cnc-obrada",
  "/ormari",
  "/serijska-proizvodnja",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const path = localizedPath(route, locale);
      entries.push({
        url: `${SITE_URL}${path === "/" ? "/" : `${path}/`}`,
        alternates: { languages: alternateLanguages(route) },
      });
    }
  }
  return entries;
}
