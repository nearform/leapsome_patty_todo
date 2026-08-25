"use client";

import { cn } from "@/lib/utils";

/**
 * TripTogether monogram: serif TT inside a thin circle.
 * Uses currentColor so it reads on ivory and inverse surfaces.
 *
 * @example
 * ```tsx
 * <TripTogetherMark />
 * <TripTogetherWordmark />
 * ```
 */
export function TripTogetherMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-current text-text-primary",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="font-display text-[15px] font-semibold leading-none tracking-tight">
        TT
      </span>
    </span>
  );
}

export function TripTogetherWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.22em] text-text-primary",
        className
      )}
    >
      TripTogether
    </span>
  );
}
