# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open directly in a browser:

```bash
open Portfolio.html
# or serve with a static server for proper MIME types:
npx serve .
```

`Portfolio.html` is the live entry point — it loads scripts from `variants/v1-terminal/src/`.

## Architecture

**No bundler.** React 18 + Babel Standalone are loaded from CDN. JSX is transpiled in the browser at runtime. Scripts are loaded in dependency order via `<script>` tags in the HTML file.

**Script load order matters** (enforced by HTML `<script>` tag order):
1. `i18n.js` — sets `window.I18N` (all bilingual strings)
2. `stack-data.js` — sets `window.STACK_DATA` (proficiency data for StackSection)
3. `gopher-sprites.js`, `leaderboard.js` — game data globals
4. JSX components (`Terminal`, `ArchGraph`, `StackSection`, `GopherRunner`, `sections`, `app`) — each exports to `window.*`

**State** lives entirely in `app.jsx`: `lang` (ru/en) and `theme` (dark/light) are the only two pieces of app state, persisted to `localStorage`.

**i18n pattern:** all visible text lives in `i18n.js` as `window.I18N.ru` / `window.I18N.en`. Components receive `t` (the current language object) as a prop. Never hardcode display strings in JSX — add them to both `ru` and `en` keys in `i18n.js`.

**Theme** is toggled by setting `data-theme="dark|light"` on `<html>`. CSS variables keyed to `[data-theme]` handle all color switching.

## Variants

Three independent design concepts under `variants/`. Each has its own `index.html`, styles, and duplicated JSX. They share the same `i18n.js` content structure but are otherwise self-contained.

| Directory | Character |
|---|---|
| `variants/v1-terminal/` | Active variant used by `Portfolio.html`. Terminal widget + Gopher Runner game. |
| `variants/v2-editorial/` | Editorial / typographic layout. |
| `variants/v3-systems/` | Architecture diagram + timeline focus. |

To switch the active variant in `Portfolio.html`, update the `<link>` and `<script>` paths to point at the desired variant's `src/` directory.

## Cache busting

Script/style tags in `Portfolio.html` use `?v=N` query strings (e.g. `src/i18n.js?v=7`). Bump the version number when pushing updates to avoid stale browser caches.

## Content updates

- **All text:** edit `variants/v1-terminal/src/i18n.js` (and the corresponding `src/i18n.js` in `src/` if keeping both in sync)
- **Stack proficiency:** edit `variants/v1-terminal/src/stack-data.js`
- **Terminal commands:** edit the `runCommand` switch in `variants/v1-terminal/src/Terminal.jsx`
- **Resume PDF:** replace `assets/resume.pdf`
