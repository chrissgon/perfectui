/** Turns the measurements into DESIGN-SYSTEM.md. See design-system.mjs. */
import { readFileSync, writeFileSync } from "node:fs";

const { metrics, palette, combos, glyphs, marks } = JSON.parse(
  readFileSync("/tmp/design-data.json", "utf8")
);

/* --- colors -------------------------------------------------------------
   Already resolved by the browser during measurement (see design-system.mjs),
   so there is no conversion left to get wrong here. Each color arrives as
   { hex, alpha, over }: the base color, its opacity, and what it looks like
   once composited over the page. */

const hexOf = (color) => color.hex;

/** "#0092CD", or "#F59E0B at 15% → #FDF1E0", or "none". */
function describe(color) {
  if (!color || color.hex === "transparent") return "none";
  if (color.alpha === 1) return color.hex;
  return `${color.hex} at ${Math.round(color.alpha * 100)}% → ${color.over}`;
}

/** 11.998px is a computed value, not a specification. */
const norm = (v) => {
  if (typeof v !== "string") return v;
  return String(v).replace(/-?[\d.]+/g, (n) => {
    const value = Math.round(parseFloat(n) * 100) / 100;
    return Math.abs(value - Math.round(value)) < 0.06
      ? String(Math.round(value))
      : String(Math.round(value * 10) / 10);
  });
};
const m = (id) =>
  Object.fromEntries(Object.entries(metrics[id]).map(([k, v]) => [k, norm(v)]));
const pad = (id) => {
  const x = m(id);
  const [t, r, b, l] = [
    x["padding-top"],
    x["padding-right"],
    x["padding-bottom"],
    x["padding-left"]
  ];
  return t === b && r === l
    ? t === r
      ? `${t}`
      : `${t} ${r}`
    : `${t} ${r} ${b} ${l}`;
};

const bgOf = (mode) => hexOf(palette[mode].bg);

/**
 * The size of a white mark, measured from the rendered control rather than
 * copied from the stylesheet: the percentages there are gradient stops against
 * the box's corner-to-corner radius, so "34%" is not 34% of the width.
 */
const mark = (id) => {
  const g = glyphs[id];
  if (!g) return "not measured";
  const size =
    g.width === g.height
      ? `${g.width}px across`
      : `${g.width}px by ${g.height}px`;
  const centered = Math.abs(g.inset - (g.box - g.width) / 2) < 0.6;
  const end = Math.round((g.box - g.width - g.inset) * 10) / 10;
  return centered ? `${size}, centered` : `${size}, ${end}px from the end`;
};

/* --- tables ---------------------------------------------------------------- */

const tokenTable = () => {
  const rows = Object.keys(palette.light).map((t) => {
    const l = hexOf(palette.light[t]);
    const d = hexOf(palette.dark[t]);
    return `| \`--pui-${t}\` | ${l} | ${d} | ${TOKEN_ROLE[t]} |`;
  });
  return [
    "| Token | Light | Dark | What it is for |",
    "| --- | --- | --- | --- |",
    ...rows
  ].join("\n");
};

const TOKEN_ROLE = {
  bg: "Page background, and the label on a solid fill",
  "bg-muted": "Card headers, table footers, addons, stripes, hover rows",
  "bg-emphasis":
    "A third level, for authors — no component in the library uses it",
  text: "Body text",
  "text-muted": "Secondary text: help messages, table headers, card headers",
  border: "Every border that is not carrying a color",
  theme: "Brand color",
  success: "Positive state",
  error: "Destructive state and invalid fields",
  warn: "Caution state",
  muted: "Neutral state, the old secondary"
};

const comboTable = (mode) => {
  const rows = [];
  for (const style of ["solid", "soft", "outline", "link"]) {
    for (const color of [
      "theme",
      "success",
      "error",
      "warn",
      "muted",
      "surface",
      "inverse"
    ]) {
      const c = combos[mode][`${style}/${color}`];
      rows.push(
        `| \`pui-${style} pui-${color}\` | ${describe(c.rest["background-color"])} | ${hexOf(c.rest.color)} | ${describe(c.rest["border-top-color"])} | ${describe(c.hover["background-color"])} |`
      );
    }
  }
  return [
    "| Classes | Fill | Text | Border | Fill on hover |",
    "| --- | --- | --- | --- | --- |",
    ...rows
  ].join("\n");
};

/* --- the document ---------------------------------------------------------- */

