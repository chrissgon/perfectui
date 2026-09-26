# Perfect UI — design system specification

Everything needed to rebuild Perfect UI `1.0.0` as a design library, written
for a tool that cannot run CSS. Every size is in pixels and every color is a hex
value, given for both color modes.

> This file is generated from the shipped stylesheet by
> `scripts/design-system.mjs`, which measures the real components in a browser,
> and every number in its prose is then re-checked against a browser by
> `scripts/design-system-check.mjs`. If a value here disagrees with the library,
> the library is right and this file is stale — regenerate it with
> `bun run design-system`.

## How to read this

- **Two modes.** Every color has a light and a dark value. In Figma these belong
  in one variable collection with two modes, not two separate styles.
- **Sizes are derived, not arbitrary.** Four base values generate every
  measurement in the library. The pixel numbers below are those formulas already
  resolved at the default settings (space 4px, font 14px, radius 6px, border
  1px). Keep the relationships if you rescale.
- **Three classes, one element.** Every colored element is built from a *shape*
  (what it is), a *style* (how color is applied) and a *color* (which one). In
  Figma this maps to one component with two variant properties: style and color.
- **Transparency is spelled out.** Where a fill is a tinted color, the value is
  given as `base at N% → flattened`. Use the base color with the opacity for
  fidelity, or the flattened hex if the element always sits on the page.

## 1. Foundations

### 1.1 Color tokens

| Token | Light | Dark | What it is for |
| --- | --- | --- | --- |
| `--pui-bg` | #FFFFFF | #000000 | Page background, and the label on a solid fill |
| `--pui-bg-muted` | #F3F4F6 | #111827 | Card headers, table footers, addons, stripes, hover rows |
| `--pui-bg-emphasis` | #E5E7EB | #1F2937 | A third level, for authors — no component in the library uses it |
| `--pui-text` | #000000 | #FFFFFF | Body text |
| `--pui-text-muted` | #676D7B | #9CA3AF | Secondary text: help messages, table headers, card headers |
| `--pui-border` | #D1D5DB | #374151 | Every border that is not carrying a color |
| `--pui-theme` | #0092CD | #07B6F0 | Brand color |
| `--pui-success` | #16A34A | #22C55E | Positive state |
| `--pui-error` | #DC2626 | #EF4444 | Destructive state and invalid fields |
| `--pui-warn` | #D97706 | #F59E0B | Caution state |
| `--pui-muted` | #6B7280 | #9CA3AF | Neutral state, the old secondary |

### 1.2 The four base values

| Base | Value | Generates |
| --- | --- | --- |
| Spacing unit | 4px | Every padding and gap, as multiples |
| Font size | 14px | Component text, and the small sizes as ratios |
| Radius | 6px | Every corner |
| Border width | 1px | Every border and the overlap inside groups |

### 1.3 Spacing scale

Multiples of the 4px unit. Nothing in the library uses a value outside this
scale.

| Steps | Pixels | Where |
| --- | --- | --- |
| 0.5 | 2px | Badge vertical padding |
| 1 | 4px | Gap inside a button, dropdown padding, small gaps |
| 1.25 | 5px | Tooltip vertical padding |
| 1.5 | 6px | Input vertical padding |
| 1.75 | 7px | Badge horizontal padding |
| 2 | 8px | Button, list item, table cell and card header vertical padding |
| 2.5 | 10px | Tooltip horizontal padding |
| 3 | 12px | Chip and input horizontal padding, addon padding, card content gap |
| 4 | 16px | Button, list item, table cell and card header horizontal padding; card content padding |
| 6 | 24px | Distance from the viewport edge for a floating element |
| 7 | 28px | End padding of a select, which holds the arrow |
| 8 | 32px | Margin a modal keeps from the viewport edge |

### 1.4 Typography

The library sets no font family and no weight for body text: both inherit from
the page. Only sizes, line heights and the one bold weight are specified.

| Role | Size | Weight | Line height | Used by |
| --- | --- | --- | --- | --- |
| Body | 14px | inherited | 17.5px | Buttons, chips, inputs, list items, table cells, card content |
| Small | 12px | inherited | 15px | Badges, tooltips, field labels and messages |
| Table header | 14px | 600 | normal | Column headers |

### 1.5 Corner radii

| Name | Value | Used by |
| --- | --- | --- |
| Default | 6px | Buttons, chips, badges, inputs, list items, accordion items, dropdowns, tooltips |
| Inner | 5px 5px 0px 0px | An element inside a bordered container, so its corner stays concentric |
| Large | 9px | Cards |
| Small | 3px | Checkboxes |
| Full | 9999px | Pills, radios, switches, timeline icons |

### 1.6 Icons

Perfect UI ships no icons and downloads none. Two free sets fit it. Pick one
per project; nothing in the library depends on the choice.

| | Lucide | Bootstrap Icons |
| --- | --- | --- |
| Package | `lucide-static`, ISC license | `bootstrap-icons`, MIT license |
| Icons in the set | 2,000+ | 2,000+ |
| Drawing | 2px outlines on a 24px grid, drawn here at 16px | Filled shapes on a 16px grid, most with a `-fill` twin |
| Figma | The Lucide plugin, with the same names | The Bootstrap Icons file on Figma Community |
| Suits | The outline, soft and link styles, next to 1px borders | Solid buttons, and the sharpest result at 16px |

**One file per icon, never the whole set.** Both packages also ship an icon
font with every icon in it: 131 KB for Bootstrap Icons and 287 KB for Lucide,
each many times the size of Perfect UI itself. Lucide's
`<i data-lucide>` markup also needs a script. A single SVG is about 0.3 KB
gzipped, so a product with twenty icons pays about 6 KB, and only for those
twenty.

Each icon is an SVG used as a CSS mask and painted with the current text color.
This is your stylesheet, not the library's:

```css
.icon {
  display: inline-block;
  flex: none;
  width: 16px;
  height: 16px;
  vertical-align: -0.125em;
  background-color: currentColor;
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
}

/* One rule per icon you use. */
.icon-mail {
  mask-image: url("/icons/mail.svg");
}
.icon-bell {
  mask-image: url("/icons/bell.svg");
}
```

```html
<i class="icon icon-mail"></i>
```

Because the icon is painted with `currentColor`, it takes the color of whatever
it sits in: the label color on a solid button, the ink on a soft one, the error
color in an invalid field's message. No component needs a colored copy of an
icon.

**Getting only the icons you use.** Pick one of three ways:

1. **Copy them from the package.** Install the set as a development dependency,
   so nothing from it ships, and copy only the files you use into your project:

   ```sh
   npm i -D lucide-static
   cp node_modules/lucide-static/icons/{mail,bell,x}.svg public/icons/

   npm i -D bootstrap-icons
   cp node_modules/bootstrap-icons/icons/{envelope,bell,x}.svg public/icons/
   ```

2. **Download them one by one.** No install: fetch each file from the CDN, with
   the version pinned:

   ```sh
   curl -o public/icons/mail.svg https://cdn.jsdelivr.net/npm/lucide-static@1.48.0/icons/mail.svg
   curl -o public/icons/envelope.svg https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/icons/envelope.svg
   ```

