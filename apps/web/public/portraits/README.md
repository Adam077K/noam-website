# Hero portraits

Drop the founder portraits here as:

- `kitrey-1.png` — primary hero portrait (used by default)
- `kitrey-2.png` — alternate

## How they are used

The hero renders the portrait as a **CSS `background-image`** (not `next/image`), so a
missing file degrades gracefully to the clean bone background with a hairline frame —
never a broken-image icon, and the build never fails on an absent asset.

The image is art-directed in CSS as a **warm duotone** (ink `#16140f` → bone `#faf7f1`):
grayscale + a warm overlay blended over the paper, so it fuses with the editorial
palette rather than reading as a stock headshot.

## Swapping which portrait is used

The hero portrait element carries a class. To switch from `kitrey-1` to `kitrey-2`,
change `portrait--1` to `portrait--2` on the portrait `<div>` in
`src/components/sections/home/hero.tsx` (the two variants are defined in
`src/app/globals.css`).

## Recommended source image

Portrait orientation (roughly 3:4), shoulders-up, neutral/plain background, even
lighting. The duotone treatment handles tone/colour — supply a clean, well-exposed
original. Keep the subject's face toward the **upper** portion of the frame so the
hairline-framed crop keeps the eyes in view.
