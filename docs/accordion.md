#### Components

# Accordion

Build vertically collapsing accordions.

> ⚠️ Requires JS:  Note that this component requires use our javascript file to works, else you can skip this message if you are already using Perfect UI as a package.

### Basic

To create accordions, simply add the `.accordion` class to the `details` parent element.

``` html
<div class="accordion group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```

### Bordered

To create bordered accordions, simply add the `.accordion-bordered` class.

``` html
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```

### Accented

To create accented accordions when opened, simply add the `.accordion-accented` class.

``` html
<div class="accordion accordion-bordered accordion-accented group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```

### Nested

To create nested accordions, simply add the `.accordion` element inside the `article` of another.

``` html
<!-- mainly accordion -->
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```

For basic accordions you can use the `.accordion-aligned` class to align the arrows to the right.

``` html
<!-- mainly accordion -->
<div class="accordion accordion-bordered accordion-aligned group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion accordion-aligned group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion accordion-aligned group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```

You can mix the variants to create complex accordions.

``` html
<!-- mainly accordion -->
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion accordion-bordered accordion-accented group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>This is the body of the accordion item. It is hidden by defaultuntil you expand it with a click.</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion accordion-bordered group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>This is the body of the accordion item. It is hidden bdefault, until you expand it with a click.</article>
              </details>
              <details class="accordion-item">
                <summary>Accordion #2</summary>
                <article>This is the body of the accordion item. It is hidden bdefault, until you expand it with a click.</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, untiyou expand it with a click.</article>
  </details>
</div>
```

### Custom Arrow

To create accordions with custom arrows, simply create an element with the class `.accordion-icon` inside `summary`.

To define a custom arrow when the accordion is `open`, simply create an element with `.accordion-icon.open` class.

If you leave the element empty, there will be no arrow.

``` html
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>
      # Custom arrow
      <!-- custom arrow -->
      <i class="accordion-icon bi-plus-circle"></i>
      <i class="accordion-icon open bi-dash-circle"></i>
    </summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
  <details class="accordion-item">
    <summary>
      # Empty arrow
      <!-- empty arrow -->
      <i class="accordion-icon"></i>
    </summary>
    <article>This is the body of the accordion item. It is hidden by default, until you expand it with a click.</article>
  </details>
</div>
```