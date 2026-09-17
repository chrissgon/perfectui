#### Components

# List

Styles `<ul>` and `<ol>` without touching either element globally: the class carries everything, including the reset of the browser's own indentation.

```html
<ul class="pui-list">
  <li class="pui-list-item">Now this is a story all about how</li>
  <li class="pui-list-item">my life got flipped turned upside down</li>
  <li class="pui-list-item">and I would like to take a minute</li>
</ul>
```

Ordered lists work the same way:

```html
<ol class="pui-list">
  <li class="pui-list-item">First</li>
  <li class="pui-list-item">Second</li>
</ol>
```

### No markers

There is no class for this, because it is one declaration:

```html
<ul class="pui-list" style="list-style: none">
  <li class="pui-list-item">No bullet</li>
</ul>
```

### Selected and bordered items

An item is an ordinary colorable element, so a selection is a style plus a color — the same classes you use everywhere else:

```html
<ul class="pui-list" style="list-style: none">
  <li class="pui-list-item">Plain</li>
  <li class="pui-list-item pui-soft pui-theme">Selected</li>
  <li class="pui-list-item pui-outline pui-surface">Bordered</li>
</ul>
```

### Striped and hoverable

These two need a structural selector, so they ship as modifiers on the list itself:

```html
<ul class="pui-list pui-striped pui-hoverable">
  <li class="pui-list-item">One</li>
  <li class="pui-list-item">Two</li>
  <li class="pui-list-item">Three</li>
</ul>
```

### As a menu

A list inside a dropdown is the usual menu:

```html
<div class="pui-dropdown" id="menu" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item">Profile</li>
    <li class="pui-list-item">Billing</li>
    <li class="pui-list-item">Sign out</li>
  </ul>
</div>
```
