// Reproduction for docs/engineering/plans/indeterminate-late-markup.md (eng-root-cause).
// Run `bun run build` first, then `node tests/manual/indeterminate-late.repro.mjs`.
/* global document, getComputedStyle -- these run inside the page, through page.evaluate */
import { spawn } from "node:child_process";
import { chromium, webkit } from "playwright";

const PORT = 8141;
const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: "ignore"
});
await new Promise((r) => setTimeout(r, 800));

const insert = (html) => {
  const host = document.createElement("div");
  host.innerHTML = html;
  document.body.append(host);
};
const state = () => {
  const box = document.querySelector("#late");
  return {
    property: box.indeterminate,
    image: getComputedStyle(box).backgroundImage.slice(0, 15)
  };
};

try {
  for (const [name, engine] of [
    ["chromium", chromium],
    ["webkit", webkit]
  ]) {
    const browser = await engine.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/tests/fixtures/overlays.html`);
    await page.waitForLoadState("networkidle");
    const atLoad = await page.$eval(
      "#indeterminate-box",
      (el) => el.indeterminate
    );
    await page.evaluate(
      insert,
      `<input type="checkbox" class="pui-checkbox" id="late" indeterminate>`
    );
    await page.waitForTimeout(500);
    const inserted = await page.evaluate(state);
    await page.mouse.click(5, 5); // a pointerdown anywhere else on the page
    const afterPointer = await page.evaluate(state);
    console.log(
      `${name}\tin the page at load: ${atLoad}\tinserted later: ${JSON.stringify(inserted)}\tafter a click elsewhere: ${JSON.stringify(afterPointer)}`
    );
    await browser.close();
  }
} finally {
  server.kill();
}