const doc = `# Perfect UI — design system specification

Everything needed to rebuild Perfect UI \`1.0.0\` as a design library, written
for a tool that cannot run CSS. Every size is in pixels and every color is a hex
value, given for both color modes.

> This file is generated from the shipped stylesheet by
> \`scripts/design-system.mjs\`, which measures the real components in a browser,
> and every number in its prose is then re-checked against a browser by
> \`scripts/design-system-check.mjs\`. If a value here disagrees with the library,
> the library is right and this file is stale — regenerate it with
> \`bun run design-system\`.

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
  given as \`base at N% → flattened\`. Use the base color with the opacity for
  fidelity, or the flattened hex if the element always sits on the page.

## 1. Foundations

### 1.1 Color tokens

${tokenTable()}

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
| Body | ${m("m-btn")["font-size"]} | inherited | ${m("m-btn")["line-height"]} | Buttons, chips, inputs, list items, table cells, card content |
| Small | ${m("m-badge")["font-size"]} | inherited | ${m("m-badge")["line-height"]} | Badges, tooltips, field labels and messages |
| Table header | ${m("m-th")["font-size"]} | ${m("m-th")["font-weight"]} | ${m("m-th")["line-height"]} | Column headers |

### 1.5 Corner radii

| Name | Value | Used by |
| --- | --- | --- |
| Default | ${m("m-btn")["border-radius"]} | Buttons, chips, badges, inputs, list items, accordion items, dropdowns, tooltips |
| Inner | ${m("m-summary")["border-radius"]} | An element inside a bordered container, so its corner stays concentric |
| Large | ${m("m-card")["border-radius"]} | Cards |
| Small | ${m("m-checkbox")["border-radius"]} | Checkboxes |
| Full | 9999px | Pills, radios, switches, timeline icons |

## 2. Color roles

Seven roles. Five are palette colors; two are defined against the page itself,
which is what makes them work in both modes without a second definition.

| Role | Fill (light) | Fill (dark) | Label on that fill |
| --- | --- | --- | --- |
| \`pui-theme\` | ${hexOf(palette.light.theme)} | ${hexOf(palette.dark.theme)} | Page background |
| \`pui-success\` | ${hexOf(palette.light.success)} | ${hexOf(palette.dark.success)} | Page background |
| \`pui-error\` | ${hexOf(palette.light.error)} | ${hexOf(palette.dark.error)} | Page background |
| \`pui-warn\` | ${hexOf(palette.light.warn)} | ${hexOf(palette.dark.warn)} | Page background |
| \`pui-muted\` | ${hexOf(palette.light.muted)} | ${hexOf(palette.dark.muted)} | Page background |
| \`pui-surface\` | ${hexOf(palette.light.bg)} | ${hexOf(palette.dark.bg)} | Body text color |
| \`pui-inverse\` | ${hexOf(palette.light.text)} | ${hexOf(palette.dark.text)} | Page background |

## 3. Styles

Four ways to apply a color. They differ only in what gets painted.

| Style | Fill | Text | Border |
| --- | --- | --- | --- |
| \`pui-solid\` | The color | The label color | The color |
| \`pui-soft\` | The color at 15% | The color, deepened | None |
| \`pui-outline\` | None | The color, deepened | The color |
| \`pui-link\` | None | The color, deepened | None |

"Deepened" means moved 25% toward the page's text color, which is what keeps it
readable on the page and on a soft tint. Hover raises the tint to 22% for soft,
10% for outline, and shifts a solid fill 12% toward the text color. A link
underlines on hover, 0.3rem below the text.

### 3.1 Every combination, light mode

Page background ${bgOf("light")}.

${comboTable("light")}

### 3.2 Every combination, dark mode

Page background ${bgOf("dark")}.

${comboTable("dark")}
`;

/* --- components ------------------------------------------------------------ */

const size = (id, extra = {}) => {
  const x = m(id);
  const rows = [
    ["Padding", pad(id)],
    ["Font size", x["font-size"]],
    ["Line height", x["line-height"]],
    ["Corner radius", x["border-radius"]],
    ["Border width", x["border-top-width"]],
    ["Gap between children", x.gap && x.gap !== "normal" ? x.gap : null],
    ["Height at one line of text", `${x.height}px`],
    ...Object.entries(extra)
  ].filter(([, v]) => v && v !== "0px" && v !== "none");
  return [
    "| Property | Value |",
    "| --- | --- |",
    ...rows.map(([k, v]) => `| ${k} | ${v} |`)
  ].join("\n");
};

