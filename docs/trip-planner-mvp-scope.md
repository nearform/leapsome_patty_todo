# TripTogether — MVP Demo Scope

*Scoped-down version of `trip-planner-app-plan.md` and `trip-planner-app-screens.md`, for a functioning click-through demo: real persistence (JSON-backed), 10 screens, minimal moving parts. This doc replaces the full 45-screen spec as the build target for this pass — the full spec remains the long-term reference.*

---

## 1. Scoping philosophy

Cut anything that needs a real external service or infrastructure; keep everything that demonstrates the core idea (visual, collaborative, icon-per-item to-dos, group polls, shared budget). Where a full-spec feature is cut, it's either dropped or folded into a simpler stand-in:

| Full-spec feature | MVP treatment | Why |
|---|---|---|
| Sign up / log in / forgot password | **Profile switcher** — pick or create a demo user (name + color) | No real auth needed for a demo; removes 4 screens |
| Invite links / deep-link join flow | Cut — all seeded demo users are already trip members | No real multi-device invite needed |
| Map view (Mapbox/Google Maps) | Cut — itinerary is a plain list | Avoids API keys/paid SDKs for a demo |
| Stop detail as its own screen | Folded into the itinerary list (expand/edit inline) | Saves a screen, no loss of function |
| Icon picker as its own screen | Folded into the add/edit to-do form | Same reasoning |
| Polls: separate create/vote/results screens | One screen — cards expand to create or vote inline | Fewer screens, same functionality |
| Settle-up + payment app linking | A simple "mark settled" toggle inside Budget | No real payment integration needed |
| Notifications inbox | Cut | No push infra in a demo |
| Trip members / roles / permissions | Folded into Trip overview as a plain member list, no roles | MVP has flat permissions anyway |
| Photo upload & cropping | Preset cover colors/stock photos to choose from; initials avatars | No storage bucket needed |
| Trip recap (Phase 3), travel profile (Phase 3) | Cut | Already Phase 3 in the full spec |
| Real-time multi-device sync | Cut — "collaboration" = switching profiles in one session | No websocket/backend infra needed |

---

## 2. The 10 screens

1. **Profile switcher** — list of seeded demo users (avatar, name, color) + "add a profile." Selecting one sets `currentUserId` for the session. Stands in for login.
2. **Trips home** — card list of trips (name, destination, dates, member avatars) + "create trip."
3. **Create trip** — name, destination, start/end date, pick a cover color/preset photo from a small fixed set.
4. **Trip overview** — trip header (inline-editable name/dates), member list (add existing demo users to this trip), preview tiles linking into Itinerary / To-dos / Polls / Budget.
5. **Itinerary** — list of stops grouped by day (day, time, title, notes), add/edit inline (modal or inline form, not a separate route).
6. **To-dos & packing** — item rows with icon (auto-suggested from title via keyword match, tap to override from a small icon grid), assignee color dot, checkbox. Add/edit item inline, icon picker as a small embedded grid/modal, not a separate screen.
7. **Polls** — list of poll cards; "new poll" expands an inline create form (question + options); an open poll card expands to show options as tappable vote buttons with live counts.
8. **Budget** — expense list (description, amount, paid by, split between), add-expense inline form, running per-person balance, "mark settled" toggle per balance line.
9. **My profile** — edit your own name and color.
10. **App settings** — a theme toggle (optional), a "reset demo data" button, version/about text.

---

## 3. Data model (single JSON file)

One file, e.g. `db.json`, holds everything. No separate tables/collections beyond top-level arrays — small enough that a flat structure is easier to reason about than anything relational.

