"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Alert - Gluestack-compatible alert component
 * 
 * Displays a callout for user attention with various action types.
 * Supports compound component pattern: Alert > AlertIcon, AlertText
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Alert action="success">
 *   <AlertText>Operation completed successfully!</AlertText>
 * </Alert>
 * 
 * // With title and description
 * <Alert action="error">
 *   <AlertIcon as={AlertCircle} />
 *   <VStack space="xs">
 *     <AlertText className="font-bold">Error</AlertText>
 *     <AlertText>Something went wrong.</AlertText>
 *   </VStack>
 * </Alert>
 * ```
 */

const alertVariants = cva(
  "relative w-full rounded-md p-4 flex items-start gap-3 transition-colors",
  {
    variants: {
      action: {
        info: "bg-info-bg text-text-primary",
        success: "bg-success-bg text-text-primary",
        warning: "bg-warning-bg text-text-primary",
        error: "bg-error-bg text-text-primary",
        muted: "bg-bg-secondary text-text-secondary",
      },
      variant: {
        solid: "",
        outline: "bg-transparent border",
        accent: "",
      },
    },
    compoundVariants: [
      // Outline variants
      {
        variant: "outline",
        action: "info",
        className: "bg-transparent border-info",
      },
      {
        variant: "outline",
        action: "success",
        className: "bg-transparent border-success",
      },
      {
        variant: "outline",
        action: "warning",
        className: "bg-transparent border-warning",
      },
      {
        variant: "outline",
        action: "error",
        className: "bg-transparent border-error",
      },
      {
        variant: "outline",
        action: "muted",
        className: "bg-transparent border-border-standard",
      },
      // Accent variants (left border)
      {
        variant: "accent",
        action: "info",
        className: "border-l-4 border-l-info rounded-md",
      },
      {
        variant: "accent",
        action: "success",
        className: "border-l-4 border-l-success rounded-md",
      },
      {
        variant: "accent",
        action: "warning",
        className: "border-l-4 border-l-warning rounded-md",
      },
      {
        variant: "accent",
        action: "error",
        className: "border-l-4 border-l-error rounded-md",
      },
      {
        variant: "accent",
        action: "muted",
        className: "border-l-4 border-l-border-standard rounded-md",
      },
    ],
    defaultVariants: {
      action: "info",
      variant: "solid",
    },
  }
);

const actionIcons: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  muted: Info,
};

const actionIconColors: Record<string, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning-dark",
  error: "text-error",
  muted: "text-text-tertiary",
};

/**
 * Alert context for compound components
 */
interface AlertContextValue {
  action?: "info" | "success" | "warning" | "error" | "muted" | null;
  variant?: "solid" | "outline" | "accent" | null;
}

const AlertContext = React.createContext<AlertContextValue>({});

function useAlertContext() {
  return React.useContext(AlertContext);
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Callback when close button is clicked */
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, action = "info", variant, children, onClose, ...props }, ref) => {
    const IconComponent = actionIcons[action || "info"];
    const iconColor = actionIconColors[action || "info"];

    // Check if children includes AlertIcon - if not, add default icon
    // Compare displayName since function component identity can vary
    const hasAlertIcon = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && 
        ((child.type as React.FC)?.displayName === "AlertIcon" || child.type === AlertIcon)
    );

    return (
      <AlertContext.Provider value={{ action, variant }}>
        <div
          ref={ref}
          role="alert"
          className={cn(alertVariants({ action, variant }), className)}
          data-action={action}
          data-variant={variant}
          {...props}
        >
          {!hasAlertIcon && (
            <Icon as={IconComponent} size="lg" className={cn("shrink-0 mt-0.5", iconColor)} />
          )}
          <div className="flex-1">{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 rounded-sm p-0.5 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-4"
              aria-label="Close alert"
            >
              <Icon as={X} size="sm" />
            </button>
          )}
        </div>
      </AlertContext.Provider>
    );
  }
);

Alert.displayName = "Alert";

/**
 * AlertIcon - Gluestack compound component for alert icon
 */
export interface AlertIconProps {
  as?: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const AlertIcon: React.FC<AlertIconProps> = ({ as: IconComponent, className, size = "lg" }) => {
  const { action } = useAlertContext();
  const defaultIcon = actionIcons[action || "info"];
  const iconColor = actionIconColors[action || "info"];
  
  return (
    <Icon 
      as={IconComponent ?? defaultIcon} 
      size={size} 
      className={cn("shrink-0 mt-0.5", iconColor, className)} 
    />
  );
};

AlertIcon.displayName = "AlertIcon";

/**
 * AlertText - Gluestack compound component for alert text
 */
export interface AlertTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertText = React.forwardRef<HTMLParagraphElement, AlertTextProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-text-body", className)}
      {...props}
    />
  )
);

AlertText.displayName = "AlertText";

/**
 * AlertTitle - Title for alert (legacy component, use AlertText with font-bold for gluestack pattern)
 */
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight mb-1", className)}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription - Description for alert (legacy component, use AlertText for gluestack pattern)
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-body [&_p]:leading-relaxed", className)}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertIcon, AlertText, AlertTitle, AlertDescription, alertVariants };
