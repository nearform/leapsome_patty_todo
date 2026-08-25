"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Calendar, List, Users, Vote, Wallet } from "lucide-react";
import { AppFooter, Box, type AppFooterItem } from "@/components/prototype-ui";
import { ROUTES, useTripPlanner } from "../_store/trip-planner-context";
import { ScreenChrome } from "./screen-chrome";

const TRIP_NAV: AppFooterItem[] = [
  { id: "overview", label: "Trip", icon: Users, href: ROUTES.tripOverview },
  { id: "itinerary", label: "Plan", icon: Calendar, href: ROUTES.itinerary },
  { id: "todos", label: "Lists", icon: List, href: ROUTES.todos },
  { id: "polls", label: "Votes", icon: Vote, href: ROUTES.polls },
  { id: "budget", label: "Money", icon: Wallet, href: ROUTES.budget },
];

interface TripShellProps {
  title?: string;
  subtitle?: string;
  activeItem: "overview" | "itinerary" | "todos" | "polls" | "budget";
  hidePageHeader?: boolean;
  children: ReactNode;
}

export function TripShell({
  title,
  subtitle,
  activeItem,
  hidePageHeader = false,
  children,
}: TripShellProps) {
  const router = useRouter();
  const { activeTrip } = useTripPlanner();

  return (
    <Box className="flex h-full flex-col bg-bg-base">
      {hidePageHeader ? (
        <Box as="main" className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </Box>
      ) : (
        <Box as="main" className="min-h-0 flex-1 overflow-y-auto px-5 pb-7 pt-[66px]">
          <ScreenChrome
            backLabel={activeTrip?.name ?? "Trip"}
            onBack={() => router.push(ROUTES.tripOverview)}
            title={title ?? activeTrip?.name ?? "Trip"}
            subtitle={subtitle}
          />
          {children}
        </Box>
      )}
      <AppFooter
        position="static"
        className="px-1.5 py-2 pb-2 bg-bg-base"
        items={TRIP_NAV}
        activeItem={activeItem}
        onItemClick={(item) => {
          if (item.href) router.push(item.href);
        }}
      />
    </Box>
  );
}
