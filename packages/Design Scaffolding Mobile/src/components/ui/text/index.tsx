"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Text variants - Gluestack-compatible text styling
 * 
 * Inherits all properties of React Native's Text component
 * with multiple styling options via classNames.
 */
const textVariants = cva("font-body text-text-body", {
  variants: {
    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    bold: {
      true: "font-bold",
    },
    italic: {
      true: "italic",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    highlight: {
      true: "bg-yellow-500",
    },
    isTruncated: {
      true: "truncate",
    },
    muted: {
      true: "text-text-secondary",
    },
    sub: {
      true: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

/**
 * Text - Gluestack-compatible text component
 * 
 * Inherits all properties of React Native's Text component
 * with multiple styling options via classNames.
 * 
 * @example
 * ```tsx
 * <Text>Default text</Text>
 * <Text size="2xl" bold className="text-blue-600">Large Bold Text</Text>
 * <Text italic highlight>Highlighted Italic Text</Text>
 * <Text size="sm" isTruncated>Long text that truncates...</Text>
 * ```
 */
export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /** Polymorphic `as` prop for rendering as different elements */
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size,
      weight,
      bold,
      italic,
      underline,
      strikeThrough,
      highlight,
      isTruncated,
      muted,
      sub,
      as: Component = "p",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({
            size,
            weight,
            bold,
            italic,
            underline,
            strikeThrough,
            highlight,
            isTruncated,
            muted,
            sub,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
