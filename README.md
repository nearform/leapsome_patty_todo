# Design System & Prototype Scaffold

> A flexible design system and prototyping workspace ready to customize for your project.

## What is This?

This is a comprehensive **design system scaffold** and interactive prototyping workspace. It provides a complete foundation that designers and developers can clone and customize for any project. The scaffold includes:

1. **Design System** - A complete library of reusable UI components, design tokens, and patterns
2. **Prototype Workspace** - An interactive environment for building and presenting user journey prototypes
3. **Canvas** - A zoomable canvas for viewing all journeys and screens in one place

Built with Next.js 16 and React 19, this scaffold provides everything needed to design and prototype applications.

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
- **Canvas View** - Zoomable canvas showing all journeys and screens
- **Customizable Frames** - Support for different screen heights per page

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/nearform/ignite.git my-project
cd my-project/packages/Design\ Scaffolding\ Mobile

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
| `/design-system/foundations` | Colors, typography, icons, and form components |
| `/prototype` | Prototype workspace landing page |
| `/prototype/journeys` | All registered user journeys |
| `/canvas` | Canvas view of all journeys |

## Project Structure

```
src/
├── app/
│   ├── design-system/       # Design system showcase
│   │   └── foundations/     # Colors, typography, icons
│   ├── prototype/
│   │   └── journeys/        # User journey prototypes
│   │       └── banking/     # Sample banking journey
│   ├── canvas/              # Canvas view of all journeys
│   ├── globals.css          # Global styles and CSS variables
│   └── layout.tsx           # Root layout with theme provider
│
├── components/
│   ├── designsystem-ui/     # Design system documentation components
│   └── ui/                  # Design system components
│       ├── button/
│       ├── card/
│       ├── input/
│       ├── tabs/
│       └── ...              # Additional components
│
└── lib/
    ├── data/
    │   ├── journeys-registry.ts  # Journey registration
    │   └── banking.json          # Sample data
    ├── types/
    │   └── journey.ts       # Journey type definitions
    └── utils.ts             # Utility functions
```

## Components

### Layout Components
- **Box** - Flexible container component
- **Stack** - Flexbox layouts (HStack/VStack)
- **Center** - Centering utility
- **Divider** - Visual separator
- **Card** - Container with header, content, and footer

### Form Components
- **Button** - Multiple variants, sizes, and states
- **Input** - Form inputs with validation states
- **Checkbox** - Checkbox with label
- **Switch** - Toggle switch
- **Select** - Dropdown select

### Display Components
- **Badge** - Status indicators and labels
- **Avatar** - User images with badges
- **Heading** - Typography headings
- **Text** - Typography text
- **Tabs** - Tab navigation

### Feedback Components
- **Alert** - Feedback messages
- **Spinner** - Loading spinner
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders

### Overlay Components
- **Modal** - Dialog overlays
- **Drawer** - Side panel navigation
- **Tooltip** - Hover tooltips

## Customization

See [docs/installation.md](./docs/installation.md) for detailed customization instructions:

- **Logo Replacement** - How to add your brand logo
- **Design Tokens** - Customizing colors, typography, spacing
- **Custom Components** - Adding new components
- **Creating Journeys** - Building user journey prototypes

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
       },
     ],
   };
   ```

3. **Register the journey** in `src/lib/data/journeys-registry.ts`

4. **Create page folders** with `page.tsx` files for each screen

For detailed instructions, see [docs/start-here.md](./docs/start-here.md).

## Design Tokens

### Colors
Semantic color system with light/dark theme support:
- **Backgrounds**: `bg-base`, `bg-elevated`, `bg-secondary`, `bg-tertiary`
- **Text**: `text-primary`, `text-body`, `text-secondary`, `text-tertiary`
- **Borders**: `border-standard`, `border-subtle`, `border-decorative`
- **Accent**: `accent`, `accent-light`, `accent-dark`
- **Status**: `success`, `info`, `warning`, `error`

### Typography
- **Font**: Inter (Variable)
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
- **Installation Guide**: [docs/installation.md](./docs/installation.md) - Customization instructions
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Contributing

1. Follow existing component patterns and naming conventions
2. Use design tokens from the established system
3. Ensure accessibility standards are met
4. Add new components to the design system showcase
5. Update documentation as needed
