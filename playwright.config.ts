import { defineConfig, devices } from "@playwright/test";

const PORT = 8139;

/**
 * Two projects on purpose (ARCHITECTURE.md §12): Chromium has every feature the
 * library uses, WebKit has none of the recent ones. The same specs run on both,
 * which is the promise the fallbacks exist to keep — same markup, same
 * behavior, with the browser doing the work whenever it can.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry"
  },
  projects: [
    { name: "chromium (native path)", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit (fallback path)", use: { ...devices["Desktop Safari"] } }
  ],
  /**
   * The server only serves. Building belongs to the `test` script, because a
   * reused server would otherwise skip the build and quietly test a stale dist
   * — which is exactly what happened while writing these suites.
   */
  webServer: {
    command: `PORT=${PORT} node scripts/serve.mjs`,
    url: `http://localhost:${PORT}/tests/fixtures/overlays.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000
  }
});
