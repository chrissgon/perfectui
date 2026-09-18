# Perfect UI — instructions for Claude Code

Perfect UI is a lightweight, customizable CSS/JS library that provides the bare minimum to build applications.
The project is migrating from `0.23.0` (SCSS) to `1.0.0` (native CSS + native HTML APIs).

## Always

- Read and follow @ARCHITECTURE.md before any change. Its **Hard rules (§2)** are never broken.
- Read @HANDOFF.md for current status and next steps.
- Work **one phase at a time** (ARCHITECTURE.md §15). Stop at the end of each phase, report, and wait for approval.
- Ask the maintainer when something is not covered by ARCHITECTURE.md. Do not guess. Add new questions to §14.
- After each phase: update the checklist in ARCHITECTURE.md §15 and the status in HANDOFF.md.
- Run `bun run build` and `bun run size` before finishing a phase. Report gzip sizes vs baseline.

## Communication with the maintainer

- Reply in **Portuguese (Brazil)**, simple and clear.
- Short bullets. Brief explanations.
- Questions always as a numbered list.
- Code, comments, commits and docs in **English**.

## Conventions

- Package manager: **bun**.
- Commits: Conventional Commits (commitlint is configured). Breaking changes use `!` and `BREAKING CHANGE:`.
- `pre-commit` runs lint-staged, which formats and lints **only the staged files** and stages the result back. Do not run `bun run format` before committing to compensate; that is what produced a long tail of `style:` commits before lint-staged existed.
- CI runs lint, typecheck, build, size and the Playwright suites on every push and pull request.
- Branch for the migration: `v1`.
- Do not change the approved size multipliers (ARCHITECTURE.md §4.1) without asking.

## Skill

- Use the `senior-frontend-architect` skill for architecture, review and CSS/JS library work.
