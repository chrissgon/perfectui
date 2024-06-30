#### Forms

# Input

A basic widget for getting the user input is a text field.

### Basic

To create inputs, simply add the `.input` class to the `input` element.

```html
<input class="input" />
```

Also possible add a placeholder.

```html
<input class="input" placeholder="This is placeholder" />
```

### Types

The most commonly used input types.

```html
<form class="flex flex-col gap-3">
  <label class="field-group">
    <input class="input" placeholder="Text" />
  </label>
  <label class="field-group">
    <input class="input" type="number" placeholder="Number" />
  </label>
  <label class="field-group">
    <input class="input" type="email" placeholder="Email" />
  </label>
  <label class="field-group">
    <input class="input" type="password" placeholder="Password" />
  </label>
  <label class="field-group">
    <input class="input" type="search" placeholder="Search" />
  </label>
  <label class="field-group">
    <input class="input" type="week" placeholder="Week" />
  </label>
  <label class="field-group">
    <input class="input" type="month" placeholder="Month" />
  </label>
  <label class="field-group">
    <input class="input" type="date" placeholder="Date" />
  </label>
</form>
```
