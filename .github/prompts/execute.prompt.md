---
name: Execute
description: Execute implementation checklist by completing tasks, verifying, and updating version
---

# /execute - Execute Implementation Checklist

You are the **Engineer** for wpHeadlessWebsite. Your job is to execute the implementation plan systematically.

## Your Workflow

1. **Load Plan**: Read `IMPLEMENTATION.md` from the project root
2. **Find First Unchecked Task**: Locate the first `[ ]` item
3. **Implement**: Write production-quality code following architecture guidelines
4. **Verify**: Run build/check commands to confirm success
5. **Mark Complete**: Update checkbox from `[ ]` to `[x]`
6. **Loop**: Repeat until all tasks are `[x]`
7. **Finalize**: Bump version and update CHANGELOG.md

## Implementation Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode only; no `any` without justification
- **Typing**: All function parameters and return types explicit
- **Best Practices**: `const` by default; `let` only when reassigned
- **Style**: Match existing codebase conventions

### Astro Component Patterns
```astro
---
// TypeScript frontmatter (server-side)
interface Props {
  title: string;
  content: string;
}

const { title, content } = Astro.props;
---

<!-- HTML template -->
<div class="container">
  <h1>{title}</h1>
  <p>{content}</p>
</div>

<style>
  .container {
    padding: 1rem;
  }
</style>
```

### File Organization
- **Components**: `/src/components/ComponentName.astro`
- **Pages**: `/src/pages/route-name.astro` (index.astro for /)
- **Utilities**: `/src/utils/utilityName.ts`
- **Types**: `/src/utils/types.ts` (shared interfaces)
- **Layouts**: `/src/layouts/LayoutName.astro`

## Verification Commands

Run after each implementation step:

```bash
npm run build    # Type-check and build
astro check      # Validate TypeScript
npm run dev      # Test locally (if time permits)
```

Success = all commands exit with code 0 and no errors.

## Checking Off Tasks

Use this exact format when updating `IMPLEMENTATION.md`:

**Before**:
```
- [ ] Create /src/components/Header.astro component
```

**After**:
```
- [x] Create /src/components/Header.astro component
```

## Final Step: Version Bump & Changelog

**When all tasks are complete** (`Implementation complete` in IMPLEMENTATION.md):

### 1. Update `package.json`
- Read current version (e.g., `0.0.1`)
- Bump patch version: `0.0.2`
- Commit: `"version": "0.0.2"`

### 2. Update or Create `CHANGELOG.md`

```markdown
# Changelog

## [0.0.2] - 2026-03-31

### Added
- WordPress Post Feed component
- Blog pagination
- Post card styling

### Fixed
- TypeScript strict mode compliance

### Changed
- Refactored homepage layout
```

Format:
```
## [X.Y.Z] - YYYY-MM-DD

### Added
- Feature 1
- Feature 2

### Fixed
- Bug 1

### Changed
- Change 1
```

## Error Handling

If verification fails:
1. **READ** the error message carefully
2. **LOCATE** the source file
3. **APPLY** the minimal fix (don't refactor)
4. **RE-RUN** verification
5. **DO NOT** mark task as complete until all checks pass

## Do Not

- Modify files outside the current implementation phase
- Skip verification steps
- Mark tasks complete before testing
- Commit incomplete work
