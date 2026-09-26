# Ideas to develop later

- Owner: none (ordinary work); each idea becomes a plan when the user picks it up
- Updated: 2026-09-25

## IDEA-1: A release pipeline where publishing the wrong version cannot happen

Raised by the user on 2026-09-25, quoted: "criar um processo de pipeline parecido com o perfectui[-doc], mas de acordo com as especificidades dele, porque o ponto crítico não é fazer um merge na main, mas sim subir uma versão de forma errada."

A published npm version cannot be replaced: an unpublished number can never be reused, and removing versions takes one passkey confirmation each (the pruning of 2026-09-25). So the pipeline guards the publish step above all.

### What exists today (2026-09-25)

- `.github/workflows/ci.yml`: lint, typecheck, build, size and exports on every push to `main` and `v1` and on pull requests; the full browser suite (Chromium and WebKit) in a second job.
- `.github/workflows/publish.yml`: on any pushed tag (`tags: ["*"]`), a short gate (lint, typecheck, build, size, exports), then `npm publish` with provenance; a version with a hyphen goes to the `beta` dist-tag, any other to `latest`.
- The release itself is manual (HANDOFF.md): `npm version`, commit, annotated tag, `git push --follow-tags`.

### Risks found in that setup

- R1. Any tag publishes, whatever its name, and nothing checks that the tag matches `package.json` (`v1.0.0` pushed while the file says `1.0.0-beta.2` would publish `1.0.0-beta.2`).
- R2. The publish job skips the browser suite, and nothing checks that the tagged commit passed `ci.yml`, or even that it is on `main` or `v1`.
- R3. The publish authenticates with the secret `NPM_PERFECTUI_TOKEN`. On 2026-09-25 npm refused a granular token that bypasses two-factor authentication ("Granular access tokens that bypass two-factor authentication may not perform this action"), and its notice says the restriction covers publishing. The next release may fail at the last step.
- R4. A stable version takes `latest` at once, which is what `npm i` and the CDN's `@latest` resolve to, with no step to check the published package before users get it.

### Directions to discuss

- Trusted publishing (OIDC) instead of the token: npm accepts a publish from a named GitHub workflow with no secret; `publish.yml` already requests `id-token: write`. It removes R3 and a secret that can leak.
- A tag pattern (`v*.*.*` and `v*.*.*-*`) plus a first step that fails unless the tag equals `v` + the `package.json` version and the commit is on the release branch.
- The full suite, or a check that `ci.yml` passed on that exact commit, before `npm publish`.
- A GitHub environment (`npm`) with a required reviewer: the workflow stops before publishing until the maintainer approves in the web interface, one click, with the version and the diff in front of them.
- For a stable version: publish to a `next` dist-tag first, install it in a smoke project (and the documentation site's build), then move `latest` with `npm dist-tag add`, which is reversible, unlike a publish.
- `npm publish --dry-run` output (file list and size) in the workflow summary before the approval.
- After a release, a pull request in perfectui-doc that moves the site to the new tag (its `libraryRef` is pinned until then).
