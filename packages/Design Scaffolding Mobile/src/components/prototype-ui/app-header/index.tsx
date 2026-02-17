"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Box, HStack, Text, Button } from "@/components/prototype-ui";
import { ArrowLeft, Search, Bell, User, Menu } from "lucide-react";

const appHeaderVariants = cva(
  "w-full px-4 py-3 flex items-center justify-between border-b border-border-subtle bg-bg-base",
  {
    variants: {
      variant: {
        logo: "",
        title: "",
      },
    },
    defaultVariants: {
      variant: "logo",
    },
  }
);

export interface AppHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appHeaderVariants> {
  /** Header variant - 'logo' shows logo, 'title' shows back button + title */
  variant?: "logo" | "title";
  /** Page title (used with 'title' variant) */
  title?: string;
  /** Custom logo element */
  logo?: React.ReactNode;
  /** Show search button */
  showSearch?: boolean;
  /** Show notifications button */
  showNotifications?: boolean;
  /** Show user/account button */
  showAccount?: boolean;
  /** Show menu button */
  showMenu?: boolean;
  /** Callback for back button (title variant) */
  onBack?: () => void;
  /** Callback for search button */
  onSearch?: () => void;
  /** Callback for notifications button */
  onNotifications?: () => void;
  /** Callback for account button */
  onAccount?: () => void;
  /** Callback for menu button */
  onMenu?: () => void;
  /** Custom left content */
  leftContent?: React.ReactNode;
  /** Custom right content */
  rightContent?: React.ReactNode;
}

export function AppHeader({
  className,
  variant = "logo",
  title,
  logo,
  showSearch = false,
  showNotifications = true,
  showAccount = true,
  showMenu = false,
  onBack,
  onSearch,
  onNotifications,
  onAccount,
  onMenu,
  leftContent,
  rightContent,
  ...props
}: AppHeaderProps) {
  // Default logo placeholder
  const defaultLogo = (
    <Box className="p-2 bg-accent/10 rounded-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    </Box>
  );

  return (
    <header className={cn(appHeaderVariants({ variant }), className)} {...props}>
      {/* Left Section */}
      <Box className="flex items-center gap-3">
        {leftContent ? (
          leftContent
        ) : variant === "title" ? (
          <HStack space="sm" className="items-center">
            <Button
              variant="link"
              action="secondary"
              size="sm"
              onClick={onBack}
              className="p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            {title && (
              <Text weight="semibold" size="lg">
                {title}
              </Text>
            )}
          </HStack>
        ) : (
          logo || defaultLogo
        )}
      </Box>

      {/* Right Section */}
      <HStack space="xs" className="items-center">
        {rightContent ? (
          rightContent
        ) : (
          <>
            {showMenu && (
              <Button
                variant="link"
                action="secondary"
                size="sm"
                onClick={onMenu}
                className="p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            {showSearch && (
              <Button
                variant="link"
                action="secondary"
                size="sm"
                onClick={onSearch}
                className="p-2"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
            {showNotifications && (
              <Button
                variant="link"
                action="secondary"
                size="sm"
                onClick={onNotifications}
                className="p-2"
              >
                <Bell className="w-5 h-5" />
              </Button>
            )}
            {showAccount && (
              <Button
                variant="link"
                action="secondary"
                size="sm"
                onClick={onAccount}
                className="p-2"
              >
                <User className="w-5 h-5" />
              </Button>
            )}
          </>
        )}
      </HStack>
    </header>
  );
}

export { appHeaderVariants };
