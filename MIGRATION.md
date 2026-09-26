# Migrating from 0.x

`1.0.0` is a rewrite. The SCSS build is gone, every class is prefixed, and the components that used to be driven by Perfect UI's JavaScript are now driven by the browser.

<!-- site: tags: [guide, migration] -->
<!-- site: from: 0.23.0 -->
<!-- site: to: 1.0.0 -->
<!-- site: changed: "1.0" -->

Nothing here is guesswork on your side: the changes are mechanical, and this
page lists every one of them.

### Why

`0.23.0` shipped a CSS reset, imported a font, styled bare elements like `ul`
and `a`, used `!important`, and ran JavaScript on import that re-initialised the
whole DOM through a `MutationObserver`. That made it hard to drop into an
existing project, awkward with React and Vue, and unsuitable for server
rendering.

`1.0.0` touches nothing you did not ask for, ships less, and leans on the
platform for the behavior it used to implement itself.

### 1. Update the imports

The package is **ESM only** and no longer puts anything on `window` or
`document`.

```diff
-import "@chrissgon/perfectui/dist/perfectui.css";
-import "@chrissgon/perfectui";
+import "@chrissgon/perfectui/perfectui.css";
+import "@chrissgon/perfectui"; // only for overlays and the indeterminate checkbox
```

```diff
-<script src="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js"></script>
+<script type="module">
+  import "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/js/index.js";
+</script>
```

You can now import only the components you use:

```js
import "@chrissgon/perfectui/core.css";
import "@chrissgon/perfectui/components/button.css";
```

### 2. Add the prefix

Every class is prefixed with `pui-`, every custom property with `--pui-`.

```diff
-<button class="btn style-solid-primary">Save</button>
+<button class="pui-btn pui-solid pui-theme">Save</button>
```

### 3. Split style from color

A combined class like `style-solid-primary` became two independent classes: one
for **how** the color is applied, one for **which** color. Adding a color no
longer multiplies the number of classes.

| `0.23.0`              | `1.0.0`                 |
| --------------------- | ----------------------- |
| `style-solid-primary` | `pui-solid pui-theme`   |
| `style-soft-success`  | `pui-soft pui-success`  |
| `style-outline-error` | `pui-outline pui-error` |
| `style-link-warn`     | `pui-link pui-warn`     |
| `style-*-secondary`   | `pui-<style> pui-muted` |
| `style-white`         | `pui-solid pui-surface` |
| `style-black`         | `pui-solid pui-inverse` |

`secondary` is now `muted`, and the two page-relative colors have real names:
`pui-surface` follows the page background, `pui-inverse` is its opposite.

### 4. Components

