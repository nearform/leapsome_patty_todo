"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface DSNavButtonsProps {
  onTokensClick: () => void;
  className?: string;
}

/**
 * DSNavButtons - Segmented navigation button group for Design System pages
 * 
 * Contains three buttons:
 * - Components: Links to /design-system (default selected state)
 * - Foundations: Links to /design-system/foundations
 * - Tokens: Opens the tokens drawer (via onTokensClick prop)
 */
const DSNavButtons = ({ onTokensClick, className }: DSNavButtonsProps) => {
  const pathname = usePathname();

  // Determine active page
  const isComponents = pathname === "/design-system" || pathname === "/design-system/";
  const isFoundations = pathname === "/design-system/foundations";

  return (
    <div className={cn("flex items-center gap-3 text-sm font-medium", className)}>
      {/* Home button */}
      <Link
        href="/"
        className="rounded-sm p-2 transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Components (default selected) */}
      <Link
        href="/design-system"
        className={cn(
          "rounded-sm px-3 py-2 transition-colors duration-200 border",
          isComponents
            ? "border-accent text-accent"
            : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
        )}
        aria-current={isComponents ? "page" : undefined}
      >
        Components
      </Link>

      {/* Foundations */}
      <Link
        href="/design-system/foundations"
        className={cn(
          "rounded-sm px-3 py-2 transition-colors duration-200 border",
          isFoundations
            ? "border-accent text-accent"
            : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
        )}
        aria-current={isFoundations ? "page" : undefined}
      >
        Foundations
      </Link>

      {/* Tokens */}
      <button
        type="button"
        onClick={onTokensClick}
        className={cn(
          "rounded-sm px-3 py-2 transition-colors duration-200",
          "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
        )}
      >
        Tokens
      </button>
    </div>
  );
};

DSNavButtons.displayName = "DSNavButtons";

export { DSNavButtons };
