#### Components

# Buttons

Use different button styles for actions in forms, dialogs and more.

### Types

The most commonly used button styles, we provide `solid`, `outline`, `link`, `white` and `black`.

```html
<button class="btn style-solid-primary">Solid</button>
<button class="btn style-outline-primary">Outline</button>
<button class="btn style-link-primary">Link</button>
<button class="btn style-white">White</button>
<button class="btn style-black">Black</button>
```

### Rounded buttons

Use the `.rounded-full` class to create rounded buttons.

```html
<button class="btn style-solid-primary rounded-full">Solid</button>
<button class="btn style-outline-primary rounded-full">Outline</button>
<button class="btn style-link-primary rounded-full">Link</button>
<button class="btn style-white rounded-full">White</button>
<button class="btn style-black rounded-full">Black</button>
```

### Solid buttons

To create solid buttons, simply use the `.style-solid-[variant]` class.

```html
<button class="btn style-solid-primary">Primary</button>
<button class="btn style-solid-secondary">Secondary</button>
<button class="btn style-solid-success">Success</button>
<button class="btn style-solid-warn">Warn</button>
<button class="btn style-solid-error">Error</button>
```

### Outline buttons

To create outline buttons, simply use the `.style-outline-[variant]` class.

```html
<button class="btn style-outline-primary">Primary</button>
<button class="btn style-outline-secondary">Secondary</button>
<button class="btn style-outline-success">Success</button>
<button class="btn style-outline-warn">Warn</button>
<button class="btn style-outline-error">Error</button>
```

### Link buttons

To create link buttons, simply use the `.style-link-[variant]` class.

```html
<button class="btn style-link-primary">Primary</button>
<button class="btn style-link-secondary">Secondary</button>
<button class="btn style-link-success">Success</button>
<button class="btn style-link-warn">Warn</button>
<button class="btn style-link-error">Error</button>
```

### White/Black buttons

To create white or black button, simply use the `.style-white` or `.style-black` class.

```html
<button class="btn style-white">White</button>
<button class="btn style-black">Black</button>
```

### Icons

You can add icons from any library. In the example below we used [Bootstrap Icons](https://icons.getbootstrap.com/).

```html
<button class="btn style-solid-primary">
  Add to cart <i class="bi-basket2-fill"></i>
</button>
<button class="btn style-white">
  Signup free <i class="bi-chevron-right"></i>
</button>
<button class="btn style-solid-error"><i class="bi-heart-fill"></i></button>
```

### Button group

You can group buttons using [Layout Group](https://perfectui.netlify.app/docs/layout-group).

```html
<div class="group group-row">
  <button class="group-item btn style-white">Left</button>
  <button class="group-item btn style-white">Middle</button>
  <button class="group-item btn style-white">Right</button>
</div>
```

### Disabled

Make buttons look inactive by adding the `disabled` boolean attribute to any `<button>` element.

```html
<button class="btn style-solid-primary" disabled>Solid</button>
<button class="btn style-outline-primary" disabled>Outline</button>
<button class="btn style-link-primary" disabled>Link</button>
<button class="btn style-white" disabled>White</button>
<button class="btn style-black" disabled>Black</button>
```
