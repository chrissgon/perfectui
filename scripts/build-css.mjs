// Builds native CSS without preprocessing: bundles @imports and minifies.
// Output layout: see ARCHITECTURE.md §11.
import { bundle } from "lightningcss";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = "src/css";
const OUT = "dist";

function build(input, output) {
  const { code } = bundle({ filename: input, minify: true });
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, code);
  console.log(`css  ${output}`);
}

build(join(SRC, "index.css"), join(OUT, "perfectui.css"));
build(join(SRC, "core.css"), join(OUT, "css/core.css"));

for (const file of readdirSync(join(SRC, "components"))) {
  if (!file.endsWith(".css")) continue;
  build(join(SRC, "components", file), join(OUT, "css/components", file));
}
