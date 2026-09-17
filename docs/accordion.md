#### Components

# Accordion

Built on `<details>`. Opening, closing and keyboard support come from the browser: this component is **pure CSS**, with no script at all.

```html
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

```html
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

```html
<details class="pui-accordion-item" name="faq" open>
  <summary>Open on load</summary>
  <p>Content</p>
</details>
```

### Joined items

`pui-accordion` spaces the items. Add `pui-group-col` to join them into a single block:

```html
<div class="pui-accordion pui-group-col">
  <details class="pui-accordion-item" name="faq">
    <summary>First</summary>
    <p>One</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Second</summary>
    <p>Two</p>
  </details>
</div>
```

### Reacting to it

`<details>` fires a `toggle` event, and `open` is a property:

```js
document
  .querySelector(".pui-accordion-item")
  .addEventListener("toggle", (event) => {
    console.log(event.target.open);
  });
```
