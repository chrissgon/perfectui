#### Forms

# Textarea

A textarea is an element on a webpage that you can type into.

### Basic

To create textareas, simply add the `.input` class to the `textarea` element.

```html
<textarea class="input"></textarea>
```

### Placeholder

Basic textarea with placeholder.

```html
<textarea class="input" placeholder="This is placeholder"></textarea>
```

### Label/Message

You can use [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md) with `textarea` to create complex elements.

```html
<label
  class="field-group field-group-error"
  data-label="Observation"
  data-message="Required"
>
  <textarea class="input" placeholder="Let your observation"></textarea>
  <span class="addon bi-pencil-fill"></span>
</label>
```

### Simple usage

A textarea example with copy button, character counter, label and message.

```html
<label
  class="field-group"
  data-label="Leave your question"
  data-message="We'll get back to you soon."
>
  <div class="input input-group relative">
    <textarea
      type="text"
      id="message"
      class="input w-full h-full"
      placeholder="Say hi, we'll be happy to chat with you"
    ></textarea>
    <i class="btn bi bi-clipboard"></i>
    <span id="counter" class="badge absolute -top-3 -right-3">0/100</span>
  </div>
  <span class="addon bi-pencil-fill"></span>
</label>
```
