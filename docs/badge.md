#### Components

# Badge

A visual indicator for a value or status descriptor for UI elements.

### Types

The most commonly used badge styles, we provide `solid`, `outline`, `white` and `black`.

```html
<span class="badge badge-solid-primary">Solid</span>
<span class="badge badge-outline-primary">Outline</span>
<span class="badge badge-white">White</span>
<span class="badge badge-black">Black</span>
```

### Rounded badges

Use the `.rounded-full` class to create rounded badges.

```html
<span class="badge badge-solid-primary rounded-full">Solid</span>
<span class="badge badge-outline-primary rounded-full">Outline</span>
<span class="badge badge-white rounded-full">White</span>
<span class="badge badge-black rounded-full">Black</span>
```

### Solid badges

To create solid badges, simply use the `.badge-solid-[variant]` class.

```html
<span class="badge badge-solid-primary">Primary</span>
<span class="badge badge-solid-secondary">Secondary</span>
<span class="badge badge-solid-success">Success</span>
<span class="badge badge-solid-warn">Warn</span>
<span class="badge badge-solid-error">Error</span>
```

### Outline badges

To create outline badges, simply use the `.badge-outline-[variant]` class.

```html
<span class="badge badge-outline-primary">Primary</span>
<span class="badge badge-outline-secondary">Secondary</span>
<span class="badge badge-outline-success">Success</span>
<span class="badge badge-outline-warn">Warn</span>
<span class="badge badge-outline-error">Error</span>
```

### White/Black badges

To create white or black badge, simply use the `.badge-white` or `.badge-black` class.

```html
<span class="badge badge-white">White</span>
<span class="badge badge-black">Black</span>
```

### Icons

You can add icons from any library. In the example below we used [Bootstrap Icons](https://icons.getbootstrap.com/).

```html
<span class="badge badge-solid-error"
  ><i class="bi-heart-fill"></i> Favorite</span
>
<span class="badge badge-outline-warn"
  >Best ranking <i class="bi-star-fill"></i
></span>
<span class="badge badge-white">Recent viewed <i class="bi-eye-fill"></i></span>
```
