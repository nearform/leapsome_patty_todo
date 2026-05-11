"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Radio - Gluestack-compatible radio button component
 * 
 * A form control component that allows users to select one option from a set.
 * Supports compound component pattern: RadioGroup > Radio > RadioIndicator, RadioLabel
 * 
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <Radio value="option1">
 *     <RadioIndicator />
 *     <RadioLabel>Option 1</RadioLabel>
 *   </Radio>
 *   <Radio value="option2">
 *     <RadioIndicator />
 *     <RadioLabel>Option 2</RadioLabel>
 *   </Radio>
 * </RadioGroup>
 * ```
 */

const radioVariants = cva(
  "group/radio flex flex-row items-center cursor-pointer data-[disabled=true]:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 border-border-standard bg-bg-elevated transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 data-[checked=true]:border-accent data-[disabled=true]:opacity-40",
  {
    variants: {
      size: {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorDotVariants = cva(
  "rounded-full bg-accent scale-0 transition-transform duration-200 data-[checked=true]:scale-100",
  {
    variants: {
      size: {
        sm: "w-2.5 h-2.5",
        md: "w-3 h-3",
        lg: "w-3.5 h-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioLabelVariants = cva(
  "text-text-body select-none cursor-pointer data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * RadioGroup context
 */
interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  size?: "sm" | "md" | "lg" | null;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

/**
 * Radio context
 */
interface RadioContextValue {
  isChecked: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg" | null;
  value: string;
}

const RadioContext = React.createContext<RadioContextValue>({
  isChecked: false,
  value: "",
});

function useRadioContext() {
  return React.useContext(RadioContext);
}

/**
 * RadioGroup - Container for radio buttons
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Whether the group is disabled */
  isDisabled?: boolean;
  /** Whether the group is invalid */
  isInvalid?: boolean;
  /** Whether the group is read-only */
  isReadOnly?: boolean;
  /** Size of radio buttons */
  size?: "sm" | "md" | "lg";
  /** Accessibility label */
  accessibilityLabel?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      isDisabled,
      isInvalid,
      isReadOnly,
      size = "md",
      accessibilityLabel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (newValue: string) => {
      if (isReadOnly || isDisabled) return;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{ value, onChange: handleChange, isDisabled, isInvalid, isReadOnly, size }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-label={accessibilityLabel}
          aria-invalid={isInvalid}
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

/**
 * Radio - Individual radio button
 */
export interface RadioProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof radioVariants> {
  /** Value of this radio option */
  value: string;
  /** Whether this radio is disabled */
  isDisabled?: boolean;
  /** Whether this radio is invalid */
  isInvalid?: boolean;
  /** Label text (simple usage) */
  label?: React.ReactNode;
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ className, size: propSize, value, isDisabled: propIsDisabled, isInvalid, label, children, ...props }, ref) => {
    const groupContext = useRadioGroupContext();
    
    const size = propSize ?? groupContext?.size ?? "md";
    const isDisabled = propIsDisabled ?? groupContext?.isDisabled;
    const isChecked = groupContext?.value === value;

    const handleClick = () => {
      if (isDisabled || groupContext?.isReadOnly) return;
      groupContext?.onChange(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    // Simple usage with label prop
    if (label && !children) {
      return (
        <RadioContext.Provider value={{ isChecked, isDisabled, size, value }}>
          <div
            ref={ref}
            role="radio"
            aria-checked={isChecked}
            aria-disabled={isDisabled}
            aria-invalid={isInvalid}
            tabIndex={isDisabled ? -1 : 0}
            className={cn(radioVariants({ size }), className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            data-checked={isChecked || undefined}
            data-disabled={isDisabled || undefined}
            {...props}
          >
            <RadioIndicator />
            <RadioLabel>{label}</RadioLabel>
          </div>
        </RadioContext.Provider>
      );
    }

    return (
      <RadioContext.Provider value={{ isChecked, isDisabled, size, value }}>
        <div
          ref={ref}
          role="radio"
          aria-checked={isChecked}
          aria-disabled={isDisabled}
          aria-invalid={isInvalid}
          tabIndex={isDisabled ? -1 : 0}
          className={cn(radioVariants({ size }), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-checked={isChecked || undefined}
          data-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </div>
      </RadioContext.Provider>
    );
  }
);

Radio.displayName = "Radio";

/**
 * RadioIndicator - Visual indicator for radio state
 */
export interface RadioIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioIndicator = React.forwardRef<HTMLDivElement, RadioIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { isChecked, isDisabled, size } = useRadioContext();

    return (
      <div
        ref={ref}
        className={cn(radioIndicatorVariants({ size }), className)}
        data-checked={isChecked || undefined}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        <div
          className={cn(radioIndicatorDotVariants({ size }))}
          data-checked={isChecked || undefined}
        />
      </div>
    );
  }
);

RadioIndicator.displayName = "RadioIndicator";

/**
 * RadioIcon - Icon component for radio (alternative to indicator)
 */
export interface RadioIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const RadioIcon = React.forwardRef<HTMLDivElement, RadioIconProps>(
  ({ className, ...props }, ref) => {
    const { isChecked, size } = useRadioContext();

    if (!isChecked) return null;

    return (
      <div
        ref={ref}
        className={cn(radioIndicatorDotVariants({ size }), "scale-100", className)}
        {...props}
      />
    );
  }
);

RadioIcon.displayName = "RadioIcon";

/**
 * RadioLabel - Label for radio button
 */
export interface RadioLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const RadioLabel = React.forwardRef<HTMLSpanElement, RadioLabelProps>(
  ({ className, ...props }, ref) => {
    const { isChecked, isDisabled, size } = useRadioContext();

    return (
      <span
        ref={ref}
        className={cn(radioLabelVariants({ size }), className)}
        data-checked={isChecked || undefined}
        data-disabled={isDisabled || undefined}
        {...props}
      />
    );
  }
);

RadioLabel.displayName = "RadioLabel";

export {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  radioVariants,
  radioIndicatorVariants,
  radioLabelVariants,
};
