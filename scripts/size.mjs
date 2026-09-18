// Prints gzip size of every dist file and compares totals with the 0.23.0 baseline.
import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASELINE = { css: 6005, js: 1587 }; // 0.23.0 gzip bytes (perfectui.css, perfectui.js)

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk("dist").filter((f) => /\.(css|js)$/.test(f));
const rows = files.map((f) => ({
  file: f,
  gzip: gzipSync(readFileSync(f), { level: 9 }).length
}));
for (const r of rows) console.log(`${String(r.gzip).padStart(6)} B  ${r.file}`);

const full = (name) =>
  rows.find((r) => r.file === join("dist", name))?.gzip ?? 0;
const loader =
  rows.find((r) => r.file === join("dist", "js/index.js"))?.gzip ?? 0;
console.log(
  `\nperfectui.css ${full("perfectui.css")} B (baseline ${BASELINE.css} B)`
);
console.log(`js/index.js   ${loader} B (baseline ${BASELINE.js} B)`);
