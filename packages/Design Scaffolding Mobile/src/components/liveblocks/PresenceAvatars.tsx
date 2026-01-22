"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { cn } from "@/lib/utils";

interface PresenceAvatarsProps {
  maxAvatars?: number;
}

export function PresenceAvatars({ maxAvatars = 5 }: PresenceAvatarsProps) {
  const others = useOthers();
  const self = useSelf();

  const visibleOthers = others.slice(0, maxAvatars);
  const remainingCount = Math.max(0, others.length - maxAvatars);

  return (
    <div className="flex items-center">
      {/* Other users */}
      <div className="flex -space-x-2">
        {visibleOthers.map(({ connectionId, presence }) => (
          <Avatar
            key={connectionId}
            name={presence.name}
            color={presence.color}
          />
        ))}
        
        {/* Overflow indicator */}
        {remainingCount > 0 && (
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-bg-secondary border-2 border-bg-elevated",
              "text-xs font-semibold text-text-secondary"
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>

      {/* Separator */}
      {others.length > 0 && (
        <div className="w-px h-6 bg-border-standard mx-3" />
      )}

      {/* Self */}
      {self && (
        <div className="flex items-center gap-2">
          <Avatar
            name={self.presence.name}
            color={self.presence.color}
            isSelf
          />
          <span className="text-xs text-text-secondary">You</span>
        </div>
      )}
    </div>
  );
}

interface AvatarProps {
  name: string;
  color: string;
  isSelf?: boolean;
}

function Avatar({ name, color, isSelf = false }: AvatarProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        "text-white text-xs font-semibold",
        "border-2 border-bg-elevated",
        "transition-transform hover:scale-110 hover:z-10",
        isSelf && "ring-2 ring-accent ring-offset-1 ring-offset-bg-elevated"
      )}
      style={{ backgroundColor: color }}
      title={isSelf ? `${name} (You)` : name}
    >
      {initials}
    </div>
  );
}

// Compact version for toolbar
export function PresenceCount() {
  const others = useOthers();
  
  if (others.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-bg-secondary rounded-lg">
      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
      <span className="text-xs font-medium text-text-secondary">
        {others.length} online
      </span>
    </div>
  );
}
