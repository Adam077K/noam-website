import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import type { ContactInput } from "./schema";
import {
  areaOfInterestLabel,
  autoReplyCopy,
  preferredContactLabel,
} from "./copy";

/**
 * Resend wiring for the contact form. Sends two emails: a notification to the
 * clinic (always) and an auto-reply to the submitter (only if they gave an
 * email). Both are multipart (HTML + plain-text) per email-systems best
 * practice. Degrades gracefully: if RESEND_API_KEY is absent (dev), we log and
 * return `ok: true` so the local flow isn't blocked — no real send happens.
 */

const FROM = "Dr. Kitrey Clinic <onboarding@resend.dev>";

let resend: Resend | null | undefined;

function getResend(): Resend | null {
  if (resend !== undefined) return resend;
  const key = process.env.RESEND_API_KEY;
  resend = key ? new Resend(key) : null;
  return resend;
}

function clinicToAddress(): string {
  return process.env.CONTACT_TO_EMAIL ?? "Dr.Kitrey@gmail.com";
}

/** Escape user-supplied text before interpolating into HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SendResult = { ok: true } | { ok: false };

/** Build the clinic notification (HTML + text). Subject per PRD §5.3a. */
function buildNotification(input: ContactInput): {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
} {
  const locale = input.locale;
  const area = input.areaOfInterest
    ? t(areaOfInterestLabel[input.areaOfInterest], "en")
    : "—";
  const preferred = t(preferredContactLabel[input.preferredContact], "en");

  const subject = `[Website Inquiry] ${area} — ${input.name}`;

  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Email", input.email ?? "—"],
    ["Area of interest", area],
    ["Preferred contact", preferred],
    ["Message", input.message ?? "—"],
    ["Language", locale.toUpperCase()],
  ];

  const html = `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1e293b;">
<h2 style="margin:0 0 12px;font-size:18px;">New website inquiry</h2>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;">${esc(
        k,
      )}</td><td style="border:1px solid #e2e8f0;">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin-top:16px;font-size:12px;color:#64748b;">Sent automatically from the Dr. Kitrey website contact form.</p>
</body></html>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  return { subject, html, text, replyTo: input.email };
}

/** Build the submitter auto-reply (HTML + text). */
function buildAutoReply(locale: Locale): {
  subject: string;
  html: string;
  text: string;
} {
  const { subject, body } = autoReplyCopy[locale];
  const dir = locale === "he" ? "rtl" : "ltr";
  const html = `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1e293b;" dir="${dir}">
<p style="font-size:15px;line-height:1.6;">${esc(body)}</p>
<p style="font-size:13px;color:#64748b;">054-7181718 · Dr.Kitrey@gmail.com</p>
</body></html>`;
  return { subject, html, text: body };
}

/**
 * Send the clinic notification and (optionally) the submitter auto-reply.
 * Returns `ok:false` only when a real send was attempted and failed.
 */
export async function sendContactEmails(input: ContactInput): Promise<SendResult> {
  const client = getResend();

  if (!client) {
    console.warn(
      "[contact:email] RESEND_API_KEY not set — skipping send (dev). Notification would go to clinic.",
    );
    return { ok: true };
  }

  const notification = buildNotification(input);

  try {
    const { error } = await client.emails.send({
      from: FROM,
      to: clinicToAddress(),
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      ...(notification.replyTo ? { replyTo: notification.replyTo } : {}),
    });

    if (error) {
      console.error("[contact:email] clinic notification failed.", {
        message: error.message,
      });
      return { ok: false };
    }
  } catch (error) {
    console.error("[contact:email] clinic notification threw.", {
      message: error instanceof Error ? error.message : String(error),
    });
    return { ok: false };
  }

  // Auto-reply is best-effort: a failure here must NOT fail the submission,
  // since the clinic already received the inquiry.
  if (input.email) {
    const reply = buildAutoReply(input.locale);
    try {
      const { error } = await client.emails.send({
        from: FROM,
        to: input.email,
        subject: reply.subject,
        html: reply.html,
        text: reply.text,
      });
      if (error) {
        console.error("[contact:email] auto-reply failed (non-fatal).", {
          message: error.message,
        });
      }
    } catch (error) {
      console.error("[contact:email] auto-reply threw (non-fatal).", {
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { ok: true };
}
