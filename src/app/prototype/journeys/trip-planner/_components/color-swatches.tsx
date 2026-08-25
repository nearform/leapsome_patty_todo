"use client";

import { HStack, Text } from "@/components/prototype-ui";
import { COLOR_PRESETS } from "@/lib/data/trip-planner-colors";
import type { ColorToken } from "@/lib/types/trip-planner";
import { cn } from "@/lib/utils";

interface ColorSwatchesProps {
  value: ColorToken;
  onChange: (token: ColorToken) => void;
  label: string;
  shape?: "circle" | "square";
  showLabel?: boolean;
}

export function ColorSwatches({
  value,
  onChange,
  label,
  shape = "circle",
  showLabel = true,
}: ColorSwatchesProps) {
  return (
    <HStack space="sm" className="flex-wrap" role="radiogroup" aria-label={label}>
      {COLOR_PRESETS.map((preset) => {
        const isSelected = value === preset.token;
        return (
          <button
            key={preset.token}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={preset.label}
            onClick={() => onChange(preset.token)}
            className={cn(
              "h-8 w-8 min-h-8 min-w-8 border-2 transition-colors",
              shape === "square" ? "rounded-md" : "rounded-full",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base",
              preset.bgClass,
              isSelected ? "border-text-primary" : "border-transparent"
            )}
          />
        );
      })}
      {showLabel ? (
        <Text size="sm" className="text-text-secondary self-center">
          {COLOR_PRESETS.find((preset) => preset.token === value)?.label}
        </Text>
      ) : null}
    </HStack>
  );
}
