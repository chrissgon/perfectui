#### Components

# Modal

Built on `<dialog>`. The browser handles the top layer, the backdrop, focus trapping and the escape key.

```html
<button
  class="pui-btn pui-solid pui-theme"
  commandfor="confirm"
  command="show-modal"
>
  Delete project
</button>

<dialog class="pui-modal" id="confirm" closedby="any">
  <div class="pui-card">
    <div class="pui-card-header">Delete project</div>
    <div class="pui-card-content">
      <span>This cannot be undone.</span>
      <div class="pui-group-row">
        <button
          class="pui-btn pui-outline pui-surface"
          commandfor="confirm"
          command="close"
        >
          Cancel
        </button>
        <button
          class="pui-btn pui-solid pui-error"
          commandfor="confirm"
          command="close"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</dialog>
```

No script is written above. `commandfor` names the dialog and `command` says what to do with it.

| Attribute              | Meaning                         |
| ---------------------- | ------------------------------- |
| `command="show-modal"` | open it as a modal              |
| `command="close"`      | close it                        |
| `closedby="any"`       | clicking the backdrop closes it |
| no `closedby`          | only the escape key closes it   |

> ⚠️ Attention needed:
> Import the script for the modal. Browsers that do not have `commandfor` or `closedby` yet get a fallback, and browsers that do download nothing.

### The surface comes from a card

`pui-modal` is only a frame: it centers the dialog, sizes it and dims the page. What it looks like is whatever you put inside, which is usually a card. A modal is composed from pieces you already know.

### A static backdrop

Leave `closedby` off and the backdrop stops dismissing the dialog:

```html
<dialog class="pui-modal" id="terms">
  <!-- ... -->
</dialog>
```

### From JavaScript

The element is a plain `<dialog>`:

```js
const modal = document.getElementById("confirm");
modal.showModal();
modal.close();
modal.addEventListener("close", () => console.log("closed"));
```

### Long content

The dialog scrolls on its own once it reaches the height of the viewport.
