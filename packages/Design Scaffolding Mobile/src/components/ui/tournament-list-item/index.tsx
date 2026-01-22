"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { HStack } from "../stack";
import { Text } from "../text";

export interface TournamentListItemProps {
  /** Tournament name */
  name: string;
  /** Court surface type (e.g., "Hard", "Clay", "Grass") */
  surface: string;
  /** Whether the tournament is currently being followed */
  isFollowing?: boolean;
  /** Callback when follow/unfollow button is clicked */
  onFollowToggle?: () => void;
  /** Optional className for the container */
  className?: string;
}

const TournamentListItem = React.forwardRef<HTMLDivElement, TournamentListItemProps>(
  (
    {
      name,
      surface,
      isFollowing = false,
      onFollowToggle,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between py-3 px-1",
          className
        )}
      >
        {/* Left side: Tournament info */}
        <HStack space="md" className="flex-1 min-w-0">
          <div className="flex flex-col min-w-0">
            <Text weight="semibold" className="text-text-primary truncate">
              {name}
            </Text>
            <Text size="sm" className="text-text-secondary">
              {surface}
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

TournamentListItem.displayName = "TournamentListItem";

export { TournamentListItem };
