#### Forms

# Input Group

Joins a control with an addon into a single field: one border, one radius, one focus ring.

```html live
<div class="pui-input-group">
  <span class="pui-addon">https://</span>
  <input class="pui-input" value="perfectui.dev" />
</div>
```

The addon can sit on either side, or on both:

```html live
<div class="pui-input-group">
  <input class="pui-input" placeholder="Amount" />
  <span class="pui-addon">BRL</span>
</div>

<div class="pui-input-group">
  <span class="pui-addon">R$</span>
  <input class="pui-input" />
  <span class="pui-addon">,00</span>
</div>
```

### With a button

Anything dropped into the group gives up its own frame, so a button needs no extra markup:

```html live
<div class="pui-input-group">
  <input class="pui-input" placeholder="Search" />
  <button class="pui-btn pui-solid pui-theme">Go</button>
</div>
```

### Errors

`aria-invalid` on the group colors the whole field:

```html live
<div class="pui-input-group" aria-invalid="true">
  <span class="pui-addon">@</span>
  <input class="pui-input" value="not an email" />
</div>
```

### Inside a field group

```html live
<label class="pui-field-group">
  <span>Website</span>
  <div class="pui-input-group">
    <span class="pui-addon">https://</span>
    <input class="pui-input" />
  </div>
  <small>Without the protocol.</small>
</label>
```
