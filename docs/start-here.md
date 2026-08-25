# Start Here: Designer Guide

> **Welcome to the Design System & Prototype Scaffold!**

This guide is designed for **designers** working with Cursor AI. You don't need to write code - you'll use natural language prompts to build pages and journeys, and the AI agent will handle all the implementation.

---

## What This Project Is

This is a **design system and prototype workspace** that allows you to:

- 🎨 Browse design system components, foundations, and tokens
- 🚀 Create and manage user journey prototypes
- 📱 View all journeys in a canvas-style interface
- 🎯 Build interactive prototypes for sprints

**Everything is built through conversation with Cursor AI** - you describe what you want, and the agent builds it.

---

## Project Structure

The project has three main sections:

### 1. Canvas (`/canvas`)
A Miro-style canvas showing all journeys and their pages at a glance. This is your **starting point** for navigation and overview.

### 2. Prototype (`/prototype`)
Your workspace for user journeys:
- **All Journeys** (`/prototype/journeys`) - Browse all registered journeys
- **Individual Journeys** - Each journey contains multiple interactive pages

### 3. Design System (`/design-system`)
Your component reference, split into three sections:
- **Foundations** (`/design-system/foundations`) - Icons, typography, colors, form components
- **Components** (`/design-system`) - App-level components (headers, footers, carousels, modals)
- **Tokens** - Design tokens button (coming soon)

---

## Getting Started

### Step 1: Start the App

Simply ask Cursor:
```
Start the development server and open it in the browser
```

Or run `npm run dev` from Cursor's built-in terminal, then open `http://localhost:3000` in your browser.

### Step 2: Open the Canvas

Navigate to `/canvas` in your browser. This gives you an overview of all journeys and pages. From here, you can:
- See all existing journeys
- Click through to individual pages
- Access the Design System from the navigation

### Step 3: Use the Design System as Your Menu

Open the Design System (`/design-system` or `/design-system/foundations`) in a separate tab. Browse through components to see what's available - this is your "menu" of items to choose from when building pages.

### Step 4: Prompt Cursor to Build

Use Cursor's chat (with Claude Opus 4.5 recommended) to describe what you want. Use **Plan Mode** to review the approach before execution.

**Tip:** You can dictate prompts using macOS Accessibility > Voice Control or Dictation settings.

---

## How to Prompt Cursor

### Creating a New Journey

```
Create a new journey called "checkout-flow" with the following details:
- Title: "Checkout Flow"
- Description: "User flow for completing a purchase"
- Status: draft
- Initial pages: cart-review, payment, confirmation
```

### Creating a New Page

```
We're creating a new page which is part of the onboarding journey.
This is the second page in the journey flow.

The page should be 1200px high (it's a long scrollable page).
Keep it in draft mode for now.

The page consists of:
- AppHeader component at the top
- A hero section with an image and title
- A card showing key information
- A list of items
- AppFooter component at the bottom

Use the data from src/lib/data/[relevant-file].json
Images are in the public/images/ directory
```

### Modifying an Existing Page

```
On the onboarding/signup page:
- Add a "Sign up with Apple" button below the Google button
- Change the heading from "Create Account" to "Get Started"
- Add a checkbox for newsletter subscription
```

### Adding Components to a Page

```
Add a CarouselNews component to the homepage.
It should show 4 news items with:
- Images from /public/images/
- Category badges
- Headlines and descriptions

Reference the CarouselNews component in the design system for the expected props.
```

---

## Creating New Components

When you need a component that doesn't exist in the design system, you can create it from a Figma design or image reference.

### From Figma (Recommended)

**Prerequisites:** 
- Figma MCP installed in Cursor
- Authenticated with your Figma account

**Workflow:**
1. Copy the Figma link to the component or frame
2. Paste it in Cursor chat with your instructions
3. Cursor will read the design and build the component

**Example prompt:**
```
Create a new component based on this Figma design: [paste Figma link]

This is a "StatCard" component that displays a metric with:
- A label at the top
- A large number value
- A trend indicator (up/down arrow with percentage)
- An optional subtitle

Variants:
- Default (neutral background)
- Highlighted (accent background)
- Compact (smaller padding for dashboard grids)

It will be used on dashboard pages to show key statistics.
Use existing design system components where possible (Text, Icon, Box).
Follow the Gluestack component patterns established in other components.
```

