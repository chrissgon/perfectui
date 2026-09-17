import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tests/fixtures/mode.html");
});

const background = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("no attribute follows the system", async ({ page }) => {
  await expect(page.locator("html")).not.toHaveAttribute("data-pui-mode", /.*/);
  expect(await background(page)).toBe("rgb(255, 255, 255)");

  await page.emulateMedia({ colorScheme: "dark" });
  expect(await background(page)).toBe("rgb(0, 0, 0)");
});

test("setMode writes the attribute and the cookie", async ({ page, context }) => {
  await page.evaluate(() => window.pui.setMode("dark"));

  await expect(page.locator("html")).toHaveAttribute("data-pui-mode", "dark");
  expect(await background(page)).toBe("rgb(0, 0, 0)");

  const cookie = (await context.cookies()).find((c) => c.name === "pui-mode");
  expect(cookie?.value).toBe("dark");
  expect(await page.evaluate(() => window.pui.getMode())).toBe("dark");
});

test("setMode('system') clears both, even against the system preference", async ({ page, context }) => {
  await page.evaluate(() => window.pui.setMode("dark"));
  await page.evaluate(() => window.pui.setMode("system"));

  await expect(page.locator("html")).not.toHaveAttribute("data-pui-mode", /.*/);
  expect((await context.cookies()).find((c) => c.name === "pui-mode")).toBeUndefined();
  expect(await page.evaluate(() => window.pui.getMode())).toBe("system");
  expect(await background(page)).toBe("rgb(255, 255, 255)");
});

test("an explicit mode beats the system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => window.pui.setMode("light"));
  expect(await background(page)).toBe("rgb(255, 255, 255)");
});
