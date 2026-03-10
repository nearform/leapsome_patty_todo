"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Menu - Gluestack-compatible dropdown menu
 *
 * Small dropdown that appears near its trigger element.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <Button>Options</Button>
 *   </MenuTrigger>
 *   <MenuContent>
 *     <MenuItem onPress={() => {}}>Edit</MenuItem>
 *     <MenuItem onPress={() => {}}>Duplicate</MenuItem>
 *     <MenuItem onPress={() => {}} isDestructive>Delete</MenuItem>
 *   </MenuContent>
 * </Menu>
 * ```
 */

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error("Menu components must be used within a Menu");
  return ctx;
}

export interface MenuProps {
  children: React.ReactNode;
  isDisabled?: boolean;
}

export const Menu = ({ children, isDisabled }: MenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
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
  }, [isOpen]);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen: isDisabled ? () => {} : setIsOpen, triggerRef }}>
      <div ref={triggerRef} className="relative inline-block">
        {children}
      </div>
    </MenuContext.Provider>
  );
};

export interface MenuTriggerProps {
  children: React.ReactElement;
}

export const MenuTrigger = ({ children }: MenuTriggerProps) => {
  const { isOpen, setIsOpen } = useMenuContext();

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {children}
    </div>
  );
};

export interface MenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}

export const MenuContent = ({ children, className, placement = "bottom-start", ...props }: MenuContentProps) => {
  const { isOpen } = useMenuContext();

  if (!isOpen) return null;

  const placementClasses: Record<string, string> = {
    "bottom-start": "top-full left-0 mt-1",
    "bottom-end": "top-full right-0 mt-1",
    "top-start": "bottom-full left-0 mb-1",
    "top-end": "bottom-full right-0 mb-1",
  };

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[160px]",
        "bg-bg-elevated rounded-md border border-neutral-100 dark:border-neutral-800 shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_12px_rgba(0,0,0,0.25)]",
        "py-1",
        "animate-in fade-in zoom-in-95 duration-150",
        placementClasses[placement],
        className
      )}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
};

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress?: () => void;
  isDisabled?: boolean;
  isDestructive?: boolean;
  icon?: React.ReactNode;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, className, onPress, onClick, isDisabled, isDestructive, icon, ...props }, ref) => {
    const { setIsOpen } = useMenuContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPress?.();
      onClick?.(e);
      setIsOpen(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2.5 text-sm text-left",
          "transition-colors",
          isDestructive
            ? "text-error hover:bg-error-bg"
            : "text-text-primary hover:bg-bg-secondary",
          isDisabled && "opacity-40 pointer-events-none",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);
MenuItem.displayName = "MenuItem";
