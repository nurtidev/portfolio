# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open directly in a browser:

```bash
open Portfolio.html
# or serve with a static server for proper MIME types:
npx serve .
```

`Portfolio.html` and `index.html` are identical — both serve as the live entry point and load scripts from `variants/v1-terminal/src/`. The site is deployed via GitHub Pages (see `CNAME`).

## Architecture

**No bundler.** React 18 + Babel Standalone are loaded from CDN. JSX is transpiled in the browser at runtime. Scripts are loaded in dependency order via `<script>` tags in the HTML file.

**Script load order matters** (enforced by HTML `<script>` tag order):
1. `i18n.js` — sets `window.I18N` (all bilingual strings)
2. `stack-data.js` — sets `window.STACK_DATA` (proficiency data for StackSection)
3. JSX components: `Terminal`, `ArchGraph`, `sections`, `StackSection`
4. `gopher-sprites.js` — game sprite data global (must precede GopherRunner)
5. `GopherRunner.jsx`, `app.jsx`

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

- **All text:** edit `variants/v1-terminal/src/i18n.js` — the root `src/i18n.js` is a diverged older copy; do not edit it
- **Stack proficiency:** edit `variants/v1-terminal/src/stack-data.js`
- **Terminal commands:** edit the `runCommand` switch in `variants/v1-terminal/src/Terminal.jsx`
- **Resume PDFs:** edit `resume/resume-ru.html` / `resume/resume-en.html` (shared print styles in
  `resume/resume.css`), then run `resume/build.sh` — it renders both into `assets/resume-{ru,en}.pdf`
  via headless Chrome and prints the page count. Keep each to one page. `assets/resume.pdf` is the
  older hh.kz export, still linked from variants v2/v3

## Other files

- `resume/` — HTML source of the downloadable resume; the PDFs in `assets/` are build artifacts
- `design-canvas.jsx` — standalone Figma-like design preview tool; not loaded by the live site
- Root `src/` — older diverged copy of v1-terminal sources; all active edits go to `variants/v1-terminal/src/`

## Easter eggs

- Terminal commands `kairat` / `nurtas` trigger a YouTube overlay (Кайрат Нуртас)
- Konami code (↑↑↓↓←→←→BA) on any page triggers the same overlay
- Video ID is set via `NURTAS_VIDEO_ID` in `Portfolio.html`
