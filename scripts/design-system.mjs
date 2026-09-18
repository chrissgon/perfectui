/**
 * Generates DESIGN-SYSTEM.md by measuring the real components in a browser.
 *
 * The document is written for a tool that cannot run CSS: every value is
 * resolved to pixels and hex, for both color modes. Measuring rather than
 * transcribing is the point — a hand-written spec drifts from what ships.
 */
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

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

const page = await (await chromium.launch()).newPage();
await page.setViewportSize({ width: 1200, height: 900 });

await page.setContent(`<!doctype html><html><head>
<link rel="stylesheet" href="http://localhost:8151/src/css/index.css"></head>
<body style="margin:0;padding:20px">
  ${STYLES.map((s) => COLORS.map((c) => `<button class="pui-btn pui-${s} pui-${c}" id="b-${s}-${c}">x</button>`).join("")).join("")}
  <button class="pui-btn pui-solid pui-theme" id="m-btn">Save</button>
  <span class="pui-chip pui-soft pui-theme" id="m-chip">Chip</span>
  <span class="pui-badge pui-solid pui-error" id="m-badge">3</span>
  <input class="pui-input" id="m-input" value="x">
  <span class="pui-addon" id="m-addon">@</span>
  <div class="pui-card" id="m-card"><div class="pui-card-header" id="m-card-header">h</div><div class="pui-card-content" id="m-card-content">c</div></div>
  <ul class="pui-list" id="m-list"><li class="pui-list-item" id="m-list-item">i</li></ul>
  <table class="pui-table" id="m-table"><thead><tr><th id="m-th">h</th></tr></thead><tbody><tr><td id="m-td">c</td></tr></tbody><tfoot><tr><th id="m-tf">f</th></tr></tfoot></table>
  <div class="pui-accordion" id="m-accordion"><details class="pui-accordion-item" id="m-acc-item" open><summary id="m-summary">s</summary><p id="m-acc-panel">p</p></details></div>
  <figure class="pui-timeline" id="m-timeline"><figcaption class="pui-checkpoint" id="m-checkpoint"><i class="pui-checkpoint-icon pui-solid pui-success" id="m-cp-icon">x</i><span>t</span></figcaption></figure>
  <label class="pui-field-group" id="m-field"><span id="m-field-label">L</span><input class="pui-input"><small id="m-field-msg">m</small></label>
  <input type="checkbox" class="pui-checkbox" id="m-checkbox" checked>
  <input type="radio" class="pui-radio" id="m-radio" checked>
  <input type="checkbox" class="pui-switch" id="m-switch" checked>
  <div class="pui-dropdown" id="m-dropdown" style="position:static">d</div>
  <div class="pui-tooltip" id="m-tooltip" style="position:static">t</div>
  <div class="pui-group-row" id="m-group"><button class="pui-btn pui-outline pui-surface">a</button><button class="pui-btn pui-outline pui-surface" id="m-group-second">b</button></div>
  <button class="pui-btn pui-solid pui-theme pui-rounded-full" id="m-pill">p</button>
</body></html>`);
await page.waitForLoadState("networkidle");

const box = (id, props) =>
  page.evaluate(
    ([id, props]) => {
      const el = document.getElementById(id);
      const s = getComputedStyle(el);
      const out = {};
      for (const p of props) out[p] = s.getPropertyValue(p);
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
      out[token] = getComputedStyle(probe).color;
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

writeFileSync(
  "/tmp/design-data.json",
  JSON.stringify({ metrics, palette, combos }, null, 1)
);
console.log(
  "measured:",
  Object.keys(metrics).length,
  "components,",
  STYLES.length * COLORS.length,
  "combinations x 2 modes"
);
await page.context().browser().close();
