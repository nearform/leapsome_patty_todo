# TripTogether — Product Plan
*A highly visual, collaborative to-do app for planning trips together*
*(Working title — "TripTogether" used as placeholder throughout)*

Prepared for: Patty Bernal / Nearform — Aug 2026
Platform: Mobile app (iOS + Android)

---

## 1. Product Vision

TripTogether is a mobile app that turns trip planning into a shared, visual, low-friction experience instead of a scattered mess of group chats, spreadsheets, and screenshots. Every trip becomes a single collaborative canvas — a visual itinerary timeline, a shared to-do/packing list, group decisions (where to eat, what to do, which dates), and a shared budget — all built for a group to co-create together in real time, on their phones, from the first "should we go to Portugal?" text through the last day of the trip.

**One-line pitch:** *The trip planning app that looks like a mood board and works like a shared to-do list.*

## 2. Why This, Why Now (Competitive Landscape)

Research into the current market (Wanderlog, TripIt, Splitwise, SquadTrip, Troupe, Stippl, Let's Jetty, Cruzmi, AvoSquado, WePlanify) shows a consistent pattern: every competitor is strong in exactly one lane and weak everywhere else.

- **Wanderlog** — genuinely good map-based itinerary building and free live group editing, but no polls/voting, no budget tracking, and users report it slowing down on larger trips. It's a planning tool, not a decision-making or money-tracking tool.
- **TripIt** — excellent at auto-importing confirmations from email into a timeline, but sharing is view-only unless everyone pays for Pro, and it does zero actual planning — no suggestions, no routing, no group input.
- **Splitwise / SquadTrip** — solid expense-splitting and payment collection, but no itinerary or activity planning at all.
- **Troupe / Cruzmi** — polls and voting for group decisions, but thin or missing itinerary, budget, and packing features.
- **Stippl / Let's Jetty** — the closest to "visual" — photo-rich itineraries, real-time collaborative building — but neither has budget tracking or decision/voting tools, and Stippl leans more toward a travel-journal/inspiration feed than active task management.
- **WePlanify** — the one competitor explicitly trying to be "all-in-one" (itinerary + polls + budget + packing), which validates the demand for combining these, but it's web-first with a mobile app still "coming soon," and reviews don't highlight strong visual design as a differentiator.

**The gap:** nobody has combined (a) a genuinely visual, mobile-first interface, (b) real collaborative task/to-do management (not just a shared doc), (c) built-in group decision-making, and (d) budget awareness, in one product. Most groups today stitch together a group chat + Google Doc/Sheet + Splitwise + Pinterest board. TripTogether replaces that stitched-together stack with one visual, task-driven surface.

## 3. Target Users

**Primary persona — "The Planner."** Usually one or two people in a friend group or couple who end up organizing every trip. They're motivated but tired of chasing people for Venmo payments, re-explaining the itinerary in the group chat for the fifth time, and manually building a spreadsheet that half the group never opens. They want a tool that makes their planning effort *visible and shareable* instead of invisible.

**Secondary persona — "The Participant."** Friends, partners, or family members who are happy to contribute — vote on a restaurant, check off their packing list, throw in for the Airbnb — but won't use a tool that feels like project management software. They need something they'd actually open voluntarily because it's fun to look at, not just functional.

**Trip types to design around first:** friend group trips (bachelorette/bachelor, annual friend trip, festival trips) and couples' trips — both have 2–8 people, shared costs, and a mix of planners and participants. Family trips and solo trips are reasonable phase-2 expansions but shouldn't shape the MVP.

## 4. Core Value Proposition & Design Principles

1. **Visual first, list second.** Every trip has a cover photo, every itinerary day is a visual timeline (not a bullet list), every place is a photo card, not a text row. The app should feel closer to a Pinterest board or a travel magazine than a spreadsheet.
2. **Collaboration is the default, not a feature.** There's no "share" button that turns a personal list into a shared one — every trip is multiplayer from creation. Anyone in the trip can add, edit, vote, and check things off, with lightweight attribution (avatars/initials) so it's clear who did what.
3. **Decisions happen in the app, not the group chat.** Polls/voting for "where should we eat tonight" or "which Airbnb" are first-class objects, not an afterthought — this directly targets the gap where Wanderlog/TripIt/Splitwise have none of this.
4. **One shared source of truth for money.** Budget and expense splitting live inside the same trip object as the itinerary, so "can we afford this" is answered in context instead of in a separate app.
5. **Low-friction for the reluctant participant.** Checking off a packing item or voting on a restaurant should take one tap. The app must feel lightweight enough that non-planners actually engage.

## 5. Feature Set

### 5.1 MVP (v1 — what ships first)

**Trip creation & collaboration**
- Create a trip with a name, cover photo (upload or auto-suggested stock photo by destination), dates, and destination(s).
- Invite collaborators via link or contact share; everyone who joins has equal edit rights by default (no complex permissions in v1).
- Presence indicators — avatars show who's viewed/edited recently.

**Visual itinerary / timeline**
- Day-by-day visual timeline for the trip dates. Each activity/stop is a photo card (place photo, name, time, short note) rather than a plain text line.
- Map view toggle showing all pinned locations for a given day, with drag-to-reorder affecting both the map route and the timeline order.
- Anyone can add a stop by searching a place (map/places API) or by pasting a link (basic link-preview parsing for a first pass; full auto-import is phase 2).

**Collaborative to-do & packing lists**
- Shared "before the trip" to-do list (book flights, get travel insurance, exchange currency) and a shared or per-person packing list.
- Tasks can be assigned to a specific person, left unassigned for anyone to grab, or marked personal (packing list defaults to per-person, with a shared "gear" list for tent/cooler/etc. group items).
- Simple checkbox completion with a small celebratory animation on completing a list — visual reward reinforces the "fun to use" principle.

**Group decisions (polls)**
- Create a poll for any open question (restaurant, activity, dates, Airbnb) with photo options where relevant (e.g., paste 3 Airbnb links and vote visually on the listing photos).
- Simple majority-vote UI, live results, auto-closes on a deadline or once everyone's voted.

**Budget & expenses**
- Set a trip budget (optional) and log expenses with who paid and who it's split between.
- Running "who owes who" balance visible per trip, with a settle-up flow (does not need in-app payments in v1 — a "mark as settled" + optional link out to Venmo/PayPal is enough for MVP).

**Notifications**
- Push notifications for new polls, new expenses, and reminders as trip dates approach (e.g., "3 days until Portugal — 4 packing items still unchecked").

### 5.2 Phase 2

- Auto-import bookings from confirmation emails/forwards (TripIt's core feature, done with a more visual presentation).
- Richer place discovery — recommended activities/restaurants by destination, pulled from a travel content API, presented as swipeable visual cards ("Tinder for activities") that feed directly into polls.
- Trip "mood board" / inspiration mode — a Pinterest-style shared board for a trip before dates are even locked, so groups can collect inspiration and vote before it becomes a formal itinerary.
- Offline mode — cached itinerary, maps, and packing lists for when travelling without data.
- Role/permission options for larger or family trips (e.g., a trip organizer role vs. contributor role) — the earlier personas don't need this, but larger group trips will.

### 5.3 Phase 3 / longer-term

- In-app payments/settle-up (avoiding building this in-house initially, likely via a payments API/partner).
- Post-trip recap/memories view — auto-compiled photo timeline once the trip ends, shareable outside the app (a natural virality/growth loop).
- Multi-trip "travel profile" — packing list templates that remember your preferences trip over trip, frequent-flyer/loyalty info.
- Web companion app for desktop planning sessions, once the mobile experience is proven.

## 6. Visual Design Direction

Given the "highly visual" priority, the visual language should lean into:

- **Photo-first cards everywhere** — trips, itinerary stops, poll options, and even to-do categories get a representative photo rather than plain text/icons.
- **A visual, scrollable timeline** for itinerary (think a vertical travel-magazine layout with day dividers, times, and photos) rather than a dense list or calendar grid.
- **Color-coded people, not just avatars** — each collaborator gets a consistent color used for their assigned tasks, votes, and expenses across the whole app, so at a glance you can see "who's doing what" without reading names.
- **Map as a first-class view, not a settings screen** — a persistent map toggle on the itinerary so switching between "list of stops" and "route on a map" is one tap.
- **Micro-interactions/delight** — small satisfying animations for completing packing lists, closing a poll, or hitting a savings goal — this is part of what makes the "reluctant participant" persona want to open the app.
- **A cover-photo-driven trip list** — the home screen is a scrollable set of trip cards with big photos (like a Pinterest/travel-magazine home feed), not a plain list of trip names.

This should be treated as a dedicated design phase once the feature spec below is validated — a follow-up step could be producing actual screen mockups (moodboard, itinerary screen, poll screen, budget screen) once this plan is agreed on.

## 7. Core User Flows

**Flow A — Starting a trip**
Create trip → set name/dates/destination/cover photo → invite collaborators (link/contacts) → land on an empty itinerary + to-do list ready for the group to fill in together.

**Flow B — Planning together**
Any collaborator opens the trip → adds a stop to a day (search place or paste link) → optionally turns an undecided stop into a poll ("Airbnb A vs B") → group votes → winning option auto-populates the itinerary.

**Flow C — Getting ready**
As trip date approaches, collaborators get reminders → check off shared to-do items and personal packing list items → app shows a "trip readiness" visual (e.g., a progress ring per person) to gently nudge stragglers.

**Flow D — Managing money**
Someone logs an expense (e.g., paid for groceries) → selects who it's split between → running balance updates for everyone → at trip end, "settle up" surfaces final balances with an optional link-out to a payment app.

**Flow E — During the trip**
Itinerary becomes the live source of truth — today's stops are highlighted, checked off as completed, and any last-minute changes (restaurant closed, new plan) are edited in real time and visible to everyone instantly.

**Flow F — After the trip**
Trip auto-archives into a visual recap (Phase 3) — a shareable summary of where you went, what you did, and photos, closing the loop and encouraging the next trip to be planned in-app.

## 8. Data Model (high-level)

- **User** — id, name, avatar, color, contact info, notification preferences.
- **Trip** — id, name, destination(s), start/end dates, cover photo, budget (optional), created_by, status (planning / upcoming / active / completed).
- **TripMember** — trip_id, user_id, role (organizer/contributor — phase 2), joined_at.
- **ItineraryItem** — trip_id, day/date, time (optional), place (name, coordinates, photo, source link), notes, order/position, created_by, status (confirmed/proposed).
- **TodoItem** — trip_id, title, category (pre-trip/packing/shared-gear), assigned_to (user_id or "unassigned" or "personal"), is_complete, due_date (optional).
- **Poll** — trip_id, question, options (each with optional photo/link), created_by, deadline, status (open/closed).
- **PollOption / Vote** — poll_id, option details, votes (user_id per option).
- **Expense** — trip_id, description, amount, currency, paid_by (user_id), split_between (list of user_ids + amounts), created_at, settled (bool).
- **Notification** — user_id, trip_id, type (poll/expense/reminder), payload, read status.

This is intentionally simple for v1 — no complex permissioning, no multi-currency conversion beyond basic display, no recurring-task logic. Complexity here is a phase-2+ concern.

## 9. Suggested Tech Stack (mobile-first)

- **Client:** React Native (or Flutter) for a single codebase across iOS/Android — React Native is a reasonable default given broad hiring pool and mature map/animation libraries.
- **Backend/data:** A managed backend with built-in real-time sync (e.g., Firebase/Firestore or Supabase) is a strong fit for v1, since "live group editing" and instant poll/expense updates are core to the product and a managed real-time layer avoids building websocket infrastructure from scratch.
- **Maps:** Mapbox or Google Maps SDK for the itinerary map view, place search/autocomplete, and route drawing.
- **Push notifications:** Firebase Cloud Messaging / APNs via the chosen backend.
- **Auth:** Standard email/social login (Google/Apple sign-in) via the backend provider — trip invites via shareable link should work even before the invitee has an account (frictionless join flow).
- **Image handling:** Cloud storage + CDN for cover photos and place photos (most backends-as-a-service bundle this).

These are recommendations to validate with whoever leads engineering — the key architectural requirement driving these choices is real-time multi-user sync, since that's the backbone of the whole product.

## 10. MVP Success Metrics

- **Activation:** % of created trips that get a second collaborator added within 24 hours (proves the "invite and plan together" loop works).
- **Engagement depth:** average number of collaborators actively contributing (adding stops, voting, checking off tasks) per trip, not just viewing.
- **Task completion:** % of to-do/packing items checked off before trip start date.
- **Decision usage:** % of trips that use at least one poll — validates that in-app decision-making replaces the group chat.
- **Retention/growth loop:** % of users who create a second trip within 6 months, and % of trip invitees who go on to create their own trip (viral loop).

## 11. Open Questions / Next Steps

1. **Naming and branding** — "TripTogether" is a placeholder; worth a short naming exercise before any visual design work locks in.
2. **Visual design phase** — recommend producing actual screen mockups (home feed, itinerary timeline, poll screen, budget screen, packing list) as the next concrete step once this feature scope is agreed on.
3. **Build vs. buy for maps/backend** — confirm budget and team comfort with a managed backend (Firebase/Supabase) vs. custom backend before locking the tech stack.
4. **Scope check for launch** — confirm the MVP feature list in Section 5.1 is truly minimal enough to ship fast, or whether it should be trimmed further (e.g., launching without budget/expenses and adding it in a fast-follow).
5. **Monetization** — competitors mostly use freemium (free core + paid tier for offline maps, unlimited trips, or route optimization); worth deciding this early since it affects which features are "free forever" vs. "premium" from day one.
