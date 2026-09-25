---
name: build-with-perfectui
description: >
  Build pages, prototypes and apps with the perfectui CSS and JavaScript library (version 1.0,
  `pui-` classes). Use this skill whenever a request mentions perfectui, Perfect UI, `pui-`
  classes, or asks for a page that must use that library: it says how to load the library,
  the shape + style + colour class model, the real markup of every component, dark mode and
  theming, how to override it, and what never to do. Do not invent classes or restyle the
  library's components; everything the library has is listed here.
license: MIT
metadata:
  version: "1.0.0-beta.1"
---

# Build with perfectui

perfectui ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Behaviour comes from the browser (`<dialog>`, `popover`, `interestfor`, `<details>`); the optional script is a loader that downloads a fallback only for what a browser is missing. The stylesheet is 3,155 bytes gzip.

## Load the library

Pin the version. The npm tag `latest` still points at 0.23, which has different class names; 1.0 is on the `beta` tag.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.1/dist/perfectui.css"
/>
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.1/dist/js/index.js";
</script>
```

By package manager: `npm i @chrissgon/perfectui@beta`, then `import "@chrissgon/perfectui/perfectui.css"` and, only if you use the modal, dropdown, tooltip or an indeterminate checkbox, `import "@chrissgon/perfectui"`. The script is ESM only, exposes nothing on `window` or `document`, and is safe to import on the server. Never call an initialiser; there is none.

The library imports no font. If a design asks for Inter and Fira Code, load them yourself and set `font-family` on `body` and on code elements.

## The class model

Every element is up to three independent classes: a shape, a style and a colour.

| Kind      | Classes                                                                                                                                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shape     | `pui-btn`, `pui-chip`, `pui-badge`, `pui-card`, `pui-list`, `pui-table`, `pui-accordion`, `pui-modal`, `pui-dropdown`, `pui-tooltip`, `pui-input`, `pui-input-group`, `pui-field-group`, `pui-checkbox`, `pui-radio`, `pui-switch`, `pui-timeline`, `pui-group-row`, `pui-group-col`, `pui-group-responsive`, `pui-float` |
| Style     | `pui-solid`, `pui-soft`, `pui-outline`, `pui-link`                                                                                                                                                                                                                                                                        |
| Colour    | `pui-theme`, `pui-success`, `pui-warn`, `pui-error`, `pui-muted`, `pui-surface`, `pui-inverse`                                                                                                                                                                                                                            |
| Modifiers | `pui-rounded-full` (pill), `pui-rounded` (radius back inside a group), `pui-striped`, `pui-hoverable`, `pui-highlighted`, `pui-top`, `pui-bottom`, `pui-start`, `pui-end`, `pui-align-center`, `pui-align-end`                                                                                                            |

Seven colours × four styles = 28 looks per shape. `pui-surface` follows the page background (the usual secondary button); `pui-inverse` is its opposite. Changing the colour never changes the markup.

```html
<button class="pui-btn pui-solid pui-theme">Save</button>
<button class="pui-btn pui-outline pui-surface">Cancel</button>
<a class="pui-btn pui-link pui-theme" href="#"
  >A link that looks like a button</a
