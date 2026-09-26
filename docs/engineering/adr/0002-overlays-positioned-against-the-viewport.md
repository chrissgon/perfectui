# ADR-0002: Overlays positioned against the viewport

- Status: accepted (user, 2026-09-26: option A only; the site is fixed by the next release, no interim override)
- Date: 2026-09-26
- Serves: perfectui-doc docs/engineering/plans/header-menu-scroll.md (Root cause, Failing tests, Impact)

## Context

On the native path, `pui-dropdown` and `pui-tooltip` are `position: absolute` in the top layer, so their containing block is the document while their trigger may not scroll (a sticky header, a fixed bar). WebKit tests the flip against the first viewport's rectangle without the scroll and flips a sticky header's menu above its trigger, off screen, once the page has scrolled past a viewport; Chromium tests against the whole scrollable document and leaves a menu below a trigger fixed at the viewport's bottom, out of reach (plan, Root cause and Failing tests). `ARCHITECTURE.md` §6 promises that each overlay flips "when the preferred one does not fit"; rule 7 keeps script to browsers missing a feature; rule 12 asks every change to report its size. Baseline (`bun run size`, 2026-09-26): `perfectui.css` 3,265 B gzip.

Criteria, from the plan: the ten tests of `tests/sticky-overlays.spec.ts` and the placement tests of `tests/fallbacks.spec.ts`, in Chromium and WebKit 26.6; an in-flow trigger's panel keeps following it while the page scrolls; no script where anchor positioning exists; size.

Each library option was built in a scratch worktree of branch `fix/dropdown-scroll-flip` and run with `CI=1 bunx playwright test tests/sticky-overlays.spec.ts tests/fallbacks.spec.ts --retries=0`; the site option was built into perfectui-doc and measured through Playwright's routing (its static server does not load in Playwright's WebKit).

## Options

### Option A: `position: fixed` on the native path

The two `@supports` blocks in `dropdown.css` and `tooltip.css` use `position: fixed` instead of `absolute`: the containing block becomes the viewport in both engines, so the flip test sees what the reader sees. The fallback script already positions a fixed panel.

- Tests: 28 passed, 0 failed (both engines).
- In-flow trigger scrolled 0, 100 and 400 px with the panel open (probe on `overlays.html`): gap 4 px throughout, both engines.
- Size: `perfectui.css` 3,264 B (−1 B).
- Rules: none crossed.

### Option B: no `position-try-fallbacks`

Removing the flips stops the wrong flip in WebKit.

- Tests: 24 passed, 4 failed: both engines lose the flip at the bottom edge (`Received: 867` against `<= 800.5`) and at the end edge (`Received: 624.6` against `<= 325.4`).
- Size: 3,231 B (−34 B).
- Breaks the §6 promise.

### Option C: script that re-places native overlays on scroll

Reading positions on `scroll` and choosing the side in script, where anchor positioning exists. Not prototyped: it crosses rule 7 while option A passes every case without script.

### Option D: an override in each consuming site

`@layer components { @supports (position-area: block-end) { .pui-dropdown, .pui-tooltip { position: fixed } } }` in the site's CSS, after the `pui` layer. Measured on perfectui-doc: the header menu stays at top 54 after scrolling 0, 1,200 and 3,000 px, and a documentation example's panel keeps a 4 px gap after scrolling 150 px, in WebKit and Chromium. Fixes one site only; every other user keeps the bug.

### Option E: document the limitation

No change; the reported case stays broken on every iPhone.

## Decision

Option A: `position: fixed` on the native path of `pui-dropdown` and `pui-tooltip`. It is the only library option that passes every criterion, crosses no rule and costs nothing. Option D was recommended as an interim for perfectui-doc and declined by the user: the site takes the fix with the next library release.

## Consequences

- In Chromium, an in-flow trigger near the bottom of a long page opens its panel above instead of below, as WebKit already does.
- `docs/dropdown.md` and `docs/tooltip.md` keep their placement sentences; ARCHITECTURE.md §6 may say that overlays are placed against the viewport.
- perfectui-doc keeps the bug until its `libraryRef` moves to a release carrying this change.
