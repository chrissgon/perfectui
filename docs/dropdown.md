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

The panel is placed under its trigger with CSS anchor positioning, and flips above when there is no room below. Browsers without anchor positioning get the same placement from the fallback, so import the script if you need to support them.

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
