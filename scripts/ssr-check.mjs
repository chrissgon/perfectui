// Every JS entry must import cleanly where there is no DOM (ARCHITECTURE.md §12).
import { readdirSync } from "node:fs";

const entries = [
  "../dist/js/index.js",
  "../dist/js/mode.js",
  ...readdirSync("dist/js/fallbacks").map((f) => `../dist/js/fallbacks/${f}`)
];

const loaded = await Promise.all(entries.map((entry) => import(entry)));

const { getMode } = loaded[1];
if (getMode() !== "system")
  throw new Error("getMode() should be 'system' without a DOM");

console.log(`ssr: ${entries.length} entries imported in Node, no DOM required`);
