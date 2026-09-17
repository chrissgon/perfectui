import { test, expect } from "@playwright/test";

const THEME_LIGHT = "rgb(0, 146, 205)";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tests/fixtures/styles.html");
});

test("a style class reads the color the color class sets", async ({ page }) => {
  await expect(page.locator("#solid")).toHaveCSS("background-color", THEME_LIGHT);

  // soft paints a tint of the same color, not the color itself. color-mix()
  // computes in the space it was written in, so the value is not rgb().
  const soft = await page.locator("#soft").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(soft).not.toBe(THEME_LIGHT);
  expect(soft).not.toBe("rgba(0, 0, 0, 0)");

  await expect(page.locator("#outline")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(page.locator("#outline")).toHaveCSS("border-color", THEME_LIGHT);
});

test("unlayered author CSS wins over every library layer", async ({ page }) => {
  // through the contract
  await expect(page.locator("#branded")).toHaveCSS("background-color", "rgb(102, 51, 153)");
  // and head on, with no !important
  await expect(page.locator("#overridden")).toHaveCSS("background-color", "rgb(1, 2, 3)");
});

test("aria-invalid colors the control and its message", async ({ page }) => {
  const border = await page.locator("#input").evaluate((el) => getComputedStyle(el).borderColor);
  const message = await page.locator("#msg").evaluate((el) => getComputedStyle(el).color);
  expect(border).toBe(message);
  expect(border).not.toBe("rgb(0, 0, 0)");
});

test("a group overlaps its children's borders", async ({ page }) => {
  const margin = await page
    .locator("#group-second")
    .evaluate((el) => getComputedStyle(el).marginInlineStart);
  expect(margin).toBe("-1px");
});

test("the table's last row has no rule, but the body keeps its own", async ({ page }) => {
  await expect(page.locator("#last-body")).toHaveCSS("border-bottom-width", "1px");
  await expect(page.locator("#foot")).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator("#foot")).toHaveCSS("border-top-width", "1px");
});
