/**
 * Checks the claims design-system/DESIGN-SYSTEM.md makes that are not measured values.
 *
 * The document is generated from measurements, so its tables are as right as
 * the harness. Its prose is not: every sentence that names a number — the
 * chevron's size, the modal's limits, the timeline's rule, the contrast
 * range — was written by hand, and a hand-written number is the one that
 * drifts. This asserts each of them against a browser, and against the same
 * measurements the document was built from.
 *
 * Run it with `bun run design-system:check` after regenerating.
 */
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

const { palette, combos } = JSON.parse(
  readFileSync("/tmp/design-data.json", "utf8")
);
const doc = readFileSync("design-system/DESIGN-SYSTEM.md", "utf8");

/** The number the document prints, so the check is against its own words. */
const printed = (pattern) => doc.match(pattern)?.[1];

const page = await (
  await chromium.launch()
).newPage({
  viewport: { width: 1200, height: 900 }
});

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

await page.setContent(`<!doctype html><html data-pui-mode="light"><head>
<link rel="stylesheet" href="http://pui.local/src/css/index.css">
</head><body style="margin:0;padding:20px">
  <button class="pui-btn pui-solid pui-theme" id="btn">Save</button>
  <button class="pui-btn pui-link pui-theme" id="link">Link</button>
  <button class="pui-btn pui-solid pui-theme pui-rounded-full" id="pill">P</button>
  <button class="pui-btn pui-solid pui-theme" id="off" disabled>Off</button>
  <input class="pui-input" id="input" placeholder="x">
  <select class="pui-input" id="select"><option>x</option></select>
  <div class="pui-card" id="card"><div class="pui-card-header" id="card-header">h</div></div>
  <span class="pui-addon" id="addon">@</span>
  <table class="pui-table" id="table"><thead><tr><th id="th">h</th></tr></thead>
    <tbody><tr><td id="td">a</td></tr><tr><td id="td-last">b</td></tr></tbody>
    <tfoot id="tfoot"><tr><th id="tf">f</th></tr></tfoot></table>
  <div class="pui-accordion" id="acc"><details class="pui-accordion-item" id="acc-item" open><summary id="summary">s</summary><p>p</p></details></div>
  <div class="pui-accordion pui-highlighted" id="marked"><details class="pui-accordion-item" id="marked-open" open><summary>s</summary><p>p</p></details><details class="pui-accordion-item" id="marked-shut"><summary>s</summary><p>p</p></details></div>
  <figure class="pui-timeline" id="timeline">
    <figcaption class="pui-checkpoint" id="cp-first"><i class="pui-checkpoint-icon pui-solid pui-success" id="cp-icon">x</i><span>t</span></figcaption>
    <figcaption class="pui-checkpoint" id="cp-last"><i class="pui-checkpoint-icon pui-solid pui-success">y</i><span>t</span></figcaption>
  </figure>
  <input type="checkbox" class="pui-checkbox" id="cb">
  <input type="radio" class="pui-radio" id="radio" checked>
  <input type="checkbox" class="pui-switch" id="switch" checked>
  <div class="pui-float" id="float">f</div>
  <div class="pui-group-row" id="group"><button class="pui-btn pui-outline pui-surface" id="g1">a</button><button class="pui-btn pui-outline pui-surface" id="g2">b</button></div>
  <button class="pui-btn" id="trigger" style="width:200px" popovertarget="menu">t</button>
  <div class="pui-dropdown" id="menu" popover>m</div>
  <div class="pui-tooltip" id="tooltip" popover="hint">t</div>
  <dialog class="pui-modal" id="modal"><div class="pui-card">c</div></dialog>
</body></html>`);
await page.waitForLoadState("networkidle");

const fails = [];
const check = (claim, got, want) => {
  const ok = String(got) === String(want);
  if (!ok)
    fails.push(`${claim}\n    document says ${want}, browser says ${got}`);
  console.log(`${ok ? "  ok" : "FAIL"}  ${claim}`);
};

/* --- what the browser reports ------------------------------------------- */

