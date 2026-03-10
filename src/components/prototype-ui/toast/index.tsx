"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, X } from "@/components/prototype-ui/icon";

/**
 * Toast - Gluestack-compatible notification toasts
 *
 * Context-based toast system with auto-dismiss.
 *
 * @example
 * ```tsx
 * // Wrap your app with ToastProvider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use the hook in any component
 * const toast = useToast();
 * toast.show({ title: "Saved!", description: "Changes have been saved.", action: "success" });
 * ```
 */

const toastVariants = cva(
  [
    "pointer-events-auto w-full max-w-sm rounded-md shadow-lg border p-4",
    "flex items-start gap-3",
    "animate-in slide-in-from-top-2 fade-in duration-300",
  ],
  {
    variants: {
      action: {
        info: "bg-info-bg border-info-light text-info-dark",
        success: "bg-success-bg border-success-light text-success-dark",
        warning: "bg-warning-bg border-warning-light text-warning-dark",
        error: "bg-error-bg border-error-light text-error-dark",
        muted: "bg-bg-elevated border-border-subtle text-text-primary",
      },
    },
    defaultVariants: {
      action: "info",
    },
  }
);

// ---- Types ----

type ToastAction = "info" | "success" | "warning" | "error" | "muted";

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
}

interface ToastContextValue {
  show: (toast: Omit<ToastItem, "id">) => void;
  close: (id: string) => void;
  closeAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// ---- Provider ----

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default auto-dismiss duration in ms. Set 0 to disable. */
  duration?: number;
}

export const ToastProvider = ({ children, duration = 4000 }: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const show = React.useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      const item: ToastItem = { id, ...toast };
      setToasts((prev) => [...prev, item]);

      const dismissAfter = toast.duration ?? duration;
      if (dismissAfter > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, dismissAfter);
      }
    },
    [duration]
  );

  const close = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ show, close, closeAll }}>
      {children}
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <Toast key={toast.id} action={toast.action ?? "info"}>
              <div className="flex-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
              </div>
              <button
                onClick={() => close(toast.id)}
                className="pointer-events-auto shrink-0 rounded p-0.5 hover:bg-black/10 transition-colors"
                aria-label="Dismiss"
              >
                <Icon as={X} size="xs" />
              </button>
            </Toast>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// ---- Display Components ----

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

export const Toast = ({ children, className, action, ...props }: ToastProps) => (
  <div className={cn(toastVariants({ action }), className)} role="alert" {...props}>
    {children}
  </div>
);

export interface ToastTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ToastTitle = ({ children, className, ...props }: ToastTitleProps) => (
  <p className={cn("text-sm font-semibold", className)} {...props}>
    {children}
  </p>
);

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ToastDescription = ({ children, className, ...props }: ToastDescriptionProps) => (
  <p className={cn("text-xs mt-0.5 opacity-90", className)} {...props}>
    {children}
  </p>
);

export { toastVariants };
