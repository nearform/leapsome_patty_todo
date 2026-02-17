"use client";

import React from "react";
import ReactDOM from "react-dom";

/**
 * Portal - Gluestack-compatible Portal component
 *
 * Renders children outside the parent DOM hierarchy, into `document.body` by default.
 *
 * This is intentionally minimal – it only supports web usage and a small
 * subset of the GlueStack API, but keeps the same mental model so we can
 * swap implementations later if needed.
 */

export interface PortalProps {
  children: React.ReactNode;
  /**
   * Optional container element to render into. If not provided,
   * a div is created and appended to document.body.
   */
  container?: HTMLElement | null;
}

export const Portal = ({ children, container }: PortalProps) => {
  const defaultContainerRef = React.useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (!defaultContainerRef.current && typeof document !== "undefined") {
      const el = document.createElement("div");
      el.setAttribute("data-portal-root", "true");
      document.body.appendChild(el);
      defaultContainerRef.current = el;
    }

    return () => {
      if (defaultContainerRef.current && defaultContainerRef.current.parentNode) {
        defaultContainerRef.current.parentNode.removeChild(defaultContainerRef.current);
        defaultContainerRef.current = null;
      }
    };
  }, []);

  if (!mounted) return null;

  const target = container ?? defaultContainerRef.current;
  if (!target) return null;

  return ReactDOM.createPortal(children, target);
};

