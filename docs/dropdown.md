#### Components

# Dropdown

Built on the popover API. The browser handles the top layer, closing on an outside click, and closing on escape.

```html
<button class="pui-btn pui-outline pui-surface" popovertarget="menu">
  Menu
</button>

<div class="pui-dropdown" id="menu" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item">Profile</li>
    <li class="pui-list-item">Billing</li>
    <li class="pui-list-item">Sign out</li>
  </ul>
</div>
```

`popovertarget` on the trigger, `popover` on the panel. There is no script and no wiring.

### Placement

The panel is placed under its trigger, aligned to its starting edge, and flips above when there is no room below.

Three classes move it elsewhere:

```html
<div class="pui-dropdown pui-top" id="menu" popover>Above the trigger</div>
<div class="pui-dropdown pui-start" id="menu" popover>Before the trigger</div>
<div class="pui-dropdown pui-end" id="menu" popover>After the trigger</div>
```

| Class       | Where it goes                    |
| ----------- | -------------------------------- |
| _(none)_    | below                            |
| `pui-top`   | above                            |
| `pui-start` | to the left, or the right in RTL |
| `pui-end`   | to the right, or the left in RTL |

Each one flips to the opposite side when the preferred one does not fit, so a menu never opens off screen.

### Alignment

A panel that opens above or below lines up with the trigger's starting edge. Two classes move it along that axis:

```html
<div class="pui-dropdown pui-align-center" id="menu" popover>Centered</div>
<div class="pui-dropdown pui-align-end" id="menu" popover>
  Aligned to the end
</div>
```

| Class              | Where it lines up                |
| ------------------ | -------------------------------- |
| _(none)_           | with the trigger's starting edge |
| `pui-align-center` | centered on the trigger          |
| `pui-align-end`    | with the trigger's ending edge   |

`pui-align-end` is what a menu at the end of a header wants, so it opens inward instead of running off the page.

Placement uses CSS anchor positioning. Browsers that do not have it yet get the same placement, including the direction classes, from the fallback in the script.

### Anything can go inside

The panel is a container, not a menu. A list is the common case, but a form or a card work just as well:

```html
<div class="pui-dropdown" id="filters" popover>
  <label class="pui-field-group">
    <span>Search</span>
    <input class="pui-input" />
  </label>
</div>
```

### Closing from inside

```html
<div class="pui-dropdown" id="menu" popover>
  <button
    class="pui-btn pui-link pui-theme"
    popovertarget="menu"
    popovertargetaction="hide"
  >
    Close
  </button>
</div>
```

> ⚠️ Attention needed:
> Clicking inside a popover does not close it, so the old `.ignore` class is gone.

### From JavaScript

```js
const menu = document.getElementById("menu");
menu.showPopover();
menu.hidePopover();
menu.togglePopover();
```
