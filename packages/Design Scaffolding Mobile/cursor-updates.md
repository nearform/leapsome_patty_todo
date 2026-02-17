# Cursor Updates

Changelog of changes made during development sessions.

---

## 2026-02-17

### New Journey: Onboarding Flow
- Created new "onboarding" journey with three pages: Login, Questions, and Confirmation
- **Login page** (`onboarding/login/page.tsx`): Email/password form with social login options (Apple, Google), remember me checkbox, and navigation to the questions page
- **Questions page** (`onboarding/questions/page.tsx`): Profile setup form with username, first name, last name, and optional bio fields using FormControl and Textarea components; includes progress bar (step 2 of 3)
- **Confirmation page** (`onboarding/confirmation/page.tsx`): Success screen with check icon, account summary card, success alert, and "Get Started" / "Back to Login" actions
- Added journey metadata (`onboarding/_journey.ts`) and overview page with QR code grid
- Registered onboarding journey in `src/lib/data/journeys-registry.ts`

---

## 2026-02-12

### Fix Popover Component — Portal-Based Positioning
- Popover content was invisible when used inside containers with `overflow-hidden` (e.g. the Card on the design system components page)
- Rewrote `PopoverContent` to render via `Portal` with `fixed` positioning calculated from the trigger's bounding rect, escaping any parent overflow constraints
- Added `contentRef` to the outside-click handler so clicks inside the portal-rendered content don't dismiss the popover
- Added scroll/resize repositioning listeners so the popover stays anchored while the page scrolls
- Improved accessibility: added `role="dialog"`, `aria-expanded`, and `aria-haspopup` attributes
- File changed: `src/components/prototype-ui/popover/index.tsx`

### Border Radius Reduction — Drop One Token Size

Reduced border radius across all components and design system pages by one token step for a tighter, more refined look.

**Change rules applied:**
- `rounded-md` (8px) → `rounded-sm` (6px) — interactive controls
- `rounded-lg` (10px) → `rounded-md` (8px) — containers
- `rounded-xl` (12px) → `rounded-lg` (10px) — modals
- `rounded-full` / `rounded-none` — unchanged

**Component files updated (prototype-ui):**

| Change | Components |
|--------|-----------|
| `rounded-sm` (6px) | Button, Input, Select (trigger + dropdown), Textarea, Tooltip, Skeleton, Alert/Drawer/Modal close buttons |
| `rounded-md` (8px) | Card, Toast, Popover, Menu, Accordion (filled), Actionsheet items, App Header |
| `rounded-lg` (10px) | Modal content, Alert Dialog content |

**Design system pages updated:**
- **Foundations page**: color swatches (`rounded-lg` → `rounded-md`), 16 status color swatches (`rounded-sm` → `rounded-xs`), icon grid items, grid demo elements. Also fixed incorrect border radius token values in the preview (xs was showing 2px instead of 4px, md was showing 6px instead of 8px, etc.) and added missing `2xs` and `4xl` tokens.
- **Components page**: tabs containers, skeleton/pressable/progress/slider demo containers, pressable buttons (`rounded-lg` → `rounded-md`). Bento box card containers left unchanged.

**Design system UI updated:**
- Nav buttons, theme toggle (container + buttons), tokens drawer close button

**Explicitly unchanged:** `rounded-full`/`rounded-none`, bento box card containers, textarea `rounded-2xl` variant, actionsheet `rounded-t-2xl`, image component radius props.

### GlueStack Component Parity — Full Coverage

Created 7 new `prototype-ui` component folders (CVA + Tailwind + `cn()`, GlueStack-compatible API) and wired them into the barrel:

| New component folder  | Sub-components exported                                                                 |
|-----------------------|----------------------------------------------------------------------------------------|
| `accordion`           | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                   |
| `actionsheet`         | `Actionsheet`, `ActionsheetBackdrop`, `ActionsheetContent`, `ActionsheetItem`, `ActionsheetLabel` |
| `alert-dialog`        | `AlertDialog`, `AlertDialogBackdrop`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogBody`, `AlertDialogFooter`, `AlertDialogCloseButton` |
| `menu`                | `MenuComponent`, `MenuTrigger`, `MenuContent`, `MenuItem`                              |
| `popover`             | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverArrow`, `PopoverCloseButton`    |
| `slider`              | `Slider`, `SliderTrack`, `SliderFilledTrack`, `SliderThumb`                            |
| `toast`               | `ToastProvider`, `useToast`, `Toast`, `ToastTitle`, `ToastDescription`                 |

Updated design system pages:
- **Components page** (`/design-system`): added "Disclosure & Overlays" bento card (Accordion, Actionsheet, AlertDialog, Menu, Popover demos) and "Forms (Extended)" card (Slider demos with sizes and color schemes).
- **Foundations page** (`/design-system/foundations`): added "Layout Tokens" full-width card showing Grid, ScrollView, and Slider demos.

### GlueStack vs prototype-ui Cross-Reference

