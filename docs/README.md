# Perfect UI Official Documentation

An exceptionally lightweight and highly customizable CSS and JavaScript library for crafting elegant user interfaces. 🎨💡

## Summary

Getting Started

- [Installation](https://github.com/chrissgon/perfectui/blob/main/docs/installation.md)
- [Typescript](https://github.com/chrissgon/perfectui/blob/main/docs/typescript.md)
- [Tailwind CSS](https://github.com/chrissgon/perfectui/blob/main/docs/tailwindcss.md)
- [Migrating from 0.x](https://github.com/chrissgon/perfectui/blob/main/MIGRATION.md)
- [License](https://github.com/chrissgon/perfectui/blob/main/docs/license.md)

Customization

- [Dark Mode](https://github.com/chrissgon/perfectui/blob/main/docs/darkmode.md)
- [Theme Color](https://github.com/chrissgon/perfectui/blob/main/docs/theme-color.md)

General

- [Layout Group](https://github.com/chrissgon/perfectui/blob/main/docs/layout-group.md)
- [Float](https://github.com/chrissgon/perfectui/blob/main/docs/float.md)

Components

- [Accordion](https://github.com/chrissgon/perfectui/blob/main/docs/accordion.md)
- [Badge](https://github.com/chrissgon/perfectui/blob/main/docs/badge.md)
- [Button](https://github.com/chrissgon/perfectui/blob/main/docs/button.md)
- [Card](https://github.com/chrissgon/perfectui/blob/main/docs/card.md)
- [Chip](https://github.com/chrissgon/perfectui/blob/main/docs/chip.md)
- [Dropdown](https://github.com/chrissgon/perfectui/blob/main/docs/dropdown.md)
- [List](https://github.com/chrissgon/perfectui/blob/main/docs/list.md)
- [Modal](https://github.com/chrissgon/perfectui/blob/main/docs/modal.md)
- [Table](https://github.com/chrissgon/perfectui/blob/main/docs/table.md)
- [Timeline](https://github.com/chrissgon/perfectui/blob/main/docs/timeline.md)
- [Tooltip](https://github.com/chrissgon/perfectui/blob/main/docs/tooltip.md)

Forms

- [Field Group](https://github.com/chrissgon/perfectui/blob/main/docs/field-group.md)
- [Input](https://github.com/chrissgon/perfectui/blob/main/docs/input.md)
- [Input Group](https://github.com/chrissgon/perfectui/blob/main/docs/input-group.md)
- [Textarea](https://github.com/chrissgon/perfectui/blob/main/docs/textarea.md)
- [Select](https://github.com/chrissgon/perfectui/blob/main/docs/select.md)
- [Checkbox](https://github.com/chrissgon/perfectui/blob/main/docs/checkbox.md)
- [Radio](https://github.com/chrissgon/perfectui/blob/main/docs/radio.md)
- [Switch](https://github.com/chrissgon/perfectui/blob/main/docs/switch.md)

## Writing these documents

These files are the documentation site's pages: the site converts them at build time, from the tag of the version it documents. The summary above is its navigation, in order. Everything below renders on GitHub as well.

- Start each document with its section as a level-4 heading, then the title as the only level-1 heading, then one paragraph: that paragraph is the page's description.
- A code block marked `html live` is shown on the site with a live preview; `html live name=basic` also gives it a name another page can show. Any other block is shown as code.
- Notes and warnings are GitHub alerts: `> [!NOTE]` or `> [!WARNING]`, followed by an empty `>` line.
- Link to another document with its file name (`button.md`); the site turns it into a link to that page.
- Metadata GitHub does not need goes in a comment after the title: `<!-- site: changed: "1.0" -->` (also `since`, `from`, `to` and `tags`).
