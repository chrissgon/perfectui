#### Components

# Chip

A chip is a button-sized label: smaller than `pui-btn`, larger than `pui-badge`. Use it for filters, tags and selections.

```html
<span class="pui-chip pui-soft pui-success">Active</span>
<span class="pui-chip pui-outline pui-muted">Draft</span>
```

### Sizing

Perfect UI has no size modifiers. Size is expressed by choosing the component:

```html
<button class="pui-btn pui-solid pui-theme">Button</button>
<span class="pui-chip pui-solid pui-theme">Chip</span>
<span class="pui-badge pui-solid pui-theme">Badge</span>
```

### Rounded

```html
<span class="pui-chip pui-soft pui-theme pui-rounded-full">Pill</span>
```

### Interactive

A chip can be a `<button>` when it does something:

```html
<button class="pui-chip pui-outline pui-muted">
  TypeScript
  <span aria-hidden="true">&times;</span>
</button>
```
