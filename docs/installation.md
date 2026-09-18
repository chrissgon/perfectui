#### Getting Started

# Get started with Perfect UI

An exceptionally lightweight and highly customizable CSS and JavaScript library for crafting elegant user interfaces.

Perfect UI ships **the bare minimum**. It has no runtime dependencies, imports no fonts, and applies no CSS reset: every rule it ships is attached to a `pui-` class, so it never touches your markup.

### CDN

Place the `<link>` in the `<head>`. That is enough for every component that is pure CSS.

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.css"
    />
  </head>
  <body>
    <button class="pui-btn pui-solid pui-theme">My button</button>
  </body>
</html>
```

Perfect UI is **ESM only**, so the JavaScript is loaded as a module. You only need it if you use the overlays or the checkbox `indeterminate` attribute — see [what the script does](#what-the-script-does).

```html
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/js/index.js";
</script>
```

> ⚠️ Attention needed:
> Perfect UI no longer exposes anything on `window` or `document`. Everything is imported.

### Install by package manager

```bash
# npm
npm i @chrissgon/perfectui

# yarn
yarn add @chrissgon/perfectui

# pnpm
pnpm add @chrissgon/perfectui

# bun
bun add @chrissgon/perfectui
```

Import everything:

```js
import "@chrissgon/perfectui/perfectui.css";
```

Or import only what you use. `core.css` carries the tokens, the styles and the colors, and every component file needs it:

```js
import "@chrissgon/perfectui/core.css";
import "@chrissgon/perfectui/components/button.css";
import "@chrissgon/perfectui/components/card.css";
```

### What the script does

The script is a **loader**. It checks what your browser is missing and downloads only the fallback for that, nothing else. On a current browser that is a few hundred bytes, and on a browser that already has everything it downloads nothing at all.

```js
import "@chrissgon/perfectui";
```

You need it when you use the modal, the dropdown, the tooltip, or a checkbox with the `indeterminate` attribute. Everything else is CSS.

It is safe to import on the server: it does nothing when there is no DOM.

### Writing your first component

Every element is made of up to three independent classes:

| Piece     | Answers           | Examples                                                                                       |
| --------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| **Shape** | what is it        | `pui-btn`, `pui-chip`, `pui-badge`, `pui-card`                                                 |
| **Style** | how is it painted | `pui-solid`, `pui-soft`, `pui-outline`, `pui-link`                                             |
| **Color** | which color       | `pui-theme`, `pui-success`, `pui-error`, `pui-warn`, `pui-muted`, `pui-surface`, `pui-inverse` |

```html
<button class="pui-btn pui-solid pui-theme">Save</button>
<button class="pui-btn pui-outline pui-surface">Cancel</button>
<span class="pui-chip pui-soft pui-success">Active</span>
<span class="pui-badge pui-solid pui-error">3</span>
```

Mix them freely: every style works with every color, on every shape.
