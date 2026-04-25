
# IMPLEMENTATION PLAN: Dynamic Theme Dispatcher & Project Themes
**Context:** We are upgrading the headless WordPress Astro portfolio. Currently, `src/pages/projects/[slug].astro` is a monolithic template. We need to convert it into a "Dispatcher" that dynamically injects different UI themes per project.
**Goal:** Implement a session-aware theme dispatcher that prevents FOUC (Flash of Unstyled Content) and create 5 initial theme components. 
**Themes:** `theme_apple_spatial` (current design), `theme_terminal_dark`, `theme_minimal_grid`, `theme_split_screen`, and `custom_memorysnatcher`.

## Phase 1: Directory & Interface Setup
- [x] **Step 1.1:** Create a new directory: `src/components/themes/`.
- [x] **Step 1.2:** Create a TypeScript interface file (optional but recommended) or just ensure all new theme components in `src/components/themes/` accept the following Astro props:
  ```typescript
  export interface Props {
    project: any;
    acf: any;
    image: any;
    technologies: string[];
  }
  ```

## Phase 2: Extracting the Current Design (ThemeAppleSpatial)
- [x] **Step 2.1:** Create `src/components/themes/ThemeAppleSpatial.astro`.
- [x] **Step 2.2:** Move the entire `<article class="project-detail">` DOM structure, including the `.project-hero` and `.content-panel`, from `src/pages/projects/[slug].astro` into `ThemeAppleSpatial.astro`.
- [x] **Step 2.3:** Move all `<style>` rules currently inside `[slug].astro` (e.g., `.project-detail`, `.project-hero`, `.hero-image`, etc.) into `ThemeAppleSpatial.astro`.
- [x] **Step 2.4:** At the top of `ThemeAppleSpatial.astro`, add the prop extraction:
  ```astro
  ---
  const { project, acf, image, technologies } = Astro.props;
  ---
  ```

## Phase 3: Creating the New Theme Scaffolds
Create the following files in `src/components/themes/`. Add basic placeholder markup utilizing the passed props (`project.title.rendered`, `project.content.rendered`, etc.).
- [x] **Step 3.1:** Create `ThemeTerminalDark.astro`. (Styling concept: Black background, monospace font, neon green/blue borders, `acf.github_url` styled as a CLI execution command).
- [x] **Step 3.2:** Create `ThemeMinimalGrid.astro`. (Styling concept: Strict CSS grid, 1px solid white/gray borders `rgba(255,255,255,0.1)`, black-and-white image filters on hover).
- [x] **Step 3.3:** Create `ThemeSplitScreen.astro`. (Styling concept: 50vw left side `position: sticky` containing title and tags, 50vw right side scrolling content).
- [x] **Step 3.4:** Create `CustomMemorySnatcher.astro`. (Styling concept: Highly specific to the memorysnatcher game, maybe pixel art fonts or red/dark gradients).

## Phase 4: Refactoring `[slug].astro` into a Dispatcher
Modify `src/pages/projects/[slug].astro` to act as the Theme Dispatcher.
- [x] **Step 4.1:** Keep the existing data fetching logic (`getStaticPaths`, `getProjectBySlug`, `getProjectImage`, `acf`, `technologies`).
- [x] **Step 4.2:** Import all 5 theme components at the top of the file.
- [x] **Step 4.3:** Replace the DOM with the Dispatcher logic. Insert the `<script is:inline>` to handle the `sessionStorage` seed generation.
- [x] **Step 4.4:** Render all components but wrap them in `.theme-wrapper` divs with corresponding `data-theme-id` attributes.
- [x] **Step 4.5:** Implement the CSS to toggle visibility based on the `<html>` attribute.

