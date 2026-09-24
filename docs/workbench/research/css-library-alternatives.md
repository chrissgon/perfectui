# Research: alternatives to perfectui in the lightweight, framework-agnostic CSS/JS library space

- Owner: core-research
- Status: draft
- Date: 2026-09-23
- Question: Which libraries occupy the "lightweight CSS (+JS) components, no framework required" space, how adopted are they, how do they price, and where does perfectui sit on size?
- Informs: positioning of perfectui 1.0 (biz-icp-positioning, mkt-messaging)
- Scope: global, last 12 months for adoption and pricing, English-language sources. Scope was **assumed** (the user delegated framing); revisit if the target market is Brazil-first.
- Search capability: available

## Answer in brief

- The closest peers by philosophy (few or no classes, native HTML, no framework) are Pico CSS (classless, no JavaScript) [7], Beer CSS (CSS + small JS, Material-styled) [2][3], and Open Props (tokens only, no components) [8]; the full-component incumbents without a framework are Bootstrap [2][3] and UIkit [2][3]; Web Awesome, the renamed Shoelace, covers the same ground with web components [9] (fact) — confidence: high.
- Adoption is a power law. Weekly npm downloads, 2026-09-15 to 2026-09-21: Tailwind 95,576,864; Bootstrap 5,200,392; Web Awesome 948,220; daisyUI 773,672; Bulma 283,569; Shoelace 90,807; Foundation 89,011; Pico 41,099; UIkit 37,003; Open Props 24,463; Beer CSS 15,302; perfectui 213 [1] (fact) — confidence: high.
- Among the 3,977 State of CSS 2025 respondents who answered the frameworks question, 2,041 (51.3%) named Tailwind, 1,194 (30.0%) Bootstrap, 1,061 (26.7%) "None", 953 (24.0%) a custom framework, 766 (19.3%) shadcn/ui, 191 (4.8%) Bulma, 170 (4.3%) Open Props [4] (fact; shares computed here, multiple answers allowed) — confidence: high for counts, medium for the interpretation.
- Every library measured is MIT-licensed and free [2]. The only paid models observed are add-ons on top of a free core: Tailwind Plus at $299 one-time personal and $979 one-time team up to 25 people [11] (estimate: single secondary source, primary page behind login), and Web Awesome Pro, per seat, billed annually, amount not retrievable [10] — confidence: medium.
- Measured today with the same method for every file (published build from the CDN, `gzip -9` locally): perfectui 0.23.0 ships 5,978 B of CSS and 1,574 B of JavaScript, smaller than every alternative measured, including Pico at 11,640 B [3] (fact). perfectui 1.0 in progress reports 2,922 B of CSS at phase 4 of its migration [13] (fact, not final) — confidence: high.
- Secondary "bundle size" figures in 2026 articles are unreliable: three of four checked were 2× to 6× below the measured file [3][5] (fact) — confidence: high.

## Findings by sub-question

### 1. Who occupies the space?

- Pico CSS describes itself as "A minimalist and lightweight starter kit that prioritizes semantic syntax, making every HTML element responsive and elegant by default", styles HTML tags "using fewer than 10 `.classes` overall", offers "a class-less version", and "works seamlessly without dependencies, package managers, external files, or JavaScript" [7] (fact). Version 2.1.1, MIT [2][7].
- Open Props is "Supercharged CSS variables" providing "Expertly crafted web design tokens" that are "Useful in any framework"; it ships tokens only, no components [8] (fact). Version 1.7.23, MIT [2][8].
- Web Awesome "is the fancy pants new name for Shoelace, the most popular free and open source web components library", built on "web standards, no JavaScript frameworks are required" [9] (fact, vendor statement, 2024-04-24). Both packages are still published: `@shoelace-style/shoelace` 2.20.1 and `@awesome.me/webawesome` 3.13.0, MIT [2].
- Bootstrap 5.3.8, Bulma 1.0.4, UIkit 3.25.24, Beer CSS 5.0.3 and daisyUI 5.7.43 are MIT and have zero runtime dependencies except Bootstrap's peer `@popperjs/core`, Beer CSS (1 dependency) and the web-component libraries (8 and 13 dependencies) [2] (fact). daisyUI is a Tailwind plugin, not a standalone library [5] (fact, secondary).
- perfectui 0.23.0 positions itself as "An exceptionally lightweight and highly customizable CSS and JavaScript library" that "ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class. Behavior comes from the browser — `<details>`, `<dialog>`, `popover` — and JavaScript only fills in what a browser is missing" [12] (fact, own README).

