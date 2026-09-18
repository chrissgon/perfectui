/**
 * Generates DESIGN-SYSTEM.md by measuring the real components in a browser.
 *
 * The document is written for a tool that cannot run CSS: every value is
 * resolved to pixels and hex, for both color modes. Measuring rather than
 * transcribing is the point — a hand-written spec drifts from what ships.
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const STYLES = ["solid", "soft", "outline", "link"];
const COLORS = [
  "theme",
  "success",
  "error",
  "warn",
  "muted",
  "surface",
  "inverse"
];

/* Four device pixels per CSS pixel: the white marks inside the controls are
   measured from a raster, and at 1x an anti-aliased edge costs a whole pixel
   on a 16px control. */
const SCALE = 4;
const page = await (
  await chromium.launch()
).newPage({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: SCALE
});

/* The stylesheet is served from disk rather than by a separate process. It
   cannot be inlined: index.css and every component file use relative @imports,
   which only resolve against a URL. Routing keeps the script self-contained —
   the first version pointed at a dev server, and when that server was not
   running the page loaded with no CSS at all and the run still reported
   success, writing a document full of browser defaults. */
await page.route("http://pui.local/**", (route) => {
  const path = new URL(route.request().url()).pathname.replace(/^\/+/, "");
  try {
    route.fulfill({
      body: readFileSync(path),
      contentType: path.endsWith(".css") ? "text/css" : "text/plain"
    });
  } catch {
    route.fulfill({ status: 404, body: "" });
  }
});

await page.setContent(`<!doctype html><html><head>
<link rel="stylesheet" href="http://pui.local/src/css/index.css">
<style>
  /* Switching the color mode animates every color for 150ms, and a computed
     style read during that window returns the interpolated value: the first
     element measured after a mode switch came out with the previous mode's
     colors. A measurement harness has no business animating. */
  *, *::before, *::after { transition: none !important; }
</style>
</head>
<body style="margin:0;padding:20px">
  ${STYLES.map((s) => COLORS.map((c) => `<button class="pui-btn pui-${s} pui-${c}" id="b-${s}-${c}">x</button>`).join("")).join("")}
  <button class="pui-btn pui-solid pui-theme" id="m-btn">Save</button>
  <span class="pui-chip pui-soft pui-theme" id="m-chip">Chip</span>
  <span class="pui-badge pui-solid pui-error" id="m-badge">3</span>
  <input class="pui-input" id="m-input" value="x">
  <select class="pui-input" id="m-select"><option>x</option></select>
  <span class="pui-addon" id="m-addon">@</span>
  <div class="pui-card" id="m-card"><div class="pui-card-header" id="m-card-header">h</div><div class="pui-card-content" id="m-card-content">c</div></div>
  <ul class="pui-list" id="m-list"><li class="pui-list-item" id="m-list-item">i</li></ul>
  <table class="pui-table" id="m-table"><thead><tr><th id="m-th">h</th></tr></thead><tbody><tr><td id="m-td">c</td></tr></tbody><tfoot><tr><th id="m-tf">f</th></tr></tfoot></table>
  <div class="pui-accordion" id="m-accordion"><details class="pui-accordion-item" id="m-acc-item" open><summary id="m-summary">s</summary><p id="m-acc-panel">p</p></details></div>
  <figure class="pui-timeline" id="m-timeline"><figcaption class="pui-checkpoint" id="m-checkpoint"><i class="pui-checkpoint-icon pui-solid pui-success" id="m-cp-icon">x</i><span>t</span></figcaption></figure>
  <label class="pui-field-group" id="m-field"><span id="m-field-label">L</span><input class="pui-input"><small id="m-field-msg">m</small></label>
  <input type="checkbox" class="pui-checkbox" id="m-checkbox" checked>
  <input type="checkbox" class="pui-checkbox" id="m-indeterminate">
  <input type="radio" class="pui-radio" id="m-radio" checked>
  <input type="checkbox" class="pui-switch" id="m-switch" checked>
  <div class="pui-dropdown" id="m-dropdown" style="position:static">d</div>
  <div class="pui-tooltip" id="m-tooltip" style="position:static">t</div>
  <div class="pui-group-row" id="m-group"><button class="pui-btn pui-outline pui-surface">a</button><button class="pui-btn pui-outline pui-surface" id="m-group-second">b</button></div>
  <button class="pui-btn pui-solid pui-theme pui-rounded-full" id="m-pill">p</button>
</body></html>`);
await page.waitForLoadState("networkidle");

