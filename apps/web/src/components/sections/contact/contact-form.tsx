"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { Locale } from "@/i18n/config";
import { t } from "@/content/types";
import {
  areaOfInterestOptions,
  contactForm,
  discretionGuarantee,
  preferredContactOptions,
} from "@/content/contact";
import { fieldErrorCopy, resultCopy } from "@/lib/contact/copy";
import type { ContactFieldErrorKey } from "@/lib/contact/schema";
import { submitContact, type ContactResult } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

/**
 * Contact request form (Client Component). Wires the `submitContact` server
 * action via `useActionState`, rendering all four states — idle, submitting
 * (disabled + spinner), success (confirmation + auto-reply note), and error
 * (top-level message, plus per-field errors mapped from the action's stable
 * keys on validation). Inputs follow DESIGN-SYSTEM: label above, 48px control,
 * accent focus ring, explicit error styling. Fully keyboard-accessible:
 * `aria-invalid` + `aria-describedby` link each control to its error, and focus
 * moves to the first invalid field (or the success panel) after a submit.
 */

const MESSAGE_MAX = 500;

export function ContactForm({ locale }: { locale: Locale }) {
  const [result, formAction] = useActionState<ContactResult | null, FormData>(
    (_prev, formData) => submitContact(formData),
    null,
  );

  const successRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [messageLength, setMessageLength] = useState(0);

  const ids = {
    name: useId(),
    phone: useId(),
    email: useId(),
    area: useId(),
    preferred: useId(),
    message: useId(),
    counter: useId(),
    privacy: useId(),
  };

  const fieldErrors =
    result && !result.ok && result.error === "validation"
      ? result.fieldErrors ?? {}
      : {};

  const topLevelErrorKey =
    result && !result.ok && result.error !== "validation"
      ? result.error
      : null;

  const isSuccess = result?.ok === true;

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  // After a server round-trip: move focus to the success panel, or to the
  // error summary (top-level or validation), so keyboard / screen-reader users
  // land on the outcome rather than staying on the submit button. On success
  // the whole form unmounts (the panel replaces it), so there is no form state
  // to reset here — only focus the announced result.
  useEffect(() => {
    if (isSuccess) {
      successRef.current?.focus();
    } else if (topLevelErrorKey || hasFieldErrors) {
      errorSummaryRef.current?.focus();
    }
  }, [result, isSuccess, topLevelErrorKey, hasFieldErrors]);

  if (isSuccess) {
    return (
      <SuccessPanel locale={locale} ref={successRef} />
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {/* Hidden plumbing: locale drives auto-reply + error language. */}
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — visually & a11y hidden; real users never fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${ids.name}-company`}>Company</label>
        <input
          id={`${ids.name}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {topLevelErrorKey && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-body-sm text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <p className="font-medium">{t(contactForm.errorTitle, locale)}</p>
          <p className="mt-1 text-error/90">
            {t(resultCopy[topLevelErrorKey], locale)}
          </p>
        </div>
      )}

      {/* Validation summary — renders when the server rejects on field errors.
          Shares `errorSummaryRef` so focus moves here after submit, routing the
          user to the problems before the per-field messages below. */}
      {!topLevelErrorKey && hasFieldErrors && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-body-sm text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <p className="font-medium">{t(contactForm.errorTitle, locale)}</p>
          <p className="mt-1 text-error/90">
            {t(contactForm.validationSummary, locale)}
          </p>
        </div>
      )}

      <Field
        id={ids.name}
        name="name"
        label={t(contactForm.name.label, locale)}
        placeholder={t(contactForm.name.placeholder, locale)}
        required
        requiredLabel={t(contactForm.requiredLabel, locale)}
        autoComplete="name"
        errorKey={fieldErrors.name}
        locale={locale}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={ids.phone}
          name="phone"
          type="tel"
          dir="ltr"
          inputMode="tel"
          label={t(contactForm.phone.label, locale)}
          placeholder={t(contactForm.phone.placeholder, locale)}
          required
          requiredLabel={t(contactForm.requiredLabel, locale)}
          autoComplete="tel"
          errorKey={fieldErrors.phone}
          locale={locale}
        />
        <Field
          id={ids.email}
          name="email"
          type="email"
          dir="ltr"
          inputMode="email"
          label={t(contactForm.email.label, locale)}
          placeholder={t(contactForm.email.placeholder, locale)}
          autoComplete="email"
          errorKey={fieldErrors.email}
          locale={locale}
        />
      </div>

      {/* Area of interest — native select for reliable mobile + a11y. */}
      <div className="flex flex-col gap-2">
        <label htmlFor={ids.area} className={labelClass}>
          {t(contactForm.area.label, locale)}
        </label>
        <div className="relative">
          <select
            id={ids.area}
            name="areaOfInterest"
            defaultValue=""
            className={cn(
              controlClass,
              // Reserve a caret gutter so option text never collides with the
              // chevron (which sits at end-4, ~2rem of inline-end reach) in RTL or LTR.
              "appearance-none pe-12 text-ink",
            )}
          >
            <option value="" disabled>
              {t(contactForm.area.placeholder, locale)}
            </option>
            {areaOfInterestOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.label, locale)}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-slate"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Preferred contact — radio group. */}
      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>
          {t(contactForm.preferredContact.label, locale)}{" "}
          <RequiredMark label={t(contactForm.requiredLabel, locale)} />
        </legend>
        <div
          role="radiogroup"
          aria-describedby={
            fieldErrors.preferredContact ? ids.preferred : undefined
          }
          className="mt-1 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          {preferredContactOptions.map((opt, i) => (
            <label
              key={opt.value}
              className="group/radio relative flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-border bg-paper px-4 py-3 text-body-base text-ink transition-colors duration-200 hover:border-border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-tint/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-paper"
            >
              <input
                type="radio"
                name="preferredContact"
                value={opt.value}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-60 transition-colors duration-200 peer-checked:border-accent peer-checked:bg-accent"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-paper opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
              </span>
              <span>{t(opt.label, locale)}</span>
            </label>
          ))}
        </div>
        {fieldErrors.preferredContact && (
          <FieldError
            id={ids.preferred}
            errorKey={fieldErrors.preferredContact}
            locale={locale}
          />
        )}
      </fieldset>

      {/* Message + live char counter. */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor={ids.message} className={labelClass}>
            {t(contactForm.message.label, locale)}
          </label>
          <span
            id={ids.counter}
            aria-live="polite"
            className={cn(
              "font-mono text-caption tabular-nums",
              messageLength > MESSAGE_MAX ? "text-error" : "text-slate",
            )}
          >
            {t(contactForm.message.counter, locale).replace(
              "{n}",
              String(messageLength),
            )}
          </span>
        </div>
        <textarea
          id={ids.message}
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          placeholder={t(contactForm.message.placeholder, locale)}
          aria-describedby={
            fieldErrors.message
              ? `${ids.message}-error ${ids.counter}`
              : ids.counter
          }
          aria-invalid={fieldErrors.message ? true : undefined}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={cn(
            controlClass,
            "min-h-[120px] resize-y py-3 leading-relaxed",
            fieldErrors.message && errorControlClass,
          )}
        />
        {fieldErrors.message && (
          <FieldError
            id={`${ids.message}-error`}
            errorKey={fieldErrors.message}
            locale={locale}
          />
        )}
      </div>

      {/* Privacy acknowledgment. */}
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacyAck"
            value="on"
            aria-invalid={fieldErrors.privacyAck ? true : undefined}
            aria-describedby={
              fieldErrors.privacyAck ? ids.privacy : undefined
            }
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border bg-paper transition-colors duration-200 peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper",
              fieldErrors.privacyAck ? "border-error" : "border-slate-60",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-paper opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
            >
              <path d="M5 12l4.5 4.5L19 7" />
            </svg>
          </span>
          <span className="text-body-sm text-slate-strong">
            {t(contactForm.privacy.label, locale)}{" "}
            <RequiredMark label={t(contactForm.requiredLabel, locale)} />
          </span>
        </label>
        {fieldErrors.privacyAck && (
          <FieldError
            id={ids.privacy}
            errorKey={fieldErrors.privacyAck}
            locale={locale}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <SubmitButton locale={locale} />
        <p className="text-center text-caption text-slate">
          {t(discretionGuarantee.short, locale)}
        </p>
      </div>
    </form>
  );
}

/** Submit button — reads `useFormStatus` for the in-flight (submitting) state. */
function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        "group/btn relative inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-lg bg-accent px-6 text-body-base font-medium text-paper shadow-card transition-[background-color,transform,box-shadow] duration-200 ease-premium",
        "hover:bg-accent-hover hover:-translate-y-px hover:shadow-card-hover active:translate-y-0 active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        "disabled:pointer-events-none disabled:opacity-70",
      )}
    >
      {pending && (
        <svg
          className="h-4 w-4 animate-spin text-paper/90"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            className="opacity-25"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span>
        {pending
          ? t(contactForm.submitting, locale)
          : t(contactForm.submit, locale)}
      </span>
    </button>
  );
}

