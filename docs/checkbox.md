#### Forms

# Checkbox

A native `<input type="checkbox">` with the `pui-checkbox` class.

```html live
<label>
  <input type="checkbox" class="pui-checkbox" />
  Accept the terms
</label>
```

### Checked

```html live
<input type="checkbox" class="pui-checkbox" checked />
```

### Colors

A color class paints the checked state, the same classes used everywhere else:

```html live
<input type="checkbox" class="pui-checkbox" checked />
<input type="checkbox" class="pui-checkbox pui-success" checked />
<input type="checkbox" class="pui-checkbox pui-error" checked />
```

Without a color class it uses the theme color.

### Indeterminate

The third state — neither checked nor unchecked — is normally a JavaScript property, which makes it impossible to express in markup. Perfect UI accepts it as an attribute:

```html live
<input type="checkbox" class="pui-checkbox" indeterminate />
```

> [!WARNING]
>
> This is the one case that always needs the script, because no browser has this attribute natively. The attribute is removed as soon as the user clicks the checkbox.

It works on checkboxes rendered at any time, by a framework or a client-side route, with nothing to call. One exception: if your page turns animations off everywhere (`* { animation: none !important }`) or animates this checkbox itself, a checkbox rendered after the page loaded shows the mixed state from the reader's first click or focus on the page instead.

The property keeps working as usual:

```js
input.indeterminate = true;
```

### Disabled

```html live
<input type="checkbox" class="pui-checkbox" checked disabled />
```

### With a label and a message

```html live
<label class="pui-field-group">
  <span>Newsletter</span>
  <input type="checkbox" class="pui-checkbox" aria-describedby="news-help" />
  <small id="news-help">One email a month, no more.</small>
</label>
```
