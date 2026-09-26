import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * Overlays whose trigger stays on screen while the page scrolls, and triggers at
 * the viewport's edges. Plan: perfectui-doc
 * docs/engineering/plans/header-menu-scroll.md (Root cause, What a fix must
 * preserve). WebKit flipped a dropdown opened from a sticky header above its
 * trigger once the page had scrolled past about one viewport.
 */

const VIEWPORT = { width: 390, height: 844 };

async function open(page: Page, trigger: string, panel: string) {
  await page.setViewportSize(VIEWPORT);
  await page.goto("/tests/fixtures/sticky-overlays.html");
  await page.waitForLoadState("networkidle");
  await page.locator(trigger).click();
  await expect(page.locator(panel)).toBeVisible();
}

const box = async (locator: Locator) => (await locator.boundingBox())!;

async function scrollTo(page: Page, y: number) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await expect
    .poll(() => page.evaluate(() => Math.round(window.scrollY)))
    .toBe(y);
}

for (const y of [600, 1200]) {
  test(`a dropdown opened from a sticky header stays under its trigger after scrolling ${y} px`, async ({
    page
  }) => {
    await open(page, "#open-header-menu", "#header-menu");
    const trigger = page.locator("#open-header-menu");
    const menu = page.locator("#header-menu");
    const gap =
      (await box(menu)).y -
      ((await box(trigger)).y + (await box(trigger)).height);

    await scrollTo(page, y);

    await expect
      .poll(async () =>
        Math.round(
          (await box(menu)).y -
            ((await box(trigger)).y + (await box(trigger)).height)
        )
      )
      .toBe(Math.round(gap));
  });
}

test("a tooltip on a sticky header keeps its side after scrolling past a viewport", async ({
  page
}) => {
  await page.setViewportSize(VIEWPORT);
  await page.goto("/tests/fixtures/sticky-overlays.html");
  await page.waitForLoadState("networkidle");
  const trigger = page.locator("#open-header-tip");
  const tip = page.locator("#header-tip");

  await trigger.hover();
  await expect(tip).toBeVisible({ timeout: 3000 });
  const below =
    (await box(tip)).y >= (await box(trigger)).y + (await box(trigger)).height;

  await scrollTo(page, 1200);
  await trigger.hover();

  await expect
    .poll(
      async () =>
        (await box(tip)).y >=
        (await box(trigger)).y + (await box(trigger)).height
    )
    .toBe(below);
});

test("a dropdown with no room below its trigger still opens above it", async ({
  page
}) => {
  await open(page, "#open-bottom-menu", "#bottom-menu");
  const trigger = await box(page.locator("#open-bottom-menu"));
  const menu = await box(page.locator("#bottom-menu"));
  expect(menu.y + menu.height).toBeLessThanOrEqual(trigger.y);
});

test("a dropdown with no room on its end side still flips to the start side", async ({
  page
}) => {
  await open(page, "#open-end-menu", "#end-menu");
  const trigger = await box(page.locator("#open-end-menu"));
  const menu = await box(page.locator("#end-menu"));
  expect(menu.x + menu.width).toBeLessThanOrEqual(trigger.x);
});
