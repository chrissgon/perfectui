#### Components

# Table

One class on the `<table>`. The cells are styled from there, so no class goes on a `<th>` or a `<td>`.

```html
<table class="pui-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Owner</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Editor</td>
    </tr>
  </tbody>
</table>
```

The last row of the table never draws a rule, so a table can sit flush inside a card.

### Striped and hoverable

```html
<table class="pui-table pui-striped">
  <!-- ... -->
</table>

<table class="pui-table pui-hoverable">
  <!-- ... -->
</table>

<table class="pui-table pui-striped pui-hoverable">
  <!-- ... -->
</table>
```

### A footer

A `<tfoot>` is rendered as a summary band, so a total reads as part of the table:

```html
<table class="pui-table">
  <tbody>
    <tr>
      <td>Licence</td>
      <td>120.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <th>160.00</th>
    </tr>
  </tfoot>
</table>
```

### Components in cells

```html
<td><span class="pui-badge pui-soft pui-success">active</span></td>
<td><button class="pui-btn pui-link pui-theme">Edit</button></td>
```

### Coloring a row

A `<tr>` takes a style and a color like anything else, and wins over the stripe:

```html
<tr class="pui-soft pui-error">
  <td>2</td>
  <td>Jacob</td>
  <td>failed</td>
</tr>
```

### Recipes

These used to be modifier classes. They are one or two rules of your own CSS, which keeps them out of everyone else's bundle.

**Responsive** — the scroll container is the parent, not the table:

```css
.table-wrapper {
  overflow-x: auto;
}
```

```html
<div class="table-wrapper">
  <table class="pui-table">
    <!-- ... -->
  </table>
</div>
```

**Bordered** — grid lines on every cell:

```css
.table-bordered {
  border: var(--pui-border-width) solid var(--pui-border);
  border-radius: var(--pui-radius);
  overflow: hidden;
}
.table-bordered :is(th, td) {
  border: var(--pui-border-width) solid var(--pui-border);
}
```

**Borderless**:

```css
.table-borderless :is(th, td) {
  border: none;
}
```

**Compact rows**:

```css
.table-compact :is(th, td) {
  padding-block: var(--pui-space);
}
```

**Numbers aligned to the end**:

```css
.table-numeric :is(th, td):last-child {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
```
