import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as url from "url";

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: url.fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "perfectui"
    },
    rollupOptions: {
      output: { assetFileNames: "perfectui.css" }
    }
  }
});
