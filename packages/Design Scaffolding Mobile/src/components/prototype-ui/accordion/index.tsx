"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/**
 * Accordion - Gluestack-compatible collapsible sections
 *
 * Compound component: Accordion > AccordionItem > AccordionTrigger + AccordionContent
 *
 * @example
 * ```tsx
 * <Accordion type="single">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

const accordionVariants = cva("w-full divide-y divide-border-subtle", {
  variants: {
    variant: {
      default: "",
      filled: "bg-bg-elevated rounded-md overflow-hidden",
      unfilled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// ---- Context ----

interface AccordionContextValue {
  type: "single" | "multiple";
  openItems: Set<string>;
  toggle: (value: string) => void;
  isDisabled?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within an Accordion");
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled?: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error("AccordionTrigger/Content must be used within an AccordionItem");
  return ctx;
}

// ---- Components ----

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  isDisabled?: boolean;
}

export const Accordion = ({
  children,
  className,
  variant,
  type = "single",
  defaultValue,
  isDisabled,
  ...props
}: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set<string>();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") {
            next.clear();
          }
          next.add(value);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ type, openItems, toggle, isDisabled }}>
      <div className={cn(accordionVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  isDisabled?: boolean;
}

export const AccordionItem = ({
  children,
  className,
  value,
  isDisabled: itemDisabled,
  ...props
}: AccordionItemProps) => {
  const { openItems, isDisabled: accordionDisabled } = useAccordionContext();
  const isOpen = openItems.has(value);
  const isDisabled = itemDisabled ?? accordionDisabled;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, isDisabled }}>
      <div
        className={cn("py-0", isDisabled && "opacity-50 pointer-events-none", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { toggle } = useAccordionContext();
    const { value, isOpen, isDisabled } = useAccordionItemContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        disabled={isDisabled}
        onClick={() => toggle(value)}
        className={cn(
          "flex w-full items-center justify-between py-3 px-1 text-left text-sm font-medium",
          "text-text-primary hover:text-accent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = ({ children, className, ...props }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext();

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-96 opacity-100 pb-3 px-1" : "max-h-0 opacity-0",
        className
      )}
      role="region"
      {...props}
    >
      <div className="text-sm text-text-body">{children}</div>
    </div>
  );
};

export { accordionVariants };
