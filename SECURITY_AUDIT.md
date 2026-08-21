# Security Audit — Statoplast Website

Living notes from security review passes on this repo. Not a compliance
document — a running record of what was checked, what was changed, and
what's still open.

## 2026-08-20 — Initial audit

Site is a fully static Next.js export (`output: "export"`) with no backend,
no API routes, and no server-side environment variables — most traditional
attack surface (SQLi, server secrets, auth) doesn't apply.

**Checked, clean:**
- No hardcoded secrets/API keys/tokens in the repo.
- No `dangerouslySetInnerHTML` sinks fed by user input (only our own
  static JSON-LD).
- All `target="_blank"` links already carry `rel="noopener noreferrer"`.

**Fixed:**
- Contact form (`components/KontaktClient.tsx`): added `maxLength` caps on
  name/email/message inputs and truncated the URL-derived `?poruka=`
  prefill, to reject oversized payloads.
- Projects feed (`components/ProjektiClient.tsx`): the page renders
  `mediaUrl`/`permalink` from an external GitHub-hosted JSON file directly
  as `<img src>` / `<a href>`. Added a `isSafeHttpsUrl()` validator so a
  malformed or tampered feed entry can't inject a `javascript:` URI.
- Added `public/_headers` (Cloudflare Pages security headers): X-Frame-
  Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and
  a Content-Security-Policy scoped to the origins the site actually calls.

**Accepted risk:**
- `npm audit` shows one moderate PostCSS advisory nested inside Next.js's
  own build tooling — build-time only, no runtime exposure in a static
  export, and the only fix path is downgrading Next to an old canary.

## 2026-08-21 — Google Tag Manager (GTM-P7BQH6P)

Added the GTM container to all three root layouts (`app/(hr)/layout.tsx`,
`app/en/layout.tsx`, `app/de/layout.tsx`) — confirmed these are genuinely
independent root layouts (no wrapping `app/layout.tsx`, no `template.tsx`),
so the container loads exactly once per page.

The container is not empty: it already runs two GA4 properties
(`G-0QB96CMXKM`, `G-WYX15WZFJG`) plus Google Signals / remarketing,
verified firing on the current live site. **Cookies are set from the first
deploy of this change**, not at some later point.

Updated `public/_headers` CSP to allow the container to actually load:
`script-src` gained `https://www.googletagmanager.com` (on top of the
pre-existing `'unsafe-inline'`, required because GTM's bootstrap and its
runtime-injected tags are inline — nonces aren't viable on static Pages
hosting), `connect-src` gained the GTM/GA beacon domains, and a `frame-src`
directive was added for the `<noscript>` fallback iframe. `img-src` already
allowed all HTTPS origins via wildcard, so the remarketing pixel domains
(`stats.g.doubleclick.net`, `www.google.com`, `www.google.hr`) needed no
change.

### Open item: Google Consent Mode v2

Because Google Signals / remarketing is active, cookie-setting tags fire on
every pageview with no user gate. Decision (2026-08-21): **not** building a
hand-rolled consent banner — remarketing needs Consent Mode v2 (default/
update consent state, not just conditional script loading), which is
better handled by a CMP with a native GTM template (Cookiebot / Iubenda /
CookieYes) than a custom implementation.

Note: the current live site (statoplast.hr) already runs GA4 + Google
Signals while its own privacy policy makes no mention of it — this was an
existing inaccuracy on the live site, not one introduced by this change.

**Done (2026-08-21):** updated the Privacy Policy pages
(`/politika-privatnosti`, `/en/privacy-policy`, `/de/datenschutz`) to
disclose GA4 and Google advertising/remarketing cookies, name Google as a
data recipient, and point users to Google's own opt-out mechanisms
(Google Ads Settings, GA opt-out add-on) as an interim measure until a CMP
is in place.

**Still to do, scheduled after the DNS cutover to the real domain:**
- Pick a CMP and add its GTM template/tag.
- Set Consent Mode v2 defaults (`analytics_storage`, `ad_storage`,
  `ad_user_data`, `ad_personalization`) to `denied` before GTM fires,
  updated via the CMP on user choice.
- Once a CMP is live, update the Privacy Policy cookie section again to
  describe the consent banner itself and remove the interim opt-out-link
  language.
- Re-verify the CSP once the CMP's own script domains are known.
