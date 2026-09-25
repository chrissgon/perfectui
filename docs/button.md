#### Components

# Button

The `pui-btn` class turns a `<button>` or an `<a>` into a button. It brings the shape only: pair it with a style and a color.

```html live
<button class="pui-btn pui-solid pui-theme">Save</button>
<a class="pui-btn pui-solid pui-theme" href="#">A link that looks like one</a>
```

### Styles

```html live
<button class="pui-btn pui-solid pui-theme">Solid</button>
<button class="pui-btn pui-soft pui-theme">Soft</button>
<button class="pui-btn pui-outline pui-theme">Outline</button>
<button class="pui-btn pui-link pui-theme">Link</button>
```

### Colors

```html live
<button class="pui-btn pui-solid pui-theme">Theme</button>
<button class="pui-btn pui-solid pui-success">Success</button>
<button class="pui-btn pui-solid pui-error">Error</button>
<button class="pui-btn pui-solid pui-warn">Warn</button>
<button class="pui-btn pui-solid pui-muted">Muted</button>
```

Two colors are defined against the page rather than against a palette:

```html live
<!-- aligned with the page background: the usual secondary button -->
<button class="pui-btn pui-outline pui-surface">Cancel</button>
<!-- the opposite of the page background -->
<button class="pui-btn pui-solid pui-inverse">Continue</button>
```

### Rounded

```html live
<button class="pui-btn pui-solid pui-theme pui-rounded-full">Pill</button>
```

`pui-rounded` is the other half of the pair: it puts the default radius back on
an element that lost it, which is what a group does to the pieces inside it.

```html live
<div class="pui-group-row">
  <button class="pui-btn pui-outline pui-surface">Left</button>
  <button class="pui-btn pui-outline pui-surface pui-rounded">Detached</button>
</div>
```

### Disabled

```html live
<button class="pui-btn pui-solid pui-theme" disabled>Disabled</button>
```

For an element that is not a `<button>`, use `aria-disabled="true"`, which looks the same and is announced correctly.

### With an icon

`pui-btn` is a flex container with a gap, so an icon and a label line up on their own:

```html
<button class="pui-btn pui-solid pui-theme">
  <svg width="16" height="16"><!-- ... --></svg>
  Save
</button>
```

### Grouping

See [Layout Group](layout-group.md).
