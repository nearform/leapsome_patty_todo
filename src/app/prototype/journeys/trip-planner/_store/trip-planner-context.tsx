"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cloneTripPlannerSeed,
  TRIP_PLANNER_STORAGE_KEY,
} from "@/lib/data/trip-planner-seed";
import type {
  ColorToken,
  CurrencySymbol,
  Expense,
  ItineraryItem,
  PersonBalance,
  Poll,
  TodoCategory,
  TodoIconKey,
  TodoItem,
  Trip,
  TripPlannerState,
  TripUser,
} from "@/lib/types/trip-planner";
import {
  computeBalances,
  getTrip,
  getUser,
  itemsForTrip,
  newId,
  tripMembers,
} from "./helpers";

export const JOURNEY_BASE = "/prototype/journeys/trip-planner";

export const ROUTES = {
  profileSwitcher: `${JOURNEY_BASE}/profile-switcher`,
  tripsHome: `${JOURNEY_BASE}/trips-home`,
  createTrip: `${JOURNEY_BASE}/create-trip`,
  tripOverview: `${JOURNEY_BASE}/trip-overview`,
  itinerary: `${JOURNEY_BASE}/itinerary`,
  todos: `${JOURNEY_BASE}/todos`,
  polls: `${JOURNEY_BASE}/polls`,
  budget: `${JOURNEY_BASE}/budget`,
  myProfile: `${JOURNEY_BASE}/my-profile`,
  settings: `${JOURNEY_BASE}/settings`,
} as const;

interface TripPlannerContextValue {
  state: TripPlannerState;
  hydrated: boolean;
  currentUser: TripUser | undefined;
  activeTrip: Trip | undefined;
  members: TripUser[];
  itinerary: ItineraryItem[];
  todos: TodoItem[];
  polls: Poll[];
  expenses: Expense[];
  balances: PersonBalance[];
  setCurrentUser: (id: string) => void;
  setActiveTrip: (id: string | null) => void;
  addUser: (name: string, color: ColorToken) => TripUser;
  updateUser: (id: string, patch: Pick<Partial<TripUser>, "name" | "color">) => void;
  addTrip: (input: Omit<Trip, "id" | "memberIds" | "settledMemberIds">) => Trip;
  updateTrip: (id: string, patch: Partial<Omit<Trip, "id">>) => void;
  addMember: (userId: string) => void;
  addItineraryItem: (input: Omit<ItineraryItem, "id" | "tripId" | "createdBy">) => void;
  updateItineraryItem: (id: string, patch: Partial<Omit<ItineraryItem, "id" | "tripId">>) => void;
  deleteItineraryItem: (id: string) => void;
  addTodo: (input: Omit<TodoItem, "id" | "tripId">) => void;
  updateTodo: (id: string, patch: Partial<Omit<TodoItem, "id" | "tripId">>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addPoll: (question: string, optionLabels: string[]) => void;
  vote: (pollId: string, optionId: string) => void;
  togglePollClosed: (pollId: string) => void;
  addExpense: (input: Omit<Expense, "id" | "tripId" | "settled">) => void;
  toggleSettled: (userId: string) => void;
  setAutoIcons: (value: boolean) => void;
  setCurrency: (value: CurrencySymbol) => void;
  reset: () => void;
}

const TripPlannerContext = createContext<TripPlannerContextValue | null>(null);

function isTripPlannerState(value: unknown): value is TripPlannerState {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.currentUserId === "string" &&
    Array.isArray(record.users) &&
    Array.isArray(record.trips)
  );
}

