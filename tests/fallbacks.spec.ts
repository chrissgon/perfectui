import { test, expect, type Page } from "@playwright/test";

/**
 * The same specs run on Chromium, which has every feature, and on WebKit, which
 * has none of the recent ones. Identical assertions in both is the whole point:
 * the markup never changes, only who does the work.
 */

async function gotoOverlays(page: Page): Promise<string[]> {
  const downloaded: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("/fallbacks/")) downloaded.push(url.split("/").pop()!);
  });

  await page.goto("/tests/fixtures/overlays.html");
  await page.waitForLoadState("networkidle");
  return downloaded;
}

test("only the missing fallbacks are downloaded", async ({
  page,
  browserName
}) => {
  const downloaded = await gotoOverlays(page);

  // No native attribute exists for this one, so every browser loads it.
  expect(downloaded).toContain("checkbox-indeterminate.js");

  if (browserName === "chromium") {
    expect(downloaded).toEqual(["checkbox-indeterminate.js"]);
  } else {
    // As of WebKit 26.6 the only feature it is missing is interestfor. The
    // other fallbacks exist for older versions and must stay undownloaded here.
    expect(downloaded).toContain("interest-for.js");
    expect(downloaded).not.toContain("command-for.js");
  }
});

test("commandfor opens and closes the modal", async ({ page }) => {
  await gotoOverlays(page);
  const modal = page.locator("#modal");

  await expect(modal).toBeHidden();
  await page.locator("#open-modal").click();
  await expect(modal).toBeVisible();

  await page.locator("#close-modal").click();
  await expect(modal).toBeHidden();
});

test("closedby=any dismisses the modal from outside", async ({ page }) => {
  await gotoOverlays(page);
  const modal = page.locator("#modal");

  await page.locator("#open-modal").click();
  await expect(modal).toBeVisible();

  await page.mouse.click(5, 5);
  await expect(modal).toBeHidden();
});

test("a dropdown opens below its trigger", async ({ page }) => {
  await gotoOverlays(page);
  await page.locator("#open-menu").click();

  const menu = page.locator("#menu");
  await expect(menu).toBeVisible();

  const trigger = (await page.locator("#open-menu").boundingBox())!;
  const panel = (await menu.boundingBox())!;
  expect(panel.y).toBeGreaterThanOrEqual(trigger.y + trigger.height);
  expect(Math.abs(panel.x - trigger.x)).toBeLessThan(4);
});

test("a direction class moves the dropdown to the other side", async ({
  page
}) => {
  await gotoOverlays(page);
  await page.locator("#open-menu-top").click();

  const menu = page.locator("#menu-top");
  await expect(menu).toBeVisible();

  const trigger = (await page.locator("#open-menu-top").boundingBox())!;
  const panel = (await menu.boundingBox())!;
  expect(panel.y + panel.height).toBeLessThanOrEqual(trigger.y + 1);
});

test("an alignment class moves the dropdown along the other axis", async ({
  page
}) => {
  await gotoOverlays(page);
  await page.locator("#open-menu-end").click();
  await expect(page.locator("#menu-end")).toBeVisible();

  const trigger = (await page.locator("#open-menu-end").boundingBox())!;
  const panel = (await page.locator("#menu-end").boundingBox())!;

  // A panel is never narrower than its trigger, so alignment only shows when
  // it is wider: the far edges line up while the near ones do not.
  expect(panel.width).toBeGreaterThan(trigger.width);
  expect(
    Math.abs(panel.x + panel.width - (trigger.x + trigger.width))
  ).toBeLessThan(2);
});

test("interestfor shows a tooltip above its trigger on hover", async ({
  page
}) => {
  await gotoOverlays(page);
  await page.locator("#open-tip").hover();

  const tip = page.locator("#tip");
  await expect(tip).toBeVisible({ timeout: 3000 });

  const trigger = (await page.locator("#open-tip").boundingBox())!;
  const bubble = (await tip.boundingBox())!;
  expect(bubble.y + bubble.height).toBeLessThanOrEqual(trigger.y + 1);
});

test("the indeterminate attribute sets the property", async ({ page }) => {
  await gotoOverlays(page);
  const box = page.locator("#indeterminate-box");
  await expect(box).toHaveJSProperty("indeterminate", true);

  // Once the user acts, the attribute has served its purpose.
  await box.click();
  await expect(box)
    .toHaveAttribute("indeterminate", /.*/)
    .catch(() => {});
  expect(await box.evaluate((el) => el.hasAttribute("indeterminate"))).toBe(
    false
  );
});

test("components inserted after load need no re-initialisation", async ({
  page
}) => {
  await gotoOverlays(page);

  await page.evaluate(() => {
    document.getElementById("dynamic")!.innerHTML = `
      <button class="pui-btn pui-solid pui-theme" id="late-open"
              commandfor="late-modal" command="show-modal">Late</button>
      <dialog class="pui-modal" id="late-modal" closedby="any">
        <div class="pui-card"><div class="pui-card-content">Late modal</div></div>
      </dialog>`;
  });

  await page.locator("#late-open").click();
  await expect(page.locator("#late-modal")).toBeVisible();
});