3. **Let the bundler inline them.** Keep the files next to your stylesheet and
   point `url()` at them with a relative path, such as `url("./icons/mail.svg")`.
   Vite inlines any file under 4 KB into the CSS by default, so the icons cost
   no request of their own.

Serve the files from your own site. A mask image from another origin only loads
when that server allows it (CORS), and each icon becomes a separate request.

**Accessibility.** The icon element is empty, so screen readers skip it. A
button that shows only an icon needs an `aria-label`, as in the tooltip example
(4.10).

**In Figma.** Place the icon as a 16px instance and bind its fill (Bootstrap
Icons) or its stroke (Lucide) to the same variable as the text beside it.

**Names.** The examples in section 4 name their classes after Lucide. To use
Bootstrap Icons, keep the class and point it at the other file:

| Class | Lucide file | Bootstrap Icons file |
| --- | --- | --- |
| `icon-bell` | `bell.svg` | `bell.svg` |
| `icon-bell-ring` | `bell-ring.svg` | `bell-fill.svg` |
| `icon-bold` | `bold.svg` | `type-bold.svg` |
| `icon-calendar` | `calendar.svg` | `calendar.svg` |
| `icon-check` | `check.svg` | `check.svg` |
| `icon-chevron-down` | `chevron-down.svg` | `chevron-down.svg` |
| `icon-circle-alert` | `circle-alert.svg` | `exclamation-circle.svg` |
| `icon-circle-check` | `circle-check.svg` | `check-circle.svg` |
| `icon-circle-user` | `circle-user.svg` | `person-circle.svg` |
| `icon-circle-x` | `circle-x.svg` | `x-circle.svg` |
| `icon-credit-card` | `credit-card.svg` | `credit-card.svg` |
| `icon-download` | `download.svg` | `download.svg` |
| `icon-file-text` | `file-text.svg` | `file-earmark-text.svg` |
| `icon-folder` | `folder.svg` | `folder.svg` |
| `icon-globe` | `globe.svg` | `globe.svg` |
| `icon-house` | `house.svg` | `house.svg` |
| `icon-image` | `image.svg` | `image.svg` |
| `icon-italic` | `italic.svg` | `type-italic.svg` |
| `icon-life-buoy` | `life-buoy.svg` | `life-preserver.svg` |
| `icon-link` | `link.svg` | `link-45deg.svg` |
| `icon-log-out` | `log-out.svg` | `box-arrow-right.svg` |
| `icon-mail` | `mail.svg` | `envelope.svg` |
| `icon-map-pin` | `map-pin.svg` | `geo-alt.svg` |
| `icon-pencil` | `pencil.svg` | `pencil.svg` |
| `icon-phone` | `phone.svg` | `telephone.svg` |
| `icon-search` | `search.svg` | `search.svg` |
| `icon-send` | `send.svg` | `send.svg` |
| `icon-settings` | `settings.svg` | `gear.svg` |
| `icon-share-2` | `share-2.svg` | `share.svg` |
| `icon-sheet` | `sheet.svg` | `file-earmark-spreadsheet.svg` |
| `icon-shield` | `shield.svg` | `shield.svg` |
| `icon-smartphone` | `smartphone.svg` | `phone.svg` |
| `icon-trash-2` | `trash-2.svg` | `trash.svg` |
| `icon-triangle-alert` | `triangle-alert.svg` | `exclamation-triangle.svg` |
| `icon-truck` | `truck.svg` | `truck.svg` |
| `icon-underline` | `underline.svg` | `type-underline.svg` |
| `icon-user` | `user.svg` | `person.svg` |
| `icon-user-plus` | `user-plus.svg` | `person-plus.svg` |
| `icon-users` | `users.svg` | `people.svg` |
| `icon-x` | `x.svg` | `x.svg` |

## 2. Color roles

Seven roles. Five are palette colors; two are defined against the page itself,
which is what makes them work in both modes without a second definition.

| Role | Fill (light) | Fill (dark) | Label on that fill |
| --- | --- | --- | --- |
| `pui-theme` | #0092CD | #07B6F0 | Page background |
| `pui-success` | #16A34A | #22C55E | Page background |
| `pui-error` | #DC2626 | #EF4444 | Page background |
| `pui-warn` | #D97706 | #F59E0B | Page background |
| `pui-muted` | #6B7280 | #9CA3AF | Page background |
| `pui-surface` | #FFFFFF | #000000 | Body text color |
| `pui-inverse` | #000000 | #FFFFFF | Page background |

## 3. Styles

Four ways to apply a color. They differ only in what gets painted.

| Style | Fill | Text | Border |
| --- | --- | --- | --- |
| `pui-solid` | The color | The label color | The color |
| `pui-soft` | The color at 15% | The color, deepened | None |
| `pui-outline` | None | The color, deepened | The color |
| `pui-link` | None | The color, deepened | None |

"Deepened" means moved 25% toward the page's text color, which is what keeps it
readable on the page and on a soft tint. Hover raises the tint to 22% for soft,
10% for outline, and shifts a solid fill 12% toward the text color. A link
underlines on hover, 0.3rem below the text.

### 3.1 Every combination, light mode

Page background #FFFFFF.

| Classes | Fill | Text | Border | Fill on hover |
| --- | --- | --- | --- | --- |
| `pui-solid pui-theme` | #0092CD | #FFFFFF | #0092CD | #007AAD |
| `pui-solid pui-success` | #16A34A | #FFFFFF | #16A34A | #11893D |
| `pui-solid pui-error` | #DC2626 | #FFFFFF | #DC2626 | #B91E1E |
| `pui-solid pui-warn` | #D97706 | #FFFFFF | #D97706 | #B76304 |
| `pui-solid pui-muted` | #6B7280 | #FFFFFF | #6B7280 | #595F6B |
| `pui-solid pui-surface` | #FFFFFF | #000000 | #D1D5DB | #D7D7D7 |
| `pui-solid pui-inverse` | #000000 | #FFFFFF | #000000 | #060606 |
| `pui-soft pui-theme` | #0092CD at 15% → #D9EFF8 | #00628B | none | #0092CD at 22% → #C7E7F4 |
| `pui-soft pui-success` | #16A34A at 15% → #DCF1E4 | #0B6E2F | none | #16A34A at 22% → #CCEBD7 |
| `pui-soft pui-error` | #DC2626 at 15% → #FADFDF | #951616 | none | #DC2626 at 22% → #F7CFCF |
| `pui-soft pui-warn` | #D97706 at 15% → #F9EBDA | #934F03 | none | #D97706 at 22% → #F7E1C8 |
| `pui-soft pui-muted` | #6B7280 at 15% → #E9EAEC | #464B55 | none | #6B7280 at 22% → #DEE0E3 |
| `pui-soft pui-surface` | #FFFFFF at 15% → #FFFFFF | #000000 | none | #FFFFFF at 22% → #FFFFFF |
| `pui-soft pui-inverse` | #000000 at 15% → #D9D9D9 | #000000 | none | #000000 at 22% → #C7C7C7 |
| `pui-outline pui-theme` | none | #00628B | #0092CD | #0092CD at 10% → #E5F4FA |
| `pui-outline pui-success` | none | #0B6E2F | #16A34A | #16A34A at 10% → #E7F6ED |
| `pui-outline pui-error` | none | #951616 | #DC2626 | #DC2626 at 10% → #FBE9E9 |
| `pui-outline pui-warn` | none | #934F03 | #D97706 | #D97706 at 10% → #FBF1E6 |
| `pui-outline pui-muted` | none | #464B55 | #6B7280 | #6B7280 at 10% → #F0F1F2 |
| `pui-outline pui-surface` | none | #000000 | #D1D5DB | #FFFFFF at 10% → #FFFFFF |
| `pui-outline pui-inverse` | none | #000000 | #000000 | #000000 at 10% → #E5E5E5 |
| `pui-link pui-theme` | none | #00628B | none | none |
| `pui-link pui-success` | none | #0B6E2F | none | none |
| `pui-link pui-error` | none | #951616 | none | none |
| `pui-link pui-warn` | none | #934F03 | none | none |
| `pui-link pui-muted` | none | #464B55 | none | none |
| `pui-link pui-surface` | none | #000000 | none | none |
| `pui-link pui-inverse` | none | #000000 | none | none |

