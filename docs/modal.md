#### Components

# Modal

Built on `<dialog>`. The browser handles the top layer, the backdrop, focus trapping and the escape key.

```html live name=basic
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

> [!WARNING]
>
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

### Moving between two modals

A button carries one command, so opening the next modal leaves the one you are
in open behind it, and closing the new one reveals the old. Close it on the
same click and you get a swap, which is what a multi-step flow wants:

```html
<dialog class="pui-modal" id="first" closedby="any">
  <div class="pui-card">
    <div class="pui-card-content">
      <button
        class="pui-btn pui-solid pui-theme"
        commandfor="second"
        command="show-modal"
        onclick="this.closest('dialog').close()"
      >
        Continue
      </button>
    </div>
  </div>
</dialog>
```

Stacking is the browser's own behavior, not something the library adds, so this
is the line that turns it into a swap.

If inline handlers are not allowed by your content security policy, the same
thing written once for the whole page, which makes swapping the default
everywhere:

```js
document.addEventListener("click", (event) => {
  const button = event.target.closest('[command="show-modal"][commandfor]');
  if (button) button.closest("dialog")?.close();
});
```

### Long content

The dialog scrolls on its own once it reaches the height of the viewport.
