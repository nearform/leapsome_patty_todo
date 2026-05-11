"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Pressable - Gluestack-compatible touch wrapper component
 * 
 * A wrapper component that makes its children pressable/clickable.
 * Provides feedback states for hover, press, and focus.
 * 
 * @example
 * ```tsx
 * <Pressable onPress={() => console.log('Pressed!')}>
 *   <Box className="p-4 bg-bg-elevated">
 *     <Text>Press me</Text>
 *   </Box>
 * </Pressable>
 * ```
 */

export interface PressableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Callback when pressed */
  onPress?: () => void;
  /** Callback when press starts */
  onPressIn?: () => void;
  /** Callback when press ends */
  onPressOut?: () => void;
  /** Callback on long press */
  onLongPress?: () => void;
  /** Whether the pressable is disabled */
  isDisabled?: boolean;
  /** Whether the pressable is focused */
  isFocused?: boolean;
  /** Whether the pressable is pressed */
  isPressed?: boolean;
  /** Whether the pressable is hovered */
  isHovered?: boolean;
  /** Delay before long press fires (ms) */
  delayLongPress?: number;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility role */
  accessibilityRole?: "button" | "link" | "checkbox" | "radio" | "tab" | "menuitem";
}

const Pressable = React.forwardRef<HTMLDivElement, PressableProps>(
  (
    {
      className,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      isDisabled,
      isFocused,
      isPressed: controlledIsPressed,
      isHovered: controlledIsHovered,
      delayLongPress = 500,
      accessibilityLabel,
      accessibilityRole = "button",
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      children,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const longPressTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const actualIsPressed = controlledIsPressed ?? isPressed;
    const actualIsHovered = controlledIsHovered ?? isHovered;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      setIsPressed(true);
      onPressIn?.();
      onMouseDown?.(e);

      // Start long press timer
      if (onLongPress) {
        longPressTimerRef.current = setTimeout(() => {
          onLongPress();
        }, delayLongPress);
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      setIsPressed(false);
      onPressOut?.();
      onMouseUp?.(e);

      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      onPress?.();
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setIsPressed(false);
      onMouseLeave?.(e);

      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPress?.();
      }
      onKeyDown?.(e);
    };

    // Cleanup timer on unmount
    React.useEffect(() => {
      return () => {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        role={accessibilityRole}
        aria-label={accessibilityLabel}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        className={cn(
          "cursor-pointer select-none outline-none",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4",
          isDisabled && "cursor-not-allowed opacity-40",
          actualIsPressed && "opacity-70",
          className
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        data-disabled={isDisabled || undefined}
        data-pressed={actualIsPressed || undefined}
        data-hovered={actualIsHovered || undefined}
        data-focused={isFocused || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Pressable.displayName = "Pressable";

export { Pressable };
