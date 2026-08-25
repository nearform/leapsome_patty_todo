"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Check, ChevronDown } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * Select — custom listbox so the menu stays in the layout (and the iOS device
 * frame). Native `<select>` paints an OS popup that ignores overflow clipping.
 *
 * @example
 * ```tsx
 * <Select selectedValue={value} onValueChange={setValue} placeholder="Choose">
 *   <SelectItem value="1" label="Option 1" />
 *   <SelectItem value="2" label="Option 2" />
 * </Select>
 * ```
 *
 * @param selectedValue - Controlled selected value
 * @param onValueChange - Called with the new value when an option is chosen
 * @param placeholder - Shown when nothing is selected
 * @param variant - Visual style: "outline" | "rounded" | "underlined"
 * @param size - Control size: "sm" | "md" | "lg" | "xl"
 */
const selectVariants = cva(
  "flex w-full rounded-md border bg-bg-elevated px-3 py-2 text-base text-text-body ring-offset-bg-base appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-bg-secondary data-[disabled=true]:text-text-disabled data-[disabled=true]:border-border-subtle transition-colors",
  {
    variants: {
      variant: {
        outline: "border-border-standard",
        rounded: "border-border-standard rounded-full",
        underlined: "rounded-none border-0 border-b border-border-standard px-0",
      },
      size: {
        sm: "h-9 text-sm px-2 pr-8",
        md: "h-10 text-base px-3 pr-10",
        lg: "h-11 text-lg px-4 pr-12",
        xl: "h-12 text-xl px-5 pr-14",
      },
      isInvalid: {
        true: "border-error focus-visible:ring-error",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

const selectIconSizeMap = {
  sm: { size: "sm" as const, position: "right-2" },
  md: { size: "md" as const, position: "right-3" },
  lg: { size: "md" as const, position: "right-4" },
  xl: { size: "lg" as const, position: "right-5" },
};

interface SelectContextValue {
  size?: "sm" | "md" | "lg" | "xl" | null;
  variant?: "outline" | "rounded" | "underlined" | null;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  listId: string;
}

const SelectContext = React.createContext<SelectContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  listId: "",
});

function useSelectContext() {
  return React.useContext(SelectContext);
}

function isSelectItemElement(
  child: React.ReactNode
): child is React.ReactElement<SelectItemProps> {
  if (!React.isValidElement(child)) return false;
  const type = child.type as { displayName?: string };
  return type.displayName === "SelectItem" || type.displayName === "SelectOption";
}

function itemValue(props: SelectItemProps): string {
  return props.value == null ? "" : String(props.value);
}

function itemLabel(props: SelectItemProps): string {
  if (props.label) return props.label;
  if (typeof props.children === "string") return props.children;
  return itemValue(props);
}

function labelForValue(children: React.ReactNode, value: string, placeholder?: string): string {
  let found = "";
  React.Children.forEach(children, (child) => {
    if (isSelectItemElement(child) && itemValue(child.props) === value) {
      found = itemLabel(child.props);
    }
  });
  return found || placeholder || "";
}

function getClipRect(el: HTMLElement): DOMRect {
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const clips =
      style.overflow !== "visible" ||
      style.overflowY !== "visible" ||
      style.overflowX !== "visible";
    if (clips) return node.getBoundingClientRect();
    node = node.parentElement;
  }
  return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
}

export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange" | "value">,
    VariantProps<typeof selectVariants> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  selectedValue?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: { target: { value: string } }) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      variant,
      size = "md",
      isInvalid,
      isRequired,
      isDisabled,
      placeholder,
      selectedValue,
      defaultValue,
      onValueChange,
      onChange,
      children,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const listId = React.useId();
    const rootRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);
    const iconConfig = selectIconSizeMap[size || "md"];
    const isControlled = selectedValue !== undefined || value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const [isOpen, setIsOpen] = React.useState(false);
    const [openUp, setOpenUp] = React.useState(false);
    const currentValue = isControlled ? (selectedValue ?? value ?? "") : internalValue;

    const commit = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
        onChange?.({ target: { value: next } });
        setIsOpen(false);
      },
      [isControlled, onChange, onValueChange]
    );

    React.useEffect(() => {
      if (!isOpen) return;
      const handlePointer = (event: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("mousedown", handlePointer);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handlePointer);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    React.useLayoutEffect(() => {
      if (!isOpen || !rootRef.current) return;
      const trigger = rootRef.current.getBoundingClientRect();
      const clip = getClipRect(rootRef.current);
      const menuHeight = listRef.current?.offsetHeight ?? 168;
      const spaceBelow = clip.bottom - trigger.bottom;
      const spaceAbove = trigger.top - clip.top;
      setOpenUp(spaceBelow < menuHeight + 8 && spaceAbove > spaceBelow);
    }, [isOpen, children]);

    const displayLabel = labelForValue(children, currentValue, placeholder);
    const showPlaceholder = !currentValue && Boolean(placeholder);

    return (
      <SelectContext.Provider
        value={{
          size,
          variant,
          isDisabled,
          isInvalid,
          isOpen,
          setIsOpen,
          selectedValue: currentValue,
          onValueChange: commit,
          listId,
        }}
      >
        <div ref={rootRef} className="relative w-full">
          <button
            type="button"
            id={id}
            className={cn(
              selectVariants({ variant, size, isInvalid }),
              "text-left",
              showPlaceholder && "text-text-tertiary",
              className
            )}
            ref={ref}
            disabled={isDisabled}
            aria-invalid={isInvalid}
            aria-required={isRequired}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listId}
            data-disabled={isDisabled || undefined}
            data-invalid={isInvalid || undefined}
            onClick={() => {
              if (!isDisabled) setIsOpen((open) => !open);
            }}
            {...props}
          >
            <span className="block truncate pr-2">{displayLabel}</span>
          </button>
          <Icon
            as={ChevronDown}
            size={iconConfig.size}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary transition-transform",
              iconConfig.position,
              isOpen && "rotate-180"
            )}
          />
          {isOpen && (
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-activedescendant={currentValue ? `${listId}-${currentValue}` : undefined}
              className={cn(
                "absolute left-0 right-0 z-50 max-h-56 overflow-y-auto rounded-md border border-border-standard bg-bg-elevated py-1 shadow-none",
                openUp ? "bottom-full mb-1" : "top-full mt-1"
              )}
            >
              {children}
            </ul>
          )}
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "outline" | "rounded" | "underlined";
  size?: "sm" | "md" | "lg" | "xl";
}

