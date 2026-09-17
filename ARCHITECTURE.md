# Perfect UI — Architecture (v1)

> **Audience:** AI coding agents and contributors.
> **Status:** Accepted — migration from `0.23.0` (SCSS) to `1.0.0` (native CSS).
> **Rule for agents:** Read this whole file before changing code. If a task conflicts with a **Hard rule**, stop and ask the maintainer. If something is not covered here, ask — do not guess.

---

## 1. Goal

Perfect UI provides **the bare minimum to build applications**, while being **lightweight** and **customizable**.

- It ships only what it uses. Nothing "just in case".
- It does **not** depend on Tailwind CSS. Tailwind is an optional complement for layout, breakpoints, typography, etc. Perfect UI never ships layout utilities.
- It uses **native web platform features only**. No runtime dependencies.

---

## 2. Hard rules (never break)

1. **Zero runtime dependencies.** Dev dependencies are fine (Vite, Playwright, ESLint, TypeScript).
2. **Native CSS only.** No Sass/SCSS/Less/PostCSS plugins that change syntax. Native nesting is allowed.
3. **Every class is prefixed `pui-`.** Every custom property is prefixed `--pui-`. Every data attribute is prefixed `data-pui-` (exception: `indeterminate`, see §8.3).
4. **All library CSS lives inside `@layer pui.*`.** Never use `!important`.
5. **No global element styles** (`body`, `ul`, `a`, `hr`, `*`…). Style only `pui-` classes. No CSS reset.
6. **No font imports.** Components inherit `font-family` from the user.
7. **HTML API = native HTML API.** Users write standard HTML (`popover`, `commandfor`, `<dialog closedby>`, `<details name>`). JS only emulates native behavior when missing (§8).
8. **JS never runs on import in a way that breaks SSR.** Always guard `typeof document !== "undefined"`.
9. **No DOM scanning / re-initialization.** No `MutationObserver`, no `loadFunctions()`. Use event delegation on `document`.
10. **Modern browsers only.** Target: Baseline "widely available" plus features listed in §9 with a JS fallback.
11. **One size per component.** No size modifiers (`sm`, `lg`). Different size = different component (e.g. `pui-btn` > `pui-chip` > `pui-badge`).
12. **Library output must stay small.** Every PR reports gzip size of `dist/` (see §11).

---

## 3. Composition model ("Lego")

Every visual element is built from **3 independent pieces**:

| Piece                 | Responsibility                                             | Examples                                                                                       |
| --------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Shape** (component) | Size, spacing, radius, layout of its parts. **No colors.** | `pui-btn`, `pui-chip`, `pui-badge`, `pui-card`                                                 |
| **Style**             | _How_ color is applied (fill, soft fill, border, text).    | `pui-solid`, `pui-soft`, `pui-outline`, `pui-link`                                             |
| **Color**             | _Which_ color. Only sets variables.                        | `pui-theme`, `pui-success`, `pui-error`, `pui-warn`, `pui-muted`, `pui-surface`, `pui-inverse` |

```html
<button class="pui-btn pui-solid pui-theme">Save</button>
<span class="pui-chip pui-soft pui-success">Active</span>
<span class="pui-badge pui-solid pui-error">3</span>
<button class="pui-btn pui-solid pui-surface">Cancel</button>
<!-- old style-white -->
<button class="pui-btn pui-solid pui-inverse">Continue</button>
<!-- old style-black -->
```

### 3.1 The contract between pieces

Color classes **only set these variables**. Style classes **only read them**.
The implementation lives in `src/css/colors.css` and `src/css/styles.css`.

| Variable         | Set by                   | Meaning                                                                                                        |
| ---------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `--pui-color`    | every color class        | Main color of the element                                                                                      |
| `--pui-on-color` | every color class        | Text/icon color placed on top of `--pui-color`                                                                 |
| `--pui-edge`     | optional (`pui-surface`) | Border color. Defaults to `--pui-color`                                                                        |
| `--pui-ink`      | optional (`pui-surface`) | Text color when the color is _not_ the fill (soft, outline, link). Defaults to `--pui-color` deepened one step |
| `--pui-shade`    | optional (`pui-inverse`) | Color that hover and ink blend toward. Defaults to `--pui-text`                                                |