>
<button class="pui-btn pui-solid pui-theme pui-rounded-full">Pill</button>
<button class="pui-btn pui-solid pui-theme" disabled>Disabled</button>
```

## Tokens

All colours are `light-dark()` pairs; the page declares `color-scheme: light dark`, so dark mode costs nothing.

| Custom property      | Light    | Dark    | Role                                      |
| -------------------- | -------- | ------- | ----------------------------------------- |
| `--pui-bg`           | #ffffff  | #000000 | page background                           |
| `--pui-bg-muted`     | #f3f4f6  | #111827 | card headers, addons, stripes, hover rows |
| `--pui-bg-emphasis`  | #e5e7eb  | #1f2937 | third level (code blocks)                 |
| `--pui-text`         | #000000  | #ffffff | text                                      |
| `--pui-text-muted`   | #676d7b  | #9ca3af | secondary text                            |
| `--pui-border`       | #d1d5db  | #374151 | borders                                   |
| `--pui-theme`        | #0092cd  | #07b6f0 | brand colour                              |
| `--pui-success`      | #16a34a  | #22c55e | positive                                  |
| `--pui-warn`         | #d97706  | #f59e0b | caution                                   |
| `--pui-error`        | #dc2626  | #ef4444 | destructive, invalid                      |
| `--pui-muted`        | #6b7280  | #9ca3af | neutral                                   |
| `--pui-radius`       | 0.375rem | same    | buttons, chips, inputs; cards use 9 px    |
| `--pui-space`        | 0.25rem  | same    | spacing unit                              |
| `--pui-font-size`    | 0.875rem | same    | component text                            |
| `--pui-border-width` | 1px      | same    | every border                              |

Soft tints are the role colour at 15% (22% on hover); outline hover is the colour at 10%; solid hover moves 12% toward the text colour. They are derived with `color-mix()`, so overriding `--pui-theme` repaints every variant. There are no shadow tokens: the library draws no shadows.

## Components

```html
<!-- chip and badge: same model as the button -->
<span class="pui-chip pui-soft pui-success">Active</span>
<span class="pui-badge pui-solid pui-error">3</span>

<!-- card -->
<div class="pui-card">
  <div class="pui-card-header">Card header</div>
  <div class="pui-card-content">Content goes here.</div>
</div>

<!-- list: add pui-striped or pui-hoverable -->
<ul class="pui-list pui-hoverable">
  <li class="pui-list-item">First</li>
  <li class="pui-list-item">Second</li>
</ul>

<!-- table: plain <table>, add pui-striped or pui-hoverable -->
<table class="pui-table pui-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
    </tr>
  </tbody>
</table>

<!-- accordion: <details>; the same name makes them exclusive -->
<div class="pui-accordion">
  <details class="pui-accordion-item" name="faq">
    <summary>What is Perfect UI?</summary>
    <p>A lightweight CSS and JavaScript library.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Does it need JavaScript?</summary>
    <p>Only to emulate what a browser is missing.</p>
  </details>
</div>

<!-- modal: <dialog> opened with commandfor + command, no script of yours -->
<button
  class="pui-btn pui-solid pui-theme"
  commandfor="confirm"
  command="show-modal"
>
  Delete project
</button>
<dialog class="pui-modal" id="confirm" closedby="any">
  <div class="pui-card">
    <div class="pui-card-header">Delete project</div>
    <div class="pui-card-content">
      This cannot be undone.
      <button
        class="pui-btn pui-solid pui-error"
        commandfor="confirm"
        command="close"
      >
        Delete
      </button>
    </div>
  </div>
</dialog>

<!-- dropdown: popover; position with pui-top, pui-start, pui-end, pui-align-center, pui-align-end -->
<button class="pui-btn pui-outline pui-surface" popovertarget="menu">
  Menu
</button>
<div class="pui-dropdown" id="menu" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item">Profile</li>
    <li class="pui-list-item">Sign out</li>
  </ul>
</div>

<!-- tooltip: interestfor; position with pui-bottom, pui-start, pui-end -->
<button class="pui-btn pui-outline pui-surface" interestfor="help">?</button>
<div class="pui-tooltip" id="help" popover="hint">
  We never share your email.
</div>

<!-- inputs: one class for input, select and textarea -->
<input class="pui-input" type="text" placeholder="Your name" />
<select class="pui-input">
  <option>Owner</option>
  <option>Editor</option>
</select>
<textarea class="pui-input" rows="3" placeholder="Your message"></textarea>

<!-- input group with an addon; field group with label and help -->
<div class="pui-input-group">
  <span class="pui-addon">https://</span>
  <input class="pui-input" value="perfectui.dev" />