### 3.2 Every combination, dark mode

Page background #000000.

| Classes | Fill | Text | Border | Fill on hover |
| --- | --- | --- | --- | --- |
| `pui-solid pui-theme` | #07B6F0 | #000000 | #07B6F0 | #48BFF2 |
| `pui-solid pui-success` | #22C55E | #000000 | #22C55E | #50CD73 |
| `pui-solid pui-error` | #EF4444 | #000000 | #EF4444 | #F5615B |
| `pui-solid pui-warn` | #F59E0B | #000000 | #F59E0B | #F7AA45 |
| `pui-solid pui-muted` | #9CA3AF | #000000 | #9CA3AF | #A7AEB8 |
| `pui-solid pui-surface` | #000000 | #FFFFFF | #374151 | #060606 |
| `pui-solid pui-inverse` | #FFFFFF | #000000 | #FFFFFF | #D7D7D7 |
| `pui-soft pui-theme` | #07B6F0 at 15% → #011B24 | #6BC9F5 | none | #07B6F0 at 22% → #022835 |
| `pui-soft pui-success` | #22C55E at 15% → #051D0E | #71D588 | none | #22C55E at 22% → #072B15 |
| `pui-soft pui-error` | #EF4444 at 15% → #240A0A | #FA7B73 | none | #EF4444 at 22% → #340F0F |
| `pui-soft pui-warn` | #F59E0B at 15% → #251802 | #F9B867 | none | #F59E0B at 22% → #362302 |
| `pui-soft pui-muted` | #9CA3AF at 15% → #17181A | #B4B9C3 | none | #9CA3AF at 22% → #222426 |
| `pui-soft pui-surface` | #000000 at 15% → #000000 | #FFFFFF | none | #000000 at 22% → #000000 |
| `pui-soft pui-inverse` | #FFFFFF at 15% → #262626 | #FFFFFF | none | #FFFFFF at 22% → #383838 |
| `pui-outline pui-theme` | none | #6BC9F5 | #07B6F0 | #07B6F0 at 10% → #011318 |
| `pui-outline pui-success` | none | #71D588 | #22C55E | #22C55E at 10% → #03140A |
| `pui-outline pui-error` | none | #FA7B73 | #EF4444 | #EF4444 at 10% → #180707 |
| `pui-outline pui-warn` | none | #F9B867 | #F59E0B | #F59E0B at 10% → #191001 |
| `pui-outline pui-muted` | none | #B4B9C3 | #9CA3AF | #9CA3AF at 10% → #101112 |
| `pui-outline pui-surface` | none | #FFFFFF | #374151 | #000000 at 10% → #000000 |
| `pui-outline pui-inverse` | none | #FFFFFF | #FFFFFF | #FFFFFF at 10% → #1A1A1A |
| `pui-link pui-theme` | none | #6BC9F5 | none | none |
| `pui-link pui-success` | none | #71D588 | none | none |
| `pui-link pui-error` | none | #FA7B73 | none | none |
| `pui-link pui-warn` | none | #F9B867 | none | none |
| `pui-link pui-muted` | none | #B4B9C3 | none | none |
| `pui-link pui-surface` | none | #FFFFFF | none | none |
| `pui-link pui-inverse` | none | #FFFFFF | none | none |

## 4. Components

Each one is a shape. Unless stated otherwise it carries no color of its own and
takes a style and a color class from section 3.

Every component lists its variants, and each one says where it comes from,
because they are not all yours to build:

- **class** — a class the library ships. Build it as a variant.
- **composition** — a style class plus a color class from section 3, which any
  colorable element accepts. Build it as the two variant properties in 6.4.
- **shape** — the component's own structure, with nothing added: a card without
  its header, a chip on a button, an icon beside a label. Draw it, do not make
  it a class.
- **HTML** — a native attribute (`open`, `disabled`, `checked`,
  `aria-invalid`, `name`, `closedby`). A state in Figma, not a class.
- **author CSS** — a recipe the library deliberately does not ship. Skip it
  unless the project asks for it; it is one or two declarations of someone's own.

One rule runs through all of them: a **color class alone never paints**. It only
sets variables, so it needs a style class beside it. The two exceptions are
noted where they occur — a checked checkbox, radio or switch reads the color
variable directly, and so does the focus ring.

Every component ends with **examples**: the screens it usually appears in, as
markup. Their icons are the `icon icon-*` classes from 1.6: your own CSS, one
file per icon, from Lucide or Bootstrap Icons. The library ships none.

### 4.1 Button — `pui-btn`

A horizontal row: optional icon, label, optional icon. Centered on both axes.

| Property | Value |
| --- | --- |
| Padding | 8px 16px |
| Font size | 14px |
| Line height | 17.5px |
| Corner radius | 6px |
| Border width | 1px |
| Gap between children | 4px |
| Height at one line of text | 35.5px |

- Used on a `<button>` or a link. The text is never underlined and never wraps.
- Add the full radius for a pill: 9999px instead of 6px.
- Disabled is the same shape at 50% opacity.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Any of the 28 style and color pairs | a style class and a color class | composition |
| Pill | add `pui-rounded-full` | class |
| Radius put back inside a group | add `pui-rounded` | class |
| Disabled | the `disabled` attribute | HTML |
| With an icon | any element beside the label; the 4px gap spaces it | shape |
| A link that looks like a button | the same classes on an `<a>` | shape |
| Joined with its neighbours | wrap them in a group (4.16) | class |

**Example: Sign up.** The main action is solid, the alternative is an outline in the surface role, and the way out is a link. The icon sits beside the label; the button's 4px gap spaces it.

```html
<button class="pui-btn pui-solid pui-theme" type="submit">
  <i class="icon icon-user-plus"></i> Create account
</button>
<button class="pui-btn pui-outline pui-surface" type="button">
  <i class="icon icon-mail"></i> Sign up with email
</button>
<a class="pui-btn pui-link pui-theme" href="/login">I already have an account</a>
```

**Example: Destructive confirmation.** A pill for the final step, in the error role.

```html
<button class="pui-btn pui-solid pui-error pui-rounded-full">
  <i class="icon icon-trash-2"></i> Delete repository
</button>
```

### 4.2 Chip — `pui-chip`

One step smaller than a button. Same shape, less horizontal padding.

