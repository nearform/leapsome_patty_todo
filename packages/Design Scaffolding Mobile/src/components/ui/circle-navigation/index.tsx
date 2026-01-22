"use client";

import React, { useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSwipe } from "@/lib/hooks/useSwipe";
import { Text } from "../text";

const circleNavigationVariants = cva(
  "flex gap-1.5 overflow-x-auto scrollbar-hide",
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface CircleNavigationItem {
  id: string;
  label: string;
  image?: string; // For future image support
  onClick?: () => void;
  isLive?: boolean; // Show LIVE badge
}

export interface CircleNavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circleNavigationVariants> {
  items: CircleNavigationItem[];
}

const CircleNavigation = React.forwardRef<HTMLDivElement, CircleNavigationProps>(
  ({ className, items, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSwipeLeft = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, []);

    const handleSwipeRight = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    }, []);

    // Attach swipe handlers to the container
    const swipeRefCallback = useSwipe(
      {
        onSwipeLeft: handleSwipeLeft,
        onSwipeRight: handleSwipeRight,
      },
      { threshold: 50, preventScroll: false }
    );

    // Combine refs using a callback
    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        // Set the swipe ref (useSwipe hook will attach listeners)
        swipeRefCallback(node);
        // Handle forwarded ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, swipeRefCallback]
    );

    return (
      <div
        ref={combinedRef}
        className={cn(circleNavigationVariants(), className)}
        {...props}
      >
        {items.map((item) => (
          <CircleNavigationItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
);

CircleNavigation.displayName = "CircleNavigation";

interface CircleNavigationItemProps {
  item: CircleNavigationItem;
}

const CircleNavigationItem = React.forwardRef<
  HTMLDivElement,
  CircleNavigationItemProps
>(({ item }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer p-1"
      onClick={item.onClick}
    >
      {/* Circle container with pulse ring - overflow-visible allows pulse to expand */}
      <div className="relative overflow-visible">
        {/* Pulse ring for live items - positioned behind the circle */}
        {item.isLive && (
          <div
            className="absolute inset-0 rounded-full border-2 border-accent animate-pulse-ring"
            aria-hidden="true"
          />
        )}
        {/* Circle with double border */}
        <div
          className={cn(
            "relative h-16 w-16 rounded-full",
            "border-2 border-accent",
            "flex items-center justify-center"
          )}
          role="button"
          tabIndex={0}
          aria-label={item.label}
        >
          {/* Inner circle with white border (elevated in dark mode) */}
          <div
            className={cn(
              "h-full w-full rounded-full",
              "border-2 border-white dark:border-bg-elevated",
              "overflow-hidden",
              "bg-neutral-400"
            )}
          >
            {/* Image or content will go here */}
            {item.image && (
              <img
                src={item.image}
                alt={item.label}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {/* LIVE Badge */}
          {item.isLive && <CircleNavigationLiveBadge />}
        </div>
      </div>
      {/* Label */}
      <Text
        size="xs"
        className="text-center whitespace-nowrap"
        weight="medium"
      >
        {item.label}
      </Text>
    </div>
  );
});

// LIVE Badge Component (similar to AvatarFlagBadge)
export interface CircleNavigationLiveBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CircleNavigationLiveBadge = React.forwardRef<
  HTMLDivElement,
  CircleNavigationLiveBadgeProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-0 left-0",
        "h-4 px-1.5 rounded-full",
        "bg-accent text-white",
        "flex items-center justify-center",
        "text-2xs font-semibold leading-none",
        "translate-y-1",
        className
      )}
      {...props}
    >
      LIVE
    </div>
  );
});

CircleNavigationLiveBadge.displayName = "CircleNavigationLiveBadge";

CircleNavigationItem.displayName = "CircleNavigationItem";

export {
  CircleNavigation,
  CircleNavigationLiveBadge,
  circleNavigationVariants,
};
