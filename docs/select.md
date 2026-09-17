#### Forms

# Select

The same `pui-input` class, on a `<select>`.

```html
<select class="pui-input">
  <option>Owner</option>
  <option>Editor</option>
  <option>Viewer</option>
</select>
```

The arrow is drawn in CSS from the current text color, so it follows your theme and the color mode without shipping an image.

### With a label

```html
<label class="pui-field-group">
  <span>Role</span>
  <select class="pui-input">
    <option value="">Choose one</option>
    <option value="owner">Owner</option>
  </select>
</label>
```

### Multiple and grouped

```html
<select class="pui-input" multiple size="4">
  <optgroup label="Admins">
    <option>Mark</option>
  </optgroup>
  <optgroup label="Members">
    <option>Jacob</option>
  </optgroup>
</select>
```

### Dark mode

The dropdown list and its options are drawn by the operating system. Perfect UI declares `color-scheme`, so they follow the page mode on their own.