The last two exist because two color classes are defined _in terms of the page_:
`pui-surface` is the background and `pui-inverse` is the text color. Without
them, `pui-surface` would paint text with the page background (invisible) and
`pui-inverse` would shade toward the color it already is (a no-op on hover).
Every other color class is one line, as intended.

**Derivations.** Nothing is hardcoded per color:

- hover blends `--pui-color` toward `--pui-shade`, which always moves _away_
  from `--pui-on-color`, so contrast can only rise;
- soft/outline/link deepen the color by one step for their text, so it stays
  readable on the tinted background of `pui-soft`.

Measured across 7 colors x 4 styles x hover in both modes, nothing drops below
4.5:1. Re-run that check when a token value changes.

**Combinations.** Composition is free, but two facts follow from the model and
belong in the docs rather than in code:

- `pui-soft pui-surface` is degenerate: a 15% tint of the page background over
  the page background is invisible. Use `pui-soft pui-muted` for a neutral fill.
  It is not documented as an option.
- `pui-solid pui-surface` and `pui-outline pui-surface` look identical on the
  page background, and only differ on top of another surface (inside a card, a
  modal, or a `pui-bg-muted` area).

**Adding a new color = one line in `pui.colors`.** Adding a new style = one rule in `pui.styles`. Never create combined classes like `pui-solid-theme`.

---

## 4. Design tokens

File: `src/css/tokens.css`. Semantic names only. No palettes (the old `--theme50…950`, `--gray*`, `--red*`, `--amber*`, `--green*` are removed).

```css
@layer pui.tokens {
  :root {
    color-scheme: light dark;

    /* backgrounds */
    --pui-bg: light-dark(#fff, #000); /* page */
    --pui-bg-muted: light-dark(…, …); /* cards, hover areas */
    --pui-bg-emphasis: light-dark(…, …); /* stronger third level */

    /* text */
    --pui-text: light-dark(#000, #fff);
    --pui-text-muted: light-dark(…, …);

    /* border */
    --pui-border: light-dark(…, …);

    /* states */
    --pui-theme: light-dark(…, …);
    --pui-success: light-dark(…, …);
    --pui-error: light-dark(…, …);
    --pui-warn: light-dark(…, …);
    --pui-muted: light-dark(…, …); /* old "secondary" (gray) */

    /* non-color: one base per concept */
    --pui-radius: 0.375rem;
    --pui-space: 0.25rem; /* base unit */
    --pui-font-size: 0.875rem; /* base text size */
    --pui-border-width: 1px;
  }
}
```

- Theming = user overrides these variables in their own CSS. **No JS theming API** (`setThemeColor` is removed).
- Hover/soft/focus shades are derived with `color-mix()`. Do not add tone variables.
- Values come from the v0 palette: tone `600` in light mode and `500` in dark (`muted` keeps `500`/`400`). `--pui-on-color` is always `--pui-bg`, so a solid fill carries a white label in light mode and a dark one in dark mode, exactly like `0.23.0`.
- **Known contrast trade-off.** In light mode, `pui-solid` with `theme` (3.50:1), `success` (3.30:1) and `warn` (3.19:1) sits above the 3:1 floor for interface elements but below WCAG AA's 4.5:1 for text. The same decision covers the white check, radio dot and switch knob, which are white on the control's own color for the same reason a solid button's label is: in dark mode that glyph lands at 2.34:1 on `theme`. Switching those controls to `accent-color` would hand the job to the platform and fix it, at the cost of the custom shape. This is a deliberate decision by the maintainer: the v0 appearance is worth more than the last step of contrast, and a project that needs AA overrides three tokens. Do not "fix" it by darkening the tokens. Everything else — every text use, every hover, and the whole dark mode — stays at or above 4.5:1.
- The readable text tone is **derived, not stored**: `pui.styles` moves the color 25% toward `--pui-text` before using it as text (§3.1), which is the minimum that keeps every color readable on the page and on the tint of `pui-soft`. That one derivation replaces v0's `contentTheme`, `contentError`, … variables.
- Naming rule: **semantic purpose**, never color names or numbers. Do not use `accent` (it means "brand color" in most systems).

