"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icon, X } from "@/components/prototype-ui/icon";
import { Portal } from "@/components/prototype-ui/portal";

/**
 * Popover - Gluestack-compatible contextual overlay
 *
 * Displays rich content (forms, info, controls) in a floating panel
 * anchored to a trigger element. Uses a Portal to escape overflow:hidden
 * parent containers.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Info</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverArrow />
 *     <Text>Some helpful details here.</Text>
 *     <PopoverCloseButton />
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @param placement - Where to position the popover: "top" | "bottom" | "left" | "right"
 * @param isOpen - Controlled open state
 * @param onOpenChange - Callback when open state changes
 * @param defaultIsOpen - Initial open state for uncontrolled mode
 */

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placement: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used within a Popover");
  return ctx;
}

export interface PopoverProps {
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultIsOpen?: boolean;
}

export const Popover = ({
  children,
  placement = "bottom",
  isOpen: controlledIsOpen,
  onOpenChange,
  defaultIsOpen = false,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultIsOpen);
  const isOpen = controlledIsOpen ?? internalOpen;
  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (controlledIsOpen === undefined) setInternalOpen(open);
      onOpenChange?.(open);
    },
    [controlledIsOpen, onOpenChange]
  );

  // Close on outside click or Escape
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insideContent = contentRef.current?.contains(target);
      if (!insideTrigger && !insideContent) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, placement, triggerRef, contentRef }}>
      <div ref={triggerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { isOpen, setIsOpen } = usePopoverContext();
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer"
      role="button"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      {children}
    </div>
  );
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = ({ children, className, style, ...props }: PopoverContentProps) => {
  const { isOpen, placement, triggerRef, contentRef } = usePopoverContext();
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Calculate position from trigger rect
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2;
        left = rect.left - gap;
        break;
      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + gap;
        break;
    }

    setPosition({ top, left });
  }, [placement, triggerRef]);

  // Mount/unmount lifecycle
  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      setMounted(true);
      // Trigger opacity transition on next frame after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reposition on scroll/resize while open
  React.useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => updatePosition();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, updatePosition]);

  if (!mounted) return null;

  // Use inline transform to avoid conflicts with CSS animation transforms
  const getTransform = (): string => {
    switch (placement) {
      case "top":
        return "translateX(-50%) translateY(-100%)";
      case "bottom":
        return "translateX(-50%)";
      case "left":
        return "translateY(-50%) translateX(-100%)";
      case "right":
        return "translateY(-50%)";
      default:
        return "translateX(-50%)";
    }
  };

  return (
    <Portal>
      <div
        ref={contentRef}
        role="dialog"
        className={cn(
          "fixed z-50 min-w-[200px]",
          "bg-bg-elevated rounded-md shadow-lg border border-border-subtle",
          "p-4 transition-opacity duration-150",
          visible ? "opacity-100" : "opacity-0",
          className
        )}
        style={{
          top: position.top,
          left: position.left,
          transform: getTransform(),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </Portal>
  );
};

export interface PopoverArrowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverArrow = ({ className, ...props }: PopoverArrowProps) => {
  const { placement } = usePopoverContext();

  const arrowPlacement: Record<string, string> = {
    top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
    bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
    left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45",
    right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45",
  };

  return (
    <div
      className={cn(
        "absolute w-3 h-3 bg-bg-elevated border border-border-subtle",
        arrowPlacement[placement],
        className
      )}
      {...props}
    />
  );
};

export interface PopoverCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PopoverCloseButton = React.forwardRef<HTMLButtonElement, PopoverCloseButtonProps>(
  ({ className, ...props }, ref) => {
    const { setIsOpen } = usePopoverContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(false)}
        className={cn(
          "absolute top-2 right-2 rounded-full p-1 text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary transition-colors",
          className
        )}
        aria-label="Close"
        {...props}
      >
        <Icon as={X} size="xs" />
      </button>
    );
  }
);
PopoverCloseButton.displayName = "PopoverCloseButton";
