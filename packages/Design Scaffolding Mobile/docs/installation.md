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

### 6. Configure Liveblocks (Collaborative Canvas)

The canvas feature uses [Liveblocks](https://liveblocks.io/docs) for real-time collaboration including live cursors, presence indicators, and pinned comments. To set up your own Liveblocks project:

#### Step 1: Create a Liveblocks Account

1. Go to [liveblocks.io](https://liveblocks.io) and sign up for a free account
2. Create a new project in the Liveblocks dashboard

#### Step 2: Get Your API Keys

1. In your Liveblocks project dashboard, navigate to **API keys**
2. Copy your **Public key** (starts with `pk_`)
3. For production, you'll also need your **Secret key** (starts with `sk_`)

#### Step 3: Update the API Key

Replace the placeholder API key in `src/components/liveblocks/LiveblocksProvider.tsx`:

```tsx
export function LiveblocksProvider({ children }: LiveblocksProviderProps) {
  return (
    <Provider 
      publicApiKey="pk_your_public_key_here"  // Replace with your key
      // ... rest of config
    >
      {children}
    </Provider>
  );
}
```

**For production**, use environment variables instead:

1. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_your_public_key
   ```

2. Update the provider:
   ```tsx
   publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
   ```

#### Step 4: Configure Room Permissions (Optional)

By default, the canvas uses a public room. For team-based access control:

1. In Liveblocks dashboard, go to **Rooms** settings
2. Set up **Room permissions** based on your needs:
   - **Public**: Anyone with the link can access
   - **Private**: Only authenticated users can access
   - **Custom**: Define your own permission logic

3. For private rooms, implement authentication in your app:
   ```tsx
   // Example: Server-side authentication endpoint
   // See: https://liveblocks.io/docs/authentication
   ```

#### Step 5: Customize User Presence

The current setup generates random anonymous user names. To integrate with your auth system:

1. Update `src/components/liveblocks/LiveblocksProvider.tsx`:
   ```tsx
   resolveUsers={async ({ userIds }) => {
     // Fetch real user data from your backend/auth system
     const users = await fetchUsersFromYourAPI(userIds);
     return users.map(user => ({
       name: user.name,
       avatar: user.avatarUrl,
       color: user.preferredColor,
     }));
   }}
   ```

#### Liveblocks Features Used

| Feature | Location | Purpose |
|---------|----------|---------|
| Live Cursors | `/canvas` | See collaborators' cursor positions |
| Presence | `/canvas` | Show who's online with avatars |
| Comments | `/canvas` | Pin comments at specific locations |
| Threads | `/canvas` | Organize comment discussions |

For more details, see the [Liveblocks documentation](https://liveblocks.io/docs).

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
│   └── canvas/               # Collaborative canvas
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── designsystem-ui/      # Design system documentation components
│   └── liveblocks/           # Collaboration features
└── lib/
    ├── data/                 # Data files (JSON, registry)
    ├── types/                # TypeScript types
    └── utils.ts              # Utility functions
```

---

## Tips

- **Use the Design System page** as a reference for available components
- **Browse Foundations** for colors, typography, and icons
- **Start with the sample banking journey** as a template for your own flows
- **Use Cursor AI** to help build pages - describe what you want in natural language

---

## Need Help?

- Check `docs/start-here.md` for a designer-focused guide
- Browse the component source code in `src/components/prototype-ui/`
- Reference the Gluestack UI documentation for component patterns
- [Liveblocks Documentation](https://liveblocks.io/docs) for collaboration features
