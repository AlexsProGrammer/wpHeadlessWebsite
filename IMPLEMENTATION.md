# IMPLEMENTATION.md

## 1. Project Context & Architecture
**Goal:** Build a high-performance, headless developer portfolio utilizing an Astro frontend and a WordPress REST API backend, hosted on separate domains via Plesk.
**Tech Stack & Dependencies:** Astro (Node.js framework), native `fetch` API for data retrieval, standard CSS/HTML, `dotenv` for environment variables. Command to initialize: `npm create astro@latest`.
**File Structure:**
├── .env
├── package.json
├── astro.config.mjs
├── src/
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── components/
│   │   ├── Header.astro
│   │   └── ProjectCard.astro
│   └── lib/
│       └── api.js

**Attention Points:** - The `.env` file must never be committed to source control.
- WordPress must have "Show in REST API" enabled for all Custom Post Types and Advanced Custom Fields.
- Plesk Node.js extension requires a specific entry point for production; Astro builds static files by default, which can be served by Nginx directly, or configured for SSR (Server-Side Rendering) via the `@astrojs/node` adapter if dynamic server routing is preferred. We will use Static Site Generation (SSG) for maximum speed.

## 2. Execution Phases

#### Phase 1: Environment & Scaffolding Setup
- [ ] **Step 1.1:** In the terminal, run `npm create astro@latest` to scaffold the project directory.
- [ ] **Step 1.2:** In the root directory, create a `.env` file and define `PUBLIC_WP_API_URL=https://wp.yourdomain.de/wp-json/wp/v2`.
- [ ] **Step 1.3:** In `src/layouts/MainLayout.astro`, create the base HTML boilerplate containing a `<slot />` tag for rendering page content.
- [ ] **Verification:** Run `npm run dev` and verify the default Astro page loads at `http://localhost:4321`.

#### Phase 2: API Utility Configuration
- [ ] **Step 2.1:** In `src/lib/api.js`, create an asynchronous function `getAllProjects()` utilizing the native `fetch` API.
- [ ] **Step 2.2:** Configure `getAllProjects()` to target `import.meta.env.PUBLIC_WP_API_URL + '/projects?_embed'`. The `?_embed` parameter is crucial for retrieving featured images alongside post data.
- [ ] **Step 2.3:** Parse the JSON response and return the data array.
- [ ] **Verification:** In `src/pages/index.astro`, import `getAllProjects()`, `console.log` the result in the component script, run `npm run dev`, and verify the terminal outputs the JSON array from your WordPress database.

#### Phase 3: Project Archive Implementation
- [ ] **Step 3.1:** In `src/components/ProjectCard.astro`, define the properties (`title`, `excerpt`, `link`) and write the HTML/CSS layout for a single grid item.
- [ ] **Step 3.2:** In `src/pages/projects/index.astro`, import `getAllProjects()` and `ProjectCard.astro`.
- [ ] **Step 3.3:** In `src/pages/projects/index.astro`, map over the fetched projects array and render a `<ProjectCard />` for each item, passing the WordPress JSON properties into the component.
- [ ] **Verification:** Navigate to `http://localhost:4321/projects` in the browser and visually confirm a list or grid of your WordPress projects is rendering.

#### Phase 4: Dynamic Single Project Routing
- [ ] **Step 4.1:** In `src/pages/projects/[slug].astro`, export a `getStaticPaths()` function.
- [ ] **Step 4.2:** Inside `getStaticPaths()`, utilize `getAllProjects()` to fetch all projects, and map them to return an array of objects containing `params: { slug: project.slug }` and `props: { project }`.
- [ ] **Step 4.3:** In the HTML section of `src/pages/projects/[slug].astro`, access `Astro.props.project` and render the individual project details (Title, Content via `set:html`, and Custom Fields like GitHub URLs).
- [ ] **Verification:** Click on a project card from the `/projects` page and verify the application successfully routes to `/projects/your-project-slug` and displays the correct detailed content.

#### Phase 5: Production Build Configuration
- [ ] **Step 5.1:** In the terminal, run `npm run build` to generate the static production files.
- [ ] **Step 5.2:** Verify the `/dist` directory is populated with pure HTML, CSS, and optimized assets.
- [ ] **Verification:** Run `npm run preview` to serve the local production build and verify all links and images function correctly outside of development mode.

## 3. Global Testing Strategy
- **Data Synchronization:** Update a project title in the WordPress `/wp-admin` dashboard, rebuild the frontend (`npm run build`), and verify the change reflects on the main domain.
- **Routing Integrity:** Manually enter a non-existent project URL (e.g., `/projects/does-not-exist`) and verify a proper 404 page is handled.
- **Asset Loading:** Verify that featured images sourced from the `wp.yourdomain.de` subdomain load correctly on the main frontend without CORS errors or broken links.
- **Responsive Layout:** Test the CSS grid and typography on mobile viewport dimensions to ensure the UI handles varying lengths of WordPress-provided content gracefully.