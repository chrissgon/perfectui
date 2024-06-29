#### Forms

# Radio

A radio input allows people to select only one option from a number of choices. Radio is generally displayed in a radio group.

### Basic

To create radios, simply add the `.radio` class to the `input` element.

``` html
<ul class="list unmarker">
  <label class="list-item">
    <input type="radio" name="radio-basic" class="radio align-middle" />
    Default radio
  </label>
  <label class="list-item">
    <input type="radio" name="radio-basic" class="radio align-middle" checked />
    Checked radio
  </label>
  <label class="list-item" disabled>
    <input type="radio" name="radio-basic" class="radio align-middle" />
    Disabled radio
  </label>
</ul>
```

### Radio group

A group of radios elements.

``` html
<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-apple" class="radio align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="radio" name="radio-apple" class="radio align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-apple" class="radio align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-pear" class="radio align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="radio" name="radio-pear" class="radio align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-pear" class="radio align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-orange" class="radio align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="radio" name="radio-orange" class="radio align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-orange" class="radio align-middle" />
      Orange
    </label>
  </ul>
</div>
```

# Radio with Field Group

You can use radios with [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md).

``` html
<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="radio" class="radio" />
    </span>
    <div class="input">
      Default radio
    </div>
  </label>
  <label class="field-group">
    <div class="input">
      Checked radio
    </div>
    <span class="addon">
      <input type="radio" class="radio" checked />
    </span>
  </label>
</div>
```

### Radio with Lists

You can use radios with [Lists](https://github.com/chrissgon/perfectui/blob/main/docs/list.md).

``` html
<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="radio" name="radio-list" class="radio" checked />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="radio" name="radio-list" class="radio" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
```

You can make the list item appear with radio.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
```

You can also make a horizontal list group item appear with radio.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" />
    Thais Emilly
  </label>
</ul>
```