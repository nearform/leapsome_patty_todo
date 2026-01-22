---
description: "Apply when committing changes or working with Git. Conventional commit messages (feat, fix, refactor, docs, style, chore), commit workflow (build → update changelog → commit, never auto-push), and what to include/exclude in commits."
alwaysApply: true
---

# Git Commit Rules

## Commit Workflow

After completing changes:

```bash
git add .
git commit -m "descriptive commit message"
```

**Never push automatically** - manual push only when user requests.

## Commit Message Format

Use conventional commit style:

```
type: brief description

Examples:
- feat: add Button component with variants
- fix: correct Card border color in dark mode
- refactor: extract common styles to shared utilities
- docs: update README with new components
- style: format code with prettier
- chore: update dependencies
```

### Types
- `feat` - New feature or component
- `fix` - Bug fix
- `refactor` - Code restructuring without behavior change
- `docs` - Documentation updates
- `style` - Code formatting (not CSS styling)
- `chore` - Maintenance tasks, dependencies
- `test` - Test additions or changes

## What to Commit

### Include
- Source code changes
- Configuration updates
- Documentation
- New components and features

### Exclude (via .gitignore)
- `node_modules/`
- `.next/`
- Build artifacts
- Environment files (`.env*`)
- IDE settings

## Task Completion

**REQUIRED workflow before every commit:**

1. `npm run build` - Verify build passes
2. **ALWAYS update `cursor-updates.md`** - Add dated entry with summary of changes made
3. `git add . && git commit -m "..."`

⚠️ **Never commit without updating `cursor-updates.md` first!**

Do not push unless explicitly requested.
