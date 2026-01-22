# Cursor Updates

Changelog of changes made during development sessions.

---

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