### 2. How adopted are they?

- Weekly npm downloads for 2026-09-15 to 2026-09-21 [1] (fact): see "Answer in brief". Monthly, 2026-08-23 to 2026-09-21: Tailwind 459,226,577; Bootstrap 23,224,960; daisyUI 3,614,118; Bulma 1,280,114; Pico 191,953; Open Props 106,127; Beer CSS 64,873; perfectui 393 [1] (fact).
- Downloads count installs by humans and machines alike (CI, mirrors); they rank libraries reliably but overstate human use [1] (note on method).
- State of CSS 2025, "Other Tools", CSS frameworks, 3,977 respondents ("72% of survey participants"): Tailwind CSS 2,041; Bootstrap 1,194; None 1,061; Custom/in-house framework 953; shadcn/ui 766; Ant Design 264; Materialize CSS 244; Bulma 191; Open Props 170; UnoCSS 154 [4] (fact). Pico, Beer CSS, UIkit, Web Awesome and perfectui do not appear in the top ten [4]. Publication date not stated on the page; the survey is the 2025 edition [4].
- Web Awesome's 948,220 weekly downloads against Shoelace's 90,807 suggest the rename carried adoption over [1] (estimate: inference from downloads).

### 3. How do they price?

- All eleven packages checked are MIT on the npm registry [2] (fact).
- Tailwind Plus: "Personal licenses are priced at $299, and team licenses (up to 25 people) at $979, both including local taxes and future updates at no additional cost" [11] (estimate: one secondary source without stated origin; the primary page redirects to a login wall). Includes "Over 500 UI blocks, templates, and the Catalyst UI kit" [11].
- Web Awesome Pro: "You pay per seat, once a year. The monthly prices you see are just there to make comparing easier"; "Web Awesome Core is free, open source, and always will be"; Core "is MIT-licensed" [10] (fact, vendor). Pro adds "powerful components, professionally designed themes and palettes", a Figma design kit, workspaces and team support [10]. The amount is rendered client-side and could not be read [10] (unknown).
- Paid extras for Bootstrap, daisyUI or others were not researched (out of the stop criterion).

### 4. Where does perfectui sit on size?

Measured 2026-09-23: published build fetched from the jsDelivr CDN at the pinned version, compressed locally with `gzip -9` [3] (fact):

| Library, version, file | Raw bytes | gzip bytes |
|------------------------|-----------|------------|
| perfectui 0.23.0 `dist/perfectui.css` | 28,705 | 5,978 |
| perfectui 0.23.0 `dist/perfectui.js` | 4,564 | 1,574 |
| Open Props 1.7.23 `open-props.min.css` (tokens only) | 29,566 | 7,667 |
| Pico 2.1.1 `css/pico.classless.min.css` | 71,040 | 10,315 |
| Pico 2.1.1 `css/pico.min.css` | 83,319 | 11,640 |
| Beer CSS 5.0.3 `dist/cdn/beer.min.css` + `beer.min.js` | 87,944 + 18,668 | 17,035 + 5,864 |
| Bootstrap 5.3.8 `dist/css/bootstrap.min.css` + `dist/js/bootstrap.bundle.min.js` | 232,111 + 80,496 | 30,869 + 23,743 |
| UIkit 3.25.24 `dist/css/uikit.min.css` + `dist/js/uikit.min.js` | 283,827 + 154,238 | 30,944 + 53,317 |
| Bulma 1.0.4 `css/bulma.min.css` | 677,931 | 64,842 |

- perfectui's own baseline agrees with the measurement: "`perfectui.css` **6005 B** gzip, `perfectui.js` **1587 B** gzip (+ Poppins)" [13] (fact). The 1.0 migration reports "`perfectui.css` 2922 B gzip, still under half the 0.23.0 baseline" at phase 4, with JavaScript fallbacks "downloaded only when missing" [13] (fact, work in progress).
- Vendor size claims: Open Props states "4.0 kB (minified and Brotli compressed)" [8]; Brotli is not gzip, so 7,667 B gzip is consistent, not a contradiction. Pico's site states no size [7].

## Contradictions