### From Image (Alternative)

If you don't have Figma MCP set up, you can paste a PNG screenshot directly into Cursor:

1. In Figma, select the component and copy as PNG
2. Paste the image into Cursor chat
3. Describe the component in detail

**Example prompt:**
```
Create a component based on this image [paste PNG].

This is a "ProfileCard" component showing:
- Avatar image (circular, 64px)
- Name (bold, primary text)
- Role/title (smaller, secondary text)
- Action button on the right

The card should have:
- Horizontal layout
- Subtle border
- Hover state with slight elevation
- Click handler prop for navigation

Build it using existing Avatar, Text, and Button components.
Follow the Gluestack patterns used in other components.
```

### Best Practices for Component Creation

**Be Detailed:** The more information you provide, the better the result:
- Dimensions and spacing
- Color usage (reference design tokens)
- Typography styles
- Interactive states (hover, active, disabled)
- Responsive behavior
- Props and variants needed

**Reference Existing Components:** Ask Cursor to use existing design system components as building blocks rather than creating everything from scratch.

**Specify Variants:** If the component has multiple states or variations, describe each one:
```
Variants needed:
- Size: small, medium, large
- State: default, loading, error, success
- Style: filled, outlined, ghost
```

**Describe Usage Context:** Explain where and how the component will be used:
```
This component will be used in:
- The dashboard page header
- List items in the settings page
- Modal dialogs for confirmation
```

### After Creating a Component

The component should automatically be added to the design system page. If it isn't, prompt:
```
Add the new [ComponentName] component to the design system page 
with examples showing all its variants.
```

Once added, you can use the component in any page:
```
On the dashboard page, add three StatCard components showing:
- Total Users (with upward trend)
- Revenue (highlighted variant)
- Active Sessions (compact variant)
```

---

## Key Concepts

### Journeys
A journey is a collection of related pages representing a user flow (e.g., onboarding, checkout, discovery). Each journey has:
- A unique ID (matches the folder name)
- A title and description
- A status: `draft`, `in-progress`, or `completed`
- A list of pages

### Pages
Each page is a fully interactive screen. Unlike static mockups:
- Buttons and links actually navigate
- Forms can be filled out
- Pages can link within the same journey or to other journeys

### Components
Pre-built UI elements from the design system. Browse them at `/design-system` and `/design-system/foundations`.

---

## How the Component Library Works (Swap-friendly)

This project uses a **wrapper layer** so you can swap the underlying UI library later (e.g. GlueStack → Google’s design system) without rewriting every page.

- **Single import surface**: Pages and journeys import UI from `@/components/prototype-ui` (the “design system API”), *not* directly from third‑party libraries.
- **GlueStack‑compatible API**: Components in `prototype-ui` follow GlueStack naming and props (`variant`, `action`, `size`, `isDisabled`, etc.) but are implemented with Tailwind + CVA under the hood.
- **Swappable implementation**: To change the design system later, you keep the same imports and props and only swap the internals of `prototype-ui`:
  - Re‑implement these components using a different library, **or**
  - Point the barrel file to another component library that exposes the same API.

When you ask Cursor to build or update pages, you should:

- **Refer to components by design‑system name** (e.g. `Button`, `Tabs`, `AppHeader`, `Grid`, `ScrollView`, `Table`, `Fab`).
- **Avoid asking for direct third‑party imports** (e.g. “import from `@gluestack-ui/...`”) so the swap‑friendly layer stays intact.

---

## Available Resources

### Data Files
Located in `src/lib/data/`:
- JSON files containing content data
- `journeys-registry.ts` - All registered journeys

### Images
Located in `public/`:
- `/images/` - Logos, backgrounds, icons
- `/banners/` - Banner images
- Other asset folders as needed

