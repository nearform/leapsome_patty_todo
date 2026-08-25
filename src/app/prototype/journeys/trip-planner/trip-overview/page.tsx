"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  InputField,
  Text,
} from "@/components/prototype-ui";
import { getColorPreset } from "@/lib/data/trip-planner-colors";
import { Calendar, ListChecks, Vote, Wallet } from "lucide-react";
import { UserAvatar } from "../_components/user-avatar";
import { TripShell } from "../_components/trip-shell";
import { formatCurrency, formatTripRange } from "../_store/helpers";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";
import { useRequireTrip } from "../_store/use-require-trip";

export default function TripOverviewPage() {
  const trip = useRequireTrip();
  const router = useRouter();
  const {
    state,
    members,
    itinerary,
    todos,
    polls,
    expenses,
    updateTrip,
    addMember,
  } = useTripPlanner();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(trip?.name ?? "");
  const [startDate, setStartDate] = useState(trip?.startDate ?? "");
  const [endDate, setEndDate] = useState(trip?.endDate ?? "");

  useEffect(() => {
    if (!trip) return;
    setName(trip.name);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);
  }, [trip]);

  if (!trip) {
    return (
      <TripShell activeItem="overview" hidePageHeader>
        <Box className="px-5 pt-[66px]">
          <Text>Choose a trip from home.</Text>
        </Box>
      </TripShell>
    );
  }

  const cover = getColorPreset(trip.coverColor);
  const availableToAdd = state.users.filter((user) => !trip.memberIds.includes(user.id));
  const doneCount = todos.filter((item) => item.done).length;
  const openPolls = polls.filter((poll) => !poll.closed).length;
  const totalSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const saveEdits = () => {
    if (!name.trim() || !startDate || !endDate) return;
    updateTrip(trip.id, { name: name.trim(), startDate, endDate });
    setIsEditing(false);
  };

  const tiles = [
    { href: ROUTES.itinerary, label: "Itinerary", detail: `${itinerary.length} stops`, icon: Calendar },
    { href: ROUTES.todos, label: "To-dos", detail: `${doneCount} of ${todos.length} done`, icon: ListChecks },
    { href: ROUTES.polls, label: "Decisions", detail: `${openPolls} open`, icon: Vote },
    { href: ROUTES.budget, label: "Budget", detail: formatCurrency(totalSpend, state.currency), icon: Wallet },
  ];

  return (
    <TripShell activeItem="overview" hidePageHeader>
      <div className="surface-inverse px-5 pb-6 pt-[60px] text-text-primary">
        <div className="mb-[18px] flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push(ROUTES.tripsHome)}
            className="text-sm font-medium text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Trips
          </button>
          <Button
            variant="outline"
            action="secondary"
            size="sm"
            className="rounded-full border-white/25 px-3 py-1.5 text-text-primary"
            onClick={() => {
              if (isEditing) saveEdits();
              else setIsEditing(true);
            }}
          >
            {isEditing ? "Done" : "Edit trip"}
          </Button>
        </div>
        <div className={`mb-4 h-1 w-[38px] rounded-sm ${cover.bgClass}`} aria-hidden="true" />
        {isEditing ? (
          <div className="flex flex-col gap-2.5">
            <Input>
              <InputField
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Input>
            <div className="flex gap-2.5">
              <Input className="flex-1 min-w-0">
                <InputField
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </Input>
              <Input className="flex-1 min-w-0">
                <InputField
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </Input>
            </div>
          </div>
        ) : (
          <>
            <Heading as="h1" size="2xl" className="text-text-primary">
              {trip.name}
            </Heading>
            <Text size="sm" className="mt-1.5 text-text-secondary">
              {trip.destination} · {formatTripRange(trip.startDate, trip.endDate)}
            </Text>
          </>
        )}
      </div>

      <Box className="px-5 pb-7 pt-[22px]">
        <div className="mb-3 flex items-center justify-between">
          <Text weight="medium">Travelling together</Text>
          <Text size="sm" className="text-text-secondary">
            {members.length} of {state.users.length} profiles
          </Text>
        </div>
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <span
              key={member.id}
              className="inline-flex items-center gap-2 rounded-full border border-border-decorative py-1.5 pl-1.5 pr-3"
            >
              <UserAvatar user={member} size="xs" />
              <Text size="sm">{member.name}</Text>
            </span>
          ))}
          {availableToAdd.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => addMember(user.id)}
              className="inline-flex items-center rounded-full border border-dashed border-border-subtle px-3 py-1.5 text-sm text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              + {user.name}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3">
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link
                href={tile.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-xl"
              >
                <div className="min-h-[96px] rounded-xl border border-border-decorative bg-bg-elevated p-[18px]">
                  <Icon as={tile.icon} size="md" className="text-text-primary" />
                  <Text weight="medium" className="mt-3.5">
                    {tile.label}
                  </Text>
                  <Text size="sm" className="mt-0.5 text-text-secondary">
                    {tile.detail}
                  </Text>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </TripShell>
  );
}