### 4.1 Non-color tokens (base + `calc()`)

- Only **4** non-color tokens exist: `--pui-radius`, `--pui-space`, `--pui-font-size`, `--pui-border-width`.
- Components derive every size with `calc()` multipliers. Changing a base token rescales the whole library.
- **No size scales** (`xs/sm/md…`) and **no per-component variables** (`--pui-btn-padding`). Users adjust a single component with their own CSS (unlayered CSS wins).
- The old `--fontXS…--font9XL`, `--spacingXS…XL`, `--roundedFull` are removed. Use `9999px` for full radius.

Multipliers (**approved by the maintainer** after visual review in `pui-token-scale-test.html`). Do not change them without asking:

| Component                    | Padding (block · inline) | Font size    | Radius              |
| ---------------------------- | ------------------------ | ------------ | ------------------- |
| `pui-btn`                    | `space×2 · space×4`      | `font×1`     | `radius`            |
| `pui-chip`                   | `space×1 · space×3`      | `font×1`     | `radius`            |
| `pui-badge`                  | `space×0.5 · space×1.75` | `font×0.857` | `radius`            |
| `pui-input`                  | `space×1.5 · space×3`    | `font×1`     | `radius`            |
| `pui-tooltip`                | `space×1.25 · space×2.5` | `font×0.857` | `radius`            |
| `pui-card-header`            | `space×2 · space×4`      | `font×1`     | `radius×1.5` (card) |
| `pui-card-content`           | `space×4`                | `font×1`     | —                   |
| `pui-checkbox` / `pui-radio` | size `font×1.143`        | —            | `radius×0.5`        |

Rule: multipliers are the only "magic numbers" allowed inside components.

Components outside the approved table reuse its steps rather than inventing new ones: `pui-list-item` uses the `pui-btn` padding, `pui-table` cells use the same, `pui-card-content` gaps use `space x 3`. The timeline adds two of its own — icon `font x 1.75` (the v0 icon was 25px against a 14px base) and the rule offset at half that.

---

## 5. Cascade layers

Declared once, at the top of every entry CSS file (repeating the declaration is safe):

```css
@layer pui.tokens, pui.components, pui.utilities, pui.styles, pui.colors, pui.states;
```

| Layer            | Contains                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `pui.tokens`     | `:root` variables, `color-scheme`, mode rules                                             |
| `pui.components` | Shape classes (`pui-btn`, `pui-card`…)                                                    |
| `pui.utilities`  | Shape helpers (`pui-rounded`, `pui-rounded-full`)                                         |
| `pui.styles`     | `pui-solid`, `pui-soft`, `pui-outline`, `pui-link`                                        |
| `pui.colors`     | `pui-theme`, `pui-surface`… (variables only)                                              |
| `pui.states`     | `:disabled` / `[disabled]` (scoped to `pui-` classes only), `[aria-invalid]`, focus rings |

Any **unlayered** user CSS (including Tailwind utilities) wins over all of these without `!important`.

---

## 6. Components

All current components are kept. Shape classes only (colors come from §3).

