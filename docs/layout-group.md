#### General

# Layout Group

An easy way to deal with grouping elements.

### How it works

To deal with grouping elements, Perfect UI provides the `.group-row`, `.group-col`, `.group-responsive` and `.group-item` classes. These will be useful for dealing with unnecessary borders and rounding of elements.

For some elements, the use of this class is mandatory, such as the `<accordion>`.

```html
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>First question</summary>
    <article>First answer</article>
  </details>
  <details class="accordion-item">
    <summary>Second question</summary>
    <article>Second answer</article>
  </details>
</div>
```

> ⚠️ Attention needed:
> If the children of the group have a class with `.item` , it is not necessary to add the class `.group-item`, as in the case of accordion.

Other elements are optional, such as the `<button>`.

```html
<div class="group group-row">
  <button class="group-item btn style-white">Left</button>
  <button class="group-item btn style-white">Middle</button>
  <button class="group-item btn style-white">Right</button>
</div>
```

> ⚠️ Attention needed:
> The buttons need the `.group-item` class to work, because they have no class `.item`.

### Group responsive

If you need the group to change automatically with the screen size, simply use `group-responsive`.

For screens larger than `1024px`, `group-row` will be applied, for smaller screens `group-col`.

```html
<section class="group-responsive">
  <!-- card #1 -->
  <div class="card group-item">
    <img
      alt="Accordion Image"
      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    />
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #2 -->
  <div class="card group-item">
    <img
      alt="Accordion Image"
      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    />
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #3 -->
  <div class="card group-item">
    <img
      alt="Accordion Image"
      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    />
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
</section>
```
