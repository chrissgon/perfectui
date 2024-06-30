#### Components

# Tooltip

Tooltip is a floating, non-actionable label used to explain a user interface element or feature.

> ⚠️ Requires JS: Note that this component requires use our javascript file to works, else you can skip this message if you are already using Perfect UI as a package.

### Basic

Tooltip are meant to be exactly that, a hint or tip on what a tool or other interaction does. They are meant to clarify or help you use the content that they hover over, not add additional content:

- To create a tooltip, simply add the `.tooltip` class.
- Provide the tooltip text through the `tooltip` attribute.

```html
<button class="btn btn-white tooltip" data-tooltip="More details here">
  Tooltip
  <i class="bi-question-circle"></i>
</button>
```

> ⚠️ Attention needed:
> The `.tooltip` class uses pseudo elements `::before` and `::after` to works. Make sure you use it with an element that does not use pseudo classes as well.

### Directions

The tooltip has the top direction by default, but you can also use `.tooltip-right`, `.tooltip-left` and `.tooltip-bottom` directions.

```html
<div class="grid grid-cols-3 gap-y-2 gap-x-2 max-w-60 mx-auto w-fit">
  <button
    class="tooltip btn btn-white rounded-full col-start-2 w-10 !px-2"
    data-tooltip="Tooltip on top"
  >
    <i class="bi-chevron-up"></i>
  </button>
  <button
    class="tooltip tooltip-left btn btn-white rounded-full col-start-1 w-10 !px-2"
    data-tooltip="Tooltip on left"
  >
    <i class="bi-chevron-left"></i>
  </button>
  <button
    class="tooltip tooltip-right btn btn-white rounded-full col-start-3 w-10 !px-2"
    data-tooltip="Tooltip on right"
  >
    <i class="bi-chevron-right"></i>
  </button>
  <button
    class="tooltip tooltip-bottom btn btn-white rounded-full col-start-2 w-10 !px-2"
    data-tooltip="Tooltip on bottom"
  >
    <i class="bi-chevron-down"></i>
  </button>
</div>
```

### White/Black tooltips

The tooltip has `.tooltip-white` class by default, but if you want use the black style, simply use the `.btn-black` class.

```html
<div class="flex flex-col gap-2 w-fit">
  <button
    class="btn btn-white tooltip tooltip-right"
    data-tooltip="More details here"
  >
    White Tooltip
  </button>

  <button
    class="btn btn-white tooltip tooltip-black tooltip-right"
    data-tooltip="More details here"
  >
    Black Tooltip
  </button>
</div>
```

### Simple usage

Tooltip are typically only visible on hover, for that reason if you need to be able to read the content while interacting with other parts of the page then a tooltip will not work.

```html
<div class="card">
  <article class="card-content">
    <ul class="list unmarker">
      <li class="list-item !flex justify-between">
        <header>
          <h4 class="text-base font-medium">Christopher Gonçalves</h4>
          <small class="text-secondary text-xs"> christopher@gmail.com </small>
        </header>

        <button class="btn" disabled>
          Guest <i class="bi-chevron-down"></i>
        </button>
      </li>
      <li class="list-item !flex justify-between">
        <header>
          <h4 class="text-base font-medium">Amanda Ketellyn</h4>
          <small class="text-secondary text-xs">amanda@gmail.com</small>
        </header>

        <button class="btn" disabled>
          Guest <i class="bi-chevron-down"></i>
        </button>
      </li>
    </ul>
  </article>

  <hr />

  <footer class="card-content !px-8">
    The public share <a href="#" class="text-theme">link settings</a>
    <span
      class="tooltip"
      data-tooltip="The public share link allows people to view the project without giving access to full collaboration features."
    >
      <i class="bi-question-circle"></i>
    </span>
  </footer>
</div>
```
