"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextValue {
  theme: Theme;
  themePreference: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  themePreference: "system",
  setTheme: () => {},
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = "ds-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return null;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

type ThemeProviderProps = {
  defaultTheme?: ThemePreference;
  children?: React.ReactNode;
};

const ThemeProvider = ({
  defaultTheme = "system",
  children,
}: ThemeProviderProps) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(defaultTheme);
  const [theme, setResolvedTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      setThemePreference(stored);
    }
    setMounted(true);
  }, []);

  // Resolve actual theme based on preference
  useEffect(() => {
    if (!mounted) return;

    const resolvedTheme = themePreference === "system" ? getSystemTheme() : themePreference;
    setResolvedTheme(resolvedTheme);

    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);

    // Store preference
    localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [themePreference, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || themePreference !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themePreference, mounted]);

  const setTheme = useCallback((newTheme: ThemePreference) => {
    setThemePreference(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemePreference((prev) => {
      if (prev === "system") {
        return getSystemTheme() === "dark" ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  }, []);

  // Always provide context, but hide content until mounted to prevent flash
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themePreference,
        setTheme,
        toggleTheme,
      }}
    >
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Export with both names for backwards compatibility
export { ThemeProvider, ThemeProvider as GluestackUIProvider };
