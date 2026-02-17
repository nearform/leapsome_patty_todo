"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Check } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Checkbox - Gluestack-compatible checkbox component
 * 
 * A form control component that allows users to select multiple options from a set.
 * Supports compound component pattern: Checkbox > CheckboxIndicator > CheckboxIcon, CheckboxLabel
 */

const checkboxVariants = cva(
  "group/checkbox flex flex-row items-center justify-start cursor-pointer data-[disabled=true]:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkboxIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded border-2 border-border-standard bg-bg-elevated transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[checked=true]:bg-accent data-[checked=true]:border-accent data-[hover=true]:border-border-subtle data-[hover=true]:data-[checked=true]:bg-accent-hover data-[disabled=true]:opacity-40",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkboxLabelVariants = cva(
  "text-text-body select-none cursor-pointer data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40 data-[checked=true]:text-text-primary",
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

const checkboxIconSizeMap = {
  sm: "xs" as const,
  md: "sm" as const,
  lg: "md" as const,
};

/**
 * Checkbox context for compound components
 */
interface CheckboxContextValue {
  isChecked: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: "sm" | "md" | "lg" | null;
  value?: string;
}

const CheckboxContext = React.createContext<CheckboxContextValue>({
  isChecked: false,
});

function useCheckboxContext() {
  return React.useContext(CheckboxContext);
}

/**
 * CheckboxGroup context for managing multiple checkboxes
 */
interface CheckboxGroupContextValue {
  value: string[];
  onChange: (values: string[]) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);

function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}

/**
 * CheckboxGroup - Container for multiple checkboxes
 */
export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ value: controlledValue, defaultValue = [], onChange, isDisabled, isInvalid, isReadOnly, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (values: string[]) => {
      if (isReadOnly) return;
      if (!isControlled) {
        setInternalValue(values);
      }
      onChange?.(values);
    };

    return (
      <CheckboxGroupContext.Provider value={{ value, onChange: handleChange, isDisabled, isInvalid, isReadOnly }}>
        <div ref={ref} role="group" className={cn("flex flex-col gap-2", className)} {...props} />
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

/**
 * Checkbox - Main checkbox component
 */
export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  value?: string;
  isChecked?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (checked: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  /** Legacy prop for simple usage */
  label?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ 
    className, 
    size = "md", 
    value = "", 
    isChecked: controlledChecked, 
    defaultIsChecked = false,
    onChange,
    isDisabled,
    isInvalid,
    isReadOnly,
    label,
    children,
    ...props 
  }, ref) => {
    const groupContext = useCheckboxGroupContext();
    const [internalChecked, setInternalChecked] = React.useState(defaultIsChecked);
    
    // Determine if controlled by group or directly
    const isInGroup = groupContext !== null;
    const isGroupChecked = isInGroup && groupContext.value.includes(value);
    const isControlled = controlledChecked !== undefined || isInGroup;
    const isChecked = isInGroup ? isGroupChecked : (controlledChecked ?? internalChecked);
    
    const disabled = isDisabled || groupContext?.isDisabled;
    const invalid = isInvalid || groupContext?.isInvalid;
    const readOnly = isReadOnly || groupContext?.isReadOnly;

    const handleClick = () => {
      if (disabled || readOnly) return;

      const newChecked = !isChecked;

      if (isInGroup) {
        const newValues = newChecked
          ? [...groupContext.value, value]
          : groupContext.value.filter((v) => v !== value);
        groupContext.onChange(newValues);
      } else {
        if (!isControlled) {
          setInternalChecked(newChecked);
        }
        onChange?.(newChecked);
      }
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
        <CheckboxContext.Provider value={{ isChecked, isDisabled: disabled, isInvalid: invalid, size, value }}>
          <div
            ref={ref}
            role="checkbox"
            aria-checked={isChecked}
            aria-disabled={disabled}
            aria-invalid={invalid}
            tabIndex={disabled ? -1 : 0}
            className={cn(checkboxVariants({ size }), className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            data-checked={isChecked || undefined}
            data-disabled={disabled || undefined}
            {...props}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={Check} />
            </CheckboxIndicator>
            <CheckboxLabel>{label}</CheckboxLabel>
          </div>
        </CheckboxContext.Provider>
      );
    }

    return (
      <CheckboxContext.Provider value={{ isChecked, isDisabled: disabled, isInvalid: invalid, size, value }}>
        <div
          ref={ref}
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-invalid={invalid}
          tabIndex={disabled ? -1 : 0}
          className={cn(checkboxVariants({ size }), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-checked={isChecked || undefined}
          data-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  }
);

Checkbox.displayName = "Checkbox";

/**
 * CheckboxIndicator - Visual indicator for checkbox state
 */
export interface CheckboxIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const CheckboxIndicator = React.forwardRef<HTMLDivElement, CheckboxIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    const { isChecked, isDisabled, size } = useCheckboxContext();

    return (
      <div
        ref={ref}
        className={cn(checkboxIndicatorVariants({ size }), className)}
        data-checked={isChecked || undefined}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        {isChecked && children}
      </div>
    );
  }
);

CheckboxIndicator.displayName = "CheckboxIndicator";

/**
 * CheckboxIcon - Icon displayed when checkbox is checked
 */
export interface CheckboxIconProps {
  as?: LucideIcon;
  className?: string;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ as: IconComponent = Check, className }) => {
  const { size } = useCheckboxContext();
  const iconSize = checkboxIconSizeMap[size || "md"];

  return <Icon as={IconComponent} size={iconSize} className={cn("text-white", className)} />;
};

CheckboxIcon.displayName = "CheckboxIcon";

/**
 * CheckboxLabel - Label for checkbox
 */
export interface CheckboxLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CheckboxLabel = React.forwardRef<HTMLSpanElement, CheckboxLabelProps>(
  ({ className, ...props }, ref) => {
    const { isChecked, isDisabled, size } = useCheckboxContext();

    return (
      <span
        ref={ref}
        className={cn(checkboxLabelVariants({ size }), className)}
        data-checked={isChecked || undefined}
        data-disabled={isDisabled || undefined}
        {...props}
      />
    );
  }
);

CheckboxLabel.displayName = "CheckboxLabel";

export { 
  Checkbox, 
  CheckboxGroup,
  CheckboxIndicator, 
  CheckboxIcon, 
  CheckboxLabel,
  checkboxVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
};
