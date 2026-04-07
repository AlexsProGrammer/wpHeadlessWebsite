```markdown
# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Upgrade the existing UI to a highly vibrant, "Apple glass modern" aesthetic with animated glowing background orbs, a typewriter hero effect, and a fully functional interactive terminal easter egg. Introduce missing global navigation (Back to Home).
- **Tech Stack & Dependencies:** Astro, Native CSS (Keyframe animations, CSS variables, `backdrop-filter` for glassmorphism), Vanilla JavaScript (for typewriter and terminal logic). No new external dependencies required.
- **File Structure:**
  ```text
  ├── src/
  │   ├── layouts/
  │   │   └── MainLayout.astro
  │   ├── pages/
  │   │   ├── index.astro
  │   │   └── projects/
  │   │       ├── index.astro
  │   │       └── [slug].astro
  │   └── components/
  │       ├── ProjectCard.astro
  │       └── TerminalFooter.astro (new)
  ```
- **Attention Points:** The colorful aesthetic is achieved not by coloring the cards, but by adding large, heavily blurred (`filter: blur(150px)`) absolute-positioned background "blobs" behind ultra-transparent frosted glass cards (`rgba(255, 255, 255, 0.02)`). 

## 2. Execution Phases

#### Phase 1: Vibrant Backgrounds & Global CSS
- [x] **Step 1.1:** In `src/layouts/MainLayout.astro`, define new CSS variables in `:root` for neon colors: `--neon-blue: #00f0ff;`, `--neon-purple: #8a2be2;`, `--neon-pink: #ff007f;`.
- [x] **Step 1.2:** In `src/layouts/MainLayout.astro`, add global CSS classes for background glows (e.g., `.bg-blobs-container` using `position: fixed; z-index: -1; inset: 0; overflow: hidden;` and `.blob` using `position: absolute; border-radius: 50%; filter: blur(150px); opacity: 0.6;`). 
- [x] **Step 1.3:** In `src/layouts/MainLayout.astro`, define keyframe animations for the blobs (e.g., `@keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-30px) translateX(20px); } 100% { transform: translateY(0); } }`) and apply them to `.blob`.
- [x] **Step 1.4:** In `src/layouts/MainLayout.astro`, inject the `.bg-blobs-container` HTML containing 2-3 `.blob` `div`s with inline styles positioning them (e.g., top-left pink, bottom-right blue) right after the opening `<body>` tag.
- [x] **Verification:** Run `npm run dev` and confirm the dark background now features soft, vibrant, floating neon gradients while the main content scrolls over it.

#### Phase 2: Hero Section Typewriter Effect
- [x] **Step 2.1:** In `src/pages/index.astro`, wrap the main hero headline inside a span with a specific ID (e.g., `<h1 id="typewriter-text"></h1>`) and add a static span next to it for the blinking cursor (e.g., `<span class="cursor">_</span>`).
- [x] **Step 2.2:** In `src/pages/index.astro`, add CSS for `.cursor` utilizing an `@keyframes blink { 50% { opacity: 0; } }` animation.
- [x] **Step 2.3:** In `src/pages/index.astro`, add a `<script>` tag at the bottom. Implement Vanilla JS logic that takes a target string (e.g., "Maßgeschneiderte Software..."), clears the `innerHTML` of `#typewriter-text`, and sets an interval to append one character every `50ms`.
- [x] **Verification:** Reload `http://localhost:4321/` and verify the hero text dynamically types itself out character-by-character, followed by a continuously blinking cursor.

#### Phase 3: Interactive Terminal Easter Egg
- [x] **Step 3.1:** Create a new file `src/components/TerminalFooter.astro`.
- [x] **Step 3.2:** In `src/components/TerminalFooter.astro`, write the HTML for a macOS-like window (header with traffic-light buttons, body with a `.history` container, and an `<input type="text" autofocus>` line starting with `user@portfolio:~$`).
- [x] **Step 3.3:** In `src/components/TerminalFooter.astro`, add CSS to style it with a dark transparent background, monospaced font, no border/outline on the input, and glowing neon text.
- [x] **Step 3.4:** In `src/components/TerminalFooter.astro`, add a `<script>` block. Add an event listener to the input for the `Enter` key. When triggered, read the value, push the command to the `.history` div, and use a simple `switch` statement to output responses for commands like `help`, `clear`, `projects`, and `contact`. Clear the input field after execution.
- [x] **Step 3.5:** In `src/layouts/MainLayout.astro`, import and render `<TerminalFooter />` just above the closing `</body>` tag (or replacing the existing standard footer).
- [x] **Verification:** Scroll to the bottom of the homepage, click into the terminal input, type `help`, press Enter, and verify the terminal appends the predefined help text. Type `clear` to ensure the history empties.

#### Phase 4: Missing Navigation & UI Polish
- [x] **Step 4.1:** In `src/pages/projects/index.astro`, add an anchor tag right below the `.page-header` pointing back home (`<a href="/" class="btn-glass">← Zurück zur Startseite</a>`).
- [x] **Step 4.2:** In `src/pages/projects/[slug].astro`, add an identical "Zurück zur Übersicht" link at the top of the project detail content pointing to `/projects`.
- [x] **Step 4.3:** In `src/components/ProjectCard.astro`, verify that the background color is highly transparent (e.g., `background: rgba(20, 20, 25, 0.2);`) to allow the new global glowing blobs to shine through the glass filter.
- [x] **Verification:** Navigate to `/projects`, verify the "Back" button exists and routes correctly. Click a single project and verify its respective back button returns to the projects list.

## 3. Global Testing Strategy
- **Z-Index Integrity:** Verify that the `.bg-blobs-container` does not block pointer events for buttons, inputs, or links (ensure `pointer-events: none;` is on the background container).
- **Terminal Focus:** Ensure that typing in the terminal does not trigger unexpected browser shortcuts, and that scrolling the history div inside the terminal works if many commands are entered.
- **Glassmorphism Contrast:** Check the readability of white text (`--text-main`) when it overlaps exactly with a bright neon blob. Adjust the card's `backdrop-filter: blur()` or opacity if contrast is too low.
```