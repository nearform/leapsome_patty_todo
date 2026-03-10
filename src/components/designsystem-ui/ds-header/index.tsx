"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/providers/theme-provider";
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
          "shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.4)]",
          "transition-colors duration-200",
          className
        )}
      >
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Design system navigation */}
            <div className="flex items-center">
              <DSNavButtons onTokensClick={() => setTokensOpen(true)} />
            </div>

            {/* Right - Theme toggle */}
            <div className="flex items-center">
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
