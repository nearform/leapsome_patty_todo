"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback, AvatarFlagBadge } from "../avatar";
import { Button } from "../button";
import { HStack } from "../stack";
import { Text } from "../text";

export interface PlayerListItemProps {
  /** Player's full name */
  name: string;
  /** Player's ranking number (e.g., "3" for #3) */
  rankNumber?: string | number;
  /** Player's country code (e.g., "US", "IT") */
  countryCode: string;
  /** Player's country name abbreviation for display (e.g., "USA", "ITA") */
  countryName?: string;
  /** URL to player's avatar image */
  avatarUrl?: string;
  /** Whether the player is currently being followed */
  isFollowing?: boolean;
  /** Callback when follow/unfollow button is clicked */
  onFollowToggle?: () => void;
  /** Optional className for the container */
  className?: string;
}

const PlayerListItem = React.forwardRef<HTMLDivElement, PlayerListItemProps>(
  (
    {
      name,
      rankNumber,
      countryCode,
      countryName,
      avatarUrl,
      isFollowing = false,
      onFollowToggle,
      className,
    },
    ref
  ) => {
    // Get initials from name for fallback
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Format country display (use provided name or code)
    const countryDisplay = countryName || countryCode.toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between py-3 px-1",
          className
        )}
      >
        {/* Left side: Avatar + Player info */}
        <HStack space="md" className="flex-1 min-w-0">
          {/* Avatar with country flag */}
          <div className="relative flex-shrink-0">
            <Avatar size="lg">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
            <AvatarFlagBadge countryCode={countryCode} size="lg" />
          </div>

          {/* Player name, rank, and country */}
          <div className="flex flex-col min-w-0">
            <HStack space="xs" className="items-baseline">
              <Text weight="semibold" className="text-text-primary truncate">
                {name}
              </Text>
              {rankNumber && (
                <Text size="sm" className="text-text-tertiary flex-shrink-0">
                  {rankNumber}
                </Text>
              )}
            </HStack>
            <Text size="sm" className="text-text-secondary">
              {countryDisplay}
            </Text>
          </div>
        </HStack>

        {/* Right side: Follow button */}
        <Button
          variant={isFollowing ? "solid" : "outline"}
          action="secondary"
          size="md"
          onClick={onFollowToggle}
          leftIcon={
            <Star
              className={cn(
                "h-4 w-4",
                isFollowing && "fill-current"
              )}
            />
          }
          className={cn(
            "flex-shrink-0 ml-3",
            isFollowing && "bg-bg-tertiary border-transparent"
          )}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    );
  }
);

PlayerListItem.displayName = "PlayerListItem";

export { PlayerListItem };
