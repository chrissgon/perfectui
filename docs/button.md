#### Components

# Buttons

Use different button styles for actions in forms, dialogs and more.

### Types

The most commonly used button styles, we provide `solid`, `outline`, `link`, `white` and `black`.

``` html
<button class="btn btn-solid-primary">Solid</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-link-primary">Link</button>
<button class="btn btn-white">White</button>
<button class="btn btn-black">Black</button>
```

### Rounded buttons

Use the `.rounded-full` class to create rounded buttons.

``` html
<button class="btn btn-solid-primary rounded-full">Solid</button>
<button class="btn btn-outline-primary rounded-full">Outline</button>
<button class="btn btn-link-primary rounded-full">Link</button>
<button class="btn btn-white rounded-full">White</button>
<button class="btn btn-black rounded-full">Black</button>
```

### Solid buttons

To create solid buttons, simply use the `.btn-solid-[variant]` class.

``` html
<button class="btn btn-solid-primary">Primary</button>
<button class="btn btn-solid-secondary">Secondary</button>
<button class="btn btn-solid-success">Success</button>
<button class="btn btn-solid-warn">Warn</button>
<button class="btn btn-solid-error">Error</button>
```

### Outline buttons

To create outline buttons, simply use the `.btn-outline-[variant]` class.

``` html
<button class="btn btn-outline-primary">Primary</button>
<button class="btn btn-outline-secondary">Secondary</button>
<button class="btn btn-outline-success">Success</button>
<button class="btn btn-outline-warn">Warn</button>
<button class="btn btn-outline-error">Error</button>
```

### Link buttons

To create link buttons, simply use the `.btn-link-[variant]` class.

``` html
<button class="btn btn-link-primary">Primary</button>
<button class="btn btn-link-secondary">Secondary</button>
<button class="btn btn-link-success">Success</button>
<button class="btn btn-link-warn">Warn</button>
<button class="btn btn-link-error">Error</button>
```

### White/Black buttons

To create white or black button, simply use the `.btn-white` or `.btn-black` class.

```html
<button class="btn btn-white">White</button>
<button class="btn btn-black">Black</button>
```

### Icons

You can add icons from any library. In the example below we used [Bootstrap Icons](https://icons.getbootstrap.com/).

```html
<button class="btn btn-solid-primary">Add to cart <i class="bi-basket2-fill"></i></button>
<button class="btn btn-white">Signup free <i class="bi-chevron-right"></i></button>
<button class="btn btn-solid-error"><i class="bi-heart-fill"></i></button>
```

### Button group

You can group buttons using [Layout Group](https://perfectui.netlify.app/docs/layout-group).

```html
<div class="group group-row">
  <button class="group-item btn btn-white">Left</button>
  <button class="group-item btn btn-white">Middle</button>
  <button class="group-item btn btn-white">Right</button>
</div>
```

### Disabled

Make buttons look inactive by adding the `disabled` boolean attribute to any `<button>` element.

```html
<button class="btn btn-solid-primary" disabled>Solid</button>
<button class="btn btn-outline-primary" disabled>Outline</button>
<button class="btn btn-link-primary" disabled>Link</button>
<button class="btn btn-white" disabled>White</button>
<button class="btn btn-black" disabled>Black</button>
```