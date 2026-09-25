#### Forms

# Field Group

Wraps a control with its label and its message. Both are **real elements**, so screen readers announce them, browsers translate them, and users can select the text.

```html live
<label class="pui-field-group">
  <span>Email</span>
  <input class="pui-input" type="email" aria-describedby="email-help" />
  <small id="email-help">We never share it.</small>
</label>
```

| Element     | Role                              |
| ----------- | --------------------------------- |
| `<span>`    | the label                         |
| the control | `pui-input`, a checkbox, anything |
| `<small>`   | the message, help text or error   |

No class goes on the children: they are matched by their tag. The `<label>` wrapper is what makes clicking the label focus the control.

### Errors

The error state is `aria-invalid` on the control. There is no error class:

```html live
<label class="pui-field-group">
  <span>Password</span>
  <input
    class="pui-input"
    type="password"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <small id="password-error">Must be at least 8 characters.</small>
</label>
```

The control's border turns red and the message follows it. Because the state lives on the control, a screen reader announces the field as invalid — a class could never do that.

```js
input.setAttribute("aria-invalid", "true");
input.removeAttribute("aria-invalid");
```

> [!WARNING]
>
> `aria-describedby` is what ties the message to the control. Without it the message is visible but never announced.

### Any control

```html live
<label class="pui-field-group">
  <span>Role</span>
  <select class="pui-input">
    <option>Owner</option>
    <option>Editor</option>
  </select>
</label>

<label class="pui-field-group">
  <span>Notes</span>
  <textarea class="pui-input" rows="3"></textarea>
</label>
```
