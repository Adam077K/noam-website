import type { APIRoute } from 'astro';
import { z } from 'zod';
import { Resend } from 'resend';

export const prerender = false;

const Schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  message: z.string().trim().max(4000).optional().default(''),
  company: z.string().optional(), // honeypot
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const esc = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string));

export const POST: APIRoute = async ({ request }) => {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Bad request' }, 400);
  }

  const parsed = Schema.safeParse(data);
  if (!parsed.success) {
    return json({ ok: false, error: 'Validation failed' }, 422);
  }
  const { name, email, phone, message, company } = parsed.data;

  // honeypot: pretend success, send nothing
  if (company && company.length > 0) return json({ ok: true });

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO ?? 'Dr.Kitrey@gmail.com';
  const from = import.meta.env.CONTACT_FROM ?? 'Dr. Kitrey Website <onboarding@resend.dev>';

  // No key configured (e.g. local dev): accept and log, so the UX works end-to-end.
  if (!apiKey) {
    console.info('[contact] (no RESEND_API_KEY — not sent)', { name, email, phone });
    return json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `פנייה חדשה מהאתר - ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#16201d;line-height:1.6">
          <h2 style="margin:0 0 12px">פנייה חדשה מאתר ד״ר נעם כתרי</h2>
          <p><strong>שם:</strong> ${esc(name)}</p>
          <p><strong>טלפון:</strong> ${esc(phone)}</p>
          <p><strong>אימייל:</strong> ${esc(email)}</p>
          <p><strong>הודעה:</strong><br>${esc(message).replace(/\n/g, '<br>') || '-'}</p>
        </div>`,
      text: `פנייה חדשה\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\nהודעה: ${message || '-'}`,
    });
    if (error) {
      console.error('[contact] resend error', error);
      return json({ ok: false, error: 'Send failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[contact] exception', err);
    return json({ ok: false, error: 'Send failed' }, 500);
  }
};
