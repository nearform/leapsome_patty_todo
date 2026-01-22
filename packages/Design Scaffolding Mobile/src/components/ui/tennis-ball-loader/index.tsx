"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tennisBallLoaderVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TennisBallLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof tennisBallLoaderVariants> {}

const TennisBallLoader = React.forwardRef<SVGSVGElement, TennisBallLoaderProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(tennisBallLoaderVariants({ size }), "text-accent", className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 57.84 57.83"
        fill="currentColor"
        {...props}
      >
        <path d="M31.57,49.98c-2.98,0-5.64-1.14-7.9-3.39-2.35-2.35-3.02-4.99-3.87-8.33-.05-.21-.11-.42-.16-.64-.34-1.34-.78-2.93-1.44-4.55-1.13-2.78-2.72-5.17-4.87-7.31-2.72-2.74-5.73-4.19-8.7-4.19-.28,0-.56.01-.83.04-1.01.09-2.03.35-3.03.77,1.22-5.29,3.87-10.09,7.7-13.93C12.56,4.34,17.73,1.61,23.42.52c-.34.94-.61,1.82-.81,2.68-.76,3.24-.91,7.88,2.73,11.51,2.96,2.96,6.13,3.57,9.2,4.15.29.05.57.11.85.16,3,.6,5.75,1.32,8.91,4.03.44.38.85.75,1.26,1.16,2.73,2.75,3.8,6.14,3.17,10.08-.57,3.54-2.6,7.27-5.57,10.23-3.53,3.47-7.76,5.46-11.6,5.46h0ZM28.92,57.83h0c-7.72,0-14.99-3.01-20.46-8.46-3.69-3.7-6.31-8.33-7.58-13.39C.09,32.81-.17,29.58.11,26.36c1.55-1.13,3.02-1.67,4.49-1.67,2.08,0,4.21,1.08,6.51,3.3,1.84,1.85,3.14,3.77,4.09,6.05.63,1.51,1.05,3.05,1.4,4.38.07.28.14.56.22.85.83,3.24,1.68,6.59,4.64,9.56,2.8,2.82,6.3,4.32,10.12,4.32.77,0,1.55-.06,2.32-.18,4.03-.63,8.12-2.83,11.5-6.2,6.67-6.69,9.66-17.31,2.48-24.66l-.03-.03s-.04-.04-.05-.06c-4.08-4.11-8.08-5.34-11.79-6.05-.28-.05-.55-.11-.82-.16-2.98-.57-5.33-1.02-7.61-3.3-2.09-2.09-2.71-4.9-1.89-8.59.27-1.19.71-2.48,1.32-3.83.64-.04,1.29-.06,1.94-.06,7.73,0,14.99,3,20.45,8.44,3.61,3.62,6.21,8.15,7.5,13.09,1.26,4.81,1.27,9.89.02,14.7-1.29,4.95-3.89,9.5-7.52,13.15-5.48,5.45-12.74,8.46-20.46,8.46h0Z" />
      </svg>
    );
  }
);

TennisBallLoader.displayName = "TennisBallLoader";

const bouncingTennisBallLoaderVariants = cva("animate-bounce-tennis", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface BouncingTennisBallLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof bouncingTennisBallLoaderVariants> {}

const BouncingTennisBallLoader = React.forwardRef<
  SVGSVGElement,
  BouncingTennisBallLoaderProps
>(({ className, size, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn(bouncingTennisBallLoaderVariants({ size }), "text-accent", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 57.84 57.83"
      fill="currentColor"
      {...props}
    >
      <path d="M31.57,49.98c-2.98,0-5.64-1.14-7.9-3.39-2.35-2.35-3.02-4.99-3.87-8.33-.05-.21-.11-.42-.16-.64-.34-1.34-.78-2.93-1.44-4.55-1.13-2.78-2.72-5.17-4.87-7.31-2.72-2.74-5.73-4.19-8.7-4.19-.28,0-.56.01-.83.04-1.01.09-2.03.35-3.03.77,1.22-5.29,3.87-10.09,7.7-13.93C12.56,4.34,17.73,1.61,23.42.52c-.34.94-.61,1.82-.81,2.68-.76,3.24-.91,7.88,2.73,11.51,2.96,2.96,6.13,3.57,9.2,4.15.29.05.57.11.85.16,3,.6,5.75,1.32,8.91,4.03.44.38.85.75,1.26,1.16,2.73,2.75,3.8,6.14,3.17,10.08-.57,3.54-2.6,7.27-5.57,10.23-3.53,3.47-7.76,5.46-11.6,5.46h0ZM28.92,57.83h0c-7.72,0-14.99-3.01-20.46-8.46-3.69-3.7-6.31-8.33-7.58-13.39C.09,32.81-.17,29.58.11,26.36c1.55-1.13,3.02-1.67,4.49-1.67,2.08,0,4.21,1.08,6.51,3.3,1.84,1.85,3.14,3.77,4.09,6.05.63,1.51,1.05,3.05,1.4,4.38.07.28.14.56.22.85.83,3.24,1.68,6.59,4.64,9.56,2.8,2.82,6.3,4.32,10.12,4.32.77,0,1.55-.06,2.32-.18,4.03-.63,8.12-2.83,11.5-6.2,6.67-6.69,9.66-17.31,2.48-24.66l-.03-.03s-.04-.04-.05-.06c-4.08-4.11-8.08-5.34-11.79-6.05-.28-.05-.55-.11-.82-.16-2.98-.57-5.33-1.02-7.61-3.3-2.09-2.09-2.71-4.9-1.89-8.59.27-1.19.71-2.48,1.32-3.83.64-.04,1.29-.06,1.94-.06,7.73,0,14.99,3,20.45,8.44,3.61,3.62,6.21,8.15,7.5,13.09,1.26,4.81,1.27,9.89.02,14.7-1.29,4.95-3.89,9.5-7.52,13.15-5.48,5.45-12.74,8.46-20.46,8.46h0Z" />
    </svg>
  );
});

BouncingTennisBallLoader.displayName = "BouncingTennisBallLoader";

export {
  TennisBallLoader,
  tennisBallLoaderVariants,
  BouncingTennisBallLoader,
  bouncingTennisBallLoaderVariants,
};
