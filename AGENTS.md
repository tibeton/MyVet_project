# AGENTS.md

Project-specific guidance for AI coding agents.

## Conventions live in a skill

The detailed conventions, known traps, and Astryx workflow for this repo are in
the **`myvet-ui`** skill (`.claude/skills/myvet-ui/`). Load it before any visual
or CSS change — it carries the diagnostic shortcuts, so it is kept there rather
than here to avoid paying for it in sessions that never touch UI.

Tripwire, in case that skill has not loaded: if a Tailwind utility or an Astryx
style appears to do nothing, the cause is almost certainly an **unlayered rule
in `app/globals.css`** outranking it — unlayered CSS beats every cascade layer.
Check that before debugging anything else; it has caused four separate bugs here.
Never reorder the `@layer` statement at the top of that file (`npm run check:css`
guards it, and also runs on `prebuild`).

## Before you commit

Add a `CHANGELOG.md` entry (newest at top) for anything that changes behaviour,
layout, or a decision — record *why* and what breaks if undone, not a file list.
Use `git log` / `git diff --stat` for file lists. Skip the entry for pure
refactors and typo fixes. A pre-commit hook enforces this for `app/`,
`components/`, `lib/`; enable it once per clone:

    git config core.hooksPath .githooks

`main` is shared and edited in parallel by two people — pull before you start and
push promptly, because unpushed work is invisible to the other side.

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
