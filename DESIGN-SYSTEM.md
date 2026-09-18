# Perfect UI — design system specification

Everything needed to rebuild Perfect UI `1.0.0` as a design library, written
for a tool that cannot run CSS. Every size is in pixels and every color is a hex
value, given for both color modes.

> This file is generated from the shipped stylesheet by
> `scripts/design-system.mjs`, which measures the real components in a browser.
> If a value here disagrees with the library, the library is right and this file
> is stale — regenerate it with `bun run design-system`.

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
| `--pui-text-muted` | #6B7280 | #9CA3AF | Secondary text: help messages, table headers, card headers |
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

### 1.5 Radii

| Name | Value | Used by |
| --- | --- | --- |
| Default | 6px | Buttons, chips, badges, inputs, list items, accordion items, dropdowns, tooltips |
| Inner | 5px | An element inside a bordered container, so its corner stays concentric |
| Large | 9px | Cards |
| Small | 3px | Checkboxes |
| Full | 9999px | Pills, radios, switches, timeline icons |

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

### 4.1 Button

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

### 4.2 Chip

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

### 4.3 Badge

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

### 4.4 Card

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

### 4.5 List

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

### 4.6 Table

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

### 4.7 Accordion

**Anatomy:** container → items, each an interactive summary row and a panel.

| Part | Property | Value |
| --- | --- | --- |
| Container | Gap between items | 4px |
| Item | Border | 1px solid, border token |
| Item | Corner radius | 6px |
| Summary | Padding | 8px 16px |
| Summary | Layout | Label at the start, chevron at the end |
| Summary | Corner radius | 5px (one border width less than the item) |
| Panel | Padding | 0px 16px 16px 16px |

The chevron is a solid triangle pointing down, 8px wide and 4px tall, in the current text
color. It rotates 180° when the item opens, around its own center.

### 4.8 Modal

**Anatomy:** dimmed backdrop → centered dialog → a card inside it.

| Part | Property | Value |
| --- | --- | --- |
| Backdrop | Fill | Black at 50% |
| Dialog | Maximum width | 512px, or the viewport minus 32px |
| Dialog | Maximum height | Viewport minus 32px |
| Dialog | Padding, border, background | none — the card inside provides all three |
| Dialog | Position | Centered on both axes |

### 4.9 Dropdown

A panel anchored to the control that opens it.

| Property | Value |
| --- | --- |
| Padding | 4px |
| Font size | 14px |
| Line height | normal |
| Corner radius | 6px |
| Border width | 1px |
| Height at one line of text | 27px |
| Background | Page background token |
| Border | 1px solid, border token |
| Minimum width | The width of its trigger |
| Distance from the trigger | 4px |

Placement: below the trigger and aligned to its starting edge by default; above,
before or after it on request; aligned centered or to the end on request. It
flips to the opposite side when the preferred one does not fit.

### 4.10 Tooltip

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

### 4.11 Field group

**Anatomy:** label → control → message, stacked.

| Part | Property | Value |
| --- | --- | --- |
| Group | Gap between parts | 4px |
| Label | Font size | 12px |
| Message | Font size | 12px |
| Message | Text color | Muted text token, or the error token when the field is invalid |

### 4.12 Input

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
8px by 4px, 12px from the edge, with the padding on that side raised to 28px.

### 4.13 Input group

A control and one or more addons fused into a single field.

| Part | Property | Value |
| --- | --- | --- |
| Group | Border | 1px solid, border token |
| Group | Corner radius | 6px |
| Children | Border and radius | None, except the outer corners of the first and last child, which take 5px |
| Addon | Horizontal padding | 12px |
| Addon | Background | Muted background token |
| Addon | Text color | Muted text token |
| Addon | Border facing the control | 1px solid, border token |

### 4.14 Checkbox, radio and switch

| Control | Width | Height | Radius | Checked mark |
| --- | --- | --- | --- | --- |
| Checkbox | 16px | 16px | 3px | White check, 8.3px by 6px, centered |
| Checkbox, indeterminate | 16px | 16px | 3px | White bar, 7.8px by 2px, centered |
| Radio | 16px | 16px | Full | White dot, 7px across, centered |
| Switch | 32px | 16px | Full | White knob, 9px across, 4.5px from the end |

Unchecked: transparent fill, 1px border in the border token. The switch shows its
knob in the border token at the start. Checked: the fill and the border both take
the element's color, defaulting to the theme color.

### 4.15 Timeline

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

### 4.16 Group

Joins neighbouring elements into one control.

| Property | Value |
| --- | --- |
| Overlap between children | -1px — one border width, so two borders read as one line |
| Inner corners | Squared |
| Outer corners | The default radius, on the first and last child only |
| Direction | Row or column; the responsive variant is a row above 1024px and a column below |

### 4.17 Float

A single element pinned 24px — six spacing units — from the bottom and starting
edge of the viewport.

## 5. Interaction states

Five states, applied the same way everywhere.

| State | What changes |
| --- | --- |
| Hover | A solid fill moves 12% toward the page text color. A soft fill goes from 15% to 22%. An outline picks up a 10% tint. A link underlines, 0.3rem below the text. |
| Focus | A 2px ring in the element's own color — the theme color when it has none — 2px outside the element, following its corner radius. Keyboard focus only. |
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
| `page/text-muted` | #6B7280 | #9CA3AF | Label, help message, table header, card header |
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
28 references, not 28 hand-picked colors. Hover, focus and disabled are a third
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

**Light mode trades some contrast for the palette.** A solid theme, success or
warn fill against its white label sits between 3.2:1 and 3.5:1 — above the 3:1
floor for interface elements, below the 4.5:1 that WCAG AA asks of text. This is
deliberate. Text styles and the whole of dark mode stay at or above 4.5:1.