const read = await page.evaluate(async () => {
  const s = (id, pseudo) =>
    getComputedStyle(document.getElementById(id), pseudo ?? null);
  const token = (name) => {
    const probe = document.createElement("div");
    probe.style.color = `var(--pui-${name})`;
    document.body.append(probe);
    const value = getComputedStyle(probe).color;
    probe.remove();
    return value;
  };

  document.getElementById("modal").showModal();
  // Through the trigger, not showPopover(): a popover with no invoker has no
  // implicit anchor, so `min-width: anchor-size(inline)` resolves to nothing
  // and the panel comes out 21px wide. Same trap the interest-for fallback hit.
  document.getElementById("trigger").click();
  const trigger = document.getElementById("trigger").getBoundingClientRect();
  const menu = document.getElementById("menu").getBoundingClientRect();

  return {
    base: {
      space: s("btn").getPropertyValue("--pui-space"),
      font: s("btn").getPropertyValue("--pui-font-size"),
      radius: s("btn").getPropertyValue("--pui-radius"),
      border: s("btn").getPropertyValue("--pui-border-width")
    },
    tokens: {
      bg: token("bg"),
      bgMuted: token("bg-muted"),
      text: token("text"),
      textMuted: token("text-muted"),
      border: token("border")
    },
    chevron: s("summary", "::after").borderTopWidth,
    chevronSide: s("summary", "::after").borderLeftWidth,
    selectImage: s("select").backgroundSize,
    selectPosition: s("select").backgroundPosition,
    selectPadding: s("select").paddingInlineEnd,
    placeholder: s("input", "::placeholder").color,
    cardBg: s("card").backgroundColor,
    cardHeaderBg: s("card-header").backgroundColor,
    addonBg: s("addon").backgroundColor,
    footBg: s("tfoot").backgroundColor,
    thAlign: s("th").textAlign,
    thWeight: s("th").fontWeight,
    lastRule: s("tf").borderBottomWidth,
    markedOpen: s("marked-open").backgroundColor,
    markedShut: s("marked-shut").backgroundColor,
    cpFirstBelow: s("cp-first").paddingBottom,
    cpLastBelow: s("cp-last").paddingBottom,
    ruleTop: s("cp-first", "::before").insetBlockStart,
    ruleBottom: s("cp-first", "::before").insetBlockEnd,
    ruleStart: s("cp-first", "::before").insetInlineStart,
    ruleWidth: s("cp-first", "::before").borderInlineStartWidth,
    ruleColor: s("cp-first", "::before").borderInlineStartColor,
    lastRule2: s("cp-last", "::before").content,
    floatBottom: s("float").insetBlockEnd,
    floatStart: s("float").insetInlineStart,
    floatPosition: s("float").position,
    disabled: s("off").opacity,
    transition: s("btn").transitionDuration,
    pill: s("pill").borderRadius,
    radio: s("radio").borderRadius,
    switch: s("switch").borderRadius,
    icon: s("cp-icon").borderRadius,
    cbBorder: s("cb").borderTopColor,
    groupOuter: s("g1").borderStartStartRadius,
    groupInner: s("g1").borderStartEndRadius,
    tooltipMax: s("tooltip").maxWidth,
    tooltipGap: s("tooltip").marginBlockEnd,
    tooltipPad: `${s("tooltip").paddingTop} ${s("tooltip").paddingRight}`,
    dropdownGap: s("menu").marginBlockStart,
    dropdownWidth: Math.round(menu.width),
    triggerWidth: Math.round(trigger.width),
    modalMaxWidth: s("modal").maxWidth,
    modalMaxHeight: s("modal").maxHeight,
    backdrop: s("modal", "::backdrop").backgroundColor
  };
});

// An open dialog is on top of everything, including the element to hover next.
await page.evaluate(() => {
  document.getElementById("modal").close();
  document.getElementById("menu").hidePopover();
});

// The offset only exists in the :hover rule, so it has to be read under a real
// pointer: a synthetic underline reports `auto`.
await page.hover("#link");
const hover = await page
  .locator("#link")
  .evaluate((el) => getComputedStyle(el).textUnderlineOffset);
await page.mouse.move(0, 0);

/* --- the claims ---------------------------------------------------------- */

console.log("\nfoundations");
check("§1.2 spacing unit 4px", read.base.space.trim(), "0.25rem");
check("§1.2 font size 14px", read.base.font.trim(), "0.875rem");
check("§1.2 radius 6px", read.base.radius.trim(), "0.375rem");
check("§1.2 border width 1px", read.base.border.trim(), "1px");
check("§1.5 full radius on a pill", read.pill, "9999px");
check("§1.5 full radius on a radio", read.radio, "9999px");
check("§1.5 full radius on a switch", read.switch, "9999px");
check("§1.5 full radius on a timeline icon", read.icon, "9999px");

console.log("\nstyles and states");
check(
  "§3 soft is a 15% tint",
  combos.light["soft/theme"].rest["background-color"].alpha,
  0.15
);
check(
  "§3 soft hover is 22%",
  combos.light["soft/theme"].hover["background-color"].alpha,
  0.22
);
check(
  "§3 outline hover is 10%",
  combos.light["outline/theme"].hover["background-color"].alpha,
  0.1
);
check("§3 link underline offset 0.3rem", hover, "4.8px");
check("§5 disabled is 50% opacity", read.disabled, "0.5");
check("§5 transitions run at 150ms", read.transition, "0.15s, 0.15s, 0.15s");

