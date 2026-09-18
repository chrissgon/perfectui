#### Forms

# Textarea

The same `pui-input` class, on a `<textarea>`.

```html
<textarea class="pui-input" rows="3" placeholder="Your message"></textarea>
```

It resizes vertically only, so a textarea cannot break the layout sideways.

### With a label

```html
<label class="pui-field-group">
  <span>Notes</span>
  <textarea class="pui-input" rows="4" aria-describedby="notes-help"></textarea>
  <small id="notes-help">Markdown is supported.</small>
</label>
```

### Growing with its content

Browsers can size a textarea to its text, no script needed:

```css
.pui-input {
  field-sizing: content;
}
```
