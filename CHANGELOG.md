# Changelog

Human-readable log of notable changes. Newest first.

**Scope:** decisions, gotchas, and user-visible behaviour — not a file-by-file
diff. For "what files changed", use git (`git log --oneline`, `git diff --stat`);
it is always accurate and costs nothing to maintain. Put things here that git
*cannot* tell you: why a change was made, and what will break if it is undone.

Format: one `##` block per change set, newest at the top.

---

## 2026-07-26 — Reviews copy no longer promises Google prematurely

### Fixed
- The reviews lead said "Яндекс.Карт и Google" unconditionally while the badge,
  CTA and cards were all correctly gated behind real Google data — so the page
  advertised Google reviews that were not shown. The sentence now switches to
  `leadMulti` only once `googleReviewsUrl` is set.

---

## 2026-07-26 — Logo, Telegram, dropdowns, Google reviews

### Fixed
- Header logo did nothing when tapped: it linked to the page you were already
  on. It now scrolls to top (and closes the mobile menu), keeping the href so
  middle-click still opens the home page.
- Dropdowns ran past the fold. Astryx ships a fixed `max-height: 300px` that
  ignores available space, so a trigger low on screen opened a list partly
  off-screen — sometimes above the trigger, leaving the first option
  unreachable. Capped to `min(18rem, 45dvh)` and the service field now centres
  itself before opening.
- Section boundaries: same-background pairs are back to half-gaps. Equal padding
  does not mean equal-looking gaps — see the note in `globals.css`.

### Changed
- Telegram split by context: `telegramContact` (t.me/ContactMyVet) for the
  Contact section, `telegramChannel` (t.me/myvetuz) for footer socials and
  JSON-LD `sameAs`.
- Reviews support multiple sources. `Review.source` is `"yandex" | "google"`
  (defaults to Yandex), cards show the matching mark, and copy now reads
  "Yandex Maps and Google" in all three locales.

**Google reviews need real data before they appear.** `googleReviewsUrl`,
`googleRating` and `googleReviewsCount` in `lib/site.ts` are intentionally
empty, and the Google badge/CTA render only once they are filled from the real
Google Business Profile. Review text must be pasted verbatim like the Yandex
ones — do not invent reviews for a live clinic.

---

## 2026-07-26 — Uniform section rhythm

### Changed
- Every section boundary is now one value (130px desktop / 72px mobile). It was
  130px at two boundaries and 259px at six.
- `.section` padding halved: each section contributes *half* a boundary, and two
  adjacent sections sum to the full gap.
- Removed `pt-0` from `#why` and Stats. Those overrides were the cause of the
  drift, not a fix — zeroing one section's padding-top halves only that boundary.
  With halved padding they are unnecessary and those two gaps are unchanged.

Tinted bands (Team, Prices, FAQ) now carry 65px internal padding on desktop,
36px on mobile. If that reads as cramped, add `py-*` to those three sections
rather than reverting the system.

---

## 2026-07-26 — Section alignment and spacing rhythm

### Fixed
- **FAQ and Team had their content centred under a left-aligned heading.** Every
  `SectionHeading` on the site is left-aligned (nothing passes `align="center"`),
  but both sections wrapped content in `mx-auto max-w-3xl`, offsetting it by
  231px from the heading. Dropping `mx-auto` puts every left edge on the same
  line. If you deliberately want a centred section, pass `align="center"` to
  `SectionHeading` rather than centring only the content.

### Changed
- Normalised the heading→content rhythm to 48px: Reviews marquee `mt-11` → `mt-12`,
  and the Services CTA row `mt-8` → `mt-10` to match the equivalent row in Reviews.
- Left as-is on purpose: `#why` (16px — its heading sits inside its own card, so
  48px looks oversized) and `#prices` (28px — two-column layout where the heading
  is a sidebar, not a section header).

---

## 2026-07-26 — Agent docs, hero copy, spacing

### Added
- `CLAUDE.md` (auto-loaded by Claude Code) importing `AGENTS.md`, plus a
  project skill at `.claude/skills/myvet-ui/`. The skill carries the detailed
  conventions and loads only when doing visual work; `AGENTS.md` keeps the
  always-on essentials. After pulling this, restart Claude Code once — a newly
  created `.claude/skills/` directory is not picked up mid-session.
- `.githooks/pre-commit` requiring a CHANGELOG entry for changes under
  `app/`, `components/`, `lib/`. Enable per clone:
  `git config core.hooksPath .githooks`.

### Changed
- Hero shows the value proposition as real text under the logo artwork. The
  artwork is only the brand mark ("MyVet.Uz · Ветеринарная клиника"), so on
  mobile the hero was a logo and two buttons with nothing explaining the
  business. Kept as text, not baked into the SVG, so it stays translatable and
  indexable.
- Health-card cat is now female — `Мурка` / `кошка · 3 года` (was `Барсик` /
  `кот`). `mushuk` and `cat` are genderless, so only the Russian meta changed.
- Pet switcher raised to `bottom-8` for breathing room above the plate edge.
- `#why` section: `pt-0`, so it sits closer to the block above.

### Fixed
- Hero `<h1>` alt text described the headline instead of what the image
  actually shows, misleading screen readers and search engines. It now
  describes the brand mark.

---

## 2026-07-26 — Astryx design system, form rework, spacing fixes

### Added
- `@astryxdesign/core`, `theme-neutral`, `cli`. Brand theme in
  `lib/myvetTheme.ts` (`extends: neutralTheme`, overrides accent + fonts);
  built artifacts `lib/myvet.{css,js,d.ts}` via `npx astryx theme build`.
- `<Theme>` wraps the whole site in `app/[locale]/layout.tsx`.
- Booking form uses Astryx `TextInput` / `Selector` / `TextArea` / `Button` /
  `InputGroup`; price rows use Astryx `Item`.
- `npm run check:css` (also on `prebuild`) guards the cascade-layer order.
- "Coming soon" stamp over the hero health card (`components/PetCard.tsx`) —
  it is a v2 mockup, not real data.

### Changed
- Phone field: `+998` is a fixed `InputGroupText` prefix and can no longer be
  deleted; input holds the 9-digit national part, auto-formatted `XX XXX XX XX`.
  Pasting `+998 …`, `998…` or `8 …` normalises correctly. API receives `+998 <n>`.
- Питомец is now required; Комментарий stays optional. No required/optional
  markers are rendered — Astryx ships English strings only, so any marker would
  appear untranslated on the ru/uz locales.
- Service dropdown: Diagnostics option now lists рентген / rentgen / X-ray.
- Stats banner: taller (`py-16 sm:py-20`), flush to the block above (`pt-0`).
- `#why` section: `pt-0`.

### Fixed
- **Fonts were never applying.** `@theme inline` does not emit vars to `:root`,
  so `.font-display` / `body` resolved to nothing and the site silently rendered
  in system `ui-sans-serif`. Manrope/Onest now actually load.
- Text wrapping in CTAs and header nav (hero buttons, nav links, and the phone
  number, which split mid-number at 1280px).
- Stats numbers rendered near-black on the purple banner: they relied on
  inherited colour, and Astryx sets `color` directly on `p`, which beats
  inheritance. Now explicit `text-on-accent`.
- Four separate bugs from the same root cause — see the unlayered-CSS rule in
  `AGENTS.md`.
