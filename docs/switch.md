#### Forms

# Switch

A switch is a checkbox that reads as on or off. It is the same native element, with the `pui-switch` class.

```html
<label>
  <input type="checkbox" class="pui-switch" />
  Email notifications
</label>
```

### On

```html
<input type="checkbox" class="pui-switch" checked />
```

### Colors

```html
<input type="checkbox" class="pui-switch" checked />
<input type="checkbox" class="pui-switch pui-success" checked />
<input type="checkbox" class="pui-switch pui-error" checked />
```

### Disabled

```html
<input type="checkbox" class="pui-switch" checked disabled />
```

### Checkbox or switch?

Both submit the same value. Use a checkbox when the choice is part of a form that gets submitted, and a switch when the change takes effect immediately.

The knob slides between the two states, and stays still for anyone who asked their system to reduce motion.
