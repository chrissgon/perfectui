# Code review: fix-dropdown-scroll-flip

- Owner: eng-code-review
- Status: draft
- Date: 2026-09-26
- Change: `v1..fix/dropdown-scroll-flip` (7 files, +249/-4, 0 pure renames)
- Intent: "no dropdown do ícone de 3 pontos no header, o dropdown desaparece acima do header quando deslizamos a tela pra baixo" (user, 2026-09-26), widened by the user to the Chromium bottom-edge case; plan perfectui-doc `docs/engineering/plans/header-menu-scroll.md`, ADR-0002 option A
- Checks run: lint exit 0; typecheck (`tsc --noEmit`) exit 0; tests `CI=1 bun run test` exit 0 (ssr: 7 entries imported in Node; exports: 7 specifiers resolve; 86 passed, 0 failed, both engines); task check `bunx playwright test tests/sticky-overlays.spec.ts` 10 passed

## Summary

The native path of `pui-dropdown` and `pui-tooltip` moves from `position: absolute` to `position: fixed`, so the flip is tested against the viewport; new tests cover sticky and fixed triggers and the edge flips; the docs and ARCHITECTURE.md say how placement works.
It does what the intent says: the reported flip (WebKit) and the bottom-edge miss (Chromium) are gone in the tests and on the site built with this `dist/`.
Verdict: approve.

## Findings

| #   | Severity | Perspective | Location | Evidence | Problem and impact | Fix |
| --- | -------- | ----------- | -------- | -------- | ------------------ | --- |

None.

## Checked with no finding

- Scope and contracts: the two source hunks are the cause's lines (`dropdown.css:27`, `tooltip.css:27`); no class, custom property, export or HTML attribute added or removed; `exports: 7 documented specifiers all resolve`.
- Quality: the comment above each `position: fixed` says why and points to ADR-0002; no duplication beyond the two components that share the rule, as they already did.
- Edge cases: a `.pui-dropdown` or `.pui-tooltip` without `popover` is outside the documented API; the only such use, `tests/manual/token-scale.html:276` and `:330`, sets `position: static` inline and is unaffected. In-flow triggers keep their panel attached while scrolling (probe in the plan's Impact, 4 px gap at 0, 100, 400 px, both engines). The start direction is the mirror of the tested end flip.
- Regression and performance: `tests/fallbacks.spec.ts` placement tests pass in both engines; no script added; `perfectui.css` 3,265 → 3,264 B gzip; the fallback path (`anchor-positioning.ts`) is untouched and already fixed.
- Security and data: CSS, tests and docs only; no input, network or storage.
- Tests: `tests/sticky-overlays.spec.ts` asserts exact values (the gap before and after scrolling, the panel's edge against the trigger's); no test removed, skipped or loosened (`git diff v1 -- tests/fallbacks.spec.ts` is empty).

## Scope

- Outside the task's Touches: none (`docs/engineering/adr/0002-…` and this review are the flow's records)
- Dependencies: none
- Markers: none
- Consumers checked: `.pui-dropdown` → perfectui-doc `app/components/SiteHeader.vue:48`, `ThemePicker.vue:12`, `VersionMenu.vue:12` (measured on the built site: panel stays at top 54, 54, 46 after scrolling 1,200 and 3,000 px in WebKit and Chromium); `.pui-tooltip` → `tests/fixtures/overlays.html:78`, `tests/fixtures/sticky-overlays.html`

## Bug-fix checklist

| Item                                      | Result                                                                                                                                                                                                                                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The cause is named                        | "WebKit tests the preferred position against that containing block without the anchor's scroll … applies `flip-block` and draws the panel above the button" at `src/css/components/dropdown.css:27` with `:31` (plan, Root cause)                                            |
| The fix is at the cause                   | at the cause: the `position` line of both native blocks                                                                                                                                                                                                                      |
| The reproduction no longer reproduces     | the regression tests are the reproduction in the library: 10 passed; the site's `scripts/repro-header-menu-scroll.mjs` loads the pinned 1.0.0-beta.1 package and keeps reproducing until the site takes a release (expected)                                                 |
| A regression test exists                  | `tests/sticky-overlays.spec.ts::a dropdown opened from a sticky header stays under its trigger after scrolling 1200 px`, `::a tooltip on a sticky header keeps its side after scrolling past a viewport`, `::a dropdown with no room below its trigger still opens above it` |
| The regression test fails without the fix | fails without: on dfafd13 in a scratch worktree, the three failed (`Expected: 4` `Received: -66`; `Expected: true` `Received: false`; `Expected: <= 800.5` `Received: 867`), 25 others passed                                                                                |
| The test asserts the fixed behaviour      | `.toBe(Math.round(gap))` on the panel-to-trigger gap after `scrollTo(page, y)`; `expect(menu.y + menu.height).toBeLessThanOrEqual(trigger.y)`                                                                                                                                |
| Other callers of the fixed code           | every `pui-dropdown` and `pui-tooltip`; the three site header menus and the documentation examples were measured (plan, Integration tests)                                                                                                                                   |
| Similar code elsewhere                    | `timeline.css:23` is `position: absolute` without anchoring; no other `position-try-fallbacks`: searched `src/css`                                                                                                                                                           |
| Nothing was weakened to make it pass      | none                                                                                                                                                                                                                                                                         |
| The fix stays minimal                     | none beyond the fix, its tests, its docs and the flow's records                                                                                                                                                                                                              |

## Outside the change

- Playwright's WebKit never fires `load` on the documentation site served by perfectui-doc's `tests/helpers/static-server.mjs` (plan, Found on the way): a WebKit project for the site needs Playwright routing or another server. Proposed as a perfectui-doc backlog item.

## Verdict

approve
Conditions: none
Follow-ups: none
Next: ops-pull-request (here: push to `v1`, the user's instruction for the library)
