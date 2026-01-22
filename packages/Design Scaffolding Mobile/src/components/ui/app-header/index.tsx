"use client";

import React from "react";
import Image from "next/image";
import { Icon, Search, User } from "@/components/ui/gluestack/icon";
import { useTheme } from "../gluestack-ui-provider";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  variant?: "logo" | "title";
  title?: string; // Required when variant="title"
  showSearch?: boolean; // Default: true
  showAccount?: boolean; // Default: true
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  rightActions?: React.ReactNode; // Optional custom right-side content
  className?: string;
}

const AppHeader = ({
  variant = "logo",
  title,
  showSearch = true,
  showAccount = true,
  onSearchClick,
  onAccountClick,
  rightActions,
  className,
}: AppHeaderProps) => {
  const { theme } = useTheme();

  if (variant === "title" && !title) {
    console.warn("AppHeader: title prop is required when variant='title'");
  }

  return (
    <header
      className={cn(
        "w-full bg-bg-base p-4 transition-colors duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {variant === "logo" ? (
            // ATP and WTA Logos side by side - 20% smaller than original
            <>
              {/* ATP Logo */}
              <div className="relative h-[22px] w-[53px]">
                {/* Color logo for light mode */}
                <Image
                  src="/images/ATP_Logo_Color.svg"
                  alt="ATP Logo"
                  fill
                  className={cn(
                    "object-contain transition-opacity duration-200",
                    theme === "dark" ? "opacity-0" : "opacity-100"
                  )}
                  priority
                />
                {/* White logo for dark mode */}
                <Image
                  src="/images/ATP_Logo_White.svg"
                  alt="ATP Logo"
                  fill
                  className={cn(
                    "object-contain transition-opacity duration-200",
                    theme === "dark" ? "opacity-100" : "opacity-0"
                  )}
                  priority
                />
              </div>

              {/* WTA Logo */}
              <div className="relative h-[22px] w-[44px]">
                {/* Color logo for light mode */}
                <Image
                  src="/images/WTA_Logo_Color.svg"
                  alt="WTA Logo"
                  fill
                  className={cn(
                    "object-contain transition-opacity duration-200",
                    theme === "dark" ? "opacity-0" : "opacity-100"
                  )}
                  priority
                />
                {/* White logo for dark mode */}
                <Image
                  src="/images/WTA_Logo_White.svg"
                  alt="WTA Logo"
                  fill
                  className={cn(
                    "object-contain transition-opacity duration-200",
                    theme === "dark" ? "opacity-100" : "opacity-0"
                  )}
                  priority
                />
              </div>
            </>
          ) : (
            // Title text
            <h1 className="text-3xl font-semibold text-text-primary">
              {title || ""}
            </h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {rightActions ? (
            rightActions
          ) : (
            <>
              {/* Search button */}
              {showSearch && (
                <button
                  onClick={onSearchClick}
                  className={cn(
                    "h-10 w-10 rounded-full",
                    "flex items-center justify-center",
                    "bg-bg-tertiary text-text-primary",
                    "hover:bg-bg-secondary active:bg-bg-secondary",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-base"
                  )}
                  aria-label="Search"
                >
                  <Icon as={Search} size="lg" />
                </button>
              )}

              {/* Account button */}
              {showAccount && (
                <button
                  onClick={onAccountClick}
                  className={cn(
                    "h-10 w-10 rounded-full",
                    "flex items-center justify-center",
                    "bg-bg-tertiary text-text-primary",
                    "hover:bg-bg-secondary active:bg-bg-secondary",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-base"
                  )}
                  aria-label="Account"
                >
                  <Icon as={User} size="lg" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

AppHeader.displayName = "AppHeader";

export { AppHeader };
