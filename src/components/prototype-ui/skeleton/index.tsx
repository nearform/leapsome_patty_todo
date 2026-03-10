"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Skeleton - Gluestack-compatible loading placeholder component
 * 
 * Displays animated placeholders while content is loading.
 * Supports various shapes and sizes.
 * 
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton variant="rounded" className="w-full h-4" />
 * 
 * // Circle skeleton (avatar)
 * <Skeleton variant="circular" className="w-10 h-10" />
 * 
 * // Text skeleton
 * <SkeletonText numberOfLines={3} />
 * ```
 */

const skeletonVariants = cva(
  "animate-pulse bg-bg-tertiary",
  {
    variants: {
      variant: {
        sharp: "rounded-none",
        rounded: "rounded-sm",
        circular: "rounded-full",
      },
      speed: {
        slow: "animate-[pulse_3s_ease-in-out_infinite]",
        normal: "animate-pulse",
        fast: "animate-[pulse_1s_ease-in-out_infinite]",
      },
      isLoaded: {
        true: "animate-none bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      variant: "rounded",
      speed: "normal",
      isLoaded: false,
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Start color (for gradient) */
  startColor?: string;
  /** End color (for gradient) */
  endColor?: string;
  /** Whether content has loaded */
  isLoaded?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      speed,
      isLoaded,
      startColor,
      endColor,
      accessibilityLabel = "Loading...",
      style,
      children,
      ...props
    },
    ref
  ) => {
    // If loaded, render children directly
    if (isLoaded) {
      return <>{children}</>;
    }

    const customStyle = startColor || endColor
      ? {
          ...style,
          background: `linear-gradient(90deg, ${startColor || "var(--background-tertiary)"} 0%, ${endColor || "var(--background-secondary)"} 50%, ${startColor || "var(--background-tertiary)"} 100%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }
      : style;

    return (
      <div
        ref={ref}
        role="status"
        aria-label={accessibilityLabel}
        className={cn(skeletonVariants({ variant, speed, isLoaded }), className)}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Skeleton for text content
 */
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of text lines to show */
  numberOfLines?: number;
  /** Gap between lines */
  gap?: number;
  /** Whether content has loaded */
  isLoaded?: boolean;
  /** Speed of animation */
  speed?: "slow" | "normal" | "fast";
  /** Start color */
  startColor?: string;
  /** End color */
  endColor?: string;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      className,
      numberOfLines = 3,
      gap = 2,
      isLoaded,
      speed,
      startColor,
      endColor,
      children,
      ...props
    },
    ref
  ) => {
    // If loaded, render children directly
    if (isLoaded) {
      return <>{children}</>;
    }

    const gapClass = {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
    }[gap] || "gap-2";

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", gapClass, className)}
        {...props}
      >
        {Array.from({ length: numberOfLines }, (_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            speed={speed}
            startColor={startColor}
            endColor={endColor}
            className={cn(
              "h-4",
              // Make last line shorter for more natural appearance
              index === numberOfLines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

// Add shimmer keyframes to global styles if using custom colors
const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

export { Skeleton, SkeletonText, skeletonVariants, shimmerKeyframes };
