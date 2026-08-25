# Installation & Customization Guide

This guide explains how to customize the design system scaffold for your own project.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nearform/ignite.git my-project
cd my-project/packages/Design\ Scaffolding\ Mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customizing Your Project

### 1. Replace the Logo

The logo appears in navigation headers and the landing page. To replace it:

1. Add your logo SVG to `public/images/`
2. Update the logo reference in your pages

**Example:** In `src/app/page.tsx`, replace the icon or add your logo:

```tsx
import Image from "next/image";

// Replace the SwatchBook icon with your logo
<Image
  src="/images/your-logo.svg"
  alt="Your Logo"
  width={48}
  height={48}
/>
```

---

### 2. Override Design Tokens

Design tokens control colors, typography, spacing, and more. They're defined in two files:

#### Colors & Semantic Tokens: `src/app/globals.css`

```css
:root {
  /* Primary brand color */
  --color-accent: #4F46E5;        /* Your primary color */
  --color-accent-light: #818CF8;  /* Lighter variant */
  --color-accent-dark: #3730A3;   /* Darker variant */
  --color-accent-hover: #4338CA;  /* Hover state */
  
  /* Background colors */
  --color-bg-base: #FFFFFF;
  --color-bg-elevated: #FAFAFA;
  --color-bg-secondary: #F5F5F5;
  --color-bg-tertiary: #EEEEEE;
  
  /* Text colors */
  --color-text-primary: #111827;
  --color-text-body: #1F2937;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  
  /* Status colors */
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;
}

/* Dark mode overrides */
.dark {
  --color-accent: #818CF8;
  --color-bg-base: #0B0F19;
  /* ... etc */
}
```

#### Tailwind Configuration: `tailwind.config.ts`

The Tailwind config maps CSS variables to utility classes:

```ts
theme: {
  extend: {
    colors: {
      accent: {
        DEFAULT: 'var(--color-accent)',
        light: 'var(--color-accent-light)',
        dark: 'var(--color-accent-dark)',
        hover: 'var(--color-accent-hover)',
      },
      // Add your custom colors
      brand: {
        primary: '#your-color',
        secondary: '#your-color',
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      // Add your custom fonts
      heading: ['Your Font', 'sans-serif'],
    },
  },
}
```

---

### 3. Adding Custom Fonts

1. Add font files to `public/fonts/`
2. Import in `src/app/layout.tsx`:

```tsx
import localFont from "next/font/local";

const yourFont = localFont({
  src: "../../public/fonts/YourFont.ttf",
  variable: "--font-your-font",
  weight: "300 700",
});

// Add to body className
<body className={`${yourFont.variable} antialiased`}>
```

3. Update `tailwind.config.ts` to use the new font variable.

---

### 4. Adding Custom Components

Components live in `src/components/prototype-ui/`. To add a new component:

1. Create a folder: `src/components/prototype-ui/your-component/`
2. Create `index.tsx` with your component
3. Export from `src/components/prototype-ui/index.ts`

**Component Template:**

```tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const yourComponentVariants = cva(
  "base-styles-here",
  {
    variants: {
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      },
      variant: {
        default: "default-styles",
        outline: "outline-styles",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface YourComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof yourComponentVariants> {}

export function YourComponent({
  className,
  size,
  variant,
  ...props
}: YourComponentProps) {
  return (
    <div
      className={cn(yourComponentVariants({ size, variant }), className)}
      {...props}
    />
  );
}
```

---

### 5. Creating User Journeys

Journeys are user flows in the prototype section. To create a new journey:

1. Create folder: `src/app/prototype/journeys/your-journey/`
2. Add `_journey.ts` with metadata:

```ts
import type { JourneyConfig } from '@/lib/types/journey';

export const journey: JourneyConfig = {
  id: 'your-journey',  // Must match folder name
  title: 'Your Journey',
  description: 'Description of this user flow',
  status: 'draft',  // 'draft' | 'in-progress' | 'completed'
  pages: [
    {
      id: 'page-one',
      name: 'First Page',
      path: '/prototype/journeys/your-journey/page-one',
      description: 'Optional description',
    },
  ],
};
```

3. Add `page.tsx` for the journey overview
4. Create page folders with their `page.tsx` files
5. Register in `src/lib/data/journeys-registry.ts`:

```ts
import { journey as yourJourney } from '@/app/prototype/journeys/your-journey/_journey';

export const journeys: JourneyConfig[] = [
  yourJourney,
  // ... other journeys
];
```

---

## Folder Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & tokens
│   ├── design-system/        # Design system showcase
│   ├── prototype/            # Prototype section
│   │   └── journeys/         # User journeys
│   └── canvas/               # Canvas view of all journeys
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── designsystem-ui/      # Design system documentation components
└── lib/
    ├── data/                 # Data files (JSON, registry)
    ├── types/                # TypeScript types
    └── utils.ts              # Utility functions
```

---

## Tips

- **Use the Design System page** as a reference for available components
- **Browse Foundations** for colors, typography, and icons
- **Use Cursor AI** to help build pages - describe what you want in natural language

---

## Need Help?

- Check `docs/start-here.md` for a designer-focused guide
- Browse the component source code in `src/components/prototype-ui/`
- Reference the Gluestack UI documentation for component patterns