export function TripPlannerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TripPlannerState>(() => cloneTripPlannerSeed());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRIP_PLANNER_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isTripPlannerState(parsed)) {
          setState({
            ...parsed,
            autoIcons: parsed.autoIcons ?? true,
            currency: parsed.currency ?? "€",
            trips: parsed.trips.map((trip) => ({
              ...trip,
              memberIds: trip.memberIds ?? [],
              settledMemberIds: trip.settledMemberIds ?? [],
            })),
            todos: (parsed.todos ?? []).map((item) => ({
              ...item,
              category: (item.category as string) === "packing" ? "packing" as const : "todo" as const,
            })),
          });
        }
      }
    } catch {
      // Keep seed if stored data is unreadable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(TRIP_PLANNER_STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const currentUser = getUser(state, state.currentUserId);
  const activeTrip = getTrip(state, state.activeTripId);
  const members = tripMembers(state, activeTrip);
  const itinerary = itemsForTrip(state.itineraryItems, state.activeTripId);
  const todos = itemsForTrip(state.todos, state.activeTripId);
  const polls = itemsForTrip(state.polls, state.activeTripId);
  const expenses = itemsForTrip(state.expenses, state.activeTripId);
  const balances = computeBalances(members, expenses, activeTrip?.settledMemberIds ?? []);

  const requireTripId = useCallback((): string | null => state.activeTripId, [state.activeTripId]);

  const setCurrentUser = useCallback((id: string) => {
    setState((prev) => ({ ...prev, currentUserId: id }));
  }, []);

  const setActiveTrip = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, activeTripId: id }));
  }, []);

  const addUser = useCallback((name: string, color: ColorToken): TripUser => {
    const user: TripUser = { id: newId(), name: name.trim(), color };
    setState((prev) => ({ ...prev, users: [...prev.users, user], currentUserId: user.id }));
    return user;
  }, []);

  const updateUser = useCallback((id: string, patch: Pick<Partial<TripUser>, "name" | "color">) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((user) => (user.id === id ? { ...user, ...patch } : user)),
    }));
  }, []);

  const addTrip = useCallback((input: Omit<Trip, "id" | "memberIds" | "settledMemberIds">): Trip => {
    const trip: Trip = {
      ...input,
      id: newId(),
      memberIds: [state.currentUserId],
      settledMemberIds: [],
    };
    setState((prev) => ({
      ...prev,
      trips: [...prev.trips, trip],
      activeTripId: trip.id,
    }));
    return trip;
  }, [state.currentUserId]);

  const updateTrip = useCallback((id: string, patch: Partial<Omit<Trip, "id">>) => {
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) => (trip.id === id ? { ...trip, ...patch } : trip)),
    }));
  }, []);

  const addMember = useCallback((userId: string) => {
    const tripId = requireTripId();
    if (!tripId) return;
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) =>
        trip.id === tripId && !trip.memberIds.includes(userId)
          ? { ...trip, memberIds: [...trip.memberIds, userId] }
          : trip
      ),
    }));
  }, [requireTripId]);

  const addItineraryItem = useCallback((input: Omit<ItineraryItem, "id" | "tripId" | "createdBy">) => {
    const tripId = requireTripId();
    if (!tripId) return;
    setState((prev) => ({
      ...prev,
      itineraryItems: [
        ...prev.itineraryItems,
        { ...input, id: newId(), tripId, createdBy: prev.currentUserId },
      ],
    }));
  }, [requireTripId]);

  const updateItineraryItem = useCallback((id: string, patch: Partial<Omit<ItineraryItem, "id" | "tripId">>) => {
    setState((prev) => ({
      ...prev,
      itineraryItems: prev.itineraryItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  }, []);

  const deleteItineraryItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      itineraryItems: prev.itineraryItems.filter((item) => item.id !== id),
    }));
  }, []);

  const addTodo = useCallback((input: Omit<TodoItem, "id" | "tripId">) => {
    const tripId = requireTripId();
    if (!tripId) return;
    setState((prev) => ({
      ...prev,
      todos: [...prev.todos, { ...input, id: newId(), tripId }],
    }));
  }, [requireTripId]);

  const updateTodo = useCallback((id: string, patch: Partial<Omit<TodoItem, "id" | "tripId">>) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    }));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.filter((item) => item.id !== id),
    }));
  }, []);

  const addPoll = useCallback((question: string, optionLabels: string[]) => {
    const tripId = requireTripId();
    if (!tripId) return;
    const options = optionLabels
      .map((label) => label.trim())
      .filter(Boolean)
      .map((label) => ({ id: newId(), label, votes: [] as string[] }));
    if (options.length < 2) return;
    setState((prev) => ({
      ...prev,
      polls: [...prev.polls, { id: newId(), tripId, question: question.trim(), closed: false, options }],
    }));
  }, [requireTripId]);

  const vote = useCallback((pollId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      polls: prev.polls.map((poll) => {
        if (poll.id !== pollId || poll.closed) return poll;
        return {
          ...poll,
          options: poll.options.map((option) => {
            const withoutUser = option.votes.filter((id) => id !== prev.currentUserId);
            if (option.id === optionId) {
              const alreadyVotedHere = option.votes.includes(prev.currentUserId);
              return { ...option, votes: alreadyVotedHere ? withoutUser : [...withoutUser, prev.currentUserId] };
            }
            return { ...option, votes: withoutUser };
          }),
        };
      }),
    }));
  }, []);

  const togglePollClosed = useCallback((pollId: string) => {
    setState((prev) => ({
      ...prev,
      polls: prev.polls.map((poll) =>
        poll.id === pollId ? { ...poll, closed: !poll.closed } : poll
      ),
    }));
  }, []);

  const addExpense = useCallback((input: Omit<Expense, "id" | "tripId" | "settled">) => {
    const tripId = requireTripId();
    if (!tripId) return;
    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { ...input, id: newId(), tripId, settled: false }],
    }));
  }, [requireTripId]);

  const toggleSettled = useCallback((userId: string) => {
    const tripId = requireTripId();
    if (!tripId) return;
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) => {
        if (trip.id !== tripId) return trip;
        const settled = trip.settledMemberIds.includes(userId);
        return {
          ...trip,
          settledMemberIds: settled
            ? trip.settledMemberIds.filter((id) => id !== userId)
            : [...trip.settledMemberIds, userId],
        };
      }),
    }));
  }, [requireTripId]);

  const setAutoIcons = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, autoIcons: value }));
  }, []);

  const setCurrency = useCallback((value: CurrencySymbol) => {
    setState((prev) => ({ ...prev, currency: value }));
  }, []);

  const reset = useCallback(() => {
    const seed = cloneTripPlannerSeed();
    setState(seed);
    localStorage.setItem(TRIP_PLANNER_STORAGE_KEY, JSON.stringify(seed));
  }, []);

  const value = useMemo<TripPlannerContextValue>(
    () => ({
      state,
      hydrated,
      currentUser,
      activeTrip,
      members,
      itinerary,
      todos,
      polls,
      expenses,
      balances,
      setCurrentUser,
      setActiveTrip,
      addUser,
      updateUser,
      addTrip,
      updateTrip,
      addMember,
      addItineraryItem,
      updateItineraryItem,
      deleteItineraryItem,
      addTodo,
      updateTodo,
      toggleTodo,
      deleteTodo,
      addPoll,
      vote,
      togglePollClosed,
      addExpense,
      toggleSettled,
      setAutoIcons,
      setCurrency,
      reset,
    }),
    [
      state,
      hydrated,
      currentUser,
      activeTrip,
      members,
      itinerary,
      todos,
      polls,
      expenses,
      balances,
      setCurrentUser,
      setActiveTrip,
      addUser,
      updateUser,
      addTrip,
      updateTrip,
      addMember,
      addItineraryItem,
      updateItineraryItem,
      deleteItineraryItem,
      addTodo,
      updateTodo,
      toggleTodo,
      deleteTodo,
      addPoll,
      vote,
      togglePollClosed,
      addExpense,
      toggleSettled,
      setAutoIcons,
      setCurrency,
      reset,
    ]
  );

  return (
    <TripPlannerContext.Provider value={value}>{children}</TripPlannerContext.Provider>
  );
}

export function useTripPlanner(): TripPlannerContextValue {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error("useTripPlanner must be used within TripPlannerProvider");
  }
  return context;
}

export type { TodoCategory, TodoIconKey };
