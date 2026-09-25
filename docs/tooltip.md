#### Components

# Tooltip

Built on `interestfor` and `popover="hint"`. It appears on hover, on keyboard focus, and on a long press — which is what makes it work on touch screens, unlike the old tooltip.

```html live name=basic
<button class="pui-btn pui-outline pui-surface" interestfor="help">?</button>

<div class="pui-tooltip" id="help" popover="hint">
  We never share your email.
</div>
```

`interestfor` names the tooltip, and that is the whole API.

> [!WARNING]
>
> This is the component that most needs the script today: `interestfor` is only in Chromium so far, so everywhere else the fallback provides the hover, focus and long press behavior.

### Placement

The tooltip sits above its trigger and flips below when there is no room. Three classes move it elsewhere:

```html
<div class="pui-tooltip pui-bottom" id="help" popover="hint">Below</div>
<div class="pui-tooltip pui-start" id="help" popover="hint">Before</div>
<div class="pui-tooltip pui-end" id="help" popover="hint">After</div>
```

| Class        | Where it goes                    |
| ------------ | -------------------------------- |
| _(none)_     | above                            |
| `pui-bottom` | below                            |
| `pui-start`  | to the left, or the right in RTL |
| `pui-end`    | to the right, or the left in RTL |

### Styles

A tooltip is an ordinary colorable element, so it takes any style and color pair:

```html
<div class="pui-tooltip pui-solid pui-inverse" popover="hint">Dark</div>
<div class="pui-tooltip pui-solid pui-theme" popover="hint">Theme</div>
<div class="pui-tooltip pui-soft pui-warn" popover="hint">A warning</div>
```

### On any element

```html live
<span interestfor="definition" tabindex="0">CLS</span>
<div class="pui-tooltip" id="definition" popover="hint">
  Cumulative Layout Shift
</div>
```

> [!WARNING]
>
> A tooltip has to be reachable by keyboard. If the trigger is not already focusable, give it `tabindex="0"`.

### Why `popover="hint"`

A hint can appear while a menu is open without closing it, which a regular popover cannot do. Where the browser does not know the value yet it behaves as a normal popover, so the tooltip still works.
