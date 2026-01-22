"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSwipe } from "@/lib/hooks/useSwipe";

const tabsVariants = cva("relative w-full", {
  variants: {
    variant: {
      underline: "",
      pill: "",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const tabsListVariants = cva(
  "flex scrollbar-hide relative",
  {
    variants: {
      variant: {
        underline: "border-b border-border-decorative",
        pill: "bg-bg-secondary rounded-full p-1 gap-1",
      },
      align: {
        start: "justify-start",
        center: "justify-center",
        stretch: "",
      },
    },
    defaultVariants: {
      variant: "underline",
      align: "start",
    },
  }
);

const tabVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        underline: "px-4 py-3 text-md",
        pill: "px-4 py-2 text-sm rounded-full",
      },
      isActive: {
        true: "",
        false: "",
      },
      align: {
        start: "",
        center: "",
        stretch: "flex-1",
      },
    },
    compoundVariants: [
      // Underline variants
      {
        variant: "underline",
        isActive: true,
        className: "text-accent",
      },
      {
        variant: "underline",
        isActive: false,
        className: "text-text-secondary hover:text-text-primary",
      },
      // Pill variants
      {
        variant: "pill",
        isActive: true,
        className: "bg-accent text-white",
      },
      {
        variant: "pill",
        isActive: false,
        className: "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
      },
    ],
    defaultVariants: {
      variant: "underline",
      isActive: false,
      align: "start",
    },
  }
);

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsVariants> {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  align?: "start" | "center" | "stretch";
  /** Enable swipe gestures on touch devices */
  enableSwipe?: boolean;
  /** Show scroll indicators when content overflows */
  showScrollIndicators?: boolean;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTab,
      onTabChange,
      variant = "underline",
      align = "start",
      enableSwipe = true,
      showScrollIndicators = true,
      className,
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Calculate and update the underline indicator position
    const updateIndicator = useCallback(() => {
      if (variant !== "underline" || !activeTabRef.current || !scrollContainerRef.current) return;

      const activeElement = activeTabRef.current;
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - containerRect.left + container.scrollLeft,
        width: activeRect.width,
      });
    }, [variant]);

    // Check scroll position for indicators
    const checkScrollPosition = useCallback(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }, []);

    // Update indicator and scroll position on mount and when activeTab changes
    useEffect(() => {
      updateIndicator();
      checkScrollPosition();
    }, [activeTab, updateIndicator, checkScrollPosition]);

    // Scroll active tab into view
    useEffect(() => {
      if (!activeTabRef.current || !scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const activeElement = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // Check if active tab is out of view
      if (activeRect.left < containerRect.left) {
        container.scrollTo({
          left: container.scrollLeft - (containerRect.left - activeRect.left) - 16,
          behavior: "smooth",
        });
      } else if (activeRect.right > containerRect.right) {
        container.scrollTo({
          left: container.scrollLeft + (activeRect.right - containerRect.right) + 16,
          behavior: "smooth",
        });
      }
    }, [activeTab]);

    // Handle resize
    useEffect(() => {
      const handleResize = () => {
        updateIndicator();
        checkScrollPosition();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [updateIndicator, checkScrollPosition]);

    // Handle scroll events
    const handleScroll = useCallback(() => {
      checkScrollPosition();
      updateIndicator();
    }, [checkScrollPosition, updateIndicator]);

    // Navigate to adjacent tab
    const navigateTab = useCallback(
      (direction: "prev" | "next") => {
        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
        if (currentIndex === -1) return;

        let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

        // Skip disabled tabs
        while (newIndex >= 0 && newIndex < tabs.length && tabs[newIndex].disabled) {
          newIndex = direction === "next" ? newIndex + 1 : newIndex - 1;
        }

        if (newIndex >= 0 && newIndex < tabs.length) {
          onTabChange(tabs[newIndex].id);
        }
      },
      [tabs, activeTab, onTabChange]
    );

    // Swipe handlers
    const swipeRef = useSwipe(
      {
        onSwipeLeft: () => enableSwipe && navigateTab("next"),
        onSwipeRight: () => enableSwipe && navigateTab("prev"),
      },
      { threshold: 50 }
    );

    // Combine refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        scrollContainerRef.current = node;
        swipeRef(node);
      },
      [swipeRef]
    );

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateTab("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateTab("next");
      } else if (e.key === "Home") {
        e.preventDefault();
        const firstEnabledTab = tabs.find((tab) => !tab.disabled);
        if (firstEnabledTab) onTabChange(firstEnabledTab.id);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastEnabledTab = [...tabs].reverse().find((tab) => !tab.disabled);
        if (lastEnabledTab) onTabChange(lastEnabledTab.id);
      }
    };

    return (
      <div ref={ref} className={cn(tabsVariants({ variant }), className)}>
        {/* Scroll indicators */}
        {showScrollIndicators && variant === "underline" && (
          <>
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none" />
            )}
          </>
        )}

        <div
          ref={setRefs}
          role="tablist"
          aria-label="Tabs"
          className={cn(
            tabsListVariants({ variant, align }),
            "overflow-x-auto"
          )}
          onScroll={handleScroll}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : undefined}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={cn(tabVariants({ variant, isActive, align }))}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Animated underline indicator */}
          {variant === "underline" && (
            <div
              className="absolute bottom-0 h-[3px] bg-accent transition-all duration-200 ease-out rounded-full"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs, tabsVariants, tabsListVariants, tabVariants };
