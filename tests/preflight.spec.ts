import { test, expect } from "@playwright/test";

// Under a reset in a lower layer (Tailwind v4's Preflight sets `margin: 0` on every element),
// a component must not rely on the browser's default for a property it needs: the reset is
// author CSS, so it beats the browser even though it loses to the library's layer.
test("an open modal stays centred under a reset that zeroes margins", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/tests/fixtures/preflight.html");
  await page.evaluate(() =>
    (document.getElementById("modal") as HTMLDialogElement).showModal()
  );
  const box = await page.locator("#modal").boundingBox();
  expect(Math.abs(box!.x + box!.width / 2 - 640)).toBeLessThan(2);
  expect(Math.abs(box!.y + box!.height / 2 - 400)).toBeLessThan(2);
});
