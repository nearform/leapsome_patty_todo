# Design System Migration Plan

> **Purpose:** Step-by-step guide for an LLM to remove the current UI component system (SOURCE) and replace it with a target library (TARGET). Execute phases in order after filling placeholders and the component mapping table.

---

## Conventions (fill before executing)

Define these placeholders for your migration:

- **SOURCE**: Current design system (e.g. Gluestack UI).
- **TARGET**: New design system (e.g. Material UI, OGCIO, Radix UI).
- **SOURCE_PACKAGES**: List of npm packages to remove (e.g. `@gluestack-style/react`, `@gluestack-ui/themed`, and any peer-only deps like `nativewind`, `react-native-svg`, `tailwind-variants`, `@legendapp/motion` if only used by SOURCE).
- **TARGET_PACKAGES**: List of npm packages to install for TARGET.
- **TARGET_THEME_PACKAGE**: Optional theme/CSS package for TARGET (or "none").

---

## Pre-migration: discovery and mapping

Complete these steps before changing any code.

### Step 1 – Identify source usage

Find every place that uses the current system:

1. **Exports:** Read `src/components/prototype-ui/index.ts` and list every exported component and symbol.
2. **Consumers:** Run a project-wide search for:
   - Imports from the SOURCE library (e.g. `@gluestack-ui/themed`).
   - Imports from `@/components/prototype-ui` or `@/components/prototype-ui/*`.

Typical consumer locations in this repo:

- `src/app/design-system/foundations/page.tsx`
- `src/app/design-system/page.tsx`
- `src/app/prototype/page.tsx`
- `src/app/prototype/journeys/page.tsx`
- `src/app/prototype/journeys/[journey-name]/**/page.tsx`
- `src/app/page.tsx`
- `src/components/designsystem-ui/*` (ds-header, ds-nav-buttons, ds-tokens-drawer, ds-theme-toggle)
- Any canvas or shared UI under `src/`

Record the full list of files so no import is missed in later phases.

### Step 2 – Build component mapping table

