"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Battery, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * iPhone-style device frame for the TripTogether prototype.
 *
 * Status bar overlays screen content so inverse heroes can run edge-to-edge.
 * On md+ the app sits in a bezelled phone; on small viewports it goes full-bleed.
 */
export function IosDeviceFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const statusBarDark =
    pathname.endsWith("/profile-switcher") || pathname.endsWith("/trip-overview");
  const homeIndicatorLight = pathname.endsWith("/profile-switcher");

  return (
    <div className="min-h-dvh bg-bg-base md:flex md:items-center md:justify-center md:bg-bg-secondary md:p-8">
      <div className="relative mx-auto h-dvh w-full md:mx-0 md:h-[868px] md:w-[414px]">
        <HardwareButtons />

        <div
          className={cn(
            "flex h-full flex-col",
            "md:rounded-[3.25rem] md:bg-tt-charcoal md:p-3 md:shadow-soft-3 dark:md:shadow-elevated-dark"
          )}
        >
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-bg-base md:rounded-[2.6rem]">
            <StatusBar dark={statusBarDark} />
            <div className="relative min-h-0 flex-1 overflow-hidden [&>*]:h-full">
              {children}
            </div>
            <HomeIndicator light={homeIndicatorLight} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HardwareButtons() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-[3px] top-[148px] hidden h-8 w-[4px] rounded-l-sm bg-tt-charcoal md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-[3px] top-[196px] hidden h-14 w-[4px] rounded-l-sm bg-tt-charcoal md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-[3px] top-[260px] hidden h-14 w-[4px] rounded-l-sm bg-tt-charcoal md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[3px] top-[210px] hidden h-20 w-[4px] rounded-r-sm bg-tt-charcoal md:block"
        aria-hidden="true"
      />
    </>
  );
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[54px] items-center justify-between px-6",
        dark ? "text-tt-ivory" : "text-text-primary"
      )}
      aria-hidden="true"
    >
      <span className="w-16 text-[15px] font-semibold tabular-nums">9:41</span>
      <div className="absolute left-1/2 top-1/2 h-[22px] w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tt-charcoal" />
      <div className="flex w-16 items-center justify-end gap-1">
        <Signal className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Battery className="h-4 w-4" strokeWidth={2.25} />
      </div>
    </div>
  );
}

function HomeIndicator({ light }: { light: boolean }) {
  return (
    <div className="relative z-20 flex h-4 shrink-0 items-start justify-center pb-1" aria-hidden="true">
      <div
        className={cn(
          "h-[5px] w-[128px] rounded-full",
          light ? "bg-tt-ivory/80" : "bg-text-primary/80"
        )}
      />
    </div>
  );
}
