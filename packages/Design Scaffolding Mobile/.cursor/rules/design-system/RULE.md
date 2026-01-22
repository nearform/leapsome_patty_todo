---
description: "Apply when styling components, using colors, or working with Tailwind. Design tokens, semantic color usage (bg-base, text-primary, accent), Tailwind utility classes only (no @apply), dark mode variants, accessibility states (focus-visible), Gluestack UI patterns, and class ordering."
alwaysApply: false
---

# Design System Rules

## Core Principle

**NO hardcoded colors or values in components.** All styling must use semantic tokens.

**Components use Gluestack UI patterns** for future React Native compatibility.

## Semantic Color Tokens

Use these semantic tokens (defined in `tailwind.config.ts` and `globals.css`):

### Backgrounds
- `bg-base` - Primary background
- `bg-elevated` - Elevated surfaces (cards, modals)
- `bg-secondary` - Secondary background
- `bg-tertiary` - Tertiary background

### Text
- `text-primary` - Primary text
- `text-body` - Body text
- `text-secondary` - Secondary text
- `text-tertiary` - Tertiary/muted text
- `text-disabled` - Disabled state text

### Borders
- `border-standard` - Standard borders
- `border-subtle` - Subtle borders
- `border-decorative` - Decorative borders

### Accent Colors
- `accent` / `accent-primary` - Primary accent (Dusk purple)
- `accent-light` - Light accent variant
- `accent-dark` - Dark accent variant
- `accent-hover` - Hover state accent

### Status Colors
- `success`, `success-light`, `success-dark`, `success-bg`
- `info`, `info-light`, `info-dark`, `info-bg`
- `warning`, `warning-light`, `warning-dark`, `warning-bg`
- `error`, `error-light`, `error-dark`, `error-bg`

## Tailwind Constraints

### Utility Classes Only
- Use Tailwind utility classes exclusively
- **NO** `@apply` directives
- **NO** custom CSS (except for CSS variables in globals.css)

### Class Ordering
Follow this semantic order:
1. Layout: `flex`, `grid`, `block`, `inline`
2. Positioning: `relative`, `absolute`, `fixed`
3. Sizing: `w-*`, `h-*`, `min-*`, `max-*`
4. Spacing: `p-*`, `m-*`, `gap-*`
5. Colors: `bg-*`, `text-*`, `border-*`
6. Typography: `text-*`, `font-*`, `leading-*`
7. Effects: `shadow-*`, `opacity-*`
8. States: `hover:`, `focus:`, `active:`, `disabled:`

### Dark Mode
- Always include `dark:` variants for theme-aware styling
- Example: `bg-bg-base dark:bg-bg-base` (tokens handle this automatically)
- Test both light and dark modes

### Accessibility States
- Use `focus-visible:` for keyboard focus (not `focus:`)
- Include `aria-*` attributes where needed
- Ensure keyboard navigation works

## Reference Documentation

- Figma tokens: `docs/figma-color-tokens.md`
- Tailwind config: `tailwind.config.ts`
- CSS variables: `src/app/globals.css`

## Component Export Pattern

All components must be exported via `src/components/ui/index.ts`:

```ts
export { Button, buttonVariants } from "./button";
export { Card, CardHeader, CardContent } from "./card";

// Gluestack components
export { Icon } from "./gluestack/icon";
export { Image } from "./gluestack/image";
export { Link, LinkText } from "./gluestack/link";
```

## Gluestack UI Integration

Components follow Gluestack UI patterns for React Native compatibility:

### Key Patterns
- **Compound components**: `<Input><Input.Field /></Input>` instead of `<Input />`
- **Boolean props**: Use `isDisabled`, `isChecked`, `isInvalid` (not `disabled`, `checked`)
- **Icon component**: Use `<Icon as={LucideIcon} />` for all icons
- **Data attributes**: Use `data-disabled`, `data-checked` for styling states

### Available Gluestack Components
Located in `src/components/ui/gluestack/`:
- `Icon` - Wrapper for Lucide icons with size variants
- `Image` - Next.js Image with Gluestack API
- `Link`, `LinkText` - Navigation links
- `Modal`, `Drawer` - Overlay components
- `Radio`, `RadioGroup` - Radio button controls
- `Textarea` - Multi-line text input
- `Pressable` - Touchable wrapper
- `Skeleton` - Loading placeholder

## Design System Pages

The design system is split into two pages:

### Foundations Page (`src/app/design-system/foundations/page.tsx`)
Add foundational/primitive components here:
- **Icons**: Icon component with Lucide icons
- **Typography**: Text, Heading
- **Form Components**: Input, Checkbox, Switch, Radio, Textarea, Select
- **Feedback**: Alerts, Badges, Progress, Spinner
- **Data Display**: Avatars (with badges and country flags), Cards
- **Layout**: Box, VStack, HStack, Center, Divider
- **Navigation**: Link component

### Components Page (`src/app/design-system/page.tsx`)
Add application-level/composite components here:
- **App Components**: AppHeader, AppFooter
- **Content**: Carousels, Stories, Tabs
- **Overlays**: Modal, Drawer, Tooltip
- **Complex interactive components** built for the prototype app

### When Creating New Components
1. Determine if the component is a **foundation** (primitive/reusable) or **app component** (composite/app-specific)
2. Add examples to the appropriate page showing all variants
3. Export the component via `src/components/ui/index.ts`
4. **Follow Gluestack patterns** - reference existing migrated components for patterns
