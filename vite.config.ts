import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import { readdirSync, existsSync } from "fs";

// JS only. CSS is built by scripts/build-css.mjs (no preprocessing). See ARCHITECTURE.md §11.
const src = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const fallbacksDir = src("src/js/fallbacks");
const fallbacks = existsSync(fallbacksDir)
  ? Object.fromEntries(
      readdirSync(fallbacksDir)
        .filter((f) => f.endsWith(".ts"))
        .map((f) => [
          `fallbacks/${f.replace(/\.ts$/, "")}`,
          `${fallbacksDir}/${f}`
        ])
    )
  : {};

export default defineConfig({
  plugins: [
    dts({ outDir: "dist/types", entryRoot: "src/js", include: ["src/js"] })
  ],
  build: {
    target: "es2022",
    emptyOutDir: true,
    lib: {
      entry: {
        index: src("src/js/index.ts"),
        mode: src("src/js/mode.ts"),
        ...fallbacks
      },
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/chunks/[name]-[hash].js"
      }
    }
  }
});
