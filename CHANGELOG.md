# Changelog

Human-readable log of notable changes. Newest first.

**Scope:** decisions, gotchas, and user-visible behaviour — not a file-by-file
diff. For "what files changed", use git (`git log --oneline`, `git diff --stat`);
it is always accurate and costs nothing to maintain. Put things here that git
*cannot* tell you: why a change was made, and what will break if it is undone.

Format: one `##` block per change set, newest at the top.

---

## 2026-07-27 — Leadership block, nav, prices, services lead

### Changed
- The team section is leadership, not staff: kicker "Руководство", new heading,
  and full names with real roles — Улугбек Баходирович Юлдашев (главный врач,
  хирург) and Наргиза Фарходовна Ахадова (учредитель, директор), in ru/uz/en.
- Removed the "Врачи" link from the header nav. The footer still links to the
  section, so `nav.team` was relabelled "Руководство" / "Rahbariyat" /
  "Leadership" rather than left saying "Врачи" and pointing at leadership.
- Ultrasound diagnostics: 120 000 → 150 000.
- New services lead across all three locales.

The services heading is still "Полный спектр ветеринарной помощи" and the new
lead opens with the same words. Reads as repetition — worth changing one of them.

---

## 2026-07-27 — Teeth service removed; visit count corrected; mobile header

### Removed
- **All teeth/dentistry content.** The service card, marquee entry, meta
  mention, booking-dropdown option and the price line are gone from ru/uz/en.
  Services renumbered 01–09, which also lands them in a clean 3x3 grid.
- The one surviving mention of зубы is inside a real customer review and was
  left verbatim — review text is never edited.

### Changed
- `30 000+` visits → `7 000+`.
- Header bar is 94% opaque when scrolled (was 80%) and gets its own compositing
  layer. On iOS Safari the backdrop blur drops out mid-scroll, and at 80% the
  hero CTA showed straight through the bar as though it sat above it.

**Unverified on device.** The header fix could not be reproduced in the desktop
browser — iOS Safari's address-bar collapse and blur behaviour do not emulate.
It is the standard mitigation, but confirm on a real iPhone.

If you still sell teeth cleaning, the price line is the one thing worth
restoring: `{ name: "Чистка зубов (ультразвук)", price: "от 250 000" }`.

---

## 2026-07-27 — Factual corrections and new services

### Removed — claims the clinic cannot make
- **In-house laboratory.** There isn't one. Stripped from meta description,
  hero lead, marquee, the Diagnostics service and the why-us points across
  ru/uz/en. Diagnostics still lists УЗИ / рентген / анализы — only the claim of
  owning a lab is gone.
- **Anaesthesia monitoring.** Removed from the Surgery service copy and tags.

### Corrected
- The clinic opened **1 October 2022**, not 12 years ago, and has **5** vets,
  not 8. Stats now read "с 2022" rather than a year count, so the figure cannot
  go stale between deploys. `site.yearFounded` corrected 2014 → 2022.

### Changed
- **WhyUs and Stats merged.** Two separate "trust us" sections competed; the
  numbers now sit inside the why-us block, under a divider, and the standalone
  accent band (`components/Stats.tsx`) is deleted.
- The why-us point vacated by the laboratory is now "Своё зоотакси".

### Added
- Four services: Стационар, Зоогостиница, Зоотакси, Чек-ап (ru/uz/en).

### Still unverified
`30 000+ приёмов` was left untouched, but it was written alongside the wrong
"12 years". Over ~3 years 9 months it implies ~22 visits every single day —
plausible for a 24/7 clinic, but worth confirming before it stays on a live site.

---

## 2026-07-27 — Review CTAs reduced to score chips

### Changed
- The two review buttons drop their text labels and keep logo, score, count and
  a small arrow. 161x42 each (was 405x66), and they now fit side by side even at
  375px instead of stacking — the row went from ~224px tall on phones to 42px.

The label still exists as `aria-label` / `title`, so screen readers and hover
tooltips get "Все отзывы на Яндексе" rather than an unlabelled link. Don't drop
those attributes when editing: with no visible text they are the only accessible
name the link has.

---

## 2026-07-27 — Favicon uses the header mark

