"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/gluestack/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Input container variants - Gluestack-compatible input wrapper
 */
const inputContainerVariants = cva(
  "flex w-full rounded-md border bg-bg-elevated items-center overflow-hidden transition-colors data-[focus=true]:border-accent data-[focus=true]:ring-1 data-[focus=true]:ring-accent data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
  {
    variants: {
      variant: {
        outline: "border-border-standard",
        underlined: "rounded-none border-0 border-b",
        rounded: "border-border-standard rounded-full",
      },
      size: {
        sm: "h-9",
        md: "h-10",
        lg: "h-11",
        xl: "h-12",
      },
      isInvalid: {
        true: "border-error data-[focus=true]:border-error data-[focus=true]:ring-error",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

/**
 * InputField variants - The actual input element
 */
const inputFieldVariants = cva(
  "flex-1 h-full bg-transparent text-text-body placeholder:text-text-tertiary focus:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        outline: "px-3",
        underlined: "px-0",
        rounded: "px-4",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

/**
 * Input context for compound components
 */
interface InputContextValue {
  variant?: "outline" | "underlined" | "rounded" | null;
  size?: "sm" | "md" | "lg" | "xl" | null;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
}

const InputContext = React.createContext<InputContextValue>({});

function useInputContext() {
  return React.useContext(InputContext);
}

/**
 * Input - Gluestack-compatible input container
 * 
 * A flexible input component with validation and styling options.
 * Uses compound component pattern: Input > InputField, InputSlot, InputIcon
 * 
 * @example
 * ```tsx
 * // Simple input
 * <Input>
 *   <InputField placeholder="Enter text..." />
 * </Input>
 * 
 * // With icon
 * <Input>
 *   <InputSlot className="pl-3">
 *     <InputIcon as={SearchIcon} />
 *   </InputSlot>
 *   <InputField placeholder="Search..." />
 * </Input>
 * ```
 */
export interface InputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof inputContainerVariants> {
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, variant, size, isInvalid, isDisabled, isReadOnly, children, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <InputContext.Provider
        value={{ variant, size, isInvalid, isDisabled, isReadOnly, isFocused, setIsFocused }}
      >
        <div
          ref={ref}
          className={cn(inputContainerVariants({ variant, size, isInvalid }), className)}
          data-focus={isFocused || undefined}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          {...props}
        >
          {children}
        </div>
      </InputContext.Provider>
    );
  }
);

Input.displayName = "Input";

/**
 * InputField - The actual text input element
 */
export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", onFocus, onBlur, ...props }, ref) => {
    const { variant, size, isDisabled, isReadOnly, setIsFocused } = useInputContext();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused?.(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused?.(false);
      onBlur?.(e);
    };

    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputFieldVariants({ variant, size }), className)}
        disabled={isDisabled}
        readOnly={isReadOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

InputField.displayName = "InputField";

/**
 * InputSlot - Container for icons or buttons within input
 */
export interface InputSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  onPress?: () => void;
}

const InputSlot = React.forwardRef<HTMLDivElement, InputSlotProps>(
  ({ className, onPress, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onPress?.();
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          onPress && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

InputSlot.displayName = "InputSlot";

/**
 * InputIcon - Icon component for use within InputSlot
 */
export interface InputIconProps {
  as: LucideIcon;
  className?: string;
}

const InputIcon: React.FC<InputIconProps> = ({ as: IconComponent, className }) => {
  const { size } = useInputContext();
  
  const iconSizeMap = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
    xl: "xl" as const,
  };

  return (
    <Icon
      as={IconComponent}
      size={iconSizeMap[size || "md"]}
      className={cn("text-text-tertiary", className)}
    />
  );
};

InputIcon.displayName = "InputIcon";

// Legacy single-component Input for backward compatibility
export interface LegacyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputContainerVariants> {
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const inputVariants = cva(
  "flex w-full rounded-md border bg-bg-elevated px-3 py-2 text-md text-text-body ring-offset-bg-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:text-text-disabled disabled:border-border-subtle transition-colors",
  {
    variants: {
      variant: {
        outline: "border-border-standard",
        underlined: "rounded-none border-0 border-b border-border-standard",
        rounded: "border-border-standard rounded-full",
      },
      size: {
        sm: "h-9 text-sm px-2",
        md: "h-10 text-base px-3",
        lg: "h-11 text-lg px-4",
        xl: "h-12 text-xl px-5",
      },
      isInvalid: {
        true: "border-error focus-visible:ring-error",
      },
      isReadOnly: {
        true: "cursor-default bg-bg-secondary text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export { Input, InputField, InputSlot, InputIcon, inputVariants, inputContainerVariants, inputFieldVariants };
