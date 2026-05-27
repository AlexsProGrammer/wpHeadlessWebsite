# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Execute Part 3 of the mobile optimization strategy: Mobile UX Divergence (Tabs + CSS Scroll-Snap). Split the interactive framework so that desktop screens maintain the highly interactive 3D orbital animation, while mobile platforms transition to a lightweight, performant, and native 60fps card scroller paired with top tab-based navigation.
- **Tech Stack & Dependencies:** Astro, CSS Scroll-Snap, Vanilla JS, GSAP (for lightweight mobile crossfades only).
- **File Structure:**
  ```text
  ├── src/
  │   ├── components/
  │   │   └── SlidingBento.astro  (Modify)

```

* **Attention Points:** - Ensure the mobile media queries override all complex grid coordinates (`grid-area`) used in `.layout-0` through `.layout-3` without causing stylesheet cascade leaks.
* The center card (`.card-center`) must be completely hidden on mobile devices, making room for a full breakout slider.
* Resetting scroll position on tab switch must use smooth native behavior (`behavior: 'smooth'`) to maximize modern mobile platform design patterns.


* **DSGVO:** Native browser features (`scroll-snap`, `matchMedia`) perform calculations entirely on the user's local system. No user telemetry, touch trackers, or analytics are transferred.

## 2. Execution Phases

#### Phase 1: CSS Layout Overrides for Mobile Swiping

* [x] **Step 1.1:** Open `src/components/SlidingBento.astro` and locate the desktop `<style>` block. At the bottom, enhance the existing `@media (max-width: 768px)` query.
* [x] **Step 1.2:** Within the mobile media query, override `.bento-container` to break out of the 3-column grid structure. Transition it to `display: flex !important; flex-direction: row !important; overflow-x: auto !important; scroll-snap-type: x mandatory !important; -webkit-overflow-scrolling: touch;`. Add horizontal padding (`padding: 0 1.5rem 1.5rem;`) and negative margins if necessary to enable edge-to-edge swiping.
* [x] **Step 1.3:** Within the mobile media query, target `.orbit-card`. Apply flex configurations: `flex: 0 0 85% !important; max-width: 85% !important; width: 85% !important; scroll-snap-align: center !important; position: relative !important;`. Explicitly override any layout rotations or transitions by enforcing `transform: none !important; left: auto !important; top: auto !important;`.
* [x] **Step 1.4:** Within the mobile media query, target the center card toggle track (`.card-center`, `#sb-center-card`) and force-hide it completely via `display: none !important;`.
* [ ] **Verification:** Run `npm run dev`. Open Chrome Developer Tools, toggle the device toolbar, and set the screen size to mobile viewport widths (e.g., 375px). Verify that the 4 bento cards now line up horizontally and allow hardware-accelerated horizontal swiping that smoothly snaps into place for each card.

#### Phase 2: Client-Side Environment Separation

* [ ] **Step 2.1:** Scroll down to the `<script>` block in `src/components/SlidingBento.astro`. Locate the beginning of the `init()` execution block.
* [ ] **Step 2.2:** Instantiate a media match query instance at the top of the function: `const mobileQuery = window.matchMedia("(max-width: 768px)");`.
* [ ] **Step 2.3:** Group the GSAP configuration logic. Wrap the executions for `setupCenterBtn()` and `playEntryAnimation()` inside an environment condition check: `if (!mobileQuery.matches) { ... }`.
* [ ] **Step 2.4:** Under the `else` branch of the media condition (running exclusively on mobile layout initialization), trigger a GSAP property reset using `gsap.set(orbitCards, { clearProps: "all" });` to scrub out inline remnants left behind during orientation flips or desktop window resizing.
* [ ] **Verification:** Refresh your browser in mobile responsive mode. Inspect the console and verify that the script executes cleanly without registering GSAP Draggable dependencies or absolute calculation warnings on the hidden center track knob element.

#### Phase 3: Mobile Tab Switching Mechanics & Smooth Scroll Reset

* [ ] **Step 3.1:** In the `<script>` tag, find the click event registration loop assigned to the category label nodes (`catEls.forEach(...)`).
* [ ] **Step 3.2:** Refactor the internal event block to differentiate between interfaces. If `mobileQuery.matches` evaluates to true, intercept the execution path and route it to a new client utility function named `executeMobileTabSwitch(i, lang);`.
* [ ] **Step 3.3:** Define `executeMobileTabSwitch(targetStep, lang)`. Update the system loop track state: set `step = targetStep;` and invoke the existing tracking method `updateLabels(targetStep, lang);` to update active highlighters on the header navigation pills.
* [ ] **Step 3.4:** Inside `executeMobileTabSwitch`, perform a lightweight opacity crossfade across the card sub-contents. Target the child active elements, animate their `opacity` to 0 over 0.15 seconds, loop through to switch active visibility flags (`.is-active`) matching the target step, and fade back to 1.
* [ ] **Step 3.5:** Conclude `executeMobileTabSwitch` by forcefully re-centering the carousel navigation track. Fetch the parent container object (`container`) and execute a smooth native scrolling reset: `container.scrollTo({ left: 0, behavior: 'smooth' });`.
* [ ] **Verification:** Click on the various category labels ("Über Mich", "Die Geschichte", "Leistungen", "Projekte") using mobile browser simulation. Confirm the text content across all 4 horizontal cards updates immediately with a clean fade transition, and that the viewport container automatically animations its scroll track smoothly back to the first card.

## 3. Global Testing Strategy

* **Swipe Velocity Boundary Test:** Swipe rapidly across the carousel items on a real touch display device. Verify that the CSS engine matches velocity correctly and reliably locks into viewport alignment on a singular card layout at each snap interval.
* **Carousel Navigation Reset Test:** Scroll horizontally deep into Card 3 or 4 of a given topic. Tap on an inactive category heading tab at the top. Confirm that content switches immediately and the browser smoothly rolls the carousel position back to show Card 1 without layout breaks.
* **Orientation Continuity Test:** Flip a mobile smartphone from portrait viewport mode to landscape wide-screen mode. Verify that layout cascades adapt dynamically and do not lock interface items into crushed column dimensions.
