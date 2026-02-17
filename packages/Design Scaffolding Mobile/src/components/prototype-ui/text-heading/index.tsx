"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Heading variants - Gluestack-compatible heading sizes
 * 
 * Size mapping to semantic HTML headings:
 * - 5xl, 4xl, 3xl → h1
 * - 2xl → h2
 * - xl → h3
 * - lg → h4
 * - md → h5
 * - sm, xs → h6
 */
const headingVariants = cva("font-heading tracking-tight text-text-primary", {
  variants: {
    size: {
      xs: "text-sm font-bold",
      sm: "text-base font-bold",
      md: "text-lg font-bold",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
      "2xl": "text-3xl font-bold",
      "3xl": "text-4xl font-bold",
      "4xl": "text-5xl font-bold",
      "5xl": "text-6xl font-bold",
    },
    isTruncated: {
      true: "truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

/**
 * Heading - Gluestack-compatible heading component
 * 
 * A customizable heading component with various size options
 * that renders semantically correct headings.
 * 
 * @example
 * ```tsx
 * <Heading size="2xl">Welcome</Heading>
 * <Heading as="h1" size="5xl" highlight>Hero Title</Heading>
 * <Heading size="md" isTruncated>Long title that truncates...</Heading>
 * ```
 */
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Override the rendered heading element */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      size,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      italic,
      highlight,
      as: Component = "h2",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({
            size,
            isTruncated,
            bold,
            underline,
            strikeThrough,
            italic,
            highlight,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
