# Contact backend — client integration contract

The Contact page UI calls one server action. It owns no JSX — you build the form.

## Action

```ts
import { submitContact, type ContactResult } from "@/app/actions/contact";
// submitContact(formData: FormData): Promise<ContactResult>
```

## Input — `FormData` field names (send these exact keys)

| key | required | notes |
|---|---|---|
| `name` | yes | 2–80 chars |
| `phone` | yes | Israeli mobile; `05XXXXXXXX`. `+972`/spaces/dashes are normalized server-side |
| `email` | no | RFC email if present; omit or "" if blank |
| `areaOfInterest` | no | one of: `male_sexual_function` `functional_urology` `specialized_care` `other` `prefer_not_to_say` |
| `preferredContact` | yes | `phone` or `email` |
| `message` | no | ≤ 500 chars |
| `privacyAck` | yes | send `"on"` or `"true"` when checked |
| `company` | — | HONEYPOT: render a hidden, off-screen input; leave empty |
| `locale` | yes | `"he"` or `"en"` — drives auto-reply + error language |

## Return — discriminated union

```ts
type ContactResult =
  | { ok: true }
  | { ok: false;
      error: "validation" | "rate_limit" | "send" | "server";
      fieldErrors?: Partial<Record<string, ContactFieldErrorKey>>; // validation only
      retryAfterSeconds?: number;                                   // rate_limit only
    };
```

`fieldErrors` maps a field name → a **stable key**. Resolve to bilingual text with
`fieldErrorCopy[key]` and `t(value, locale)` from `@/lib/contact/copy`.
`ContactFieldErrorKey` values: `name_too_short` `name_too_long` `phone_invalid`
`email_invalid` `preferred_contact_required` `message_too_long` `privacy_required`.

Top-level message copy for the 4 states lives in `resultCopy` (`success` / `send` /
`rate_limit` / `server`) in `@/lib/contact/copy` — resolve with `t(resultCopy.X, locale)`.

A filled honeypot returns `{ ok: true }` silently (no email sent).

## Client usage (useActionState) — 4 states

```tsx
"use client";
import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";

const [result, action, pending] = useActionState(
  (_: unknown, fd: FormData) => submitContact(fd), null,
);
// <form action={action}> … <input name="locale" type="hidden" value={locale} /> …
// idle:       result === null            → show form
// submitting: pending === true           → disable submit, show "Sending…"
// success:    result?.ok === true        → show resultCopy.success, clear form
// error:      result && !result.ok       → switch on result.error:
//   "validation" → render result.fieldErrors per field via fieldErrorCopy
//   "rate_limit" → resultCopy.rate_limit ; "send" → resultCopy.send ; "server" → resultCopy.server
```
