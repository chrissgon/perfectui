# Plan: indeterminate-late-markup

- Task: "the checkbox `indeterminate` fallback applies the attribute once at load and again only on the next pointerdown or focusin, so markup rendered later (client-side navigation, a framework re-render) shows a plain checkbox until the reader interacts" (perfectui-doc review, 2026-09-25; the site works around it in its example block)
- Date: 2026-09-25

## Root cause

- Owner: eng-root-cause
- Evidence: confirmed

### Report

Seen: a `<input type="checkbox" class="pui-checkbox" indeterminate>` inserted after the page loaded (a framework render, a client-side route) shows as an empty checkbox, without the dash, until the reader clicks or focuses anything on the page. Expected: the mixed state shows as soon as the checkbox is in the document, as it does for markup present at load. Reported by: the documentation site's review (T-cm-19), which applies the property itself in its example block.

### Reproduction

`tests/manual/indeterminate-late.repro.mjs` — run with `bun run build && node tests/manual/indeterminate-late.repro.mjs` (serves the repository like the test suite and loads `tests/fixtures/overlays.html`, which imports the built loader).

| Case                                                  | Chromium                                                  | WebKit                |
| ----------------------------------------------------- | --------------------------------------------------------- | --------------------- |
| checkbox in the page at load                          | `indeterminate` true                                      | true                  |
| checkbox inserted 500 ms after load, no interaction   | `indeterminate` false, `background-image: none` (no dash) | false, none           |
| the same checkbox after a click elsewhere on the page | true, `linear-gradient` (dash)                            | true, linear-gradient |

### Cause

`src/js/fallbacks/checkbox-indeterminate.ts:34` `document.addEventListener("pointerdown", apply, true);` (with `focusin` on the next line and `apply()` at load)
The fallback applies the attribute at three moments only: when the module loads, and on the next `pointerdown` or `focusin` anywhere in the document. That design is deliberate: `ARCHITECTURE.md` hard rule 9 ("No DOM scanning / re-initialization. No `MutationObserver`") and §8.4 ("apply on `pointerdown`/`focusin` delegation or on initial load + on `change`; do **not** use `MutationObserver`"). Delegation works for behaviour, because a behaviour only matters when someone interacts; the mixed state is a display state, which must be right before any interaction. For markup inserted after load, nothing runs until the next interaction, so the promise in `MIGRATION.md` §8 ("Components inserted at any time work, because the library listens on `document` instead of scanning the DOM") does not hold for this one component.

### Discriminating experiment

| Case                                          | Predicted by the cause            | Observed            | Rules out                                                |
| --------------------------------------------- | --------------------------------- | ------------------- | -------------------------------------------------------- |
| checkbox present at load                      | mixed (applied at load)           | true, both engines  | the fallback not loading, or loading late                |
| checkbox inserted later, no interaction       | plain (nothing runs)              | false, both engines | the selector failing on markup present at load           |
| the inserted checkbox after a click elsewhere | mixed (apply runs on pointerdown) | true, both engines  | the selector not matching inserted elements; a CSS cause |

### Reach

- Triggers: any checkbox with the `indeterminate` attribute that enters the document after the loader ran: framework renders (Vue, React, Svelte), client-side navigation, `innerHTML` from a fetch, a `<template>` cloned later.
- Seen today at: the documentation site's example blocks, which work only because the site sets the property itself (perfectui-doc `app/components/content/Example.vue`, "applyIndeterminate"); any framework application using the attribute.
- Same assumption elsewhere: the other fallbacks (`command-for`, `dialog-closedby`, `interest-for`, `anchor-positioning`) act on interaction or on opening, so later markup behaves; none displays a state before interaction. Searched `src/js/fallbacks` for `querySelectorAll` (this file only).

### Why it escaped

- `tests/fallbacks.spec.ts` "components inserted after load need no re-initialisation" inserts overlays only, which need an interaction anyway; "the indeterminate attribute sets the property" checks markup present at load.
- The architecture rule was written for behaviour and applied to a display state; introduced in 655fd9a ("feat: fill the fallback registry and write the fallbacks", 2026-09-17).

### What a fix must preserve

