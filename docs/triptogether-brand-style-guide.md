# TripTogether — Brand Style Guide

## Brand Overview

**TripTogether** is an editorial, elevated brand for modern travel planning—sophisticated, timeless, and effortlessly collaborative.

The visual direction draws inspiration from premium editorial travel publications such as Monocle and Air Mail: restrained, cultured, tactile, and highly considered rather than overtly "tech."

### Brand idea

> **PLANS ARE BETTER TOGETHER**

TripTogether should feel like a beautifully designed travel journal combined with a sophisticated planning tool.

---

## 01 — Logo

### Primary mark

The primary emblem is a simple **TT monogram enclosed in a thin circular outline**.

### Wordmark

**TRIPTOGETHER** is set in uppercase with generous letter spacing.

### Logo principles

- Keep the monogram minimal and monochromatic.
- Use generous clear space around the mark.
- Prefer charcoal or black on light backgrounds.
- Avoid gradients, shadows, outlines with excessive weight, or decorative effects.
- The logo should feel closer to a magazine masthead than a conventional SaaS logo.

---

## 02 — Color Palette

### Core neutrals

| Name | Hex | Usage |
|---|---|---|
| **Ivory** | `#F7F4EF` | Primary app/page background |
| **Paper** | `#ECE6DE` | Secondary surfaces, cards, subtle panels |
| **Stone** | `#D8D3C7` | Borders, dividers, muted UI |
| **Charcoal** | `#111111` | Primary text, buttons, logo |
| **Slate** | `#495057` | Secondary text, darker image overlays |

### Accent palette

| Name | Hex | Usage |
|---|---|---|
| **Terracotta** | `#E4572E` | Primary status/accent color, active states |
| **Sage** | `#8A927D` | Secondary accent, avatars, nature/travel cues |
| **Moss** | `#BDB6A2` | Muted accent, chips and supporting UI |
| **Sand** | `#E6DCC6` | Warm highlight, tags and backgrounds |
| **Dusty Blue** | `#5B7DA6` | Secondary travel/status accent |

### Color philosophy

The palette should feel **warm, quiet, natural, and slightly nostalgic**.

Use charcoal and ivory as the dominant combination. Accent colors should be used sparingly to create moments of emphasis rather than turning the interface into a colorful dashboard.

A good approximate ratio is:

- **70%** Ivory / Paper / neutral surfaces
- **20%** Charcoal / Slate
- **10%** accent colors

---

## 03 — Typography

### Editorial Headlines

**Recoleta Regular**

Use for:

- Trip names
- Large page headlines
- Destination names
- Editorial statements
- Major numerical/date moments

The serif should be expressive and elegant, with enough contrast to immediately communicate the editorial character of the brand.

### UI / Section Titles

**Söhne Semibold**

Use for:

- Navigation
- Section labels
- Buttons
- Metadata
- Categories
- Small headings

Use uppercase and generous tracking where appropriate.

### Body Copy

**Söhne Regular**

Use for:

- Descriptions
- Notes
- Supporting information
- Form labels
- Functional interface copy

### Typography hierarchy

**Display**
- Recoleta Regular
- Large scale
- Tight-to-normal line height

**Section**
- Söhne Semibold
- Uppercase
- Increased letter spacing

**Body**
- Söhne Regular
- Comfortable line height

**Metadata**
- Söhne Semibold
- Uppercase
- Small size
- Generous tracking

### Important rule

Do not use the serif everywhere. The editorial feeling comes from the **contrast between expressive serif headlines and restrained sans-serif UI**.

---

## 04 — Iconography

Icons should be:

- Minimal
- Linear
- Elegant
- Functional
- Easy to scan
- Consistent in stroke weight

Recommended characteristics:

- Approximately **2px stroke weight**
- Rounded or softly finished line caps
- No filled cartoon-style icons
- No excessive detail
- Avoid mixing multiple icon styles

Suggested icon set:

- Plus
- Arrow / Arrow Right
- Calendar
- Location Pin
- People
- Checkbox
- Edit / Pencil
- More / Ellipsis
- Globe
- Compass
- Heart

A library such as Lucide or Tabler can provide the base system.

---

## 05 — Imagery Style

Photography is a major part of the TripTogether identity.

### Desired characteristics

Use imagery that feels:

- Editorial
- Cinematic
- Warm
- Natural
- Architectural
- Culturally specific
- Slightly nostalgic
- Human

Strong subjects include:

- European streets
- Coastal towns
- Hotels
- Architecture
- Landscapes
- Restaurants and tables
- Doorways and details
- Palm-lined roads
- Local neighborhoods
- Beautiful everyday travel moments

### Avoid

- Generic stock photography
- Obvious tourist poses
- Overly saturated colors
- Excessive HDR
- Corporate "team travel" imagery
- Perfectly staged lifestyle photography
- Images that feel like booking-site advertising

### Image treatment

Photography should generally have:

- Warm tonal treatment
- Moderate contrast
- Slightly muted saturation
- Natural shadows
- A tactile, film-like quality

For hero images, use a subtle dark gradient or overlay when white editorial typography needs additional contrast.

---

## 06 — UI Elements

### Primary button