| Property | Value |
| --- | --- |
| Padding | 4px 12px |
| Font size | 14px |
| Line height | 17.5px |
| Corner radius | 6px |
| Border width | 1px |
| Gap between children | 4px |
| Height at one line of text | 27.5px |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Any of the 28 style and color pairs | a style class and a color class | composition |
| Pill | add `pui-rounded-full` | class |
| Clickable | put the classes on a `<button>` | shape |
| With a remove button | a `<button>` inside the chip; the gap spaces it | shape |

**Example: Active filters.** Each filter is a soft chip with a remove button inside it. The chip's gap spaces the icon, the label and the button.

```html
<span class="pui-chip pui-soft pui-theme">
  <i class="icon icon-map-pin"></i> São Paulo
  <button type="button" aria-label="Remove São Paulo"><i class="icon icon-x"></i></button>
</span>
<span class="pui-chip pui-soft pui-theme">
  <i class="icon icon-calendar"></i> Last 30 days
  <button type="button" aria-label="Remove Last 30 days"><i class="icon icon-x"></i></button>
</span>
<span class="pui-chip pui-outline pui-success pui-rounded-full">
  <i class="icon icon-circle-check"></i> Verified
</span>
```

### 4.3 Badge — `pui-badge`

The smallest of the three. Used for counts and short statuses.

| Property | Value |
| --- | --- |
| Padding | 2px 7px |
| Font size | 12px |
| Line height | 15px |
| Corner radius | 6px |
| Border width | 1px |
| Gap between children | 4px |
| Height at one line of text | 21px |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Any of the 28 style and color pairs | a style class and a color class | composition |
| Pill, for a count | add `pui-rounded-full` | class |
| Inside another component | drop it into a button, a list item or a table cell | shape |

**Example: Unread count and status.** A pill badge carries a count inside a button. A soft badge labels a status beside a title.

```html
<button class="pui-btn pui-outline pui-surface">
  <i class="icon icon-bell"></i> Inbox
  <span class="pui-badge pui-solid pui-error pui-rounded-full">3</span>
</button>

<h3>Payment API <span class="pui-badge pui-soft pui-success">Operational</span></h3>
<h3>Search <span class="pui-badge pui-soft pui-warn">Degraded</span></h3>
```

### 4.4 Card — `pui-card`, `pui-card-header`, `pui-card-content`

A surface with its own border and background — it does not need a color class.

**Anatomy:** frame → optional header band → content area.

| Part | Property | Value |
| --- | --- | --- |
| Frame | Corner radius | 9px |
| Frame | Border | 1px solid, border token |
| Frame | Background | Page background token |
| Header | Padding | 8px 16px |
| Header | Background | Muted background token |
| Header | Text color | Muted text token |
| Content | Padding | 16px |
| Content | Gap between children | 12px |

The content area stacks its children vertically with that gap, so items inside a
card need no margins of their own.

**Alert.** The library has no alert component: **an alert is a card with a
style class and a color class**. `pui-soft pui-warn` on the card gives a warning
alert, `pui-solid pui-error` a loud error, `pui-outline pui-success` a quiet
confirmation. The style class repaints the frame's fill, border and text; the
content area keeps its padding and gap. Leave the header band out, because it
keeps its own muted background. Add `role="alert"` for a message that
interrupts and `role="status"` for one that does not. In Figma, build it as the
card component with the style and color properties, not as a component of its
own.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Plain surface | nothing — the card already carries a border and a background | shape |
| Without the header band | leave out the header element | shape |
| Alert | a style class and a color class on the card itself, with no header band | composition |
| As a modal's surface | put the card inside the dialog (4.8) | shape |
| With a table or list flush inside | put it straight in the card, with no content wrapper | shape |

**Example: Contact info.** A header band names the card; the content area stacks the rows with its 12px gap, so the rows need no margins.

```html
<div class="pui-card">
  <div class="pui-card-header">Contact</div>
  <div class="pui-card-content">
    <strong>Ana Souza</strong>
    <span><i class="icon icon-mail"></i> ana@example.com</span>
    <span><i class="icon icon-phone"></i> +55 11 91234-5678</span>
    <span><i class="icon icon-map-pin"></i> Av. Paulista, 1000, São Paulo</span>
    <a class="pui-btn pui-solid pui-theme" href="mailto:ana@example.com">
      <i class="icon icon-send"></i> Send message
    </a>
  </div>
</div>
```

**Example: Alerts.** The same card with a style class and a color class, and no header band. The role attribute tells a screen reader whether to interrupt.

```html
<div class="pui-card pui-soft pui-warn" role="alert">
  <div class="pui-card-content">
    <strong><i class="icon icon-triangle-alert"></i> Your trial ends in 3 days</strong>
    Add a payment method to keep your projects online.
  </div>
</div>

<div class="pui-card pui-soft pui-success" role="status">
  <div class="pui-card-content">
    <strong><i class="icon icon-circle-check"></i> Changes saved</strong>
  </div>
</div>

<div class="pui-card pui-solid pui-error" role="alert">
  <div class="pui-card-content">
    <strong><i class="icon icon-circle-x"></i> Payment failed</strong>
    Your card was declined. Try another one.
  </div>
</div>
```

### 4.5 List — `pui-list`, `pui-list-item`

**Anatomy:** container → items.

| Part | Property | Value |
| --- | --- | --- |
| Container | Padding and margin | 0 |
| Container | Font size | 14px |
| Item | Padding | 8px 16px |
| Item | Corner radius | 6px |
| Item | Border | 1px, transparent until a style class paints it |

Two optional behaviours: striped, where even items take the muted background
token, and hoverable, where the hovered item does.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Striped | add `pui-striped` to the list | class |
| Hoverable | add `pui-hoverable` to the list | class |
| Selected item | `pui-soft` and a color class on that item | composition |
| Bordered item | `pui-outline pui-surface` on that item | composition |
| No bullets | `list-style: none` | author CSS |
| As a dropdown menu | required inside every dropdown panel (4.9), which has no row spacing of its own | shape |

**Example: Recent files.** A hoverable list with no bullets. The selected item is soft in the theme role.

```html
<ul class="pui-list pui-hoverable" style="list-style: none">
  <li class="pui-list-item pui-soft pui-theme" aria-current="true">
    <i class="icon icon-file-text"></i> Q3 report.pdf
  </li>
  <li class="pui-list-item"><i class="icon icon-image"></i> Team photo.png</li>
  <li class="pui-list-item"><i class="icon icon-sheet"></i> Budget 2027.xlsx</li>
  <li class="pui-list-item">
    <i class="icon icon-folder"></i> Archive
    <span class="pui-badge pui-soft pui-muted">12</span>
  </li>
</ul>
```

### 4.6 Table — `pui-table`

**Anatomy:** header row → body rows → optional footer row. Cells carry no class.

| Part | Property | Value |
| --- | --- | --- |
| Cell | Padding | 8px 16px |
| Cell | Border below | 1px solid, border token |
| Cell | Text alignment | Start |
| Header cell | Font weight | 600 |
| Header cell | Text color | Muted text token |
| Footer | Background | Muted background token |
| Footer | Border above | 1px solid, border token |
| Last row | Border below | none |

