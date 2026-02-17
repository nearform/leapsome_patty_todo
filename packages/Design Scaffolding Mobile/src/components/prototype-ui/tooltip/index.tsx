"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Tooltip - Gluestack-compatible tooltip component
 * 
 * Displays additional information when hovering over an element.
 * Supports compound component pattern: Tooltip > TooltipTrigger, TooltipContent, TooltipText
 * 
 * @example
 * ```tsx
 * <Tooltip placement="top">
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipText>This is a tooltip</TooltipText>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */

// Tooltip variants
const tooltipVariants = cva(
  [
    "absolute z-50 px-3 py-1.5 rounded-sm",
    "bg-neutral-900 dark:bg-neutral-100",
    "text-white dark:text-neutral-900",
    "text-sm font-medium",
    "shadow-lg",
    "pointer-events-none",
    "transition-opacity duration-150",
    "whitespace-nowrap",
  ],
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        "top left": "bottom-full left-0 mb-2",
        "top right": "bottom-full right-0 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        "bottom left": "top-full left-0 mt-2",
        "bottom right": "top-full right-0 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        "left top": "right-full top-0 mr-2",
        "left bottom": "right-full bottom-0 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
        "right top": "left-full top-0 ml-2",
        "right bottom": "left-full bottom-0 ml-2",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
);

// Arrow variants
const arrowVariants = cva(
  [
    "absolute w-2 h-2",
    "bg-neutral-900 dark:bg-neutral-100",
    "rotate-45",
  ],
  {
    variants: {
      placement: {
        top: "top-full left-1/2 -translate-x-1/2 -mt-1",
        "top left": "top-full left-4 -mt-1",
        "top right": "top-full right-4 -mt-1",
        bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
        "bottom left": "bottom-full left-4 -mb-1",
        "bottom right": "bottom-full right-4 -mb-1",
        left: "left-full top-1/2 -translate-y-1/2 -ml-1",
        "left top": "left-full top-2 -ml-1",
        "left bottom": "left-full bottom-2 -ml-1",
        right: "right-full top-1/2 -translate-y-1/2 -mr-1",
        "right top": "right-full top-2 -mr-1",
        "right bottom": "right-full bottom-2 -mr-1",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
);

type Placement = 
  | "top" | "top left" | "top right"
  | "bottom" | "bottom left" | "bottom right"
  | "left" | "left top" | "left bottom"
  | "right" | "right top" | "right bottom";

interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placement: Placement;
  triggerRef: React.RefObject<HTMLElement | null>;
  openDelay: number;
  closeDelay: number;
  hasArrow: boolean;
  offset: number;
  crossOffset: number;
  shouldFlip: boolean;
  trigger: "hover" | "focus";
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip");
  }
  return context;
}

// Main Tooltip component
interface TooltipProps {
  children: React.ReactNode;
  /** Placement of the tooltip relative to trigger */
  placement?: Placement;
  /** Delay before opening (ms) */
  openDelay?: number;
  /** Delay before closing (ms) */
  closeDelay?: number;
  /** Whether tooltip is disabled */
  isDisabled?: boolean;
  /** Default open state */
  defaultIsOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when tooltip opens */
  onOpen?: () => void;
  /** Callback when tooltip closes */
  onClose?: () => void;
  /** Whether to show arrow */
  hasArrow?: boolean;
  /** Offset from trigger (px) */
  offset?: number;
  /** Cross-axis offset (px) */
  crossOffset?: number;
  /** Whether to flip when clipped */
  shouldFlip?: boolean;
  /** Trigger type */
  trigger?: "hover" | "focus";
}

const Tooltip = ({
  children,
  placement = "top",
  openDelay = 0,
  closeDelay = 0,
  isDisabled = false,
  defaultIsOpen = false,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  hasArrow = true,
  offset = 8,
  crossOffset = 0,
  shouldFlip = true,
  trigger = "hover",
}: TooltipProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (isDisabled && open) return;

      // Clear any pending timeouts
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      const delay = open ? openDelay : closeDelay;

      if (delay > 0) {
        const timeoutRef = open ? openTimeoutRef : closeTimeoutRef;
        timeoutRef.current = setTimeout(() => {
          if (!isControlled) {
            setUncontrolledIsOpen(open);
          }
          if (open) {
            onOpen?.();
          } else {
            onClose?.();
          }
        }, delay);
      } else {
        if (!isControlled) {
          setUncontrolledIsOpen(open);
        }
        if (open) {
          onOpen?.();
        } else {
          onClose?.();
        }
      }
    },
    [isDisabled, openDelay, closeDelay, isControlled, onOpen, onClose]
  );

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        setIsOpen,
        placement,
        triggerRef,
        openDelay,
        closeDelay,
        hasArrow,
        offset,
        crossOffset,
        shouldFlip,
        trigger,
      }}
    >
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  );
};

// Tooltip trigger - wraps the element that triggers the tooltip
interface TooltipTriggerProps {
  children: React.ReactNode;
}

const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  const { setIsOpen, triggerRef, trigger } = useTooltipContext();

  const eventHandlers = trigger === "hover" 
    ? {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        onFocus: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
      }
    : {
        onFocus: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
      };

  return (
    <span 
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      className="inline-flex"
      {...eventHandlers}
    >
      {children}
    </span>
  );
};

// Tooltip content container
interface TooltipContentProps extends VariantProps<typeof tooltipVariants> {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

const TooltipContent = ({
  children,
  className,
  showArrow,
}: TooltipContentProps) => {
  const { isOpen, placement, hasArrow } = useTooltipContext();
  const shouldShowArrow = showArrow ?? hasArrow;

  if (!isOpen) return null;

  return (
    <div
      role="tooltip"
      className={cn(tooltipVariants({ placement }), className)}
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      {children}
      {shouldShowArrow && <div className={cn(arrowVariants({ placement }))} />}
    </div>
  );
};

// Tooltip text
interface TooltipTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const TooltipText = React.forwardRef<HTMLSpanElement, TooltipTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        className={cn("text-inherit", className)} 
        {...props} 
      />
    );
  }
);

TooltipText.displayName = "TooltipText";

Tooltip.displayName = "Tooltip";
TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipText,
  tooltipVariants,
  arrowVariants,
};