/* Nothing below can tell a missing stylesheet from a component that happens to
   look like a browser default, so the run stops here instead. */
const applied = await page.evaluate(() => {
  const s = getComputedStyle(document.getElementById("m-btn"));
  return `${s.fontSize}/${s.borderRadius}/${s.paddingLeft}`;
});
if (applied !== "14px/6px/16px") {
  throw new Error(`the stylesheet did not apply: button reads ${applied}`);
}

/**
 * color-mix() computes to oklch(), which this document cannot contain. Rather
 * than reimplement the conversion — the first attempt dropped the hue whenever
 * Chrome serialized it as `none`, turning greys pink — the browser resolves its
 * own colors through a canvas, and composites the tinted ones over the page for
 * the flattened value.
 */
await page.evaluate(() => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");

  const draw = (...colors) => {
    ctx.clearRect(0, 0, 1, 1);
    for (const color of colors) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
    }
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const hex =
      "#" +
      [r, g, b]
        .map((v) => v.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    return { hex, alpha: a / 255 };
  };

  window.__resolve = (value) => {
    if (!value || value === "transparent")
      return { hex: "transparent", alpha: 0 };
    const probe = draw(value);
    if (probe.alpha === 0) return { hex: "transparent", alpha: 0 };

    const alpha = Math.round(probe.alpha * 100) / 100;
    // the same color at full opacity, so the base is exact rather than derived
    const opaque = value.replace(/\s*\/\s*[\d.]+%?\s*\)/, ")");

    // --pui-bg reads back as light-dark(#fff, #000), which a canvas cannot
    // parse: it has to be resolved through an element first.
    const swatch = document.createElement("div");
    swatch.style.color = "var(--pui-bg)";
    document.body.append(swatch);
    const page = getComputedStyle(swatch).color;
    swatch.remove();

    return {
      hex: draw(opaque).hex,
      alpha,
      over: alpha === 1 ? draw(opaque).hex : draw(page, value).hex
    };
  };
});

const box = (id, props) =>
  page.evaluate(
    ([id, props]) => {
      const el = document.getElementById(id);
      const s = getComputedStyle(el);
      const out = {};
      for (const p of props) {
        const value = s.getPropertyValue(p);
        out[p] = /color/.test(p) ? window.__resolve(value) : value;
      }
      out.width = el.getBoundingClientRect().width.toFixed(1);
      out.height = el.getBoundingClientRect().height.toFixed(1);
      return out;
    },
    [id, props]
  );

const METRIC_PROPS = [
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "font-size",
  "line-height",
  "border-radius",
  "border-top-width",
  "border-bottom-width",
  "margin-inline-start",
  "gap",
  "background-color",
  "color",
  "border-top-color",
  "font-weight"
];

const metrics = {};
for (const id of [
  "m-btn",
  "m-chip",
  "m-badge",
  "m-input",
  "m-addon",
  "m-card",
  "m-card-header",
  "m-card-content",
  "m-list",
  "m-list-item",
  "m-table",
  "m-th",
  "m-td",
  "m-tf",
  "m-accordion",
  "m-acc-item",
  "m-summary",
  "m-acc-panel",
  "m-timeline",
  "m-checkpoint",
  "m-cp-icon",
  "m-field",
  "m-field-label",
  "m-field-msg",
  "m-checkbox",
  "m-radio",
  "m-switch",
  "m-dropdown",
  "m-tooltip",
  "m-group-second",
  "m-pill"
]) {
  metrics[id] = await box(id, METRIC_PROPS);
}

