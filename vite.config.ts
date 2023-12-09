import { defineConfig } from "vite";
import * as url from "url";

export default defineConfig({
  build: {
    lib: {
      entry: url.fileURLToPath(new URL("src/main.ts", import.meta.url)),
      name: "perfectui",
    },
    rollupOptions: {
      output: { assetFileNames: "perfectui.css" },
    },
  },
});
