#### Forms

# Input

One class for every text control: `<input>`, `<textarea>` and `<select>`.

```html
<input class="pui-input" type="text" placeholder="Your name" />
```

### Types

Every native type works, and each keeps its own keyboard and picker:

```html
<input class="pui-input" type="email" placeholder="you@example.com" />
<input class="pui-input" type="password" />
<input class="pui-input" type="number" />
<input class="pui-input" type="date" />
<input class="pui-input" type="search" />
```

### With a label

See [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md).

### States

```html
<input class="pui-input" disabled value="Disabled" />
<input class="pui-input" readonly value="Read only" />
<input class="pui-input" aria-invalid="true" value="Invalid" />
```

### Full width

Inputs size themselves to their content box, so width is yours to decide:

```html
<input class="pui-input" style="width: 100%" />
```
