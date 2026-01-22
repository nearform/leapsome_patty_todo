"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Progress - Gluestack-compatible progress component
 * 
 * Displays progress as a linear indicator or stepped segments.
 * Supports compound component pattern: Progress > ProgressFilledTrack
 * 
 * @example
 * ```tsx
 * // Percentage-based progress
 * <Progress value={60} size="md">
 *   <ProgressFilledTrack />
 * </Progress>
 * 
 * // Stepped progress (legacy)
 * <Progress totalSteps={4} currentStep={2} size="md" />
 * ```
 */

const progressVariants = cva("w-full rounded-full overflow-hidden bg-bg-tertiary", {
  variants: {
    size: {
      xs: "h-1",
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
      xl: "h-4",
      "2xl": "h-5",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full w-2 flex-col",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

const progressFilledTrackVariants = cva(
  "h-full rounded-full transition-all duration-300 ease-out",
  {
    variants: {
      colorScheme: {
        primary: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
      },
    },
    defaultVariants: {
      colorScheme: "primary",
    },
  }
);

// Legacy stepped progress variants
const progressSteppedVariants = cva("flex items-center", {
  variants: {
    size: {
      xs: "h-1 gap-0.5",
      sm: "h-1 gap-1",
      md: "h-1.5 gap-1.5",
      lg: "h-2 gap-2",
      xl: "h-3 gap-2",
      "2xl": "h-4 gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const progressSegmentVariants = cva(
  "flex-1 rounded-full transition-colors duration-200",
  {
    variants: {
      isActive: {
        true: "bg-accent",
        false: "bg-bg-tertiary",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

/**
 * Progress context for compound components
 */
interface ProgressContextValue {
  value: number;
  min: number;
  max: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | null;
  orientation?: "horizontal" | "vertical" | null;
}

const ProgressContext = React.createContext<ProgressContextValue>({
  value: 0,
  min: 0,
  max: 100,
});

function useProgressContext() {
  return React.useContext(ProgressContext);
}

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value">,
    VariantProps<typeof progressVariants> {
  /** Current progress value (0-100 or within min-max range) */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  
  // Legacy stepped progress props
  /** Total number of steps in the progress indicator */
  totalSteps?: number;
  /** Current step (1-indexed) */
  currentStep?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    size, 
    orientation = "horizontal",
    value = 0, 
    min = 0, 
    max = 100,
    totalSteps, 
    currentStep,
    children,
    ...props 
  }, ref) => {
    // If using stepped progress (legacy)
    if (totalSteps !== undefined && currentStep !== undefined) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Step ${currentStep} of ${totalSteps}`}
          className={cn(progressSteppedVariants({ size }), className)}
          {...props}
        >
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={cn(
                progressSegmentVariants({ isActive: index < currentStep }),
                "h-full"
              )}
            />
          ))}
        </div>
      );
    }

    // Calculate percentage for linear progress
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

    return (
      <ProgressContext.Provider value={{ value, min, max, size, orientation }}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={`${Math.round(percentage)}%`}
          className={cn(progressVariants({ size, orientation }), className)}
          data-value={value}
          data-min={min}
          data-max={max}
          {...props}
        >
          {children || (
            <div
              className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </ProgressContext.Provider>
    );
  }
);

Progress.displayName = "Progress";

/**
 * ProgressFilledTrack - Gluestack compound component for the filled portion
 */
export interface ProgressFilledTrackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressFilledTrackVariants> {}

const ProgressFilledTrack = React.forwardRef<HTMLDivElement, ProgressFilledTrackProps>(
  ({ className, colorScheme, style, ...props }, ref) => {
    const { value, min, max } = useProgressContext();
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn(progressFilledTrackVariants({ colorScheme }), className)}
        style={{ width: `${percentage}%`, ...style }}
        {...props}
      />
    );
  }
);

ProgressFilledTrack.displayName = "ProgressFilledTrack";

export { 
  Progress, 
  ProgressFilledTrack,
  progressVariants, 
  progressFilledTrackVariants,
  progressSegmentVariants,
  progressSteppedVariants,
};
