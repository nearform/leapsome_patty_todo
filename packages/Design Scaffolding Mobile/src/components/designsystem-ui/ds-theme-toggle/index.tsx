"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface DSThemeToggleProps {
  showSystemOption?: boolean;
  className?: string;
}

const DSThemeToggle = ({ showSystemOption = false, className }: DSThemeToggleProps) => {
  const { theme, themePreference, setTheme, toggleTheme } = useTheme();

  if (showSystemOption) {
    return (
      <div className={cn("flex items-center gap-1 p-1 rounded-sm bg-bg-secondary", className)}>
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "p-2 rounded-sm transition-all duration-200",
            themePreference === "light"
              ? "bg-bg-elevated text-accent shadow-sm"
              : "text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary"
          )}
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "p-2 rounded-sm transition-all duration-200",
            themePreference === "dark"
              ? "bg-bg-elevated text-accent shadow-sm"
              : "text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary"
          )}
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "p-2 rounded-sm transition-all duration-200",
            themePreference === "system"
              ? "bg-bg-elevated text-accent shadow-sm"
              : "text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary"
          )}
          aria-label="System theme"
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center justify-center p-2 rounded-md",
        "bg-bg-secondary hover:bg-bg-tertiary",
        "text-text-secondary hover:text-text-primary",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-base",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-300",
          theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
};

DSThemeToggle.displayName = "DSThemeToggle";

export { DSThemeToggle };