| Group      | Component                 | Class(es)                                                | Native base                        | JS?                           |
| ---------- | ------------------------- | -------------------------------------------------------- | ---------------------------------- | ----------------------------- |
| Actions    | Button                    | `pui-btn`                                                | `<button>`                         | no                            |
| Actions    | Chip _(new)_              | `pui-chip`                                               | any                                | no                            |
| Display    | Badge                     | `pui-badge`                                              | any                                | no                            |
| Display    | Card                      | `pui-card`, `pui-card-header`, `pui-card-content`        | any                                | no                            |
| Display    | List                      | `pui-list`, `pui-list-item`                              | `<ul>/<ol>`                        | no                            |
| Display    | Table                     | `pui-table`                                              | `<table>`                          | no                            |
| Display    | Timeline                  | `pui-timeline`                                           | any                                | no                            |
| Layout     | Group                     | `pui-group-row`, `pui-group-col`, `pui-group-responsive` | any                                | no                            |
| Layout     | Float                     | `pui-float`                                              | any                                | no                            |
| Disclosure | Accordion                 | `pui-accordion`, `pui-accordion-item`                    | `<details name="…">`               | **no** (native exclusive)     |
| Overlay    | Modal                     | `pui-modal`                                              | `<dialog closedby>` + `commandfor` | fallback only                 |
| Overlay    | Dropdown                  | `pui-dropdown`                                           | `popover` + `popovertarget`        | no                            |
| Overlay    | Tooltip                   | `pui-tooltip`                                            | `popover="hint"` + `interestfor`   | fallback only                 |
| Forms      | Field group               | `pui-field-group` (label `> span`, message `> small`)    | `<label>`                          | no                            |
| Forms      | Input / Textarea / Select | `pui-input`                                              | native controls                    | no                            |
| Forms      | Input group / Addon       | `pui-input-group`, `pui-addon`                           | any                                | no                            |
| Forms      | Checkbox / Radio / Switch | `pui-checkbox`, `pui-radio`, `pui-switch`                | `<input>`                          | checkbox `indeterminate` only |

Rules:

- Size scale is expressed by **component choice**: `pui-btn` > `pui-chip` > `pui-badge`.
- Positioning of overlays (dropdown, tooltip): **CSS anchor positioning** (decided). Add `anchor-positioning` to the fallback registry (§8.2) for browsers without support.
- Field group uses **real elements**, not pseudo-elements (see §6.1).
- Helper classes are allowed **only if they are used together with components**: `pui-rounded`, `pui-rounded-full`. They live in `pui.utilities`, a layer of their own: a helper and a component class have the same specificity, so inside `pui.components` the winner would depend on the user's import order.
- Accessibility is part of the component: visible `:focus-visible`, respect `prefers-reduced-motion`, use logical properties (`margin-inline`, `inset-inline-start`).
- **Groups take no child class.** `pui-group-row`, `pui-group-col` and `pui-group-responsive` style their direct children, so v0's `group-item` (and its `[class*="item"]` escape hatch) is gone. They overlap borders with a negative margin instead of removing them, which keeps `pui-outline` working on every child, and raise the hovered or focused child with `z-index` so its own border and ring stay visible.
- **Modifiers.** The library ships exactly two, `pui-striped` and `pui-hoverable`, on `pui-list` and `pui-table`. They exist because they need a structural selector (`:nth-child`, `:hover` on a child) that the user cannot express by composing classes. Everything else v0 had is composition or one line of author CSS, and belongs in the docs as a recipe rather than in the bundle: a selected item is `pui-list-item pui-soft pui-theme`, a bordered one is `pui-list-item pui-outline pui-surface`, an unmarked list is `list-style: none`, a responsive table is `overflow-x: auto` on the parent. Each modifier lives in its own component file, so importing only `table.css` still brings them.
- **Surfaces vs colorable elements.** A container that is not meant to be recolored — `pui-card`, `pui-table` cells, the timeline rule — reads the page tokens (`--pui-border`, `--pui-bg-muted`) directly, so it looks right with no extra classes. It stays composable anyway: `pui.styles` comes after `pui.components`, so `pui-card pui-soft pui-theme` still recolors the card. Elements meant to be recolored (`pui-btn`, `pui-chip`, `pui-badge`, `pui-list-item`, `pui-checkpoint-icon`) carry `border: var(--pui-border-width) solid transparent` so that a style class, which only ever sets `border-color`, has something to paint.

### Target HTML examples

```html
<!-- Accordion: only one open at a time, zero JS -->
<div class="pui-accordion">
  <details class="pui-accordion-item" name="faq">
    <summary>One</summary>
    …
  </details>
  <details class="pui-accordion-item" name="faq">
    <summary>Two</summary>
    …
  </details>
</div>

<!-- Modal -->
<button
  class="pui-btn pui-solid pui-theme"
  commandfor="m1"
  command="show-modal"
>
  Open
</button>
<dialog class="pui-modal" id="m1" closedby="any">
  <div class="pui-card">
    …
    <button class="pui-btn pui-link pui-error" commandfor="m1" command="close">
      Close
    </button>
  </div>
</dialog>

<!-- Dropdown -->
<button class="pui-btn pui-solid pui-surface" popovertarget="menu">Menu</button>
<div class="pui-dropdown" id="menu" popover>…</div>

<!-- Tooltip -->
<button class="pui-btn" interestfor="tip">?</button>
<div class="pui-tooltip" id="tip" popover="hint">Help text</div>

<!-- Field group -->
<label class="pui-field-group">
  <span>Email</span>
  <input class="pui-input" type="email" aria-describedby="email-msg" />
  <small id="email-msg">Optional</small>
</label>

<!-- Checkbox indeterminate -->
<input type="checkbox" class="pui-checkbox" indeterminate />
```

