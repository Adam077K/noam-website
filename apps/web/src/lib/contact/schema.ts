import { z } from "zod";

/**
 * Contact-form validation schema (server-authoritative).
 *
 * Mirrors the client-side rules in REDESIGN-PRD §5.1 so the server is the
 * single source of truth. Error messages are emitted as stable keys (not
 * prose) so the UI can resolve them to bilingual strings via `fieldErrorCopy`.
 */

/** Israeli mobile: exactly 05X followed by 7 digits (e.g. 0547181718). */
export const israeliMobileRegex = /^05[0-9]{8}$/;

/** Area-of-interest options — must match the COPY-DECK select options. */
export const areaOfInterestValues = [
  "male_sexual_function",
  "functional_urology",
  "specialized_care",
  "other",
  "prefer_not_to_say",
] as const;

export type AreaOfInterest = (typeof areaOfInterestValues)[number];

/** Preferred contact method — radio in the form. */
export const preferredContactValues = ["phone", "email"] as const;

export type PreferredContact = (typeof preferredContactValues)[number];

/**
 * Normalise a raw phone string before validation: strip spaces, dashes and a
 * leading +972 / 972 international prefix down to the canonical 05XXXXXXXX form.
 */
export function normalizeIsraeliPhone(raw: string): string {
  const digits = raw.replace(/[\s-()]/g, "");
  if (digits.startsWith("+972")) return "0" + digits.slice(4);
  if (digits.startsWith("972")) return "0" + digits.slice(3);
  return digits;
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "name_too_short" })
    .max(80, { message: "name_too_long" }),

  // Phone is validated against the normalized form; we keep the transform so
  // both "+972 54-718 1718" and "0547181718" pass.
  phone: z
    .string()
    .trim()
    .transform(normalizeIsraeliPhone)
    .pipe(
      z
        .string()
        .regex(israeliMobileRegex, { message: "phone_invalid" }),
    ),

  // Optional email; empty string is coerced to undefined so the field is truly
  // optional but, when present, must be a valid RFC address.
  email: z
    .union([z.literal(""), z.string().trim().email({ message: "email_invalid" })])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  areaOfInterest: z.enum(areaOfInterestValues).optional(),

  preferredContact: z.enum(preferredContactValues, {
    message: "preferred_contact_required",
  }),

  message: z
    .string()
    .trim()
    .max(500, { message: "message_too_long" })
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  // Privacy acknowledgment must be checked. A non-true value fails.
  privacyAck: z.literal(true, { message: "privacy_required" }),

  // Honeypot: real users never fill this. Bots do. Must be empty.
  // Validated separately in the action so we can return a *silent success*.
  company: z.string().optional(),

  // Active UI locale, used to pick which template to send and which error
  // copy the UI resolves. Defaults to Hebrew (canonical default).
  locale: z.enum(["he", "en"]).default("he"),
});

/** Fully validated, normalized contact payload. */
export type ContactInput = z.infer<typeof contactSchema>;

/** Field-error keys the UI must be able to render. */
export type ContactFieldErrorKey =
  | "name_too_short"
  | "name_too_long"
  | "phone_invalid"
  | "email_invalid"
  | "preferred_contact_required"
  | "message_too_long"
  | "privacy_required";

/** Map of field name → first error key, returned to the UI on validation fail. */
export type ContactFieldErrors = Partial<Record<string, ContactFieldErrorKey>>;
