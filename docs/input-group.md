#### Forms

# Input Group

Easily extend input by adding text and icons.

### Basic

You can extend input with icons or texts.

To extend inputs, simply add the `.input-group` class to the `.input` element.

After, add `.input` element inside `.input-group` parent.

Others elements will be consider texts or icons.

```html
<label class="field-group">
  <div class="input input-group">
    <i class="bi-person"></i>
    <input type="text" class="input" placeholder="Your name" />
    <span>
      <svg
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
  </div>
</label>
```

### Mixed

You can add multiple `.input` inside a `.input-group`.

```html
<label class="field-group field-group-success" data-message="Verified">
  <div class="input input-group">
    <i class="bi-envelope"></i>
    <input type="text" class="input" placeholder="your_email" />
    <span>@</span>
    <select class="input">
      <option>gmail.com</option>
      <option>outlook.com</option>
      <option>hotmail.com</option>
    </select>
  </div>
</label>
```

### Buttons

You can also add buttons inside a `.input-group`.

```html
<label class="field-group">
  <div class="input input-group">
    <button class="btn btn-link-primary">
      New
      <i class="bi-plus-lg"></i>
    </button>
    <input type="text" class="input" placeholder="Write a task" />
    <button class="btn btn-link-error">
      Delete
      <i class="bi-trash"></i>
    </button>
    <button class="btn btn-solid-success">
      Done
      <i class="bi-check-lg"></i>
    </button>
  </div>
</label>
```
