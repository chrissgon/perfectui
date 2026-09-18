import { test, expect } from "@playwright/test";

const THEME_LIGHT = "rgb(0, 146, 205)";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tests/fixtures/styles.html");
});

test("a style class reads the color the color class sets", async ({ page }) => {
  await expect(page.locator("#solid")).toHaveCSS(
    "background-color",
    THEME_LIGHT
  );

  // soft paints a tint of the same color, not the color itself. color-mix()
  // computes in the space it was written in, so the value is not rgb().
  const soft = await page
    .locator("#soft")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(soft).not.toBe(THEME_LIGHT);
  expect(soft).not.toBe("rgba(0, 0, 0, 0)");

  await expect(page.locator("#outline")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)"
  );
  await expect(page.locator("#outline")).toHaveCSS("border-color", THEME_LIGHT);
});

test("a derived neutral stays neutral", async ({ page }) => {
  // The derivations mix in oklab, not oklch. With a hue component in play,
  // Chrome serializes a near-neutral mix with `none` for the hue, which paints
  // as hue 0: the muted grey came out pink. The token is bluish, so its text
  // tone must keep more blue than red.
  //
  // The mix computes to `oklab(...)`, whose three numbers are lightness and two
  // axes, not channels — reading them as RGB is what made the first version of
  // this test fail. A canvas hands the question back to the engine and answers
  // in the sRGB the screen actually gets.
  const [red, , blue] = await page.locator("#soft-muted").evaluate((el) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    context.fillStyle = getComputedStyle(el).color;
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data];
  });
  expect(blue).toBeGreaterThan(red);
});

test("pui-highlighted paints the open item only", async ({ page }) => {
  // The modifier exists because `[open]` cannot be composed: it has to be a
  // selector. So the pair of assertions is the whole feature.
  await expect(page.locator("#open-item")).toHaveCSS(
    "background-color",
    "rgb(243, 244, 246)"
  );
  await expect(page.locator("#closed-item")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)"
  );
});

test("unlayered author CSS wins over every library layer", async ({ page }) => {
  // through the contract
  await expect(page.locator("#branded")).toHaveCSS(
    "background-color",
    "rgb(102, 51, 153)"
  );
  // and head on, with no !important
  await expect(page.locator("#overridden")).toHaveCSS(
    "background-color",
    "rgb(1, 2, 3)"
  );
});

test("aria-invalid colors the control and its message", async ({ page }) => {
  const border = await page
    .locator("#input")
    .evaluate((el) => getComputedStyle(el).borderColor);
  const message = await page
    .locator("#msg")
    .evaluate((el) => getComputedStyle(el).color);
  expect(border).toBe(message);
  expect(border).not.toBe("rgb(0, 0, 0)");
});

test("focus rings come from the library, not from the browser", async ({
  page
}) => {
  // The class is on the <details> while the <summary> is what takes focus, so
  // this one is easy to lose: the browser's own ring then shows through.
  await page.locator("#summary").focus();
  await expect(page.locator("#summary")).toHaveCSS(
    "outline-color",
    THEME_LIGHT
  );
  await expect(page.locator("#summary")).toHaveCSS("outline-style", "solid");
  // The ring takes the shape of the element it surrounds, and a square ring
  // around a rounded component is what gave this away the first time.
  await expect(page.locator("#summary")).toHaveCSS("border-radius", "5px");
  // The summary sits inside the item's border, so its offset carries that
  // border width too, which is what keeps the gap equal to every other
  // component's.
  await expect(page.locator("#summary")).toHaveCSS("outline-offset", "3px");
});

test("a group overlaps its children's borders", async ({ page }) => {
  const margin = await page
    .locator("#group-second")
    .evaluate((el) => getComputedStyle(el).marginInlineStart);
  expect(margin).toBe("-1px");
});

test("the table's last row has no rule, but the body keeps its own", async ({
  page
}) => {
  await expect(page.locator("#last-body")).toHaveCSS(
    "border-bottom-width",
    "1px"
  );
  await expect(page.locator("#foot")).toHaveCSS("border-bottom-width", "0px");
  await expect(page.locator("#foot")).toHaveCSS("border-top-width", "1px");
});