### 6.1 Field group accessibility (decision)

- v0 used `data-label` / `data-message` rendered with `::before` / `::after`.
- Problems: screen readers read generated content inconsistently; the message is not linked to the input (errors are not announced); browser translation skips it; text cannot be selected.
- v1: label is a real `<span>` as first child, message is a real `<small>` linked with `aria-describedby`. CSS targets children by element (`> span`, `> small`), so **no extra classes**.
- Error state: `aria-invalid="true"` on the input styles the group (via `:has()`), not a class.

---

## 7. Color mode (light / dark)

### 7.1 CSS

```css
@layer pui.tokens {
  :root {
    color-scheme: light dark;
  } /* default: follow system */
  [data-pui-mode="light"] {
    color-scheme: light;
  }
  [data-pui-mode="dark"] {
    color-scheme: dark;
  }
}
```

- `data-pui-mode` on `<html>` is the **switch**. `color-scheme` is what actually changes colors (via `light-dark()`).
- No attribute = system mode. This needs **zero JS** and never flashes.
- The old `.dark` class is removed. Tailwind users configure their dark variant to read `[data-pui-mode="dark"]`.

### 7.2 Persistence: cookie

Mode is persisted in a **cookie** (not `localStorage`) so the server can read it during SSR.

| Property   | Value                                                                       |
| ---------- | --------------------------------------------------------------------------- |
| Name       | `pui-mode`                                                                  |
| Values     | `light`, `dark` (no cookie = `system`)                                      |
| Attributes | `path=/; max-age=31536000; SameSite=Lax` (not `HttpOnly`, JS must write it) |

### 7.3 `setMode` (file `src/js/mode.ts`, separate entry)

```ts
export type Mode = "system" | "light" | "dark";

export function setMode(mode: Mode = "system"): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "system") {
    root.removeAttribute("data-pui-mode");
    document.cookie = "pui-mode=; path=/; max-age=0; SameSite=Lax";
    return;
  }
  root.setAttribute("data-pui-mode", mode);
  document.cookie = `pui-mode=${mode}; path=/; max-age=31536000; SameSite=Lax`;
}

export function getMode(): Mode {
  if (typeof document === "undefined") return "system";
  const m = document.cookie.match(/(?:^|; )pui-mode=(light|dark)/);
  return (m?.[1] as Mode) ?? "system";
}
```

### 7.4 Avoiding the flash

- **SSR apps (Nuxt, Next…):** server reads the `pui-mode` cookie and renders `<html data-pui-mode="…">`. Docs show one example per framework. The library does not ship framework code.
- **Static sites (no server):** docs provide this inline snippet for `<head>`, placed before stylesheets:

```html
<script>
  (function (m) {
    if (m) document.documentElement.setAttribute("data-pui-mode", m[1]);
  })(document.cookie.match(/(?:^|; )pui-mode=(light|dark)/));
</script>
```

---

## 8. JavaScript: native-first fallbacks

### 8.1 Principle (open–closed / Liskov)

- The **user's HTML is always the native API**.
- A fallback module **reproduces native behavior with the same markup**. When the browser supports the feature, the module is **never downloaded**.
- Removing a fallback later = delete one registry entry + one file. User code does not change.

### 8.2 Loader

File: `src/js/index.ts` — the only file that runs eagerly. It only detects support and dynamically imports what is missing.

