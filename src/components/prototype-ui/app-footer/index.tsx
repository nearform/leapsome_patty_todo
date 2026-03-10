"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "@/components/prototype-ui";
import { Home, Search, CreditCard, Clock, MoreHorizontal, type LucideIcon } from "lucide-react";

const appFooterVariants = cva(
  "w-full px-4 py-3 border-t border-border-subtle bg-bg-elevated",
  {
    variants: {
      position: {
        fixed: "fixed bottom-0 left-0 right-0",
        static: "",
      },
    },
    defaultVariants: {
      position: "fixed",
    },
  }
);

export interface AppFooterItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional href for navigation */
  href?: string;
}

export interface AppFooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appFooterVariants> {
  /** Navigation items to display */
  items?: AppFooterItem[];
  /** Currently active item ID */
  activeItem?: string;
  /** Position - fixed to bottom or static */
  position?: "fixed" | "static";
  /** Callback when an item is clicked */
  onItemClick?: (item: AppFooterItem) => void;
}

// Default navigation items
const defaultItems: AppFooterItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "history", label: "History", icon: Clock },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function AppFooter({
  className,
  items = defaultItems,
  activeItem = "home",
  position = "fixed",
  onItemClick,
  ...props
}: AppFooterProps) {
  return (
    <footer className={cn(appFooterVariants({ position }), className)} {...props}>
      <div className="flex flex-row items-center justify-around">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="flex-1 flex flex-col items-center gap-1 py-1 transition-colors"
            >
              <div
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isActive ? "text-accent" : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <Text
                size="xs"
                className={cn(
                  "transition-colors",
                  isActive ? "text-accent font-medium" : "text-text-tertiary"
                )}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </div>
    </footer>
  );
}

export { appFooterVariants, defaultItems };
