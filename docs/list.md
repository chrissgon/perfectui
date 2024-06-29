#### Components

# List

Create engaging lists using Perfect UI, a powerful tool for styling ordered and unordered elements, enhancing readability, and user experience.

### Setting the list type

To create bulleted or numeric lists, use the `<ul>` or `<ol>` tag with `.list` class.

Use the `.list-item` for the children.

``` html
<ul class="list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ul>
```
``` html
<ol class="list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ol>
```

Use the `.unmarker` class to create unmarked lists.

``` html
<ul class="unmarker list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ul>
```

### Custom marker

To use customs markers, simply add `.marker` class in `.list-item` element.

``` html
<div class="flex flex-wrap">
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      Terms & Conditions
    </li>
  </ul>
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      Terms & Conditions
    </li>
  </ul>
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      Terms & Conditions
    </li>
  </ul>
</div>
```

### List bordered

To create bordered lists, simply use the `.list-bordered` class with [Layout Group](https://github.com/chrissgon/perfectui/blob/main/docs/layout-group.md).

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    Profile
  </li>
  <li class="list-item">
    Settings
  </li>
  <li class="list-item">
    Newsletter
  </li>
</ul>
```

### List hoverable

To create hoverable lists, simply use the `.list-hoverable` class.

``` html
<ul class="unmarker sm:w-64 list list-bordered list-hoverable group-col">
  <a class="list-item">
    Newsletter
  </a>
  <a class="list-item">
    Downloads
  </a>
  <a class="list-item">
    Team Account
  </a>
</ul>
```

### List striped

To create striped lists, simply use the `.list-striped` class.

``` html
<ul class="unmarker sm:w-64 list list-bordered list-striped group-col">
  <li class="list-item">
    Newsletter
  </li>
  <li class="list-item">
    Downloads
  </li>
  <li class="list-item">
    Profile
  </li>
  <li class="list-item">
    Settings
  </li>
  <li class="list-item">
    Team Account
  </li>
</ul>
```

### Icons

You can add icons from any library. In the example below was used [Bootstrap Icons](https://icons.getbootstrap.com/).

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    <i class="bi-bell"></i>
    Newsletter
  </li>
  <li class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
  </li>
  <li class="list-item">
    <i class="bi-people"></i>
    Team Account
  </li>
</ul>
```

### Active / Disabled

Use the class `.active` to indicate an active element.

Use the `disabled` attribute to indicate a disabled item.

Use `<a>` to create list group items with cursor pointer.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <a class="list-item active">
    <i class="bi-bell"></i>
    Newsletter
  </a>
  <a class="list-item" disabled>
    <i class="bi-cloud-download"></i>
    Downloads
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
  </a>
</ul>
```

### Horizontal

To create horizontal lists, simply use the list classes with [Layout Group](https://github.com/chrissgon/perfectui/blob/main/docs/layout-group.md).

``` html
<ul class="unmarker w-fit list list-bordered list-hoverable group-row">
  <a class="list-item">
    <i class="bi-bell"></i>
    Newsletter
  </a>
  <a class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
  </a>
</ul>
```

### Badges

Add badges to any list group item to show unread counts, activity, and more.

``` html
<ul class="unmarker sm:w-64 list list-bordered list-hoverable group-col">
  <a class="list-item">
    <span>
      <i class="bi-bell"></i>
      Profile
    </span>
    <span class="badge badge-solid-primary float-right">New</span>
  </a>
  <a class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
    <span class="badge badge-solid-primary rounded-full float-right">2</span>
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
    <span class="badge badge-solid-primary rounded-full float-right">99+</span>
  </a>
</ul>
```

### Invoice

A simple list group example with a highlighted footer.

``` html
<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    <p>
      Payment to Front
      <span class="float-right">$264.00</span>
    </p>
    <hr class="my-2" />
    <p>
      Tax fee
      <span class="float-right">$52.8</span>
    </p>
  </li>
  <li class="list-item bg-secondary">
    Amount paid
    <span class="float-right">$316.8</span>
  </li>
</ul>
```