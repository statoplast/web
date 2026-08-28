// Cloudflare Pages Function - handles POST /api/contact.
// Verifies the Turnstile token server-side, then sends the message via
// Resend. Keeps RESEND_API_KEY and TURNSTILE_SECRET_KEY out of the
// client bundle entirely - both are read from env, set in the Cloudflare
// Pages dashboard for the Production and Preview environments.

const MAX_LENGTHS = { name: 150, email: 254, subject: 150, message: 5000 };

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({ logoUrl, name, email, subject, message }) {
  const row = (label, value) => `
        <tr>
          <td style="padding:4px 0;color:#71717a;font-size:13px;width:110px;vertical-align:top;">${label}</td>
          <td style="padding:4px 0;color:#18181b;font-size:14px;">${value}</td>
        </tr>`;

  return `<!DOCTYPE html>
<html lang="hr">
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #e4e4e7;">
                <img src="${logoUrl}" alt="Statoplast" height="28" style="display:block;height:28px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 20px;color:#18181b;font-size:16px;font-weight:bold;">Novi upit s web stranice</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  ${row("Ime/Tvrtka", name)}
                  ${row("Email", `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>`)}
                  ${row("Predmet", subject || "-")}
                </table>
                <p style="margin:20px 0 6px;color:#71717a;font-size:13px;">Poruka</p>
                <p style="margin:0;color:#18181b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #e4e4e7;">
                <p style="margin:0;color:#a1a1aa;font-size:12px;">Poslano putem kontakt obrasca na statoplast.hr</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Only ever redirect to a same-site relative path. `next` comes straight
// from client-submitted form data, so without this a crafted POST with
// next=https://evil.example could turn this endpoint into an open
// redirect off a trusted domain.
function safePath(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const acceptsJson = (request.headers.get("accept") || "").includes("application/json");

  const fail = (status, error) => {
    if (acceptsJson) return jsonResponse(status, { ok: false, error });
    return Response.redirect(new URL("/", request.url), 302);
  };

  let fields;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      fields = await request.json();
    } else {
      const formData = await request.formData();
      fields = Object.fromEntries(formData.entries());
    }
  } catch {
    return fail(400, "invalid_body");
  }

  const field = (key, max) => (typeof fields[key] === "string" ? fields[key].slice(0, max) : "");

  // Honeypot: bots that fill every field trip this. Report success to
  // them without sending anything, so they don't retry.
  if (field("_gotcha", 100)) {
    if (acceptsJson) return jsonResponse(200, { ok: true });
    return Response.redirect(new URL(safePath(field("next", 200)), request.url), 302);
  }

  const token = field("cf-turnstile-response", 2048);
  if (!token) return fail(400, "missing_turnstile_token");

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get("CF-Connecting-IP") || undefined,
    }),
  });
  const verifyData = await verifyRes.json().catch(() => ({ success: false }));
  if (!verifyData.success) return fail(403, "turnstile_failed");

  const name = field("name", MAX_LENGTHS.name);
  const email = field("email", MAX_LENGTHS.email);
  const subject = field("subject", MAX_LENGTHS.subject);
  const message = field("message", MAX_LENGTHS.message);

  if (!name || !email || !message) return fail(400, "missing_fields");

  // ALU Sustavi inquiries also go to Jelena, in addition to the usual inbox.
  const to = ["info@statoplast.hr"];
  if (subject === "ALU Sustavi") to.push("jelena@statoplast.hr");

  // Logo needs to be a publicly reachable absolute URL for email clients to
  // fetch - use the request's own origin rather than a hardcoded domain, so
  // this keeps working on preview deploys and after the eventual DNS cutover
  // alike.
  const logoUrl = `${new URL(request.url).origin}/logo.png`;

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "Statoplast Web <upiti@statoplast.hr>",
      to,
      reply_to: email,
      subject: `Novi upit s weba - ${subject || "Opći upit"}`,
      text: `Ime/Tvrtka: ${name}\nEmail: ${email}\nPredmet: ${subject}\n\nPoruka:\n${message}`,
      html: buildEmailHtml({
        logoUrl,
        name: escapeHtml(name),
        email: escapeHtml(email),
        subject: escapeHtml(subject),
        message: escapeHtml(message),
      }),
    }),
  });

  if (!emailRes.ok) {
    // Logged server-side (Cloudflare Pages Function logs) for our own
    // debugging - Resend's error text isn't sensitive, but there's no
    // reason to hand it to whoever calls this endpoint.
    console.error("Resend send failed:", emailRes.status, await emailRes.text().catch(() => ""));
    return fail(502, "email_send_failed");
  }

  if (acceptsJson) return jsonResponse(200, { ok: true });
  return Response.redirect(new URL(safePath(field("next", 200)), request.url), 302);
}
