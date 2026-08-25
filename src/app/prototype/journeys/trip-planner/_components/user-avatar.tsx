"use client";

import { Avatar, AvatarFallbackText } from "@/components/prototype-ui";
import { getColorPreset, initialsFromName } from "@/lib/data/trip-planner-colors";
import type { ColorToken, TripUser } from "@/lib/types/trip-planner";
import { cn } from "@/lib/utils";

/**
 * Full class strings live here so Tailwind includes the person-colour fills.
 */
const AVATAR_FILL: Record<ColorToken, string> = {
  info: "bg-tt-dusty-blue",
  success: "bg-tt-sage",
  warning: "bg-tt-sand",
  error: "bg-tt-terracotta",
  accent: "bg-tt-moss",
  decorative: "bg-tt-charcoal",
};

const AVATAR_TEXT: Record<ColorToken, string> = {
  info: "text-tt-ivory",
  success: "text-tt-charcoal",
  warning: "text-tt-charcoal",
  error: "text-tt-ivory",
  accent: "text-tt-charcoal",
  decorative: "text-tt-ivory",
};

interface UserAvatarProps {
  user: TripUser;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

/**
 * Circular person avatar with a solid TripTogether colour fill behind initials.
 */
export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const preset = getColorPreset(user.color);

  return (
    <Avatar
      size={size}
      className={cn("overflow-hidden", AVATAR_FILL[user.color] ?? preset.bgClass, className)}
    >
      <AvatarFallbackText className={AVATAR_TEXT[user.color] ?? preset.textClass}>
        {initialsFromName(user.name)}
      </AvatarFallbackText>
    </Avatar>
  );
}
