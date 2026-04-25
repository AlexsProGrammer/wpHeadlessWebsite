# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🎨 Project Detail Themes

Each project detail page (`/projects/<slug>`) is rendered with one of several radically different layout themes. The active theme is determined as follows:

1. If the WordPress ACF field `theme_layout` on the project is set to a specific theme key, that theme is used.
2. If `theme_layout` is unset, empty, or `random`, a theme is picked at random from the **random pool** below and persisted in `sessionStorage` per slug for the duration of the session.
3. Themes prefixed with `custom_` are **never** picked by the random rotation. They can only be assigned explicitly via the ACF field.

### Available `theme_layout` keys

#### Random pool (`theme_*`)

| Key                          | Description |
| :--------------------------- | :---------- |
| `theme_apple_spatial`        | Apple-style spatial keynote with glass pills and a hero gradient. |
| `theme_terminal_dark`        | Pure terminal — green-on-black, ASCII boxes, blinking cursor. |
| `theme_minimal_grid`         | Editorial minimalism with a strict 12-column grid. |
| `theme_split_screen`         | Vertical split: large image on one side, content on the other. |
| `theme_orbital_flow`         | Tech-stack satellites orbiting the project image. |
| `theme_blueprint_schematic`  | Engineering blueprint with grid paper and crosshair corners. |
| `theme_hud_telemetry`        | Sci-fi HUD with live clock and corner-bracket framing. |
| `theme_glass_cascade`        | Cascading frosted-glass panels with depth-of-field. |
| `theme_data_pipeline`        | Mono terminal with directional flow arrows between sections. |
| `theme_neon_cyber`           | Synthwave neon — chromatic glitch title and grid horizon. |
| `theme_editorial_zine`       | Print-zine typography with oversized display headlines. |
| `theme_void`                 | Brutalist black-and-white minimalism, all-caps. |
| `theme_horror_crt`           | Corrupted-CRT horror: scanlines, vignette, chromatic-shadow title, evidence-log feature cards. |

#### Custom (ACF-only, never random) (`custom_*`)

| Key                          | Description |
| :--------------------------- | :---------- |
| `custom_memorysnatcher`      | Mirrors the actual MemorySnatcher desktop-app UI (dark sidebar, amber accent, status pills, progress bar). |

### Adding a new theme

1. Create `src/components/themes/Theme<Name>.astro` (or `CustomTheme<Name>.astro` for opt-in only).
2. Import & register it in `src/pages/projects/[slug].astro`:
   - Add a `<div class="theme-wrapper" data-theme-id="theme_<key>">` block.
   - For random-pool themes, add the key to the `RANDOM_THEMES` array.
   - For custom themes, do **not** add to `RANDOM_THEMES`.
3. Add a row to the appropriate table above.