The last row of the table draws no rule, which is what lets a table sit flush
inside a card.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Striped | add `pui-striped` to the table; even body rows take the muted background | class |
| Hoverable | add `pui-hoverable` to the table | class |
| Summary band at the bottom | add a `<tfoot>` | HTML |
| Colored row | a style class and a color class on the row | composition |
| Flush inside a card | put the table straight in the card | shape |
| Grid lines on every cell | a border on each cell | author CSS |
| No rules at all | `border: none` on the cells | author CSS |
| Compact rows | a smaller block padding on the cells | author CSS |
| Scrolls sideways on a narrow screen | `overflow-x: auto` on the parent | author CSS |

**Example: Invoices.** A striped table flush inside a card, with a status badge per row, an icon button per row and a footer for the total.

```html
<div class="pui-card">
  <div class="pui-card-header">Invoices</div>
  <table class="pui-table pui-striped">
    <thead>
      <tr><th>Invoice</th><th>Date</th><th>Status</th><th>Amount</th><th></th></tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td><td>Sep 1, 2026</td>
        <td><span class="pui-badge pui-soft pui-success">Paid</span></td>
        <td>$120.00</td>
        <td><button class="pui-btn pui-link pui-theme" aria-label="Download #1042"><i class="icon icon-download"></i></button></td>
      </tr>
      <tr>
        <td>#1043</td><td>Sep 15, 2026</td>
        <td><span class="pui-badge pui-soft pui-warn">Pending</span></td>
        <td>$80.00</td>
        <td><button class="pui-btn pui-link pui-theme" aria-label="Download #1043"><i class="icon icon-download"></i></button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr><th colspan="3">Total</th><th>$200.00</th><th></th></tr>
    </tfoot>
  </table>
</div>
```

### 4.7 Accordion — `pui-accordion`, `pui-accordion-item`

**Anatomy:** container → items, each an interactive summary row and a panel.
Consecutive items form **one block**: they share the line between them and only
the two ends of the block stay round. A lone item keeps all four corners,
because it is both the first child and the last.

| Part | Property | Value |
| --- | --- | --- |
| Container | Space between items | -1px — they overlap by one border width, so two borders read as one line |
| Item | Border | 1px solid, border token |
| Item | Corner radius | 6px at the two ends of the block, squared where two items meet |
| Summary | Padding | 8px 16px |
| Summary | Layout | Label at the start, chevron at the end |
| Summary | Corner radius | Its item's, less one border width (5px 5px 0px 0px where the item is round) |
| Panel | Padding | 0px 16px 16px 16px |
| Item, open | Background | None, or the muted background token with the marked variant |

An item's corners depend on where it sits in the block, which is a variant
property of its own — four positions, not four components:

| Position | Item's corners | Summary's corners, which shape its focus ring |
| --- | --- | --- |
| Only item | all four round | all four, one border width less |
| First of several | top two round | top two, one border width less |
| In the middle | all four squared | all four squared |
| Last of several | bottom two round | bottom two while closed, squared once open |

The summary loses its lower corners while its item is open because the panel
owns the bottom of the block by then. Between two items there is no gap: they
overlap by one border width, so the two borders paint as a single line, and the
item holding the keyboard focus is raised above its neighbour or the ring would
be drawn under it.

Marking the open item is optional — it is one variant of the container, and it
paints the whole expanded item, summary and panel, with the muted background
token, out to whichever corners that item kept. The chevron is a solid triangle pointing down, 8px wide and 4px tall, in the current text
color. It rotates 180° when the item opens, around its own center.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| One block | the default — consecutive items overlap their borders into one line and only the ends of the block are round | shape |
| Bordered | also the default — every item carries a 1px border in the border token | shape |
| Borderless | `border: none` on the item; the library ships no class for it | author CSS |
| Spaced apart | a gap on the container, with the items' negative margin and full radius put back; the library ships no class for it | author CSS |
| Marked open item | add `pui-highlighted` to the container: the expanded item, summary and panel, takes the muted background | class |
| One open at a time | the same `name` on every `<details>` | HTML |
| Open on load | the `open` attribute | HTML |
| Your own icon | an element with `pui-accordion-icon` inside the summary; the drawn chevron steps aside and the rotation stays | class |
| Nested | another accordion inside a panel | shape |

**Example: Frequently asked questions.** The same name on every item keeps one open at a time, and the marked variant shades the open one. The icons sit in the summary before the label.

```html
<div class="pui-accordion pui-highlighted">
  <details class="pui-accordion-item" name="faq" open>
    <summary><i class="icon icon-credit-card"></i> How am I billed?</summary>
    <p>Monthly, on the day you subscribed. Cancel any time.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary><i class="icon icon-users"></i> Can I invite my team?</summary>
    <p>Yes. Every plan includes up to five members.</p>
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary><i class="icon icon-shield"></i> Where is my data stored?</summary>
    <p>In data centers in the region you pick when you sign up.</p>
  </details>
</div>
```

### 4.8 Modal — `pui-modal`

**Anatomy:** dimmed backdrop → centered dialog → a card inside it.

| Part | Property | Value |
| --- | --- | --- |
| Backdrop | Fill | Black at 50% |
| Dialog | Maximum width | 512px, or the viewport minus 32px |
| Dialog | Maximum height | Viewport minus 32px |
| Dialog | Padding, border, background | none — the card inside provides all three |
| Dialog | Position | Centered on both axes |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Light dismiss | `closedby="any"` — click the backdrop or press Escape | HTML |
| Static backdrop | leave `closedby` out; only a close button dismisses it | HTML |
| Opened and closed without script | `commandfor` and `command` on the buttons | HTML |
| Long content | the dialog scrolls at the viewport height; the card inside does not | shape |
| Moving between two modals | close the current one on the same click that opens the next | author CSS |

**Example: Request permission.** A card inside the dialog. The buttons open and close it with no script of yours. The row of actions is the author's own layout, because the content area stacks its children.

```html
<button class="pui-btn pui-solid pui-theme" commandfor="notify" command="show-modal">
  <i class="icon icon-bell"></i> Turn on notifications
</button>

<dialog class="pui-modal" id="notify" closedby="any" aria-labelledby="notify-title">
  <div class="pui-card">
    <div class="pui-card-header" id="notify-title">
      <i class="icon icon-bell-ring"></i> Allow notifications?
    </div>
    <div class="pui-card-content">
      We will let you know when someone mentions you or a build fails.
      You can change this later in Settings.
      <div style="display: flex; gap: 8px; justify-content: flex-end">
        <button class="pui-btn pui-outline pui-surface" commandfor="notify" command="close">
          Not now
        </button>
        <button class="pui-btn pui-solid pui-theme" commandfor="notify" command="close">
          <i class="icon icon-check"></i> Allow
        </button>
      </div>
    </div>
  </div>
</dialog>
```

### 4.9 Dropdown — `pui-dropdown`

A panel anchored to the control that opens it.

**Anatomy:** panel → list (4.5) → list items. The list is **required**. The
panel only has a thin inset; it has no row spacing of its own. The rows get
their padding and their hover from the list items, because the dropdown reuses
the list instead of repeating it. Text put straight in the panel sits
4px from the border and nothing separates one line
from the next.

| Part | Property | Value |
| --- | --- | --- |
| Panel | Padding | 4px |
| Panel | Corner radius | 6px |
| Panel | Border | 1px solid, border token |
| Panel | Background | Page background token |
| Panel | Minimum width | The width of its trigger |
| Panel | Distance from the trigger | 4px |
| List | Padding and margin | 0 |
| Item | Padding | 8px 16px |
| Item | Corner radius | 6px |
| Item | Line height | normal |
| Panel | Height with one item | 45px |