- Sizes: [5] (2026-06-09) states Pico "~2 KB (gzipped)", Bulma "24 KB (gzipped)", Bootstrap "16 KB CSS (gzipped)", Open Props "~1.5 KB core (gzipped)"; measurement [3] gives 11,640 B, 64,842 B, 30,869 B and 7,667 B (full bundle). [6] (2024-09-17) gives Pico "11.3kb (minified+gzipped)", consistent with [3]. Likely reason: [5] repeats unsourced numbers; the measurement wins.
- Survey shares: secondary articles surfaced in search report "37%" for Tailwind and "21.6%" for Bootstrap; the primary page gives 2,041 and 1,194 of 3,977 respondents (51.3% and 30.0%) [4]. Likely reason: a different denominator (all survey participants versus respondents to the question). Only the primary counts are cited here.
- Downloads: a search summary reported "31.1 million weekly downloads" for Tailwind; the registry reports 95,576,864 for the week measured [1]. Likely reason: an older figure. Search summaries were not cited as sources.

## Unknowns

- Web Awesome Pro price (client-side rendered; would be established by loading the page in a browser or asking the vendor).
- Tailwind Plus price at the primary source (login wall); the $299 / $979 figures rest on one secondary source.
- State of CSS 2025 publication date and total participant count (would be established from the survey's metadata page).
- How much of any download count is human use; no source separates CI from developers.
- Paid add-ons for Bootstrap and daisyUI; adoption inside Brazil (scope was global).

## Implications for positioning

- perfectui's nearest peers by philosophy are Pico (classless, no JS) and Beer CSS (CSS + JS); the nearest by market weight are Bootstrap and UIkit; Web Awesome is the web-components route to the same promise.
- On size, measured the same way, perfectui 0.23 (7,552 B CSS + JS) is already below every alternative including Pico, and 1.0 halves the CSS again; this claim is defensible only if the launch publishes the measurement method with the number.
- Secondary sources misstate sizes by 2× to 6×; a size-led message will be compared against those wrong numbers unless the measurement is shown.
- Adoption cannot carry the message: 213 weekly downloads against 15,302 for the smallest measured peer.
- 26.7% "None" and 24.0% "Custom/in-house" among framework respondents describe an audience that already rejects frameworks; "bare minimum, native HTML" speaks to that audience.
- The only paid models observed are add-ons over an MIT core: one-time licenses for components and templates (Tailwind Plus), or per-seat annual subscriptions for pro components, themes and design kits (Web Awesome Pro).

## Sources

[1] npm downloads API, point queries for `last-week` (2026-09-15 to 2026-09-21) and `last-month` (2026-08-23 to 2026-09-21) — npm, Inc. Published live. Accessed 2026-09-23. https://api.npmjs.org/downloads/point/last-week/tailwindcss,bootstrap,bulma,open-props,daisyui,beercss,uikit,foundation-sites and per-package queries for `@picocss/pico`, `@shoelace-style/shoelace`, `@awesome.me/webawesome`, `@chrissgon/perfectui`. Tier 1. Quote: `"tailwindcss":{"downloads":95576864,...,"start":"2026-09-15","end":"2026-09-21"}`; `"@chrissgon/perfectui" ... "downloads":213`.
[2] npm registry, `latest` metadata per package — npm, Inc. Published live. Accessed 2026-09-23. https://registry.npmjs.org/<package>/latest. Tier 1. Quote: versions tailwindcss 4.3.3, bootstrap 5.3.8, bulma 1.0.4, @picocss/pico 2.1.1, open-props 1.7.23, daisyui 5.7.43, beercss 5.0.3, @shoelace-style/shoelace 2.20.1, @awesome.me/webawesome 3.13.0, uikit 3.25.24, @chrissgon/perfectui 0.23.0; `"license": "MIT"` for all eleven.
[3] Own measurement — files fetched from https://cdn.jsdelivr.net/npm/<package>@<version>/<path> and compressed with `gzip -9`; raw and compressed byte counts as in the table above. Measured 2026-09-23. Tier 1 (reproducible; command in "Method").
[4] State of CSS 2025, "Other Tools" — Devographics. Published undated (2025 edition). Accessed 2026-09-23. https://2025.stateofcss.com/en-US/other-tools/. Tier 1. Quote: "3,977 respondents (72% of survey participants)"; "Tailwind CSS: 2,041; Bootstrap: 1,194; None: 1,061; Custom/in-house framework: 953; shadcn/ui: 766; Ant Design: 264; Materialize CSS: 244; Bulma: 191; Open Props: 170; UnoCSS: 154".
[5] "15 Best CSS Frameworks in 2026 (Bundle Size Compared)" — techwench.com, Devansh Nair. Published 2026-06-09. Accessed 2026-09-23. https://www.techwench.com/best-css-frameworks-2026/. Tier 3 (no sources given; contradicted by measurement). Quote: Pico CSS "~2 KB (gzipped)"; Bulma "24 KB (gzipped)"; Bootstrap "16 KB CSS (gzipped)"; Open Props "~1.5 KB core (gzipped)"; DaisyUI "Wraps Tailwind utility classes into semantic component classes".
[6] "Top 9 CSS Frameworks to Try in 2026" — prismic.io, Nefe Emadamerho-Atori. Published 2024-09-17 (updated). Accessed 2026-09-23. https://prismic.io/blog/best-css-frameworks. Tier 2. Older than 12 months. Quote: Pico CSS "11.3kb (minified+gzipped)"; Bootstrap "18.6% of websites"; Tailwind "the highest retention rate (75.5%)" per State of CSS 2023.
[7] Pico CSS website and docs — picocss.com. Published undated. Accessed 2026-09-23. https://picocss.com/ and https://picocss.com/docs. Tier 1 (vendor). Quote: "A minimalist and lightweight starter kit that prioritizes semantic syntax, making every HTML element responsive and elegant by default"; "fewer than 10 `.classes` overall"; "works seamlessly without dependencies, package managers, external files, or JavaScript"; "v2.1.1"; "Code licensed MIT, docs CC BY-SA 4.0".
[8] Open Props website — open-props.style. Published undated. Accessed 2026-09-23. https://open-props.style/. Tier 1 (vendor). Quote: "Supercharged CSS variables"; "4.0 kB (minified and Brotli compressed)"; "500+ props"; "Useful in any framework"; MIT; v1.7.23.
[9] "Introducing Web Awesome" — Blog Awesome, Dave Gandy. Published 2024-04-24. Accessed 2026-09-23. https://blog.fontawesome.com/introducing-web-awesome/. Tier 1 (vendor). Older than 12 months; describes a relationship, not a market figure. Quote: "Web Awesome is the fancy pants new name for Shoelace, the most popular free and open source web components library."; "web standards, no JavaScript frameworks are required".
[10] Web Awesome Pro — webawesome.com. Published undated. Accessed 2026-09-23. https://webawesome.com/pro (also https://webawesome.com/pricing). Tier 1 (vendor), partially accessible: price amount rendered client-side. Quote: "You pay per seat, once a year. The monthly prices you see are just there to make comparing easier."; "Web Awesome Core is free, open source, and always will be."; "It's MIT-licensed".
[11] "Tailwind Plus: The New Era of Tailwind UI" — tailkits.com, Yucel F. Sahan. Published 2025-10-12 or 2025-12-10 (page shows "Updated on 10/12/2025"; format ambiguous). Accessed 2026-09-23. https://tailkits.com/blog/tailwind-plus-replaced-tailwind-ui/. Tier 3 (commercial blog, no source stated). Quote: "Personal licenses are priced at $299, and team licenses (up to 25 people) at $979, both including local taxes and future updates at no additional cost."
[12] perfectui README — this repository, `README.md`. Accessed 2026-09-23. Tier 1 (own). Quote: "Perfect UI ships the bare minimum: no runtime dependencies, no CSS reset, no font import, and no rule that is not attached to a `pui-` class."
[13] perfectui HANDOFF — this repository, `HANDOFF.md`, phase table. Accessed 2026-09-23. Tier 1 (own). Quote: "Baseline measured: `perfectui.css` **6005 B** gzip, `perfectui.js` **1587 B** gzip (+ Poppins)"; "`perfectui.css` 2922 B gzip, still under half the 0.23.0 baseline".

## Method

Queries run: "lightweight CSS framework comparison 2026 Pico CSS Bulma Bootstrap Open Props Beer CSS framework-agnostic components"; "\"State of CSS 2025\" results CSS frameworks usage Tailwind Bootstrap Bulma percentage"; "\"Tailwind Plus\" pricing personal team license one-time payment price 2026"; "Web Awesome Pro pricing per seat billed annually price Font Awesome Shoelace". Pages opened: [4]–[11]. Registry and CDN queries: [1]–[3].
Measurement command: `curl -sL <cdn url> | gzip -9 | wc -c` and `curl -sL <cdn url> | wc -c`, jsDelivr, 2026-09-23.
Excluded: search-engine summaries (not sources); https://tailwindcss.com/plus and /plus/pricing (login wall and 404); https://2025.stateofcss.com/en-US/tools/css-frameworks/ (404); techwench figures as facts (contradicted by [3]).
Recency threshold: 12 months for adoption, pricing and sizes; sources [6] and [9] flagged.
