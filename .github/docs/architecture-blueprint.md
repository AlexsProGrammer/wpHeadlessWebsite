# Architecture Blueprint

## Project: wpHeadlessWebsite

### Overview
Astro-based headless CMS website consuming WordPress API as backend data source.

### Directory Structure

```
src/
├── pages/                 # File-based routing (Astro filesystem router)
│   └── index.astro       # Homepage
├── components/           # Reusable UI components
├── layouts/             # Page templates (e.g., BlogLayout, PageLayout)
└── utils/               # Helper functions
    ├── wordpress.ts     # WordPress API client
    ├── types.ts         # Shared TypeScript interfaces
    └── helpers.ts       # General utilities

public/                  # Static assets (images, fonts, etc.)
astro.config.mjs         # Astro configuration
tsconfig.json            # TypeScript configuration
package.json             # Project metadata & dependencies
```

### Data Flow

1. **Static Build** (SSG):
   - Pages at build time fetch from WordPress REST API
   - Generated static HTML files

2. **Client Rendering**:
   - Use `client:load` for interactive components
   - Hydration only when needed

3. **API Integration**:
   - WordPress REST API endpoints
   - Utility function in `src/utils/wordpress.ts`
   - Type definitions in `src/utils/types.ts`

### Key Patterns

- **File-based routing**: URLs map directly to file structure (`/src/pages/index.astro` → `/`)
- **Component reusability**: Astro components in `src/components/`
- **Type safety**: All business logic typed with TypeScript interfaces
- **Build-time data fetching**: Via Astro 6.x loader API

### Current State
✓ Astro 6.x configured  
✓ TypeScript strict mode enabled  
□ WordPress data fetching layer  
□ Layout components  
□ Styling system  
□ Deployment configuration
