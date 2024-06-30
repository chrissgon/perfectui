#### Forms

# Switch

A toggle is used to view or switch between enabled or disabled states.

# Basic

To create switches, simply add the `.switch` class to the `input:checkbox` element.

```html
<div>
  <label class="field-group gap-2">
    <input type="checkbox" class="switch" />
    Default switch
  </label>
  <label class="field-group gap-2">
    <input type="checkbox" class="switch" checked />
    Checked switch
  </label>
  <label class="field-group gap-2" disabled>
    <input type="checkbox" class="switch" />
    Disabled switch
  </label>
</div>
```

### Switch group

A group of switches elements.

```html
<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Orange
    </label>
  </ul>
</div>
```

# Switch with Field Group

You can use switches with [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md).

```html
<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="checkbox" class="switch" />
    </span>
    <div class="input">Default switch</div>
  </label>
  <label class="field-group">
    <div class="input">Checked switch</div>
    <span class="addon">
      <input type="checkbox" class="switch" checked />
    </span>
  </label>
</div>
```

### Switch with Lists

You can use switches with [Lists](https://github.com/chrissgon/perfectui/blob/main/docs/list.md).

```html
<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="switch !h-fit" checked />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="switch !h-fit" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
```

You can make the list item appear with switch.

```html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
```

You can also make a horizontal list group item appear with switch.

```html
<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" />
    Thais Emilly
  </label>
</ul>
```
