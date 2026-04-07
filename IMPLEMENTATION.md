```markdown
# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Refactor the existing Astro-based developer portfolio into a B2B-focused akquise funnel featuring a "Spatial Developer / Apple Minimalistic" premium dark mode design with glassmorphism effects.
- **Tech Stack & Dependencies:** Astro, Native CSS. New dependency for local fonts: `npm install @fontsource/inter`.
- **File Structure:**
  ```text
  ├── package.json
  ├── src/
  │   ├── layouts/
  │   │   └── MainLayout.astro
  │   ├── pages/
  │   │   ├── index.astro
  │   │   ├── impressum.astro (new)
  │   │   ├── datenschutz.astro (new)
  │   │   └── projects/
  │   │       ├── index.astro
  │   │       └── [slug].astro
  │   └── components/
  │       ├── ProjectCard.astro
  │       └── Footer.astro (new)
  ```
- **Attention Points:** - All custom styling must utilize CSS variables for the deep space dark theme (`#09090b`) and glassmorphism properties (`backdrop-filter: blur(20px)`).
- **DSGVO:** Strict compliance required. No external CDNs for fonts. Must use `@fontsource` to bundle fonts locally. No Google Analytics scripts or external trackers. Explicit routes for `impressum` and `datenschutz` are mandatory.

## 2. Execution Phases

#### Phase 1: Dependencies & Global DSGVO Setup
- [x] **Step 1.1:** Run `npm install @fontsource/inter` to add the local font dependency.
- [x] **Step 1.2:** In `src/layouts/MainLayout.astro`, import the font at the top of the component script using `import '@fontsource/inter';`.
- [x] **Step 1.3:** In `src/layouts/MainLayout.astro`, modify the global `<style>` to set `font-family: 'Inter', sans-serif;` on the `body`.
- [x] **Step 1.4:** In `src/layouts/MainLayout.astro`, define global CSS variables for the new theme on the `:root` pseudo-class: `--bg-dark: #09090b;`, `--text-main: #ffffff;`, `--text-muted: #a1a1aa;`, `--accent-blue: #2563eb;`. Set body `background-color` to `var(--bg-dark)` and `color` to `var(--text-main)`.
- [x] **Verification:** Run `npm run dev`, open the browser network tab, and verify that `inter` font files are loaded from `localhost` and no requests are made to `fonts.googleapis.com`.

#### Phase 2: Component Overhaul (Glassmorphism UI)
- [x] **Step 2.1:** In `src/components/ProjectCard.astro`, replace the solid background and gray border (`border: 1px solid #e2e2e2;`) with a frosted glass effect: `background: rgba(255, 255, 255, 0.03);`, `backdrop-filter: blur(20px);`, `-webkit-backdrop-filter: blur(20px);`, and a thin translucent border `border: 1px solid rgba(255, 255, 255, 0.08);`.
- [x] **Step 2.2:** In `src/components/ProjectCard.astro`, update hover states to replace the drop shadow with a subtle glow: `box-shadow: 0 0 25px rgba(37, 99, 235, 0.15);`.
- [x] **Step 2.3:** In `src/components/ProjectCard.astro`, modify text colors within the card to use the new CSS variables (`--text-main` for titles, `--text-muted` for excerpts). Update the tag pills to have a dark semi-transparent background instead of `#f0f4ff`.
- [x] **Step 2.4:** Create `src/components/Footer.astro` containing links to `/impressum` and `/datenschutz`, and add it to `src/layouts/MainLayout.astro` just before the closing `</body>` tag.
- [x] **Verification:** Navigate to `http://localhost:4321/projects` and verify the cards now display the dark glassmorphism styling over the dark background.

#### Phase 3: Landing Page Rewrite (B2B Funnel)
- [x] **Step 3.1:** In `src/pages/index.astro`, completely replace the existing `hero` section with a `100vh` full-height section. Add the B2B headline ("Maßgeschneiderte Software..."), sub-headline, and a primary CTA button styled with the `--accent-blue` color and a hover glow effect.
- [x] **Step 3.2:** In `src/pages/index.astro`, implement a "Trust Bar" section immediately below the hero containing a flex row or CSS-marquee of text/svg logos representing the tech stack (TypeScript, React, Python, etc.).
- [x] **Step 3.3:** In `src/pages/index.astro`, add a "Value Proposition" section containing two glassmorphism cards detailing the targeted solutions for "Agenturen" and "Startups".
- [x] **Step 3.4:** In `src/pages/index.astro`, add a "Services" section explicitly detailing "Projektgeschäft" and "Consulting & White-Label" without mentioning pricing.
- [x] **Step 3.5:** In `src/pages/index.astro`, modify the existing projects fetching logic to `slice(0, 2)` to only display the top 2 featured case studies instead of the full grid.
- [x] **Verification:** Run `npm run dev` and visually verify the `index.astro` page matches the 5-part funnel structure (Hero -> Trust Bar -> Value Props -> Services -> Featured Projects).

#### Phase 4: Project Detail & Archive Pages Styling
- [x] **Step 4.1:** In `src/pages/projects/index.astro`, update the header section to use `--text-main` for the `<h1>` and `--text-muted` for the subtitle.
- [x] **Step 4.2:** In `src/pages/projects/[slug].astro`, update the layout to ensure content rendered via `set:html` (WordPress content) receives appropriate CSS scoping for dark mode (e.g., targeting `.content :global(p)` to use `--text-muted` and `.content :global(h2)` to use `--text-main`).
- [x] **Step 4.3:** In `src/pages/projects/[slug].astro`, style the GitHub/Download buttons utilizing the new glow/magnetic hover styling from the global CSS.
- [x] **Verification:** Click on a project and verify the `[slug].astro` view renders readable text on the dark background and buttons reflect the new theme.

#### Phase 5: Legal Pages (DSGVO Compliance)
- [x] **Step 5.1:** Create `src/pages/impressum.astro` using `MainLayout.astro` and scaffold standard German Impressum headers (Angaben gemäß § 5 TMG, Kontakt, Umsatzsteuer-ID if applicable).
- [x] **Step 5.2:** Create `src/pages/datenschutz.astro` using `MainLayout.astro` and scaffold standard GDPR/DSGVO privacy policy headers.
- [x] **Verification:** Navigate to `http://localhost:4321/impressum` and `http://localhost:4321/datenschutz` and verify the pages load successfully within the main dark theme layout.

## 3. Global Testing Strategy
- **DSGVO Verification:** Build the application (`npm run build`) and analyze the `/dist` folder to guarantee all font files (`.woff2`) are located locally within the build artifacts and no external `<link rel="stylesheet" href="...google...">` exist.
- **Cross-Browser Glassmorphism:** Test the rendering of `backdrop-filter` on Safari, Firefox, and Chromium-based browsers, ensuring fallback background colors (e.g., `rgba(20, 20, 25, 0.9)`) apply cleanly if the blur filter is unsupported.
- **Mobile Responsive Funnel:** Emulate a mobile device to verify the 100vh Hero section does not break with mobile browser address bars and that the horizontal Trust Bar marquee scrolls correctly without causing horizontal viewport overflow.
- **Contrast Accessibility:** Run a Lighthouse accessibility audit to ensure the contrast ratio between `--text-muted` and `--bg-dark` meets WCAG AA standards.
```