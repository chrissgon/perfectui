#### Forms

# Field Group

Easily extend fields by adding text, buttons, icons and more.

### Complex fields

You can use the `.field-group` class to create complex forms with states, buttons, icons and others.

``` html
<form class="flex flex-col gap-3">
  <!-- name -->
  <label
    class="field-group field-group-error"
    data-label="Full Name"
    data-message="Field required"
  >
    <select class="input !max-w-fit">
      <option>Mr.</option>
      <option>Ms.</option>
      <option>Miss.</option>
    </select>
    <input class="input" placeholder="First Name" />
    <input class="input" placeholder="Surname Name" />
  </label>
  <!-- birth -->
  <label class="field-group" data-label="Birth" data-message="Optional">
    <i class="addon bi-calendar-week"></i>
    <input class="input" type="date" />
  </label>
  <!-- email -->
  <label
    class="field-group group-row field-group-success"
    data-label="Email"
    data-message="Code sended"
  >
    <i class="addon bi-check-circle-fill text-success"></i>
    <input type="text" class="input" value="email.example" />
    <span class="addon">@</span>
    <select class="input">
      <option>gmail.com</option>
      <option>outlook.com</option>
      <option>hotmail.com</option>
    </select>
    <button class="group-item btn btn-solid-primary">Send Code</button>
  </label>
</form>
```

### Label/Message

To create a field with label and message, simply add `label` and `message` properties.

``` html
<label class="field-group" data-label="Label" data-message="Some message">
  <input class="input">
</label>
```

### Addon

To extend a field with a text or icon, simply add `.addon` class inside `.field-group` element.

``` html
<label class="field-group" data-label="Price" data-message="Required">
  <i class="addon bi-bank"></i>
  <input class="input" type="number">
  <span class="addon">R$</span>
</label>
```

### States

To set a field state, simply add `.field-group-success`, `.field-group-warn` or `.field-group-error` class in the `.field-group` element.

``` html
<form class="flex flex-col gap-3">
  <!-- default -->
  <label class="field-group" data-label="Label" data-message="Some message">
    <input class="input" placeholder="Default" />
  </label>
  <!-- success -->
  <label
    class="field-group field-group-success"
    data-label="Label"
    data-message="Operation successfully"
  >
    <input class="input" placeholder="Success" />
  </label>
  <!-- warning -->
  <label
    class="field-group field-group-warn"
    data-label="Label"
    data-message="Fill with attention"
  >
    <input class="input" placeholder="Warning" />
  </label>
  <!-- error -->
  <label
    class="field-group field-group-error"
    data-label="Label"
    data-message="This field is invalid"
  >
    <input class="input" placeholder="Error" />
  </label>
</form>
```

### Mixed

You can create a more efficient field with mixed types.

To create a field with mixed types, simply add one or more `.input` inside `.field-group` element.

``` html
<form class="flex flex-col gap-3">
  <!-- social -->
  <label class="field-group" data-label="Social Profile" data-message="Optional">
    <select class="input !max-w-fit">
      <option>Linkedin</option>
      <option>Behance</option>
      <option>Github</option>
    </select>
    <input
      type="text"
      class="input"
      placeholder="https://www.example.com/your-profile"
    />
  </label>
  <!-- range dates -->
  <label class="field-group" data-label="Between Dates">
    <input type="date" class="input" />
    <span class="addon">to</span>
    <input type="date" class="input" />
  </label>
  <!-- enable option -->
  <label class="field-group" data-label="Enable Option">
    <span class="addon">
      <input type="checkbox" class="switch" checked />
    </span>
    <input
      type="text"
      class="input"
      placeholder="You could control this field by switch"
    />
  </label>
  <label class="field-group" data-label="About me">
    <textarea class="input" placeholder="Write a short description"></textarea>
  </label>
</form>
```

### Buttons

To create a field with action buttons, simply add `.group-row` class in the `.field-group` element.

After, add a button with `.group-item` class.

``` html
<div class="card">
  <article class="card-content">
    <h4 class="text-lg text-center mb-4">
      You want to subscribe in our newsletter?
    </h4>
    <label class="field-group group-row">
      <input
        type="email"
        class="input"
        placeholder="Your email"
      >
      <button class="btn btn-solid-primary group-item">Subscribe</button>
    </label>
  </article>
</div>
```

### Disabled

Make fields look inactive by adding the `disabled` boolean attribute to any `.field-group` or `.input` element.

``` html
<form class="flex flex-col gap-3">
  <!-- field group disabled -->
  <label
    class="field-group"
    data-label="Payment method"
    data-message="Not Allowed"
    disabled
  >
    <span class="addon">Credit Card</span>
    <input
      type="text"
      class="input"
      placeholder="Number"
    >
    <input
      type="month"
      class="input"
      placeholder="Expiration Date"
    >
    <input
      type="text"
      class="input"
      placeholder="CCV"
    >
  </label>
  <!-- input disabled -->
  <label
    class="field-group"
    data-label="Country/City"
  >
    <select class="input">
      <option>Brazil</option>
      <option>Ireland</option>
    </select>
    <select
      class="input"
      disabled
    >
      <option>Select city by country</option>
    </select>
  </label>
</form>
```