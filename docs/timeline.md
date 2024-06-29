#### Components

# Timeline

The timeline component is designed to display events in chronological order, ideal for showcasing history, project milestones, or event sequences.

### Basic

The timeline component has three main classes `.timeline`, `.checkpoint` and `.checkpoint-icon`.

- `.timeline` : Create a timeline. One timeline has multiple checkpoints.
- `.checkpoint` : Create a checkpoint.
- `.checkpoint-icon` : Define the checkpoint icon.

> ⚠️ Attention needed:
>  Everything inside the `.checkpoint` element that do not have the `.checkpoint-icon` class will be consider a `content`.

``` html
<!-- timeline -->
<figure class="timeline">
  <!-- checkpoint -->
  <figcaption class="checkpoint checkpoint-link-error">
    <!-- checkpoint-icon -->
    <i class="checkpoint-icon bi-exclamation-circle-fill"></i>
    <!-- checkpoint content -->
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
    </article>
  </figcaption>
</figure>
```

### Types

We provide differents checkpoints styles, such as `solid`, `outline`, `link`, `white` and `black`.

You can change the checkpoint style using differents classes in the `.checkpoint` element.

``` html
<!-- timeline -->
<figure class="timeline">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint link -->
  <figcaption class="checkpoint checkpoint-link-secondary">
    <i class="checkpoint-icon bi-dot !text-4xl"></i>
    <article>
      <h4 class="font-bold">Take a break ⛳️</h4>
      <p class="text-secondary">Just chill for now... 😉</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "Perfect UI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint black -->
  <figcaption class="checkpoint checkpoint-black">
    <i class="checkpoint-icon bi-bookmark-fill"></i>
    <article>
      <h4 class="font-bold">Feature fixed as a priority</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
</figure>
```

### Solid checkpoints

To create a solid checkpoint, simply use the `.checkpoint-solid-[variant]` classes.

``` html
<figure class="timeline">
  <figcaption class="checkpoint checkpoint-solid-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
</figure>
```

### Outline checkpoints

To create a outline checkpoint, simply use the `.checkpoint-outline-[variant]` classes.

``` html
<figure class="timeline">
  <figcaption class="checkpoint checkpoint-outline-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
</figure>
```

### Link checkpoints

To create a link checkpoint, simply use the `.checkpoint-link-[variant]` classes.

``` html
<figure class="timeline">
  <figcaption class="checkpoint checkpoint-link-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
</figure>
```

### White/Black checkpoints

To create a white or black checkpoint, simply use the `.checkpoint-white` or `.checkpoint-black` classes.

``` html
<figure class="timeline">
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-black">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
  </figcaption>
</figure>
```

### Horizontal

To create horizontal timelines, simply add the `.group-row` class in the `.timeline` parent.

``` html
<!-- timeline -->
<figure class="timeline group-row min-w-[700px]">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "Perfect UI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
</figure>
```

### Responsive

Use [Layout Group](https://github.com/chrissgon/perfectui/blob/main/docs/layout-group.md) to create responsible timelines.

Simply add the `.group-responsive` class in the `.timeline` parent.

``` html
<!-- timeline -->
<figure class="timeline group-responsive">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "Perfect UI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "Perfect UI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
</figure>
```