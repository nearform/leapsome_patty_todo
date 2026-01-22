"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

/**
 * Image - Gluestack-compatible image component
 * 
 * A cross-platform image component with size variants.
 * Uses Next.js Image for optimized loading on web.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Image source={{ uri: "https://example.com/image.jpg" }} alt="Description" />
 * 
 * // With size
 * <Image source={{ uri: "https://example.com/image.jpg" }} size="lg" />
 * 
 * // Rounded
 * <Image source={{ uri: "https://example.com/image.jpg" }} borderRadius="$full" />
 * ```
 */

const imageVariants = cva("object-cover", {
  variants: {
    size: {
      "2xs": "h-6 w-6",
      xs: "h-10 w-10",
      sm: "h-16 w-16",
      md: "h-20 w-20",
      lg: "h-24 w-24",
      xl: "h-32 w-32",
      "2xl": "h-64 w-64",
      full: "h-full w-full",
    },
    borderRadius: {
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
      "$none": "rounded-none",
      "$xs": "rounded-xs",
      "$sm": "rounded-sm",
      "$md": "rounded-md",
      "$lg": "rounded-lg",
      "$xl": "rounded-xl",
      "$2xl": "rounded-2xl",
      "$3xl": "rounded-3xl",
      "$full": "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    borderRadius: "none",
  },
});

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">,
    VariantProps<typeof imageVariants> {
  /** Image source (gluestack naming) */
  source?: { uri: string };
  /** Legacy src prop */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback source if main image fails */
  fallbackSource?: { uri: string };
  /** Whether to use Next.js Image optimization */
  useNextImage?: boolean;
  /** Next.js Image fill prop */
  fill?: boolean;
  /** Accessibility label (alternative to alt) */
  accessibilityLabel?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      size,
      borderRadius,
      source,
      src,
      fallbackSource,
      useNextImage = false,
      fill,
      alt = "",
      accessibilityLabel,
      onError,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);
    const imageSrc = hasError && fallbackSource ? fallbackSource.uri : (source?.uri ?? src);
    const accessibleLabel = accessibilityLabel ?? alt;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!hasError && fallbackSource) {
        setHasError(true);
      }
      onError?.(e);
    };

    // Use Next.js Image for optimization
    if (useNextImage && imageSrc) {
      return (
        <div className={cn("relative overflow-hidden", imageVariants({ size, borderRadius }), className)}>
          <NextImage
            src={imageSrc}
            alt={accessibleLabel}
            fill={fill ?? true}
            className="object-cover"
            onError={handleError}
          />
        </div>
      );
    }

    // Standard img element
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        ref={ref}
        className={cn(imageVariants({ size, borderRadius }), className)}
        onError={handleError}
        src={imageSrc}
        alt={accessibleLabel}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image, imageVariants };
