#### General

# Layout Group

Joins elements into a single control: the inner corners are squared off and the border between two neighbours becomes one line instead of two.

### How it works

Put `pui-group-row` or `pui-group-col` on the container. The children need **no class of their own**.

```html
<div class="pui-group-row">
  <button class="pui-btn pui-outline pui-surface">Left</button>
  <button class="pui-btn pui-outline pui-surface">Middle</button>
  <button class="pui-btn pui-outline pui-surface">Right</button>
</div>
```

```html
<div class="pui-group-col">
  <button class="pui-btn pui-outline pui-surface">Profile</button>
  <button class="pui-btn pui-outline pui-surface">Billing</button>
  <button class="pui-btn pui-outline pui-surface">Sign out</button>
</div>
```

### A segmented control

Because the pieces keep their own style and color classes, a selected item is just a different style:

```html
<div class="pui-group-row">
  <button class="pui-btn pui-outline pui-surface">Day</button>
  <button class="pui-btn pui-solid pui-theme">Week</button>
  <button class="pui-btn pui-outline pui-surface">Month</button>
</div>
```

### Mixing controls

Anything can go in a group, in any order:

```html
<div class="pui-group-row">
  <select class="pui-input">
    <option>All</option>
  </select>
  <input class="pui-input" placeholder="Query" />
  <button class="pui-btn pui-solid pui-theme">Search</button>
</div>
```

### Responsive

`pui-group-responsive` is a row on screens wider than `1024px` and a column below that.

```html
<div class="pui-group-responsive">
  <button class="pui-btn pui-outline pui-surface">Left</button>
  <button class="pui-btn pui-outline pui-surface">Middle</button>
  <button class="pui-btn pui-outline pui-surface">Right</button>
</div>
```

### Other components

An accordion joins the same way:

```html
<div class="pui-accordion pui-group-col">
  <details class="pui-accordion-item" name="faq">
    <summary>First question</summary>
    <p>First answer</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Second question</summary>
    <p>Second answer</p>
  </details>
</div>
```

And a timeline turns horizontal:

```html
<figure class="pui-timeline pui-group-row">
  <!-- checkpoints -->
</figure>
```
