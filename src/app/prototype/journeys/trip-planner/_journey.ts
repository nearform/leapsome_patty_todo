import type { JourneyConfig } from "@/lib/types/journey";

export const journey: JourneyConfig = {
  id: "trip-planner",
  title: "TripTogether",
  description:
    "Plans are better together — shared itinerary, packing, polls, and a split budget.",
  status: "in-progress",
  pages: [
    {
      id: "profile-switcher",
      name: "Profile switcher",
      path: "/prototype/journeys/trip-planner/profile-switcher",
      description: "Pick or create a demo profile",
    },
    {
      id: "trips-home",
      name: "Trips home",
      path: "/prototype/journeys/trip-planner/trips-home",
      description: "Editorial trip list with photo hero, logo header, and create-trip entry",
    },
    {
      id: "create-trip",
      name: "Create trip",
      path: "/prototype/journeys/trip-planner/create-trip",
      description: "Name, destination, dates, and cover color",
    },
    {
      id: "trip-overview",
      name: "Trip overview",
      path: "/prototype/journeys/trip-planner/trip-overview",
      description: "Trip header, members, and links into trip areas",
    },
    {
      id: "itinerary",
      name: "Itinerary",
      path: "/prototype/journeys/trip-planner/itinerary",
      description: "Stops by day on a timeline, with add-a-stop",
    },
    {
      id: "todos",
      name: "To-dos & packing",
      path: "/prototype/journeys/trip-planner/todos",
      description: "Icon to-dos with assignees and checkboxes",
    },
    {
      id: "polls",
      name: "Decisions",
      path: "/prototype/journeys/trip-planner/polls",
      description: "Vote on open polls; close when decided",
    },
    {
      id: "budget",
      name: "Budget",
      path: "/prototype/journeys/trip-planner/budget",
      description: "Shared expenses and per-person balances",
    },
    {
      id: "my-profile",
      name: "My profile",
      path: "/prototype/journeys/trip-planner/my-profile",
      description: "Edit the current demo profile",
    },
    {
      id: "settings",
      name: "App settings",
      path: "/prototype/journeys/trip-planner/settings",
      description: "Theme, currency, icon suggestions, and reset",
    },
  ],
};