- A checkbox with the attribute present at load shows the mixed state.
- The reader's first change removes the attribute and the mixed state, as today.
- The loader stays within the size budget (`bun run size`; 487 B gzip on branch `v1`, 493 B in the published 1.0.0-beta.1) and does nothing on the server (`bun run test:ssr`).
- A checkbox without the attribute is never made indeterminate.

### Found on the way

- none

## Impact

- Owner: eng-impact-analysis
- Change under analysis: make the checkbox mixed state show for markup inserted after load (any approach; the approach is chosen next, by eng-tradeoffs)
- Baseline measured: `bun run size` on 2026-09-25: `dist/js/fallbacks/checkbox-indeterminate.js` 288 B gzip, `dist/js/index.js` 487 B gzip (baseline 0.23: 1,587 B); the fallback is downloaded in every browser, since its `supported()` is `false`

### Code the change touches

| Path                                         | What it holds                                                                                                    | Touched when                                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/js/fallbacks/checkbox-indeterminate.ts` | the attribute-to-property fallback (`apply` on load, `pointerdown`, `focusin`; `onChange` removes the attribute) | always                                                                                        |
| `src/js/index.ts`                            | the eager loader and the `features` registry                                                                     | only if the approach adds a public function to the root export, or changes the registry entry |
| `package.json` `exports`                     | `.` (types + loader), `./fallbacks/*`                                                                            | only if the approach adds a public entry point                                                |
| `dist/types/*.d.ts` (generated)              | public types                                                                                                     | with any new public function                                                                  |

### Rules and budgets the change meets

| Rule                                               | Source                                                            | Where the change stands                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| No DOM scanning, no `MutationObserver`             | `ARCHITECTURE.md` §2 rule 9, §8.4                                 | an observer-based approach breaks it: a user decision, recorded as an ADR and in the rule |
| JS never breaks SSR (`typeof document` guard)      | §2 rule 8; `scripts/ssr-check.mjs` imports every fallback in Node | any approach; the check runs in `bun run test`                                            |
| Output stays small; every change reports gzip size | §2 rule 12; `scripts/size.mjs`                                    | report the fallback and loader sizes against the baseline above                           |
| Only native attributes, except `indeterminate`     | §8 rule 3                                                         | unchanged: the attribute stays the API                                                    |

### Tests that encode today's behaviour

- `tests/fallbacks.spec.ts` "only the missing fallbacks are downloaded": asserts the downloaded file list; still valid unless the approach moves the code out of the fallback.
- `tests/fallbacks.spec.ts` "the indeterminate attribute sets the property": markup at load, and removal on the first change; must keep passing.
- `scripts/ssr-check.mjs`, `scripts/exports-check.mjs`: run in `bun run test`; the second fails if a documented specifier stops resolving.

### Public surface and documents

- `docs/checkbox.md` "Indeterminate" (the attribute and the property), `docs/installation.md` lines 33 and 83 ("what the script does"): describe when the mixed state appears.
- `ARCHITECTURE.md` rule 9 and §8.4; `MIGRATION.md` §8 ("Components inserted at any time work"), which the change makes true.
- The documentation site (perfectui-doc): `app/components/content/Example.vue` applies the property itself; that workaround can go once a release carries the change and the site's `libraryRef` moves to it.

### Who meets the change

- Every page that loads the loader, in every browser (the fallback always loads): its cost runs on all of them, so an approach that watches the document pays on every DOM change of every page.
- Framework users (Vue, React, Svelte) with the attribute in templates: today they need their own workaround.
- A behaviour change visible to users: a changelog entry in the next release.

### Risks

- A document-wide watcher on large, frequently changing pages (tables, virtual lists): measure the callback cost on a page with thousands of mutations before choosing it.
- A new public function is API forever; removing it later is a breaking change.

## Options and decision

- Owner: eng-tradeoffs
- Record: `docs/engineering/adr/0001-indeterminate-on-markup-inserted-after-load.md` (proposed)
- Options measured: A (MutationObserver), B (exported function), C (document the limitation), D (animationstart, keeping today's listeners)
- Recommended: D. Decision: the user's, since A would amend `ARCHITECTURE.md` hard rule 9.

## Change

- Owner: eng-implement (ADR-0001, option D, accepted by the user)
- `src/css/components/form.css`: `.pui-checkbox[indeterminate]` runs the zero-length `pui-indeterminate` animation.
- `src/js/fallbacks/checkbox-indeterminate.ts`: an `animationstart` listener on `document` sets the property; the load, `pointerdown` and `focusin` paths stay.
- Check: the reproduction shows the inserted checkbox mixed with no interaction in Chromium and WebKit; `bun run test` 76 passed, SSR and exports checks pass.
- Size measured after the change (`bun run size`): fallback 288 → 330 B gzip (+42 B, above the +12 B of the esbuild prototype: the library's Vite build keeps more), loader 487 B unchanged, perfectui.css 3265 B (baseline 6005 B).

## Integration tests

- Owner: eng-integration-tests
- File: `tests/indeterminate.spec.ts` (the real loader and stylesheet through `tests/fixtures/overlays.html`), Chromium and WebKit: 16 passed.
- Against the code before the change (a worktree at HEAD, Chromium): the 6 tests of the new behaviour fail (late insertion, hidden then shown, re-render, reduced motion, the common reset, the first change on a late checkbox); the 2 tests of preserved behaviour pass (every animation disabled falls back to the next interaction; no attribute, never mixed).

## Docs

- Owner: eng-docs
- Documents checked against the change: `docs/*.md`, `MIGRATION.md`, `ARCHITECTURE.md`, `README.md` (grep `indeterminate`, `MutationObserver`, `inserted`, `re-initiali`, `dynamic`)

| Document                                                    | Sentence before                                                                                                   | After                                                                                                                                                                                                                                                                                                                                                                            | Why                                                                                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `docs/checkbox.md` "Indeterminate"                          | the warning says the attribute always needs the script and is removed on the first click                          | adds: "It works on checkboxes rendered at any time, by a framework or a client-side route, with nothing to call. One exception: if your page turns animations off everywhere (`* { animation: none !important }`) or animates this checkbox itself, a checkbox rendered after the page loaded shows the mixed state from the reader's first click or focus on the page instead." | now incomplete; both halves checked by `tests/indeterminate.spec.ts` (late insertion, and the test with every animation disabled) |
| `ARCHITECTURE.md` §8.4                                      | "apply on `pointerdown`/`focusin` delegation or on initial load + on `change`; do **not** use `MutationObserver`" | describes the `animationstart` path, the kept listeners and ADR-0001; still no `MutationObserver`                                                                                                                                                                                                                                                                                | now incomplete                                                                                                                    |
| `ARCHITECTURE.md` §12 "What the suites cover"               | "the `indeterminate` attribute"                                                                                   | adds the late, hidden, re-render and animations-off cases                                                                                                                                                                                                                                                                                                                        | now incomplete                                                                                                                    |
| `ARCHITECTURE.md` §2 rule 9                                 | "No DOM scanning / re-initialization. No `MutationObserver` … Use event delegation on `document`."                | unchanged                                                                                                                                                                                                                                                                                                                                                                        | still true: the fix is a delegated event                                                                                          |
| `MIGRATION.md` §8                                           | "Components inserted at any time work, because the library listens on `document` instead of scanning the DOM."    | unchanged                                                                                                                                                                                                                                                                                                                                                                        | now true for the checkbox too                                                                                                     |
| `docs/installation.md` lines 33 and 83, `README.md` line 46 | the script is needed for the `indeterminate` attribute                                                            | unchanged                                                                                                                                                                                                                                                                                                                                                                        | still true                                                                                                                        |

- Checks: `prettier --check docs/checkbox.md ARCHITECTURE.md` passes; the documentation site converts them (`PERFECTUI_SOURCE=../perfectui bun run docs:sync`: 28 pages).
- Changelog: generated by `changelogen`: `fix(checkbox): show the mixed state on checkboxes inserted after load`.
- Follow-ups outside this repository: perfectui-doc applies the property itself (`app/components/content/Example.vue`, `applyIndeterminate`); remove it when the site's `libraryRef` moves to a release that carries this fix.
- Proposed, not written: none.
