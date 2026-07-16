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
  "/aluminijska-stolarija",
  "/moderne-ograde",
  "/zatvaranje-nadstresnica",
  "/plastifikacija-metala",
  "/lasersko-rezanje",
  "/cnc-obrada",
  "/ormari",
  "/serijska-proizvodnja",
  "/politika-privatnosti",
  "/uvjeti-koristenja",
];

const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const path = localizedPath(route, locale);
      entries.push({
        url: `${SITE_URL}${path === "/" ? "/" : `${path}/`}`,
        lastModified: BUILD_DATE,
        changeFrequency:
          route === "/"
            ? "weekly"
            : route === "/politika-privatnosti" || route === "/uvjeti-koristenja"
              ? "yearly"
              : "monthly",
        priority:
          route === "/"
            ? 1
            : route === "/bioklimatske-pergole/konfigurator"
              ? 0.9
              : route === "/politika-privatnosti" || route === "/uvjeti-koristenja"
                ? 0.2
                : 0.7,
        alternates: { languages: alternateLanguages(route) },
      });
    }
  }
  return entries;
}
