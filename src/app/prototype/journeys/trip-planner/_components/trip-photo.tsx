"use client";

import { getColorPreset } from "@/lib/data/trip-planner-colors";
import type { Trip } from "@/lib/types/trip-planner";
import { cn } from "@/lib/utils";

/**
 * Destination still for a trip, falling back to the cover colour wash.
 */
export function TripPhoto({
  trip,
  className,
  alt = "",
}: {
  trip: Trip;
  className?: string;
  alt?: string;
}) {
  const cover = getColorPreset(trip.coverColor);

  if (trip.coverImage) {
    return (
      <img
        src={trip.coverImage}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return <div className={cn("h-full w-full", cover.bgClass, className)} aria-hidden="true" />;
}