Fill the **Component mapping reference** table below (see [Component mapping reference](#component-mapping-reference)) for your chosen SOURCE and TARGET. For each SOURCE component or pattern, decide:

- **TARGET component** (exact name or compound, e.g. `Modal` + `ModalTitle` + `ModalBody`).
- **"remove"** – no equivalent; remove usage or replace with a primitive.
- **"custom"** – implement a small wrapper using TARGET primitives.

Include layout primitives, typography, forms, feedback, data display, overlays, navigation, disclosure, and icons. Do not start code changes until this table is complete.

### Step 3 – List components to remove

List **components with no TARGET equivalent**. For each, decide:

- Remove usage everywhere, or
- Replace with a TARGET primitive (e.g. `div` + Tailwind), or
- Implement a minimal custom wrapper and export it from `src/components/prototype-ui/index.ts`.

Document the decision so the LLM can apply it consistently in Phase 2 and Phase 5.

---

## Phased migration steps

Execute in order. Each phase assumes the previous one is done.

### Phase 1 – Dependencies and theme

1. **Remove SOURCE packages**  
   Uninstall every package in SOURCE_PACKAGES (and any peer-only dependencies discovered in Step 1). Example: `@gluestack-style/react`, `@gluestack-ui/themed`, `nativewind`, `react-native-svg`, `tailwind-variants`, `@legendapp/motion` if only used by SOURCE.

2. **Install TARGET packages**  
   Install TARGET_PACKAGES and, if applicable, TARGET_THEME_PACKAGE.

3. **Tailwind**  
   Edit `tailwind.config.ts`: remove SOURCE-specific config (plugins, theme keys). If TARGET provides a Tailwind theme or plugin (e.g. `createTheme()`), add it; otherwise document "Tailwind used as-is with custom tokens."

4. **Layout and global styles**  
   - **`src/app/layout.tsx`:** Update fonts (e.g. from next/font), CSS import order (`globals.css`, TARGET’s `styles.css` if any), and remove SOURCE provider. Add TARGET provider if required.
   - **`src/app/globals.css`:** Remove or replace SOURCE-specific design tokens; add or keep tokens required by TARGET.

5. **Theme provider**  
   If TARGET requires a theme provider, add or update `src/providers/theme-provider.tsx` and wrap the app in `layout.tsx`.

### Phase 2 – Prototype-ui layer

Choose one strategy:

**Option A – Replace in place (re-export TARGET)**  
Use when TARGET is a full component library and you want minimal local code.

1. Delete every component folder under `src/components/prototype-ui/` (e.g. `button/`, `card/`, `modal/`, …), but **not** the directory itself.
2. Create a single barrel file `src/components/prototype-ui/index.ts` that:
   - Re-exports from the TARGET library (e.g. `export { Button, Card, Modal, ... } from "target-package"`).
   - Optionally re-exports under the same names as before (e.g. `export { Button as Button }`) for drop-in compatibility with existing imports.

**Option B – Adapt in place (keep folder structure)**  
Use when you need to preserve existing API or mix TARGET with custom components.

1. For each row in the component mapping table, open `src/components/prototype-ui/[component-name]/index.tsx` (or create it if the mapping introduces a new wrapper).
2. Replace the implementation to use TARGET primitives while preserving the same export names and a compatible prop surface where possible.
3. Update `src/components/prototype-ui/index.ts` so it exports the same public API as before (same names and types), implemented via TARGET or thin wrappers.

If TARGET requires a theme provider, ensure it is wired in `layout.tsx` (see Phase 1).

### Phase 3 – Design system documentation UI

Rewrite these four components to use only TARGET (and non-SOURCE deps such as Headless UI where needed):

- `src/components/designsystem-ui/ds-header/index.tsx`
- `src/components/designsystem-ui/ds-nav-buttons/index.tsx`
- `src/components/designsystem-ui/ds-tokens-drawer/index.tsx`
- `src/components/designsystem-ui/ds-theme-toggle/index.tsx`

Replace any SOURCE-specific semantic classes (e.g. `text-primary`, `bg-base`) with TARGET design tokens or standard Tailwind that matches the new theme. If the tokens drawer or docs reference design tokens, update them to TARGET token names and values.

### Phase 4 – Design system showcase pages

1. **Foundations:** Rebuild `src/app/design-system/foundations/page.tsx` (e.g. colors, typography, spacing, borders, icons, forms, buttons, alerts, badges, cards) using TARGET components and tokens.
2. **Components:** Rebuild `src/app/design-system/page.tsx` (e.g. header, footer, tabs, accordion, table, modal, drawer, toast, pagination) using TARGET components.

Ensure every showcased component is imported from `@/components/prototype-ui` (or directly from TARGET if that is the chosen pattern).

### Phase 5 – Journeys and app pages

Update every page that imports from `@/components/prototype-ui` or SOURCE:

- `src/app/prototype/page.tsx`
- `src/app/prototype/journeys/page.tsx`
- All journey pages under `src/app/prototype/journeys/[journey-name]/` (each `page.tsx` and subfolder `page.tsx`)

Replace components according to the mapping table; fix prop renames and removed components (replace or remove usage). Only touch `src/lib/data/journeys-registry.ts` if the migration changes how journeys are listed or metadata is structured.

### Phase 6 – Remaining references and docs

1. Search again for any remaining imports or references to SOURCE or old prototype-ui APIs (e.g. canvas page, `src/app/page.tsx`, Liveblocks or other shared components). Update those files to use TARGET or the new prototype-ui barrel.
2. Update documentation:
   - `docs/installation.md` – TARGET setup, install steps, theming.
   - `README.md` – component library in use, link to design system docs.
   - `docs/start-here.md` (or equivalent) – how to use the new component set and tokens.
3. Add a dated entry to `cursor-updates.md` summarizing the migration.

### Phase 7 – Verification

1. Run `npm run build` and fix any type or build errors.
2. Optionally run the project linter and fix rules that reference removed packages or patterns.

---

## Component mapping reference

Fill this table for your SOURCE and TARGET before starting Phase 2. Use "remove" or "custom" where there is no direct equivalent.

| Source component (or pattern) | Target component (or "remove" / "custom") | Notes |
|-------------------------------|-------------------------------------------|-------|
| **Layout** | | |
| Box | | |
| HStack / VStack | | |
| Center | | |
| Grid | | |
| Divider | | |
| **Typography** | | |
| Heading | | |
| Text | | |
| **Forms** | | |
| Button, ButtonText, ButtonIcon, ButtonSpinner, ButtonGroup | | |
| Input, InputField, InputSlot, InputIcon | | |
| Select (+ Trigger, Content, Item, etc.) | | |
| Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxLabel | | |
| Radio, RadioGroup, RadioIndicator, RadioLabel | | |
| Textarea, TextareaInput | | |
| FormControl, FormControlLabel, FormControlHelper, FormControlError | | |
| Switch | | |
| Slider (+ Track, Thumb) | | |
| **Feedback** | | |
| Alert, AlertIcon, AlertText, AlertTitle, AlertDescription | | |
| Progress, ProgressFilledTrack | | |
| Spinner | | |
| Toast, ToastProvider, ToastTitle, ToastDescription, useToast | | |
| **Data display** | | |
| Badge, BadgeText, BadgeIcon | | |
| Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent | | |
| Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarBadge | | |
| Table, Thead, Tbody, Tr, Th, Td, TableCaption | | |
| **Overlays** | | |
| Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton | | |
| Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton | | |
| Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton | | |
| Tooltip, TooltipTrigger, TooltipContent, TooltipText | | |
| Menu, MenuTrigger, MenuContent, MenuItem | | |
| Actionsheet (+ Backdrop, Content, Item) | | |
| AlertDialog (+ Backdrop, Content, Header, Body, Footer, CloseButton) | | |
| **Navigation** | | |
| AppHeader | | |
| AppFooter | | |
| Tabs, Tab, TabList, TabPanel | | |
| Link, LinkText | | |
| Fab | | |
| **Disclosure** | | |
| Accordion, AccordionItem, AccordionTrigger, AccordionContent | | |
| **Icons** | | |
| Icon (Lucide or SOURCE icon set) | | e.g. TARGET Icon + Lucide, or TARGET icon set only |
| **Other** | | |
| Portal | | |
| Pressable | | |
| Image | | e.g. next/image |
| ScrollView | | |
| Skeleton, SkeletonText | | |

### Components to remove (no TARGET equivalent)

- *List SOURCE components that have no TARGET equivalent. For each, document: remove usage / replace with TARGET primitive / custom wrapper.*

### New TARGET components (not in SOURCE)

- *List TARGET components you will use that did not exist in SOURCE (e.g. Breadcrumbs, PhaseBanner, Pagination, FileUpload). Optional: add to prototype-ui barrel for consistency.*

---

## Setup reference (TARGET-specific)

Replace the placeholders below with TARGET-specific snippets when executing the migration.

**Layout / fonts / CSS**

- *Document TARGET’s required layout imports, font setup (e.g. next/font), and CSS import order (e.g. `globals.css`, TARGET’s `styles.css`).*

**Tailwind**

- *Document TARGET’s Tailwind plugin or theme extension (e.g. `createTheme()` or "use as-is with custom tokens").*

**Component usage**

- *Document how to import and use TARGET components (e.g. `import { Button, Card } from "@target/design-system-react"` or from `@/components/prototype-ui`).*

---

## Status (optional)

Use this section to track progress. Update after each phase.

| Phase | Status | Notes |
|-------|--------|-------|
| 1 – Dependencies and theme | Pending | |
| 2 – Prototype-ui layer | Pending | |
| 3 – Design system documentation UI | Pending | |
| 4 – Design system showcase pages | Pending | |
| 5 – Journeys and app pages | Pending | |
| 6 – Remaining references and docs | Pending | |
| 7 – Verification | Pending | |
