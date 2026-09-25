// Reproduction for docs/engineering/plans/radio-indeterminate-fill.md (eng-root-cause).
// Builds nothing: run `bun run build` first, then `node tests/manual/radio-indeterminate.repro.mjs`.
/* global document, getComputedStyle -- these run inside the page, through page.evaluate */
import { readFileSync } from "node:fs";
import { chromium, webkit } from "playwright";

const css = readFileSync(
  new URL("../../dist/perfectui.css", import.meta.url),
  "utf8"
);
const page = `<style>${css}</style>
<p id="none"><input type="radio" class="pui-radio" name="a"><input type="radio" class="pui-radio" name="a"></p>
<p id="one"><input type="radio" class="pui-radio" name="b" checked><input type="radio" class="pui-radio" name="b"></p>
<input id="lone" type="radio" class="pui-radio">
<input id="box" type="checkbox" class="pui-checkbox">
<input id="mixed" type="checkbox" class="pui-checkbox">
<input id="sw" type="checkbox" class="pui-switch">`;

const cases = {
  "radio, group with none checked": "#none input",
  "radio, lone (no name)": "#lone",
  "radio, unchecked, group has one checked": "#one input:not(:checked)",
  "checkbox, unchecked": "#box",
  "checkbox, indeterminate = true": "#mixed",
  "switch, indeterminate = true": "#sw"
};

for (const [name, engine] of [
  ["chromium", chromium],
  ["webkit", webkit]
]) {
  const browser = await engine.launch();
  const tab = await browser.newPage();
  await tab.setContent(page);
  await tab.evaluate(() => {
    document.querySelector("#mixed").indeterminate = true;
    document.querySelector("#sw").indeterminate = true;
  });
  // The controls fade colour over 150 ms; read the settled value.
  await tab.waitForTimeout(400);
  for (const [label, selector] of Object.entries(cases)) {
    const [matches, background] = await tab.$eval(selector, (el) => [
      el.matches(":indeterminate"),
      getComputedStyle(el).backgroundColor
    ]);
    console.log(`${name}\t${label}\t:indeterminate=${matches}\t${background}`);
  }
  await browser.close();
}
