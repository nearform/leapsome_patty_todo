"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Avatar - Gluestack-compatible avatar component
 * 
 * Displays a user's profile picture or initials.
 * Supports compound component pattern: Avatar > AvatarImage, AvatarFallbackText, AvatarBadge
 * 
 * @example
 * ```tsx
 * // With image
 * <Avatar size="md">
 *   <AvatarImage source={{ uri: "https://example.com/avatar.jpg" }} />
 *   <AvatarFallbackText>JD</AvatarFallbackText>
 * </Avatar>
 * 
 * // With badge
 * <Avatar size="lg">
 *   <AvatarImage source={{ uri: "https://example.com/avatar.jpg" }} />
 *   <AvatarBadge />
 * </Avatar>
 * ```
 */

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-tertiary leading-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Avatar context for compound components
 */
interface AvatarContextValue {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | null;
}

const AvatarContext = React.createContext<AvatarContextValue>({});

function useAvatarContext() {
  return React.useContext(AvatarContext);
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <AvatarContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * AvatarImage - Gluestack compound component for avatar image
 */
export interface AvatarImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Image source (gluestack naming) */
  source?: { uri: string };
  /** Legacy src prop */
  src?: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "", source, src, ...props }, ref) => {
    const imageSrc = source?.uri ?? src;
    
    return (
      <img
        ref={ref}
        className={cn("absolute inset-0 h-full w-full rounded-full object-cover", className)}
        alt={alt}
        src={imageSrc}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

/**
 * AvatarFallbackText - Gluestack compound component for fallback initials
 */
export interface AvatarFallbackTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallbackText = React.forwardRef<HTMLSpanElement, AvatarFallbackTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center rounded-full font-medium leading-none text-text-secondary uppercase",
          className
        )}
        {...props}
      />
    );
  }
);

AvatarFallbackText.displayName = "AvatarFallbackText";

/**
 * AvatarFallback - Legacy fallback component (alias for AvatarFallbackText)
 */
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center rounded-full font-medium leading-none text-text-secondary",
          className
        )}
        {...props}
      />
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

/**
 * AvatarGroup - Container for multiple avatars with overlap
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max ? childArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-3", className)}
        role="group"
        aria-label="Avatar group"
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="inline-flex size-fit shrink-0 leading-none rounded-full ring-2 ring-bg-elevated"
          >
            {child}
          </div>
        ))}
        {remaining > 0 && (
          <div className="inline-flex size-fit shrink-0 leading-none rounded-full ring-2 ring-bg-elevated">
            <Avatar>
              <AvatarFallback>+{remaining}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

/**
 * AvatarBadge - Status indicator badge
 */
const avatarBadgeVariants = cva(
  "absolute rounded-full border-2 border-bg-elevated",
  {
    variants: {
      size: {
        xs: "h-2 w-2 bottom-0 right-0",
        sm: "h-2.5 w-2.5 bottom-0 right-0",
        md: "h-3 w-3 bottom-0 right-0",
        lg: "h-3.5 w-3.5 bottom-0 right-0",
        xl: "h-4 w-4 bottom-0 right-0",
        "2xl": "h-5 w-5 bottom-0 right-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Status type for color */
  status?: "online" | "offline" | "away" | "busy";
}

const AvatarBadge = React.forwardRef<HTMLDivElement, AvatarBadgeProps>(
  ({ className, status = "online", ...props }, ref) => {
    const { size } = useAvatarContext();
    
    const statusColors = {
      online: "bg-success",
      offline: "bg-text-tertiary",
      away: "bg-warning",
      busy: "bg-error",
    };

    return (
      <div
        ref={ref}
        className={cn(
          avatarBadgeVariants({ size }),
          statusColors[status],
          className
        )}
        aria-label={`Status: ${status}`}
        {...props}
      />
    );
  }
);

AvatarBadge.displayName = "AvatarBadge";

export { 
  Avatar, 
  AvatarImage, 
  AvatarFallback,
  AvatarFallbackText,
  AvatarGroup, 
  AvatarBadge, 
  avatarVariants, 
  avatarBadgeVariants,
};
