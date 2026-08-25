"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";

export function useRequireTrip() {
  const router = useRouter();
  const { activeTrip, hydrated } = useTripPlanner();

  useEffect(() => {
    if (hydrated && !activeTrip) {
      router.replace(ROUTES.tripsHome);
    }
  }, [hydrated, activeTrip, router]);

  return activeTrip;
}