| `0.23.0`                                                                                                  | `1.0.0`                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`btn`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/button.md)                               | `pui-btn`                                               |
| [`badge`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/badge.md)                              | `pui-badge`, plus the new `pui-chip`                    |
| [`card`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/card.md), `card-header`, `card-content` | `pui-card`, `pui-card-header`, `pui-card-content`       |
| [`list`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/list.md), `list-item`                   | `pui-list`, `pui-list-item`                             |
| [`table`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/table.md)                              | `pui-table`                                             |
| [`timeline`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/timeline.md), `checkpoint`          | `pui-timeline`, `pui-checkpoint`, `pui-checkpoint-icon` |
| [`group-row`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/layout-group.md), `group-col`      | `pui-group-row`, `pui-group-col`                        |
| `float`                                                                                                   | `pui-float`                                             |
| [`input`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/input.md), `addon`, `input-group`      | `pui-input`, `pui-addon`, `pui-input-group`             |
| [`checkbox`](https://github.com/chrissgon/perfectui/blob/v0.23.0/docs/checkbox.md), `radio`, `switch`     | `pui-checkbox`, `pui-radio`, `pui-switch`               |
| `rounded`, `rounded-full`                                                                                 | `pui-rounded`, `pui-rounded-full`                       |

#### Modal

```diff
-<button class="btn style-solid-primary" data-modal="confirm">Open</button>
-<div class="modal" id="confirm">
-  <div class="card">…</div>
-</div>
+<button class="pui-btn pui-solid pui-theme" commandfor="confirm" command="show-modal">Open</button>
+<dialog class="pui-modal" id="confirm" closedby="any">
+  <div class="pui-card">…</div>
+</dialog>
```

- `data-autoclose` is now `commandfor="id" command="close"`.
- `modal.static-backdrop` is now a `<dialog>` **without** `closedby`.

#### Dropdown

```diff
-<button class="dropdown-trigger">Menu</button>
-<div class="dropdown">…</div>
+<button class="pui-btn pui-outline pui-surface" popovertarget="menu">Menu</button>
+<div class="pui-dropdown" id="menu" popover>…</div>
```

The `.ignore` class is gone: a click inside a popover does not close it.

#### Tooltip

```diff
-<button class="tooltip" data-tooltip="Help text">?</button>
+<button interestfor="help">?</button>
+<div class="pui-tooltip" id="help" popover="hint">Help text</div>
```

This is the change that fixes tooltips on touch screens.

#### Accordion

```diff
-<div class="accordion">
-  <div class="accordion-item">…</div>
-</div>
+<div class="pui-accordion">
+  <details class="pui-accordion-item" name="faq">
+    <summary>Question</summary>
+    <p>Answer</p>
+  </details>
+</div>
```

One open at a time is the shared `name`, handled by the browser.

#### Field group

The label and the message used to be data attributes rendered as pseudo
elements. They are real elements now, which is what makes them announced by
screen readers, translatable and selectable.

```diff
-<div class="field-group field-group-error" data-label="Email" data-message="Invalid">
-  <input class="input" />
-</div>
+<label class="pui-field-group">
+  <span>Email</span>
+  <input class="pui-input" aria-invalid="true" aria-describedby="email-error" />
+  <small id="email-error">Invalid</small>
+</label>
```

`field-group-<state>` is gone: the state is `aria-invalid` on the control.

### 5. Dark mode

```diff
-<html class="dark">
+<html data-pui-mode="dark">
```

```diff
-import { setMode } from "@chrissgon/perfectui";
+import { setMode } from "@chrissgon/perfectui/mode";
```

With no attribute at all the library follows the operating system, which it
could not do before. The choice is persisted in a cookie so a server can render
it on the first paint.

### 6. Theming

`setThemeColor()` is gone. Theming is CSS:

```diff
-setThemeColor("#7c3aed");
+:root {
+  --pui-theme: #7c3aed;
+}
```

The palettes went with it. `--theme50` … `--theme950`, `--gray*`, `--red*`,
`--amber*` and `--green*` no longer exist: every tone is derived from one value
with `color-mix()`. The size scales are gone too — `--fontXS` … `--font9XL`,
`--spacingXS` … `--spacingXL` — replaced by four base tokens that every
component derives from. See
[Theme Color](docs/theme-color.md).

### 7. Things that were removed with no replacement

| Removed                                                                 | What to do instead                                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| The CSS reset and the Poppins import                                    | Nothing: Perfect UI no longer touches your page                                  |
| `.bg-*`, `.text-*`, `.border-*`, `.spacing-*`                           | Your own CSS, or Tailwind                                                        |
| `overflow-hidden`, `hr.vertical`                                        | Your own CSS                                                                     |
| `group-item` and the `[class*="item"]` rule                             | Nothing: a group styles its direct children                                      |
| `table-bordered`, `table-borderless`, `table-responsive`                | Recipes in the [Table](docs/table.md) docs                                       |
| `list-bordered`, `unmarker`, `.active`                                  | Composition: `pui-outline pui-surface`, `list-style: none`, `pui-soft pui-theme` |
| `float-right`, `float-top`                                              | One declaration, see [Float](docs/float.md)                                      |
| `loadFunctions()`, `Accordion()`, `Dropdown()`, `Modal()`, `Checkbox()` | Nothing: the browser does it now                                                 |
| `window.perfectui`, `document.perfectui`                                | ESM imports                                                                      |

`table-striped`, `table-hoverable`, `list-striped` and `list-hoverable` survive
as `pui-striped` and `pui-hoverable`.

### 8. What you no longer have to do

- No `loadFunctions()` after rendering. Components inserted at any time work,
  because the library listens on `document` instead of scanning the DOM.
- No overrides to undo the reset.
- No `!important` to beat the library: every rule lives in a cascade layer, so
  any plain CSS of yours already wins.
- No guard for server rendering: importing the JavaScript does nothing without a
  DOM.

### Known trade-offs

- In light mode, a solid `theme`, `success` or `warn` fill sits between 3.2:1
  and 3.5:1 against its white label — above the 3:1 floor for interface
  elements, below the 4.5:1 that WCAG AA asks for text. This keeps the
  `0.23.0` palette. If you need AA, override the three tokens with a darker
  tone.
- `pui-soft pui-surface` has nothing to paint, since it tints the page
  background over the page background. Use `pui-soft pui-muted` for a neutral
  fill.
