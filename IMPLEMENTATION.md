# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Execute Part 2 of the testing optimization strategy: Smart Scroll Trapping & Mouse-Wheel Pass-Through. This phase corrects obstructive layout behavior where hovering or scrolling over non-scrollable or fully-scrolled terminal component paths traps the mouse wheel input, passing it back into the global smooth scroll engine (Lenis) seamlessly.
- **Tech Stack & Dependencies:** Astro, Vanilla JavaScript, Lenis Smooth Scroll.
- **File Structure:**
  ```text
  ├── src/
  │   └── components/
  │       └── TerminalFooter.astro (Modify)

```

* **Attention Points:** The event handlers must register with `{ passive: false }` to enable conditional execution blocking via `e.preventDefault()` only when the terminal is actively absorbing internal scrolling tracks.
* **DSGVO:** This optimization phase utilizes native client-side events exclusively. No analytical mouse tracking, scroll logging, or interaction metrics are captured or forwarded to remote servers.

## 2. Execution Phases

#### Phase 1: Dynamic Overflow Assessment & Pointer Interaction Control

* [x] **Step 1.1:** In `src/components/TerminalFooter.astro`, locate the `<script>` tag and query the primary terminal content scroll viewport element (e.g., `.terminal-body` or its container wrapper).
* [x] **Step 1.2:** Attach a client-side `wheel` event listener to the terminal container with the option parameter `{ passive: false }`.
* [x] **Step 1.3:** Inside the event callback, establish an overflow layout condition that compares the container's physical layout metrics: `const isScrollable = container.scrollHeight > container.clientHeight;`.
* [x] **Step 1.4:** Implement conditional fallback logic: If `isScrollable` evaluates to false (the content is fully visible without scrolling), allow the event to bubble up unhindered without execution blocks, or forward the delta directly into the main viewport scroller instance via `(window as any).__lenis?.scroll(e.deltaY);`.
* [x] **Verification:** Run `npm run dev`. Open your local instance on a desktop viewport. When the terminal outputs short lines of text (no active scrollbar tracks visible), hover over the terminal window and roll the scroll wheel. The parent main layout page must scroll smoothly and instantly.

#### Phase 2: Boundary Escape Logic & Lenis Momentum Forwarding

* [ ] **Step 2.1:** Inside the `wheel` event handler block for `src/components/TerminalFooter.astro`, extract the dynamic runtime position parameters: `const { scrollTop, scrollHeight, clientHeight } = container;`.
* [ ] **Step 2.2:** Construct the top ceiling boundary detection rule: Check if the user is attempting an upward scroll input (`e.deltaY < 0`) while the element position is pinned to the top line (`scrollTop === 0`).
* [ ] **Step 2.3:** Construct the bottom floor boundary detection rule: Check if the user is attempting a downward scroll input (`e.deltaY > 0`) while the element position reaches the maximum height threshold (`scrollTop + clientHeight >= scrollHeight - 1`).
* [ ] **Step 2.4:** Integrate the pass-through bypass mechanism: If either boundary condition evaluates to true, do not block the window track. Instead, pass the scrolling momentum straight into the Lenis framework:
```typescript
if ((window as any).__lenis) {
  (window as any).__lenis.scroll(e.deltaY);
}

```


* [ ] **Step 2.5:** Enforce script execution hygiene: Only invoke `e.preventDefault()` if `isScrollable` is active and the current scroll positions lie strictly between the upper and lower boundary thresholds (meaning the terminal is actively absorbing the wheel action internally).
* [ ] **Verification:** Populate the terminal output container with long logs until a vertical scrollbar appears. Scroll internally down the terminal box. Once the scrollbar strikes the absolute bottom boundary, continue rolling the mouse wheel downwards. Confirm that the main page layout seamlessly catches the scrolling wheel momentum and continues moving downward without freezing or requiring cursor repositioning.

## 3. Global Testing Strategy

* **Short Terminal Pass-Through Test:** Verify that when the terminal window has fewer lines than its visual height constraints, mouse wheel scroll loops inside its boundary act exactly as if scrolling on standard blank page elements.
* **Edge Continuity Validation:** Scroll up and down inside a long log sequence. Ensure that hitting the top or bottom wall transitions scroll wheel momentum back to the parent Lenis layout with a frame-perfect handover.
* **Cross-Engine Delta Calibration Test:** Validate operation across Chromium, Gecko, and WebKit-based browser instances to verify that standard mouse wheel ticks (`e.deltaY`) feed steady translation numbers to the Lenis engine regardless of individual platform scalar differences.
