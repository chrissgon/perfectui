#### Components

# Card

Cards provide a flexible and extensible content container with multiple variants and options.

### Basic

A basic card containing a title, content and an extra corner content. Cards assume no specific width to start, so they'll be 100% wide unless otherwise stated.

To create cards, simply add the `.card` class.

You can use `.card-content` class for the content, `.card-header` class for the header and the `<hr>` tag for the dividers.

```html
<div class="card">
  <header class="card-header flex justify-between gap-2">
    Header
    <i class="bi-three-dots-vertical"></i>
  </header>
  <hr />
  <img
    alt="Accordion Image"
    src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=300&q=80"
  />
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <button class="btn style-solid-primary w-fit">Some action</button>
  </article>
</div>
```

### Simple body

You can use `.card-content` class to create a simple body example with text.

```html
<div class="card">
  <article class="card-content">This is some text within a card body.</article>
</div>
```

### Simple card

You can add others elements in the `.card-content` parent.

```html
<div class="card">
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <h4 class="text-secondary">Card Subtitle</h4>
    <p>This is some text within a card body.</p>
    <p>
      <button class="style-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
</div>
```

### Header / Footer

You can use `.card-header` and `<hr>` tag to create a header or footer.

```html
<div class="card">
  <header class="card-header bg-secondary text-secondary">Featured</header>
  <hr />
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>
      With supporting text below as a natural lead-in to additional content.
    </p>
    <p>
      <button class="style-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
</div>
```

```html
<div class="card">
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>
      With supporting text below as a natural lead-in to additional content.
    </p>
    <p>
      <button class="style-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
  <hr />
  <header class="card-header bg-secondary text-secondary text-xs">
    Last updated 5 mins ago
  </header>
</div>
```

### Horizontal

Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way.

To create a horizontal card, simply add `display: flex` in the `.card` parent.

```html
<div class="card lg:flex">
  <img
    alt="Accordion Image"
    class="lg:max-w-xs"
    src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  />
  <article class="card-content flex flex-col justify-between">
    <div>
      <h1 class="font-semibold text-xl mb-2">Card Title</h1>
      <p>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
    <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
  </article>
</div>
```

### Card group

Use [Layout Group](https://github.com/chrissgon/perfectui/blob/main/docs/layout-group.md) to render cards as a single, attached element with equal width and height columns.

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
