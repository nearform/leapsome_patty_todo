"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Stack variants - Gluestack-compatible spacing system
 * 
 * Maps to gluestack's space prop values:
 * xs: gap-1, sm: gap-2, md: gap-3, lg: gap-4, xl: gap-5, 2xl: gap-6, etc.
 */
const stackVariants = cva("flex", {
  variants: {
    space: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
      "2xl": "gap-6",
      "3xl": "gap-7",
      "4xl": "gap-8",
    },
    reversed: {
      true: "",
    },
  },
  defaultVariants: {
    space: "md",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

/**
 * HStack - Gluestack-compatible horizontal stack
 * 
 * Arranges children horizontally with customizable spacing.
 * Renders as `<div>` on web and `<View>` on React Native.
 * 
 * @example
 * ```tsx
 * <HStack space="md" reversed={false}>
 *   <Box className="h-20 w-20 bg-primary-300" />
 *   <Box className="h-20 w-20 bg-primary-400" />
 * </HStack>
 * ```
 */
const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ space }),
          "flex-row items-center",
          reversed && "flex-row-reverse",
          className
        )}
        {...props}
      />
    );
  }
);

HStack.displayName = "HStack";

/**
 * VStack - Gluestack-compatible vertical stack
 * 
 * Arranges children vertically with customizable spacing.
 * Renders as `<div>` on web and `<View>` on React Native.
 * 
 * @example
 * ```tsx
 * <VStack space="lg" reversed={false}>
 *   <Box className="h-20 w-20 bg-primary-300" />
 *   <Box className="h-20 w-20 bg-primary-400" />
 * </VStack>
 * ```
 */
const VStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ space }),
          "flex-col",
          reversed && "flex-col-reverse",
          className
        )}
        {...props}
      />
    );
  }
);

VStack.displayName = "VStack";

export { HStack, VStack, stackVariants };
