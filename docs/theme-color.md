#### Customization

# Theme Color

Theming is CSS. There is no JavaScript API: you override the custom properties you want, wherever you want.

```css
:root {
  --pui-theme: #7c3aed;
}
```

That single line repaints every component that uses the theme color, in both modes, including hover tones and the soft and outline variants — they are all derived from it with `color-mix()`.

### The tokens

```css
:root {
  /* surfaces */
  --pui-bg: light-dark(#fff, #000);
  --pui-bg-muted: light-dark(#f3f4f6, #111827);
  --pui-bg-emphasis: light-dark(#e5e7eb, #1f2937);

  /* text */
  --pui-text: light-dark(#000, #fff);
  --pui-text-muted: light-dark(#676d7b, #9ca3af);

  /* border */
  --pui-border: light-dark(#d1d5db, #374151);

  /* state colors */
  --pui-theme: light-dark(#0092cd, #07b6f0);
  --pui-success: light-dark(#16a34a, #22c55e);
  --pui-error: light-dark(#dc2626, #ef4444);
  --pui-warn: light-dark(#d97706, #f59e0b);
  --pui-muted: light-dark(#6b7280, #9ca3af);

  /* everything that is not a color */
  --pui-radius: 0.375rem;
  --pui-space: 0.25rem;
  --pui-font-size: 0.875rem;
  --pui-border-width: 1px;
}
```

### One value per mode

Use `light-dark()` when the two modes need different values:

```css
:root {
  --pui-theme: light-dark(#6d28d9, #a78bfa);
}
```

### Rescaling the library

Only four tokens are not colors, and every component derives its size from them. Changing one rescales everything at once:

```css
:root {
  --pui-radius: 0; /* square corners everywhere */
  --pui-font-size: 1rem; /* a larger library */
  --pui-space: 0.3rem; /* roomier components */
}
```

### Theming one region

The tokens are ordinary custom properties, so they cascade:

```html
<section style="--pui-theme: #059669">
  <button class="pui-btn pui-solid pui-theme">Green in here only</button>
</section>
```

### Overriding a dark brand color

A solid fill puts the page background on top of your color as its label. If you replace a color with a **dark** one, set the label color too:

```css
.pui-theme {
  --pui-color: #1e1b4b;
  --pui-on-color: #fff;
}
```