Use `pui-hoverable` on the list so the item under the pointer takes the muted
background token, and `list-style: none` so the items show no bullets.

Placement: below the trigger and aligned to its starting edge by default; above,
before or after it on request; aligned centered or to the end on request. It
flips to the opposite side when the preferred one does not fit.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Below, aligned to the start | the default | shape |
| Above, before, after | `pui-top`, `pui-start`, `pui-end` | class |
| Centered or end-aligned on the other axis | `pui-align-center`, `pui-align-end` | class |
| A menu | always a list inside the panel (4.5); without it the rows have no spacing | shape |
| Menu with a hover row | add `pui-hoverable` to the list inside the panel | class |
| Selected option | `pui-soft` and a color class on that list item | composition |
| Closes on a click inside | a button with `popovertarget` and `popovertargetaction="hide"` | HTML |

**Example: Account menu.** The list inside the panel is required: it gives the rows their padding and their hover. The panel opens under the end of the trigger, as a menu in a page header does.

```html
<button class="pui-btn pui-outline pui-surface" popovertarget="account">
  <i class="icon icon-circle-user"></i> Ana <i class="icon icon-chevron-down"></i>
</button>

<div class="pui-dropdown pui-align-end" id="account" popover>
  <ul class="pui-list pui-hoverable" style="list-style: none">
    <li class="pui-list-item"><i class="icon icon-user"></i> Profile</li>
    <li class="pui-list-item"><i class="icon icon-settings"></i> Settings</li>
    <li class="pui-list-item"><i class="icon icon-life-buoy"></i> Help</li>
    <li class="pui-list-item"><i class="icon icon-log-out"></i> Sign out</li>
  </ul>
</div>
```

### 4.10 Tooltip — `pui-tooltip`

| Property | Value |
| --- | --- |
| Padding | 5px 10px |
| Font size | 12px |
| Line height | normal |
| Corner radius | 6px |
| Border width | 1px |
| Height at one line of text | 26px |
| Background | Page background token |
| Border | 1px solid, border token |
| Maximum width | 320px |
| Distance from the trigger | 4px |

Placement: above the trigger and centered on it by default; below, before or
after it on request. Same flipping rule as the dropdown.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Above, centered | the default | shape |
| Below, before, after | `pui-bottom`, `pui-start`, `pui-end` | class |
| Dark, v0's black tooltip | `pui-solid pui-inverse` | composition |
| Any other style and color pair | a style class and a color class | composition |
| On any element | `interestfor` pointing at it | HTML |

**Example: Icon buttons.** A button with only an icon names itself in a tooltip. The dark variant is the solid inverse pair.

```html
<button class="pui-btn pui-outline pui-surface" interestfor="copy-tip" aria-label="Copy link">
  <i class="icon icon-link"></i>
</button>
<div class="pui-tooltip" id="copy-tip" popover="hint">Copy link</div>

<button class="pui-btn pui-outline pui-surface" interestfor="share-tip" aria-label="Share">
  <i class="icon icon-share-2"></i>
</button>
<div class="pui-tooltip pui-bottom pui-solid pui-inverse" id="share-tip" popover="hint">
  Share with your team
</div>
```

### 4.11 Field group — `pui-field-group`

**Anatomy:** label → control → message, stacked.

| Part | Property | Value |
| --- | --- | --- |
| Group | Gap between parts | 4px |
| Label | Font size | 12px |
| Message | Font size | 12px |
| Message | Text color | Muted text token, or the error token when the field is invalid |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| With a message | a `<small>` after the control | shape |
| Without a label or message | leave the element out; the group only spaces what is there | shape |
| Invalid | `aria-invalid="true"` on the control: its border, and the message, turn to the error token | HTML |
| Around any control | an input, a textarea, a select, a checkbox or an input group | shape |

**Example: Sign-up fields.** A label, the control and a message, stacked with a 4px gap. The second field is invalid, so its border and its message take the error color.

```html
<label class="pui-field-group">
  <span>Email</span>
  <input class="pui-input" type="email" placeholder="you@example.com" aria-describedby="email-help">
  <small id="email-help">We never share your email.</small>
</label>

<label class="pui-field-group">
  <span>Password</span>
  <input class="pui-input" type="password" aria-invalid="true" aria-describedby="password-help">
  <small id="password-help"><i class="icon icon-circle-alert"></i> At least 8 characters.</small>
</label>
```

### 4.12 Input — `pui-input`

Covers the text field, the textarea and the select.

| Property | Value |
| --- | --- |
| Padding | 6px 12px |
| Font size | 14px |
| Line height | 17.5px |
| Corner radius | 6px |
| Border width | 1px |
| Height at one line of text | 31.5px |
| Background | Transparent |
| Border | 1px solid, border token — the error token when invalid |
| Placeholder color | Muted text token |

A select adds a downward triangle in the current text color at the end,
8.4px by 4.2px, 12px from the edge, with the padding on that
side raised to 28px. It is drawn as an image rather than from borders,
which is why it keeps a fraction of a pixel where the accordion's chevron is
rounded to whole ones.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Text field | any `<input>` type | shape |
| Textarea | a `<textarea>`, which also grows vertically | shape |
| Select | a `<select>`, which adds the arrow and the end padding | shape |
| Invalid | `aria-invalid="true"`: the border takes the error token | HTML |
| Disabled | the `disabled` attribute: 50% opacity | HTML |
| Full width | `width: 100%`; the control does not stretch on its own | author CSS |

**Example: Contact form.** The same class on a text field, a select and a textarea. Each control is set to full width by the author.

```html
<input class="pui-input" type="text" placeholder="Your name" style="width: 100%">
<select class="pui-input" style="width: 100%">
  <option>Sales</option>
  <option>Support</option>
  <option>Billing</option>
</select>
<textarea class="pui-input" rows="4" placeholder="How can we help?" style="width: 100%"></textarea>
```

### 4.13 Input group — `pui-input-group`, `pui-addon`

A control and one or more addons fused into a single field.

| Part | Property | Value |
| --- | --- | --- |
| Group | Border | 1px solid, border token |
| Group | Corner radius | 6px |
| Children | Border and radius | None, except the outer corners of the first and last child, which take 5px 5px 0px 0px |
| Addon | Horizontal padding | 12px |
| Addon | Background | Muted background token |
| Addon | Text color | Muted text token |
| Addon | Border facing the control | 1px solid, border token |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Addon before, after, or both | put the addon on either side of the control, or one on each | shape |
| With a button instead of an addon | a button as the last child; it keeps its own colors and its own focus ring | shape |
| Invalid | `aria-invalid="true"` on the control inside | HTML |
| Inside a field group | the group takes a label and a message like any control | shape |

**Example: Search and website.** An icon in an addon before the control and a button after it. A text addon fixes the part of a value the user does not type.

```html
<div class="pui-input-group">
  <span class="pui-addon"><i class="icon icon-search"></i></span>
  <input class="pui-input" type="search" placeholder="Search projects">
  <button class="pui-btn pui-solid pui-theme">Search</button>
</div>

<div class="pui-input-group">
  <span class="pui-addon">https://</span>
  <input class="pui-input" value="perfectui.dev">
  <span class="pui-addon"><i class="icon icon-globe"></i></span>
</div>
```

