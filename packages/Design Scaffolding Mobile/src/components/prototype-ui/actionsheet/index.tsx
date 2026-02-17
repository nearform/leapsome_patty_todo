"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Actionsheet - Gluestack-compatible bottom sheet
 *
 * Slides up from the bottom of the screen to present a set of options.
 *
 * @example
 * ```tsx
 * <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ActionsheetBackdrop />
 *   <ActionsheetContent>
 *     <ActionsheetLabel>Choose an action</ActionsheetLabel>
 *     <ActionsheetItem onPress={() => {}}>Edit</ActionsheetItem>
 *     <ActionsheetItem onPress={() => {}}>Delete</ActionsheetItem>
 *   </ActionsheetContent>
 * </Actionsheet>
 * ```
 */

interface ActionsheetContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ActionsheetContext = React.createContext<ActionsheetContextValue | null>(null);

function useActionsheetContext() {
  const ctx = React.useContext(ActionsheetContext);
  if (!ctx) throw new Error("Actionsheet components must be used within an Actionsheet");
  return ctx;
}

export interface ActionsheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Actionsheet = ({ children, isOpen, onClose }: ActionsheetProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [closing, setClosing] = React.useState(false);

  // Handle open/close lifecycle with animation
  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <ActionsheetContext.Provider value={{ isOpen: !closing, onClose }}>
      <div className="fixed inset-0 z-50">{children}</div>
    </ActionsheetContext.Provider>
  );
};

export interface ActionsheetBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ActionsheetBackdrop = ({ className, ...props }: ActionsheetBackdropProps) => {
  const { isOpen, onClose } = useActionsheetContext();
  return (
    <div
      className={cn(
        "absolute inset-0 bg-black/40",
        isOpen
          ? "animate-in fade-in duration-200"
          : "animate-out fade-out duration-300",
        className
      )}
      onClick={onClose}
      {...props}
    />
  );
};

export interface ActionsheetContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ActionsheetContent = ({ children, className, ...props }: ActionsheetContentProps) => {
  const { isOpen } = useActionsheetContext();
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0",
        "bg-bg-elevated rounded-t-2xl shadow-lg",
        "max-h-[80vh] overflow-y-auto",
        isOpen
          ? "animate-in slide-in-from-bottom duration-300"
          : "animate-out slide-out-to-bottom duration-300",
        "pb-safe",
        className
      )}
      {...props}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-border-subtle" />
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
};

export interface ActionsheetLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ActionsheetLabel = ({ children, className, ...props }: ActionsheetLabelProps) => {
  return (
    <div
      className={cn(
        "text-xs font-semibold uppercase tracking-wide text-text-tertiary",
        "px-2 py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ActionsheetItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress?: () => void;
  isDisabled?: boolean;
  isDestructive?: boolean;
}

export const ActionsheetItem = React.forwardRef<HTMLButtonElement, ActionsheetItemProps>(
  ({ children, className, onPress, onClick, isDisabled, isDestructive, ...props }, ref) => {
    const { onClose } = useActionsheetContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPress?.();
      onClick?.(e);
      onClose();
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium",
          "transition-colors",
          isDestructive
            ? "text-error hover:bg-error-bg"
            : "text-text-primary hover:bg-bg-secondary",
          isDisabled && "opacity-40 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ActionsheetItem.displayName = "ActionsheetItem";
