"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * ScrollView - Gluestack-compatible scroll container
 *
 * Thin wrapper over a div with overflow utilities. Useful for mobile
 * prototypes to make scrollable regions explicit.
 */

export interface ScrollViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll horizontally instead of vertically */
  horizontal?: boolean;
  /** Show scrollbars (by default we rely on browser defaults) */
  showsScrollIndicator?: boolean;
}

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>(
  ({ className, horizontal = false, showsScrollIndicator = true, ...props }, ref) => {
    const base = horizontal
      ? "overflow-x-auto overflow-y-hidden"
      : "overflow-y-auto overflow-x-hidden";

    // For now we simply use native scrollbars; if designers want to
    // hide them entirely, they can control it via className.
    const indicatorClass = showsScrollIndicator ? "" : "scrollbar-none";

    return (
      <div
        ref={ref}
        className={cn(base, indicatorClass, className)}
        {...props}
      />
    );
  }
);

ScrollView.displayName = "ScrollView";