/** Success state — replaces the form with a calm, reassuring confirmation. */
function SuccessPanel({
  locale,
  ref,
}: {
  locale: Locale;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center rounded-2xl border border-border-accent bg-wash/60 px-6 py-12 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:px-10"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-accent-tint text-accent ring-1 ring-accent-soft/70">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </span>
      <h3 className="mt-5 text-display-md text-ink">
        {t(contactForm.successTitle, locale)}
      </h3>
      <p className="mt-3 max-w-md text-body-base text-slate">
        {t(resultCopy.success, locale)}
      </p>
      <p className="mt-4 text-body-sm text-slate">
        {t(contactForm.autoReplyNote, locale)}
      </p>
    </div>
  );
}

/* ---- Shared field primitives ---------------------------------------------- */

const labelClass = "text-body-sm font-medium text-ink";

const controlClass =
  "h-12 w-full rounded-lg border border-border bg-paper px-4 text-body-base text-ink shadow-[inset_0_1px_0_rgba(20,32,46,0.02)] transition-[border-color,box-shadow] duration-200 placeholder:text-slate hover:border-border-accent focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const errorControlClass =
  "border-error focus-visible:border-error focus-visible:ring-error/40";

function RequiredMark({ label }: { label: string }) {
  return (
    <span className="text-accent">
      <span aria-hidden>*</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  requiredLabel,
  autoComplete,
  inputMode,
  dir,
  errorKey,
  locale,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  requiredLabel?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  dir?: "ltr" | "rtl";
  errorKey?: ContactFieldErrorKey;
  locale: Locale;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        {required && requiredLabel && <RequiredMark label={requiredLabel} />}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        dir={dir}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={errorKey ? true : undefined}
        aria-describedby={errorKey ? errorId : undefined}
        className={cn(controlClass, errorKey && errorControlClass)}
      />
      {errorKey && (
        <FieldError id={errorId} errorKey={errorKey} locale={locale} />
      )}
    </div>
  );
}

function FieldError({
  id,
  errorKey,
  locale,
}: {
  id: string;
  errorKey: ContactFieldErrorKey;
  locale: Locale;
}) {
  return (
    <p id={id} className="flex items-center gap-1.5 text-body-sm text-error">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
      <span>{t(fieldErrorCopy[errorKey], locale)}</span>
    </p>
  );
}