Primary actions use a **Charcoal (`#111111`)** background with Ivory (`#F7F4EF`) text.

Example:

`CREATE A NEW TRIP`

Characteristics:

- Strong horizontal presence
- Uppercase
- Generous letter spacing
- Minimal or no shadow
- Slightly rounded corners

### Secondary button

Use an Ivory or transparent background with a thin Charcoal border.

### Tertiary actions

Prefer understated text links with an arrow rather than conventional colorful links.

Example:

`VIEW ALL →`

---

## Avatars

Avatars should feel integrated into the editorial system rather than like standard social-media UI.

Use:

- Circular crops
- Black-and-white photography where possible
- Initials for users without photos
- Muted brand colors for initials

Recommended avatar colors:

- Sage `#8A927D`
- Sand `#E6DCC6`
- Moss `#BDB6A2`
- Paper `#ECE6DE`

A small Terracotta `#E4572E` dot can indicate the current user or active status.

---

## Chips & Tags

Chips should be subtle and tactile.

Examples:

- `UPCOMING`
- `ITALY`
- `BEACH`
- `FAMILY`

Use Paper, Sand, Sage, Moss, or very light Stone backgrounds.

Avoid bright pills with strong borders or excessive UI decoration.

---

## Cards

Cards should feel like editorial content blocks rather than generic SaaS containers.

### Standard cards

- Background: Paper `#ECE6DE` or Ivory `#F7F4EF`
- Border: Stone `#D8D3C7`
- Radius: approximately 12px

### Hero cards

- Radius: approximately 20px
- Full-bleed photography
- Text layered over the image
- Dark gradient toward the bottom
- Large Recoleta destination title

---

## 07 — Layout & Spacing

### Overall principle

**Generous whitespace + strong hierarchy.**

The interface should never feel crowded.

### Spacing scale

Use an 8px base spacing system:

| Token | Size |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 24px |
| `space-6` | 32px |
| `space-7` | 48px |
| `space-8` | 64px |

### Corner radius

- Small controls: **8px**
- Standard cards: **12px**
- Hero cards: **20px**
- Avatars: **50%**

### Dividers

Use extremely subtle rules:

`#D8D3C7`

Dividers should structure the page without visually dominating it.

---

## 08 — Voice & Feel

TripTogether should sound:

### Sophisticated & Global

Inspired by travel, culture, architecture, food, and design.

**Not:** trendy, loud, hyperactive.

### Collaborative & Effortless

The product should make group travel feel simpler.

**Not:** corporate, productivity-obsessed, or overly functional.

### Curated & Intentional

Details should feel selected rather than generated.

**Not:** cluttered, feature-heavy, or algorithmic.

### Warm & Trustworthy

TripTogether should feel like a reliable travel companion.

**Not:** sterile or overly technical.

---

## Brand Voice Examples

### Prefer

> Lisbon, together.

> Everything for the trip, in one place.

> Plans are better together.

> A few things to decide before we go.

> Your next chapter starts here.

### Avoid

> Optimize your travel workflow.

> Manage your trip efficiently.

> Collaborate with your team.

> Your all-in-one travel productivity platform.

The language should feel **human, concise, editorial, and confident**.

---

## 09 — Motion & Interaction

Motion should be subtle and deliberate.

### Recommended

- Gentle fade-ins
- Slight image scaling on hover
- Smooth card expansion
- Soft transitions between trip states
- Small arrow movement on hover
- 150–250ms UI transitions

### Avoid

- Bouncy animations
- Excessive parallax
- Large interface movement
- Gamified effects
- Confetti or celebratory effects that compete with the editorial aesthetic

The interface should feel **calm and considered**.

---

## 10 — Overall Design Principles

### 1. Editorial over technological

It should feel like a premium travel publication that happens to be interactive.

### 2. Photography carries emotion

Use imagery to create desire and atmosphere; use UI to provide clarity.

### 3. Typography creates personality

The serif/sans-serif contrast is one of the strongest brand identifiers.

### 4. Restraint creates luxury

Fewer colors, fewer borders, fewer controls, more whitespace.

### 5. Collaboration should feel natural

Members, assignments, polls, and shared decisions should be visually integrated rather than looking like separate productivity features.

### 6. Every trip should feel like a story

The destination, dates, people, itinerary, and decisions should come together visually as one cohesive travel narrative.

---

## Quick Reference

```text
BACKGROUND       #F7F4EF  Ivory
SURFACE          #ECE6DE  Paper
BORDER           #D8D3C7  Stone
PRIMARY TEXT     #111111  Charcoal
SECONDARY TEXT   #495057  Slate

ACCENT           #E4572E  Terracotta
ACCENT 2         #8A927D  Sage
ACCENT 3         #BDB6A2  Moss
ACCENT 4         #E6DCC6  Sand
ACCENT 5         #5B7DA6  Dusty Blue

DISPLAY FONT     Recoleta Regular
UI FONT          Söhne Semibold
BODY FONT        Söhne Regular

GRID             8px base
CARD RADIUS      12px
HERO RADIUS      20px
ICON STROKE      ~2px

BRAND LINE       PLANS ARE BETTER TOGETHER
```

---

## Design North Star

**TripTogether should look like a beautiful travel magazine that learned how to become an app.**
