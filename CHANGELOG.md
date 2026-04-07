# Changelog

## [0.0.2] - 2026-04-08

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
