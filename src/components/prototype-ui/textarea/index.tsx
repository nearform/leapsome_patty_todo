"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Textarea - Gluestack-compatible multi-line text input component
 * 
 * A form control component for multi-line text input.
 * Supports compound component pattern: Textarea > TextareaInput
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Textarea>
 *   <TextareaInput placeholder="Enter your message..." />
 * </Textarea>
 * 
 * // With validation
 * <Textarea isInvalid>
 *   <TextareaInput placeholder="Enter description" />
 * </Textarea>
 * ```
 */

const textareaContainerVariants = cva(
  "flex w-full rounded-sm border bg-bg-elevated overflow-hidden transition-colors data-[focus=true]:border-accent data-[focus=true]:ring-1 data-[focus=true]:ring-accent data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
  {
    variants: {
      variant: {
        outline: "border-border-standard",
        underlined: "rounded-none border-0 border-b",
        rounded: "border-border-standard rounded-2xl",
      },
      size: {
        sm: "min-h-[80px]",
        md: "min-h-[100px]",
        lg: "min-h-[120px]",
        xl: "min-h-[160px]",
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

const textareaInputVariants = cva(
  "flex-1 w-full h-full bg-transparent text-text-body placeholder:text-text-tertiary focus:outline-none disabled:cursor-not-allowed resize-y",
  {
    variants: {
      variant: {
        outline: "p-3",
        underlined: "px-0 py-3",
        rounded: "p-4",
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
 * Textarea context for compound components
 */
interface TextareaContextValue {
  variant?: "outline" | "underlined" | "rounded" | null;
  size?: "sm" | "md" | "lg" | "xl" | null;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
}

const TextareaContext = React.createContext<TextareaContextValue>({});

function useTextareaContext() {
  return React.useContext(TextareaContext);
}

/**
 * Textarea - Container component
 */
export interface TextareaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof textareaContainerVariants> {
  /** Whether the textarea is invalid */
  isInvalid?: boolean;
  /** Whether the textarea is disabled */
  isDisabled?: boolean;
  /** Whether the textarea is read-only */
  isReadOnly?: boolean;
}

const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, variant, size, isInvalid, isDisabled, isReadOnly, children, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <TextareaContext.Provider
        value={{ variant, size, isInvalid, isDisabled, isReadOnly, isFocused, setIsFocused }}
      >
        <div
          ref={ref}
          className={cn(textareaContainerVariants({ variant, size, isInvalid }), className)}
          data-focus={isFocused || undefined}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          {...props}
        >
          {children}
        </div>
      </TextareaContext.Provider>
    );
  }
);

Textarea.displayName = "Textarea";

/**
 * TextareaInput - The actual textarea element
 */
export interface TextareaInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Number of visible rows */
  numberOfLines?: number;
}

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, numberOfLines, rows, onFocus, onBlur, ...props }, ref) => {
    const { variant, size, isDisabled, isReadOnly, setIsFocused } = useTextareaContext();

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused?.(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused?.(false);
      onBlur?.(e);
    };

    return (
      <textarea
        ref={ref}
        className={cn(textareaInputVariants({ variant, size }), className)}
        disabled={isDisabled}
        readOnly={isReadOnly}
        rows={numberOfLines ?? rows}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

TextareaInput.displayName = "TextareaInput";

export {
  Textarea,
  TextareaInput,
  textareaContainerVariants,
  textareaInputVariants,
};
