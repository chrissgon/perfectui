// Every import specifier the documentation promises has to resolve through the
// package's own exports map. The Playwright suites load dist by relative path,
// so they cannot catch a broken subpath: `./components/*` mapping to `*.css`
// turned the documented `components/button.css` into `button.css.css`, and
// nothing noticed until the package was installed.
//
// Self-referencing works because the package has a name and an exports map.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SPECIFIER = /@chrissgon\/perfectui(?:\/[\w./-]+)?/g;

const sources = [
  "README.md",
  "MIGRATION.md",
  ...readdirSync("docs")
    .filter((f) => f.endsWith(".md"))
    .map((f) => `docs/${f}`)
];

const specifiers = new Set();
for (const file of sources) {
  for (const match of readFileSync(file, "utf8").matchAll(SPECIFIER)) {
    // the CDN urls are not package specifiers
    if (!match[0].includes("dist/")) specifiers.add(match[0]);
  }
}

const failures = [];
for (const specifier of [...specifiers].sort()) {
  try {
    const resolved = fileURLToPath(import.meta.resolve(specifier));
    if (!existsSync(resolved))
      failures.push(`${specifier} -> ${resolved} (missing)`);
  } catch (error) {
    failures.push(`${specifier} -> ${error.code ?? error.message}`);
  }
}

if (failures.length) {
  console.error(
    `exports: ${failures.length} documented specifier(s) do not resolve`
  );
  for (const failure of failures) console.error("  " + failure);
  process.exit(1);
}

console.log(`exports: ${specifiers.size} documented specifiers all resolve`);
