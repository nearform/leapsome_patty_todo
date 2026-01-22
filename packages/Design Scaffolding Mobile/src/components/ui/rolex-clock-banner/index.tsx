"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rolexClockBannerVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "h-[90px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RolexClockBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rolexClockBannerVariants> {
  /**
   * URL to the Rolex clock banner HTML
   * @default "https://static.rolex.com/clocks/2025/Wta_tennis_Desktop_HTML_270x90/index.html"
   */
  src?: string;
  /**
   * Title for accessibility
   * @default "Rolex Clock Banner"
   */
  title?: string;
}

const RolexClockBanner = React.forwardRef<HTMLDivElement, RolexClockBannerProps>(
  ({ className, variant, size, src = "https://static.rolex.com/clocks/2025/Wta_tennis_Desktop_HTML_270x90/index.html", title = "Rolex Clock Banner", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(rolexClockBannerVariants({ variant, size }), className)}
        {...props}
      >
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
          style={{
            minHeight: "90px",
          }}
          allow="autoplay"
          loading="lazy"
        />
      </div>
    );
  }
);

RolexClockBanner.displayName = "RolexClockBanner";

export { RolexClockBanner, rolexClockBannerVariants };