const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const context = useSelectContext();
    const actualSize = size ?? context.size ?? "md";
    const actualVariant = variant ?? context.variant ?? "outline";

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-between",
          selectVariants({ variant: actualVariant, size: actualSize, isInvalid: context.isInvalid }),
          context.isDisabled && "cursor-not-allowed opacity-40",
          className
        )}
        data-disabled={context.isDisabled || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

export interface SelectInputProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

const SelectInput = React.forwardRef<HTMLSpanElement, SelectInputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { selectedValue } = useSelectContext();

    return (
      <span
        ref={ref}
        className={cn(
          "flex-1 truncate text-left",
          !selectedValue && "text-text-tertiary",
          className
        )}
        {...props}
      >
        {selectedValue || placeholder}
      </span>
    );
  }
);

SelectInput.displayName = "SelectInput";

export interface SelectIconProps {
  as?: LucideIcon;
  className?: string;
}

const SelectIcon: React.FC<SelectIconProps> = ({ as: IconComponent = ChevronDown, className }) => {
  const { size } = useSelectContext();
  const iconConfig = selectIconSizeMap[size || "md"];

  return (
    <Icon
      as={IconComponent}
      size={iconConfig.size}
      className={cn("text-text-tertiary", className)}
    />
  );
};

SelectIcon.displayName = "SelectIcon";

export interface SelectItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  label?: string;
  value?: string | number;
  isDisabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, label, value, isDisabled, disabled, children, ...props }, ref) => {
    const context = useSelectContext();
    const optionValue = value == null ? "" : String(value);
    const optionLabel = label ?? (typeof children === "string" ? children : optionValue);
    const isSelected = context.selectedValue === optionValue;
    const itemDisabled = Boolean(isDisabled ?? disabled);

    return (
      <li className="px-1">
        <button
          ref={ref}
          type="button"
          role="option"
          id={`${context.listId}-${optionValue}`}
          aria-selected={isSelected}
          disabled={itemDisabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-base text-text-body",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isSelected ? "bg-bg-tertiary" : "hover:bg-bg-secondary",
            itemDisabled && "opacity-40 cursor-not-allowed",
            className
          )}
          onClick={() => {
            if (itemDisabled) return;
            context.onValueChange?.(optionValue);
            context.setIsOpen(false);
          }}
          {...props}
        >
          <span className="truncate">{children ?? optionLabel}</span>
          {isSelected ? (
            <Icon as={Check} size="sm" className="shrink-0 text-text-primary" />
          ) : null}
        </button>
      </li>
    );
  }
);

SelectItem.displayName = "SelectItem";

export interface SelectOptionProps extends SelectItemProps {}

const SelectOption = React.forwardRef<HTMLButtonElement, SelectOptionProps>((props, ref) => {
  return <SelectItem ref={ref} {...props} />;
});

SelectOption.displayName = "SelectOption";

const SelectPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

SelectPortal.displayName = "SelectPortal";

const SelectBackdrop: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn("absolute inset-0 bg-black/50", className)}
      {...props}
    />
  );
};

SelectBackdrop.displayName = "SelectBackdrop";

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-bg-elevated border border-border-standard rounded-md z-50 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

export {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectItem,
  SelectOption,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  selectVariants,
};
