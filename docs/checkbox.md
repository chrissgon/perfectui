#### Forms

# Checkbox

A checkbox is an input control that allows a user to select one or more options from a number of choices.

### Basic

To create checkboxes, simply add the `.checkbox` class to the `input` element.

``` html
<ul class="list unmarker">
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" />
    Default checkbox
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" indeterminate />
    Indeterminate checkbox
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" checked />
    Checked checkbox
  </label>
  <label class="list-item" disabled>
    <input type="checkbox" class="checkbox align-middle" />
    Disabled checkbox
  </label>
</ul>
```

### Checkbox group

A group of checkboxes elements.

``` html
<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Orange
    </label>
  </ul>
</div>
```

### Checkbox with Field Group

You can use checkboxes with [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md).

``` html
<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="checkbox" class="checkbox" />
    </span>
    <div class="input">
      Default checkbox
    </div>
  </label>
  <label class="field-group">
    <div class="input">
      Checked checkbox
    </div>
    <span class="addon">
      <input type="checkbox" class="checkbox" checked />
    </span>
  </label>
</div>
```

### Checkbox with Lists

You can use checkboxes with [Lists](https://github.com/chrissgon/perfectui/blob/main/docs/list.md).

``` html
<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="checkbox" checked />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="checkbox" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
```

You can make the list item appear with checkbox.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
```

You can also make a horizontal list group item appear with checkbox.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" />
    Thais Emilly
  </label>
</ul>
```