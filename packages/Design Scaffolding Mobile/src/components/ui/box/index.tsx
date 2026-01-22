"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Box - Gluestack-compatible layout primitive
 * 
 * Renders as `<div>` on web and will render as `<View>` on React Native.
 * Accepts standard layout props and className for styling.
 * 
 * @example
 * ```tsx
 * <Box className="p-4 bg-bg-elevated rounded-lg">
 *   <Text>Content inside box</Text>
 * </Box>
 * ```
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Polymorphic `as` prop for rendering as different elements */
  as?: React.ElementType;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles matching gluestack Box
          "flex flex-col relative",
          className
        )}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box };
