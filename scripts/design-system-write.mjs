/** Turns the measurements into DESIGN-SYSTEM.md. See design-system.mjs. */
import { readFileSync, writeFileSync } from "node:fs";

const { metrics, palette, combos } = JSON.parse(
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
  "bg-emphasis": "A third level, used for the accordion summary on hover",
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
> \`scripts/design-system.mjs\`, which measures the real components in a browser.
> If a value here disagrees with the library, the library is right and this file
> is stale — regenerate it with \`bun run design-system\`.

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

### 1.4 Typography

The library sets no font family: it inherits from the page. Only sizes and
weights are specified.

| Role | Size | Weight | Line height | Used by |
| --- | --- | --- | --- | --- |
| Body | ${m("m-btn")["font-size"]} | 400 | ${m("m-btn")["line-height"]} | Buttons, chips, inputs, list items, table cells, card content |
| Small | ${m("m-badge")["font-size"]} | 400 | ${m("m-badge")["line-height"]} | Badges, tooltips, field labels and messages |
| Table header | ${m("m-th")["font-size"]} | ${m("m-th")["font-weight"]} | ${m("m-th")["line-height"]} | Column headers |

### 1.5 Radii

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

const components = `
## 4. Components

Each one is a shape. Unless stated otherwise it carries no color of its own and
takes a style and a color class from section 3.

### 4.1 Button

A horizontal row: optional icon, label, optional icon. Centered on both axes.

${size("m-btn")}

- Used on a \`<button>\` or a link. The text is never underlined and never wraps.
- Add the full radius for a pill: 9999px instead of ${m("m-btn")["border-radius"]}.
- Disabled is the same shape at 50% opacity.

### 4.2 Chip

One step smaller than a button. Same shape, less horizontal padding.

${size("m-chip")}

### 4.3 Badge

The smallest of the three. Used for counts and short statuses.

${size("m-badge")}

### 4.4 Card

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

### 4.5 List

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

### 4.6 Table

**Anatomy:** header row → body rows → optional footer row. Cells carry no class.

| Part | Property | Value |
| --- | --- | --- |
| Cell | Padding | ${pad("m-td")} |
| Cell | Border below | ${m("m-td")["border-top-width"]} solid, border token |
| Cell | Text alignment | Start |
| Header cell | Font weight | ${m("m-th")["font-weight"]} |
| Header cell | Text color | Muted text token |
| Footer | Background | Muted background token |
| Footer | Border above | ${m("m-tf")["border-top-width"]} solid, border token |
| Last row | Border below | none |

The last row of the table draws no rule, which is what lets a table sit flush
inside a card.

### 4.7 Accordion

**Anatomy:** container → items, each an interactive summary row and a panel.

| Part | Property | Value |
| --- | --- | --- |
| Container | Gap between items | ${m("m-accordion").gap} |
| Item | Border | ${m("m-acc-item")["border-top-width"]} solid, border token |
| Item | Corner radius | ${m("m-acc-item")["border-radius"]} |
| Summary | Padding | ${pad("m-summary")} |
| Summary | Layout | Label at the start, chevron at the end |
| Summary | Corner radius | ${m("m-summary")["border-radius"]} (one border width less than the item) |
| Panel | Padding | ${pad("m-acc-panel")} |

The chevron is a solid triangle pointing down, ${Math.round(parseFloat(m("m-btn")["font-size"]) * 0.6)}px wide and ${Math.round(parseFloat(m("m-btn")["font-size"]) * 0.3)}px tall, in the current text
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

${size("m-dropdown", { Background: "Page background token", Border: `${m("m-dropdown")["border-top-width"]} solid, border token`, "Minimum width": "The width of its trigger", "Distance from the trigger": "4px" })}

Placement: below the trigger and aligned to its starting edge by default; above,
before or after it on request; aligned centered or to the end on request. It
flips to the opposite side when the preferred one does not fit.

### 4.10 Tooltip

${size("m-tooltip", { Background: "Page background token", Border: `${m("m-tooltip")["border-top-width"]} solid, border token`, "Maximum width": "320px", "Distance from the trigger": "4px" })}

Placement: above the trigger and centered on it by default; below, before or
after it on request. Same flipping rule as the dropdown.

### 4.11 Field group

**Anatomy:** label → control → message, stacked.

| Part | Property | Value |
| --- | --- | --- |
| Group | Gap between parts | ${m("m-field").gap} |
| Label | Font size | ${m("m-field-label")["font-size"]} |
| Message | Font size | ${m("m-field-msg")["font-size"]} |
| Message | Text color | Muted text token, or the error token when the field is invalid |

### 4.12 Input

Covers the text field, the textarea and the select.

${size("m-input", { Background: "Transparent", Border: `${m("m-input")["border-top-width"]} solid, border token — the error token when invalid`, "Placeholder color": "Muted text token" })}

A select adds a downward triangle in the current text color at the end,
${Math.round(parseFloat(m("m-btn")["font-size"]) * 0.6)}px by ${Math.round(parseFloat(m("m-btn")["font-size"]) * 0.3)}px, 12px from the edge, with the padding on that side raised to 28px.

### 4.13 Input group

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

### 4.14 Checkbox, radio and switch

| Control | Width | Height | Radius | Checked mark |
| --- | --- | --- | --- | --- |
| Checkbox | ${m("m-checkbox").width}px | ${m("m-checkbox").height}px | ${m("m-checkbox")["border-radius"]} | White check |
| Checkbox, indeterminate | ${m("m-checkbox").width}px | ${m("m-checkbox").height}px | ${m("m-checkbox")["border-radius"]} | White bar, 55% of the width |
| Radio | ${m("m-radio").width}px | ${m("m-radio").height}px | Full | White dot, 34% of the width |
| Switch | ${m("m-switch").width}px | ${m("m-switch").height}px | Full | White knob at the end, 42% of the height as a radius |

Unchecked: transparent fill, ${m("m-checkbox")["border-top-width"]} border in the border token. The switch shows its
knob in the border token at the start. Checked: the fill and the border both take
the element's color, defaulting to the theme color.

### 4.15 Timeline

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

### 4.16 Group

Joins neighbouring elements into one control.

| Property | Value |
| --- | --- |
| Overlap between children | ${m("m-group-second")["margin-left"] ?? "-1px"} — one border width, so two borders read as one line |
| Inner corners | Squared |
| Outer corners | The default radius, on the first and last child only |
| Direction | Row or column; the responsive variant is a row above 1024px and a column below |

### 4.17 Float

A single element pinned 24px — six spacing units — from the bottom and starting
edge of the viewport.
`;

/* --- states and figma notes ------------------------------------------------ */

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

**Variables.** One collection, two modes named light and dark, holding the
eleven color tokens from section 1.1. Four number variables for the base values.
Everything else is derived, so do not make a variable for it: a hover tone or a
soft tint is a value this document already resolved.

**Components.** One component per shape, with two variant properties:

- \`style\`: solid, soft, outline, link
- \`color\`: theme, success, error, warn, muted, surface, inverse

That is 28 variants for a button, and the same 28 for a chip and a badge. Every
one of them is in the tables in section 3, for both modes.

**States.** Hover, focus and disabled belong as a third property or as
interactive states, not as separate components.

**Auto layout.** Every shape here is a horizontal or vertical stack with the
padding and gap given in section 4. Nothing uses absolute positioning except the
overlays, which are anchored to their trigger.

**What not to build.** There is no size scale: a smaller button is a chip, and a
smaller chip is a badge. There is no color scale either — no 100 to 900 ramp.
Each role is one value per mode, and every other tone is derived from it.
`;

const figma = `
## 7. Two things worth knowing

**\`pui-soft pui-surface\` has nothing to paint.** It tints the page background
over the page background. Use the muted role for a neutral fill instead. The
tables include it for completeness, which is why its fill equals its background.

**Light mode trades some contrast for the palette.** A solid theme, success or
warn fill against its white label sits between 3.2:1 and 3.5:1 — above the 3:1
floor for interface elements, below the 4.5:1 that WCAG AA asks of text. This is
deliberate. Text styles and the whole of dark mode stay at or above 4.5:1.
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
