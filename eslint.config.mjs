import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/", "node_modules/", "**/*.d.ts"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ["**/*.mjs", "vite.config.ts"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node
    }
  }
]);
