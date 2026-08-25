"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Icon,
  Plus,
  Text,
} from "@/components/prototype-ui";
import { getColorPreset } from "@/lib/data/trip-planner-colors";
import type { Trip, TripUser } from "@/lib/types/trip-planner";
import {
  formatHeroRange,
  formatTripRange,
  isUpcomingTrip,
  tripMembers,
} from "../_store/helpers";
import { TripPhoto } from "../_components/trip-photo";
import {
  TripTogetherMark,
  TripTogetherWordmark,
} from "../_components/trip-together-mark";
import { UserAvatar } from "../_components/user-avatar";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

export default function TripsHomePage() {
  const router = useRouter();
  const { state, currentUser, setActiveTrip } = useTripPlanner();

  const openTrip = (tripId: string) => {
    setActiveTrip(tripId);
    router.push(ROUTES.tripOverview);
  };

  const [featured, ...rest] = state.trips;

  return (
    <Box className="h-full overflow-y-auto bg-bg-base px-5 pb-10 pt-[58px]">
      <header className="relative mb-7 grid grid-cols-3 items-center">
        <TripTogetherWordmark />
        <div className="flex justify-center">
          <TripTogetherMark size={38} />
        </div>
        <div className="flex justify-end">
          {currentUser ? (
            <button
              type="button"
              aria-label="Your profile"
              onClick={() => router.push(ROUTES.myProfile)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <UserAvatar user={currentUser} size="md" />
            </button>
          ) : null}
        </div>
      </header>

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <Heading as="h1" size="3xl" className="font-semibold">
            Trips
          </Heading>
          <Text className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Plans are better together
          </Text>
        </div>
        <button
          type="button"
          aria-label="Create a new trip"
          onClick={() => router.push(ROUTES.createTrip)}
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-text-primary text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <Icon as={Plus} size="lg" />
        </button>
      </div>

      {state.trips.length === 0 ? (
        <Text className="py-12 text-center text-text-secondary">
          Start a trip. Plans are better together.
        </Text>
      ) : (
        <>
          {featured ? (
            <FeaturedTripCard
              trip={featured}
              members={tripMembers(state, featured)}
              onOpen={() => openTrip(featured.id)}
            />
          ) : null}

          {rest.length > 0 ? (
            <section className="mt-7">
              <div className="mb-3 flex items-baseline justify-between">
                <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                  Upcoming trips
                </Text>
              </div>
              <ul className="divide-y divide-border-decorative">
                {rest.map((trip) => (
                  <li key={trip.id}>
                    <TripRow
                      trip={trip}
                      members={tripMembers(state, trip)}
                      onOpen={() => openTrip(trip.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}

      <Button isFullWidth className="mt-7" onClick={() => router.push(ROUTES.createTrip)}>
        Create a new trip
      </Button>
    </Box>
  );
}

function FeaturedTripCard({
  trip,
  members,
  onOpen,
}: {
  trip: Trip;
  members: TripUser[];
  onOpen: () => void;
}) {
  const upcoming = isUpcomingTrip(trip.endDate);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${trip.name}`}
      className="relative block w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <div className="relative h-[280px] w-full">
        <TripPhoto trip={trip} alt="" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-tt-charcoal/75 via-tt-charcoal/25 to-tt-charcoal/10"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4 text-tt-ivory">
        <div className="flex items-start justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${upcoming ? "bg-tt-terracotta" : "bg-tt-sage"}`}
              aria-hidden="true"
            />
            {upcoming ? "Upcoming" : "Past"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
            {formatHeroRange(trip.startDate, trip.endDate)}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <Text className="font-display text-[28px] font-semibold leading-none text-tt-ivory">
              {trip.name}
            </Text>
            <Text className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-tt-ivory/85">
              {trip.destination}
            </Text>
            {members.length > 0 ? (
              <div className="mt-3">
                <AvatarGroup max={4} className="[&>div]:ring-tt-ivory">
                  {members.map((user) => (
                    <UserAvatar key={user.id} user={user} size="xs" />
                  ))}
                </AvatarGroup>
              </div>
            ) : null}
          </div>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tt-ivory text-text-primary"
            aria-hidden="true"
          >
            <Icon as={ArrowRight} size="lg" />
          </span>
        </div>
      </div>
    </button>
  );
}

function TripRow({
  trip,
  members,
  onOpen,
}: {
  trip: Trip;
  members: TripUser[];
  onOpen: () => void;
}) {
  const upcoming = isUpcomingTrip(trip.endDate);
  const cover = getColorPreset(trip.coverColor);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <div className="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-xl">
        <TripPhoto trip={trip} alt="" />
      </div>
      <div className="min-w-0 flex-1">
        <Text weight="semibold" className="font-display text-lg leading-snug">
          {trip.name}
        </Text>
        <Text size="sm" className="mt-0.5 flex items-center gap-1.5 text-text-secondary">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${upcoming ? cover.dotClass : "bg-text-tertiary"}`}
            aria-hidden="true"
          />
          <span className="truncate">
            {formatTripRange(trip.startDate, trip.endDate)} · {trip.destination}
          </span>
        </Text>
      </div>
      {members.length > 0 ? (
        <AvatarGroup max={3}>
          {members.map((user) => (
            <UserAvatar key={user.id} user={user} size="xs" />
          ))}
        </AvatarGroup>
      ) : null}
    </button>
  );
}
