"use client";

import type { ReactNode } from "react";
import { TripPlannerProvider } from "./_store/trip-planner-context";
import { IosDeviceFrame } from "./_components/ios-device-frame";

export default function TripPlannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TripPlannerProvider>
      <IosDeviceFrame>{children}</IosDeviceFrame>
    </TripPlannerProvider>
  );
}