**Target Code Structure for `[slug].astro`:**
```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
import DecorBreak from '../../components/decor/DecorBreak.astro';
import { getProjectBySlug, getProjectImage, getAllProjects } from '../../lib/api';

import ThemeAppleSpatial from '../../components/themes/ThemeAppleSpatial.astro';
import ThemeTerminalDark from '../../components/themes/ThemeTerminalDark.astro';
import ThemeMinimalGrid from '../../components/themes/ThemeMinimalGrid.astro';
import ThemeSplitScreen from '../../components/themes/ThemeSplitScreen.astro';
import CustomMemorySnatcher from '../../components/themes/CustomMemorySnatcher.astro';

export async function getStaticPaths() { ... } // Keep existing

const { slug } = Astro.params;
const project = slug ? await getProjectBySlug(slug) : null;
if (!project) return Astro.redirect('/404');

const image = await getProjectImage(project);
const acf = Array.isArray(project.acf) ? {} : (project.acf ?? {});
const technologies = acf.tech_stack ? acf.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

// Check if WP ACF field enforces a specific theme
const forceTheme = acf.theme_layout && acf.theme_layout !== 'random' ? acf.theme_layout : null;
---

<MainLayout title={project.title.rendered}>
  
  <script is:inline define:vars={{ slug, forceTheme }}>
    (function() {
      // 1. If ACF mandates a theme, use it.
      if (forceTheme) {
        document.documentElement.setAttribute('data-project-theme', forceTheme);
        return;
      }

      // 2. Define available random themes (excluding custom ones)
      const availableThemes = ['theme_apple_spatial', 'theme_terminal_dark', 'theme_minimal_grid', 'theme_split_screen'];
      
      // 3. Check SessionStorage to maintain theme consistency per project during the visit
      const storageKey = `theme_seed_${slug}`;
      let selectedTheme = sessionStorage.getItem(storageKey);

      // 4. Generate new theme if none exists in session
      if (!selectedTheme) {
        const randomIndex = Math.floor(Math.random() * availableThemes.length);
        selectedTheme = availableThemes[randomIndex];
        sessionStorage.setItem(storageKey, selectedTheme);
      }

      // 5. Apply to HTML tag instantly (prevents FOUC)
      document.documentElement.setAttribute('data-project-theme', selectedTheme);
    })();
  </script>

  <div class="project-theme-dispatcher">
    <div class="theme-wrapper" data-theme-id="theme_apple_spatial">
      <ThemeAppleSpatial project={project} acf={acf} image={image} technologies={technologies} />
    </div>
    
    <div class="theme-wrapper" data-theme-id="theme_terminal_dark">
      <ThemeTerminalDark project={project} acf={acf} image={image} technologies={technologies} />
    </div>

    <div class="theme-wrapper" data-theme-id="theme_minimal_grid">
      <ThemeMinimalGrid project={project} acf={acf} image={image} technologies={technologies} />
    </div>

    <div class="theme-wrapper" data-theme-id="theme_split_screen">
      <ThemeSplitScreen project={project} acf={acf} image={image} technologies={technologies} />
    </div>

    <div class="theme-wrapper" data-theme-id="custom_memorysnatcher">
      <CustomMemorySnatcher project={project} acf={acf} image={image} technologies={technologies} />
    </div>
  </div>

  <DecorBreak id="project-detail-end" />
</MainLayout>

<style>
  /* Global Dispatcher CSS */
  .theme-wrapper {
    display: none; /* Hide all by default */
  }

  /* Reveal the selected theme based on the HTML attribute set by the inline script */
  :global(html[data-project-theme="theme_apple_spatial"]) .theme-wrapper[data-theme-id="theme_apple_spatial"],
  :global(html[data-project-theme="theme_terminal_dark"]) .theme-wrapper[data-theme-id="theme_terminal_dark"],
  :global(html[data-project-theme="theme_minimal_grid"]) .theme-wrapper[data-theme-id="theme_minimal_grid"],
  :global(html[data-project-theme="theme_split_screen"]) .theme-wrapper[data-theme-id="theme_split_screen"],
  :global(html[data-project-theme="custom_memorysnatcher"]) .theme-wrapper[data-theme-id="custom_memorysnatcher"] {
    display: block;
    animation: themeFadeIn 0.5s ease-out forwards;
  }

  @keyframes themeFadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
```

## Phase 5: Verification & Testing
- [ ] Run `npm run dev`.
- [ ] Navigate to a project detail page.
- [ ] Inspect the `<html>` tag in DevTools. Verify `data-project-theme` is injected immediately.
- [ ] Check `Application > Session Storage` in DevTools. Verify `theme_seed_[slug]` is stored.
- [ ] Refresh the page (F5). Ensure the theme does NOT change (reads from session).
- [ ] Open a new project. Verify it might roll a different theme.
- [ ] Close the browser tab entirely and reopen. Verify a new theme might be rolled since `sessionStorage` is cleared.
