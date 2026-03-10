"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Center - Gluestack-compatible centering component
 * 
 * Centers children horizontally and vertically.
 * Renders as `<div>` on web and `<View>` on React Native.
 * 
 * @example
 * ```tsx
 * <Center className="h-[200px] w-[300px] bg-primary-500">
 *   <Text>Centered content</Text>
 * </Center>
 * ```
 */
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles matching gluestack Center
          "flex items-center justify-center",
          className
        )}
        {...props}
      />
    );
  }
);

Center.displayName = "Center";

export { Center };
