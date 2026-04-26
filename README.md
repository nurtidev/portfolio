# nurtilek.dev — Portfolio

Personal portfolio site for **Asankhan Nurtilek**, Senior Golang Developer from Astana, Kazakhstan.

## Stack

- **Runtime:** React 18 (UMD via CDN) + Babel Standalone — no build step required
- **Languages:** JSX, CSS, vanilla JS
- **Fonts:** Inter + JetBrains Mono (Google Fonts)

## Structure

```
.
├── Portfolio.html          # Main entry point
├── assets/
│   └── resume.pdf
├── src/                    # Shared component sources
│   ├── app.jsx             # App shell, Nav, Footer
│   ├── sections.jsx        # Hero, About, Experience, Projects, Stack, Contact
│   ├── Terminal.jsx        # Interactive terminal widget
│   ├── ArchGraph.jsx       # Architecture diagram (SVG)
│   ├── i18n.js             # RU / EN content dictionary
│   └── styles.css
└── variants/
    ├── v1-terminal/        # Terminal-style design (active in Portfolio.html)
    ├── v2-editorial/       # Editorial / minimal design
    └── v3-systems/         # Systems / diagram-heavy design
```

## Running locally

No build step — just open the file in a browser:

```bash
open Portfolio.html
```

Or serve with any static server:

```bash
npx serve .
# → http://localhost:3000
```

## Features

- **Bilingual** — RU / EN toggle, persisted in `localStorage`
- **Dark / Light theme** toggle
- **Interactive terminal** — commands: `help`, `whoami`, `skills`, `projects`, `contact`
- **Architecture diagram** — SVG visualization of a typical microservices layout
- **Responsive** — mobile-friendly layout

## Variants

Three visual concepts live under `variants/`. Switch between them by updating the script/style imports in `Portfolio.html`.

| Variant | Description |
|---|---|
| `v1-terminal` | Terminal aesthetic with Gopher Runner mini-game |
| `v2-editorial` | Clean editorial layout |
| `v3-systems` | Systems diagram + timeline focus |

## Contact

- **GitHub:** [github.com/nurtidev](https://github.com/nurtidev)
- **Email:** nurtilek.develop@gmail.com
- **Location:** Astana, Kazakhstan
