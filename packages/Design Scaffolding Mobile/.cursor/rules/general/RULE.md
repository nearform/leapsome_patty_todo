---
description: "Apply to all tasks for Design Mode context. Core development principles, workflow standards, task completion procedures (build → update changelog → commit), Gluestack UI patterns, and prototype-focused constraints (frontend-only, static JSON data, no backend). Ensures production-ready code for developer handoff."
alwaysApply: false
---

# General Development Rules

## Design Mode Context

We are in **Design Mode** / Prototype phase. These rules are optimized for prototyping a design system.

### What Design Mode Means

- **No backend systems**: Frontend-only development, no API integrations, no databases
- **No complex data**: Use static TypeScript files, simple data structures
- **Simple approach**: Avoid unnecessary complexity, focus on UI/UX and design system components
- **Gluestack UI patterns**: Components follow Gluestack patterns for future React Native compatibility
- **Production-ready code**: Despite being a prototype, code must follow best practices
  - Code will be handed off to developers for production implementation
  - Maintain clean architecture and patterns
  - Write well-structured, maintainable code
  - Follow TypeScript best practices
  - Use proper component patterns that scale

### React Native Compatibility

This project uses **Gluestack UI patterns** to enable future React Native conversion:
- Components use compound component patterns (e.g., `<Input><Input.Field /></Input>`)
- Boolean props use `is` prefix: `isDisabled`, `isChecked`, `isInvalid`
- Icons use the `Icon` component wrapper: `<Icon as={LucideIcon} />`
- When building components, reference existing Gluestack-migrated components for patterns

## Development Principles

- Prefer simple solutions over complex ones
- Always look for existing code to iterate on before creating new code
- Avoid duplication - check codebase for similar functionality (DRY principle)
- File size limits: Refactor files over 200-300 lines
- Focus on relevant code areas, don't touch unrelated code
- Avoid major architectural changes unless explicitly instructed
- Consider impact on other methods and areas when making changes
- **Follow Gluestack patterns** when creating or modifying components

## Journey Structure (Static Folders)

This project uses **static folder structure** for journeys:

### Structure
```
src/app/prototype/journeys/
├── onboarding/              # Journey folder
│   ├── _journey.ts         # Metadata
│   ├── page.tsx            # Overview
│   ├── login/page.tsx      # Page
│   └── signup/page.tsx     # Page
└── match-discovery/         # Another journey
```

### Key Files
- **Registry**: `src/lib/data/journeys-registry.ts`
- **Types**: `src/lib/types/journey.ts`
- **Journey metadata**: `[journey]/_journey.ts`

### When Adding Journeys

1. Create folder at `src/app/prototype/journeys/[name]/`
2. Create `_journey.ts` with metadata
3. Create `page.tsx` for overview
4. Create page subfolders with `page.tsx`
5. Register in `journeys-registry.ts`

### Key Principles

- **Folders = Journeys**: Each journey is a folder, not a dynamic route
- **Pages = Custom**: Each page is unique and custom
- **Links = Designer-controlled**: Designers define all navigation
- **Registry = Central**: All journeys registered in one place

**Never:**
- Create dynamic routes (`[journeyId]`)
- Create generic/templated page components
- Hardcode journey data in overview pages

**Always:**
- Use journey metadata from `_journey.ts`
- Register journeys in registry
- Use design system components in pages
- Follow Gluestack component patterns

## Designer Workflow

Designers work through **natural language prompts** in Cursor:
- Describe pages, components, and journeys in plain English
- Reference the design system as a "menu" of available components
- Use Figma links or PNG images to create new components
- See `docs/start-here.md` for the complete designer guide

## Task Completion Workflow

After all changes are made:

1. Build the project: `npm run build` (ignore warnings, fix errors)
2. Update `cursor-updates.md` with a one-sentence summary of changes
3. Commit changes: `git add . && git commit -m "..."` (never push automatically)

If you forget, the user can type "finish" to trigger this workflow.

## Environment & Safety

- Environment considerations: dev/test/prod awareness (primarily dev for prototype)
- Never overwrite `.env` files without explicit user approval
- Scope changes carefully - only make requested changes

## Code Organization

- Keep codebase clean and organized
- Avoid writing one-off scripts in files
- Write code that considers different environments when relevant
- When fixing bugs, exhaust existing implementation options before introducing new patterns
