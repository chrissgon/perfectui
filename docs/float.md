#### General

# Float

Pins an element to a corner of the viewport, for a floating action button or a persistent shortcut.

```html
<button class="pui-btn pui-solid pui-theme pui-rounded-full pui-float">
  New post
</button>
```

The default corner is the bottom start one — bottom left in a left-to-right page, bottom right in a right-to-left one.

### The other corners

There is no modifier class, because a corner is one declaration of your own CSS:

```css
/* bottom end */
.pui-float {
  inset-inline: auto 1.5rem;
}

/* top start */
.pui-float {
  inset-block: 1.5rem auto;
}

/* top end */
.pui-float {
  inset-block: 1.5rem auto;
  inset-inline: auto 1.5rem;
}
```
