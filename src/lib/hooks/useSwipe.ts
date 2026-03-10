import { useRef, useEffect, useCallback, useState } from "react";

export interface UseSwipeOptions {
  threshold?: number; // Minimum distance in pixels to trigger a swipe
  preventScroll?: boolean; // Prevent default scroll behavior during swipe
}

export interface UseSwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

/**
 * Hook to detect swipe gestures on touch devices
 * @param callbacks - Callback functions for swipe events
 * @param options - Configuration options
 * @returns Ref callback to attach to the element
 */
export function useSwipe(
  callbacks: UseSwipeCallbacks = {},
  options: UseSwipeOptions = {}
) {
  const {
    threshold = 50,
    preventScroll = false,
  } = options;

  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeStart,
    onSwipeEnd,
  } = callbacks;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
    onSwipeStart?.();
  }, [onSwipeStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;

    if (preventScroll) {
      // Only prevent scroll if the swipe is more horizontal than vertical
      if (touchStartX.current !== null && touchStartY.current !== null) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
        if (deltaX > deltaY) {
          e.preventDefault();
        }
      }
    }
  }, [preventScroll]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || touchEndX.current === null) {
      onSwipeEnd?.();
      return;
    }

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = touchStartY.current
      ? Math.abs(touchStartY.current - (touchEndY.current || 0))
      : 0;

    // Only trigger if horizontal swipe is greater than vertical (more horizontal)
    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > threshold) {
      if (distanceX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    onSwipeEnd?.();

    // Reset
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeEnd]);

  // Set up event listeners when element is available
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isReady) return;

    element.addEventListener("touchstart", handleTouchStart, { passive: !preventScroll });
    element.addEventListener("touchmove", handleTouchMove, { passive: !preventScroll });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll, isReady]);

  // Ref callback that sets the element and triggers listener setup
  const refCallback = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    setIsReady(node !== null);
  }, []);

  return refCallback;
}
