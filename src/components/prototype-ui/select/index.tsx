"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, ChevronDown } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Select - Gluestack-compatible select component
 * 
 * A form control component for selecting from a list of options.
 * Supports compound component pattern: Select > SelectTrigger > SelectInput, SelectIcon
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Select placeholder="Choose an option">
 *   <SelectItem value="1" label="Option 1" />
 *   <SelectItem value="2" label="Option 2" />
 * </Select>
 * 
 * // Compound component pattern
 * <Select>
 *   <SelectTrigger>
 *     <SelectInput placeholder="Select option..." />
 *     <SelectIcon as={ChevronDownIcon} />
 *   </SelectTrigger>
 *   <SelectPortal>
 *     <SelectBackdrop />
 *     <SelectContent>
 *       <SelectItem label="Option 1" value="1" />
 *     </SelectContent>
 *   </SelectPortal>
 * </Select>
 * ```
 */

const selectVariants = cva(
  "flex w-full rounded-sm border bg-bg-elevated px-3 py-2 text-base text-text-body ring-offset-bg-base appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-bg-secondary data-[disabled=true]:text-text-disabled data-[disabled=true]:border-border-subtle transition-colors",
  {
    variants: {
      variant: {
        outline: "border-border-standard",
        rounded: "border-border-standard rounded-full",
        underlined: "rounded-none border-0 border-b border-border-standard px-0",
      },
      size: {
        sm: "h-9 text-sm px-2 pr-8",
        md: "h-10 text-base px-3 pr-10",
        lg: "h-11 text-lg px-4 pr-12",
        xl: "h-12 text-xl px-5 pr-14",
      },
      isInvalid: {
        true: "border-error focus-visible:ring-error",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

const selectIconSizeMap = {
  sm: { size: "sm" as const, position: "right-2" },
  md: { size: "md" as const, position: "right-3" },
  lg: { size: "md" as const, position: "right-4" },
  xl: { size: "lg" as const, position: "right-5" },
};

/**
 * Select context for compound components
 */
interface SelectContextValue {
  size?: "sm" | "md" | "lg" | "xl" | null;
  variant?: "outline" | "rounded" | "underlined" | null;
  isDisabled?: boolean;
  isInvalid?: boolean;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

function useSelectContext() {
  return React.useContext(SelectContext);
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  /** Whether the select is invalid */
  isInvalid?: boolean;
  /** Whether the select is required */
  isRequired?: boolean;
  /** Whether the select is disabled */
  isDisabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Selected value (controlled) */
  selectedValue?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size = "md",
      isInvalid,
      isRequired,
      isDisabled,
      placeholder,
      selectedValue,
      defaultValue,
      onValueChange,
      onChange,
      children,
      value,
      ...props
    },
    ref
  ) => {
    const iconConfig = selectIconSizeMap[size || "md"];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <SelectContext.Provider value={{ size, variant, isDisabled, isInvalid, selectedValue, onValueChange }}>
        <div className="relative w-full">
          <select
            className={cn(selectVariants({ variant, size, isInvalid }), className)}
            ref={ref}
            required={isRequired}
            disabled={isDisabled}
            aria-invalid={isInvalid}
            aria-required={isRequired}
            data-disabled={isDisabled || undefined}
            data-invalid={isInvalid || undefined}
            value={selectedValue ?? value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <Icon
            as={ChevronDown}
            size={iconConfig.size}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary",
              iconConfig.position
            )}
          />
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";

/**
 * SelectTrigger - Trigger container for compound pattern
 */
export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "outline" | "rounded" | "underlined";
  size?: "sm" | "md" | "lg" | "xl";
}

const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const context = useSelectContext();
    const actualSize = size ?? context.size ?? "md";
    const actualVariant = variant ?? context.variant ?? "outline";

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-between",
          selectVariants({ variant: actualVariant, size: actualSize, isInvalid: context.isInvalid }),
          context.isDisabled && "cursor-not-allowed opacity-40",
          className
        )}
        data-disabled={context.isDisabled || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

/**
 * SelectInput - Input display for compound pattern
 */
export interface SelectInputProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

const SelectInput = React.forwardRef<HTMLSpanElement, SelectInputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { selectedValue } = useSelectContext();

    return (
      <span
        ref={ref}
        className={cn(
          "flex-1 truncate text-left",
          !selectedValue && "text-text-tertiary",
          className
        )}
        {...props}
      >
        {selectedValue || placeholder}
      </span>
    );
  }
);

SelectInput.displayName = "SelectInput";

/**
 * SelectIcon - Icon for select trigger
 */
export interface SelectIconProps {
  as?: LucideIcon;
  className?: string;
}

const SelectIcon: React.FC<SelectIconProps> = ({ as: IconComponent = ChevronDown, className }) => {
  const { size } = useSelectContext();
  const iconConfig = selectIconSizeMap[size || "md"];

  return (
    <Icon
      as={IconComponent}
      size={iconConfig.size}
      className={cn("text-text-tertiary", className)}
    />
  );
};

SelectIcon.displayName = "SelectIcon";

/**
 * SelectItem - Option item (replaces SelectOption)
 */
export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  label: string;
  isDisabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, label, value, isDisabled, disabled, children, ...props }, ref) => {
    return (
      <option 
        ref={ref} 
        className={cn("bg-bg-elevated text-text-body", className)} 
        value={value}
        disabled={isDisabled ?? disabled}
        {...props}
      >
        {children ?? label}
      </option>
    );
  }
);

SelectItem.displayName = "SelectItem";

// Legacy SelectOption for backward compatibility
export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <option ref={ref} className={cn("bg-bg-elevated text-text-body", className)} {...props}>
        {children}
      </option>
    );
  }
);

SelectOption.displayName = "SelectOption";

/**
 * SelectPortal - Portal wrapper for dropdown (for future modal/dropdown support)
 */
const SelectPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

SelectPortal.displayName = "SelectPortal";

/**
 * SelectBackdrop - Backdrop for dropdown (for future modal/dropdown support)
 */
const SelectBackdrop: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn("fixed inset-0 bg-black/50", className)}
      {...props}
    />
  );
};

SelectBackdrop.displayName = "SelectBackdrop";

/**
 * SelectContent - Content container for dropdown items
 */
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-bg-elevated border border-border-standard rounded-sm shadow-lg z-50 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

export { 
  Select, 
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectItem,
  SelectOption, // Legacy
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  selectVariants,
};
