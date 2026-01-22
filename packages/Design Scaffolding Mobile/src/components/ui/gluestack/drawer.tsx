"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, X } from "./icon";

/**
 * Drawer - Gluestack-compatible drawer/side panel component
 * 
 * Displays content in a sliding panel from the edge of the screen.
 * Supports compound component pattern: Drawer > DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton
 * 
 * @example
 * ```tsx
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} anchor="left">
 *   <DrawerBackdrop />
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <Heading>Menu</Heading>
 *       <DrawerCloseButton />
 *     </DrawerHeader>
 *     <DrawerBody>
 *       <Text>Drawer content</Text>
 *     </DrawerBody>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */

const drawerContentVariants = cva(
  "fixed bg-bg-elevated shadow-lg flex flex-col max-h-full overflow-hidden",
  {
    variants: {
      anchor: {
        left: "left-0 top-0 bottom-0 w-[300px] max-w-[85vw] animate-in slide-in-from-left duration-300",
        right: "right-0 top-0 bottom-0 w-[300px] max-w-[85vw] animate-in slide-in-from-right duration-300",
        top: "top-0 left-0 right-0 h-[300px] max-h-[85vh] animate-in slide-in-from-top duration-300",
        bottom: "bottom-0 left-0 right-0 h-[300px] max-h-[85vh] animate-in slide-in-from-bottom duration-300",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      // Left/Right sizes
      { anchor: "left", size: "xs", className: "w-[200px]" },
      { anchor: "left", size: "sm", className: "w-[250px]" },
      { anchor: "left", size: "md", className: "w-[300px]" },
      { anchor: "left", size: "lg", className: "w-[400px]" },
      { anchor: "left", size: "xl", className: "w-[500px]" },
      { anchor: "left", size: "full", className: "w-full" },
      { anchor: "right", size: "xs", className: "w-[200px]" },
      { anchor: "right", size: "sm", className: "w-[250px]" },
      { anchor: "right", size: "md", className: "w-[300px]" },
      { anchor: "right", size: "lg", className: "w-[400px]" },
      { anchor: "right", size: "xl", className: "w-[500px]" },
      { anchor: "right", size: "full", className: "w-full" },
      // Top/Bottom sizes
      { anchor: "top", size: "xs", className: "h-[150px]" },
      { anchor: "top", size: "sm", className: "h-[200px]" },
      { anchor: "top", size: "md", className: "h-[300px]" },
      { anchor: "top", size: "lg", className: "h-[400px]" },
      { anchor: "top", size: "xl", className: "h-[500px]" },
      { anchor: "top", size: "full", className: "h-full" },
      { anchor: "bottom", size: "xs", className: "h-[150px]" },
      { anchor: "bottom", size: "sm", className: "h-[200px]" },
      { anchor: "bottom", size: "md", className: "h-[300px]" },
      { anchor: "bottom", size: "lg", className: "h-[400px]" },
      { anchor: "bottom", size: "xl", className: "h-[500px]" },
      { anchor: "bottom", size: "full", className: "h-full" },
    ],
    defaultVariants: {
      anchor: "left",
      size: "md",
    },
  }
);

/**
 * Drawer context for compound components
 */
interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  anchor: "left" | "right" | "top" | "bottom";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | null;
  closeOnOverlayClick?: boolean;
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

export interface DrawerProps {
  children: React.ReactNode;
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Which edge the drawer slides from */
  anchor?: "left" | "right" | "top" | "bottom";
  /** Size of the drawer */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  /** Whether clicking the backdrop closes the drawer */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the drawer */
  closeOnEsc?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
}

const Drawer = ({
  children,
  isOpen,
  onClose,
  anchor = "left",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  accessibilityLabel,
}: DrawerProps) => {
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DrawerContext.Provider value={{ isOpen, onClose, anchor, size, closeOnOverlayClick }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={accessibilityLabel}
        className="fixed inset-0 z-50"
      >
        {children}
      </div>
    </DrawerContext.Provider>
  );
};

Drawer.displayName = "Drawer";

/**
 * DrawerBackdrop - Overlay behind the drawer
 */
export interface DrawerBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose, closeOnOverlayClick } = useDrawerContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick) {
        onClose();
      }
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 bg-black/50 animate-in fade-in-0 duration-200",
          className
        )}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

DrawerBackdrop.displayName = "DrawerBackdrop";

/**
 * DrawerContent - Container for drawer content
 */
export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerContentVariants> {}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, anchor: propAnchor, size: propSize, children, ...props }, ref) => {
    const { anchor: contextAnchor, size: contextSize } = useDrawerContext();
    const anchor = propAnchor ?? contextAnchor;
    const size = propSize ?? contextSize;

    return (
      <div
        ref={ref}
        className={cn(drawerContentVariants({ anchor, size }), className)}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerContent.displayName = "DrawerContent";

/**
 * DrawerHeader - Header section of the drawer
 */
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between p-4 border-b border-border-standard",
          className
        )}
        {...props}
      />
    );
  }
);

DrawerHeader.displayName = "DrawerHeader";

/**
 * DrawerBody - Main content section of the drawer
 */
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto p-4", className)}
        {...props}
      />
    );
  }
);

DrawerBody.displayName = "DrawerBody";

/**
 * DrawerFooter - Footer section of the drawer
 */
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-2 p-4 border-t border-border-standard",
          className
        )}
        {...props}
      />
    );
  }
);

DrawerFooter.displayName = "DrawerFooter";

/**
 * DrawerCloseButton - Close button for the drawer
 */
export interface DrawerCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DrawerCloseButton = React.forwardRef<HTMLButtonElement, DrawerCloseButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose } = useDrawerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "rounded-md p-1 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
        onClick={handleClick}
        aria-label="Close drawer"
        {...props}
      >
        <Icon as={X} size="md" />
      </button>
    );
  }
);

DrawerCloseButton.displayName = "DrawerCloseButton";

export {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  drawerContentVariants,
};