```ts
type Feature = {
  name: string;
  supported: () => boolean;
  load: () => Promise<unknown>;
};

const features: Feature[] = [
  {
    name: "command-for",
    supported: () => "commandForElement" in HTMLButtonElement.prototype,
    load: () => import("./fallbacks/command-for")
  },
  {
    name: "dialog-closedby",
    supported: () => "closedBy" in HTMLDialogElement.prototype,
    load: () => import("./fallbacks/dialog-closedby")
  },
  {
    name: "popover-hint",
    supported: () => {
      const el = document.createElement("div");
      el.setAttribute("popover", "hint");
      return el.popover === "hint";
    },
    load: () => import("./fallbacks/popover-hint")
  },
  {
    name: "interest-for",
    supported: () => "interestForElement" in HTMLButtonElement.prototype,
    load: () => import("./fallbacks/interest-for")
  },
  {
    name: "anchor-positioning",
    supported: () => CSS.supports("anchor-name: --a"),
    load: () => import("./fallbacks/anchor-positioning")
  },
  {
    name: "checkbox-indeterminate-attribute",
    supported: () => false, // No native HTML attribute exists. Replace with real detection if it ever ships.
    load: () => import("./fallbacks/checkbox-indeterminate")
  }
];

if (typeof document !== "undefined") {
  for (const f of features) if (!f.supported()) void f.load();
}
```

> ⚠️ Detection expressions must be verified against MDN/spec at implementation time. Property names can change while features are experimental.

### 8.3 Rules for every fallback module

1. Lives in `src/js/fallbacks/<feature>.ts`.
2. Uses **event delegation on `document`** (works for elements added later by React/Vue).
3. Reads **only native attributes** (`commandfor`, `command`, `closedby`, `popover`, `interestfor`). Only exception: the `indeterminate` attribute on `pui-checkbox` (kept from v0 because it is the likely native name).
4. Idempotent: guard against double registration (e.g. a module-level flag).
5. No exports needed; no global variables; nothing on `window`.
6. Each module must be importable alone: `@chrissgon/perfectui/fallbacks/<feature>`.

### 8.4 Checkbox `indeterminate`

- Markup: `<input type="checkbox" class="pui-checkbox" indeterminate>`.
- Fallback: set `el.indeterminate = true` for matching elements, and remove the attribute on user change (delegated `change` listener). Because this needs to see elements, apply on `pointerdown`/`focusin` delegation or on initial load + on `change`; do **not** use `MutationObserver`.

---

## 9. Browser features used

| Feature                        | Used for                     | Fallback? |
| ------------------------------ | ---------------------------- | --------- |
| `@layer`                       | Override-friendly CSS        | no        |
| Native CSS nesting             | Authoring                    | no        |
| `light-dark()`, `color-scheme` | Modes                        | no        |
| `color-mix()`                  | Derived shades               | no        |
| `:has()`, `:focus-visible`     | States                       | no        |
| `<details name>`               | Exclusive accordion          | no        |
| `popover`, `popovertarget`     | Dropdown                     | no        |
| `<dialog>` + `showModal`       | Modal                        | no        |
| `commandfor` / `command`       | Open/close without JS        | **yes**   |
| `<dialog closedby>`            | Light dismiss                | **yes**   |
| `popover="hint"`               | Tooltip                      | **yes**   |
| `interestfor`                  | Tooltip on hover/focus/touch | **yes**   |
| CSS anchor positioning         | Overlay placement            | **yes**   |

---

## 10. Repository structure

```
src/
  css/
    layers.css            # @layer order declaration
    tokens.css            # §4 + §7.1
    styles.css            # pui-solid, pui-soft, pui-outline, pui-link
    colors.css            # pui-theme … pui-inverse
    states.css            # disabled, invalid, focus
    utilities.css         # pui-rounded, pui-rounded-full
    components/
      button.css chip.css badge.css card.css list.css table.css
      timeline.css group.css float.css accordion.css modal.css
      dropdown.css tooltip.css form.css
    index.css             # imports everything above
  js/
    index.ts              # fallback loader (§8.2)
    mode.ts               # setMode / getMode (§7.3)
    fallbacks/
      command-for.ts dialog-closedby.ts popover-hint.ts
      interest-for.ts anchor-positioning.ts checkbox-indeterminate.ts
tests/                    # Playwright
docs/                     # markdown examples (kept in sync)
ARCHITECTURE.md
```

