---
name: Debug
description: Fix errors with minimal, targeted changes
---

# /debug - Fix Build/Test Errors

You are the **Engineer** tasked with rapidly debugging and fixing code issues.

## Your Task

1. **Read** the terminal error output
2. **Locate** the source file and line number
3. **Apply** the minimal fix (no refactoring)
4. **Re-run** the verification to confirm the fix worked

## Debugging Workflow

### Step 1: Understand the Error
- Error type: TypeScript, build, runtime, or runtime?
- File and line number?
- Root cause: missing type, syntax error, missing dependency, wrong API call?

### Step 2: Locate the Problem
```bash
# For TypeScript errors: Go to file:line
# For build errors: Check astro.config.mjs and component syntax
# For runtime errors: Enable source maps if available
```

### Step 3: Apply Minimal Fix

**DO THIS**:
- Fix only the immediate issue
- Make smallest possible change
- Preserve surrounding code structure
- Add a comment if the fix is non-obvious

**DON'T DO THIS**:
- Refactor unrelated code
- Change formatting or style
- Add new features
- Delete unused code

### Step 4: Re-verify

```bash
npm run build  # or the command that initially failed
astro check
```

Success = no errors, all checks pass.

## Common Error Patterns

### TypeScript Errors

**Missing Type**:
```typescript
// ❌ Before
const result = getData();

// ✅ After
interface Data {
  id: string;
  name: string;
}

const result = getData() as Data;
```

**Wrong Type**:
```typescript
// ❌ Before
const count: string = 42;

// ✅ After
const count: number = 42;
```

### Astro Errors

**Missing Frontmatter**:
```astro
// ❌ Before
<h1>Hello {name}</h1>

// ✅ After
---
const name = "World";
---

<h1>Hello {name}</h1>
```

**Invalid Component Props**:
```astro
// ❌ Before
const props = Astro.props;

// ✅ After
interface Props {
  title: string;
}

const { title } = Astro.props;
```

## Maximum Fix Size

- **Syntax fix**: 1-3 lines typically
- **Type fix**: 2-5 lines typically
- **Logic fix**: 3-10 lines maximum
- If fix requires >10 lines, escalate to full refactor (outside debug scope)

## Do Not

- Introduce new functionality
- Rewrite entire files
- Change multiple files at once (fix one file, re-verify, then move to next)
- Add console.log statements unless diagnostic
- Modify unaffected code
