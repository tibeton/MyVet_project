# CLAUDE.md

Claude Code auto-loads this file. The house rules live in `AGENTS.md` (shared
with other agent tooling), imported below so they are always in context.

@AGENTS.md

## Start of session

Someone else may have pushed since your last run. Before making changes:

```bash
git fetch origin && git log --oneline HEAD..origin/main
```

If that lists commits, pull before editing (`git pull --ff-only origin main`) —
otherwise you will edit stale files and create avoidable conflicts.

`CHANGELOG.md` explains *why* recent changes were made. `git log` / `git diff`
are the authority on *what* changed. Neither replaces reading the code you touch.