---

## 11. Build and package

- **Vite** in library mode, **ESM only**. No UMD/IIFE. CDN users use `<script type="module">`.
- CSS is copied/minified per file (no preprocessing).
- Output:

```
dist/
  perfectui.css                 # everything
  css/core.css                  # layers + tokens + styles + colors + states
  css/components/<name>.css     # one per component (requires core.css)
  js/index.js                   # loader
  js/mode.js
  js/fallbacks/<feature>.js
  types/…                       # .d.ts
```

`package.json` (shape):

```json
{
  "type": "module",
  "exports": {
    ".": { "types": "./dist/types/index.d.ts", "import": "./dist/js/index.js" },
    "./mode": {
      "types": "./dist/types/mode.d.ts",
      "import": "./dist/js/mode.js"
    },
    "./fallbacks/*": "./dist/js/fallbacks/*.js",
    "./perfectui.css": "./dist/perfectui.css",
    "./core.css": "./dist/css/core.css",
    "./components/*": "./dist/css/components/*.css"
  },
  "sideEffects": ["**/*.css", "./dist/js/index.js", "./dist/js/fallbacks/*.js"]
}
```

Usage:

```js
import "@chrissgon/perfectui/core.css";
import "@chrissgon/perfectui/components/button.css";
import "@chrissgon/perfectui"; // loader (only if using overlays/checkbox)
import { setMode } from "@chrissgon/perfectui/mode";
```

**Size budget:** CI prints gzip size of each `dist` file. Record the `0.23.0` baseline first; v1 must be smaller.

---

## 12. Testing

- **Playwright** (dev only). Nothing test-related ships in `dist`.
- For each fallback: run tests **twice** — native path and forced-fallback path (stub `supported()` to `false`).
- Dynamic DOM test: insert components after load and verify behavior (no re-init).
- SSR safety test: import every JS entry in Node; must not throw.
- Visual check of every component × style × color in light and dark mode.

---

## 13. Removed from v0 (breaking)

| v0                                                      | v1                                      |
| ------------------------------------------------------- | --------------------------------------- |
| SCSS, `_mixins`, `_variables`                           | Native CSS                              |
| `_reset.scss`                                           | Removed (no reset)                      |
| Poppins `@import`                                       | Removed                                 |
| `--theme50…950`, gray/red/amber/green palettes          | Semantic tokens (§4)                    |
| `setThemeColor`, `IThemeColor`                          | Override CSS variables                  |
| `setMode` toggling `.dark`                              | `setMode` sets `data-pui-mode` + cookie |
| `loadFunctions`, `IFunctions`, `MutationObserver`       | Native HTML + fallback loader           |
| `Accordion()`, `Dropdown()`, `Modal()`, `Checkbox()`    | Native attributes                       |
| `window.perfectui`, `document.perfectui`                | ESM imports only                        |
| UMD/global script                                       | `<script type="module">`                |
| `.bg-*`, `.text-*`, `.border-*` utilities               | Removed                                 |
| `spacing-*`, `overflow-hidden`, `hr.vertical`           | Removed (not used with components)      |
| `rounded`, `rounded-full`                               | `pui-rounded`, `pui-rounded-full`       |
| `--fontXS…9XL`, `--spacingXS…XL`, `--roundedFull`       | 4 base tokens + `calc()` (§4.1)         |
| `data-label` / `data-message` pseudo-elements           | Real `<span>` / `<small>` (§6.1)        |
| `body *` font/color, `ul`, `ol`, `hr`, `a` global rules | Removed                                 |
| `!important`                                            | Removed (`@layer`)                      |

### Class migration map

