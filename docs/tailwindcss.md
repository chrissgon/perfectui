#### Getting Started

# Tailwind CSS

Perfect UI and Tailwind complement each other: Perfect UI gives you components, Tailwind gives you layout, spacing and typography utilities.

Perfect UI does **not** depend on Tailwind, and Tailwind is not required to use it.

### How the cascade decides

Every rule Perfect UI ships lives inside a cascade layer, `@layer pui.*`. Two rules of the cascade decide who wins, before specificity is even compared:

1. CSS outside any layer beats every layer.
2. Between layers, the layer **declared last** wins. A layer is declared the first time its name appears, in an `@layer a, b, c;` statement or in an `@layer` block.

Your own CSS, written outside any layer, always beats the library with no `!important`:

```css
.checkout-button {
  border-radius: 0; /* beats pui-btn without !important */
}
```

Tailwind is different, and the version matters.

### Tailwind v4: declare the layer order once

Tailwind v4 puts its own CSS in layers too: `theme`, `base` (Preflight, its reset), `components` and `utilities`. With two libraries in layers, the import order silently decides who wins, and both orders break something:

| Import order                      | Preflight vs the library                           | Utilities vs the library                    |
| --------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| Tailwind first, Perfect UI second | the library wins                                   | the library wins: `rounded-none` is ignored |
| Perfect UI first, Tailwind second | Preflight wins: buttons lose their fill and radius | utilities win                               |

Declare the order yourself, as the first line of the stylesheet, and both problems disappear: Preflight sits below the library and utilities sit above it.

```css
/* app.css */
@layer theme, base, pui, components, utilities;

@import "tailwindcss";
@import "@chrissgon/perfectui/perfectui.css";
```

`pui` in the list places every `pui.*` layer of the library at once, so its internal order is kept. Then utilities win as expected:

```html live
<!-- keeps the solid theme fill from Perfect UI; the corners and width come from Tailwind -->
<button class="pui-btn pui-solid pui-theme rounded-none w-full">Save</button>
```

If you import the component stylesheets one by one (`core.css` plus `components/*.css`), the same line works, because every file of the library uses `pui.*` layers.

### Tailwind v3: turn Preflight off

Tailwind v3 writes its CSS outside any layer. Its utilities therefore beat the library, which is what you want, but so does Preflight, which resets every `<button>` to a transparent background: a `pui-btn pui-solid` loses its fill.

Turn Preflight off, since Perfect UI does not need it:

```js
// tailwind.config.js
export default {
  corePlugins: { preflight: false }
};
```

If the rest of your page needs Preflight, keep it and add the fill back only where you use Perfect UI buttons with your own unlayered rule; there is no layer order to declare in v3.

### Dark mode

Perfect UI switches modes with `data-pui-mode` on `<html>`. Point Tailwind's dark variant at the same attribute so both react together:

```css
/* Tailwind v4 */
@import "tailwindcss";
@custom-variant dark (&:where([data-pui-mode="dark"], [data-pui-mode="dark"] *));
```

```js
// Tailwind v3
export default {
  darkMode: ["selector", '[data-pui-mode="dark"]']
};
```

See [Dark Mode](darkmode.md) for how the attribute is set and persisted.

### Preflight

Preflight is Tailwind's reset. Perfect UI ships no reset and styles no bare elements, but Preflight styles bare elements that Perfect UI components use, such as `<button>`, so it can remove a component's fill or radius when it wins the cascade. With Tailwind v4 the layer declaration above keeps it below the library; with Tailwind v3 turn it off. Measured with Tailwind 4.3.3 and 3.4.17 against Perfect UI 1.0.0-beta.1.
