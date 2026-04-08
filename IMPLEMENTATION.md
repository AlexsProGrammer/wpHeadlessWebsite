
# IMPLEMENTATION.md

## 1. Project Context & Architecture
- **Goal:** Migrate the Astro application from Static Site Generation (SSG) to Server-Side Rendering (SSR) to fetch real-time data and images directly from the WordPress REST API on every page load.
- **Tech Stack & Dependencies:** Astro, `@astrojs/node` adapter.
- **File Structure:**
  ```text
  ├── astro.config.mjs
  ├── package.json
  ├── src/
  │   ├── lib/
  │   │   └── api.js
  │   └── pages/
  │       └── projects/
  │           └── [slug].astro
  ```
- **Attention Points:** SSR requires an active Node.js server. Deployment on Plesk will shift from simple file hosting to utilizing the Plesk Node.js Extension.

## 2. Execution Phases

#### Phase 1: Install Node Adapter & Configure SSR
- [ ] **Step 1.1:** In the terminal, run `npx astro add node` to install the official Node.js adapter for Astro. Accept all default CLI prompts to automatically update your configuration.
- [ ] **Step 1.2:** Open `astro.config.mjs` and verify that `output: 'server'` and `adapter: node({ mode: "standalone" })` have been successfully injected into the `defineConfig` block.
- [ ] **Verification:** Run `npm run build` locally. Verify that the output folder (`/dist`) now contains a `/server` and `/client` folder, instead of just raw HTML files.

#### Phase 2: Refactor API for Single Project Fetching
- [ ] **Step 2.1:** In `src/lib/api.js`, create a new function `getProjectBySlug(slug)` to fetch a single project dynamically based on the URL.
- [ ] **Step 2.2:** Inside `getProjectBySlug`, implement the fetch request: `const response = await fetch(API_URL + '/projects?slug=' + slug + '&_embed');`. Return `data[0]` if the array has items, otherwise return `null`.
- [ ] **Verification:** In `src/pages/index.astro` temporarily import and call `console.log(await getProjectBySlug('memorysnatcher'))`. Run `npm run dev` and verify the single project JSON logs to the terminal. Remove the log afterward.

#### Phase 3: Remove getStaticPaths (Dynamic Routing)
- [ ] **Step 3.1:** Open `src/pages/projects/[slug].astro` and completely delete the `export async function getStaticPaths() { ... }` block.
- [ ] **Step 3.2:** In `src/pages/projects/[slug].astro`, extract the slug directly from the URL parameters at the top of the script block: `const { slug } = Astro.params;`
- [ ] **Step 3.3:** Below that, fetch the live project data: `const project = await getProjectBySlug(slug);`. Add a fallback block: `if (!project) return Astro.redirect('/404');` to handle invalid URLs.
- [ ] **Step 3.4:** Ensure the rest of the component uses the `project` object correctly to fetch the embedded image and ACF data.
- [ ] **Verification:** Run `npm run dev`, navigate to `http://localhost:4321/projects/memorysnatcher` and verify the page loads correctly in real-time. Change a text field in WordPress, refresh the Astro page in the browser, and verify the text updates instantly without a rebuild.

#### Phase 4: Plesk Node.js Deployment Setup
- [ ] **Step 4.1:** Run `npm run build` locally to generate the SSR production files. Compress the entire project directory (including `package.json`, `astro.config.mjs`, and the `/dist` folder) into a `.zip` file. Do *not* include `node_modules`.
- [ ] **Step 4.2:** In Plesk, navigate to your main domain, upload and extract the `.zip` file.
- [ ] **Step 4.3:** In Plesk, open the **Node.js** extension settings for that domain. Ensure Node version is 18+ and click "NPM Install".
- [ ] **Step 4.4:** In the Plesk Node.js settings, change the **Application Startup File** to `dist/server/entry.mjs`.
- [ ] **Step 4.5:** Click "Enable Node.js" and "Restart App" in Plesk.
- [ ] **Verification:** Visit your live domain. The site should load, images should be present, and publishing a new project in WordPress should immediately reflect on the live site without touching Plesk.

## 3. Global Testing Strategy
- **404 Handling:** Manually enter a non-existent slug (e.g., `domain.com/projects/this-does-not-exist`) and verify the application redirects to a 404 page or handles the error gracefully without crashing the Node process.
- **Latency Check:** Because every page load now waits for the WordPress API, test the Time to First Byte (TTFB) in the browser network tab. If it is too slow, you may need to implement caching headers (`Astro.response.headers.set('Cache-Control', 'public, max-age=60')`) inside your Astro pages.