```json
{
  "currentUserId": "u1",
  "users": [
    { "id": "u1", "name": "Alex", "color": "#4a9eed" },
    { "id": "u2", "name": "Jamie", "color": "#8b5cf6" }
  ],
  "trips": [
    {
      "id": "t1",
      "name": "Portugal 2026",
      "destination": "Lisbon, Portugal",
      "startDate": "2026-09-10",
      "endDate": "2026-09-17",
      "coverColor": "#f59e0b",
      "memberIds": ["u1", "u2"]
    }
  ],
  "itineraryItems": [
    { "id": "i1", "tripId": "t1", "day": "2026-09-10", "time": "14:00", "title": "Check into hotel", "notes": "", "createdBy": "u1" }
  ],
  "todos": [
    { "id": "td1", "tripId": "t1", "title": "Passport", "icon": "id-card", "category": "packing", "assignedTo": "u1", "done": true },
    { "id": "td2", "tripId": "t1", "title": "Sunscreen", "icon": "sun", "category": "packing", "assignedTo": "u2", "done": false }
  ],
  "polls": [
    {
      "id": "p1",
      "tripId": "t1",
      "question": "Which Airbnb?",
      "closed": false,
      "options": [
        { "id": "o1", "label": "Downtown loft", "votes": ["u1"] },
        { "id": "o2", "label": "Beach house", "votes": [] }
      ]
    }
  ],
  "expenses": [
    { "id": "e1", "tripId": "t1", "description": "Groceries", "amount": 42.50, "paidBy": "u1", "splitBetween": ["u1", "u2"], "settled": false }
  ]
}
```

Every list/array is filtered by `tripId` client-side or in the API layer — no need for joins or a query layer.

---

## 4. Technical considerations

**Recommended stack:** a single Next.js app (or plain Vite + a tiny Express server, either works) so the front end and the JSON read/write API live in one project — simplest to scaffold in one pass and simplest to run (`npm run dev`, one process). Use plain `fs.readFile`/`writeFile` on `db.json`, or a tiny helper library like `lowdb` if you want a nicer read/write API — a full database (Postgres, Mongo) is unnecessary for this scope.

**The serverless persistence gotcha — read this before deploying anywhere:** if this ever gets deployed to a serverless host (Vercel, Netlify Functions, etc.), writes to a local JSON file will **not** persist — serverless filesystems are ephemeral/read-only between invocations, so a "save" might appear to work and then vanish on the next request or after a cold start. This won't show up when running locally (`npm run dev`), which is why it's an easy trap. Two ways around it if a persistent, shareable hosted demo matters:
- Host on a small persistent process instead of serverless — Render, Railway, Fly.io, or even a basic VM — where the JSON file just lives on disk between requests, or
- Swap the JSON file for a free-tier hosted store (Supabase, Firebase Realtime DB) behind the same simple read/write functions, so the rest of the app doesn't need to change.
If this is only ever going to run on one machine for a live demo, none of this matters — just run it locally.

**No real auth:** the profile switcher is the entire identity system. `currentUserId` (stored in the JSON, or just in memory/localStorage) drives "assigned to," "paid by," and which color is "you" everywhere in the UI.

**No real-time sync across devices:** since there's one JSON file and no websockets, two people won't see each other's edits live. "Collaboration" for this demo means switching between seeded profiles in the same session to show how the same trip looks from each person's side.

**No map/geocoding:** the itinerary is a plain list — day, time, title, notes. This avoids needing a Mapbox/Google Maps API key and an entire map-view screen for a demo that's really about the to-do/icon/poll/budget mechanics.

**Icon system, simplified:** skip anything "smart" — a small hardcoded keyword-to-icon lookup table is enough (e.g. `passport → id-card`, `sun`/`sunscreen → sun`, `charger`/`phone → plug`, `swim`/`suit → swimming`, fallback → a generic tag icon), checked against the item title as it's typed. Pair it with a small fixed icon grid for manual override. A free icon set like Lucide or Tabler covers this with zero custom SVG work.

**No photo upload:** trip covers are picked from a small preset set (solid colors or a few bundled stock images); profile avatars are colored initials. This removes any need for file upload handling or a storage bucket.

**State management:** React Context + hooks is enough at this scale — no Redux/Zustand needed. A single context wrapping the whole JSON blob (or one context per domain: trips, todos, polls, expenses) both work fine given how small the data is.

**IDs:** simple incrementing strings or `crypto.randomUUID()` — no ID-generation library needed.

**Seed data:** pre-populate `db.json` with 1 trip, 2–3 users, a few itinerary stops, a mix of checked/unchecked to-dos (so the icon + checkbox system is visible immediately), one open poll, and one expense — so the demo looks alive on first load instead of empty.

**Reset button:** worth adding a "reset demo data" action in App settings that overwrites `db.json` back to the seed state, so the demo can be re-run cleanly without manually editing files between walkthroughs.

**Explicitly out of scope for this pass:** push notifications, invite links/deep linking, member roles/permissions, real payment-app linking, trip recap, offline mode, multi-currency, persisted theme preference beyond a simple toggle, and any real account/email/password management.
