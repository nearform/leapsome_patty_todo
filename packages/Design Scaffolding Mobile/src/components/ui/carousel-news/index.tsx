"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSwipe } from "@/lib/hooks/useSwipe";
import { Badge } from "../badge";
import { Heading } from "../text-heading";
import { Text } from "../text";

// ============================================================================
// Carousel News Variants
// ============================================================================

const carouselNewsVariants = cva("relative w-full overflow-hidden", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

const carouselIndicatorContainerVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 bg-black/40 backdrop-blur-sm",
  {
    variants: {},
    defaultVariants: {},
  }
);

const carouselIndicatorDotVariants = cva(
  "transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1",
  {
    variants: {
      active: {
        true: "w-5 h-2.5 rounded-full bg-white",
        false: "w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/70",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

// ============================================================================
// Types
// ============================================================================

export interface CarouselNewsItem {
  id: string;
  image: string;
  imageAlt: string;
  badge?: {
    text: string;
    action?: "info" | "success" | "warning" | "error" | "muted";
  };
  subheading: string;
  heading: string;
  body: string;
  href?: string;
}

export interface CarouselNewsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselNewsVariants> {
  items: CarouselNewsItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
}

// ============================================================================
// Carousel Indicator Component
// ============================================================================

interface CarouselIndicatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}

const CarouselIndicator = React.forwardRef<HTMLDivElement, CarouselIndicatorProps>(
  ({ total, current, onSelect, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(carouselIndicatorContainerVariants(), className)}
        role="tablist"
        aria-label="Carousel navigation"
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1} of ${total}`}
            className={cn(carouselIndicatorDotVariants({ active: index === current }))}
            onClick={() => onSelect(index)}
            tabIndex={index === current ? 0 : -1}
          />
        ))}
      </div>
    );
  }
);

CarouselIndicator.displayName = "CarouselIndicator";

// ============================================================================
// Carousel News Slide Component
// ============================================================================

interface CarouselNewsSlideProps {
  item: CarouselNewsItem;
  isActive: boolean;
  indicator?: React.ReactNode;
}

const CarouselNewsSlide = React.forwardRef<HTMLDivElement, CarouselNewsSlideProps>(
  ({ item, isActive, indicator }, ref) => {
    const content = (
      <article
        ref={ref}
        className={cn(
          "w-full transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
        )}
        aria-hidden={!isActive}
      >
        {/* Image Container with Badge and Indicator */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Badge Overlay */}
          {item.badge && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="solid"
                action="info"
                size="md"
                className="uppercase font-semibold tracking-wide"
              >
                {item.badge.text}
              </Badge>
            </div>
          )}

          {/* Indicator Overlay - positioned at bottom center of image */}
          {indicator && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              {indicator}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 bg-bg-elevated sm:bg-transparent">
          {/* Subheading */}
          <Text
            size="sm"
            weight="medium"
            className="uppercase tracking-wider text-text-secondary mb-2"
            as="span"
          >
            {item.subheading}
          </Text>

          {/* Heading */}
          <Heading size="3xl" as="h3" className="mb-3 leading-tight">
            {item.heading}
          </Heading>

          {/* Body Text */}
          <Text size="md" muted className="leading-relaxed">
            {item.body}
          </Text>
        </div>
      </article>
    );

    // Wrap in link if href provided
    if (item.href && isActive) {
      return (
        <a href={item.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {content}
        </a>
      );
    }

    return content;
  }
);

CarouselNewsSlide.displayName = "CarouselNewsSlide";

// ============================================================================
// Main Carousel News Component
// ============================================================================

const CarouselNews = React.forwardRef<HTMLDivElement, CarouselNewsProps>(
  (
    {
      className,
      size,
      items,
      autoPlay = false,
      autoPlayInterval = 5000,
      showIndicators = true,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Navigation handlers
    const goToNext = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const goToPrevious = useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    const goToSlide = useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    // Swipe handlers
    const swipeRef = useSwipe(
      {
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrevious,
      },
      { threshold: 50, preventScroll: true }
    );

    // Combine refs
    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        swipeRef(node);
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, swipeRef]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            goToPrevious();
            break;
          case "ArrowRight":
            event.preventDefault();
            goToNext();
            break;
          case "Home":
            event.preventDefault();
            setCurrentIndex(0);
            break;
          case "End":
            event.preventDefault();
            setCurrentIndex(items.length - 1);
            break;
        }
      },
      [goToNext, goToPrevious, items.length]
    );

    // Auto-play functionality
    useEffect(() => {
      if (autoPlay && items.length > 1) {
        autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
        return () => {
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
          }
        };
      }
    }, [autoPlay, autoPlayInterval, goToNext, items.length]);

    // Pause auto-play on hover/focus
    const pauseAutoPlay = useCallback(() => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }, []);

    const resumeAutoPlay = useCallback(() => {
      if (autoPlay && items.length > 1 && !autoPlayRef.current) {
        autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
      }
    }, [autoPlay, autoPlayInterval, goToNext, items.length]);

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div
        ref={combinedRef}
        className={cn(carouselNewsVariants({ size }), className)}
        role="region"
        aria-label="News carousel"
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        onFocus={pauseAutoPlay}
        onBlur={resumeAutoPlay}
        tabIndex={0}
        {...props}
      >
        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {currentIndex + 1} of {items.length}: {items[currentIndex].heading}
        </div>

        {/* Slides Container */}
        <div className="relative">
          {items.map((item, index) => (
            <CarouselNewsSlide
              key={item.id}
              item={item}
              isActive={index === currentIndex}
              indicator={
                showIndicators && items.length > 1 && index === currentIndex ? (
                  <CarouselIndicator
                    total={items.length}
                    current={currentIndex}
                    onSelect={goToSlide}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      </div>
    );
  }
);

CarouselNews.displayName = "CarouselNews";

// ============================================================================
// Exports
// ============================================================================

export {
  CarouselNews,
  CarouselIndicator,
  carouselNewsVariants,
  carouselIndicatorContainerVariants,
  carouselIndicatorDotVariants,
};
