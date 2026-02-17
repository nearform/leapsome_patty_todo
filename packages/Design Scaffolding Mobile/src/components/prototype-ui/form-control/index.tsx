"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/prototype-ui/icon";
import type { LucideIcon } from "lucide-react";

/**
 * FormControl - Gluestack-compatible form field wrapper
 * 
 * A component to build accessible form fields with labels,
 * helper text, and error handling.
 */
const formControlVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const formControlLabelVariants = cva("flex flex-row justify-start items-center mb-1");

const formControlLabelTextVariants = cva(
  "font-medium text-text-primary",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const formControlHelperVariants = cva("flex flex-row justify-start items-center mt-1");

const formControlHelperTextVariants = cva(
  "text-text-tertiary",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const formControlErrorVariants = cva("flex flex-row justify-start items-center mt-1 gap-1");

const formControlErrorTextVariants = cva(
  "text-error",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formControlVariants> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

// List of component display names that should receive form control props
const FORM_CONTROL_AWARE_COMPONENTS = [
  'FormControlLabel',
  'FormControlLabelText',
  'FormControlHelper',
  'FormControlHelperText',
  'FormControlError',
  'FormControlErrorText',
  'Input',
  'Select',
  'Checkbox',
  'Switch',
];

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, size, isInvalid, isRequired, isDisabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formControlVariants({ size }), className)}
        data-invalid={isInvalid}
        data-required={isRequired}
        data-disabled={isDisabled}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Only pass form control props to known components, not native DOM elements
            const childType = child.type;
            const displayName = typeof childType === 'function' 
              ? (childType as React.ComponentType).displayName || childType.name
              : null;
            
            if (displayName && FORM_CONTROL_AWARE_COMPONENTS.includes(displayName)) {
              return React.cloneElement(child, {
                // @ts-ignore
                size,
                isInvalid,
                isRequired,
                isDisabled,
              });
            }
          }
          return child;
        })}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

export interface FormControlLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const FormControlLabel = React.forwardRef<HTMLDivElement, FormControlLabelProps>(
  ({ className, isInvalid, isRequired, isDisabled, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formControlLabelVariants(), className)}
        {...props}
      />
    );
  }
);

FormControlLabel.displayName = "FormControlLabel";

export interface FormControlLabelTextProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof formControlLabelTextVariants> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const FormControlLabelText = React.forwardRef<HTMLLabelElement, FormControlLabelTextProps>(
  ({ className, size, isInvalid, isRequired, isDisabled, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(formControlLabelTextVariants({ size }), className)}
        {...props}
      />
    );
  }
);

FormControlLabelText.displayName = "FormControlLabelText";

export interface FormControlHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const FormControlHelper = React.forwardRef<HTMLDivElement, FormControlHelperProps>(
  ({ className, isInvalid, isRequired, isDisabled, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formControlHelperVariants(), className)}
        {...props}
      />
    );
  }
);

FormControlHelper.displayName = "FormControlHelper";

export interface FormControlHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formControlHelperTextVariants> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const FormControlHelperText = React.forwardRef<HTMLParagraphElement, FormControlHelperTextProps>(
  ({ className, size, isInvalid, isRequired, isDisabled, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(formControlHelperTextVariants({ size }), className)}
        {...props}
      />
    );
  }
);

FormControlHelperText.displayName = "FormControlHelperText";

export interface FormControlErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const FormControlError = React.forwardRef<HTMLDivElement, FormControlErrorProps>(
  ({ className, isInvalid, isRequired, isDisabled, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formControlErrorVariants(), className)}
        {...props}
      />
    );
  }
);

FormControlError.displayName = "FormControlError";

export interface FormControlErrorTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formControlErrorTextVariants> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const FormControlErrorText = React.forwardRef<HTMLParagraphElement, FormControlErrorTextProps>(
  ({ className, size, isInvalid, isRequired, isDisabled, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(formControlErrorTextVariants({ size }), className)}
        {...props}
      />
    );
  }
);

FormControlErrorText.displayName = "FormControlErrorText";

/**
 * FormControlErrorIcon - Gluestack-compatible error icon
 */
export interface FormControlErrorIconProps {
  as: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const formControlErrorIconSizeMap = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "lg" as const,
};

const FormControlErrorIcon: React.FC<FormControlErrorIconProps> = ({ 
  as: IconComponent, 
  className,
  size = "md"
}) => {
  return (
    <Icon
      as={IconComponent}
      size={formControlErrorIconSizeMap[size]}
      className={cn("text-error fill-none", className)}
    />
  );
};

FormControlErrorIcon.displayName = "FormControlErrorIcon";

export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  formControlVariants,
};
