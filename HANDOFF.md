# Perfect UI v1 — Handoff

> Summary of the planning conversation (claude.ai, 2026-09-17) and what to do next in Claude Code.
> Source of truth for rules and design: `ARCHITECTURE.md`. This file is status + history.

---

## 1. Why we are migrating

Problems found in `0.23.0`:

- No tree-shaking: everything ships together.
- JS runs on import, re-initializes the whole DOM with a `MutationObserver`, and needs `loadFunctions()` for dynamic DOM (React/Vue). Poor SSR compatibility.
- Forces the Poppins font (external download) on `body *`.
- Global reset and element styles (`ul`, `a`, `hr`) conflict with user projects and with Tailwind Preflight.
- `!important` usage, no `@layer`: hard to override.
- Full Tailwind-like color palettes and utilities that the library itself does not use.
- Tooltip does not work on mobile. Modal uses `.show()` instead of `.showModal()`.
- Field group label/message rendered with pseudo-elements: poor accessibility.

Goal kept: **bare minimum, lightweight, customizable**. Tailwind is an optional complement, never a dependency.

---

## 2. Decision log

| #   | Topic                         | Decision                                                                                                                                                                                         |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Styling language              | Native CSS. No Sass.                                                                                                                                                                             |
| 2   | Browser support               | Modern browsers only.                                                                                                                                                                            |
| 3   | Dependencies                  | Zero runtime deps. Native platform features only.                                                                                                                                                |
| 4   | Compatibility                 | Breaking changes allowed → `1.0.0`. Existing users (maintainer's former company) will be notified.                                                                                               |
| 5   | Class model                   | "Lego": shape (`pui-btn`) + style (`pui-solid`) + color (`pui-theme`). Style and color are separate classes.                                                                                     |
| 6   | Prefix                        | `pui-` (rejected `pt-`: conflicts visually with Tailwind `pt-*`).                                                                                                                                |
| 7   | Sizes                         | One size per component. Scale by component: `pui-btn` > `pui-chip` > `pui-badge`.                                                                                                                |
| 8   | Reset                         | Removed. No optional base file.                                                                                                                                                                  |
| 9   | Color tokens                  | Semantic names: `bg`, `bg-muted`, `bg-emphasis`, `text`, `text-muted`, `border`, `theme`, `success`, `error`, `warn`, `muted`. (`accent` rejected: means brand color elsewhere.)                 |
| 10  | Old `secondary`               | Renamed to `muted`.                                                                                                                                                                              |
| 11  | `style-white` / `style-black` | Colors `pui-surface` (aligned with background) and `pui-inverse` (opposite of background).                                                                                                       |
| 12  | Color contract                | Color classes set `--pui-color`, `--pui-on-color`, `--pui-edge`; style classes read them.                                                                                                        |
| 13  | Shades                        | Derived with `color-mix()`. No palettes. `setThemeColor` removed.                                                                                                                                |
| 14  | Non-color tokens              | 4 base tokens (`--pui-radius`, `--pui-space`, `--pui-font-size`, `--pui-border-width`) + `calc()` multipliers per component. Multipliers **approved visually** (`pui-token-scale-test.html`).    |
| 15  | Font size scale               | `--fontXS…9XL` removed.                                                                                                                                                                          |
| 16  | Utilities                     | Keep only those used with components (`pui-rounded`, `pui-rounded-full`). Remove `spacing-*`, `overflow-hidden`, `hr.vertical`, `bg-*`, `text-*`, `border-*`.                                    |
| 17  | Disabled                      | Styles scoped to `pui-` classes only.                                                                                                                                                            |
| 18  | JS strategy                   | Native HTML first (`<details name>`, `popover`, `<dialog>`, `commandfor`, `closedby`, `popover="hint"`, `interestfor`, anchor positioning).                                                      |
| 19  | Fallbacks                     | A loader detects support and **dynamically imports** only missing fallbacks. Same markup as native. Removing a fallback = delete registry entry + file. Event delegation, no `MutationObserver`. |
| 20  | Checkbox indeterminate        | Kept with attribute `indeterminate`, implemented as a fallback with `supported: () => false`.                                                                                                    |
| 21  | Overlay positioning           | CSS anchor positioning + fallback.                                                                                                                                                               |
| 22  | Field group                   | Real elements: `<span>` label, `<small>` message with `aria-describedby`; error via `aria-invalid`.                                                                                              |
| 23  | Color mode                    | `data-pui-mode` on `<html>` switches CSS `color-scheme` (not inline style, so Tailwind/CSS can read it). No attribute = system.                                                                  |
| 24  | Mode persistence              | Cookie `pui-mode` (readable during SSR). Inline `<head>` snippet documented for static sites.                                                                                                    |
| 25  | Distribution                  | ESM only. CDN via `<script type="module">`. `window.perfectui` removed.                                                                                                                          |
| 26  | Components                    | All current components kept. New: `pui-chip`.                                                                                                                                                    |
| 27  | Tests                         | Playwright (dev only).                                                                                                                                                                           |
| 28  | Release                       | `1.0.0-beta` first, then `1.0.0`.                                                                                                                                                                |
| 29  | Docs for AI                   | `ARCHITECTURE.md` in English at repo root + `CLAUDE.md`.                                                                                                                                         |
| 30  | Color tones                   | Superseded by 36. First attempt: v0 tone `700` in light, `500` in dark, label always `--pui-bg`.                                                                                                 |
| 31  | Version bump                  | `package.json` stays `0.23.0` during the migration. Version is bumped only at release (Phase 8), with the tag.                                                                                   |
| 32  | Tooling                       | ESLint rebuilt as a plain flat config on `typescript-eslint`; the `@eslint/compat` + `eslintrc` shims and `eslint-plugin-import` were dropped.                                                   |
| 33  | Tabs component                | Out of scope for `1.0.0` (item dropped from `todo.txt`).                                                                                                                                         |

---

## 3. Current status

| Phase             | Status                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 0 — Prepare       | ✅ Baseline measured: `perfectui.css` **6005 B** gzip, `perfectui.js` **1587 B** gzip (+ Poppins). ⏳ Notify users: maintainer. |
| 1 — Build         | ✅ Applied on branch `v1` (commit `337e7fb`).                                                                                   |
| 2 — Tokens & mode | ✅ Done. `perfectui.css` 338 B gzip, `js/mode.js` 309 B, `js/index.js` 154 B.                                                   |
| 3 — Lego pieces   | ✅ Done. `perfectui.css` 833 B gzip.                                                                                            |
| 4 — Components    | ✅ Done. `perfectui.css` 2922 B gzip, still under half the 0.23.0 baseline. `perfectui.css` 1464 B gzip.                        |
| 5 — JS fallbacks  | ✅ Done. `js/index.js` 487 B gzip; fallbacks 331–487 B each, downloaded only when missing.                                      |
| 6 — Tests         | ✅ Done. 16 tests x 2 engines, all green, plus the SSR check.                                                                   |
| 7 — Docs          | ✅ This repo done. Site repo `perfectui-doc` deferred by the maintainer.                                                        |
| 8 — Release       | ⏭️ Next                                                                                                                         |

### What Phase 1 changed (patch)

- Removed `src/scss`, `src/index.scss`, `src/index.ts`, `src/constants.ts`, `sass`.
- Added `src/css/{layers,tokens,styles,colors,states,core,index}.css` (empty layers) and `src/css/components/`.
- Added `src/js/index.ts` (fallback loader, empty registry) and `src/js/fallbacks/`.
- `vite.config.ts`: ESM-only JS lib, types in `dist/types`.
- `scripts/build-css.mjs` (lightningcss: bundle + minify, per-file output) and `scripts/size.mjs`.
- `package.json`: `exports`, `files`, `sideEffects`, scripts `build`, `size`; devDep `lightningcss`.
- `tsconfig.json`.
- Verified: build OK, `tsc` OK, JS import in Node (SSR) OK.

### What Phase 7 added (this repo only)

- `/docs` rewritten for the v1 API: 26 files, plus new `chip.md` and `float.md`. The index, the root `README.md` and `MIGRATION.md` were written too.
- Verified two ways rather than by reading: every `pui-` class named in the docs was cross-checked against the built CSS (42 used, 43 defined, none missing), and every HTML example was extracted and rendered in a browser.
- The recipes that replace the v0 modifiers live in the docs now: the table variants, the list ones, and the float corners.
- The two known trade-offs are documented in `MIGRATION.md`: the light-mode `pui-solid` contrast and the degenerate `pui-soft pui-surface` combination.
- **Not done, deliberately:** the site repo `chrissgon/perfectui-doc`. `Atom.ThemeColorPicker.vue` calls `setThemeColor` and `Atom.DarkMode.vue` toggles `.dark`; neither API exists. The maintainer asked to handle that repo separately.

### What Phase 6 added

- `playwright.config.ts` with two projects, Chromium and WebKit, running the same specs; `scripts/serve.mjs` (no dependency) and `scripts/ssr-check.mjs`.
- `tests/fixtures/*.html` load the built `dist`, so the suites exercise what a user downloads.
- **Support correction.** WebKit 26.6 already has `commandfor`, `<dialog closedby>`, `popover="hint"` and CSS anchor positioning. The only thing it lacks is `interestfor`, so in current browsers the loader downloads just `interest-for.js` and `checkbox-indeterminate.js`. The webstatus.dev table recorded in §9 lags behind Safari — trust the measurement.
- **Bug the suites caught.** The `interest-for` fallback showed the tooltip with `showPopover()`, which leaves the popover with no invoker and therefore no anchor, so the CSS placement was ignored and the tooltip appeared in the wrong place. It now passes `source` and, for browsers that ignore that option but do have anchor positioning, wires `anchor-name` and `position-anchor` by hand.

### What Phase 5 added

- Registry filled in `src/js/index.ts` and five fallbacks in `src/js/fallbacks/`.
- Verified in Chrome 153: four of the five features are supported, so **nothing is downloaded** except `checkbox-indeterminate`, which has no native equivalent and always loads. Checked through `performance.getEntriesByType("resource")`.
- The anchor fallback was verified in isolation, on a popover with no CSS anchor rules: a menu lands below its trigger aligned to its start edge, a `popover="hint"` lands above and centered, and a panel with no room below flips above.
- Every module imports cleanly in Node, so SSR stays safe.
- `popover-hint` was deliberately not written (ARCHITECTURE.md §8.5).
- **Still unverified:** `command-for`, `dialog-closedby` and `interest-for` behavior. Chrome supports all three natively, so the fallback path cannot be isolated here — the Blink flags that would disable them are not exposed. Phase 6 covers it: Playwright drives WebKit and Gecko, which genuinely lack them.

### What Phase 4 added so far

- `src/css/components/{button,chip,badge}.css`, following the multipliers approved in §4.1.
- `src/css/components/{card,list,table,timeline}.css`. Card follows the proportions approved in `tests/manual/token-scale.html`; the others reuse the same steps (§4.1).
- Rule written down in §6: containers read the page tokens directly, while colorable elements carry a transparent border so a style class has something to paint.
- `src/css/components/{accordion,modal,dropdown,tooltip}.css`, the four whose behavior is native HTML. Verified in Chrome 153: exclusive accordion, anchored dropdown and tooltip, modal opened by `commandfor` with a backdrop and light dismiss.
- Support checked against webstatus.dev, which sets the Phase 5 registry: `commandfor` is Baseline newly (all engines); `<dialog closedby>` and `popover="hint"` lack Safari; `interestfor` and CSS anchor positioning are Chromium-only.
- `src/css/components/{group,float}.css`, and the horizontal timeline that depends on `pui-group-row`. Groups style their direct children, so `group-item` is gone; borders overlap with a negative margin so `pui-outline` keeps working inside a group.
- `src/css/components/form.css`: field group (§6.1), input, textarea, select, input group, addon, checkbox, radio, switch.
- Form controls read `var(--pui-edge, var(--pui-border))` for their border, which is what makes `aria-invalid` work with no class: `pui.states` already points `--pui-edge` at the error color.
- The select arrow, radio dot and switch knob are drawn with gradients instead of data URIs, so they follow the color mode. The check mark stays an SVG: drawing it with gradients came out crooked.
- `color-scheme` gives the native dropdown and its options the right colors in dark mode for free, replacing v0's `.dark .input option` rule.
- `tests/manual/table.html`: 18 table cases for manual review, including the recipes that replace the v0 modifiers.
- A `tfoot` is styled as a summary band (muted background plus a top border that collapses with the body's last rule), because with no treatment of its own the total row read as detached from the table.
- Two fixes found through that page: the timeline icon needed `box-sizing: border-box` (with `content-box` the border pushed it 2px past the point the connecting line starts from), and the last-row border rule now matches the table's last row group instead of `tbody`, so a `tfoot` no longer ends with a stray rule.
- `tests/manual/preview.html` had its own `th, td` rule leaking into `.pui-table`, which added a border under the last row. The page's documentation tables are now scoped to `.doc`. Worth remembering for Phase 7: unlayered author CSS beating the library is the feature, and it is also the easiest way to misjudge a component.
- `src/css/utilities.css` with `pui-rounded` and `pui-rounded-full`, in the new `pui.utilities` layer.
- Each component file imports `../layers.css`, so it carries the layer order when loaded on its own.
- Verified: layer order comes out correct both in the bundle and in a standalone component file, which closes the lightningcss question from Phase 2. Checked in both modes: shapes, pill helper, `<a class="pui-btn">`, disabled, `aria-invalid`, focus ring, and the bare classes with no style or color.

### What Phase 3 added

- `src/css/colors.css`: the 7 color classes, variables only.
- `src/css/styles.css`: `pui-solid`, `pui-soft`, `pui-outline`, `pui-link`, with hover and ink derived from the contract.
- `src/css/states.css`: disabled, `:focus-visible` ring and `aria-invalid`.
- `tests/manual/preview.html`: manual preview of everything that exists, with a mode switch. Open it with `bun run dev` (live) or straight from the file system.
- Contrast measured for 7 colors x 4 styles x hover in both modes: only the three light-mode `pui-solid` fills noted in decision 37 sit below 4.5:1.

### What Phase 2 added

- `src/css/tokens.css`: semantic colors with `light-dark()`, the 4 base tokens, and the `data-pui-mode` rules.
- `src/js/mode.ts`: `setMode` / `getMode`, cookie `pui-mode`, SSR-safe.
- `./mode` export in `package.json` and a `mode` entry in `vite.config.ts`.
- Verified: build OK, `tsc` OK, `eslint` OK, both JS entries imported in Node (SSR) without throwing.

### Known issues

- The library has **no styles** between Phase 1 and Phase 4 (only tokens). Expected on branch `v1`.
- Importing `core.css` sets `color-scheme: light dark` on `:root`. Apps that are not dark-ready will follow the OS in dark mode unless they render `<html data-pui-mode="light">`. Must be called out in the docs (Phase 7).
- Nothing is pushed yet: branch `v1` is local only.

---

## 4. Next steps (in Claude Code)

1. **Phase 4, next group:** form controls — field group, input, input group, addon, select, textarea, checkbox, radio, switch (§6, §6.1).
2. Then: group/float (which also unlocks the horizontal timeline), accordion, modal, dropdown, tooltip.
3. Continue phases 5 → 8 one at a time.

Recipes to carry into the docs (Phase 7), replacing v0 modifiers: selected item = `pui-list-item pui-soft pui-theme`; bordered item = `pui-list-item pui-outline pui-surface`; unmarked list = `list-style: none`; bordered/borderless table and responsive table = one rule of author CSS.

### Prompt to start in Claude Code

```
Read CLAUDE.md, ARCHITECTURE.md and HANDOFF.md.
Confirm the repo state (branch v1, phases 1 to 3 done, Phase 4 started: button, chip, badge).
Then continue Phase 4 using the senior-frontend-architect skill, one component group at a time, and stop after each group.
```

---

## 5. Files from the planning session

| File                            | Purpose                                                                  |
| ------------------------------- | ------------------------------------------------------------------------ |
| `ARCHITECTURE.md`               | Rules, design, structure, checklist (source of truth)                    |
| `CLAUDE.md`                     | Instructions loaded by Claude Code every session                         |
| `HANDOFF.md`                    | This file: history, status, next steps                                   |
| `tests/manual/token-scale.html` | Visual test of the approved token multipliers (reference for Phases 3–4) |

The Phase 1 patch was applied as commit `337e7fb`; the planning folder was removed.

## 6. Links

- Library: https://github.com/chrissgon/perfectui
- Docs site: https://perfectui.netlify.app/ — repo https://github.com/chrissgon/perfectui-doc (Nuxt 3 + Tailwind, uses `@chrissgon/perfectui@^0.23.0`)
