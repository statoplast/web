import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { alternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy Policy | Statoplast",
  description:
    "Statoplast d.o.o. privacy policy — what data we collect through the contact form, how it's processed, and your rights under GDPR.",
  alternates: {
    canonical: "/en/privacy-policy/",
    languages: alternateLanguages("/politika-privatnosti"),
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
      <div className="sticky top-0 z-50 flex flex-col w-full">
        <SiteHeader variant="light" locale="en" />
      </div>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Privacy <span className="font-bold">policy.</span>
        </h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: August 2026.</p>

        <div className="space-y-10 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Data controller</h2>
            <p>The controller of personal data collected through this website is:</p>
            <p className="mt-3 bg-white border border-zinc-200 rounded-xl p-5 text-sm">
              STATOPLAST d.o.o.
              <br />
              Sveti Urban 256a, 40312 Štrigova, Croatia
              <br />
              Company registration no. (OIB): 24717387663
              <br />
              Email: info@statoplast.hr
              <br />
              Phone: +385 (0)40 584 230
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. What data we collect</h2>
            <p>
              This website does not automatically collect personal data as you browse. We only
              collect data you provide yourself, via the contact form on the Contact page: your
              name or company name, email address, subject of your inquiry, and the content of
              your message.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              3. Purpose and legal basis of processing
            </h2>
            <p>
              We process data submitted through the contact form solely to respond to your
              inquiry, prepare a quote, or arrange cooperation. The legal basis for this
              processing is taking steps at your request prior to entering into a contract (Art.
              6(1)(b) GDPR), and/or our legitimate interest in responding to inquiries addressed
              to us (Art. 6(1)(f) GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Recipients of data</h2>
            <p>
              To technically process and deliver messages submitted through the contact form, we
              use a third-party service, Formspree (Formspree, Inc.). Formspree acts as our data
              processor and forwards the submitted form data to our email inbox. Data collected by
              the analytics and advertising tools described in section 6 is processed by Google
              (see that section). We do not sell or share your data with other third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Data retention period</h2>
            <p>
              Data submitted through the contact form is retained for as long as necessary to
              process your inquiry and any resulting business relationship, and no longer than
              required under applicable statutory record-keeping periods, after which it is
              deleted or anonymised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">6. Cookies</h2>
            <p>
              This website uses Google Tag Manager to deploy Google Analytics 4 (visit statistics)
              and Google advertising cookies for remarketing, including Google Signals (showing
              our ads to people who previously visited the site, on other Google sites and partner
              networks). These tools collect data such as your IP address, device and browser
              information, the pages you visit, and your approximate location, processed by Google
              under its own privacy policy.
            </p>
            <p className="mt-3">
              A cookie consent management tool (CMP) is not yet active on this site; we are working
              on adding one. Until it is in place, you can disable these cookies via your browser
              settings, via{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Ads Settings
              </a>{" "}
              , or by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Analytics opt-out browser add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">7. Your rights</h2>
            <p>Under the GDPR, in relation to your personal data you have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>access the data we process about you,</li>
              <li>rectify inaccurate or incomplete data,</li>
              <li>erasure of your data ("right to be forgotten"),</li>
              <li>restrict processing,</li>
              <li>object to processing,</li>
              <li>data portability.</li>
            </ul>
            <p className="mt-3">
              You can send a request to exercise these rights to info@statoplast.hr. If you
              believe the processing of your data breaches applicable law, you have the right to
              lodge a complaint with the Croatian data protection authority (Agencija za zaštitu
              osobnih podataka, AZOP).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">8. Data security</h2>
            <p>
              We take reasonable technical and organisational measures to protect the data you
              provide from unauthorised access, loss, or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">9. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. The current version is always
              available on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">10. Contact</h2>
            <p>
              For any questions regarding the processing of your personal data, contact us at{" "}
              <a href="mailto:info@statoplast.hr" className="text-blue-600 hover:underline">
                info@statoplast.hr
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/en/terms-of-service" className="text-zinc-500 hover:text-black transition-colors">
            Terms of Service
          </Link>
          <Link href="/en/contact" className="text-zinc-500 hover:text-black transition-colors">
            Contact
          </Link>
        </div>
      </main>
    </div>
  );
}
