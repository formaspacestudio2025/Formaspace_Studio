import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@formaspacestudio.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Formaspace Studio <noreply@formaspacestudio.com>';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 3600000;

const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();

    const entry = rateLimitMap.get(ip);
    if (entry) {
      if (now < entry.resetAt) {
        if (entry.count >= RATE_LIMIT_MAX) {
          return new Response(JSON.stringify({ error: 'Too many submissions. Try again later.' }), { status: 429, headers });
        }
        entry.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    let body: { name?: string; email?: string; company?: string; phone?: string; message?: string };
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
    }

    const { name, email, company, phone, message } = body;

    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return new Response(JSON.stringify({ error: 'Name must be between 2 and 100 characters' }), { status: 400, headers });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), { status: 400, headers });
    }

    if (!message || typeof message !== 'string' || message.length < 10 || message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Message must be between 10 and 5000 characters' }), { status: 400, headers });
    }

    if (company && (typeof company !== 'string' || company.length > 200)) {
      return new Response(JSON.stringify({ error: 'Company name too long' }), { status: 400, headers });
    }

    if (phone && (typeof phone !== 'string' || phone.length > 50)) {
      return new Response(JSON.stringify({ error: 'Phone number too long' }), { status: 400, headers });
    }

    const sanitize = (s: string) => s.replace(/<[^>]*>/g, '').trim();

    const submission = {
      name: sanitize(name),
      email: sanitize(email),
      company: company ? sanitize(company) : '',
      phone: phone ? sanitize(phone) : '',
      message: sanitize(message),
      receivedAt: new Date().toISOString(),
    };

    try {
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: EMAIL_FROM,
          to: CONTACT_EMAIL,
          subject: `New enquiry from ${submission.name}`,
          text: `Name: ${submission.name}\nEmail: ${submission.email}\nCompany: ${submission.company}\nPhone: ${submission.phone}\n\nMessage:\n${submission.message}`,
        });
        console.info(`[Contact] Email sent for ${submission.email}`);
      } else {
        console.info(`[Contact] Submission received from ${submission.email} (no RESEND_API_KEY configured)`);
      }
    } catch (err) {
      console.error('[Contact] Failed to send notification:', err);
      return new Response(JSON.stringify({ error: 'Failed to process submission' }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    console.error('[Contact] Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
