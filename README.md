# TripTogether

> Plans are better together.

TripTogether is an editorial trip-planning prototype. Friends share a trip, an itinerary, packing lists, group decisions, and a split budget — presented like a travel magazine, not a generic productivity app.

This is a **frontend-only** click-through. There is no backend, auth, or live sync. Demo profiles and trip data persist in the browser via `localStorage`.

## What you can do

- Switch between demo people (Alex, Jamie, Priya) or add a profile
- Browse trips on a photo-led home screen (Portugal 2026 hero, Donegal in the list)
- Create a trip with name, destination, dates, and a cover colour
- Plan days on a timeline, check packing and to-dos, vote on decisions, and split expenses
- Edit your profile colour and name; reset the demo from Settings

Collaboration in the demo means switching profiles in one session. Everyone on a trip can see the same local data.

## Screens

| Screen | Path | What it is |
|--------|------|------------|
| Profile switcher | `/prototype/journeys/trip-planner/profile-switcher` | Pick or create who you are |
| Trips home | `/prototype/journeys/trip-planner/trips-home` | Logo header, Lisbon hero card, upcoming trips |
| Create trip | `/prototype/journeys/trip-planner/create-trip` | Name, place, dates, cover colour |
| Trip overview | `/prototype/journeys/trip-planner/trip-overview` | Members and tiles into the trip |
| Itinerary | `/prototype/journeys/trip-planner/itinerary` | Stops by day |
| To-dos & packing | `/prototype/journeys/trip-planner/todos` | Icons, assignees, Packing / Before we go |
| Decisions | `/prototype/journeys/trip-planner/polls` | Vote bars; open or close a poll |
| Budget | `/prototype/journeys/trip-planner/budget` | Shared spend, paid-by, even split |
| My profile | `/prototype/journeys/trip-planner/my-profile` | Name, colour, settings, switch profile |
| App settings | `/prototype/journeys/trip-planner/settings` | Theme, currency (€ £ $), auto-icons, reset demo |

On desktop the journey sits in an iPhone frame. On a small viewport it goes full-bleed with the same status bar and home indicator.

Trip tabs inside a trip: **Trip / Plan / Lists / Votes / Money**.

## Quick start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/nearform/leapsome_patty_todo.git
cd leapsome_patty_todo

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then go to **Prototype → TripTogether**, or open the profile switcher directly:

[http://localhost:3000/prototype/journeys/trip-planner/profile-switcher](http://localhost:3000/prototype/journeys/trip-planner/profile-switcher)

## Navigation

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/prototype` | Prototype workspace |
| `/prototype/journeys` | Registered journeys |
| `/prototype/journeys/trip-planner/profile-switcher` | Start the TripTogether demo |
| `/design-system` | Component showcase |
| `/design-system/foundations` | Colour, type, icons, form controls |
| `/canvas` | All journey screens on one canvas |

## Brand

Ivory page (`#F7F4EF`), Paper elevated surfaces, Stone borders, Charcoal text and CTAs. Terracotta is decorative (status dots, glints), not the primary button colour. Person colours use Sage, Sand, Dusty Blue, Moss, and Terracotta.

- **Display:** Fraunces
- **UI / body:** Geist
- **Radii:** 8px controls, 12px cards, 20px photo heroes; avatars stay fully round
- **Mark:** serif **TT** in a thin circle, plus tracked **TRIPTOGETHER** wordmark

Full tokens and usage: [docs/triptogether-brand-style-guide.md](./docs/triptogether-brand-style-guide.md)

## How data works

Seeded state lives in `src/lib/data/trip-planner-seed.ts` (Portugal 2026 + Donegal weekend). The app clones that into React context and writes it to `localStorage` (`trip-planner-demo-v4`). **Reset demo** in Settings restores the seed.

Cover stills:

- `public/images/trip-planner/lisbon-cover.jpg`
- `public/images/trip-planner/donegal-cover.jpg`

## Project structure

```
src/
├── app/
│   ├── design-system/                 # Component + token showcase
│   ├── prototype/journeys/trip-planner/
│   │   ├── _journey.ts                # Journey metadata
│   │   ├── _components/               # Logo, avatars, iOS frame, trip chrome
│   │   ├── _store/                    # Context, helpers, persistence
│   │   ├── profile-switcher/
│   │   ├── trips-home/
│   │   ├── create-trip/
│   │   ├── trip-overview/
│   │   ├── itinerary/
│   │   ├── todos/
│   │   ├── polls/
│   │   ├── budget/
│   │   ├── my-profile/
│   │   └── settings/
│   ├── canvas/
│   └── layout.tsx
├── components/prototype-ui/           # Shared UI (Button, Card, Avatar, …)
└── lib/
    ├── data/
    │   ├── journeys-registry.ts
    │   ├── trip-planner-seed.ts
    │   ├── trip-planner-colors.ts
    │   └── trip-planner-icons.ts
    └── types/trip-planner.ts
```

Screens are static folders, not dynamic `[tripId]` routes. The active trip is stored in context.

## Design system

The prototype is built from Gluestack-style compound components in `src/components/prototype-ui/`: Box, Stack, Card, Button, Input, Select, Checkbox, Switch, Badge, Avatar, Heading, Text, Modal, Alert, and related primitives. Showcase pages live under `/design-system`.

To add another journey, see [docs/start-here.md](./docs/start-here.md).

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** class-variance-authority, tailwind-merge, clsx

## Scripts

```bash
npm run dev                 # Development server
npm run build               # Production build
npm run start               # Production server
npm run lint                # ESLint
npm run screenshots         # Recapture journey screenshots
```

## Documentation

- **Brand style guide:** [docs/triptogether-brand-style-guide.md](./docs/triptogether-brand-style-guide.md)
- **MVP scope:** [docs/trip-planner-mvp-scope.md](./docs/trip-planner-mvp-scope.md)
- **App plan:** [docs/trip-planner-app-plan.md](./docs/trip-planner-app-plan.md)
- **Designer guide:** [docs/start-here.md](./docs/start-here.md)
- **Session log:** [cursor-updates.md](./cursor-updates.md)
