# Changelog

Human-readable log of notable changes. Newest first.

**Scope:** decisions, gotchas, and user-visible behaviour — not a file-by-file
diff. For "what files changed", use git (`git log --oneline`, `git diff --stat`);
it is always accurate and costs nothing to maintain. Put things here that git
*cannot* tell you: why a change was made, and what will break if it is undone.

Format: one `##` block per change set, newest at the top.

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
