# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Execute Part 1 of the mobile optimization strategy: Foundational Layout & Viewport Stabilization. This phase resolves the 20-30px phantom horizontal gap on mobile devices and fixes the Hero section's bottom spacing issue by adapting to dynamic browser UI heights.
- **Tech Stack & Dependencies:** Astro, Vanilla CSS. (No new package dependencies required for this phase).
- **File Structure:** ```text
  ├── src/
  │   ├── layouts/
  │   │   └── MainLayout.astro    (Modify)
  │   ├── pages/
  │   │   └── index.astro         (Modify)

```

* **Attention Points:** Do not alter or remove the Lenis smooth scrolling or GSAP ScrollTrigger scripts in `MainLayout.astro` during these CSS adjustments. Ensure the horizontal lock does not accidentally hide intentionally overlapping visual elements (like cosmic decor).
* **DSGVO:** This phase involves purely local CSS changes. No external resources, fonts, or tracking scripts are introduced.

## 2. Execution Phases

#### Phase 1: Global Box-Sizing & Scrollbar Fix

* [x] **Step 1.1:** In `src/layouts/MainLayout.astro`, locate the `<style is:global>` block. Add a strict global reset at the top of the block to apply `box-sizing: border-box` to `*`, `*::before`, and `*::after`.
* [x] **Step 1.2:** In `src/layouts/MainLayout.astro` within the `html` selector block, change the `overflow-y` property from `scroll` to `auto`. (This prevents WebKit/iOS from reserving a blank track for hidden scrollbars).
* [x] **Step 1.3:** In `src/layouts/MainLayout.astro`, add `max-width: 100%;` to the `html` selector block.
* [x] **Step 1.4:** In `src/layouts/MainLayout.astro`, add `max-width: 100%;` and ensure `overflow-x: hidden;` is present and active on the `body` selector block.
* [ ] **Verification:** Run `npm run dev`. Open the site in Chrome DevTools (Mobile Viewport - iPhone 14 Pro). Inspect the `html` and `body` tags to verify computed styles for `max-width`, `box-sizing`, and `overflow-y` are correctly applied. Scroll down and verify no horizontal scroll/wobble is possible.

#### Phase 2: Hero Viewport Adaptation

* [ ] **Step 2.1:** In `src/pages/index.astro`, locate the `<style>` block at the bottom of the file.
* [ ] **Step 2.2:** Find the `.hero` class selector.
* [ ] **Step 2.3:** Locate the `height: 100svh;` property. Change this to `height: 100dvh;`. Leave the fallback `height: 100vh;` above it intact.
* [ ] **Verification:** Run `npm run dev`. Open the site on a physical mobile device (preferably iOS Safari). Scroll down slightly to trigger the browser's address bar to shrink. Verify that the Hero section dynamically resizes to fill the exact screen height without leaving a gap at the bottom or forcing unnatural jumps.

## 3. Global Testing Strategy

* **Horizontal Bleed Test:** On both desktop and mobile emulators, attempt to drag/swipe horizontally across the page (especially in the footer area and hero section). The viewport must remain strictly locked to the vertical axis.
* **Scrollbar Rendering Test:** Load the site on macOS Safari and iOS Safari. Ensure no empty grey/white scrollbar tracks appear on the right edge of the screen.
* **Dynamic Viewport Test:** On a physical mobile device, trigger the address bar to expand and collapse. Ensure the Hero section (`SupernovaHero.astro` wrapper) smoothly recalculates its height without breaking the layout of the `SlidingBento` section below it.
