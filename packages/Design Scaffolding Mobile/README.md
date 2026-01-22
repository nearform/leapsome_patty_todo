# Duet Design System & Prototype Workspace

> Where simplicity meets elegance. Duet unites ATP and WTA under one harmonious design language.

## What is Duet?

**Duet** is a comprehensive design system and interactive prototyping workspace created for ATP (Association of Tennis Professionals) and WTA (Women's Tennis Association) applications. It serves as a unified platform where designers and developers can explore a complete library of reusable UI components, design tokens, and patterns that maintain visual consistency across all tennis-related digital experiences. The design system includes everything from buttons and forms to complex navigation components, all built with accessibility and mobile-first principles in mind, ensuring that every interface works beautifully across devices and meets modern web standards.

Beyond the component library, Duet provides a powerful prototyping environment where you can build interactive user journeys—fully functional React pages that demonstrate real user flows like onboarding, match discovery, or player profiles. These prototypes aren't just static mockups; they're clickable, navigable experiences that help teams visualize and test user interactions before development begins. The platform also features a collaborative whiteboard view that displays all journeys in a Miro-style canvas, complete with real-time collaboration tools like live cursors, presence indicators, and pinned comments, making it easy for teams to review, discuss, and iterate on designs together.

## Overview

**Duet** is a comprehensive design system and interactive prototyping workspace for ATP (Association of Tennis Professionals) and WTA (Women's Tennis Association) applications. It combines:

1. **Design System** - A complete library of reusable UI components, design tokens, and patterns
2. **Prototype Workspace** - An interactive environment for building and presenting user journey prototypes
3. **Collaborative Whiteboard** - A real-time canvas for viewing all journeys with live comments and presence

Built with Next.js 16 and React 19, Duet provides everything needed to design, prototype, and collaborate on tennis-related applications.

## Features

### Design System
- **Comprehensive Component Library** - Pre-built, accessible React components
- **Dark & Light Mode** - Full theme support with automatic color adaptation
- **Design Tokens** - Semantic colors, typography scales, spacing, and radii
- **Mobile-First** - Responsive components optimized for mobile experiences
- **Accessible** - WCAG compliant components and patterns
- **TypeScript** - Full type safety and excellent developer experience

### Prototyping
- **Journey-Based Structure** - Organize prototypes into user journeys
- **Interactive Pages** - Fully functional React pages with working navigation
- **Whiteboard View** - Miro-style canvas showing all journeys and screens
- **Real-Time Collaboration** - Live cursors, presence indicators, and comments via Liveblocks
- **Customizable Frames** - Support for different screen heights per page

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/nearform/ignite_ATPWTA_DesignSystem.git
cd ATPWTA_DesignSystem

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Navigation

| Route | Description |
|-------|-------------|
| `/` | Homepage with navigation to Design System and Prototype |
| `/design-system` | Component showcase and design token documentation |
| `/prototype` | Prototype workspace landing page |
| `/prototype/journeys` | All registered user journeys |
| `/prototype/whiteboard` | Collaborative whiteboard view of all journeys |

## Project Structure

```
ATPWTA_DesignSystem/
├── docs/
│   └── start-here.md           # Designer's guide to the project
│
├── public/
│   └── images/                  # Brand assets (ATP/WTA logos, player images)
│
├── src/
│   ├── app/
│   │   ├── design-system/       # Design system showcase
│   │   ├── prototype/
│   │   │   ├── journeys/        # User journey prototypes
│   │   │   │   ├── onboarding/  # Example: Onboarding flow
│   │   │   │   └── homepage-content/  # Example: Homepage journey
│   │   │   └── whiteboard/      # Collaborative whiteboard view
│   │   ├── globals.css          # Global styles and CSS variables
│   │   └── layout.tsx           # Root layout with theme provider
│   │
│   ├── components/
│   │   ├── liveblocks/          # Real-time collaboration components
│   │   │   ├── Cursors.tsx      # Live cursor rendering
│   │   │   ├── CommentPin.tsx   # Pinned comment markers
│   │   │   ├── CommentsSidebar.tsx  # Comments panel
│   │   │   └── PresenceAvatars.tsx  # Online user indicators
│   │   │
│   │   └── ui/                  # Design system components
│   │       ├── app-header/      # Application header with logos
│   │       ├── app-footer/      # Application footer
│   │       ├── button/          # Interactive buttons
│   │       ├── card/            # Card containers
│   │       ├── carousel-news/   # News carousel component
│   │       ├── circle-navigation/  # Circular navigation menu
│   │       ├── tabs/            # Tab navigation
│   │       └── ...              # Additional components
│   │
│   └── lib/
│       ├── data/
│       │   └── journeys-registry.ts  # Journey registration
│       ├── types/
│       │   └── journey.ts       # Journey type definitions
│       └── utils.ts             # Utility functions
│
├── liveblocks.config.ts         # Liveblocks type configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── package.json
```

## Components

### Application Components
- **AppHeader** - Header with ATP/WTA logos, search, and account buttons
- **AppFooter** - Footer with navigation and branding
- **CarouselNews** - Swipeable news carousel with indicators
- **CircleNavigation** - Circular menu for main navigation
- **Tabs** - Segmented tab navigation

### Layout Components
- **Box** - Flexible container component
- **Stack** - Flexbox layouts (HStack/VStack)
- **Center** - Centering utility
- **Divider** - Visual separator
- **Card** - Container with header, content, and footer

### Form Components
- **Button** - Multiple variants, sizes, and states
- **Input** - Form inputs with validation states
- **Alert** - Feedback messages

### Display Components
- **Badge** - Status indicators and labels
- **Avatar** - User images with country flags
- **Heading** - Typography headings
- **Text** - Typography text

### Feedback Components
- **Spinner** - Loading spinner
- **TennisBallLoader** - Tennis-themed loading animations

## Creating Journeys

Journeys are collections of related prototype pages. To create a new journey:

1. **Create the journey folder:**
   ```
   src/app/prototype/journeys/my-journey/
   ```

2. **Add journey metadata** (`_journey.ts`):
   ```typescript
   import type { JourneyConfig } from '@/lib/types/journey';

   export const journey: JourneyConfig = {
     id: 'my-journey',
     title: 'My Journey',
     description: 'Description of the journey',
     status: 'in-progress', // 'draft' | 'in-progress' | 'completed'
     pages: [
       { 
         id: 'page-one', 
         name: 'Page One', 
         path: '/prototype/journeys/my-journey/page-one',
         height: 1200  // Optional: custom iframe height
       },
     ],
   };
   ```

3. **Register the journey** in `src/lib/data/journeys-registry.ts`

4. **Create page folders** with `page.tsx` files for each screen

For detailed instructions, see [docs/start-here.md](./docs/start-here.md).

## Whiteboard Collaboration

The whiteboard (`/prototype/whiteboard`) includes real-time collaboration features powered by Liveblocks:

- **Live Cursors** - See other users' cursor positions
- **Presence Avatars** - View who's currently online
- **Pinned Comments** - Click to leave comments at specific locations
- **Comments Sidebar** - View and manage all comment threads
- **Resolve/Reopen** - Mark comments as resolved

### Using Comments
1. Click the **comment icon** in the toolbar to enter comment mode
2. Click anywhere on the canvas to place a comment
3. Type your comment and submit
4. Click the **comments button** (top right) to view all threads

## Design Tokens

### Colors
Semantic color system with light/dark theme support:
- **Backgrounds**: `bg-base`, `bg-elevated`, `bg-secondary`, `bg-tertiary`
- **Text**: `text-primary`, `text-body`, `text-secondary`, `text-tertiary`
- **Borders**: `border-standard`, `border-subtle`, `border-decorative`
- **Accent**: `accent`, `accent-light`, `accent-dark`
- **Status**: `success`, `info`, `warning`, `error`

### Typography
- **Font**: Spline Sans (Variable)
- **Sizes**: 6px to 36px scale
- **Weights**: Light (300) to Bold (700)

### Spacing
4px base unit system: `space-1` (4px) to `space-24` (96px)

### Border Radius
`radius-none` (0px) to `radius-full` (9999px)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Collaboration**: [Liveblocks](https://liveblocks.io/)
- **Utilities**: class-variance-authority, tailwind-merge, clsx

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Documentation

- **Designer Guide**: [docs/start-here.md](./docs/start-here.md) - Non-technical guide for designers
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Liveblocks Docs**: [liveblocks.io/docs](https://liveblocks.io/docs)

## Contributing

1. Follow existing component patterns and naming conventions
2. Use design tokens from the established system
3. Ensure accessibility standards are met
4. Add new components to the design system showcase
5. Update documentation as needed
