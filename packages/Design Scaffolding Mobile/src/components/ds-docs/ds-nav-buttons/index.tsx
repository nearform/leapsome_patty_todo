"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Component } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipText } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DSNavButtonsProps {
  onTokensClick: () => void;
  className?: string;
}

/**
 * DSNavButtons - Segmented navigation button group for Design System pages
 * 
 * Contains three buttons:
 * - Foundations: Links to /design-system/foundations
 * - Components: Links to /design-system
 * - Tokens: Opens the tokens drawer (via onTokensClick prop)
 */
const DSNavButtons = ({ onTokensClick, className }: DSNavButtonsProps) => {
  const pathname = usePathname();

  // Determine active page
  const isFoundations = pathname === "/design-system/foundations";
  const isComponents = pathname === "/design-system" || pathname === "/design-system/";

  return (
    <div className={cn("flex items-center border border-neutral-900 dark:border-neutral-100 rounded-lg overflow-hidden", className)}>
      {/* Foundations */}
      <Tooltip placement="bottom">
        <TooltipTrigger>
          <Link
            href="/design-system/foundations"
            className={cn(
              "p-2 transition-all duration-200",
              "rounded-l-md",
              isFoundations
                ? "bg-accent text-white"
                : "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            )}
            aria-label="Foundations"
          >
            <Layers className="h-4 w-4" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipText>Foundations</TooltipText>
        </TooltipContent>
      </Tooltip>

      {/* Components */}
      <Tooltip placement="bottom">
        <TooltipTrigger>
          <Link
            href="/design-system"
            className={cn(
              "p-2 transition-all duration-200",
              "border-l border-r border-neutral-900 dark:border-neutral-100",
              isComponents
                ? "bg-accent text-white"
                : "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            )}
            aria-label="Components"
          >
            <Component className="h-4 w-4" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipText>Components</TooltipText>
        </TooltipContent>
      </Tooltip>

      {/* Tokens */}
      <Tooltip placement="bottom">
        <TooltipTrigger>
          <button
            onClick={onTokensClick}
            className={cn(
              "p-2 transition-all duration-200",
              "rounded-r-md",
              "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            )}
            aria-label="Tokens"
          >
            <BookOpen className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipText>Tokens</TooltipText>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

DSNavButtons.displayName = "DSNavButtons";

export { DSNavButtons };
