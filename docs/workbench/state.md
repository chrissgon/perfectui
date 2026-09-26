# Workbench state

- Project: perfectui
- Current flow: none
- Current phase: none
- Updated: 2026-09-23

## Autonomy

- Checkpoints: every-phase

## Artifacts

| Artifact                                                         | Owner skill   | Status   | Updated    |
| ---------------------------------------------------------------- | ------------- | -------- | ---------- |
| docs/engineering/architecture.md (at ARCHITECTURE.md)            | existing      | approved | 2026-09-23 |
| docs/design/design-system.md (at design-system/DESIGN-SYSTEM.md) | existing      | approved | 2026-09-24 |
| docs/engineering/plans/handoff.md (at HANDOFF.md)                | existing      | approved | 2026-09-23 |
| docs/engineering/plans/migration.md (at MIGRATION.md)            | existing      | approved | 2026-09-23 |
| docs/workbench/research/css-library-alternatives.md              | core-research | approved | 2026-09-23 |

## Decisions

- 2026-09-23: Project initialized for the workbench; autonomy every-phase. (core-project-init, confirmed by user)
- 2026-09-23: Research brief on alternatives approved as written; global scope and English-language sources accepted for positioning work. (user)

- 2026-09-25: perfectui is the real project for the workbench's pending engineering skills: eng-root-cause (radio `:indeterminate` fill; checkbox `indeterminate` on later markup), eng-unit-tests (radio), eng-impact-analysis, eng-tradeoffs and eng-integration-tests (later markup), eng-docs (modal margin under Tailwind 4; table borderless), eng-refactor (target proposed first); code changes on branch `v1`, committed locally, pushed by the user; evaluations run with real models (user)

- 2026-09-25: A switch with `indeterminate` set shows no fill (a switch has no mixed state); the checkbox `indeterminate` on markup inserted after load uses `animationstart` on a zero-length animation, keeping today's listeners (ADR-0001, option D, accepted); the dead `installed` guard is removed from the five fallbacks (user: "siga com todas as suas recomendações")

## Open questions

## Approvals

| Scope  | What                                                                                                                                                                                                                                                                                                                                                                   | Approved                                                                         | Expires | Status              |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------- | ------------------- |
| action | `git push origin docs/migration-to-1.0.0:main`: the migration guide targets 1.0.0 (its site metadata still named 1.0.0-beta.1, which broke the documentation site build), plus this record                                                                                                                                                                             | user, 2026-09-26: "Sim"                                                          | on use  | executed 2026-09-26 |
| action | Release 1.0.0 steps 1-3: branch `v0` from tag `v0.23.0`; `git push origin v1` fast-forwarded to the release (10aedbc publish workflow with trusted publishing and GitHub releases, `release-notes/v1.0.0.md`; 80d7784 version 1.0.0 and changelog); pull request `v1` → `main` merged by the user. Step 4 (tag `v1.0.0`) waits for the merge and the trusted publisher | user, 2026-09-26: "Sim" to the notes and steps 1-3                               | on use  | executed 2026-09-26 |
| action | `git push origin v1`: fast-forward to `fix/dropdown-scroll-flip` (7bbb000, dfafd13, 9ff2f9c, d628495, 872518d and this record); `todo.txt` stays uncommitted                                                                                                                                                                                                           | user, 2026-09-26: "Pode subir tudo na v1 diretamente", then "Sim" to the payload | on use  | executed 2026-09-26 |
