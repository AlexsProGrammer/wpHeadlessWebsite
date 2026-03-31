# Copilot Instructions

## Tech Stack
- **Framework**: Astro 6.x (TypeScript)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js ≥22.12.0
- **Package Manager**: npm
- **Project Type**: Headless CMS website (WordPress backend)

## Coding Standards

### TypeScript
- Enable `strict: true` in tsconfig.json (already enforced)
- No `any` types without `// @ts-ignore` comments and justification
- All function parameters and return types must be explicitly typed
- Use `const` by default; `let` only when variable is reassigned

### Astro Components
- `.astro` files use TypeScript frontmatter (between `---` markers)
- Component props must be typed with interfaces
- Use TypeScript strict mode in all components
- Keep server logic in frontmatter; client logic in `<script client:*>` blocks
- SSR-safe only; use `client:only` directives sparingly

### Code Organization
- `/src/pages/` - Astro routes (filesystem-based routing)
- `/src/components/` - Reusable Astro components
- `/src/layouts/` - Page layout wrappers
- `/src/utils/` - Helper functions and utilities
- `public/` - Static assets (served as-is)

## Verification Commands
```bash
npm run build      # Type-check and build
npm run dev        # Local dev with HMR
astro check        # TypeScript validation
```

## Agent Routing
- **Architect** (`/plan`): Generates IMPLEMENTATION.md checklists from user requests
- **Engineer** (`/execute`): Executes implementation steps and runs tests
- **Debug** (`/debug`): Fixes errors with minimal changes
- **Explain** (`/explain`): Analyzes code architecture and data flow
