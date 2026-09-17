![Perfect UI](https://i.ibb.co/FJGxtZ5/perfectui.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Perfect UI

An exceptionally lightweight and highly customizable CSS and JavaScript library for crafting elegant user interfaces. 🎨💡

Perfect UI ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Behavior comes from the browser — `<details>`, `<dialog>`, `popover` — and JavaScript only fills in what a browser is missing.

## 📦 Install

### By package manager

- Install package

```bash
# npm
npm i @chrissgon/perfectui

# yarn
yarn add @chrissgon/perfectui

# pnpm
pnpm i @chrissgon/perfectui

# bun
bun i @chrissgon/perfectui
```

- Import library on your project.

```js
import "@chrissgon/perfectui/perfectui.css";
```

Or import only the components you use:

```js
import "@chrissgon/perfectui/core.css";
import "@chrissgon/perfectui/components/button.css";
```

The JavaScript is optional. It is a loader that downloads a fallback only for
what your browser is missing, and you need it for the overlays and for the
checkbox `indeterminate` attribute:

```js
import "@chrissgon/perfectui";
import { setMode } from "@chrissgon/perfectui/mode";
```

### By CDN's.

- Import CDN's on your html.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.css"
/>

<script type="module">
  import "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/js/index.js";
</script>
```

Perfect UI is ESM only and exposes nothing on `window` or `document`.

## ✍🏻 Writing a component

Every element is made of up to three independent classes: a shape, a style and
a color.

```html
<button class="pui-btn pui-solid pui-theme">Save</button>
<button class="pui-btn pui-outline pui-surface">Cancel</button>
<span class="pui-chip pui-soft pui-success">Active</span>
```

## 📚 Documentation

Read all documentation in [docs](https://github.com/chrissgon/perfectui/tree/main/docs) folder or in the [official website](https://perfectui.netlify.app/).

Coming from `0.x`? See [MIGRATION.md](https://github.com/chrissgon/perfectui/blob/main/MIGRATION.md).

## 💪🏻 Contribution

This project is open source and welcomes community contributions. Feel free to fork, implement improvements, and submit a pull request. Every contribution is valued and appreciated!

Feel free to explore the source code, provide feedback, and report any issues you encounter.

[Perfect UI Figma](https://www.figma.com/file/szD991W25tQxPuqhfRektk/PerfectUI?type=design&t=NFXUM1OyFfIo9Csc-6) is free for both commercial and personal projects.

## ❤️ Authors

- [@chrissgon](https://www.github.com/chrissgon)
