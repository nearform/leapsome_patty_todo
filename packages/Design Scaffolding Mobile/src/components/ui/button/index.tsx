"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Loader2 } from "@/components/ui/gluestack/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Button variants - Gluestack-compatible button styling
 * 
 * Maps to gluestack's Button component with:
 * - action: primary | secondary | positive | negative | default
 * - variant: solid | outline | link
 * - size: xs | sm | md | lg | xl
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        link: "underline-offset-4 hover:underline bg-transparent px-0",
      },
      action: {
        primary: "",
        secondary: "",
        positive: "",
        negative: "",
        default: "bg-transparent",
      },
      size: {
        xs: "h-8 px-3.5 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-11 px-6 text-lg",
        xl: "h-12 px-7 text-xl",
      },
      isFullWidth: {
        true: "w-full",
      },
      isDisabled: {
        true: "opacity-40 pointer-events-none",
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: "solid",
        action: "primary",
        className: "bg-accent text-white hover:bg-accent-hover active:bg-accent-dark",
      },
      {
        variant: "solid",
        action: "secondary",
        className: "bg-bg-tertiary text-text-primary hover:bg-border-standard active:bg-bg-secondary",
      },
      {
        variant: "solid",
        action: "positive",
        className: "bg-success text-white hover:bg-success-dark active:bg-success-dark",
      },
      {
        variant: "solid",
        action: "negative",
        className: "bg-error text-white hover:bg-error-dark active:bg-error-dark",
      },
      // Outline variants
      {
        variant: "outline",
        action: "primary",
        className: "border-accent text-accent hover:bg-info-bg active:bg-info-bg",
      },
      {
        variant: "outline",
        action: "secondary",
        className: "border-border-standard text-text-secondary hover:bg-info-bg active:bg-info-bg dark:border-white dark:text-white",
      },
      {
        variant: "outline",
        action: "positive",
        className: "border-success text-success hover:bg-success-bg active:bg-success-bg",
      },
      {
        variant: "outline",
        action: "negative",
        className: "border-error text-error hover:bg-error-bg active:bg-error-bg",
      },
      // Link variants
      {
        variant: "link",
        action: "primary",
        className: "text-accent hover:text-accent-hover",
      },
      {
        variant: "link",
        action: "secondary",
        className: "text-text-secondary hover:text-text-primary",
      },
      {
        variant: "link",
        action: "positive",
        className: "text-success hover:text-success-dark",
      },
      {
        variant: "link",
        action: "negative",
        className: "text-error hover:text-error-dark",
      },
    ],
    defaultVariants: {
      variant: "solid",
      action: "primary",
      size: "md",
    },
  }
);

/**
 * ButtonIcon size mapping based on button size
 */
const buttonIconSizeMap = {
  xs: "xs" as const,
  sm: "sm" as const,
  md: "md" as const,
  lg: "md" as const,
  xl: "lg" as const,
};

/**
 * Button - Gluestack-compatible button component
 * 
 * Interactive component for triggering actions with React Native properties
 * and className styling. Supports icons via the Icon component.
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // With icons (using Lucide icons)
 * <Button leftIcon={ArrowLeft}>Back</Button>
 * <Button rightIcon={ArrowRight}>Next</Button>
 * 
 * // Loading state
 * <Button isLoading>Submitting...</Button>
 * 
 * // Variants
 * <Button variant="outline" action="secondary">Cancel</Button>
 * ```
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Lucide icon component to show on the left */
  leftIcon?: LucideIcon | React.ReactNode;
  /** Lucide icon component to show on the right */
  rightIcon?: LucideIcon | React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      action,
      size = "md",
      isFullWidth,
      isDisabled,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = buttonIconSizeMap[size || "md"];
    const isButtonDisabled = disabled || isDisabled || isLoading;

    // Helper to render icon - handles both LucideIcon components and ReactNode
    const renderIcon = (icon: LucideIcon | React.ReactNode, position: "left" | "right") => {
      if (!icon) return null;
      
      // Check if it's a function component
      if (typeof icon === "function") {
        return <Icon as={icon} size={iconSize} />;
      }
      
      // Check if it's a forwardRef component (like Lucide icons)
      // ForwardRef components are objects with $$typeof, render, and displayName
      if (
        typeof icon === "object" && 
        icon !== null && 
        "render" in icon && 
        typeof (icon as { render?: unknown }).render === "function" &&
        "displayName" in icon
      ) {
        return <Icon as={icon as unknown as LucideIcon} size={iconSize} />;
      }
      
      // Otherwise render as-is (ReactNode - includes JSX elements)
      return icon;
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, action, size, isFullWidth, isDisabled: isButtonDisabled }),
          "group",
          className
        )}
        ref={ref}
        disabled={isButtonDisabled}
        data-disabled={isButtonDisabled || undefined}
        {...props}
      >
        {isLoading ? (
          <Icon as={Loader2} size={iconSize} className="animate-spin" />
        ) : (
          renderIcon(leftIcon, "left")
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
            {renderIcon(rightIcon, "right")}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/**
 * ButtonText - Gluestack compound component for button text
 * 
 * For cases where you need more control over the button content structure.
 * Inherits all Text component properties.
 */
export interface ButtonTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-semibold", className)}
        {...props}
      />
    );
  }
);

ButtonText.displayName = "ButtonText";

/**
 * ButtonIcon - Gluestack compound component for button icons
 * 
 * Wrapper for icons inside buttons with proper sizing.
 */
export interface ButtonIconProps {
  as: LucideIcon;
  className?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ as: IconComponent, className, size = "md" }) => {
  return <Icon as={IconComponent} size={size} className={cn("fill-none", className)} />;
};

ButtonIcon.displayName = "ButtonIcon";

/**
 * ButtonSpinner - Gluestack compound component for loading state
 */
const ButtonSpinner: React.FC<{ className?: string; size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" }> = ({ 
  className, 
  size = "md" 
}) => {
  return <Icon as={Loader2} size={size} className={cn("animate-spin", className)} />;
};

ButtonSpinner.displayName = "ButtonSpinner";

/**
 * ButtonGroup - Gluestack compound component for grouping buttons
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  isAttached?: boolean;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
}

const buttonGroupSpaceMap = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
  "2xl": "gap-6",
  "3xl": "gap-7",
  "4xl": "gap-8",
};

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, space = "md", isAttached, flexDirection = "row", ...props }, ref) => {
    const flexClass = {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    }[flexDirection];

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          flexClass,
          isAttached ? "gap-0" : buttonGroupSpaceMap[space],
          className
        )}
        {...props}
      />
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonText, ButtonIcon, ButtonSpinner, ButtonGroup, buttonVariants };
