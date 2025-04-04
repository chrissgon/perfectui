#### Components

# Badge

A visual indicator for a value or status descriptor for UI elements.

### Types

The most commonly used badge styles, we provide `solid`, `outline`, `white` and `black`.

```html
<span class="badge style-solid-primary">Solid</span>
<span class="badge style-outline-primary">Outline</span>
<span class="badge style-white">White</span>
<span class="badge style-black">Black</span>
```

### Rounded badges

Use the `.rounded-full` class to create rounded badges.

```html
<span class="badge style-solid-primary rounded-full">Solid</span>
<span class="badge style-outline-primary rounded-full">Outline</span>
<span class="badge style-white rounded-full">White</span>
<span class="badge style-black rounded-full">Black</span>
```

### Solid badges

To create solid badges, simply use the `.style-solid-[variant]` class.

```html
<span class="badge style-solid-primary">Primary</span>
<span class="badge style-solid-secondary">Secondary</span>
<span class="badge style-solid-success">Success</span>
<span class="badge style-solid-warn">Warn</span>
<span class="badge style-solid-error">Error</span>
```

### Outline badges

To create outline badges, simply use the `.style-outline-[variant]` class.

```html
<span class="badge style-outline-primary">Primary</span>
<span class="badge style-outline-secondary">Secondary</span>
<span class="badge style-outline-success">Success</span>
<span class="badge style-outline-warn">Warn</span>
<span class="badge style-outline-error">Error</span>
```

### White/Black badges

To create white or black badge, simply use the `.style-white` or `.style-black` class.

```html
<span class="badge style-white">White</span>
<span class="badge style-black">Black</span>
```

### Icons

You can add icons from any library. In the example below we used [Bootstrap Icons](https://icons.getbootstrap.com/).

```html
<span class="badge style-solid-error"
  ><i class="bi-heart-fill"></i> Favorite</span
>
<span class="badge style-outline-warn"
  >Best ranking <i class="bi-star-fill"></i
></span>
<span class="badge style-white">Recent viewed <i class="bi-eye-fill"></i></span>
```
