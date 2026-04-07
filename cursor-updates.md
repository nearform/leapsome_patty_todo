# Cursor Updates

Changelog of changes made during development sessions.

---

## 2026-04-07

### Prototype Screenshot System
- Added `jszip` dependency and `puppeteer` devDependency; added `screenshots` and `screenshots:desktop` npm scripts
- New `src/lib/config/device-mode.ts` — shared `DEVICE_PRESETS` config and `DEFAULT_DEVICE_MODE = "mobile"`
- New `src/lib/context/DeviceModeContext.tsx` — React context for device mode state
- New `src/app/api/journeys/route.ts` — GET endpoint returning all journeys from registry (used by Puppeteer script)
- New `src/app/api/capture-screens/route.ts` — dev-only POST endpoint that spawns the capture script
- New `scripts/capture-screens.mjs` — Puppeteer batch script: captures full-page screenshots for every journey page, writes `public/screenshots/{journeyId}/{pageId}/latest.png`, archives up to 3 prior versions, writes `manifest.json`
- Updated `src/app/page.tsx` — added Global Variables panel below nav cards showing current `DEVICE_MODE` as a read-only pill toggle
- Overhauled `src/app/prototype/page.tsx` — full-width layout, 600px screenshot cards with QR hover overlay, per-card `⋮` context menu (open screenshot / open live page / history), download ZIP button, dev-only refresh screenshots button, manifest-driven screenshot display
- Updated `src/app/prototype/journeys/page.tsx` — journey cards now link to first page of journey instead of deleted overview page
- Updated `.cursor/rules/journey-workflow.mdc` — removed journey overview page pattern, added explicit warning against creating root `page.tsx` in journey folders, added `npm run screenshots` to designer workflow

---

## 2025-03-10

### Add Service Blueprint Miro skill (Option B)
- Pulled content from remote branch `add-service-blueprint-miro-skill` without merging.
- Extracted skill into `.cursor/skills/nf-workshop-facilitation-assistant/service-blueprint-miro/` (README.md, SKILL.md, references/, service-blueprint-miro.skill).
- No merge conflicts; local layout unchanged.

### Merge branches and push main
- Committed local restructure (root .cursor, docs, package at root; removed packages/Design Scaffolding Mobile).
- Merged origin/main and remote feature branches into main; pushed main to origin.

### Remove duplicate service-blueprint-miro (old path)
- Deleted `skills/workshop-facilitation-assistant/service-blueprint-miro/`; canonical location is `.cursor/skills/nf-workshop-facilitation-assistant/service-blueprint-miro/`.

### README: add migration plan documentation
- Linked [docs/migration-plan.md](docs/migration-plan.md) in Documentation section and under Customization (design system replacement).

