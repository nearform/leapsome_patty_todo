"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, X } from "@/components/prototype-ui/icon";

/**
 * AlertDialog - Gluestack-compatible confirmation dialog
 *
 * Like Modal but designed for destructive/confirm actions that require
 * explicit user acknowledgment. The backdrop click does NOT close by default.
 *
 * @example
 * ```tsx
 * <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <AlertDialogBackdrop />
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <Heading size="lg">Delete item?</Heading>
 *       <AlertDialogCloseButton />
 *     </AlertDialogHeader>
 *     <AlertDialogBody>
 *       <Text>This action cannot be undone.</Text>
 *     </AlertDialogBody>
 *     <AlertDialogFooter>
 *       <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button action="negative" onClick={handleDelete}>Delete</Button>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */

const alertDialogContentVariants = cva(
  "relative bg-bg-elevated rounded-xl border border-border-decorative shadow-none overflow-hidden max-h-[90vh] flex flex-col",
  {
    variants: {
      size: {
        sm: "w-[320px]",
        md: "w-[420px]",
        lg: "w-[520px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface AlertDialogContextValue {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | null;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext() {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) throw new Error("AlertDialog components must be used within an AlertDialog");
  return ctx;
}

export interface AlertDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

export const AlertDialog = ({ children, isOpen, onClose, size = "md" }: AlertDialogProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [closing, setClosing] = React.useState(false);

  // Handle open/close lifecycle with animation
  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AlertDialogContext.Provider value={{ isOpen: !closing, onClose, size }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="alertdialog" aria-modal="true">
        {children}
      </div>
    </AlertDialogContext.Provider>
  );
};

export interface AlertDialogBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogBackdrop = ({ className, ...props }: AlertDialogBackdropProps) => {
  const { isOpen } = useAlertDialogContext();
  return (
    <div
      className={cn(
        "absolute inset-0 bg-black/50",
        isOpen
          ? "animate-in fade-in duration-200"
          : "animate-out fade-out duration-200",
        className
      )}
      {...props}
    />
  );
};

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogContentVariants> {}

export const AlertDialogContent = ({ children, className, size, ...props }: AlertDialogContentProps) => {
  const ctx = useAlertDialogContext();
  const resolvedSize = size ?? ctx.size;

  return (
    <div
      className={cn(
        alertDialogContentVariants({ size: resolvedSize }),
        ctx.isOpen
          ? "animate-in zoom-in-95 fade-in duration-200 z-10"
          : "animate-out zoom-out-95 fade-out duration-200 z-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogHeader = ({ children, className, ...props }: AlertDialogHeaderProps) => (
  <div className={cn("flex items-center justify-between px-6 pt-6 pb-2", className)} {...props}>
    {children}
  </div>
);

export interface AlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogBody = ({ children, className, ...props }: AlertDialogBodyProps) => (
  <div className={cn("px-6 py-2 flex-1 overflow-y-auto", className)} {...props}>
    {children}
  </div>
);

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogFooter = ({ children, className, ...props }: AlertDialogFooterProps) => (
  <div className={cn("flex items-center justify-end gap-3 px-6 pb-6 pt-4", className)} {...props}>
    {children}
  </div>
);

export interface AlertDialogCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AlertDialogCloseButton = React.forwardRef<HTMLButtonElement, AlertDialogCloseButtonProps>(
  ({ className, ...props }, ref) => {
    const { onClose } = useAlertDialogContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClose}
        className={cn(
          "rounded-full p-1 text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary transition-colors",
          className
        )}
        aria-label="Close"
        {...props}
      >
        <Icon as={X} size="sm" />
      </button>
    );
  }
);
AlertDialogCloseButton.displayName = "AlertDialogCloseButton";

export { alertDialogContentVariants };