| GlueStack Component | prototype-ui folder    | Status      |
|----------------------|------------------------|-------------|
| Accordion            | `accordion`            | Implemented |
| Actionsheet          | `actionsheet`          | Implemented |
| AlertDialog          | `alert-dialog`         | Implemented |
| Alert                | `alert`                | Implemented |
| Avatar               | `avatar`               | Implemented |
| Badge                | `badge`                | Implemented |
| Box                  | `box`                  | Implemented |
| Button               | `button`               | Implemented |
| Center               | `center`               | Implemented |
| Checkbox             | `checkbox`             | Implemented |
| Divider              | `divider`              | Implemented |
| Drawer               | `drawer`               | Implemented |
| Fab                  | `fab`                  | Implemented |
| FormControl          | `form-control`         | Implemented |
| Grid                 | `grid`                 | Implemented |
| Heading              | `text-heading`         | Implemented |
| HStack               | `stack`                | Implemented |
| Icon                 | `icon`                 | Implemented |
| Image                | `image`                | Implemented |
| Input                | `input`                | Implemented |
| Link                 | `link`                 | Implemented |
| Menu                 | `menu`                 | Implemented |
| Modal                | `modal`                | Implemented |
| Popover              | `popover`              | Implemented |
| Portal               | `portal`               | Implemented |
| Pressable            | `pressable`            | Implemented |
| Progress             | `progress`             | Implemented |
| Radio                | `radio`                | Implemented |
| ScrollView           | `scroll-view`          | Implemented |
| Skeleton             | `skeleton`             | Implemented |
| Slider               | `slider`               | Implemented |
| Switch               | `switch`               | Implemented |
| Table                | `table`                | Implemented |
| Text                 | `text`                 | Implemented |
| Textarea             | `textarea`             | Implemented |
| Toast                | `toast`                | Implemented |
| Tooltip              | `tooltip`              | Implemented |
| VStack               | `stack`                | Implemented |

**Extra components** in prototype-ui not in GlueStack: `app-header`, `app-footer`, `card`, `select`, `tabs`, `spinner`.

All 38 GlueStack components are now covered. Every component follows the adapter-layer pattern (single import via `@/components/prototype-ui`, GlueStack-compatible API, CVA + Tailwind internals) and can be swapped for another design system.

### Earlier changes
- Switched documentation Cursor rule to always apply so `cursor-updates.md` is auto-maintained after each interaction
- Simplified design system header by removing version text and converting nav buttons into left-aligned, text-only segmented controls for Components, Foundations, and Tokens
- Further simplified design system header by removing the left logo container so only the nav buttons and theme toggle remain in the top bar
- Updated design system nav so the three items are left-aligned standalone text buttons (no pill group) for Components, Foundations, and Tokens
- Tweaked design system nav buttons to use medium-sized text and spacing similar to Tailwind dashboard nav while keeping project design tokens
- Adjusted active nav button text color to white for better contrast on the accent background
- Changed active Components/Foundations buttons to use an accent-colored outline (border-accent, text-accent) on transparent background
- Removed the hero section from the main design system page so content starts directly with the components bento layout
- Added a compact home icon button to the left of Components in the design system header that links back to the main page
- Renamed the collaborative “Whiteboard” to **Canvas** across the app:
  - Created new `canvas` route (`src/app/canvas/page.tsx`) that hosts the journeys overview canvas
  - Updated home, prototype, journeys, docs, and journey workflow rules to reference **Canvas** and `/canvas` instead of Whiteboard and `/whiteboard`
  - Introduced `CanvasRoom` Liveblocks wrapper (`src/components/liveblocks/CanvasRoom.tsx`) and wired the canvas view to the existing `whiteboard-prototype` Liveblocks room
  - Removed the legacy `whiteboard` route folder and the `WhiteboardRoom` component/alias, keeping only Canvas terminology in UI, rules, and routes

## 2026-01-22

### Content Carousels Layout Update
- Changed Content Carousels section to full width (3 columns on desktop)
- Reorganized layout: CarouselNews and StoriesViewer stacked in first column (1/3 width), InstaStories takes remaining 2/3 width
- Optimized space usage by stacking CarouselNews and StoriesViewer vertically in the first column

### Move Overlays & Modals to Foundations Page
- Moved Modal and Drawer components from main design system page to foundations page
- Added Overlays & Modals bento card section to foundations page after Badges
- Removed Modal/Drawer imports and state from main design system page

### Tennis Ball Loader Improvements
- Updated `TennisBallLoader` and `BouncingTennisBallLoader` components to use accent color by default
- Moved tennis ball loaders beside spinner sizes in the Loading States section on foundations page
- Increased tennis ball icon size from sm to md (~50% larger)
- Added top margin to "Spinning" and "Bouncing" labels to align with spinner size labels

### Design System Pages - Bento Box Layout & Typography Updates

- **Foundations Page (`/design-system/foundations`)**
  - Updated typography section to match Figma design tokens with proper size scale (6xl=36px down to xs=10px)
  - Added Font Weights section with full sentence examples (Regular 350, Medium 500, Semibold 600, Bold 700)
  - Added Letter Spacing section showing Tight, Normal, and Loose variants
  - Reorganized layout: moved Cards section to the left of Spacing & Radius at bottom of page
  - Applied bento box styling with rounded corners on edge cards (bottom-left on Cards, bottom-right on Spacing)
  - Removed hero section for cleaner entry into content

- **Main Design System Page (`/design-system`)**
  - Applied bento box layout with responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
  - Grouped components logically: Navigation & Layout, Content Carousels, Overlays & Modals, Feedback & Loading, Rankings, Head to Head
  - Removed internal box borders from component showcases
  - Reverted hero section text to "Duet Design System" branding
  - Updated Rankings section to 3-column layout with Simple+Medium stacked, Expanded, AI Enhanced
  - Updated Head to Head section to 3-column layout with Simple+Names+Medium stacked, Expanded, AI Enhanced

---

## 2025-01-06

- Created modular Cursor Rules v2 structure with 10 rule files: general, component-creation, design-system, git-commit, security, typescript, accessibility, server-management, documentation, and data - all using "Apply Intelligently" type for context-aware rule application
- Expanded all rule descriptions to be action-oriented with "Apply when..." triggers, removed project-specific references (Duet Design System) to make rules generic and reusable, and improved descriptions with specific keywords and trigger scenarios for better agent matching
