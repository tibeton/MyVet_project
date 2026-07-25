# AGENTS.md

Project-specific guidance for AI coding agents.

## MyVet — house rules (read before touching CSS or the hero)

**Do not reorder the `@layer` statement at the top of `app/globals.css`.**
Tailwind and Astryx both ship cascade layers and the order is load-bearing in
two opposite directions — both failures are silent (build passes, only pixels
are wrong):
- Astryx below Tailwind `base` → preflight's `button { background: transparent }`
  strips Astryx button fills.
- Astryx above `utilities` → Astryx's `:where(h1..h6)` rules beat
  `font-extrabold`/`font-bold` and flatten headings site-wide.

`npm run check:css` (also wired to `prebuild`) enforces `base < astryx-base < utilities`.

**Fonts:** the `@theme` block in `globals.css` is `@theme inline`, so Tailwind
does *not* emit those vars to `:root`. Anything hand-written that references
`var(--font-display)` / `var(--font-body)` needs them declared in the real
`:root` block. The `next/font` variable classes live on `<html>` (not `<body>`)
so `:root` can resolve `--font-manrope` / `--font-onest`.

**Hero health card (`components/PetCard.tsx`)** is a non-functional mockup for
v2 — hardcoded vitals from the i18n dict, greyed out behind a "coming soon"
stamp. Don't wire it to real data without building the feature behind it.

**CTA links stay `<a>`, not Astryx `Button`.** Astryx `Button` has no `href`,
and its own guidance says not to use buttons for navigation. Converting them
would break middle-click / open-in-new-tab.

<!-- ASTRYX:START -->
Astryx v0.1.8 · 153 components
CLI: run every command as `npx astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing. Full page → AppShell; sidebar nav → SideNav.
- Frame first: pick the shell (AppShell / Layout+LayoutPanel) and budget regions in px BEFORE writing content (`astryx docs layout`).
- Dense data = rows (Table, List/Item) edge-to-edge — never Card-wrapped list items. Card = dashboard widgets, galleries, settings groups only.
- Status → StatusDot/Token; Badge only for counts and enumerated states, never decoration.
- Custom styling: component props first; else Tailwind utilities backed by tokens (bg-surface, text-primary, rounded-lg) via tailwind-theme.css. No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-* in :root.
- SELF-CHECK before you finish: re-read the file and replace any style={{…}}, raw <div>/<span> layout, imported .css/@apply, or hardcoded/arbitrary value (e.g. bg-[#fff], p-[13px]) with the component or a token-backed utility. If unsure a component/prop exists, run `astryx component <Name>` / `astryx search "<thing>"`; don't hand-roll CSS.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   153 components by category
  template --list    page + block recipes
  docs <topic>       color, elevation, icons, illustrations, internationalization, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->
