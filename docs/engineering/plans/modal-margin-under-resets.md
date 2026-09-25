# Plan: modal-margin-under-resets

- Task: "`pui-modal` sets no `margin` and relies on the browser's `margin: auto` to centre the dialog; Tailwind v4's Preflight sets `margin: 0` on every element, so under Tailwind a modal opens in the top-left corner even with the layer order the Tailwind guide recommends. The library should set it, and its Tailwind guide should mention it" (perfectui-doc review, 2026-09-25)
- Date: 2026-09-25

## Root cause

- Owner: eng-root-cause (short form: the cause came with the report and was verified)
- Evidence: confirmed
- Cause: `src/css/components/modal.css` `.pui-modal` declares no `margin`, so the browser's `dialog:modal { margin: auto }` centres it; any author rule beats the browser's stylesheet, including a reset in a layer below `pui`, so `@layer base { * { margin: 0 } }` moves the modal to the top-left corner.
- Reproduction: `tests/preflight.spec.ts` with `tests/fixtures/preflight.html` (a reset in `base`, the guide's layer order): the modal's centre was 563 px off in Chromium and WebKit.
- Same assumption elsewhere: none; `dropdown.css` and `tooltip.css` declare their `margin`. Searched `src/css/components` for `margin`.

## Change

- `src/css/components/modal.css`: `.pui-modal` declares `margin: auto` (eng-implement). `tests/preflight.spec.ts` passes in both engines; `tests/fallbacks.spec.ts` still passes (20 tests); `perfectui.css` 3,233 B gzip.

## Docs

- Owner: eng-docs
- Documents checked against the change: `docs/modal.md`, `docs/tailwindcss.md`, `README.md`, `MIGRATION.md`, `ARCHITECTURE.md` (grep `modal`, `margin`, `Preflight`, `reset`)

| Document                            | Sentence before                                                                                          | After                                                                                                                                                                                                                                                                                 | Why                                                                                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/tailwindcss.md` "Preflight"   | "With Tailwind v4 the layer declaration above keeps it below the library; with Tailwind v3 turn it off." | adds: "Preflight also zeroes browser defaults, such as the `margin: auto` that centres a modal `<dialog>`, so Perfect UI declares every property its components rely on, including those: in a lower layer, a reset cannot undo them." and dates the modal measurement to branch `v1` | the section promised that the layer order was enough; it is now, and the reason is written down                                           |
| `docs/tailwindcss.md` "Tailwind v3" | "keep it and add the fill back only where you use Perfect UI buttons with your own unlayered rule"       | "restore, with your own unlayered rules, what it removes from the components you use: the fill of Perfect UI buttons, and `margin: auto` on `.pui-modal`"                                                                                                                             | verified: an unlayered reset beats every layer, so the fix does not help v3 users who keep Preflight (modal centre at x = 60 against 640) |
| `docs/modal.md`                     | "it centers the dialog"                                                                                  | unchanged                                                                                                                                                                                                                                                                             | true again under a reset; nothing to change                                                                                               |

- Checks: `prettier --check docs/tailwindcss.md` passes; the documentation site converts it (`PERFECTUI_SOURCE=../perfectui bun run docs:sync` in perfectui-doc: 28 pages).
- Changelog: generated from the commit message by `changelogen`, so the commit is `fix(modal): centre the dialog under resets that zero margins`.
- Follow-ups outside this repository: perfectui-doc restores the margin itself in `app/assets/css/main.css` (`.pui-modal { margin: auto }` in `@layer components`); remove it when the site's `libraryRef` moves to a release that carries this fix.
- Proposed, not written (the user's call): a hard rule in `ARCHITECTURE.md` §2, "Declare every property a component relies on; never rely on a browser default a reset can remove."
