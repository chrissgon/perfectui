#### Getting Started

# Get started with Perfect UI

An exceptionally lightweight and highly customizable CSS and JavaScript framework for crafting elegant user interfaces.

### Play CDN

Place the `<link>` tag in the `<head>` for our CSS, and the `<script>` tag for our JavaScript bundle before the closing `</body>`

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- import css -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.css"
    />
  </head>
  <body>
    <button class="btn btn-solid-primary">My button</button>

    <!-- import javascript -->
    <script src="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js"></script>
  </body>
</html>
```

When imported via CDN, Perfect UI provides methods in `window` and `document`.

```js
console.log(window.perfectui); // { setMode: ƒ ...}
console.log(document.perfectui); // { setMode: ƒ ...}
```

You can also import Perfect UI as a module by CDN.

```html
<script type="module">
  import * as perfectUI from "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js";
  console.log(perfectUI); // { setMode: ƒ ...}
</script>
```

### Install by package manager

You can also install Perfect UI by package manager.

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

After installation, import the styles and methods in your `.js` or `.ts` file.

```ts
import { setMode } from "@chrissgon/perfectui";
import "@chrissgon/perfectui/dist/perfectui.css";
```
