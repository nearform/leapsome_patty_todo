"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ui/gluestack-ui-provider";
import { DSThemeToggle } from "../ds-theme-toggle";
import { DSTokensDrawer } from "../ds-tokens-drawer";
import { DSNavButtons } from "../ds-nav-buttons";
import { cn } from "@/lib/utils";

interface DSHeaderProps {
  className?: string;
}

const DSHeader = ({ className }: DSHeaderProps) => {
  const { theme } = useTheme();
  const [tokensOpen, setTokensOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          "bg-bg-elevated/95 backdrop-blur-sm",
          "border-b border-border-standard",
          "transition-colors duration-200",
          className
        )}
      >
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logos and Duet */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* ATP Logo */}
              <Link href="/" className="relative h-6 w-[75px] sm:h-7 sm:w-[95px] hover:opacity-80 transition-opacity">
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
              </Link>

              {/* WTA Logo */}
              <Link href="/" className="relative h-6 w-[65px] sm:h-7 sm:w-[80px] hover:opacity-80 transition-opacity">
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
              </Link>

              {/* Divider - hidden on mobile */}
              <div className="hidden sm:block h-6 w-px bg-border-standard" />

              {/* Design System / Version - hidden on mobile */}
              <div className="hidden sm:flex flex-col gap-0">
                <span className="text-sm font-medium text-text-primary tracking-loose-sm leading-none">
                  DESIGN SYSTEM
                </span>
                <span className="text-sm text-text-tertiary tracking-loose-sm leading-none">
                  VERSION 1.0
                </span>
              </div>
            </div>

            {/* Right side - Navigation & Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Navigation Buttons */}
              <DSNavButtons onTokensClick={() => setTokensOpen(true)} />

              {/* Theme Toggle */}
              <DSThemeToggle showSystemOption />
            </div>
          </div>
        </div>
      </header>

      {/* Tokens Drawer */}
      <DSTokensDrawer open={tokensOpen} onClose={() => setTokensOpen(false)} />
    </>
  );
};

DSHeader.displayName = "DSHeader";

export { DSHeader };
