# ADR-0001: The checkbox mixed state on markup inserted after load

- Status: accepted (user, 2026-09-25: option D)
- Date: 2026-09-25
- Serves: docs/engineering/plans/indeterminate-late-markup.md (Root cause, What a fix must preserve, Impact)

## Context

The `indeterminate` fallback applies the attribute at load and on the next `pointerdown` or `focusin`, so a checkbox inserted later shows no dash until the reader interacts (plan, Root cause). The fallback downloads in every browser (`supported: () => false`), so its cost runs on every page. `ARCHITECTURE.md` hard rule 9 forbids `MutationObserver` and asks for event delegation on `document`; rule 12 asks every change to report its size. Baseline (`bun run size`, 2026-09-25): fallback 288 B gzip, loader 487 B, `perfectui.css` 3,235 B.

Every option was prototyped in a scratch folder and run in Chromium and WebKit through Playwright: a checkbox inserted 100 ms after load, one inserted hidden and shown later, `prefers-reduced-motion: reduce`, the two common animation resets, and 10,000 unrelated insertions timed. Sizes are esbuild-minified gzip against the same file today (269 B there).

## Options

### Option A: a `MutationObserver` in the fallback

- Late markup mixed: yes in both engines, also hidden then shown, also under reduced motion and every reset.
- Size: +48 B gzip.
- Cost: an observer on `document` in every page, every browser; 10,000 insertions took 46 ms against 37 ms without it in Chromium, and within noise in WebKit.
- Breaks hard rule 9 as written; choosing it means amending rule 9 and §8.4 to allow one observer for a display state.

### Option B: export `applyIndeterminate(root?)` for frameworks to call after rendering

- Late markup mixed: no, unless the application calls it; every framework user writes the call.
- Size: +11 B gzip; a public function kept forever (types, exports, docs).
- Within the rules.

### Option C: keep today's behaviour and document the limitation

- Late markup mixed: no. Size and cost unchanged. `MIGRATION.md` §8 must stop promising that components inserted at any time work.

### Option D: detect inserted checkboxes through `animationstart`, keeping today's listeners

- A zero-length animation on `.pui-checkbox[indeterminate]` fires `animationstart` when the element renders; a listener delegated on `document` sets the property. Event delegation, no observer: within rule 9.
- Late markup mixed: yes in both engines, under reduced motion, and with the common reset that shortens `animation-duration` to 0.01 ms; a hidden checkbox gets it when shown.
- Fails silently (and falls back to today's behaviour through the kept listeners) when a page sets `animation: none !important` on everything, or animates the checkbox itself: unlayered author CSS beats `@layer pui`. Verified in both engines.
- Size: +12 B JS, +23 B in `perfectui.css`. Cost: none on unrelated insertions (29 ms Chromium, 24 ms WebKit, within noise of B).

## Decision

D (the user, 2026-09-25, following the recommendation), because it fixes every tested case the product meets by default, stays within hard rule 9 and the size budget, costs nothing on unrelated DOM changes, and degrades to today's behaviour rather than failing; the two cases it misses are author CSS that disables or replaces animations on this element, which the checkbox documentation can name. A is the choice if the mixed state must hold even under `animation: none !important`, at the price of amending rule 9.

## Consequences

- Measured after implementing D: the fallback grew from 288 to 330 B gzip (+42 B, not the +12 B of the esbuild prototype; the library's Vite build keeps more); the loader is unchanged.

- With D: `src/css/components/form.css` gains the rule and the keyframes; the fallback gains the `animationstart` listener and keeps `pointerdown`/`focusin`; `docs/checkbox.md` names the two unsupported cases; `MIGRATION.md` §8 becomes true for the checkbox; `eng-integration-tests` covers late markup, hidden then shown, and reduced motion in both engines.
- With A: the same tests, plus the amendment of rule 9 and §8.4, and a note in the size report.
