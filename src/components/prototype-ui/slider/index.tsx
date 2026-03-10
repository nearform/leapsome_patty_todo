"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Slider - Gluestack-compatible range slider
 *
 * Compound component: Slider > SliderTrack > SliderFilledTrack + SliderThumb
 * Supports controlled/uncontrolled usage, keyboard, and pointer input.
 *
 * @example
 * ```tsx
 * <Slider value={50} onChange={setValue} min={0} max={100}>
 *   <SliderTrack>
 *     <SliderFilledTrack />
 *   </SliderTrack>
 *   <SliderThumb />
 * </Slider>
 * ```
 */

const sliderTrackVariants = cva(
  "relative w-full rounded-full bg-bg-tertiary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderThumbVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2 rounded-full",
    "bg-accent border-2 border-white shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "transition-shadow",
  ],
  {
    variants: {
      size: {
        sm: "w-3.5 h-3.5 -ml-[7px]",
        md: "w-5 h-5 -ml-2.5",
        lg: "w-6 h-6 -ml-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---- Context ----

interface SliderContextValue {
  value: number;
  min: number;
  max: number;
  step: number;
  percentage: number;
  size: "sm" | "md" | "lg";
  isDisabled?: boolean;
  onChange: (value: number) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

function useSliderContext() {
  const ctx = React.useContext(SliderContext);
  if (!ctx) throw new Error("Slider sub-components must be used within a Slider");
  return ctx;
}

// ---- Components ----

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  onChange?: (value: number) => void;
}

export const Slider = ({
  children,
  className,
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  isDisabled,
  onChange,
  ...props
}: SliderProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const isDragging = React.useRef(false);

  const clamp = React.useCallback(
    (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step)),
    [min, max, step]
  );

  const handleChange = React.useCallback(
    (v: number) => {
      const clamped = clamp(v);
      if (controlledValue === undefined) setInternalValue(clamped);
      onChange?.(clamped);
    },
    [controlledValue, onChange, clamp]
  );

  const updateFromPointer = React.useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      handleChange(min + pct * (max - min));
    },
    [handleChange, min, max]
  );

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      e.preventDefault();
      isDragging.current = true;

      updateFromPointer(e.clientX);

      const handleMove = (ev: PointerEvent) => {
        if (isDragging.current) updateFromPointer(ev.clientX);
      };
      const handleUp = () => {
        isDragging.current = false;
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [isDisabled, updateFromPointer]
  );

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContext.Provider
      value={{ value, min, max, step, percentage, size, isDisabled, onChange: handleChange, trackRef }}
    >
      <div
        className={cn(
          "relative w-full py-2 touch-none select-none",
          isDisabled ? "opacity-40 pointer-events-none" : "cursor-pointer",
          className
        )}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={isDisabled}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
};

export interface SliderTrackProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SliderTrack = ({ children, className, ...props }: SliderTrackProps) => {
  const { size, trackRef } = useSliderContext();

  return (
    <div
      ref={trackRef}
      className={cn(sliderTrackVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SliderFilledTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: "accent" | "success" | "warning" | "error";
}

export const SliderFilledTrack = ({
  className,
  colorScheme = "accent",
  ...props
}: SliderFilledTrackProps) => {
  const { percentage } = useSliderContext();

  const colorMap: Record<string, string> = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <div
      className={cn("absolute left-0 top-0 bottom-0 rounded-full", colorMap[colorScheme], className)}
      style={{ width: `${percentage}%` }}
      {...props}
    />
  );
};

export interface SliderThumbProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SliderThumb = ({ className, ...props }: SliderThumbProps) => {
  const { percentage, size, onChange, value, min, max, step } = useSliderContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, value + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(min, value - step));
    }
  };

  return (
    <div
      className={cn(sliderThumbVariants({ size }), className)}
      style={{ left: `${percentage}%` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export { sliderTrackVariants, sliderThumbVariants };
