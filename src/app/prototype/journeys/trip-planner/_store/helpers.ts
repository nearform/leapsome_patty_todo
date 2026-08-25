import type {
  Expense,
  ItineraryItem,
  PersonBalance,
  Trip,
  TripPlannerState,
  TripUser,
} from "@/lib/types/trip-planner";

export function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export function formatDayLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatShortDay(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatLongDay(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

export function formatTripRange(startDate: string, endDate: string): string {
  return `${formatShortDay(startDate)} – ${formatShortDay(endDate)}`;
}

const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

/** Editorial date range for featured trip cards, e.g. "SEP 10 — SEP 13, 2026". */
export function formatHeroRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${startDate} — ${endDate}`;
  }
  const startLabel = `${MONTHS_SHORT[start.getMonth()]} ${start.getDate()}`;
  const endLabel = `${MONTHS_SHORT[end.getMonth()]} ${end.getDate()}`;
  if (start.getFullYear() === end.getFullYear()) {
    return `${startLabel} — ${endLabel}, ${end.getFullYear()}`;
  }
  return `${startLabel} ${start.getFullYear()} — ${endLabel}, ${end.getFullYear()}`;
}

export function isUpcomingTrip(endDate: string, today = new Date()): boolean {
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(end.getTime())) return false;
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return end >= startOfToday;
}

export function daysInRange(startDate: string, endDate: string, max = 14): string[] {
  const days: string[] = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return days;
  for (let cursor = new Date(start); cursor <= end && days.length < max; cursor.setDate(cursor.getDate() + 1)) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    days.push(`${year}-${month}-${day}`);
  }
  return days;
}

export function formatCurrency(amount: number, symbol = "€"): string {
  const absolute = Math.abs(amount);
  return `${symbol}${absolute.toFixed(2)}`;
}

export function getUser(state: TripPlannerState, userId: string): TripUser | undefined {
  return state.users.find((user) => user.id === userId);
}

export function getTrip(state: TripPlannerState, tripId: string | null): Trip | undefined {
  if (!tripId) return undefined;
  return state.trips.find((trip) => trip.id === tripId);
}

export function tripMembers(state: TripPlannerState, trip: Trip | undefined): TripUser[] {
  if (!trip) return [];
  return trip.memberIds
    .map((id) => getUser(state, id))
    .filter((user): user is TripUser => Boolean(user));
}

export function itemsForTrip<T extends { tripId: string }>(items: T[], tripId: string | null): T[] {
  if (!tripId) return [];
  return items.filter((item) => item.tripId === tripId);
}

export function itineraryDaysForTrip(
  startDate: string,
  endDate: string,
  items: ItineraryItem[]
): Array<{ iso: string; label: string; sub: string; items: ItineraryItem[] }> {
  return daysInRange(startDate, endDate).map((iso, index) => ({
    iso,
    label: `Day ${index + 1}`,
    sub: formatLongDay(iso),
    items: items
      .filter((item) => item.day === iso)
      .sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

export function computeBalances(
  members: TripUser[],
  expenses: Expense[],
  settledMemberIds: string[]
): PersonBalance[] {
  return members.map((user) => {
    let paid = 0;
    let share = 0;

    for (const expense of expenses) {
      if (expense.settled) continue;
      if (expense.splitBetween.length === 0) continue;
      if (expense.paidBy === user.id) {
        paid += expense.amount;
      }
      if (expense.splitBetween.includes(user.id)) {
        share += expense.amount / expense.splitBetween.length;
      }
    }

    return {
      user,
      amount: paid - share,
      settled: settledMemberIds.includes(user.id),
    };
  });
}
