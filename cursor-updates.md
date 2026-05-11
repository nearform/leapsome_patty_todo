# Cursor Updates

Changelog of changes made during development sessions.

---

## 2026-05-11

### Nearform brand redesign of the design system
- Rewired the Tailwind tokens around the Nearform brand: added a full `nf.*` palette (Midnight, Green, Purple, Blue, Grey with shades) in `tailwind.config.ts`, plus `text-on-accent` and `decorative-accent` semantic colors.
- Squared the radius scale: every named alias (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`) now resolves to `0px`. Only `rounded-full` keeps a value, so circular controls (avatars, switch tracks/thumbs, slider thumbs, progress bars, FAB) still render correctly.
- Added Bitter as a second `localFont` in `src/app/layout.tsx` and exposed it via `--font-bitter`. Tailwind now exposes `font-serif`, `font-display`, and `font-bitter` for callouts; Inter remains the default sans.
- Rewrote `src/app/globals.css` with a surface-aware token model:
  - Light theme: white page, Midnight text, Midnight CTAs with white text, brand Blue focus ring.
  - Dark theme: Midnight page, white text, Green CTAs with Midnight text, Green focus ring.
  - Added `.surface-inverse` helper class that re-scopes the same CSS variables inside its subtree so a hero band (or header) flips to the opposite surface without changing the page theme.
- Fixed every WCAG-failing white-on-Green pairing by switching components from hardcoded `text-white` to `text-on-accent`: `button` (solid primary + positive), `badge` (solid info + success), `fab`, `tabs` (active state), `checkbox` (check icon).
- Bumped accessibility sizing: button heights now hit 44px at default (`md`); inputs, cards, checkboxes, and radio indicators got the same treatment. Focus-ring offset bumped from 2 to 4 across button, switch, select, alert, link, pressable, and tabs.
- Updated `src/app/design-system/foundations/page.tsx` with the new Nearform palette swatches (Midnight, Green, Purple, Blue, Grey shade scales), an accent surface-aware demo, a side-by-side `surface-inverse` demo, and a Bitter callout sample.
- Added a brand hero band to `src/app/design-system/page.tsx` that uses `.surface-inverse` to demonstrate the pattern in both themes.
- Refreshed `README.md` features list and root-layout metadata to reflect the Nearform brand.

### Brand follow-ups
- Squared off the "Horizontal ScrollView" filter chip wrapper on `src/app/design-system/page.tsx` (was `rounded-full`, now `border border-border-decorative`) and replaced the pill bars in the foundations spacing-scale demo with rectangular ones.
- Updated the foundations Border Radius documentation to reflect that every named alias resolves to `0px` and only `rounded-full` keeps a value.
- Browser-verified the redesign across `/design-system`, `/design-system/foundations`, and `/prototype/journeys/banking/login` in both light and dark modes.

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

