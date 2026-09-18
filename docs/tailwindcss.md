#### Getting Started

# Tailwind CSS

Perfect UI does **not** depend on Tailwind, and Tailwind is not required to use it. They complement each other: Perfect UI gives you components, Tailwind gives you layout, spacing and typography utilities.

### They do not fight

Every rule Perfect UI ships lives inside `@layer pui.*`. Any unlayered CSS wins over a cascade layer, and Tailwind's utilities are unlayered, so a utility always beats the library with no `!important` and no specificity tricks.

```html
<!-- w-full comes from Tailwind and wins over the component's own width -->
<button class="pui-btn pui-solid pui-theme w-full">Save</button>
```

The same is true of your own CSS:

```css
.checkout-button {
  border-radius: 0; /* beats pui-btn without !important */
}
```

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

See [Dark Mode](https://github.com/chrissgon/perfectui/blob/main/docs/darkmode.md) for how the attribute is set and persisted.

### Preflight

Tailwind's Preflight is a reset. Perfect UI ships no reset and styles no bare elements, so the two do not overlap — whichever order you import them in, nothing is overwritten.
