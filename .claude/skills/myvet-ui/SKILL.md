---
name: myvet-ui
description: Conventions and known traps for the MyVet veterinary clinic site (Next.js 16 + Tailwind v4 + Astryx design system). Use this whenever you touch anything visual in this repo — editing components, changing colours/spacing/padding/fonts, adding or modifying form fields, working with Astryx components, or debugging why a CSS change appears to have no effect. Especially important when a style "doesn't apply", a utility class seems ignored, text renders the wrong colour or weight, or a button/input looks wrong: this project has four documented cascade-layer traps that make such failures silent, and rediscovering them from scratch wastes a lot of time. Also consult it before committing UI changes, since this repo requires a CHANGELOG entry.
---

# MyVet UI work

Stack: Next.js 16 (App Router, Turbopack) · Tailwind v4 · Astryx design system ·
trilingual ru/uz/en via `lib/i18n.ts` · single light theme.

## First: if a style isn't applying, read this before debugging

This project has bitten four separate times with the same root cause, and every
time the symptom looked like something else. Check this first — it takes seconds
and saves a long hunt.

**Unlayered CSS beats every cascade layer.** Plain rules in `app/globals.css`
(outside any `@layer`) outrank *both* Tailwind utilities and Astryx's own
component styles, no matter how specific your class is. So a utility can look
correct in the markup and do nothing.

Diagnose by comparing intent to reality in the browser rather than reasoning
about specificity:

```js
getComputedStyle(el).paddingTop   // vs the pt-0 you wrote
```

If they disagree, grep `globals.css` for a rule matching that element and check
whether it sits inside a `@layer`.

Rules already moved into layers — leave them there:

| Rule | Layer | If unlayered again |
|---|---|---|
| `* { border-color }` | `base` | Astryx error/focus borders render in `--line`, not red |
| `:focus-visible` ring | `base` | Ring outlines Astryx's *inner* input — wrong size and radius |
| `.section { padding-block }` | `components` | `pt-0` / `py-*` silently do nothing |

**`.font-display` must stay unlayered on purpose** — it relies on outranking
Astryx's heading rules. Don't "fix" it.

The layer order itself is load-bearing in two opposite directions, which is why
it is guarded by `npm run check:css` (also runs on `prebuild`):

```
@layer theme, base, astryx-base, astryx-theme, reset, components, utilities;
```

- Astryx below Tailwind `base` → preflight's `button { background: transparent }`
  strips Astryx button fills.
- Astryx above `utilities` → Astryx's `:where(h1..h6)` rules beat
  `font-extrabold` and flatten headings site-wide.

## Second trap: colour is not inherited reliably

Astryx sets `color` directly on `p` and headings, and a direct declaration beats
inheritance. Text inside a coloured block must state its own colour:

```tsx
// inside <div className="bg-accent text-on-accent">
<p className="… text-on-accent">{value}</p>   // needed; won't inherit
```

This is what turned the Stats numbers near-black on the purple banner.

## Fonts

The `@theme` block in `globals.css` is `@theme inline`, which means Tailwind does
**not** emit those variables to `:root` — it only inlines them into generated
utilities. Anything hand-written that reads `var(--font-display)` /
`var(--font-body)` needs them declared in the real `:root` block, and the
`next/font` variable classes live on `<html>` (not `<body>`) so `:root` can
resolve `--font-manrope` / `--font-onest`.

Getting this wrong is invisible: fonts still download, the page just silently
renders in system `ui-sans-serif`.

## Working with Astryx

Discover the API instead of guessing — the CLI is authoritative and cheap:

```bash
npx astryx component <Name>     # props + examples
npx astryx search "<thing>"     # find a component
npx astryx docs <topic>         # tokens, layout, theme, internationalization…
```

Project-specific findings worth not rediscovering:

- **`Button` has no `href`.** CTA navigation stays as `<a>`. Converting to
  `<button>` breaks middle-click and open-in-new-tab, and contradicts Astryx's
  own "don't use buttons for navigation" guidance.
- **`TextInput` has no `inputMode` / `autoComplete`.** The phone field sets them
  on the underlying `<input>` via a ref — without `inputMode` mobile keyboards
  show a full keyboard instead of a numeric pad.
- **`InputGroup` owns the field shell.** Put `status` on the *group*, not the
  inner input, or the validation message silently doesn't render.
- **Astryx ships English strings only.** `isRequired` / `isOptional` render an
  untranslated "Required"/"Optional" on the ru/uz locales. This site marks
  neither — all fields except the comment are required, so markers add nothing.
  If you ever need them, supply catalogues via `InternationalizationProvider`.
- Theme lives in `lib/myvetTheme.ts` and **must** `extends: neutralTheme` — a
  bare `defineTheme` with a few tokens leaves components unstyled (buttons
  rendered transparent). Rebuild artifacts after editing:
  `npx astryx theme build lib/myvetTheme.ts`.
- `<Theme>` already wraps the whole site in `app/[locale]/layout.tsx`. Don't add
  per-component wrappers.

## The hero health card is a mockup

`components/PetCard.tsx` is a non-functional v2 placeholder — the vitals
("Барсик", 92 уд/мин…) are hardcoded strings from the i18n dict, deliberately
greyed out behind a "coming soon" stamp. Don't wire it to real data without
building the feature behind it, and keep the stamp until that feature exists so
visitors aren't shown fake health readings as if they were real.

## Content changes are trilingual

Any user-facing string lives in `lib/i18n.ts` and must be added to **all three**
locales (ru, uz, en). A missing key is a TypeScript error, which is the good
case; a forgotten *translation* is not, so check all three read naturally.

## Verifying your change

The dev server serves **stale CSS** surprisingly often. If an edit to
`globals.css` seems to do nothing, this is usually why:

```bash
rm -rf .next && npm run dev
```

Then verify in the browser rather than trusting the markup — measure the thing
you changed (`getComputedStyle`), and check both a wide and a narrow viewport
plus at least one non-Russian locale, since Uzbek strings are the longest and
are what expose text-wrapping problems.

Finally:

```bash
npm run build     # runs check:css + TypeScript
```

## Before committing

Add a `CHANGELOG.md` entry (newest at top) for anything that changes behaviour,
layout, or a decision — record *why* and what breaks if undone, not a file list.
A pre-commit hook enforces this for changes under `app/`, `components/`, `lib/`;
enable it once per clone with `git config core.hooksPath .githooks`.

`main` is shared between two people working in parallel, so pull before you start
(`git fetch origin && git log --oneline HEAD..origin/main`) and push promptly —
unpushed work is invisible to the other side.
