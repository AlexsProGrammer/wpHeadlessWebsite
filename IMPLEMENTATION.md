# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Execute Part 2 of the mobile optimization strategy: Architectural Refactor (Astro SSG Alignment). We will migrate the massive JavaScript-based HTML generation (`innerHTML`) into server-side rendered Astro markup. This drastically improves SEO, eliminates JS-parsing lag during mobile animations, and reduces the client bundle.
- **Tech Stack & Dependencies:** Astro, Vanilla JavaScript, GSAP. 
- **File Structure:**
  ```text
  ├── src/
  │   ├── components/
  │   │   └── SlidingBento.astro  (Modify)

```

* **Attention Points:** - The 4 Orbit Cards follow a strict mathematical matrix: `pos = (orbitIdx + targetStep) % 4`. Each Orbit Card must contain exactly 4 statically rendered `.topic-content` blocks corresponding to its content across the 4 steps.
* **i18n Alignment:** Since Astro renders on the server, use default German text in the HTML but add `data-i18n="[translation-key]"` attributes to every translatable element so `src/i18n/client.ts` can hydrate it automatically on the client.
* **GSAP Flip Compatibility:** The GSAP Flip logic requires the `.card-face` to remain intact. We will toggle the visibility of the inner `.topic-content` wrappers inside `.card-face` instead of destroying and recreating the DOM.


* **DSGVO:** No external APIs or third-party tracking added. Server-Side Generation (SSG) respects privacy by offloading computation from the client.

## 2. Execution Phases

#### Phase 1: Astro Server-Side Data Preparation

* [x] **Step 1.1:** In the frontmatter (the `---` block at the top) of `src/components/SlidingBento.astro`, define a mapping array/function that resolves the matrix logic. For a given `orbitIdx` (0-3) and `step` (0-3), calculate the `topicIndex` (which equals `step`) and the positional layout `pos = (orbitIdx + step) % 4`.
* [x] **Step 1.2:** In the frontmatter, ensure `highlightedProjects` (passed via Props) is available to be mapped directly into the HTML for Topic 3. Remove the `projectsJSON` stringification logic—it is no longer needed.
* [x] **Verification:** Run the Astro build (`npm run build`). It should complete without type errors regarding the removed `projectsJSON`.

#### Phase 2: Statically Rendering the Orbit Matrix (HTML Migration)

* [x] **Step 2.1:** In the template section of `src/components/SlidingBento.astro`, update the 4 `<div class="bento-card orbit-card">` blocks. Inside each card's front `.card-face`, create a loop that iterates 4 times (for steps 0 to 3).
* [x] **Step 2.2:** For each step in the loop, render a wrapper `<div class="topic-content" data-step="{step}" data-pos="{pos}">`.
* [x] **Step 2.3:** Extract the raw HTML from `renderAboutMeCard`, `renderOriginCard`, `renderServicesCard`, and `renderProjectCard` (currently in the `<script>` tag). Port this HTML directly into your Astro template inside the respective `.topic-content` wrappers.
* [x] **Step 2.4:** Replace all JavaScript template literal translations (e.g., `${t('bento.about.n.title', lang)}`) with standard text wrapped with data attributes: e.g., `<h3 class="hero-title" data-i18n="bento.about.n.title">Über Mich</h3>`.
* [x] **Step 2.5:** For the Project cards (Topic 3), use the `highlightedProjects` prop to dynamically generate the project markup (Title, excerpt, image URL, and tech stack pills) directly via Astro JSX/map syntax. Handle the empty state fallback exactly as the JS function did.
* [x] **Verification:** Inspect the page source in the browser (`Ctrl+U` or `Cmd+U`). Verify that the raw HTML for all topics, origins, services, and projects is present in the source code on initial load.

#### Phase 3: CSS Visibility & State Management

* [ ] **Step 3.1:** In the `<style>` block, add rules to hide `.topic-content` by default. Example: `.topic-content { display: none; opacity: 0; }`.
* [ ] **Step 3.2:** Add an active state class: `.topic-content.is-active { display: flex; opacity: 1; height: 100%; }`. (Ensure `flex-direction: column` and `gap` properties are retained from the old `.card-face` logic).
* [ ] **Step 3.3:** Ensure the `.card-face` logic accommodates this new wrapper without breaking the background gradients, paddings, and positional overrides (e.g., `.card-face[data-pos="0"]`). You may need to map the `data-pos` attribute to the visible `.topic-content` wrapper rather than `.card-face`.
* [ ] **Verification:** Run `npm run dev`. On initial load, only the contents for `data-step="0"` should be visible on the screen. The layout should look visually identical to the original JS-rendered version.

#### Phase 4: Client-Side Script Refactor & GSAP Adaptation

* [ ] **Step 4.1:** Delete the `renderAboutMeCard`, `renderOriginCard`, `renderServicesCard`, and `renderProjectCard` functions from the `<script>` tag in `SlidingBento.astro`.
* [ ] **Step 4.2:** Rewrite the `populateTopicCards` function. It no longer needs to use `innerHTML`. It should simply find all `.topic-content` elements within the current `orbitCards` and toggle the `.is-active` class so that only the wrapper matching `data-step="${targetStep}"` is active.
* [ ] **Step 4.3:** In the `goToStep(targetStep)` function, update the `Flip` preparation logic. Instead of injecting `innerHTML` into `.card-face-back`, toggle the `.is-active` classes on the back face to match the `targetStep`.
* [ ] **Step 4.4:** In the `goToStep` cleanup phase (after `flipMoveDone`), swap the active classes on the front face, reset the back face, and remove the GSAP `rotateY` clears as before.
* [ ] **Verification:** Click the Center Knob arrows on Desktop. The 3D flip animation must execute smoothly, swapping from "Über Mich" to "Die Geschichte", without layout thrashing and with zero `innerHTML` manipulations occurring in the console/devtools.

## 3. Global Testing Strategy

* **SEO/No-JS Test:** Disable JavaScript in your browser. Refresh the page. The "Über Mich" bento cards MUST be fully rendered, visible, and styled perfectly. Inspect the DOM to ensure the markup for the other 3 steps is present but hidden.
* **i18n Hydration Test:** Use the `LangToggle` component to switch the site to English. Verify that the statically rendered text inside the Bento Cards updates immediately (powered by the existing `client.ts` looking for `data-i18n` attributes).
* **GSAP Integrity Test:** Repeatedly click the next and previous arrows on the center card. Ensure the `Flip` animations and 3D rotations still sync perfectly without flashing blank cards.
