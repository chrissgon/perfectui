import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "perfectui",
    },
    rollupOptions: {
      output: { assetFileNames: "perfectui.css" },
    },
  },
});
