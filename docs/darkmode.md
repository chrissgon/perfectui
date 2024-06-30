#### Customization

# Dark Mode

Implement different modes in your application easily with Perfect UI through auxiliary methods.

### How it works

Perfect ui provides methods to make customization easier. You can set the mode using the `setMode` function.

```ts
import { setMode } from "@chrissgon/perfectui";

setMode("dark"); // system, light or dark
```

### Mode button

You can implement a mode button in your application for the user to change according to their preference.

```html
<!-- switch button -->
<label class="field-group gap-2 w-fit">
  <i class="bi-sun"></i>
  <input type="checkbox" class="switch" id="mode" />
  <i class="bi-moon"></i>
</label>

<!-- script -->
<script type="module">
  import { setMode } from "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js";

  document.getElementById("mode").addEventListener("change", (e) => {
    const dark = e.target.checked;
    setMode(dark ? "dark" : "light");
  });
</script>
```