console.log("\ncomponents");
check("§4.4 card reads the page background", read.cardBg, read.tokens.bg);
check(
  "§4.4 card header reads the muted background",
  read.cardHeaderBg,
  read.tokens.bgMuted
);
check("§4.6 cells align to the start", read.thAlign, "start");
check("§4.6 header cells are 600", read.thWeight, "600");
check("§4.6 the last row draws no rule", read.lastRule, "0px");
check(
  "§4.6 the footer reads the muted background",
  read.footBg,
  read.tokens.bgMuted
);
check(
  "§4.7 the chevron's height",
  read.chevron,
  printed(
    /chevron is a solid triangle pointing down, [\d.]+px wide and ([\d.]+px) tall/
  )
);
check(
  "§4.7 the chevron's width",
  `${parseFloat(read.chevronSide) * 2}px`,
  printed(/chevron is a solid triangle pointing down, ([\d.]+px) wide/)
);
check(
  "§4.7 the marked variant paints the open item",
  read.markedOpen,
  read.tokens.bgMuted
);
check(
  "§4.7 and leaves a closed one alone",
  read.markedShut,
  "rgba(0, 0, 0, 0)"
);
check("§4.8 modal is at most 512px wide", read.modalMaxWidth, "512px");
check(
  "§4.8 modal is the viewport minus 32px tall",
  read.modalMaxHeight,
  "868px"
);
check("§4.8 backdrop is black at 50%", read.backdrop, "rgba(0, 0, 0, 0.5)");
check("§4.9 dropdown sits 4px from its trigger", read.dropdownGap, "4px");
check(
  "§4.9 dropdown is at least as wide as its trigger",
  read.dropdownWidth,
  read.triggerWidth
);
check("§4.10 tooltip is at most 320px wide", read.tooltipMax, "320px");
check("§4.10 tooltip sits 4px from its trigger", read.tooltipGap, "4px");
check("§4.10 tooltip padding is 5px 10px", read.tooltipPad, "5px 10px");
check(
  "§4.12 placeholder reads the muted text token",
  read.placeholder,
  read.tokens.textMuted
);
check(
  "§4.12 the select arrow's size",
  read.selectImage,
  printed(/at the end,\n([\d.]+px by [\d.]+px)/)?.replace(" by ", " ")
);
check(
  "§4.12 select arrow sits 12px from the edge",
  read.selectPosition,
  "calc(100% - 12px) 50%"
);
check("§4.12 select keeps 28px of end padding", read.selectPadding, "28px");
check(
  "§4.13 addon reads the muted background",
  read.addonBg,
  read.tokens.bgMuted
);
check(
  "§4.14 an unchecked control reads the border token",
  read.cbBorder,
  read.tokens.border
);
check("§4.15 a checkpoint keeps 16px below it", read.cpFirstBelow, "16px");
check("§4.15 the last one keeps none", read.cpLastBelow, "0px");
check("§4.15 the rule starts 4px below the icon", read.ruleTop, "28.5px");
check("§4.15 and ends 4px above the next", read.ruleBottom, "4px");
check("§4.15 the rule is centered on the icon", read.ruleStart, "12.25px");
check(
  "§4.15 the rule is 1px in the border token",
  `${read.ruleWidth} ${read.ruleColor}`,
  `1px ${read.tokens.border}`
);
check("§4.15 the last checkpoint draws no rule", read.lastRule2, "none");
check("§4.16 outer corners keep the radius", read.groupOuter, "6px");
check("§4.16 inner corners are squared", read.groupInner, "0px");
check("§4.17 float sits 24px from the bottom", read.floatBottom, "24px");
check("§4.17 float sits 24px from the start", read.floatStart, "24px");

/* --- every class the document names must exist --------------------------- */

// The variant tables name classes, and a document that invents one is worse
// than a document that omits it: whoever rebuilds this has no way to tell.
// Token names (`--pui-…`) and attributes (`data-pui-…`) are skipped by the
// lookbehind.
console.log("\nclasses named in the document");
const shipped = readFileSync("dist/perfectui.css", "utf8");
const named = [...new Set(doc.match(/(?<![-\w])pui-[a-z0-9-]+/g) ?? [])].sort();
const missing = named.filter((name) => !shipped.includes(`.${name}`));
if (missing.length === 0) {
  console.log(`  ok  all ${named.length} exist in the built CSS`);
} else {
  for (const name of missing)
    console.log(`FAIL  .${name} is not in the built CSS`);
  fails.push(
    `the document names ${missing.length} class(es) the library does not ship: ${missing.join(", ")}`
  );
}

