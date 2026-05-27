# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Execute Part 1 of the testing optimization strategy: Scroll Memory, Page Loading Isolation & Navigation Persistence. This phase resolves layout jarring, interaction leakage during introductory load sequences, and viewport misalignments by syncing state history records across session switches.
- **Tech Stack & Dependencies:** Astro, Vanilla JavaScript, SessionStorage API, Lenis Smooth Scroll.
- **File Structure:**
  ```text
  ├── src/
  │   ├── components/
  │   │   ├── SolarLoader.astro   (Modify)
  │   │   └── SlidingBento.astro  (Modify)
  │   └── layouts/
  │       └── MainLayout.astro    (Modify)

```

* **Attention Points:** Maintain absolute state isolation. Ensure that interactions with Lenis do not attempt execution before the global window tracker instance (`window.__lenis`) has finished initialization inside `MainLayout.astro`.
* **DSGVO:** All synchronization metrics are processed exclusively in the browser using the local `sessionStorage` API. No persistent tracking records, external analytics cookies, or identifier parameters are dispatched to remote servers, remaining 100% compliant with German privacy regulations.

## 2. Execution Phases

#### Phase 1: Loader Interaction Isolation & Viewport Anchoring

* [x] **Step 1.1:** Open `src/components/SolarLoader.astro`. Inside the `<script>` block, find the `lockScroll()` function definition.
* [x] **Step 1.2:** Augment `lockScroll()` to immediately stop the Lenis engine and mark the session loading active state flag. Add:
```typescript
sessionStorage.setItem("solarLoaderActive", "true");
(window as any).__lenis?.stop();

```


* [x] **Step 1.3:** Find the `unlockScroll()` function definition. Augment it to release the Lenis execution lock:
```typescript
sessionStorage.removeItem("solarLoaderActive");
(window as any).__lenis?.start();

```


* [x] **Step 1.4:** Locate the `finishLoader()` function block. Near the end of the execution block (right after `unlockScroll()`), insert conditional check logic to enforce top anchoring for active loaders or trigger memory restoration for skipped frames:
```typescript
if (shouldShow) {
  (window as any).__lenis?.scrollTo(0, { immediate: true });
} else {
  const savedScroll = sessionStorage.getItem(`scroll-pos-${window.location.pathname}`);
  if (savedScroll) {
    requestAnimationFrame(() => {
      (window as any).__lenis?.scrollTo(parseFloat(savedScroll), { immediate: true });
    });
  }
}

```


* [x] **Verification:** Perform a hard reload (`Ctrl+F5` or `Cmd+Shift+R`) on the home page. Verify that scroll wheel gestures and touch swipes are totally blocked while the solar alignment animation is visible. Once the black hole collapses and fades out, verify the viewport is cleanly locked to the absolute top of the Hero section.

#### Phase 2: Sliding Bento State Persistence Cache

* [ ] **Step 2.1:** Open `src/components/SlidingBento.astro`. Locate the tracking script initialization method `init()`.
* [ ] **Step 2.2:** Locate the statement assignment `step = 0;` inside `init()`. Replace this statement with a retrieval look-up targeting session transaction logs:
```typescript
const cachedStep = sessionStorage.getItem("sb-active-step");
step = cachedStep !== null ? parseInt(cachedStep, 10) : 0;

```


* [ ] **Step 2.3:** Locate the fallback layout assignment configuration inside `init()`:
```typescript
LAYOUT_CLASSES.forEach(cls => container!.classList.remove(cls));
container.classList.add(LAYOUT_CLASSES[step]);

```


Ensure it accepts this restored index value dynamically instead of defaulting to layout zero. Pass `step` into `populateTopicCards` and `updateLabels` respectively.
* [ ] **Step 2.4:** Locate the internal state update lines within the `goToStep(targetStep)` rotation handler block. Append a state mutation update trigger:
```typescript
sessionStorage.setItem("sb-active-step", String(targetStep));

```


* [ ] **Step 2.5:** Locate the desktop-to-mobile matching transition routing logic within the vertical mobile swiper utility function `executeMobileTabSwitch(targetStep, lang)`. Append an identical record entry block directly below the local index step updates:
```typescript
sessionStorage.setItem("sb-active-step", String(targetStep));

```


* [ ] **Verification:** Load the web application, click the center tracking disk knob to advance the layout to Step 2 ("Leistungen"). Click a link to open another sub-route or legal text page. Click the browser's Back button. Verify that the Sliding Bento initializes immediately on Step 2 with proper navigation label indicators active.

#### Phase 3: Lenis Scroll Coordinate Tracker Integration

* [ ] **Step 3.1:** Open `src/layouts/MainLayout.astro` and find the `<script>` tag where the `Lenis` smoothing instance is configured.
* [ ] **Step 3.2:** Inside the tracking listener block (`lenis.on("scroll", ...)`), append an execution statement to continuously record viewport progress values:
```typescript
sessionStorage.setItem(`scroll-pos-${window.location.pathname}`, String(lenis.scroll));

```


* [ ] **Step 3.3:** Below the global identifier binding assignment (`(window as any).__lenis = lenis;`), attach an automated check to catch navigation events that bypassed full loader execution passes:
```typescript
if (!sessionStorage.getItem("solarLoaderActive")) {
  const historicalPos = sessionStorage.getItem(`scroll-pos-${window.location.pathname}`);
  if (historicalPos) {
    requestAnimationFrame(() => {
      lenis.scrollTo(parseFloat(historicalPos), { immediate: true });
    });
  }
}

```


* [ ] **Verification:** Navigate to the main home page, scroll down directly to the `SlidingBento` section container, and click the Project Gallery redirection link. Once the gallery page resolves, scroll halfway down its track and click on any specific individual project case detail view. Press Back to return to the project overview gallery, and confirm your exact position down the list is restored. Press Back once more to return to the root home page; verify the browser instantly slides the view down to keep the `SlidingBento` section perfectly focused.

## 3. Global Testing Strategy

* **Navigation Context Isolation Test:** Confirm that opening the application inside a clean browser tab correctly plays the intro sequence and sets the coordinate track to 0, whereas in-session link navigation leaves previous coordinates unbothered.
* **Session Cache Sanitation Test:** Open Developer Tools -> Application -> Session Storage. Monitor updates to keys `sb-active-step` and URL scroll tracking paths during high-frequency navigation actions to ensure parameters write cleanly without memory leaks or syntax degradation errors.