### 4.14 Checkbox, radio and switch — `pui-checkbox`, `pui-radio`, `pui-switch`

| Control | Width | Height | Radius | Checked mark |
| --- | --- | --- | --- | --- |
| Checkbox | 16px | 16px | 3px | White check, 8.3px by 6px, centered |
| Checkbox, indeterminate | 16px | 16px | 3px | White bar, 7.8px by 2px, centered |
| Radio | 16px | 16px | Full | White dot, 7px across, centered |
| Switch | 32px | 16px | Full | White knob, 9px across, 4.5px from the end |

Unchecked: transparent fill, 1px border in the border token. The switch shows its
knob in the border token at the start. Checked: the fill and the border both take
the element's color, defaulting to the theme color.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Checked | the `checked` attribute | HTML |
| Indeterminate, checkbox only | the `indeterminate` attribute | HTML |
| Disabled | the `disabled` attribute: 50% opacity | HTML |
| Colored | **a color class on its own is enough here** — a checked control reads the color variable directly, so `pui-success` turns it green with no style class. This is the one place where that works | composition |
| With a label and a message | wrap it in a field group (4.11) | shape |

**Example: Notification preferences.** Switches for settings that apply at once, radios for one choice among several and a checkbox for consent. The success color on the switch needs no style class.

```html
<label><input type="checkbox" class="pui-switch" checked> <i class="icon icon-mail"></i> Email</label>
<label><input type="checkbox" class="pui-switch pui-success" checked> <i class="icon icon-smartphone"></i> Push</label>

<label><input type="radio" class="pui-radio" name="digest" checked> Daily digest</label>
<label><input type="radio" class="pui-radio" name="digest"> Weekly digest</label>

<label><input type="checkbox" class="pui-checkbox"> I agree to the terms of service</label>
```

### 4.15 Timeline — `pui-timeline`, `pui-checkpoint`, `pui-checkpoint-icon`

**Anatomy:** a vertical stack of checkpoints. Each one is an icon and its
content side by side, and draws the rule that connects it to the next.

| Part | Property | Value |
| --- | --- | --- |
| Checkpoint | Gap between icon and content | 12px |
| Checkpoint | Space below | 16px, and none on the last one |
| Icon | Width and height | 24.5px |
| Icon | Corner radius | Full |
| Icon | Font size | 12px |
| Icon | Border | 1px, colored by its style class |
| Rule | Width | 1px, in the border token |
| Rule | Position | Centered on the icon, 12px from the starting edge |
| Rule | Runs from | 4px below the icon to 4px above the next one |

The last checkpoint has no space below it and draws no rule. The icon is an
ordinary colored element: it takes a style and a color like a badge does.

Combined with a row group, the same structure lays out horizontally: the icon
sits above its content and the rule runs across instead of down.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Vertical | the default | shape |
| Horizontal | add `pui-group-row` to the timeline | class |
| Colored checkpoint | a style class and a color class on the icon, as on a badge | composition |
| An icon instead of text | anything inside the icon element; it centers its content | shape |

**Example: Order tracking.** Each checkpoint icon is colored like a badge and holds an icon of its own. Steps not reached yet are an outline in the muted role.

```html
<figure class="pui-timeline">
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-success"><i class="icon icon-check"></i></i>
    <article><strong>Order placed</strong><p>Sep 20, 10:14</p></article>
  </figcaption>
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-solid pui-theme"><i class="icon icon-truck"></i></i>
    <article><strong>Shipped</strong><p>Sep 22, 08:30</p></article>
  </figcaption>
  <figcaption class="pui-checkpoint">
    <i class="pui-checkpoint-icon pui-outline pui-muted"><i class="icon icon-house"></i></i>
    <article><strong>Delivered</strong><p>Expected Sep 25</p></article>
  </figcaption>
</figure>
```

### 4.16 Group — `pui-group-row`, `pui-group-col`, `pui-group-responsive`

Joins neighbouring elements into one control.

| Property | Value |
| --- | --- |
| Overlap between children | -1px — one border width, so two borders read as one line |
| Inner corners | Squared |
| Outer corners | The default radius, on the first and last child only |
| Direction | Row or column; the responsive variant is a row above 1024px and a column below |

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Row | `pui-group-row` | class |
| Column | `pui-group-col` | class |
| Row above 1024px, column below | `pui-group-responsive` | class |
| One child detached again | `pui-rounded` on that child puts its radius back | class |
| Any components mixed | buttons, inputs, addons and selects share the same joining rules | shape |

**Example: Toolbar and newsletter.** Icon buttons joined into one control, and an input fused with its button.

```html
<div class="pui-group-row" role="toolbar" aria-label="Formatting">
  <button class="pui-btn pui-outline pui-surface" aria-label="Bold"><i class="icon icon-bold"></i></button>
  <button class="pui-btn pui-outline pui-surface" aria-label="Italic"><i class="icon icon-italic"></i></button>
  <button class="pui-btn pui-outline pui-surface" aria-label="Underline"><i class="icon icon-underline"></i></button>
</div>

<div class="pui-group-row">
  <input class="pui-input" type="email" placeholder="you@example.com" aria-label="Email">
  <button class="pui-btn pui-solid pui-theme"><i class="icon icon-send"></i> Subscribe</button>
</div>
```

### 4.17 Float — `pui-float`

A single element pinned 24px — six spacing units — from the bottom and starting
edge of the viewport.

**Variants.**

| Variant | How | Comes from |
| --- | --- | --- |
| Bottom start | the default | shape |
| Any other corner | one `inset-block` or `inset-inline` declaration | author CSS |
| Around any element | a button, a card, a group — the class only positions | shape |

**Example: Compose button.** A pill button pinned to the corner of the viewport.

```html
<button class="pui-btn pui-solid pui-theme pui-rounded-full pui-float">
  <i class="icon icon-pencil"></i> New message
</button>
```

## 5. Interaction states

Five states, applied the same way everywhere.

| State | What changes |
| --- | --- |
| Hover | A solid fill moves 12% toward the page text color. A soft fill goes from 15% to 22%. An outline picks up a 10% tint. A link underlines, 0.3rem below the text. |
| Focus | A 2px ring in the element's own color — the theme color when it has none — 2px outside the element, following its corner radius. Keyboard focus only. Two components measure the gap from inside their own border and so sit 3px out: an accordion's summary and a control inside an input group, which hands its ring to the group. |
| Disabled | The whole element at 50% opacity, cursor not allowed. Nothing else changes. |
| Invalid | The control's border, its text and its message all take the error token. |
| Checked | A checkbox, radio or switch fills with its own color, defaulting to the theme color. |

Transitions run at 150ms on background, border and text color, and are removed
entirely for anyone who asked their system to reduce motion.

## 6. Building this in Figma

Figma variables carry modes; paint styles do not. So every color here is a
**variable** in one collection with a light and a dark mode, and components
reference the variables. Do not create a paint style per style-and-color
combination: 28 combinations in two modes is 56 styles that all repeat the same
five facts, and naming them is where a file ends up with `theme/accent` beside
`success/deepened`.

