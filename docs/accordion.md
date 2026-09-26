#### Components

# Accordion

Built on `<details>`. Opening, closing and keyboard support come from the browser: this component is **pure CSS**, with no script at all.

```html live name=basic
<div class="pui-accordion">
  <details class="pui-accordion-item">
    <summary>What is Perfect UI?</summary>
    <p>A lightweight CSS and JavaScript library.</p>
  </details>
  <details class="pui-accordion-item">
    <summary>Does it need JavaScript?</summary>
    <p>Only to emulate what a browser is missing.</p>
  </details>
</div>
```

### One open at a time

Give the items the same `name`. The browser closes the others for you:

```html live
<div class="pui-accordion">
  <details class="pui-accordion-item" name="faq">
    <summary>First question</summary>
    <p>First answer</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Second question</summary>
    <p>Second answer</p>
  </details>
</div>
```

### Open by default

```html live
<details class="pui-accordion-item" name="faq" open>
  <summary>Open on load</summary>
  <p>Content</p>
</details>
```

### One block

Consecutive items share the line between them, and only the outer corners stay round — an accordion reads as one block, not as a stack of cards. Nothing to add: this is what the first example already does. A lone item keeps all four corners, since it is both the first child and the last.

Spacing them apart instead is two rules of your own:

```css
.accordion-spaced {
  gap: var(--pui-space);
}
.accordion-spaced > .pui-accordion-item {
  margin-block-start: 0;
  border-radius: var(--pui-radius);
}
```

### Marking the open item

`pui-highlighted` on the container gives the expanded item the same background as a card header, so a long list shows where you are. It replaces v0's `accordion-accented`:

```html live
<div class="pui-accordion pui-highlighted">
  <details class="pui-accordion-item" name="faq" open>
    <summary>Expanded</summary>
    <p>This item carries the band.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Collapsed</summary>
    <p>This one does not.</p>
  </details>
</div>
```

For a different tone, one rule of your own is enough — `--pui-bg-emphasis` is there for a third level:

```css
.pui-accordion.pui-highlighted > .pui-accordion-item[open] {
  background-color: var(--pui-bg-emphasis);
}
```

### Your own icon

Put an element with `pui-accordion-icon` in the summary and the drawn chevron
steps aside. Placement and the rotation on open stay with the library:

```html live
<details class="pui-accordion-item">
  <summary>
    Question
    <i class="pui-accordion-icon bi-chevron-down"></i>
  </summary>
  <p>Answer</p>
</details>
```

Anything works — an icon font, an inline `<svg>`, or a character.

### Reacting to it

`<details>` fires a `toggle` event, and `open` is a property:

```js
document
  .querySelector(".pui-accordion-item")
  .addEventListener("toggle", (event) => {
    console.log(event.target.open);
  });
```
