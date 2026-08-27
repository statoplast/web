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

export async function onRequestPost(context) {
  const { request, env } = context;
  const acceptsJson = (request.headers.get("accept") || "").includes("application/json");

  const fail = (status, error) => {
    if (acceptsJson) return jsonResponse(status, { ok: false, error });
    const referer = request.headers.get("referer") || "/";
    return Response.redirect(referer, 302);
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
    return Response.redirect(field("next", 200) || "/", 302);
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

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "Statoplast Web <upiti@statoplast.hr>",
      to: ["info@statoplast.hr"],
      reply_to: email,
      subject: `Novi upit s weba - ${subject || "Opći upit"}`,
      text: `Ime/Tvrtka: ${name}\nEmail: ${email}\nPredmet: ${subject}\n\nPoruka:\n${message}`,
    }),
  });

  if (!emailRes.ok) {
    const resendError = await emailRes.text().catch(() => "");
    console.error("Resend send failed:", emailRes.status, resendError);
    if (acceptsJson) {
      return jsonResponse(502, {
        ok: false,
        error: "email_send_failed",
        resendStatus: emailRes.status,
        resendError,
      });
    }
    const referer = request.headers.get("referer") || "/";
    return Response.redirect(referer, 302);
  }

  if (acceptsJson) return jsonResponse(200, { ok: true });
  return Response.redirect(field("next", 200) || "/", 302);
}
