#### Forms

# Radio

A native `<input type="radio">` with the `pui-radio` class. Grouping, arrow-key navigation and the one-of-many behavior all come from the `name` attribute.

```html
<label>
  <input type="radio" name="plan" class="pui-radio" checked />
  Free
</label>
<label>
  <input type="radio" name="plan" class="pui-radio" />
  Pro
</label>
```

### Colors

```html
<input type="radio" name="color" class="pui-radio" checked />
<input type="radio" name="color" class="pui-radio pui-success" checked />
<input type="radio" name="color" class="pui-radio pui-warn" checked />
```

### Disabled

```html
<input type="radio" name="plan" class="pui-radio" checked disabled />
```

### A group of options

```html
<fieldset>
  <legend>Plan</legend>
  <label><input type="radio" name="plan" class="pui-radio" /> Free</label>
  <label><input type="radio" name="plan" class="pui-radio" /> Pro</label>
  <label><input type="radio" name="plan" class="pui-radio" /> Team</label>
</fieldset>
```

> ⚠️ Attention needed:
> A `<fieldset>` with a `<legend>` is what tells a screen reader that the options belong together. Perfect UI does not style either element, so they look like your page.
