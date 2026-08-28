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