### Design Tokens
The project uses semantic color tokens that automatically adapt to light/dark mode:
- Backgrounds: `bg-base`, `bg-elevated`, `bg-secondary`, `bg-tertiary`
- Text: `text-primary`, `text-secondary`, `text-tertiary`
- Borders: `border-standard`, `border-subtle`, `border-decorative`
- Actions: `accent`, `success`, `warning`, `error`, `info`

---

## Technology Reference

### For Designers to Know

| Technology | What It Does | Designer Relevance |
|------------|--------------|-------------------|
| **Lucide Icons** | Icon library | Browse at [lucide.dev](https://lucide.dev) - use icon names in prompts |
| **Inter** | Primary typeface | The app's main font family |
| **Tailwind CSS** | Styling system | You don't need to know this - just describe what you want |
| **Circle Flags** | Country flag icons | Used for nationality indicators |
| **Gluestack UI** | Component library | React Native compatible - enables future mobile app |

### Icon Examples
When prompting, you can reference icons by name:
- Navigation: `Home`, `Search`, `User`, `Menu`, `ArrowLeft`, `ArrowRight`
- Actions: `Star`, `Heart`, `Bell`, `Settings`, `Share`
- Content: `Trophy`, `Calendar`, `Play`, `Clock`
- Social: `Mail`, `MessageCircle`, `Users`

Browse all icons at [lucide.dev/icons](https://lucide.dev/icons)

---

## Sample Prompts

### Journey Creation
```
Create a new journey for "account-settings" that covers:
1. Profile overview
2. Edit profile
3. Notification preferences
4. Privacy settings

Set it as in-progress status.
```

### Page Layout
```
Build the item-list page for the discovery journey.

Layout:
- AppHeader with "Browse" title
- Tabs component with: Featured, New, Popular
- Grid of cards showing:
  - Thumbnail image
  - Title and description
  - Category badge
  - Action button
- AppFooter with Browse tab active

Use data from the relevant JSON file.
```

### Component Styling
```
On the homepage, update the carousel:
- Make the cards taller (280px instead of 200px)
- Add a gradient overlay on the images
- Show category badges in the corner
```

### Responsive Behavior
```
Make the list page mobile-friendly:
- Stack the filter buttons vertically on small screens
- Reduce padding on mobile
- Make the thumbnail images smaller (40px instead of 48px)
```

---

## Viewing Your Work

| View | URL | Purpose |
|------|-----|---------|
| Canvas | `/canvas` | Overview of all journeys and pages |
| All Journeys | `/prototype/journeys` | List of all journeys with status |
| Journey Detail | `/prototype/journeys/[name]` | Single journey overview |
| Page | `/prototype/journeys/[journey]/[page]` | Interactive page |
| Design System | `/design-system` | Component reference |
| Foundations | `/design-system/foundations` | Icons, forms, basic components |

---

## Tips for Success

1. **Be Specific** - Include dimensions, colors, component names, and data sources in your prompts

2. **Reference the Design System** - Open it in a separate tab and mention specific components by name

3. **Use Plan Mode** - Review what Cursor plans to do before it executes

4. **Iterate** - Start with a basic version and refine with follow-up prompts

5. **Check the Canvas** - Verify your changes appear correctly in the overview

6. **Describe Interactions** - Mention where buttons should link, what happens on click, etc.

---

## Troubleshooting

### Page Not Showing in Canvas?
Ask Cursor: "The [page-name] page isn't showing in the canvas. Can you check if it's registered in the journey config?"

### Component Not Working?
Ask Cursor: "The [component] on [page] isn't displaying correctly. Can you check the props and fix any issues?"

### Styling Looks Wrong?
Ask Cursor: "The styling on [element] doesn't match the design system. Can you update it to use the correct tokens?"

### Need to Undo Changes?
Ask Cursor: "Revert the last changes to [file/page]" or use Git to restore previous versions.

---

## Quick Reference

**To create a journey:** Describe the journey name, purpose, and pages in a prompt

**To create a page:** Describe the layout, components, data sources, and interactions

**To modify a page:** Describe what you want to change and where

**To view your work:** Check the canvas at `/canvas`

**To browse components:** Open `/design-system` and `/design-system/foundations`

---

**Happy designing! 🚀**