/** A component's variants, in the four ways one can exist. */
const variants = (rows) =>
  [
    "| Variant | How | Comes from |",
    "| --- | --- | --- |",
    ...rows.map(
      ([variant, how, source]) => `| ${variant} | ${how} | ${source} |`
    )
  ].join("\n");

const components = `
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
- **HTML** — a native attribute (\`open\`, \`disabled\`, \`checked\`,
  \`aria-invalid\`, \`name\`, \`closedby\`). A state in Figma, not a class.
- **author CSS** — a recipe the library deliberately does not ship. Skip it
  unless the project asks for it; it is one or two declarations of someone's own.

One rule runs through all of them: a **color class alone never paints**. It only
sets variables, so it needs a style class beside it. The two exceptions are
noted where they occur — a checked checkbox, radio or switch reads the color
variable directly, and so does the focus ring.

### 4.1 Button — \`pui-btn\`

A horizontal row: optional icon, label, optional icon. Centered on both axes.

${size("m-btn")}

- Used on a \`<button>\` or a link. The text is never underlined and never wraps.
- Add the full radius for a pill: 9999px instead of ${m("m-btn")["border-radius"]}.
- Disabled is the same shape at 50% opacity.

**Variants.**

${variants([
  [
    "Any of the 28 style and color pairs",
    "a style class and a color class",
    "composition"
  ],
  ["Pill", "add `pui-rounded-full`", "class"],
  ["Radius put back inside a group", "add `pui-rounded`", "class"],
  ["Disabled", "the `disabled` attribute", "HTML"],
  [
    "With an icon",
    "any element beside the label; the 4px gap spaces it",
    "shape"
  ],
  ["A link that looks like a button", "the same classes on an `<a>`", "shape"],
  ["Joined with its neighbours", "wrap them in a group (4.16)", "class"]
])}

### 4.2 Chip — \`pui-chip\`

One step smaller than a button. Same shape, less horizontal padding.

${size("m-chip")}

**Variants.**

${variants([
  [
    "Any of the 28 style and color pairs",
    "a style class and a color class",
    "composition"
  ],
  ["Pill", "add `pui-rounded-full`", "class"],
  ["Clickable", "put the classes on a `<button>`", "shape"],
  [
    "With a remove button",
    "a `<button>` inside the chip; the gap spaces it",
    "shape"
  ]
])}

### 4.3 Badge — \`pui-badge\`

The smallest of the three. Used for counts and short statuses.

${size("m-badge")}

**Variants.**

${variants([
  [
    "Any of the 28 style and color pairs",
    "a style class and a color class",
    "composition"
  ],
  ["Pill, for a count", "add `pui-rounded-full`", "class"],
  [
    "Inside another component",
    "drop it into a button, a list item or a table cell",
    "shape"
  ]
])}

### 4.4 Card — \`pui-card\`, \`pui-card-header\`, \`pui-card-content\`

A surface with its own border and background — it does not need a color class.

**Anatomy:** frame → optional header band → content area.

| Part | Property | Value |
| --- | --- | --- |
| Frame | Corner radius | ${m("m-card")["border-radius"]} |
| Frame | Border | ${m("m-card")["border-top-width"]} solid, border token |
| Frame | Background | Page background token |
| Header | Padding | ${pad("m-card-header")} |
| Header | Background | Muted background token |
| Header | Text color | Muted text token |
| Content | Padding | ${pad("m-card-content")} |
| Content | Gap between children | ${m("m-card-content").gap} |

The content area stacks its children vertically with that gap, so items inside a
card need no margins of their own.

**Variants.**

${variants([
  [
    "Plain surface",
    "nothing — the card already carries a border and a background",
    "shape"
  ],
  ["Without the header band", "leave out the header element", "shape"],
  [
    "Recolored",
    "a style class and a color class on the card itself",
    "composition"
  ],
  ["As a modal's surface", "put the card inside the dialog (4.8)", "shape"],
  [
    "With a table or list flush inside",
    "put it straight in the card, with no content wrapper",
    "shape"
  ]
])}

### 4.5 List — \`pui-list\`, \`pui-list-item\`

**Anatomy:** container → items.

| Part | Property | Value |
| --- | --- | --- |
| Container | Padding and margin | 0 |
| Container | Font size | ${m("m-list")["font-size"]} |
| Item | Padding | ${pad("m-list-item")} |
| Item | Corner radius | ${m("m-list-item")["border-radius"]} |
| Item | Border | ${m("m-list-item")["border-top-width"]}, transparent until a style class paints it |

Two optional behaviours: striped, where even items take the muted background
token, and hoverable, where the hovered item does.

**Variants.**

${variants([
  ["Striped", "add `pui-striped` to the list", "class"],
  ["Hoverable", "add `pui-hoverable` to the list", "class"],
  ["Selected item", "`pui-soft` and a color class on that item", "composition"],
  ["Bordered item", "`pui-outline pui-surface` on that item", "composition"],
  ["No bullets", "`list-style: none`", "author CSS"],
  ["As a dropdown menu", "put the list inside the panel (4.9)", "shape"]
])}

### 4.6 Table — \`pui-table\`

**Anatomy:** header row → body rows → optional footer row. Cells carry no class.

| Part | Property | Value |
| --- | --- | --- |
| Cell | Padding | ${pad("m-td")} |
| Cell | Border below | ${m("m-td")["border-bottom-width"]} solid, border token |
| Cell | Text alignment | Start |
| Header cell | Font weight | ${m("m-th")["font-weight"]} |
| Header cell | Text color | Muted text token |
| Footer | Background | Muted background token |
| Footer | Border above | ${m("m-tf")["border-top-width"]} solid, border token |
| Last row | Border below | none |

The last row of the table draws no rule, which is what lets a table sit flush
inside a card.

**Variants.**

${variants([
  [
    "Striped",
    "add `pui-striped` to the table; even body rows take the muted background",
    "class"
  ],
  ["Hoverable", "add `pui-hoverable` to the table", "class"],
  ["Summary band at the bottom", "add a `<tfoot>`", "HTML"],
  ["Colored row", "a style class and a color class on the row", "composition"],
  ["Flush inside a card", "put the table straight in the card", "shape"],
  ["Grid lines on every cell", "a border on each cell", "author CSS"],
  ["No rules at all", "`border: none` on the cells", "author CSS"],
  ["Compact rows", "a smaller block padding on the cells", "author CSS"],
  [
    "Scrolls sideways on a narrow screen",
    "`overflow-x: auto` on the parent",
    "author CSS"
  ]
])}

### 4.7 Accordion — \`pui-accordion\`, \`pui-accordion-item\`

**Anatomy:** container → items, each an interactive summary row and a panel.
Consecutive items form **one block**: they share the line between them and only
the two ends of the block stay round. A lone item keeps all four corners,
because it is both the first child and the last.

| Part | Property | Value |
| --- | --- | --- |
| Container | Space between items | ${m("m-acc-item2")["margin-block-start"]} — they overlap by one border width, so two borders read as one line |
| Item | Border | ${m("m-acc-item")["border-top-width"]} solid, border token |
| Item | Corner radius | ${m("m-btn")["border-radius"]} at the two ends of the block, squared where two items meet |
| Summary | Padding | ${pad("m-summary")} |
| Summary | Layout | Label at the start, chevron at the end |
| Summary | Corner radius | Its item's, less one border width (${m("m-summary")["border-radius"]} where the item is round) |
| Panel | Padding | ${pad("m-acc-panel")} |
| Item, open | Background | None, or the muted background token with the marked variant |

Marking the open item is optional — it is one variant of the container, and it
paints the whole expanded item, summary and panel, with the muted background
token. The chevron is a solid triangle pointing down, ${marks.chevron.width}px wide and ${marks.chevron.height}px tall, in the current text
color. It rotates 180° when the item opens, around its own center.

**Variants.**

${variants([
  [
    "Bordered",
    "the default — every item carries a 1px border in the border token",
    "shape"
  ],
  [
    "Borderless",
    "`border: none` on the item; the library ships no class for it",
    "author CSS"
  ],
  [
    "Joined into one block",
    "add `pui-group-col` to the container: the items lose the 4px gap, share their borders and keep only the outer corners",
    "class"
  ],
  [
    "Marked open item",
    "add `pui-highlighted` to the container: the expanded item, summary and panel, takes the muted background",
    "class"
  ],
  ["One open at a time", "the same `name` on every `<details>`", "HTML"],
  ["Open on load", "the `open` attribute", "HTML"],
  [
    "Recolored",
    "a style class and a color class **on the item**. A color class alone does not reach the border: the item reads the border token, and only a style class repaints it",
    "composition"
  ],
  [
    "Your own icon",
    "an element with `pui-accordion-icon` inside the summary; the drawn chevron steps aside and the rotation stays",
    "class"
  ],
  ["Nested", "another accordion inside a panel", "shape"]
])}

### 4.8 Modal — \`pui-modal\`

**Anatomy:** dimmed backdrop → centered dialog → a card inside it.

| Part | Property | Value |
| --- | --- | --- |
| Backdrop | Fill | Black at 50% |
| Dialog | Maximum width | 512px, or the viewport minus 32px |
| Dialog | Maximum height | Viewport minus 32px |
| Dialog | Padding, border, background | none — the card inside provides all three |
| Dialog | Position | Centered on both axes |

**Variants.**


**Variants.**

${variants([
  [
    "Light dismiss",
    '`closedby="any"` — click the backdrop or press Escape',
    "HTML"
  ],
  [
    "Static backdrop",
    "leave `closedby` out; only a close button dismisses it",
    "HTML"
  ],
  [
    "Opened and closed without script",
    "`commandfor` and `command` on the buttons",
    "HTML"
  ],
  [
    "Long content",
    "the dialog scrolls at the viewport height; the card inside does not",
    "shape"
  ],
  [
    "Moving between two modals",
    "close the current one on the same click that opens the next",
    "author CSS"
  ]
])}

### 4.9 Dropdown — \`pui-dropdown\`

A panel anchored to the control that opens it.

${size("m-dropdown", { Background: "Page background token", Border: `${m("m-dropdown")["border-top-width"]} solid, border token`, "Minimum width": "The width of its trigger", "Distance from the trigger": "4px" })}

Placement: below the trigger and aligned to its starting edge by default; above,
before or after it on request; aligned centered or to the end on request. It
flips to the opposite side when the preferred one does not fit.

**Variants.**

${variants([
  ["Below, aligned to the start", "the default", "shape"],
  ["Above, before, after", "`pui-top`, `pui-start`, `pui-end`", "class"],
  [
    "Centered or end-aligned on the other axis",
    "`pui-align-center`, `pui-align-end`",
    "class"
  ],
  ["Recolored", "a style class and a color class on the panel", "composition"],
  ["A menu", "a list inside the panel (4.5)", "shape"],
  [
    "Closes on a click inside",
    'a button with `popovertarget` and `popovertargetaction="hide"`',
    "HTML"
  ]
])}

### 4.10 Tooltip — \`pui-tooltip\`

${size("m-tooltip", { Background: "Page background token", Border: `${m("m-tooltip")["border-top-width"]} solid, border token`, "Maximum width": "320px", "Distance from the trigger": "4px" })}

Placement: above the trigger and centered on it by default; below, before or
after it on request. Same flipping rule as the dropdown.

**Variants.**

${variants([
  ["Above, centered", "the default", "shape"],
  ["Below, before, after", "`pui-bottom`, `pui-start`, `pui-end`", "class"],
  ["Dark, v0's black tooltip", "`pui-solid pui-inverse`", "composition"],
  [
    "Any other style and color pair",
    "a style class and a color class",
    "composition"
  ],
  ["On any element", "`interestfor` pointing at it", "HTML"]
])}

### 4.11 Field group — \`pui-field-group\`

**Anatomy:** label → control → message, stacked.

| Part | Property | Value |
| --- | --- | --- |
| Group | Gap between parts | ${m("m-field").gap} |
| Label | Font size | ${m("m-field-label")["font-size"]} |
| Message | Font size | ${m("m-field-msg")["font-size"]} |
| Message | Text color | Muted text token, or the error token when the field is invalid |

**Variants.**


**Variants.**

${variants([
  ["With a message", "a `<small>` after the control", "shape"],
  [
    "Without a label or message",
    "leave the element out; the group only spaces what is there",
    "shape"
  ],
  [
    "Invalid",
    '`aria-invalid="true"` on the control: its border, and the message, turn to the error token',
    "HTML"
  ],
  [
    "Around any control",
    "an input, a textarea, a select, a checkbox or an input group",
    "shape"
  ]
])}

### 4.12 Input — \`pui-input\`

Covers the text field, the textarea and the select.

${size("m-input", { Background: "Transparent", Border: `${m("m-input")["border-top-width"]} solid, border token — the error token when invalid`, "Placeholder color": "Muted text token" })}

A select adds a downward triangle in the current text color at the end,
${marks.arrow.size.replace(" ", " by ")}, 12px from the edge, with the padding on that
side raised to ${marks.arrow.padding}. It is drawn as an image rather than from borders,
which is why it keeps a fraction of a pixel where the accordion's chevron is
rounded to whole ones.

**Variants.**

${variants([
  ["Text field", "any `<input>` type", "shape"],
  ["Textarea", "a `<textarea>`, which also grows vertically", "shape"],
  ["Select", "a `<select>`, which adds the arrow and the end padding", "shape"],
  [
    "Invalid",
    '`aria-invalid="true"`: the border takes the error token',
    "HTML"
  ],
  ["Disabled", "the `disabled` attribute: 50% opacity", "HTML"],
  [
    "Full width",
    "`width: 100%`; the control does not stretch on its own",
    "author CSS"
  ]
])}

### 4.13 Input group — \`pui-input-group\`, \`pui-addon\`

A control and one or more addons fused into a single field.

| Part | Property | Value |
| --- | --- | --- |
| Group | Border | ${m("m-input")["border-top-width"]} solid, border token |
| Group | Corner radius | ${m("m-input")["border-radius"]} |
| Children | Border and radius | None, except the outer corners of the first and last child, which take ${m("m-summary")["border-radius"]} |
| Addon | Horizontal padding | ${m("m-addon")["padding-left"]} |
| Addon | Background | Muted background token |
| Addon | Text color | Muted text token |
| Addon | Border facing the control | ${m("m-input")["border-top-width"]} solid, border token |

**Variants.**


**Variants.**

${variants([
  [
    "Addon before, after, or both",
    "put the addon on either side of the control, or one on each",
    "shape"
  ],
  [
    "With a button instead of an addon",
    "a button as the last child; it keeps its own colors and its own focus ring",
    "shape"
  ],
  ["Invalid", '`aria-invalid="true"` on the control inside', "HTML"],
  [
    "Inside a field group",
    "the group takes a label and a message like any control",
    "shape"
  ]
])}

### 4.14 Checkbox, radio and switch — \`pui-checkbox\`, \`pui-radio\`, \`pui-switch\`

| Control | Width | Height | Radius | Checked mark |
| --- | --- | --- | --- | --- |
| Checkbox | ${m("m-checkbox").width}px | ${m("m-checkbox").height}px | ${m("m-checkbox")["border-radius"]} | White check, ${mark("m-checkbox")} |
| Checkbox, indeterminate | ${m("m-checkbox").width}px | ${m("m-checkbox").height}px | ${m("m-checkbox")["border-radius"]} | White bar, ${mark("m-indeterminate")} |
| Radio | ${m("m-radio").width}px | ${m("m-radio").height}px | Full | White dot, ${mark("m-radio")} |
| Switch | ${m("m-switch").width}px | ${m("m-switch").height}px | Full | White knob, ${mark("m-switch")} |

Unchecked: transparent fill, ${m("m-checkbox")["border-top-width"]} border in the border token. The switch shows its
knob in the border token at the start. Checked: the fill and the border both take
the element's color, defaulting to the theme color.

**Variants.**

${variants([
  ["Checked", "the `checked` attribute", "HTML"],
  ["Indeterminate, checkbox only", "the `indeterminate` attribute", "HTML"],
  ["Disabled", "the `disabled` attribute: 50% opacity", "HTML"],
  [
    "Colored",
    "**a color class on its own is enough here** — a checked control reads the color variable directly, so `pui-success` turns it green with no style class. This is the one place where that works",
    "composition"
  ],
  ["With a label and a message", "wrap it in a field group (4.11)", "shape"]
])}

### 4.15 Timeline — \`pui-timeline\`, \`pui-checkpoint\`, \`pui-checkpoint-icon\`

**Anatomy:** a vertical stack of checkpoints. Each one is an icon and its
content side by side, and draws the rule that connects it to the next.

| Part | Property | Value |
| --- | --- | --- |
| Checkpoint | Gap between icon and content | ${m("m-checkpoint").gap} |
| Checkpoint | Space below | 16px, and none on the last one |
| Icon | Width and height | ${m("m-cp-icon").width}px |
| Icon | Corner radius | Full |
| Icon | Font size | ${m("m-cp-icon")["font-size"]} |
| Icon | Border | ${m("m-cp-icon")["border-top-width"]}, colored by its style class |
| Rule | Width | ${m("m-cp-icon")["border-top-width"]}, in the border token |
| Rule | Position | Centered on the icon, ${Math.round(parseFloat(m("m-cp-icon").width) / 2)}px from the starting edge |
| Rule | Runs from | 4px below the icon to 4px above the next one |

The last checkpoint has no space below it and draws no rule. The icon is an
ordinary colored element: it takes a style and a color like a badge does.

Combined with a row group, the same structure lays out horizontally: the icon
sits above its content and the rule runs across instead of down.

**Variants.**

${variants([
  ["Vertical", "the default", "shape"],
  ["Horizontal", "add `pui-group-row` to the timeline", "class"],
  [
    "Colored checkpoint",
    "a style class and a color class on the icon, as on a badge",
    "composition"
  ],
  [
    "An icon instead of text",
    "anything inside the icon element; it centers its content",
    "shape"
  ]
])}

### 4.16 Group — \`pui-group-row\`, \`pui-group-col\`, \`pui-group-responsive\`

Joins neighbouring elements into one control.

| Property | Value |
| --- | --- |
| Overlap between children | ${m("m-group-second")["margin-inline-start"]} — one border width, so two borders read as one line |
| Inner corners | Squared |
| Outer corners | The default radius, on the first and last child only |
| Direction | Row or column; the responsive variant is a row above 1024px and a column below |

**Variants.**


**Variants.**

${variants([
  ["Row", "`pui-group-row`", "class"],
  ["Column", "`pui-group-col`", "class"],
  ["Row above 1024px, column below", "`pui-group-responsive`", "class"],
  [
    "One child detached again",
    "`pui-rounded` on that child puts its radius back",
    "class"
  ],
  [
    "Any components mixed",
    "buttons, inputs, addons and selects share the same joining rules",
    "shape"
  ]
])}

### 4.17 Float — \`pui-float\`

A single element pinned 24px — six spacing units — from the bottom and starting
edge of the viewport.

**Variants.**

${variants([
  ["Bottom start", "the default", "shape"],
  [
    "Any other corner",
    "one `inset-block` or `inset-inline` declaration",
    "author CSS"
  ],
  [
    "Around any element",
    "a button, a card, a group — the class only positions",
    "shape"
  ]
])}
`;

