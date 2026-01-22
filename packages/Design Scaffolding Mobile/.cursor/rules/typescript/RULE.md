---
description: "Apply when writing TypeScript code, defining types, or working with component props. Strict mode patterns, VariantProps with CVA, extending HTML element types, interface vs type usage, type exports, and avoiding any/assertions."
alwaysApply: false
---

# TypeScript Rules

## Strict Mode

TypeScript strict mode is enabled. Leverage its features:

- No implicit `any`
- Strict null checks
- Strict function types

## Component Props

### Interface Pattern

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}
```

### Extending HTML Elements

Use appropriate HTML attribute types:

- `React.HTMLAttributes<HTMLDivElement>` - Generic div
- `React.ButtonHTMLAttributes<HTMLButtonElement>` - Buttons
- `React.InputHTMLAttributes<HTMLInputElement>` - Inputs
- `React.AnchorHTMLAttributes<HTMLAnchorElement>` - Links
- `React.FormHTMLAttributes<HTMLFormElement>` - Forms

## VariantProps with CVA

Always type variants using `VariantProps`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("base", {
  variants: {
    size: { sm: "", md: "", lg: "" },
  },
});

interface Props extends VariantProps<typeof variants> {}
```

## Type Exports

Export types alongside components:

```tsx
// In component file
export interface CardProps { ... }
export { Card, cardVariants };

// In index.ts
export { Card, cardVariants, type CardProps } from "./card";
```

## Generics

Use generics for reusable utilities:

```tsx
function createContext<T>(defaultValue: T) {
  return React.createContext<T>(defaultValue);
}
```

## Avoid

- `any` type - use `unknown` if type is truly unknown
- Type assertions (`as`) unless absolutely necessary
- Non-null assertions (`!`) - prefer optional chaining

## Prefer

- Explicit return types for exported functions
- `interface` for object shapes, `type` for unions/intersections
- `const` assertions for literal types
- Optional properties (`?`) over `| undefined`
