"use client";

import React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Link - Gluestack-compatible link component
 * 
 * A navigation component with href support.
 * Uses Next.js Link for client-side navigation when possible.
 * 
 * @example
 * ```tsx
 * <Link href="/about">
 *   <LinkText>About Us</LinkText>
 * </Link>
 * 
 * <Link href="https://example.com" isExternal>
 *   <LinkText>External Link</LinkText>
 * </Link>
 * ```
 */

const linkVariants = cva(
  "inline-flex items-center gap-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      isUnderlined: {
        true: "underline underline-offset-2",
        false: "no-underline",
      },
      isDisabled: {
        true: "opacity-40 cursor-not-allowed pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      isUnderlined: false,
    },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  /** The URL to navigate to */
  href: string;
  /** Whether the link opens in a new tab */
  isExternal?: boolean;
  /** Whether the link is disabled */
  isDisabled?: boolean;
  /** Whether to show underline */
  isUnderlined?: boolean;
  /** Whether to use Next.js Link for client-side navigation */
  useNextLink?: boolean;
  /** Callback when link is pressed */
  onPress?: () => void;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      href,
      isExternal,
      isDisabled,
      isUnderlined,
      size,
      useNextLink = true,
      onPress,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onPress?.();
      onClick?.(e);
    };

    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    const linkClassName = cn(
      linkVariants({ size, isUnderlined, isDisabled }),
      "text-accent hover:text-accent-hover",
      className
    );

    // Use Next.js Link for internal navigation
    if (useNextLink && !isExternal && href.startsWith("/")) {
      return (
        <NextLink
          ref={ref}
          href={href}
          className={linkClassName}
          onClick={handleClick}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </NextLink>
      );
    }

    // Standard anchor for external links
    return (
      <a
        ref={ref}
        href={isDisabled ? undefined : href}
        className={linkClassName}
        onClick={handleClick}
        aria-disabled={isDisabled}
        {...externalProps}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

/**
 * LinkText - Gluestack compound component for link text
 */
export interface LinkTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const LinkText = React.forwardRef<HTMLSpanElement, LinkTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-medium", className)}
        {...props}
      />
    );
  }
);

LinkText.displayName = "LinkText";

export { Link, LinkText, linkVariants };
