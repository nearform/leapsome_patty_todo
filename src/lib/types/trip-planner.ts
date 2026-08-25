/**
 * TripTogether demo types.
 * Color values are design-token keys, not hex, so the UI can stay on-brand.
 */

export const COLOR_TOKENS = [
  "info",
  "success",
  "warning",
  "error",
  "accent",
  "decorative",
] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];

export const TODO_ICON_KEYS = [
  "id-card",
  "sun",
  "plug",
  "droplet",
  "shirt",
  "camera",
  "plane",
  "ticket",
  "book",
  "pill",
  "key",
  "umbrella",
  "utensils",
  "wallet",
  "calendar",
  "tag",
  "map",
  "list",
] as const;

export type TodoIconKey = (typeof TODO_ICON_KEYS)[number];

export type TodoCategory = "packing" | "todo";

export type CurrencySymbol = "€" | "£" | "$";

export interface TripUser {
  id: string;
  name: string;
  color: ColorToken;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverColor: ColorToken;
  /** Optional destination still used on the trips home hero and list. */
  coverImage?: string;
  memberIds: string[];
  settledMemberIds: string[];
}

export interface ItineraryItem {
  id: string;
  tripId: string;
  day: string;
  time: string;
  title: string;
  notes: string;
  createdBy: string;
}

export interface TodoItem {
  id: string;
  tripId: string;
  title: string;
  icon: TodoIconKey;
  category: TodoCategory;
  assignedTo: string | null;
  done: boolean;
}

export interface PollOption {
  id: string;
  label: string;
  votes: string[];
}

export interface Poll {
  id: string;
  tripId: string;
  question: string;
  closed: boolean;
  options: PollOption[];
}

export interface Expense {
  id: string;
  tripId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  settled: boolean;
}

export interface TripPlannerState {
  currentUserId: string;
  activeTripId: string | null;
  users: TripUser[];
  trips: Trip[];
  itineraryItems: ItineraryItem[];
  todos: TodoItem[];
  polls: Poll[];
  expenses: Expense[];
  autoIcons: boolean;
  currency: CurrencySymbol;
}

export interface PersonBalance {
  user: TripUser;
  amount: number;
  settled: boolean;
}
