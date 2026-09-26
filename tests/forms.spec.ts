import { test, expect } from "@playwright/test";

// docs/engineering/plans/radio-indeterminate-fill.md: `:indeterminate` also
// matches every radio of a group with nothing checked (and a radio with no
// name), so the shared checked rule filled them. toHaveCSS retries, which
// waits out the controls' 150 ms colour transition.
const THEME = "rgb(0, 146, 205)";
const SUCCESS = "rgb(22, 163, 74)";
const EMPTY = "rgba(0, 0, 0, 0)";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tests/fixtures/forms.html");
});

test.describe("radio", () => {
  test("a group with nothing checked shows empty rings", async ({ page }) => {
    await expect(page.locator("#radio-none-a")).toHaveCSS(
      "background-color",
      EMPTY
    );
    await expect(page.locator("#radio-none-b")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });

  test("a radio with no name is empty until checked", async ({ page }) => {
    await expect(page.locator("#radio-lone")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });

  test("a checked radio is filled in its colour, and its unchecked sibling is not", async ({
    page
  }) => {
    await expect(page.locator("#radio-checked")).toHaveCSS(
      "background-color",
      THEME
    );
    await expect(page.locator("#radio-success")).toHaveCSS(
      "background-color",
      SUCCESS
    );
    await expect(page.locator("#radio-unchecked")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });
});

test.describe("checkbox", () => {
  test("checked and mixed are filled, unchecked is not", async ({ page }) => {
    await expect(page.locator("#checkbox-checked")).toHaveCSS(
      "background-color",
      THEME
    );
    await expect(page.locator("#checkbox-mixed")).toHaveCSS(
      "background-color",
      THEME
    );
    await expect(page.locator("#checkbox-unchecked")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });

  test("the mixed state draws the dash", async ({ page }) => {
    const image = await page
      .locator("#checkbox-mixed")
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(image).toContain("linear-gradient");
  });
});

test.describe("switch", () => {
  test("checked is filled, unchecked is not", async ({ page }) => {
    await expect(page.locator("#switch-checked")).toHaveCSS(
      "background-color",
      THEME
    );
    await expect(page.locator("#switch-unchecked")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });

  test("a switch has no mixed state: indeterminate leaves it unfilled", async ({
    page
  }) => {
    await expect(page.locator("#switch-mixed")).toHaveCSS(
      "background-color",
      EMPTY
    );
  });
});
