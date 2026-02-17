"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Divider variants - Gluestack-compatible orientation system
 */
const dividerVariants = cva("shrink-0 bg-border-standard", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

/**
 * Divider - Gluestack-compatible separator component
 * 
 * Visually separates content in a layout.
 * Inherits all properties of `<hr>` on web and `<View>` on React Native.
 * 
 * @example
 * ```tsx
 * <VStack>
 *   <Text>Above</Text>
 *   <Divider className="my-2" />
 *   <Text>Below</Text>
 * </VStack>
 * 
 * <HStack>
 *   <Text>Left</Text>
 *   <Divider orientation="vertical" className="mx-2 h-[20px]" />
 *   <Text>Right</Text>
 * </HStack>
 * ```
 */
export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(dividerVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
