# IMPLEMENTATION.md

## 1. Project Context & Architecture

* **Goal:** Execute Part 3 of the testing optimization strategy: Dynamic Metrics, Visual Cueing & Mobile Card Scaling. This phase replaces static fallback counters with live base-ten math pipeline equations, adds a physics-driven horizontal idle discovery loop to the toggle knob, and rescales mobile layouts to eradicate responsive element truncation.
* **Tech Stack & Dependencies:** Astro, Vanilla JavaScript, CSS Keyframes, GSAP (Core + Draggable).
* **File Structure:**
```text
├── src/
│   └── components/
│       └── SlidingBento.astro  (Modify)

```


* **Attention Points:** The idle wiggle interaction must cleanly decouple from the active GSAP Draggable logic to prevent timeline contention or erratic layout jumps when a user grabs the handle.
* **DSGVO:** Calculations and asset computations execute locally within the client viewport loop. No external asset trackers, telemetry tools, or micro-interaction tracking logs are deployed.

---

## 2. Execution Phases

#### Phase 1: Base-Tens Project Counter Automation Pipeline

* [x] **Step 1.1:** Open `src/components/SlidingBento.astro`. Locate line 98 in the frontmatter code block where `projectCountLabel` is hardcoded.
* [x] **Step 1.2:** Replace the line with an automated base-ten rounding formula that operates on the complete prop tree `highlightedProjects.length` (before slicing occurs):
```typescript
const totalCount = highlightedProjects.length;
const baseTens = totalCount >= 10 ? Math.floor(totalCount / 10) * 10 : totalCount;
const projectCountLabel = totalCount > 0 ? `${baseTens}+` : '0+';

```


* [x] **Verification:** Temporarily adjust your mock data or incoming WordPress fetch parameters to provide an arbitrary number of entries (e.g., 74 items). Build or run the development server, and inspect the project section on the home page. The counter badge must dynamically evaluate and render `70+` instead of an arbitrary static placeholder.

#### Phase 2: Slider Idle Physics Wiggle Micro-Interaction

* [ ] **Step 2.1:** In `src/components/SlidingBento.astro`, navigate to the client-side `<script>` tag. Declare a scoped reference tracking pointer: `let idleWiggleTimeline: gsap.core.Timeline | null = null;`.
* [ ] **Step 2.2:** Formulate an execution function named `initiateSliderIdleCue()`. Inside it, construct a looping GSAP timeline assigned to `idleWiggleTimeline` that targets the selector `#sb-center-btn`.
* [ ] **Step 2.3:** Set the timeline to repeat indefinitely (`repeat: -1`, `repeatDelay: 4.0`), executing a quick horizontal displacement sequence: animate `x: -6` over 0.1s (`ease: "sine.inOut"`), followed by `x: 6` over 0.15s, and return smoothly to `x: 0` over 0.5s with an elastic or custom spring ease.
* [ ] **Step 2.4:** Define a cleanup listener wrapper `killIdleWiggleCue()`. Inside it, check if `idleWiggleTimeline` is running; if true, invoke `.kill()`, clear it out (`null`), reset the thumb position to `x: 0`, and unbind the activation events from the toggle track container.
* [ ] **Step 2.5:** In the `init()` routine, trigger `initiateSliderIdleCue()` right after setting up the desktop button configuration. Attach a `pointerdown` event listener to `#sb-toggle-track` that pipes directly into your `killIdleWiggleCue()` handler to permanently terminate the idle loop on first contact.
* [ ] **Verification:** Load the home page on a desktop window and leave the page completely idle for 5 seconds. Confirm that the glassmorphic center knob executes a clean horizontal wiggle to signpost its interactivity to the user. Click or swipe the knob; verify that the loop breaks instantly and normal drag physics take over cleanly.

#### Phase 3: Mobile Aspect Ratio & Min-Height Scaling Correction

* [ ] **Step 3.1:** Locate the global scoped styling block inside `src/components/SlidingBento.astro` and find the mobile responsive rule block (`@media (max-width: 768px)`).
* [ ] **Step 3.2:** Locate line 728 where `.bento-card` is restricted to `min-height: 160px;`. Delete this line or overwrite it.
* [ ] **Step 3.3:** Apply a uniform vertical footprint constraint across the layout stack. Target the `.orbit-card` element selector within the screen query block and enforce an explicit minimum height bound: `min-height: 480px !important;`.
* [ ] **Step 3.4:** Ensure that structural children inside `.topic-content` layout blocks properly handle space distribution across this expanded height. Set `.card-content` elements inside mobile selectors to use `justify-content: space-between` or apply systematic spacing parameters to maintain text, badges, and link alignments without collisions.
* [ ] **Verification:** Open the site in Chrome DevTools using responsive phone profiles (e.g., Pixel 7 or iPhone SE). Cycle across all topics ("Über Mich", "Die Geschichte", "Leistungen", "Projekte"). Verify that long descriptive descriptions, multi-step vertical timelines, and project grid listings now sit inside the cards with generous structural padding and zero line cut-offs or overflow bugs.

---

## 3. Global Testing Strategy

* **Idle State Disengagement Test:** Leave the viewport stagnant to verify the slider wiggle loops periodically without building up event cycles in memory. Interact with it using various inputs (mouse drag, trackpad pan, touch gesture) to confirm that the loop disconnects permanently and leaves no execution trace.
* **Mobile Truncation Sweep Test:** Check every face layout combination at ultra-narrow screen widths (320px up to 480px). Ensure that no headings collide with action pills or overlap layout decorations.
* **Counter Metric Sanity Test:** Double-check that if zero projects return from the API endpoint, the counter renders an expected default cleanly without throwing errors or breaking layout arrays.