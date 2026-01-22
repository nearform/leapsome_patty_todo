"use client";

import { useCallback } from "react";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react/suspense";

export function Cursors() {
  const others = useOthers();

  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (!presence.cursor) return null;
        
        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            name={presence.name}
            color={presence.color}
          />
        );
      })}
    </>
  );
}

interface CursorProps {
  x: number;
  y: number;
  name: string;
  color: string;
}

function Cursor({ x, y, name, color }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 z-50"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <path
          d="M5.65376 12.4563L0.161133 0.770752L11.8472 6.26318L6.35499 7.64565C5.98728 7.73836 5.74605 8.0887 5.65376 8.45641L5.65376 12.4563Z"
          fill={color}
        />
        <path
          d="M5.65376 12.4563L0.161133 0.770752L11.8472 6.26318L6.35499 7.64565C5.98728 7.73836 5.74605 8.0887 5.65376 8.45641L5.65376 12.4563Z"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      
      {/* Name label */}
      <div
        className="absolute left-4 top-4 px-2 py-1 rounded-md text-xs font-medium text-white whitespace-nowrap shadow-md"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
}

// Hook to track cursor position and update presence
export function useCursorTracking(containerRef: React.RefObject<HTMLDivElement | null>) {
  const updateMyPresence = useUpdateMyPresence();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      updateMyPresence({
        cursor: { x, y },
      });
    },
    [containerRef, updateMyPresence]
  );

  const handlePointerLeave = useCallback(() => {
    updateMyPresence({
      cursor: null,
    });
  }, [updateMyPresence]);

  return {
    handlePointerMove,
    handlePointerLeave,
  };
}
