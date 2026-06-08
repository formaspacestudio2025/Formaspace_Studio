const prerender = false;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const rateLimitMap = /* @__PURE__ */ new Map();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 36e5;
const POST = async ({ request }) => {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (entry) {
    if (now < entry.resetAt) {
      if (entry.count >= RATE_LIMIT_MAX) {
        return new Response(JSON.stringify({ error: "Too many submissions. Try again later." }), {
          status: 429,
          headers: { "Content-Type": "application/json" }
        });
      }
      entry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { name, email, company, phone, message } = body;
  if (!name || typeof name !== "string" || name.length < 2 || name.length > 100) {
    return new Response(JSON.stringify({ error: "Name must be between 2 and 100 characters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Valid email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!message || typeof message !== "string" || message.length < 10 || message.length > 5e3) {
    return new Response(JSON.stringify({ error: "Message must be between 10 and 5000 characters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (company && (typeof company !== "string" || company.length > 200)) {
    return new Response(JSON.stringify({ error: "Company name too long" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (phone && (typeof phone !== "string" || phone.length > 50)) {
    return new Response(JSON.stringify({ error: "Phone number too long" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const sanitize = (s) => s.replace(/<[^>]*>/g, "").trim();
  const submission = {
    name: sanitize(name),
    email: sanitize(email),
    company: company ? sanitize(company) : "",
    phone: phone ? sanitize(phone) : "",
    message: sanitize(message),
    receivedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    if (RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: "Formaspace Studio <noreply@formaspacestudio.com>",
        to: "info@formaspacestudio.com",
        subject: `New enquiry from ${submission.name}`,
        text: `Name: ${submission.name}
Email: ${submission.email}
Company: ${submission.company}
Phone: ${submission.phone}

Message:
${submission.message}`
      });
      console.info(`[Contact] Email sent for ${submission.email}`);
    } else {
      console.info(`[Contact] Submission received from ${submission.email} (no RESEND_API_KEY configured)`);
    }
  } catch (err) {
    console.error("[Contact] Failed to send notification:", err);
    return new Response(JSON.stringify({ error: "Failed to process submission" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
