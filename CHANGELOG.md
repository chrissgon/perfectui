# Changelog

## v1.0.0

[compare changes](https://github.com/chrissgon/perfectui/compare/v1.0.0-beta.1...v1.0.0)

### 🩹 Fixes

- **forms:** Keep unchecked radios and switches empty when :indeterminate matches ([057ff1c](https://github.com/chrissgon/perfectui/commit/057ff1c))
- **modal:** Centre the dialog under resets that zero margins ([0e6a520](https://github.com/chrissgon/perfectui/commit/0e6a520))
- **checkbox:** Show the mixed state on checkboxes inserted after load ([a7cc6d0](https://github.com/chrissgon/perfectui/commit/a7cc6d0))
- **overlays:** Place dropdowns and tooltips against the viewport ([9ff2f9c](https://github.com/chrissgon/perfectui/commit/9ff2f9c))

### 💅 Refactors

- **fallbacks:** Drop the installed guard that could never be true ([4dce7a9](https://github.com/chrissgon/perfectui/commit/4dce7a9))

### 📖 Documentation

- **handoff:** Annotate the release tag so --follow-tags pushes it ([a743a3d](https://github.com/chrissgon/perfectui/commit/a743a3d))
- **tailwind:** Explain the cascade layer order for Tailwind v4 and Preflight in v3 ([a6a86c6](https://github.com/chrissgon/perfectui/commit/a6a86c6))
- Mark the documents for the documentation site (live examples, alerts, site metadata) ([652748d](https://github.com/chrissgon/perfectui/commit/652748d))
- Point the homepage and the README at https://perfectui.dev ([92617ae](https://github.com/chrissgon/perfectui/commit/92617ae))
- **workbench:** Record the release pipeline idea ([caa4478](https://github.com/chrissgon/perfectui/commit/caa4478))
- **adr:** Propose positioning overlays against the viewport ([dfafd13](https://github.com/chrissgon/perfectui/commit/dfafd13))
- **overlays:** Say that dropdowns and tooltips are placed against the viewport ([d628495](https://github.com/chrissgon/perfectui/commit/d628495))
- **review:** Overlay placement fix approved ([872518d](https://github.com/chrissgon/perfectui/commit/872518d))
- **workbench:** Record the approval to push the overlay fix to v1 ([ec26af5](https://github.com/chrissgon/perfectui/commit/ec26af5))

### ✅ Tests

- **overlays:** Sticky header dropdowns and tooltips after scrolling, and edge flips ([7bbb000](https://github.com/chrissgon/perfectui/commit/7bbb000))

### 🤖 CI

- **publish:** Trusted publishing and a GitHub release for every tag ([10aedbc](https://github.com/chrissgon/perfectui/commit/10aedbc))

### ❤️ Contributors

- Christopher Goncalves ([@chrissgon](https://github.com/chrissgon))

## v1.0.0-beta.1

[compare changes](https://github.com/chrissgon/perfectui/compare/v1.0.0-beta.0...v1.0.0-beta.1)

### 🚀 Enhancements

- **accordion:** Mark the open item with pui-highlighted ([86b3953](https://github.com/chrissgon/perfectui/commit/86b3953))

### 🩹 Fixes

- Interpolate the derived colors in oklab ([1a40b27](https://github.com/chrissgon/perfectui/commit/1a40b27))
- **scripts:** Measure colors the browser has finished painting ([a121963](https://github.com/chrissgon/perfectui/commit/a121963))
- **tests:** Compare the derived neutral in sRGB ([5f7ea4e](https://github.com/chrissgon/perfectui/commit/5f7ea4e))
- **scripts:** Stop the design-system harness measuring an unstyled page ([afb96b1](https://github.com/chrissgon/perfectui/commit/afb96b1))
- **accordion:** Join consecutive items into one block ([1ee27b0](https://github.com/chrissgon/perfectui/commit/1ee27b0))
- **tokens:** Darken muted text to keep 4.5:1 on the muted background ([169cec1](https://github.com/chrissgon/perfectui/commit/169cec1))

### 💅 Refactors

- Point the token scale page at the library ([d6eed18](https://github.com/chrissgon/perfectui/commit/d6eed18))

### 📖 Documentation

- Add a design system specification ([8cfacfd](https://github.com/chrissgon/perfectui/commit/8cfacfd))
- Organize the design system around Figma variables ([ac361ea](https://github.com/chrissgon/perfectui/commit/ac361ea))
- Describe every component's variants, and where each one comes from ([769736e](https://github.com/chrissgon/perfectui/commit/769736e))
- Describe the accordion block in the design system ([87f7ead](https://github.com/chrissgon/perfectui/commit/87f7ead))
- **skills:** Build-with-perfectui skill for AI design and coding tools ([10f13d8](https://github.com/chrissgon/perfectui/commit/10f13d8))
- **design-system:** Drop recolored variant from dropdown and accordion ([8215c6b](https://github.com/chrissgon/perfectui/commit/8215c6b))
- **design-system:** Examples, icons, alerts and the dropdown's list ([d8b9ba5](https://github.com/chrissgon/perfectui/commit/d8b9ba5))
- **design-system:** Add the design system PDF ([8b1d961](https://github.com/chrissgon/perfectui/commit/8b1d961))

### 🏡 Chore

- Move the workflows off the deprecated action runtimes ([a4158a9](https://github.com/chrissgon/perfectui/commit/a4158a9))
- Adopt AGENTS.md and workbench state ([d27f56e](https://github.com/chrissgon/perfectui/commit/d27f56e))

### ✅ Tests

- **docs:** Verify every hand-written number in DESIGN-SYSTEM.md ([471430e](https://github.com/chrissgon/perfectui/commit/471430e))

### ❤️ Contributors

- Christopher Goncalves ([@chrissgon](https://github.com/chrissgon))

## v1.0.0-beta.0

[compare changes](https://github.com/chrissgon/perfectui/compare/v0.23.0...v1.0.0-beta.0)

### 🚀 Enhancements

- Add design tokens and color mode ([a343c3e](https://github.com/chrissgon/perfectui/commit/a343c3e))
- Add style, color and state classes ([74d053d](https://github.com/chrissgon/perfectui/commit/74d053d))
- ⚠️ Brighten the state colors ([50f977f](https://github.com/chrissgon/perfectui/commit/50f977f))
- Use v0 tone 600 in light mode ([1430338](https://github.com/chrissgon/perfectui/commit/1430338))
- Add button, chip and badge ([0d42a84](https://github.com/chrissgon/perfectui/commit/0d42a84))
- Add card, list, table and timeline ([51e2cb2](https://github.com/chrissgon/perfectui/commit/51e2cb2))
- Add striped and hoverable modifiers ([901f738](https://github.com/chrissgon/perfectui/commit/901f738))
- Style tfoot as a summary band ([8b85083](https://github.com/chrissgon/perfectui/commit/8b85083))
- Add the form controls ([2e6b946](https://github.com/chrissgon/perfectui/commit/2e6b946))
- Add group, float and the horizontal timeline ([60d4eff](https://github.com/chrissgon/perfectui/commit/60d4eff))
- Add accordion, modal, dropdown and tooltip ([54918a4](https://github.com/chrissgon/perfectui/commit/54918a4))
- Fill the fallback registry and write the fallbacks ([655fd9a](https://github.com/chrissgon/perfectui/commit/655fd9a))
- Add overlay directions, an accordion icon hook and the modal recipe ([78f5882](https://github.com/chrissgon/perfectui/commit/78f5882))
- Give the accordion summary a header band ([b836292](https://github.com/chrissgon/perfectui/commit/b836292))
- Align dropdowns along the axis they do not travel ([04bcd60](https://github.com/chrissgon/perfectui/commit/04bcd60))

### 🩹 Fixes

- Timeline icon overlap and stray border after a tfoot ([66f0ac4](https://github.com/chrissgon/perfectui/commit/66f0ac4))
- Timeline rule, accordion chevron and card background ([8164758](https://github.com/chrissgon/perfectui/commit/8164758))
- Stop a group's border from shifting on hover ([5eef1cf](https://github.com/chrissgon/perfectui/commit/5eef1cf))
- Stop clipping the focus ring inside input groups and accordions ([527b948](https://github.com/chrissgon/perfectui/commit/527b948))
- Give the accordion summary the library's focus ring ([1082cad](https://github.com/chrissgon/perfectui/commit/1082cad))
- Round the accordion's focus ring ([86fcae5](https://github.com/chrissgon/perfectui/commit/86fcae5))
- Draw the select arrow as one shape ([72816d8](https://github.com/chrissgon/perfectui/commit/72816d8))
- Match the accordion's focus ring gap to the rest ([f1c1c87](https://github.com/chrissgon/perfectui/commit/f1c1c87))

### 📖 Documentation

- Add agent instructions, handoff and token scale reference ([70b6756](https://github.com/chrissgon/perfectui/commit/70b6756))
- Rewrite the documentation for 1.0.0 ([35d8cb0](https://github.com/chrissgon/perfectui/commit/35d8cb0))
- Close the phase 4 checklist ([f64574a](https://github.com/chrissgon/perfectui/commit/f64574a))

### 📦 Build

- ⚠️ Phase 1 — native CSS build, ESM-only JS, remove Sass/reset/font ([337e7fb](https://github.com/chrissgon/perfectui/commit/337e7fb))

### 🏡 Chore

- Add todo.txt ([61f7ee9](https://github.com/chrissgon/perfectui/commit/61f7ee9))
- Fix eslint setup and drop unused devDependencies ([983db9a](https://github.com/chrissgon/perfectui/commit/983db9a))
- Fix the commit hook and add CI ([a0277eb](https://github.com/chrissgon/perfectui/commit/a0277eb))

### ✅ Tests

- Add the Playwright suites and the SSR check ([d5b6db2](https://github.com/chrissgon/perfectui/commit/d5b6db2))
- Add a manual review page for the overlays ([e8cca6d](https://github.com/chrissgon/perfectui/commit/e8cca6d))
- Add an index for the manual pages and unbreak the fixtures ([b2e09c5](https://github.com/chrissgon/perfectui/commit/b2e09c5))

### 🎨 Styles

- Apply prettier to phase 1 files ([d229937](https://github.com/chrissgon/perfectui/commit/d229937))
- Reformat handoff tables ([45b6225](https://github.com/chrissgon/perfectui/commit/45b6225))
- Apply prettier to phase 3 files ([b12c1df](https://github.com/chrissgon/perfectui/commit/b12c1df))
- Reformat handoff table ([86ecc3e](https://github.com/chrissgon/perfectui/commit/86ecc3e))
- Apply prettier to the preview page ([cb1662a](https://github.com/chrissgon/perfectui/commit/cb1662a))
- Apply prettier to phase 4 files ([e1dd1ff](https://github.com/chrissgon/perfectui/commit/e1dd1ff))
- Apply prettier to the preview page ([de7b283](https://github.com/chrissgon/perfectui/commit/de7b283))
- Apply prettier to the preview page ([d6c7b96](https://github.com/chrissgon/perfectui/commit/d6c7b96))
- Apply prettier to the table review page ([4494797](https://github.com/chrissgon/perfectui/commit/4494797))
- Apply prettier to phase 4 files ([4aa7ff6](https://github.com/chrissgon/perfectui/commit/4aa7ff6))
- Reformat handoff ([de00b5f](https://github.com/chrissgon/perfectui/commit/de00b5f))
- Apply prettier to phase 4 files ([b17c5e2](https://github.com/chrissgon/perfectui/commit/b17c5e2))
- Reformat handoff ([db2424d](https://github.com/chrissgon/perfectui/commit/db2424d))
- Apply prettier to the test setup ([35d9178](https://github.com/chrissgon/perfectui/commit/35d9178))
- Apply prettier to the overlay docs ([b3a82c8](https://github.com/chrissgon/perfectui/commit/b3a82c8))
- Apply prettier to the form styles ([21ae9eb](https://github.com/chrissgon/perfectui/commit/21ae9eb))

#### ⚠️ Breaking Changes

- ⚠️ Brighten the state colors ([50f977f](https://github.com/chrissgon/perfectui/commit/50f977f))
- ⚠️ Phase 1 — native CSS build, ESM-only JS, remove Sass/reset/font ([337e7fb](https://github.com/chrissgon/perfectui/commit/337e7fb))

### ❤️ Contributors

- Christopher Goncalves ([@chrissgon](https://github.com/chrissgon))
- Claude <noreply@anthropic.com>
