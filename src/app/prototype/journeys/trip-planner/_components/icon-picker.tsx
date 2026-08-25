"use client";

import { Icon } from "@/components/prototype-ui";
import { TODO_ICON_COMPONENTS, TODO_ICON_OPTIONS } from "@/lib/data/trip-planner-icons";
import type { TodoIconKey } from "@/lib/types/trip-planner";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: TodoIconKey;
  onChange: (icon: TodoIconKey) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div role="radiogroup" aria-label="Item icon" className="grid grid-cols-6 gap-2">
      {TODO_ICON_OPTIONS.map((key) => {
        const isSelected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={key.replace("-", " ")}
            onClick={() => onChange(key)}
            className={cn(
              "h-11 min-h-11 flex items-center justify-center border transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
              isSelected
                ? "border-accent bg-bg-secondary text-accent"
                : "border-border-decorative text-text-secondary"
            )}
          >
            <Icon as={TODO_ICON_COMPONENTS[key]} size="md" />
          </button>
        );
      })}
    </div>
  );
}
