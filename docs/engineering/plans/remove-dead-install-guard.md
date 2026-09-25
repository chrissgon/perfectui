# Plan: remove-dead-install-guard

- Task: remove the `installed` guard from the five fallbacks (proposed by the workbench's eng-refactor run, approved by the user on 2026-09-25)
- Date: 2026-09-25

## Refactor

- Owner: eng-refactor
- Smell: every fallback declares `let installed = false` and wraps its setup in `if (typeof document !== "undefined" && !installed) { installed = true; … }`. The guard never changes the outcome: an ES module is evaluated once per URL, so the only evaluation always sees `false`; a second copy loaded from another URL (a CDN and the npm copy on one page) gets its own module and its own `false`, so the guard cannot prevent a double install either.
- Behaviour kept: the SSR guard `typeof document !== "undefined"` stays; each listener is added once per module evaluation, as before.
- Files: the five `src/js/fallbacks/*.ts` (21 insertions, 20 deletions with the comment rewrap Prettier made in `checkbox-indeterminate.ts`).

| Check                                                                                                            | Before                                                                                                     | After                                    |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `bun run test` (build, SSR import of every entry, export resolution, 76 Playwright tests in Chromium and WebKit) | pass                                                                                                       | pass                                     |
| `bun run lint`, `bun run typecheck`                                                                              | pass                                                                                                       | pass                                     |
| `bun run size`, fallbacks (gzip B)                                                                               | anchor-positioning 918, checkbox-indeterminate 330, command-for 390, dialog-closedby 331, interest-for 602 | 904, 318, 369, 317, 589 (−74 B in total) |

- Not done here (found while reading, each a separate change): none.
