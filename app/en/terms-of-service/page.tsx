import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Terms of Service | Statoplast",
  description:
    "Terms of Service for the Statoplast d.o.o. website — intellectual property, limitation of liability, and governing law.",
  alternates: {
    canonical: "/en/terms-of-service/",
    languages: alternateLanguages("/uvjeti-koristenja"),
  },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="en" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Terms of <span className="font-bold">service.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: July 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. General provisions</h2>
            <p>
              These Terms of Service are set out by STATOPLAST d.o.o., Sveti Urban 256a, 40312
              Štrigova, Croatia, company registration no. (OIB): 24717387663, registered with the
              Commercial Court in Varaždin under registration no. (MBS): 070015730 ("Statoplast",
              "we"). By using this website, you accept these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Purpose of the website</h2>
            <p>
              This website is for informational and promotional purposes and presents Statoplast's
              products and services in modern architecture (aluminium joinery, pivot doors,
              bioclimatic pergolas) and the metal industry (powder coating, CNC machining, laser
              cutting, series production, metal and electrical cabinets). You can use the site to
              send an inquiry or request a quote; the content of the site does not by itself
              constitute a binding offer or contract.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. 3D pergola configurator</h2>
            <p>
              The 3D bioclimatic pergola configurator is intended solely as an indicative tool for
              visualising possible dimensions, mounting types, and patterns. Displayed values and
              visuals do not constitute final technical documentation, structural calculations, or
              a binding offer. Final specifications and pricing are determined only after direct
              consultation with our engineering team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Intellectual property</h2>
            <p>
              All text, photographs, graphic elements, the logo, and the 3D configurator on this
              website are the property of Statoplast d.o.o. or used with appropriate permission,
              and are protected under copyright law. Copying, distribution, or commercial use of
              this content without our prior written consent is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              5. Third-party content and external links
            </h2>
            <p>
              The Projects page displays content from our official Instagram profile, and the site
              also links to external services (e.g. Formspree for submitting inquiries). We are
              not responsible for the availability or content of external sites and services we
              link to.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Limitation of liability</h2>
            <p>
              We aim to keep the information on this site accurate and up to date, but we do not
              guarantee the complete accuracy, completeness, or currency of all published
              information. To the extent permitted by law, we exclude liability for any damage
              arising from the use of this website or reliance on the information published on it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Governing law and jurisdiction</h2>
            <p>
              These Terms of Service are governed by the law of the Republic of Croatia. Any
              disputes are subject to the exclusive jurisdiction of the competent court in
              Varaždin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Changes to these terms</h2>
            <p>
              We reserve the right to amend these Terms of Service. Amendments take effect once
              published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Contact</h2>
            <p>
              For any questions regarding these terms, contact us at{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/en/privacy-policy" className="text-zinc-500 hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/en/contact" className="text-zinc-500 hover:text-black transition-colors">
            Contact
          </Link>
        </div>
      </main>
    </div>
  );
}
