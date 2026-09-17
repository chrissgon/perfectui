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

---

## 3. Current status

| Phase             | Status                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 0 — Prepare       | ✅ Baseline measured: `perfectui.css` **6005 B** gzip, `perfectui.js` **1587 B** gzip (+ Poppins). ⏳ Notify users: maintainer. |
| 1 — Build         | ✅ Done in a sandbox clone, delivered as **`perfectui-phase-1.patch`** (not pushed).                                            |
| 2 — Tokens & mode | ⏭️ Next                                                                                                                         |
| 3 – 8             | Pending                                                                                                                         |

### What Phase 1 changed (patch)

- Removed `src/scss`, `src/index.scss`, `src/index.ts`, `src/constants.ts`, `sass`.
- Added `src/css/{layers,tokens,styles,colors,states,core,index}.css` (empty layers) and `src/css/components/`.
- Added `src/js/index.ts` (fallback loader, empty registry) and `src/js/fallbacks/`.
- `vite.config.ts`: ESM-only JS lib, types in `dist/types`.
- `scripts/build-css.mjs` (lightningcss: bundle + minify, per-file output) and `scripts/size.mjs`.
- `package.json`: `exports`, `files`, `sideEffects`, scripts `build`, `size`; devDep `lightningcss`.
- `tsconfig.json`.
- Verified: build OK, `tsc` OK, JS import in Node (SSR) OK.

### Known issues

- `bun.lock` is outdated after the patch → run `bun install`.
- ESLint was **already broken** in `0.23.0` (`eslint/config` export not found; `eslint` is not a direct devDependency). Not fixed yet.
- `package.json` still at version `0.23.0` (decide when to bump to `1.0.0-alpha.0`).
- The library has **no styles** between Phase 1 and Phase 4. Expected on branch `v1`.
- devDependency `install` looks accidental (unrelated package). Confirm before removing.

---

## 4. Next steps (in Claude Code)

1. **Set up the repo**
   ```bash
   git checkout main && git pull
   git checkout -b v1
   git am perfectui-phase-1.patch
   bun install
   ```
2. Copy `ARCHITECTURE.md`, `CLAUDE.md` and `HANDOFF.md` to the repo root. Commit them.
3. Make the `senior-frontend-architect` skill available in Claude Code.
4. Ask the maintainer:
   1. Fix ESLint now or later?
   2. Bump version to `1.0.0-alpha.0` now?
   3. Remove the `install` devDependency?
5. **Phase 2** (ARCHITECTURE.md §4, §4.1, §7):
   - Fill `tokens.css` (initial colors from v0 `_variables.scss`, `light-dark()`).
   - Mode rules for `data-pui-mode`.
   - `src/js/mode.ts` (`setMode`, `getMode`, cookie) + `./mode` export.
   - Stop and report.
6. Continue phases 3 → 8 one at a time.

### Prompt to start in Claude Code

```
Read CLAUDE.md, ARCHITECTURE.md and HANDOFF.md.
Confirm the repo state (branch v1, Phase 1 applied, bun install done).
Ask me the pending questions from HANDOFF.md §4.4.
Then execute Phase 2 using the senior-frontend-architect skill, and stop when it is done.
```

---

## 5. Files from the planning session

| File                        | Purpose                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Rules, design, structure, checklist (source of truth)                    |
| `CLAUDE.md`                 | Instructions loaded by Claude Code every session                         |
| `HANDOFF.md`                | This file: history, status, next steps                                   |
| `perfectui-phase-1.patch`   | Phase 1 commit (`git am`)                                                |
| `pui-token-scale-test.html` | Visual test of the approved token multipliers (reference for Phases 2–4) |

## 6. Links

- Library: https://github.com/chrissgon/perfectui
- Docs site: https://perfectui.netlify.app/ — repo https://github.com/chrissgon/perfectui-doc (Nuxt 3 + Tailwind, uses `@chrissgon/perfectui@^0.23.0`)