// And the other direction: a class that ships and is never named is a variant
// nobody rebuilding this would know about.
const defined = [
  ...new Set((shipped.match(/\.pui-[a-z0-9-]+/g) ?? []).map((c) => c.slice(1)))
];
const unnamed = defined.filter((name) => !named.includes(name)).sort();
if (unnamed.length === 0) {
  console.log(
    `  ok  all ${defined.length} shipped classes are named somewhere`
  );
} else {
  for (const name of unnamed)
    console.log(`FAIL  .${name} ships but the document never names it`);
  fails.push(
    `${unnamed.length} shipped class(es) are missing from the document: ${unnamed.join(", ")}`
  );
}

/* --- every component shows where it is used ------------------------------ */

console.log("\nexamples");
const sections = doc.split(/\n(?=### 4\.\d+ )/).slice(1);
const bare = sections
  .filter((section) => !section.includes("**Example: "))
  .map((section) => section.match(/^### (4\.\d+)/)[1]);
check("every component section has an example", bare.join(", "), "");

// The panel has no row spacing of its own, so a dropdown example without a
// list inside it teaches the one layout that looks broken.
const panels =
  doc.match(/<div class="pui-dropdown[^"]*"[^>]*>\s*<[^>]+>/g) ?? [];
check(
  "every dropdown example opens straight into a list",
  panels.length > 0 &&
    panels.every((panel) => /<(ul|ol) class="pui-list/.test(panel)),
  true
);

// An icon the examples use with no row in 1.6 leaves the reader without the
// file to fetch, in either set.
const listed = [...doc.matchAll(/^\| `icon-([a-z0-9-]+)` \|/gm)].map(
  (row) => row[1]
);
const drawn = [
  ...new Set(
    [...doc.matchAll(/class="icon icon-([a-z0-9-]+)"/g)].map((use) => use[1])
  )
];
check(
  "every icon in the examples has a file in 1.6",
  drawn.filter((name) => !listed.includes(name)).join(", "),
  ""
);
check(
  "and 1.6 lists no icon the examples do not use",
  listed.filter((name) => !drawn.includes(name)).join(", "),
  ""
);

/* --- section 7: the contrast claims ------------------------------------- */

const luminance = (hex) => {
  const channel = (c) => {
    const v = parseInt(hex.slice(1 + c * 2, 3 + c * 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

console.log("\nsection 7 — contrast");
// Recompute what the document prints, rather than checking a range: the
// sentence is generated, so what matters is that its numbers are true.
for (const role of ["theme", "success", "warn"]) {
  const said = printed(new RegExp(`([\\d.]+):1 for ${role}`));
  const c = combos.light[`solid/${role}`].rest;
  check(
    `§7 light solid ${role}`,
    ratio(c["background-color"].hex, c.color.hex).toFixed(2),
    said
  );
  if (said && Number(said) >= 4.5) {
    fails.push(`§7 prints ${said}:1 for ${role}, which is not below AA`);
  }
}

const textCases = [];
for (const mode of ["light", "dark"]) {
  for (const role of [
    "theme",
    "success",
    "error",
    "warn",
    "muted",
    "surface",
    "inverse"
  ]) {
    const over = mode === "light" ? palette.light.bg.hex : palette.dark.bg.hex;
    const soft = combos[mode][`soft/${role}`].rest;
    textCases.push({
      name: `${mode} soft ${role} text on its tint`,
      value: ratio(soft.color.hex, soft["background-color"].over ?? over)
    });
    textCases.push({
      name: `${mode} link ${role} text on the page`,
      value: ratio(combos[mode][`link/${role}`].rest.color.hex, over)
    });
  }
}
// The page tokens pair up too: muted text sits on the muted background in the
// card header and the addon.
for (const mode of ["light", "dark"]) {
  for (const bg of ["bg", "bg-muted"]) {
    textCases.push({
      name: `${mode} muted text on ${bg}`,
      value: ratio(palette[mode]["text-muted"].hex, palette[mode][bg].hex)
    });
  }
}
const degenerate = ["light soft surface", "dark soft surface"];
const belowAA = textCases.filter(
  (c) => c.value < 4.5 && !degenerate.some((d) => c.name.startsWith(d))
);
if (belowAA.length === 0) {
  console.log(
    `  ok  §7 every text use stays at or above 4.5:1 (${textCases.length} checked)`
  );
} else {
  for (const c of belowAA)
    console.log(`FAIL  ${c.name} is ${c.value.toFixed(2)}:1`);
  fails.push(
    `§7 claims every text use is at or above 4.5:1; ${belowAA.length} are not`
  );
}

await page.context().browser().close();

console.log(
  fails.length === 0
    ? "\nevery claim in the document holds."
    : `\n${fails.length} claim(s) do not hold:\n\n${fails.join("\n\n")}\n`
);
process.exit(fails.length === 0 ? 0 : 1);
