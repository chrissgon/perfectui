# Plan: radio-indeterminate-fill

- Task: "Fix radio :indeterminate fill (form.css:164): a radio group with nothing checked matches :indeterminate and renders filled; scope the rule to .pui-checkbox" (the user's `todo.txt`)
- Date: 2026-09-25

## Root cause

- Owner: eng-root-cause
- Evidence: confirmed

### Report

Seen: every radio of a group with no option checked renders filled with the theme colour, as if checked; on https://perfectui.dev/docs/v1/forms/radio the "Free / Pro / Team" example shows three filled radios. Expected: an unchecked radio is an empty ring. Reported by: the user (`todo.txt`), confirmed on the live documentation.

### Reproduction

`tests/manual/radio-indeterminate.repro.mjs` — run with `bun run build && node tests/manual/radio-indeterminate.repro.mjs` (reads `dist/perfectui.css`; waits for the 150 ms colour transition).

| Case                                    | Chromium                                           | WebKit             |
| --------------------------------------- | -------------------------------------------------- | ------------------ |
| radio, group with none checked          | `:indeterminate` true, `rgb(0, 146, 205)` (filled) | true, filled       |
| radio, lone (no `name`)                 | true, filled                                       | true, filled       |
| radio, unchecked, group has one checked | false, `rgba(0, 0, 0, 0)`                          | false, transparent |
| checkbox, unchecked                     | false, transparent                                 | false, transparent |
| checkbox, `indeterminate = true`        | true, filled                                       | true, filled       |
| switch, `indeterminate = true`          | true, filled                                       | true, filled       |

### Cause

`src/css/components/form.css:164` `:is(.pui-checkbox, .pui-radio, .pui-switch):is(:checked, :indeterminate) {`
The rule assumes `:indeterminate` means "the mixed state a script sets on a checkbox", the same for the three controls. For a radio it means something else: the HTML standard defines `:indeterminate` as matching "input elements whose type attribute is in the Radio Button state and whose radio button group contains no input elements whose checkedness state is true" (https://html.spec.whatwg.org/multipage/semantics-other.html#selector-indeterminate). So every radio of an untouched group, and every radio without a `name` (a group of one), gets the checked fill. A switch is an `<input type="checkbox">` with no mixed appearance, yet the same rule fills it when a script or the library's fallback sets `indeterminate`.

### Discriminating experiment

| Case                                                | Predicted by the cause                                    | Observed                 | Rules out                                                          |
| --------------------------------------------------- | --------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| radio in a group with one checked, unchecked itself | not filled (group has a checked member)                   | not filled, both engines | a rule that fills every unchecked radio (`.pui-radio` base styles) |
| lone radio, no `name`                               | filled (its group of one has nothing checked)             | filled, both engines     | a cause tied to the `name` attribute or to fieldsets               |
| unchecked checkbox                                  | not filled (checkbox `:indeterminate` needs the property) | not filled, both engines | the shared rule being wrong for every control                      |
| switch with `indeterminate = true`                  | filled (same selector)                                    | filled, both engines     | a radio-only cause                                                 |

### Reach

- Triggers: any `.pui-radio` whose group has no checked member (every radio group before the first choice, any radio without `name`); any `.pui-switch` whose `indeterminate` property or attribute is set.
- Seen today at: https://perfectui.dev/docs/v1/forms/radio, "Free / Pro / Team" example (`docs/radio.md`, three unchecked radios in group `plan`); any user form with an unanswered radio question.
- Same assumption elsewhere: none: searched `src/css` for `:indeterminate` (lines 164 and 174 only; 174 is `.pui-checkbox:indeterminate`, correct).

### Why it escaped

- No automated test covers the radio or the switch states; the only coverage is `tests/manual/preview.html`, looked at by eye.
- The first examples of `docs/radio.md` start with an option `checked`, the state that hides the bug.
- Introduced with the control itself in 2e6b946 ("feat: add the form controls", 2026-09-17).

### What a fix must preserve

- A checked radio is filled, in every colour class (`pui-success` fills green).
- An unchecked radio in a group that has a checked member stays an empty ring.
- A checkbox with `indeterminate = true` shows the fill and the dash.
- A checked checkbox and a checked switch are filled; an unchecked switch is not.

### Found on the way

- none

## Failing tests

- Owner: eng-unit-tests
- Command: `bun run build && npx playwright test tests/forms.spec.ts`
- Files: `tests/forms.spec.ts`, `tests/fixtures/forms.html`

| Test                                                                              | Source                          | Expected before the change | Observed before (per runtime)                    |
| --------------------------------------------------------------------------------- | ------------------------------- | -------------------------- | ------------------------------------------------ |
| radio › a group with nothing checked shows empty rings                            | Root cause › Reproduction       | fails now                  | Chromium and WebKit: received `rgb(0, 146, 205)` |
| radio › a radio with no name is empty until checked                               | Root cause › Reach              | fails now                  | Chromium and WebKit: received `rgb(0, 146, 205)` |
| radio › a checked radio is filled in its colour, and its unchecked sibling is not | What a fix must preserve        | passes now                 | passes in both                                   |
| checkbox › checked and mixed are filled, unchecked is not                         | What a fix must preserve        | passes now                 | passes in both                                   |
| checkbox › the mixed state draws the dash                                         | What a fix must preserve        | passes now                 | passes in both                                   |
| switch › checked is filled, unchecked is not                                      | What a fix must preserve        | passes now                 | passes in both                                   |
| switch › a switch has no mixed state: indeterminate leaves it unfilled            | Root cause › Cause (the switch) | fails now                  | Chromium and WebKit: received `rgb(0, 146, 205)` |

- Result before the change: 6 failed, 8 passed (the failures are exactly the three `fails now` rows, in both runtimes)
- Decided (user, 2026-09-25): no fill. Was pending: what a switch shows when a script sets `indeterminate`. No source states it: `docs/checkbox.md` defines the mixed state for the checkbox only, and `docs/switch.md` does not mention it. Recommended: no fill (the switch has no mixed appearance), which is what the test asserts until the user decides.

## Change

- Owner: eng-implement
- `src/css/components/form.css`: the checked fill applies to `:checked` on the three controls and to `:indeterminate` on `.pui-checkbox` only.
- Check: `npx playwright test tests/forms.spec.ts` 14 passed (was 6 failed, 8 passed); the reproduction shows `rgba(0, 0, 0, 0)` for the radio group with nothing checked, the lone radio and the switch with `indeterminate`, in Chromium and WebKit.