/**
 * The white mark inside a checked control is painted by a gradient or an SVG,
 * so its size appears in no computed style: the percentages in the stylesheet
 * are gradient stops against the box's corner-to-corner radius, which is not
 * the same as a fraction of its width. Rasterize the control and measure the
 * light pixels instead. The browser decodes its own screenshot, so this needs
 * no image library, and it runs in dark mode so that the page showing through
 * a rounded corner is black rather than white.
 */
const glyph = async (id) => {
  const shot = (await page.locator(`#${id}`).screenshot()).toString("base64");
  return page.evaluate(
    async ([b64, scale]) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, img.width, img.height);

      // The mark is #fff on the control's own fill. The threshold sits halfway
      // between the two, read from a pixel at the edge of the fill, so a
      // half-covered edge pixel falls on the right side of it whatever the
      // color is.
      const at = (x, y) => (y * img.width + x) * 4;
      const edge = at(1, Math.floor(img.height / 2));
      const mid = [0, 1, 2].map((c) => (data[edge + c] + 255) / 2);

      let minX = Infinity;
      let maxX = -1;
      let minY = Infinity;
      let maxY = -1;
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const i = at(x, y);
          if (!mid.every((m, c) => data[i + c] > m)) continue;
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
      if (maxX < 0) return null;
      const px = (n) => Math.round((n / scale) * 10) / 10;
      return {
        width: px(maxX - minX + 1),
        height: px(maxY - minY + 1),
        box: px(img.width),
        inset: px(minX)
      };
    },
    [shot, SCALE]
  );
};

/* The chevron and the select arrow were the last two values in the document
   computed from a ratio in the stylesheet rather than measured, and they do not
   agree: a border width is rounded to whole pixels by the browser, so the
   chevron built from borders is 8x4, while the arrow drawn as a background
   image keeps its 8.4x4.2. Read both from the rendered elements. */
const marks = await page.evaluate(() => {
  const chevron = getComputedStyle(
    document.getElementById("m-summary"),
    "::after"
  );
  const select = getComputedStyle(document.getElementById("m-select"));
  return {
    chevron: {
      width: parseFloat(chevron.borderLeftWidth) * 2,
      height: parseFloat(chevron.borderTopWidth)
    },
    arrow: {
      size: select.backgroundSize,
      inset: select.backgroundPosition,
      padding: select.paddingInlineEnd
    }
  };
});

const palette = {};
const combos = {};
for (const mode of ["light", "dark"]) {
  await page.evaluate(
    (m) => document.documentElement.setAttribute("data-pui-mode", m),
    mode
  );

  palette[mode] = await page.evaluate(() => {
    const probe = document.createElement("div");
    document.body.append(probe);
    const out = {};
    for (const token of [
      "bg",
      "bg-muted",
      "bg-emphasis",
      "text",
      "text-muted",
      "border",
      "theme",
      "success",
      "error",
      "warn",
      "muted"
    ]) {
      probe.style.color = `var(--pui-${token})`;
      out[token] = window.__resolve(getComputedStyle(probe).color);
    }
    probe.remove();
    return out;
  });

  combos[mode] = {};
  for (const style of STYLES) {
    for (const color of COLORS) {
      const id = `b-${style}-${color}`;
      const rest = await box(id, [
        "background-color",
        "color",
        "border-top-color"
      ]);
      await page.hover(`#${id}`);
      await page.waitForTimeout(220);
      const hover = await box(id, [
        "background-color",
        "color",
        "border-top-color"
      ]);
      combos[mode][`${style}/${color}`] = { rest, hover };
    }
  }
  await page.mouse.move(0, 0);
}

await page.evaluate(() => {
  document.documentElement.setAttribute("data-pui-mode", "dark");
  document.getElementById("m-indeterminate").indeterminate = true;
});
const glyphs = {};
for (const id of ["m-checkbox", "m-indeterminate", "m-radio", "m-switch"]) {
  glyphs[id] = await glyph(id);
}

writeFileSync(
  "/tmp/design-data.json",
  JSON.stringify({ metrics, palette, combos, glyphs, marks }, null, 1)
);
console.log(
  "measured:",
  Object.keys(metrics).length,
  "components,",
  STYLES.length * COLORS.length,
  "combinations x 2 modes"
);
await page.context().browser().close();
