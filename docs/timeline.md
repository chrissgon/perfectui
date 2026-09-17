#### Components

# Timeline

Events in order, with a rule connecting them. Each checkpoint draws its own segment, so a timeline is a sequence of checkpoints with nothing in between.

```html
<figure class="pui-timeline">
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-success">&check;</i>
    <article>
      <strong>Released v1.0.0</strong>
      <p>Shipped this morning.</p>
    </article>
  </figcaption>

  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-error">!</i>
    <article>
      <strong>Quick bug fix</strong>
    </article>
  </figcaption>
</figure>
```

| Class                 | Role                                    |
| --------------------- | --------------------------------------- |
| `pui-timeline`        | the container                           |
| `pui-checkpoint`      | one event, and the rule to the next one |
| `pui-checkpoint-icon` | the marker on the rule                  |

### The icon

The icon is an ordinary colorable element, so its appearance is the same style and color pair used everywhere:

```html
<i class="pui-checkpoint-icon pui-solid pui-success">&check;</i>
<i class="pui-checkpoint-icon pui-outline pui-muted">3</i>
<i class="pui-checkpoint-icon pui-soft pui-theme">i</i>
```

Anything fits inside it — a character, a number, or an icon font.

### Horizontal

Combine with `pui-group-row`:

```html
<figure class="pui-timeline pui-group-row">
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-success">&check;</i>
    <span>Released</span>
  </figcaption>
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-outline pui-muted">2</i>
    <span>Planning</span>
  </figcaption>
</figure>
```