| v0                                      | v1                                                   |
| --------------------------------------- | ---------------------------------------------------- |
| `btn`                                   | `pui-btn`                                            |
| `badge`                                 | `pui-badge` (+ new `pui-chip`)                       |
| `style-solid-primary`                   | `pui-solid pui-theme`                                |
| `style-soft-success`                    | `pui-soft pui-success`                               |
| `style-outline-error`                   | `pui-outline pui-error`                              |
| `style-link-warn`                       | `pui-link pui-warn`                                  |
| `style-*-secondary`                     | `pui-<style> pui-muted`                              |
| `style-white`                           | `pui-solid pui-surface`                              |
| `style-black`                           | `pui-solid pui-inverse`                              |
| `modal` + `data-modal="id"`             | `pui-modal` + `commandfor="id" command="show-modal"` |
| `data-autoclose`                        | `commandfor="id" command="close"`                    |
| `modal.static-backdrop`                 | `pui-modal` without `closedby="any"`                 |
| `dropdown-trigger` > `dropdown.visible` | `popovertarget` + `pui-dropdown[popover]`            |
| `.ignore` (dropdown)                    | not needed (clicks inside a popover do not close it) |
| `tooltip` + `data-tooltip`              | `interestfor` + `pui-tooltip[popover="hint"]`        |
| `accordion-item` (JS exclusive)         | `<details name>`                                     |
| `checkbox[indeterminate]`               | `pui-checkbox[indeterminate]`                        |
| `.dark` on `<html>`                     | `data-pui-mode="dark"`                               |

---

## 14. Open questions

None at the moment. If a new question appears, add it here and ask the maintainer before implementing.

---

## 15. Migration phases (checklist)

- [x] **Phase 0 — Prepare:** branch `v1`; gzip baseline of `0.23.0`: `perfectui.css` 6005 B, `perfectui.js` 1587 B (plus external Poppins download). _Notify existing users: pending (maintainer)._
- [x] **Phase 1 — Build:** _(delivered as `perfectui-phase-1.patch`; apply it first — see HANDOFF.md)_ removed Sass, reset and font; Vite ESM lib for JS (`src/js` → `dist/js`, types in `dist/types`); `scripts/build-css.mjs` (lightningcss bundle + minify, per-file output); `scripts/size.mjs`; `exports` + `sideEffects`; `tsconfig.json`. Note: `./mode` export is added in Phase 2 together with `mode.ts`.
- [x] **Phase 2 — Tokens & mode:** `tokens.css` (semantic colors with `light-dark()`, 4 base tokens, `data-pui-mode` rules), `src/js/mode.ts` (`setMode`/`getMode` + cookie), `./mode` export and Vite entry. `layers.css` already shipped in Phase 1.
- [x] **Phase 3 — Lego pieces:** `colors.css` (7 color classes), `styles.css` (4 style classes, derived hover and ink), `states.css` (disabled, focus ring, `aria-invalid`). Contract extended with `--pui-ink` and `--pui-shade` (§3.1). Preview page at `tests/manual/preview.html`.
- [ ] **Phase 4 — Components (one PR each):**
  - [x] button, badge, chip — `pui-rounded`/`pui-rounded-full` shipped with them, in `pui.utilities`
  - [x] card, list, table, timeline (+ `pui-striped`, `pui-hoverable`; horizontal timeline waits for `pui-group-row`)
  - [x] form (field group, input, input group, addon, select, textarea, checkbox, radio, switch)
  - [x] group, float (+ the horizontal timeline, which depends on `pui-group-row`)
  - [x] accordion (`details name`)
  - [x] modal (`dialog`, `commandfor`, `closedby`)
  - [x] dropdown (`popover`)
  - [x] tooltip (`popover="hint"`, `interestfor`)
- [ ] **Phase 5 — JS:** loader + fallbacks; delete old `index.ts` logic and `constants.ts`.
- [ ] **Phase 6 — Tests:** Playwright suites (§12); compare size with baseline.
- [ ] **Phase 7 — Docs:** update `/docs`; update site repo `chrissgon/perfectui-doc` (e.g. `Atom.ThemeColorPicker.vue`, `Atom.DarkMode.vue`); write `MIGRATION.md` from §13.
- [ ] **Phase 8 — Release:** `1.0.0-beta.x` → feedback from existing users → `1.0.0`.

---

## 16. Links

- Source: https://github.com/chrissgon/perfectui
- Docs site: https://perfectui.netlify.app/ (repo: https://github.com/chrissgon/perfectui-doc — Nuxt 3 + Tailwind)
- Support checks: https://caniuse.com, https://web.dev/baseline, MDN
