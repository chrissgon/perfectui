import { test, expect, type Page } from "@playwright/test";

// docs/engineering/plans/indeterminate-late-markup.md, ADR-0001 (option D): a
// checkbox whose `indeterminate` attribute enters the document after load shows
// the mixed state without any interaction, through the real loader and
// stylesheet. When a page disables animations, today's listeners still apply it.
const LATE = `<input type="checkbox" class="pui-checkbox" id="late" indeterminate />`;

async function open(page: Page, css = ""): Promise<void> {
  await page.goto("/tests/fixtures/overlays.html");
  if (css) await page.addStyleTag({ content: css });
  // The fallback module is fetched after the loader runs.
  await expect(page.locator("#indeterminate-box")).toHaveJSProperty(
    "indeterminate",
    true
  );
}

async function insert(page: Page, html: string, hidden = false): Promise<void> {
  await page.evaluate(
    ([markup, hide]) => {
      const host = document.createElement("div");
      host.id = "host";
      if (hide) host.style.display = "none";
      host.innerHTML = markup;
      document.body.append(host);
    },
    [html, hidden] as const
  );
}

test("a checkbox inserted after load is mixed with no interaction", async ({
  page
}) => {
  await open(page);
  await insert(page, LATE);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
  const image = await page
    .locator("#late")
    .evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(image).toContain("linear-gradient");
});

test("a checkbox inserted hidden is mixed once it is shown", async ({
  page
}) => {
  await open(page);
  await insert(page, LATE, true);
  await page.evaluate(
    () => (document.getElementById("host")!.style.display = "block")
  );
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
});

test("a node replaced by a re-render is mixed again", async ({ page }) => {
  await open(page);
  await insert(page, LATE);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
  // What a framework does on re-render: a new element with the same markup.
  await page.evaluate(
    (markup) => (document.getElementById("host")!.innerHTML = markup),
    LATE
  );
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
});

test("reduced motion does not stop it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await insert(page, LATE);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
});

test("the common reduced-motion reset does not stop it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(
    page,
    "@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; } }"
  );
  await insert(page, LATE);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
});

test("with every animation disabled, the next interaction still applies it", async ({
  page
}) => {
  // The case ADR-0001 accepts: `animation: none !important` removes the signal,
  // and the checkbox behaves as before the change.
  await open(page, "* { animation: none !important; }");
  await insert(page, LATE);
  await page.waitForTimeout(200);
  expect(
    await page
      .locator("#late")
      .evaluate((el) => (el as HTMLInputElement).indeterminate)
  ).toBe(false);
  await page.mouse.click(1, 1);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
});

test("the reader's first change clears the mixed state of a late checkbox", async ({
  page
}) => {
  await open(page);
  await insert(page, LATE);
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", true);
  await page.locator("#late").click();
  await expect(page.locator("#late")).toHaveJSProperty("indeterminate", false);
  expect(
    await page
      .locator("#late")
      .evaluate((el) => el.hasAttribute("indeterminate"))
  ).toBe(false);
});

test("a checkbox without the attribute is never made mixed", async ({
  page
}) => {
  await open(page);
  await insert(
    page,
    `<input type="checkbox" class="pui-checkbox" id="plain" />`
  );
  await page.mouse.click(1, 1);
  await page.waitForTimeout(200);
  expect(
    await page
      .locator("#plain")
      .evaluate((el) => (el as HTMLInputElement).indeterminate)
  ).toBe(false);
});
