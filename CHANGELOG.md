# Changelog

## [0.0.6] - 2026-05-27

### Added
- **Scroll Memory & Navigation Persistence** (Phase 1–3): full sessionStorage-based state sync across in-session navigation
- `SolarLoader`: sets `solarLoaderActive` flag in sessionStorage on load; clears it and calls `lenis.resize()` + `lenis.start()` inside a `requestAnimationFrame` after the animation ends, preventing Lenis from retaining a stale `limit=0` calculated while `overflow:hidden` was active
- `SolarLoader`: `onPageShow` guard — only calls `unlockScroll()` on bfcache restores (`event.persisted`), preventing premature CSS removal during the intro animation
- `SolarLoader`: hard reload (`Ctrl+Shift+R`) detection clears `sb-active-step` and all `scroll-pos-*` sessionStorage keys, resetting the site to its default state
- `SlidingBento`: `init()` reads `sb-active-step` from sessionStorage and restores the active layout, labels, and topic cards to the previously viewed step on back-navigation
- `SlidingBento`: `goToStep()` and `executeMobileTabSwitch()` both persist the active step index to `sessionStorage` on every transition
- `MainLayout`: Lenis `scroll` event listener records the current scroll offset under `scroll-pos-{pathname}` on every frame
- `MainLayout`: after Lenis initialises, restores the saved scroll position for navigations that bypassed the loader (soft nav / back-forward), skipping restoration when `solarLoaderActive` is set

### Fixed
- Scroll completely blocked after the SolarLoader animation on hard reload — root cause: Lenis measured `limit=0` while `overflow:hidden` was applied, then never recalculated; resolved with `lenis.resize()` post-repaint
- `pageshow` event incorrectly stripping `solar-loading` CSS mid-animation on initial page load

### Added
- Local Inter font via `@fontsource/inter` (DSGVO compliant, no external CDN)
- CSS custom properties for dark space theme (`--bg-dark`, `--text-main`, `--text-muted`, `--accent-blue`)
- Glassmorphism styling on ProjectCard component (`backdrop-filter: blur(20px)`)
- Footer component with Impressum/Datenschutz links
- B2B landing page funnel (Hero, Trust Bar, Value Propositions, Services, Featured Projects)
- CSS marquee trust bar for tech stack logos
- Impressum page (`/impressum`) with standard § 5 TMG scaffold
- Datenschutzerklärung page (`/datenschutz`) with full DSGVO privacy policy scaffold
- Dark mode scoping for WordPress content via `:global()` selectors

### Changed
- Landing page rewritten from portfolio to B2B akquise funnel
- Featured projects limited to top 2 on homepage
- Project cards updated with translucent glass effect and blue glow hover
- Project detail buttons restyled with glow/magnetic hover effects
- All hard-coded colors replaced with CSS variables
