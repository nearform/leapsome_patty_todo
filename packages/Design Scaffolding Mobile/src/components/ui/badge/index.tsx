"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/gluestack/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Badge - Gluestack-compatible badge component
 * 
 * Displays a small piece of information or status indicator.
 * Supports compound component pattern: Badge > BadgeText, BadgeIcon
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Badge action="success">Active</Badge>
 * 
 * // With icon
 * <Badge action="info">
 *   <BadgeIcon as={InfoIcon} className="mr-1" />
 *   <BadgeText>New</BadgeText>
 * </Badge>
 * ```
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent border",
      },
      action: {
        info: "",
        success: "",
        warning: "",
        error: "",
        muted: "",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-sm",
      },
    },
    compoundVariants: [
      // Solid variants - use dark accent colors for better contrast
      {
        variant: "solid",
        action: "info",
        className: "bg-accent text-white",
      },
      {
        variant: "solid",
        action: "success",
        className: "bg-success-dark text-white",
      },
      {
        variant: "solid",
        action: "warning",
        className: "bg-warning-dark text-white",
      },
      {
        variant: "solid",
        action: "error",
        className: "bg-error-dark text-white",
      },
      {
        variant: "solid",
        action: "muted",
        className: "bg-neutral-600 text-white",
      },
      // Outline variants
      {
        variant: "outline",
        action: "info",
        className: "border-accent text-accent",
      },
      {
        variant: "outline",
        action: "success",
        className: "border-success text-success",
      },
      {
        variant: "outline",
        action: "warning",
        className: "border-warning text-warning",
      },
      {
        variant: "outline",
        action: "error",
        className: "border-error text-error",
      },
      {
        variant: "outline",
        action: "muted",
        className: "border-border-standard text-text-secondary",
      },
    ],
    defaultVariants: {
      variant: "solid",
      action: "info",
      size: "md",
    },
  }
);

/**
 * Badge context for compound components
 */
interface BadgeContextValue {
  size?: "sm" | "md" | "lg" | null;
  action?: "info" | "success" | "warning" | "error" | "muted" | null;
  variant?: "solid" | "outline" | null;
}

const BadgeContext = React.createContext<BadgeContextValue>({});

function useBadgeContext() {
  return React.useContext(BadgeContext);
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, action, size, children, ...props }, ref) => {
    return (
      <BadgeContext.Provider value={{ size, action, variant }}>
        <span
          ref={ref}
          className={cn(badgeVariants({ variant, action, size }), className)}
          data-action={action}
          data-variant={variant}
          {...props}
        >
          {children}
        </span>
      </BadgeContext.Provider>
    );
  }
);

Badge.displayName = "Badge";

/**
 * BadgeText - Gluestack compound component for badge text
 */
export interface BadgeTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BadgeText = React.forwardRef<HTMLSpanElement, BadgeTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-medium", className)}
        {...props}
      />
    );
  }
);

BadgeText.displayName = "BadgeText";

/**
 * BadgeIcon - Gluestack compound component for badge icon
 */
export interface BadgeIconProps {
  as: LucideIcon;
  className?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ as: IconComponent, className }) => {
  const { size } = useBadgeContext();
  
  const iconSizeMap = {
    sm: "2xs" as const,
    md: "xs" as const,
    lg: "sm" as const,
  };

  return (
    <Icon
      as={IconComponent}
      size={iconSizeMap[size || "md"]}
      className={cn("fill-none", className)}
    />
  );
};

BadgeIcon.displayName = "BadgeIcon";

export { Badge, BadgeText, BadgeIcon, badgeVariants };