</div>
<label class="pui-field-group">
  <span>Email</span>
  <input class="pui-input" type="email" aria-describedby="email-help" />
  <small id="email-help">We never share it.</small>
</label>

<!-- checkbox, radio, switch: native inputs -->
<label><input type="checkbox" class="pui-checkbox" /> Accept the terms</label>
<label><input type="radio" name="plan" class="pui-radio" checked /> Free</label>
<label
  ><input type="checkbox" class="pui-switch" checked /> Email
  notifications</label
>

<!-- timeline -->
<figure class="pui-timeline">
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-success">&check;</i>
    <article>
      <strong>Released v1.0.0</strong>
      <p>Shipped this morning.</p>
    </article>
  </figcaption>
</figure>

<!-- groups: row, column, or responsive (column on narrow screens) -->
<div class="pui-group-row">
  <button class="pui-btn pui-outline pui-surface">Left</button>
  <button class="pui-btn pui-outline pui-surface">Right</button>
</div>

<!-- floating action button -->
<button class="pui-btn pui-solid pui-theme pui-rounded-full pui-float">
  New post
</button>
```

## Dark mode and theme

- With no attribute the page follows the operating system. `<html data-pui-mode="dark">` or `"light"` forces a mode; never a `dark` class. From JavaScript: `import { setMode, getMode } from "@chrissgon/perfectui/mode"; setMode("dark")` sets the attribute and a `pui-mode` cookie; `setMode()` returns to the system.
- Theme: `:root { --pui-theme: #7c3aed }` repaints every component in both modes. Scope it to a subtree with `<section style="--pui-theme: #059669">`.

## Overriding

Every rule lives in `@layer pui.*`, so your own CSS and any Tailwind utility win without `!important`: `<button class="pui-btn pui-solid pui-theme w-full">` stretches the button. There is no reset, so nothing overlaps Tailwind's Preflight; point Tailwind's dark variant at `[data-pui-mode="dark"]`.

## Never

- Never invent a `pui-` class or a variant that is not in the tables above; combine the three kinds instead.
- Never restyle a `pui-` component's colours, radius or padding to "improve" it; the design is the library's. Override only layout (width, margin, position) with your own classes.
- Never add JavaScript to open, close or position a modal, dropdown, tooltip or accordion; the attributes do it. Never call an initialiser.
- Never add a CSS reset, a shadow or a font import "for the library"; it needs none.
- Never use `!important` against the library; the layer already gives your CSS priority.
- Never write text in a colour that is not `--pui-text`, `--pui-text-muted` or a role's ink; never put muted text on `--pui-bg-emphasis`, where it drops below 4.5:1.

## Examples

Request: "A settings page with a form, a danger zone and a confirmation modal, using perfectui."
Output: `pui-field-group` rows with `pui-input`, a `pui-switch` for toggles, a primary `pui-btn pui-solid pui-theme` and a secondary `pui-btn pui-outline pui-surface`; a `pui-card` for the danger zone with a `pui-btn pui-solid pui-error` that opens a `pui-modal` through `commandfor`/`command`; `data-pui-mode` left absent so the page follows the system; no custom colours, no shadows, no script beyond the library import.

Request: "Make the primary colour green and add a dark-mode toggle."
Output: `:root { --pui-theme: #059669 }`; a `pui-switch` whose change handler calls `setMode("dark")` or `setMode()`; nothing else changes.

## Checklist before finishing

- The stylesheet is pinned to `@chrissgon/perfectui@1.0.0-beta.1`; the module script is imported only if overlays or indeterminate checkboxes are used.
- Every component uses one shape class, one style class and one colour class from the tables, and nothing else from the `pui-` namespace.
- Overlays are driven by `commandfor`/`command`, `popovertarget`, `interestfor` and `<details>`; no click handlers open them.
- Colours come from the `--pui-*` tokens; the brand colour is changed only through `--pui-theme`.
- The page renders correctly with `data-pui-mode="dark"` and `"light"` without any other change.
