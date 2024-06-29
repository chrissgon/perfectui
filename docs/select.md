#### Forms

# Select

Select allows users to make a single selection or multiple selections from a list of options.

### Basic

To create selects, simply add the `.input` class to the `select` element.

``` html
<select class="input">
  <option value="#" disabled selected>Select an option</option>
  <option value="#">One</option>
  <option value="#">Two</option>
  <option value="#">Three</option>
</select>
```

### Label/Message

You can use [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md) with `select` to create complex elements.

``` html
<label
  class="field-group field-group-error"
  data-label="Currency"
  data-message="Choose a currency"
>
  <select class="input">
    <option value="#" disabled selected>Select your currency</option>
    <option value="#">Euro</option>
    <option value="#">Dollar</option>
    <option value="#">Pounds</option>
  </select>
  <span class="addon bi-bank"></span>
</label>
```