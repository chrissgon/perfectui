import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    "**/dist/",
    "**/node_modules/",
    "**/index.d.ts",
    "**/.env",
    "**/index.html",
    "**/.npmrc"
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended"
      )
    ),

    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".ts"]
        }
      }
    }
  }
]);