/* The three ratios section 7 quotes. Measured colors in, WCAG's own formula
   out, so the sentence cannot drift from the palette. */
const contrast = (a, b) => {
  const luminance = (hex) => {
    const channel = (i) => {
      const v = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
};

const solidRatios = ["theme", "success", "warn"].map((role) => {
  const c = combos.light[`solid/${role}`].rest;
  return {
    role,
    value: contrast(c["background-color"].hex, c.color.hex).toFixed(2)
  };
});

/* --- states and figma notes ------------------------------------------------ */

/* --- figma variables -------------------------------------------------------
   Every value here is one the browser already measured, addressed by a name a
   design tool can create mechanically. The five slots per role are the same
   five for all seven roles, so no role needs an exception. */

const ROLES = [
  "theme",
  "success",
  "error",
  "warn",
  "muted",
  "surface",
  "inverse"
];

const SLOT = {
  fill: (mode, role) => combos[mode][`solid/${role}`].rest["background-color"],
  "on-fill": (mode, role) => combos[mode][`solid/${role}`].rest.color,
  "fill-hover": (mode, role) =>
    combos[mode][`solid/${role}`].hover["background-color"],
  edge: (mode, role) => combos[mode][`solid/${role}`].rest["border-top-color"],
  ink: (mode, role) => combos[mode][`link/${role}`].rest.color
};

const PAGE = {
  "page/bg": "bg",
  "page/bg-muted": "bg-muted",
  "page/bg-emphasis": "bg-emphasis",
  "page/text": "text",
  "page/text-muted": "text-muted",
  "page/border": "border"
};

const PAGE_USE = {
  "page/bg": "Page, card and overlay background",
  "page/bg-muted": "Card header, table footer, addon, stripe, hovered row",
  "page/bg-emphasis": "Nothing in the library — yours to use",
  "page/text": "Body text",
  "page/text-muted": "Label, help message, table header, card header",
  "page/border": "Every border that carries no role color"
};

const pageVariables = () =>
  [
    "| Variable | Light | Dark | Used for |",
    "| --- | --- | --- | --- |",
    ...Object.entries(PAGE).map(
      ([name, token]) =>
        `| \`${name}\` | ${hexOf(palette.light[token])} | ${hexOf(palette.dark[token])} | ${PAGE_USE[name]} |`
    )
  ].join("\n");

const roleVariables = () =>
  [
    "| Variable | Light | Dark |",
    "| --- | --- | --- |",
    ...ROLES.flatMap((role) =>
      Object.entries(SLOT).map(
        ([slot, read]) =>
          `| \`${role}/${slot}\` | ${hexOf(read("light", role))} | ${hexOf(read("dark", role))} |`
      )
    )
  ].join("\n");

const states = `
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
five facts, and naming them is where a file ends up with \`theme/accent\` beside
\`success/deepened\`.

### 6.1 One collection, two modes

Name the collection \`pui\` and its modes \`light\` and \`dark\`. Six variables
describe the page.

${pageVariables()}

Each of the seven roles gets the same five variables. Five slots for every
role means a component never needs a special case.

| Slot | What it paints |
| --- | --- |
| \`<role>/fill\` | Solid background, and a checked control |
| \`<role>/on-fill\` | The label sitting on that fill |
| \`<role>/fill-hover\` | The solid background under the pointer |
| \`<role>/edge\` | The border, for solid and outline |
| \`<role>/ink\` | The text of soft, outline and link |

${roleVariables()}

Number variables, named after the value they hold in pixels, because the
library has no semantic size scale to borrow names from — a spacing is always
the 4px unit times something:

| Group | Variables |
| --- | --- |
| \`space/\` | 2, 4, 5, 6, 7, 8, 10, 12, 16, 24, 28, 32 |
| \`radius/\` | 3, 5, 6, 9, full (9999) |
| \`border/\` | 1 |

### 6.2 The four styles as variable references

This table replaces the 56 paint styles. A style is which slots an element
reads, and nothing else.

| Style | Fill | Fill opacity | Text | Border |
| --- | --- | --- | --- | --- |
| \`solid\` | \`<role>/fill\` | 100% | \`<role>/on-fill\` | \`<role>/edge\` |
| \`soft\` | \`<role>/fill\` | 15% | \`<role>/ink\` | none |
| \`outline\` | none | — | \`<role>/ink\` | \`<role>/edge\` |
| \`link\` | none | — | \`<role>/ink\` | none |

| Style | On hover |
| --- | --- |
| \`solid\` | Fill becomes \`<role>/fill-hover\` |
| \`soft\` | Same fill, opacity 15% → 22% |
| \`outline\` | Fill appears: \`<role>/fill\` at 10% |
| \`link\` | Text underlines, 5px below the baseline |

**A tint is an opacity, not a variable.** A soft fill is the role's own color at
15%, which is what the library does and what keeps it correct when the mode
changes. Section 3 lists what each tint flattens to over the page, for checking
your work — not for pasting in as a solid color.

### 6.3 Text styles

| Name | Size | Line height | Weight |
| --- | --- | --- | --- |
| \`text/body\` | ${m("m-btn")["font-size"]} | ${m("m-btn")["line-height"]} | inherited |
| \`text/small\` | ${m("m-badge")["font-size"]} | ${m("m-badge")["line-height"]} | inherited |
| \`text/strong\` | ${m("m-th")["font-size"]} | normal | ${m("m-th")["font-weight"]} |

### 6.4 Components

One component per shape in section 4, with two variant properties:

- \`style\`: solid, soft, outline, link
- \`color\`: theme, success, error, warn, muted, surface, inverse

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
| \`base/*\` | \`page/*\` |
| \`<role>/accent\`, \`<role>/hover\` | \`<role>/fill-hover\` |
| \`<role>/deepened\`, \`<role>/dark\` | \`<role>/ink\` |
| \`<role>/soft\`, \`<role>/subtle\` | Delete it — \`<role>/fill\` at 15% opacity |
| \`<role>/text\`, \`<role>/contrast\` | \`<role>/on-fill\` if it sits on the fill, \`<role>/ink\` if it sits on the page |

Every role carries all five slots, including the ones a generated file tends to
leave out: \`surface\` and \`inverse\` are roles like any other, and \`on-fill\` and
\`edge\` exist for all seven.
`;

const figma = `
## 7. Two things worth knowing

**\`pui-soft pui-surface\` has nothing to paint.** It tints the page background
over the page background. Use the muted role for a neutral fill instead. The
tables include it for completeness, which is why its fill equals its background.

**Light mode trades some contrast for the palette.** Against its white label, a
solid fill reaches ${solidRatios.map((r) => `${r.value}:1 for ${r.role}`).join(", ")} — above the 3:1 floor for
interface elements, below the 4.5:1 that WCAG AA asks of text. This is
deliberate, and the same call covers the white check, dot and knob on a control
filled with its own color. Every text use, every hover and the whole of dark
mode stay at or above 4.5:1.
`;

const out = doc + components + states + figma;
writeFileSync("DESIGN-SYSTEM.md", out);
console.log(
  "wrote DESIGN-SYSTEM.md —",
  out.split("\n").length,
  "lines,",
  out.length,
  "bytes"
);
