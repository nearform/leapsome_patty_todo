"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Plus } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Fab - Gluestack-compatible Floating Action Button
 *
 * A high-emphasis button that floats above content, typically used
 * for primary creation actions on mobile.
 */

const fabVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full",
    "shadow-lg",
    "bg-accent text-white",
    "hover:bg-accent-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  ],
  {
    variants: {
      size: {
        sm: "w-10 h-10 text-sm",
        md: "w-12 h-12 text-base",
        lg: "w-14 h-14 text-lg",
      },
      colorScheme: {
        primary: "bg-accent hover:bg-accent-hover text-white",
        secondary: "bg-bg-elevated text-text-primary hover:bg-bg-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      colorScheme: "primary",
    },
  }
);

const fabPositionVariants = cva(
  "fixed z-40",
  {
    variants: {
      placement: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      placement: "bottom-right",
    },
  }
);

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants>,
    VariantProps<typeof fabPositionVariants> {
  /**
   * Optional icon component (Lucide) to render inside the FAB.
   * Defaults to a plus icon.
   */
  icon?: LucideIcon;
  /** Render a label next to the icon, useful on larger screens */
  label?: string;
}

export const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  (
    {
      className,
      placement,
      size,
      colorScheme,
      icon: IconComponent = Plus,
      label,
      ...props
    },
    ref
  ) => {
    const content = (
      <button
        ref={ref}
        className={cn(fabVariants({ size, colorScheme }), className)}
        {...props}
      >
        <Icon as={IconComponent} size="sm" />
        {label ? (
          <span className="text-sm font-medium">{label}</span>
        ) : null}
      </button>
    );

    // If a placement is provided, wrap in a positioned container.
    if (placement) {
      return (
        <div className={fabPositionVariants({ placement })}>
          {content}
        </div>
      );
    }

    return content;
  }
);

Fab.displayName = "Fab";

export { fabVariants, fabPositionVariants };