### 6.1 One collection, two modes

Name the collection `pui` and its modes `light` and `dark`. Six variables
describe the page.

| Variable | Light | Dark | Used for |
| --- | --- | --- | --- |
| `page/bg` | #FFFFFF | #000000 | Page, card and overlay background |
| `page/bg-muted` | #F3F4F6 | #111827 | Card header, table footer, addon, stripe, hovered row |
| `page/bg-emphasis` | #E5E7EB | #1F2937 | Nothing in the library — yours to use |
| `page/text` | #000000 | #FFFFFF | Body text |
| `page/text-muted` | #676D7B | #9CA3AF | Label, help message, table header, card header |
| `page/border` | #D1D5DB | #374151 | Every border that carries no role color |

Each of the seven roles gets the same five variables. Five slots for every
role means a component never needs a special case.

| Slot | What it paints |
| --- | --- |
| `<role>/fill` | Solid background, and a checked control |
| `<role>/on-fill` | The label sitting on that fill |
| `<role>/fill-hover` | The solid background under the pointer |
| `<role>/edge` | The border, for solid and outline |
| `<role>/ink` | The text of soft, outline and link |

| Variable | Light | Dark |
| --- | --- | --- |
| `theme/fill` | #0092CD | #07B6F0 |
| `theme/on-fill` | #FFFFFF | #000000 |
| `theme/fill-hover` | #007AAD | #48BFF2 |
| `theme/edge` | #0092CD | #07B6F0 |
| `theme/ink` | #00628B | #6BC9F5 |
| `success/fill` | #16A34A | #22C55E |
| `success/on-fill` | #FFFFFF | #000000 |
| `success/fill-hover` | #11893D | #50CD73 |
| `success/edge` | #16A34A | #22C55E |
| `success/ink` | #0B6E2F | #71D588 |
| `error/fill` | #DC2626 | #EF4444 |
| `error/on-fill` | #FFFFFF | #000000 |
| `error/fill-hover` | #B91E1E | #F5615B |
| `error/edge` | #DC2626 | #EF4444 |
| `error/ink` | #951616 | #FA7B73 |
| `warn/fill` | #D97706 | #F59E0B |
| `warn/on-fill` | #FFFFFF | #000000 |
| `warn/fill-hover` | #B76304 | #F7AA45 |
| `warn/edge` | #D97706 | #F59E0B |
| `warn/ink` | #934F03 | #F9B867 |
| `muted/fill` | #6B7280 | #9CA3AF |
| `muted/on-fill` | #FFFFFF | #000000 |
| `muted/fill-hover` | #595F6B | #A7AEB8 |
| `muted/edge` | #6B7280 | #9CA3AF |
| `muted/ink` | #464B55 | #B4B9C3 |
| `surface/fill` | #FFFFFF | #000000 |
| `surface/on-fill` | #000000 | #FFFFFF |
| `surface/fill-hover` | #D7D7D7 | #060606 |
| `surface/edge` | #D1D5DB | #374151 |
| `surface/ink` | #000000 | #FFFFFF |
| `inverse/fill` | #000000 | #FFFFFF |
| `inverse/on-fill` | #FFFFFF | #000000 |
| `inverse/fill-hover` | #060606 | #D7D7D7 |
| `inverse/edge` | #000000 | #FFFFFF |
| `inverse/ink` | #000000 | #FFFFFF |

Number variables, named after the value they hold in pixels, because the
library has no semantic size scale to borrow names from — a spacing is always
the 4px unit times something:

| Group | Variables |
| --- | --- |
| `space/` | 2, 4, 5, 6, 7, 8, 10, 12, 16, 24, 28, 32 |
| `radius/` | 3, 5, 6, 9, full (9999) |
| `border/` | 1 |

### 6.2 The four styles as variable references

This table replaces the 56 paint styles. A style is which slots an element
reads, and nothing else.

| Style | Fill | Fill opacity | Text | Border |
| --- | --- | --- | --- | --- |
| `solid` | `<role>/fill` | 100% | `<role>/on-fill` | `<role>/edge` |
| `soft` | `<role>/fill` | 15% | `<role>/ink` | none |
| `outline` | none | — | `<role>/ink` | `<role>/edge` |
| `link` | none | — | `<role>/ink` | none |

| Style | On hover |
| --- | --- |
| `solid` | Fill becomes `<role>/fill-hover` |
| `soft` | Same fill, opacity 15% → 22% |
| `outline` | Fill appears: `<role>/fill` at 10% |
| `link` | Text underlines, 5px below the baseline |

**A tint is an opacity, not a variable.** A soft fill is the role's own color at
15%, which is what the library does and what keeps it correct when the mode
changes. Section 3 lists what each tint flattens to over the page, for checking
your work — not for pasting in as a solid color.

### 6.3 Text styles

| Name | Size | Line height | Weight |
| --- | --- | --- | --- |
| `text/body` | 14px | 17.5px | inherited |
| `text/small` | 12px | 15px | inherited |
| `text/strong` | 14px | normal | 600 |

### 6.4 Components

One component per shape in section 4, with two variant properties:

- `style`: solid, soft, outline, link
- `color`: theme, success, error, warn, muted, surface, inverse

Every variant reads the five slots through the table in 6.2, so 28 variants are
28 references, not 28 hand-picked colors. One component needs a third property:
an accordion item takes `position` — only, first, middle, last — because its
corners depend on where it sits in the block (4.7). An alert is not a component:
it is the card with its style and color properties set (4.4). Hover, focus and disabled are a third
property or interactive states, never separate components. Every shape is an
auto-layout frame using the padding and gap from section 4; only the overlays
are positioned against their trigger.

### 6.5 Do not create

- A paint style per style-and-color combination.
- A variable for a tint or for the flattened hex of one.
- A 50–950 ramp. Each role is one color per mode.
- A size scale. A smaller button is a chip, a smaller chip is a badge.
- A second collection, or a second set of styles, for dark mode.

### 6.6 Renaming a file that already exists

A generated file usually names the derived tones by eye. The mapping back:

| Name often generated | Use instead |
| --- | --- |
| `base/*` | `page/*` |
| `<role>/accent`, `<role>/hover` | `<role>/fill-hover` |
| `<role>/deepened`, `<role>/dark` | `<role>/ink` |
| `<role>/soft`, `<role>/subtle` | Delete it — `<role>/fill` at 15% opacity |
| `<role>/text`, `<role>/contrast` | `<role>/on-fill` if it sits on the fill, `<role>/ink` if it sits on the page |

Every role carries all five slots, including the ones a generated file tends to
leave out: `surface` and `inverse` are roles like any other, and `on-fill` and
`edge` exist for all seven.

## 7. Two things worth knowing

**`pui-soft pui-surface` has nothing to paint.** It tints the page background
over the page background. Use the muted role for a neutral fill instead. The
tables include it for completeness, which is why its fill equals its background.

**Light mode trades some contrast for the palette.** Against its white label, a
solid fill reaches 3.50:1 for theme, 3.30:1 for success, 3.19:1 for warn — above the 3:1 floor for
interface elements, below the 4.5:1 that WCAG AA asks of text. This is
deliberate, and the same call covers the white check, dot and knob on a control
filled with its own color. Every text use, every hover and the whole of dark
mode stay at or above 4.5:1.
