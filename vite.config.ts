import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import ts from "typescript";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        moduleResolution: ts.ModuleResolutionKind.Bundler
      }
    })
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "perfectui"
    },
    rollupOptions: {
      output: { assetFileNames: "perfectui.css" }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `;`
      }
    }
  }
});
