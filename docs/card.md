#### Components

# Card

A container with a border and a rounded frame. A card is a **surface**: it already looks right with no style or color class.

```html live
<div class="pui-card">
  <div class="pui-card-header">Card header</div>
  <div class="pui-card-content">
    <span>Content goes here.</span>
  </div>
</div>
```

| Class              | Role                                          |
| ------------------ | --------------------------------------------- |
| `pui-card`         | the frame: border, radius, clipping           |
| `pui-card-header`  | a muted band at the top                       |
| `pui-card-content` | the body, a grid so children space themselves |

### Content spacing

`pui-card-content` is a grid with a gap, so children do not need margins:

```html live
<div class="pui-card">
  <div class="pui-card-content">
    <h3>Delete project</h3>
    <p>This cannot be undone.</p>
    <div class="pui-group-row">
      <button class="pui-btn pui-outline pui-surface">Cancel</button>
      <button class="pui-btn pui-solid pui-error">Delete</button>
    </div>
  </div>
</div>
```

### Recoloring a card

A style class still wins over the card's own surface:

```html live
<div class="pui-card pui-soft pui-warn">
  <div class="pui-card-content">Careful with this one.</div>
</div>
```

### A card as a container

A table sits flush inside a card: the card draws the outer border, the table draws the rules between rows.

```html
<div class="pui-card">
  <div class="pui-card-header">Users</div>
  <table class="pui-table pui-striped">
    <!-- ... -->
  </table>
</div>
```
