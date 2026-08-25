"use client";

import type { ReactNode } from "react";
import { Heading, Text } from "@/components/prototype-ui";
import { cn } from "@/lib/utils";

/**
 * In-content back link + display title used across trip-planner screens.
 */
export function ScreenChrome({
  backLabel,
  onBack,
  title,
  subtitle,
  trailing,
  className,
}: {
  backLabel: string;
  onBack: () => void;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 text-sm font-medium text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        ← {backLabel}
      </button>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Heading as="h1" size="2xl">
            {title}
          </Heading>
          {subtitle ? (
            <Text size="sm" className="mt-1.5 text-text-secondary">
              {subtitle}
            </Text>
          ) : null}
        </div>
        {trailing}
      </div>
    </div>
  );
}
