#### Customization

# Dark Mode

Perfect UI follows the operating system by default. There is nothing to configure and nothing to import: colors are declared with `light-dark()`, and the browser resolves them.

### The switch

An explicit choice is a single attribute on `<html>`:

```html
<html data-pui-mode="dark">
  <!-- ... -->
</html>
```

| Value        | Result             |
| ------------ | ------------------ |
| `light`      | always light       |
| `dark`       | always dark        |
| no attribute | follows the system |

### Switching from JavaScript

```js
import { setMode, getMode } from "@chrissgon/perfectui/mode";

setMode("dark"); // sets the attribute and remembers the choice
setMode("light");
setMode(); // clears both, back to the system preference

getMode(); // "system" | "light" | "dark"
```

`setMode` persists the choice in a cookie named `pui-mode`, not in `localStorage`. A cookie travels with the request, which is what lets a server render the right mode on the first paint.

### Avoiding the flash

If the page is rendered by a server, read the cookie and render the attribute:

```js
// any server framework
const mode = cookies.get("pui-mode"); // "light" | "dark" | undefined
```

```html
<html data-pui-mode="{{ mode }}"></html>
```

For a static site, put this in the `<head>` **before** the stylesheet:

```html
<script>
  (function (m) {
    if (m) document.documentElement.setAttribute("data-pui-mode", m[1]);
  })(document.cookie.match(/(?:^|; )pui-mode=(light|dark)/));
</script>
```

> ⚠️ Attention needed:
> Importing Perfect UI's CSS declares `color-scheme: light dark` on the page, which is what makes the system mode work. If your app is not ready for dark mode yet, render `<html data-pui-mode="light">` and it will stay light.
