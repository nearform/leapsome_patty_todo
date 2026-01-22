"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Switch - Gluestack-compatible toggle switch component
 * 
 * A form control component that toggles between on/off states.
 * Inherits all properties of React Native's Switch component.
 * 
 * @example
 * ```tsx
 * // Basic switch
 * <Switch />
 * 
 * // With label
 * <Switch label="Enable notifications" />
 * 
 * // Controlled
 * <Switch value={isEnabled} onValueChange={setIsEnabled} />
 * 
 * // With custom track colors
 * <Switch trackColor={{ true: 'bg-green-500', false: 'bg-gray-300' }} />
 * ```
 */

const switchTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      checked: {
        true: "bg-accent",
        false: "bg-bg-tertiary",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      checked: {
        true: "",
        false: "translate-x-0",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        checked: true,
        className: "translate-x-4",
      },
      {
        size: "md",
        checked: true,
        className: "translate-x-5",
      },
      {
        size: "lg",
        checked: true,
        className: "translate-x-7",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "defaultValue">,
    VariantProps<typeof switchTrackVariants> {
  /** Controlled checked state (gluestack naming) */
  value?: boolean;
  /** Uncontrolled default checked state (gluestack naming) */
  defaultValue?: boolean;
  /** Callback when switch state changes (gluestack naming) */
  onValueChange?: (value: boolean) => void;
  /** Whether the switch is disabled */
  isDisabled?: boolean;
  /** Whether the switch is invalid */
  isInvalid?: boolean;
  /** Whether the switch is required */
  isRequired?: boolean;
  /** Whether the switch is hovered */
  isHovered?: boolean;
  /** Track color when on/off */
  trackColor?: {
    true: string;
    false: string;
  };
  /** Thumb color */
  thumbColor?: string;
  /** iOS background color */
  ios_backgroundColor?: string;
  /** Label text */
  label?: React.ReactNode;
  
  // Legacy props for backward compatibility
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      // Gluestack props
      value,
      defaultValue,
      onValueChange,
      isDisabled,
      isInvalid,
      isRequired,
      isHovered,
      trackColor,
      thumbColor,
      // Legacy props
      checked: legacyChecked,
      defaultChecked: legacyDefaultChecked,
      onCheckedChange,
      disabled,
      label,
      id,
      ...props
    },
    ref
  ) => {
    // Support both gluestack and legacy props
    const controlledValue = value ?? legacyChecked;
    const uncontrolledDefault = defaultValue ?? legacyDefaultChecked ?? false;
    const handleChange = onValueChange ?? onCheckedChange;
    const isButtonDisabled = isDisabled ?? disabled;

    const [internalChecked, setInternalChecked] = React.useState(uncontrolledDefault);
    const isControlled = controlledValue !== undefined;
    const isChecked = isControlled ? controlledValue : internalChecked;

    const switchId = id || `switch-${React.useId()}`;

    const handleClick = () => {
      if (isButtonDisabled) return;

      const newChecked = !isChecked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      handleChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    // Determine track background
    const getTrackClassName = () => {
      if (trackColor) {
        return isChecked ? trackColor.true : trackColor.false;
      }
      return switchTrackVariants({ size, checked: isChecked });
    };

    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          aria-required={isRequired}
          aria-invalid={isInvalid}
          id={switchId}
          ref={ref}
          disabled={isButtonDisabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-checked={isChecked || undefined}
          data-disabled={isButtonDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-hover={isHovered || undefined}
          className={cn(
            trackColor 
              ? cn(
                  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40",
                  size === "sm" && "h-5 w-9",
                  size === "md" && "h-6 w-11",
                  size === "lg" && "h-7 w-14",
                  isChecked ? trackColor.true : trackColor.false
                )
              : switchTrackVariants({ size, checked: isChecked }),
            isInvalid && "border-error",
            className
          )}
          {...props}
        >
          <span
            aria-hidden="true"
            className={cn(
              switchThumbVariants({ size, checked: isChecked }),
              thumbColor
            )}
          />
        </button>
        {label && (
          <label
            id={`${switchId}-label`}
            htmlFor={switchId}
            className={cn(
              "text-text-body select-none cursor-pointer",
              isButtonDisabled && "cursor-not-allowed opacity-40"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants };
