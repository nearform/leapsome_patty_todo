---
description: "Apply when creating interactive elements, forms, or UI components. WCAG 2.1 AA compliance, semantic HTML, keyboard navigation, ARIA attributes, focus management, screen reader support, and color contrast requirements."
alwaysApply: false
---

# Accessibility Rules

## Core Principles

All components must be accessible. Follow WCAG 2.1 AA guidelines.

## Semantic HTML

Use semantic HTML elements:

- `<button>` for clickable actions (not `<div onClick>`)
- `<a>` for navigation links
- `<nav>` for navigation regions
- `<main>` for main content
- `<header>`, `<footer>` for page sections
- `<h1>`-`<h6>` for headings (in order)
- `<ul>`, `<ol>` for lists

## Keyboard Navigation

All interactive elements must be keyboard accessible:

- Tab order should be logical
- Focus should be visible
- Enter/Space should activate buttons
- Escape should close modals/dropdowns

### Focus Styles

Use `focus-visible:` instead of `focus:`:

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

## ARIA Attributes

Use ARIA when semantic HTML isn't sufficient:

```tsx
// Buttons with icons only
<button aria-label="Close menu">
  <XIcon />
</button>

// Loading states
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</button>

// Expanded states
<button aria-expanded={isOpen} aria-controls="menu-id">
  Menu
</button>
```

## Color Contrast

- Text must have 4.5:1 contrast ratio (AA)
- Large text (18px+) must have 3:1 ratio
- Design tokens handle this - don't use custom colors

## Screen Readers

- Provide alt text for images
- Use `aria-label` for icon-only buttons
- Hide decorative elements: `aria-hidden="true"`
- Announce dynamic content with live regions

## Interactive Elements

Required attributes for common elements:

### Buttons
```tsx
<button
  type="button"
  disabled={isDisabled}
  aria-label="Action description" // if icon-only
>
```

### Links
```tsx
<a
  href="/path"
  aria-label="Description" // if not clear from text
>
```

### Inputs
```tsx
<input
  id="email"
  type="email"
  aria-describedby="email-error" // for error messages
  aria-invalid={hasError}
/>
<label htmlFor="email">Email</label>
```

## Testing

- Test with keyboard only (no mouse)
- Test with screen reader (VoiceOver on Mac)
- Check color contrast ratios
- Verify focus is always visible
