"use client";

import React from "react";
import { Icon, Home, Calendar, Trophy, TrendingUp, MoreHorizontal } from "@/components/ui/gluestack/icon";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppFooterItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface AppFooterProps {
  activeItem?: string;
  items?: AppFooterItem[];
  onItemClick?: (itemId: string) => void;
  className?: string;
}

const defaultItems: AppFooterItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "matches",
    label: "Matches",
    icon: Calendar,
  },
  {
    id: "tournaments",
    label: "Tournaments",
    icon: Trophy,
  },
  {
    id: "rankings",
    label: "Rankings",
    icon: TrendingUp,
  },
  {
    id: "discover",
    label: "Discover",
    icon: MoreHorizontal,
  },
];

const AppFooter = ({
  activeItem,
  items = defaultItems,
  onItemClick,
  className,
}: AppFooterProps) => {
  return (
    <footer
      className={cn(
        "w-full bg-bg-elevated border-t border-border-standard",
        "transition-colors duration-200",
        className
      )}
    >
      <nav className="flex items-center justify-around px-2 py-3">
        {items.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                "px-3 py-2 rounded-lg",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-elevated",
                isActive
                  ? "text-accent"
                  : "text-text-tertiary hover:text-text-secondary dark:text-white dark:hover:text-white/80"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon as={item.icon} size="lg" />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-accent" : "text-text-tertiary dark:text-white"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

AppFooter.displayName = "AppFooter";

export { AppFooter };
