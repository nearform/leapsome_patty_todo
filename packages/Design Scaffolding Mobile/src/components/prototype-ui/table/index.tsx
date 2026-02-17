"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Table - Gluestack-compatible table primitives
 *
 * These are simple, mobile-friendly table components designed mainly
 * for documentation and basic data display in prototypes.
 */

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn(
          "w-full border-collapse text-md text-left",
          "min-w-[400px]",
          className
        )}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Thead = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("bg-bg-tertiary text-text-primary font-medium [&_tr]:border-b [&_tr]:border-border-decorative", className)}
      {...props}
    />
  )
);
Thead.displayName = "Thead";

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Tbody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("divide-y divide-border-decorative", className)}
      {...props}
    />
  )
);
Tbody.displayName = "Tbody";

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Tfoot = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("bg-bg-tertiary text-text-secondary [&_tr]:border-t [&_tr]:border-border-decorative", className)}
      {...props}
    />
  )
);
Tfoot.displayName = "Tfoot";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

export const Tr = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "hover:bg-bg-secondary transition-colors",
        className
      )}
      {...props}
    />
  )
);
Tr.displayName = "Tr";

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const Th = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-4 py-3 text-sm font-semibold uppercase tracking-wide",
        className
      )}
      {...props}
    />
  )
);
Th.displayName = "Th";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const Td = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3.5 align-middle",
        className
      )}
      {...props}
    />
  )
);
Td.displayName = "Td";

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-2 text-xs text-text-tertiary", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

