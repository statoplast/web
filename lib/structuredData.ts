import { Locale, SITE_URL } from "./i18n";

// Shared LocalBusiness/Organization structured data (JSON-LD), rendered on
// every page via each locale's root layout. This is what lets Google show
// Statoplast's address, phone and hours directly in search results and the
// local knowledge panel, instead of relying on plain text alone.
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Statoplast d.o.o.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/slike/moderna_arhitektura_kuca.jpeg`,
    email: "info@statoplast.hr",
    telephone: "+385405842300",
    inLanguage: locale,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sveti Urban 256a",
      postalCode: "40312",
      addressLocality: "Štrigova",
      addressCountry: "HR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "14:00",
    },
    sameAs: ["https://instagram.com/statoplast"],
  };
}