### Changed
- `public/favicon.svg` is now the header logo (`public/Logo.svg`) scaled onto
  the brand square, replacing the simplified paw drawing.

The brand square is not decoration: the header artwork is white on a
transparent background, so used as-is the favicon disappears on a light browser
tab. If `Logo.svg` is ever redrawn, regenerate the favicon the same way
(fit the 90x102 viewBox into 64x64 with 8px padding) rather than pointing
`icons.icon` straight at it.

---

## 2026-07-27 — Circular marks, shorter Yandex label, equal-width CTAs

### Changed
- Both review CTAs are exactly the same size. Laid out as a `w-fit` grid rather
  than flex, so the columns take the width of the wider button instead of each
  sizing to its own text (they were 409px vs 382px). The label is `nowrap` too —
  at ~900px the longer Yandex label wrapped to two lines while Google's stayed
  on one, so equal boxes still looked unequal.
- Platform marks are circles (`rounded-full`), so the square Yandex PNG matches
  Google's round glyph.
- Yandex CTA drops "Картах": "Все отзывы на Яндексе" / "Yandexdagi barcha
  fikrlar" / "All reviews on Yandex". Saves ~50px, which matters most on phones
  where the two CTAs stack.

---

## 2026-07-27 — Real platform logos and Google score

### Added
- Google rating `4.3 · 114`, so both CTAs now carry a score and read as a
  matched pair.
- Real logo files (`public/yandexlogo.png`, `public/googlelogo.png`) replace the
  CSS-drawn "Я" and "G" marks.

### Changed
- Both CTAs share one `ReviewsCta` component — they were duplicated markup.

### Note for whoever adds art next
`googlelogo.png` arrived 2820px with roughly two-thirds transparent padding, so
at a shared box size the "G" rendered far smaller than the Yandex mark. Scaling
it inside a clipped box just showed an empty white square. It is now cropped to
its glyph (1100px), which is the durable fix — prefer trimming the asset over
compensating in CSS. Both files must live in `public/`; at the repo root Next
does not serve them.

---

## 2026-07-26 — Google reviews button; lead copy de-branded

### Added
- "Все отзывы в Google" button beside the Yandex control, pointing at the
  Google reviews panel. Session parameters (`ved`, `sa`, `biw`, `bih`, `dpr`,
  `sca_esv`) were stripped from the supplied URL — only `q` and `si` matter.
  If it ever stops opening reviews, swap in the Maps short link noted in
  `lib/site.ts`.
- Deliberately no score on the Google button: there is no verified rating for
  it, and the button stands on its own without inventing one.

### Changed
- Reviews lead no longer names Yandex ("Реальные отзывы владельцев наших
  пациентов") — the section read like an advert for the platform rather than
  the clinic. Platform names now live only on the buttons, where they are
  destinations rather than claims.
- CTA row stacks on phones and sits side by side from `sm` up.

---

## 2026-07-26 — Reviews: Yandex only, one merged CTA

### Removed
- All Google review support (config, `Review.source`, marks, second badge and
  CTA, `googleBadge` / `googleCta` / `leadMulti`). Google Maps renders client
  side so the rating and review text cannot be read programmatically, and they
  will not be invented — a half-wired feature was worse than none.
- Per-card links to Yandex. Cards are plain `<article>`s now; the single CTA
  below the carousel is the only route out.

### Changed
- Rating and "all reviews" merged into one control: the score is the reason to
  click through, so separated they left an inert badge and an unsubstantiated
  button. Stacks on phones — side by side, the score and a 27-character label
  both wrapped mid-value.

### Superseded
- The two entries below (Google link wiring, and the lead-copy fix) are undone
  by this change. Kept for history.

---

## 2026-07-26 — Google reviews link wired up

### Added
- `googleReviewsUrl` now points at the real listing (maps.app.goo.gl short link,
  place id `0x38aef59d4c300139`, verified against `site.geo`), so the
  "Все отзывы в Google" button under the carousel is live.
- `googleWriteReviewUrl` stored for a future "leave a review" CTA.

Still outstanding, and only fillable by hand: `googleRating` /
`googleReviewsCount` (the badge stays hidden until both are set) and the Google
review entries themselves in `lib/reviews.ts` (`source: "google"`), copied
verbatim like the Yandex ones.

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
