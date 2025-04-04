#### Components

# Dropdown

Toggle contextual overlays for displaying [lists](https://github.com/chrissgon/perfectui/blob/main/docs/list.md) of links and more. Combine with Lists and other elements to create powerfull dropdowns.

> ⚠️ Requires JS: Note that this component requires use our javascript file to works, else you can skip this message if you are already using Perfect UI as a package.

### Basic

The dropdown component has two main classes, `.dropdown-trigger`, `.dropdown` and `.ignore`.

- `.dropdown-trigger` : Indicates the element that will trigger the dropdown.
- `.dropdown` : The dropdown container.
- `.ignore` : Ignore the click event on element, so the dropdown will not be closed.

> ⚠️ Attention needed:
> The `.dropdown` should be placed inside of `.dropdown-trigger`, since it has parent-child relation.

```html
<!-- dropdown trigger -->
<button class="dropdown-trigger btn style-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <!-- ignore -->
    <label class="field-group ignore">
      <input class="input" type="text" placeholder="Search" />
    </label>
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">Profile</li>
      <li class="list-item">Settings</li>
      <li class="list-item">Newsletter</li>
    </ul>
  </div>
</button>
```

### Dividers

The default dropdown menu with dividers.

```html
<!-- dropdown trigger -->
<button class="dropdown-trigger btn style-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">Newsletter</li>
      <li class="list-item">Purchases</li>
      <hr class="my-2" />
      <li class="list-item">Upgrade License</li>
      <hr class="my-2" />
      <li class="list-item">Sign Out</li>
    </ul>
  </div>
</button>
```

### Icons / Badges

You can add icons or badges. In the example below was used [Bootstrap Icons](https://icons.getbootstrap.com/).

```html
<!-- dropdown trigger -->
<button class="dropdown-trigger btn style-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">
        <i class="bi-bell"></i>
        Newsletter
        <span class="badge style-solid-primary float-right">New</span>
      </li>
      <li class="list-item">
        <i class="bi-cloud-download"></i>
        Downloads
        <span class="badge style-solid-primary rounded-full float-right">
          2
        </span>
      </li>
      <li class="list-item">
        <i class="bi-people"></i>
        Team Account
      </li>
    </ul>
  </div>
</button>
```

### Title

The default dropdown menu with title.

```html
<!-- dropdown trigger -->
<button class="dropdown-trigger btn style-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <span class="list-item" disabled>Settings</span>
      <li class="list-item">
        <i class="bi-bell"></i>
        Newsletter
        <span class="badge style-solid-primary float-right">New</span>
      </li>
      <li class="list-item">
        <i class="bi-cloud-download"></i>
        Downloads
        <span class="badge style-solid-primary rounded-full float-right">
          2
        </span>
      </li>
      <hr class="my-2" />
      <span class="list-item" disabled>Account</span>
      <li class="list-item">
        <i class="bi-people"></i>
        Team Account
      </li>
    </ul>
  </div>
</button>
```

### Directions

The `.dropdown` element has the bottom direction by default, but you can also use `.dropdown-right`, `.dropdown-left` and `.dropdown-top` directions.

```html
<div class="flex flex-wrap gap-2">
  <!-- dropdown bottom -->
  <button class="dropdown-trigger btn style-white">
    Bottom
    <i class="bi-chevron-down"></i>
    <div class="dropdown">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown top -->
  <button class="dropdown-trigger btn style-white">
    Top
    <i class="bi-chevron-up"></i>
    <div class="dropdown dropdown-top">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown left -->
  <button class="dropdown-trigger btn style-white">
    <i class="bi-chevron-left"></i>
    Left
    <div class="dropdown dropdown-left">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown right -->
  <button class="dropdown-trigger btn style-white">
    Right
    <i class="bi-chevron-right"></i>
    <div class="dropdown dropdown-right">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
</div>
```

### Complex

You can combine the dropdown element with many other. Be creative!

```html
<div class="group group-row">
  <button class="group-item btn style-white">Dropdown</button>
  <!-- dropdown trigger -->
  <button class="dropdown-trigger group-item btn style-white">
    <i class="bi-chevron-up"></i>
    <!-- dropdown -->
    <div class="dropdown dropdown-top">
      <label class="field-group ignore mb-2">
        <i class="addon bi-search"></i>
        <input class="input" type="text" placeholder="Search" />
      </label>
      <ul class="list list-hoverable unmarker">
        <span class="list-item" disabled>Settings</span>
        <li class="list-item active">
          <i class="bi-bell"></i>
          Newsletter
          <span class="badge style-solid-primary float-right">New</span>
        </li>
        <li class="list-item">
          <i class="bi-cloud-download"></i>
          Downloads
          <span class="badge style-solid-primary rounded-full float-right">
            2
          </span>
        </li>
        <hr class="my-2" />
        <span class="list-item" disabled>Account</span>
        <li class="list-item">
          <i class="bi-people"></i>
          Team Account
        </li>
        <hr class="my-2" />
        <li class="list-item" disabled>Preferences</li>
        <label class="list-item !flex gap-2">
          <input type="checkbox" class="switch !h-fit" />
          <div>
            <p class="font-bold">Darkmode</p>
            <p class="text-secondary">Define dark mode as default.</p>
          </div>
        </label>
      </ul>
    </div>
  </button>
</div>
```
